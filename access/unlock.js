const form = document.querySelector('form')
const input = document.querySelector('#password')
const button = form.querySelector('button')
const status = document.querySelector('#status')
const decode = value => Uint8Array.from(atob(value), char => char.charCodeAt(0))
let encrypted
form.addEventListener('submit', async event => {
  event.preventDefault()
  if (button.disabled) return
  button.disabled = true
  input.removeAttribute('aria-invalid')
  status.textContent = '문서를 여는 중입니다. 잠시 기다려 주세요.'
  const urls = []
  try {
    if (!crypto.subtle || !window.DecompressionStream) throw new Error('browser')
    if (!encrypted) {
      const response = await fetch(new URL('./document.enc', import.meta.url), { cache: 'no-store' })
      if (!response.ok) throw new Error('download')
      encrypted = new Uint8Array(await response.arrayBuffer())
    }
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(input.value), 'PBKDF2', false, ['deriveKey'])
    const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: encrypted.slice(0, 16), iterations: 600000 }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt'])
    let plaintext
    try { plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: encrypted.slice(16, 28) }, key, encrypted.slice(28)) }
    catch { throw new Error('password') }
    const files = JSON.parse(await new Response(new Blob([plaintext]).stream().pipeThrough(new DecompressionStream('gzip'))).text())
    const replacements = new Map()
    const blob = (content, type) => { const url = URL.createObjectURL(new Blob([content], { type })); urls.push(url); return url }
    const replacePaths = text => {
      for (const [path, url] of replacements) text = text.split(encodeURI(path)).join(url).split(path).join(url)
      return text
    }
    // Resolve binary assets first, then styles, then the single bundled application.
    for (const [path, file] of Object.entries(files)) {
      if (!/\.(html|js|css)$/.test(path)) replacements.set(path, blob(decode(file.data), file.type))
    }
    for (const extension of ['css', 'js']) {
      for (const [path, file] of Object.entries(files)) {
        if (path.endsWith(`.${extension}`)) replacements.set(path, blob(replacePaths(new TextDecoder().decode(decode(file.data))), file.type))
      }
    }
    const html = replacePaths(new TextDecoder().decode(decode(files['/index.html'].data)))
    input.value = ''
    encrypted = null
    document.open()
    document.write(html)
    document.close()
  } catch (error) {
    urls.forEach(url => URL.revokeObjectURL(url))
    status.textContent = error.message === 'password' ? '비밀번호가 일치하지 않습니다.' : error.message === 'browser' ? '최신 브라우저에서 HTTPS 주소로 접속해 주세요.' : '문서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
    if (error.message === 'password') input.setAttribute('aria-invalid', 'true')
    button.disabled = false
    input.focus()
  }
})
