import { series } from 'gulp'
import { pkgPath } from '../utils/paths'
import run from '../utils/run'

export async function publishComponent() {
  run('pnpm publish --access public --no-git-checks', `${pkgPath}/naive-ui-next`)
}

export default series(async () => publishComponent())
