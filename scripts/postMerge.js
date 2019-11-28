const { execSync } = require('child_process')
const chalk = require('chalk')

const diff = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')

if (diff.includes('package.json')) {
  console.log(
    chalk.yellow.bgBlack('Reminder:') +
      chalk.yellow(" one or more package.json files have changed, you may want to run 'npm run bootstrap'")
  )
}
