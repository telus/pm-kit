const path = require('path')

module.exports = {
  rootDir: path.resolve('packages'),
  roots: ['<rootDir>'],
  setupFiles: [path.resolve('config/jest/setupGlobals.js')],
  setupFilesAfterEnv: [path.resolve('node_modules/jest-enzyme/lib/index.js')],
  testEnvironment: 'enzyme',
  snapshotSerializers: ['jest-emotion'],
}
