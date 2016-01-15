#! /usr/bin/env node
'use strict'

const filesearch = require('./filesearch.js')
const readarg = require('./readarg.js')

const information = {
    bundleName: 'bndlr_index.js',
    config: null,
    path: '.',
    bundle: []
}
const args = process.argv.splice(2) // taking only arguments written by user, if any

// no arguments were given
if (!args.length) readarg.noArg(information)

// more than 3 arguments results in an error
if (args.length > 3) throw console.log('only 3 arguments needed')

// 1 to 3 arguments were given
if (args.length > 0) readarg.anyArg(information, args)
