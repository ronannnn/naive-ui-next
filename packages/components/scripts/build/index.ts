import fs from 'node:fs'
import { series } from 'gulp'
import delPath from '../utils/delpath'
import { componentPath, pkgPath } from '../utils/paths'
import run from '../utils/run'
import { PROJECT_NAME } from '../version'

export async function buildComponent() {
  await run('pnpm run build', componentPath)
}

export default series(
  async () => delPath(`${pkgPath}/${PROJECT_NAME}`),
  async () => await buildComponent(),
  async () => {
    fs.rmSync(`${pkgPath}/${PROJECT_NAME}/es/scripts`, { recursive: true, force: true })
    fs.rmSync(`${pkgPath}/${PROJECT_NAME}/lib/scripts`, { recursive: true, force: true })
  },
)
