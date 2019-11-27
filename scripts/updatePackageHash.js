const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { execSync } = require('child_process')

const hashFile = filepath => {
  const hashSum = crypto.createHash('md5')
  const contents = fs.readFileSync(filepath, 'utf-8')
  const packageBlob = JSON.parse(contents)

  const dependencies = {
    dependencies: packageBlob['dependencies'] || {},
    devDependencies: packageBlob['devDependencies'] || {},
  }
  const depsJson = JSON.stringify(dependencies)
  hashSum.update(Buffer.from(depsJson))
  return hashSum.digest('hex')
}

const getPackageJsons = currentPath => {
  const files = []
  const items = fs.readdirSync(currentPath)
  items.forEach(item => {
    const itemPath = path.join(currentPath, item)
    if (item.search(/^package.json$/) >= 0) {
      files.push(itemPath)
    } else if (fs.statSync(itemPath).isDirectory() && item.search(/^node_modules$/) < 0) {
      files.push(...getPackageJsons(itemPath))
    }
  })
  return files
}

const base = path.join(__dirname, '..')
const rootPackageJson = path.join(base, 'package.json')
const foldersToCheck = ['packages']

const packageJsonlist = [rootPackageJson]
foldersToCheck.forEach(folder => {
  const results = getPackageJsons(path.join(base, folder))
  packageJsonlist.push(...results)
})

const packageHashPath = path.join(base, '.packagehash')
const recentDigest = packageJsonlist.reduce((combined, file) => {
  return combined.concat(hashFile(file))
}, '')

if (!fs.existsSync(packageHashPath) || fs.readFileSync(packageHashPath, 'utf-8') !== recentDigest) {
  console.log('Updating packagehash...')
  fs.writeFileSync(packageHashPath, recentDigest)

  execSync('git add ./.packagehash')
}
