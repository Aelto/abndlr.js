const fs = require('fs')
const readline = require('readline')
const filesearch = require('./filesearch.js')

exports.bundleStart = (info) => {
    console.log('now starting.')
     // get all the data from the files
    filesearch.finder(info.path, info.bundle, info.bundleName) // not giving the object itself because i don't want it to be modified by the function

    // bundle the files
    const createBundle = (info) => {
        fs.writeFile(info.bundleName, info.bundle.join('\n\n\n'), 'utf8', (err) => {
            if (err) throw err
            console.log(`done. ${info.bundle.join('\n\n\n').split('\n').length} LOC`)
        })
    }

    fs.open(info.bundleName, 'wx', (err, fd) => {
        // file already exist: ask confirmation for overwriting
        if (err) return overWrite(info, createBundle)

        // no file found with the bundle name: create and write inside a new file
        createBundle(info.bundleName, info.bundle)
    })
}

function overWrite (info, callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question(`file "${info.bundleName}" already exists, confirm overwriting? (y/n)\t`, (a) => {
        if (a === 'n') {
            console.log('bundling aborted.\n')
            return rl.close()
        } else {
            rl.close()
            callback(info)
        }
    })
}
exports.overWrite = overWrite
