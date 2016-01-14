'use strict';
const readline = require('readline')
const util = require('./util.js')
const bundler = require('./bundler.js')

exports.noArg = (info) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('no path was supplied, confirm? (y/n)\t', (a) => {
        if (a === 'n') {
            util.abort()
            return rl.close()
        } else {
            rl.close()
            console.log(`no bundle name was given, ${info.bundleName} will be used`)
            bundler.bundleStart(info, [])
        }
    })
}

exports.anyArg = (info, args) => {
    const max = args.length
    // filters the argument
    for (let i = 0; i < max; i++) {
        let $ = args[0]

        if (util.getExtension( $ ) === 'js') {

            info.bundleName = args.splice(0, 1)[0]

        } else if (util.getExtension( $ ) === 'json') {

            info.config = fs.readFileSync(args.splice(0, 1)[0], 'utf8')
        }
    }

    if (!!args.length) info.path = args[0]

    // preparing recursive function
    bundler.bundleStart(info, [])
}
