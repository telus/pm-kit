#!/usr/bin/env node

// Usage: npm run scaffold <componentName>

/* eslint-disable no-console */

const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { camel, kebab } = require('case')

const componentName = process.argv[2]

if (!componentName) {
  console.error('Usage: node scaffold.js <componentName>')
  process.exit(1)
}

const basePath = `packages/${componentName}`

const scaffold = (template, destination) => {
  const contents = readFileSync(resolve(`scripts/package-template/${template}`), 'utf8')
    .replace(/\$COMPONENT\$/g, componentName)
    .replace(/\$COMPONENT_CAMEL\$/g, camel(componentName))
    .replace(/\$COMPONENT_KEBAB\$/g, kebab(componentName))

  writeFileSync(resolve(`${basePath}/${destination}`), contents)

  console.log(`Created ${basePath}/${destination}`)
}

mkdirSync(resolve(basePath))
mkdirSync(resolve(`${basePath}/__tests__`))

scaffold('Component.jsx', `${componentName}.jsx`)
scaffold('Component.spec.jsx', `__tests__/${componentName}.spec.jsx`)
scaffold('package.json', 'package.json')
scaffold('rollup.config.js', 'rollup.config.js')
scaffold('README.md', 'README.md')
