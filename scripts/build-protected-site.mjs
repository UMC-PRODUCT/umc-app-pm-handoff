import { readdir, readFile, mkdir, rm, writeFile, copyFile } from 'node:fs/promises'
import { randomBytes, pbkdf2Sync, createCipheriv } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const password = process.env.HANDOFF_PASSWORD
if (!password) throw new Error('HANDOFF_PASSWORD is required. Refusing to publish an unlocked site.')
const root = fileURLToPath(new URL('../', import.meta.url))
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' }
const files = {}
async function collect(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}/${entry.name}`
    if (entry.isDirectory()) await collect(join(directory, entry.name), path)
    else files[path] = { type: types[extname(path)] ?? 'application/octet-stream', data: (await readFile(join(directory, entry.name))).toString('base64') }
  }
}
await collect(join(root, '.sites-runtime/client'))
// This site has one bundled JS entry. Fail closed if future code splitting changes that contract.
if (Object.keys(files).filter(path => path.endsWith('.js')).length !== 1) throw new Error('Protected build requires one JavaScript bundle.')
const salt = randomBytes(16), iv = randomBytes(12)
const key = pbkdf2Sync(password, salt, 600000, 32, 'sha256')
const cipher = createCipheriv('aes-256-gcm', key, iv)
const encrypted = Buffer.concat([cipher.update(gzipSync(JSON.stringify(files))), cipher.final(), cipher.getAuthTag()])
const dist = join(root, 'dist')
await rm(dist, { recursive: true, force: true })
await mkdir(join(dist, '.openai'), { recursive: true })
await writeFile(join(dist, 'document.enc'), Buffer.concat([salt, iv, encrypted]))
await copyFile(join(root, 'public/umc-app-icon.png'), join(dist, 'umc-app-icon.png'))
await copyFile(join(root, 'access/index.html'), join(dist, 'index.html'))
await copyFile(join(root, 'access/unlock.js'), join(dist, 'unlock.js'))
await copyFile(join(root, '.openai/hosting.json'), join(dist, '.openai/hosting.json'))
console.log(`Encrypted ${Object.keys(files).length} files. No unencrypted document or screenshots in dist.`)
