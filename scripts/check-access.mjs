import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { pbkdf2Sync, createDecipheriv, createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'
const bytes = await readFile('dist/document.enc')
const password = process.env.HANDOFF_PASSWORD
assert.ok(password, 'HANDOFF_PASSWORD is required')
function decrypt(password, data = bytes) {
  const key = pbkdf2Sync(password, data.subarray(0, 16), 600000, 32, 'sha256')
  const decipher = createDecipheriv('aes-256-gcm', key, data.subarray(16, 28))
  decipher.setAuthTag(data.subarray(-16))
  return JSON.parse(gunzipSync(Buffer.concat([decipher.update(data.subarray(28, -16)), decipher.final()])))
}
assert.throws(() => decrypt(`${password}-wrong`))
const changed = Buffer.from(bytes); changed[40] ^= 1
assert.throws(() => decrypt(password, changed))
const files = decrypt(password)
assert.ok(files['/index.html'])
assert.deepEqual(await readFile('dist/umc-app-icon.png'), await readFile('public/umc-app-icon.png'))
assert.ok(Buffer.from(files['/index.html'].data, 'base64').toString().includes('umc-app-icon.png'))
const captures = (await readdir('app-capture', { recursive: true })).filter(path => /^(ios|android)\/\d{2}(?:-\d+)?_.*\.png$/.test(path))
assert.ok(captures.some(path => path.startsWith('ios/')) && captures.some(path => path.startsWith('android/')))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const publishedImages = new Set(Object.values(files).filter(file => file.type === 'image/png').map(file => hash(Buffer.from(file.data, 'base64'))))
for (const path of captures) assert.ok(publishedImages.has(hash(await readFile(`app-capture/${path}`))), `Missing encrypted capture: ${path}`)
for (const [path, file] of Object.entries(files)) assert.deepEqual(Buffer.from(file.data, 'base64'), await readFile(`.sites-runtime/client${path}`))
assert.deepEqual((await readdir('dist')).sort(), ['.openai', 'document.enc', 'index.html', 'umc-app-icon.png', 'unlock.js'])
for (const path of ['dist/index.html', 'dist/unlock.js']) {
  const text = await readFile(path, 'utf8')
  assert.ok(!text.includes(password), 'Password must not be published')
  assert.ok(!text.includes('화면별 기능 명세'), 'Private document must not be published in plaintext')
}
console.log('Access checks passed: correct password, wrong password, tampering, all captures, encrypted-only publish output.')
