'use strict'

const FJS = require('fast-json-stringify')
const path = require('path')
const fs = require('fs')

const debugCompiled = FJS({
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    code: { type: 'string' },
    error: { type: 'string' },
    message: { type: 'string' }
  }
}, { debugMode: true })

const file = path.join(__dirname, '..', 'lib', 'error-serializer.js')
const rawString = debugCompiled.toString()

const moduleCode = `// This file is autogenerated by build/build-error-serializer.js, do not edit
/* istanbul ignore file */
module.exports = $main
${rawString.slice(5)}
`

fs.writeFileSync(file, moduleCode)
console.log(`Saved ${file} file successfully`)