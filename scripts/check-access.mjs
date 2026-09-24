import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { pbkdf2Sync, createDecipheriv } from 'node:crypto'
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
const captures = (await readdir('app-capture')).filter(path => /^\d{2}_.*\.png$/.test(path))
assert.equal(Object.keys(files).filter(path => /\/\d{2}_.*\.png$/.test(path)).length, captures.length)
for (const [path, file] of Object.entries(files)) assert.deepEqual(Buffer.from(file.data, 'base64'), await readFile(`.sites-runtime/client${path}`))
assert.deepEqual((await readdir('dist')).sort(), ['.openai', 'document.enc', 'index.html', 'unlock.js'])
for (const path of ['dist/index.html', 'dist/unlock.js']) {
  const text = await readFile(path, 'utf8')
  assert.ok(!text.includes(password), 'Password must not be published')
  assert.ok(!text.includes('화면별 기능 명세'), 'Private document must not be published in plaintext')
}
console.log('Access checks passed: correct password, wrong password, tampering, all captures, encrypted-only publish output.')
