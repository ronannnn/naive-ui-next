import { parallel, series } from 'gulp'
import delPath from '../utils/delpath'
import { componentPath, pkgPath } from '../utils/paths'
import run from '../utils/run'
import { PROJECT_NAME } from '../version'

export function removeDist() {
  return delPath(`${pkgPath}/${PROJECT_NAME}`)
}

export async function buildComponent() {
  run('pnpm run build', componentPath)
}

export default series(
  async () => removeDist(),
  parallel(
    async () => buildComponent(),
  ),
)
