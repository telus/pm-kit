const { execSync } = require('child_process')
const chalk = require('chalk')

const diff = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')

const checkChanges = ['package.json', 'packages/', 'shared/']

if (checkChanges.some(string => diff.includes(string))) {
  console.log(chalk.yellow.bgBlack('Reminder:') + chalk.yellow(" you may want to run 'npm run bootstrap'"))
}
