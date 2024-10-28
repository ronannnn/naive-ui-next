import fs from 'node:fs'
import { resolve } from 'node:path'
import { PROJECT_NAME } from '../version'
import { pkgPath } from './paths'

const stayFile = ['package.json', 'README.md']

async function delPath(path: string) {
  let files: string[] = []

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)

    files.forEach(async (file) => {
      const curPath = resolve(path, file)

      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file !== 'node_modules')
          await delPath(curPath)
      }
      else {
        // delete file
        if (!stayFile.includes(file)) {
          fs.unlinkSync(curPath)
        }
      }
    })

    if (path !== `${pkgPath}/${PROJECT_NAME}`)
      fs.rmSync(path, { recursive: true, force: true })
  }
}
export default delPath
