const readline = require('readline')
const { spawnSync, execSync } = require('child_process')

const diff = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD')

if (diff.includes('package.json')) {
  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  read.question(
    'One or more package.json files have changed, would you like to rerun bootstrap script? (y/n) ',
    answer => {
      read.close()
      if (answer === 'Y' || answer === 'y') {
        spawnSync('npm', ['run', 'bootstrap'], {
          stdio: [process.stdin, process.stdout, process.stderr],
          encoding: 'utf-8',
        })
      }
    }
  )
}
