'use strict';
const fs = require('fs')
const readline = require('readline')
const filesearch = require('./filesearch.js')

const createBundle = (info) => {
    let globalData = ''

    if (!!info.config && !!info.config.order && info.config.order.length > 0) {
        // files need to be bundled in a specific order
        const orderList = info.config.order

        orderList.forEach((fileName) => {
            for (let file of info.bundle) {

                if (file.fileName === fileName) {
                    // add the data to the bundle
                    globalData += `\n\n\n${file.data}`

                    // remove the data from the data list
                    info.bundle.splice(info.bundle.indexOf(file), 1)
                }
            }
        })
    }

    for (let i = 0; i < info.bundle.length; i++) {
        globalData += `\n\n\n${info.bundle[i].data}`
    }

    fs.writeFile(info.bundleName, globalData, 'utf8', (err) => {
        if (err) throw err
        console.log(`done. ${globalData.split('\n').length} LOC`)
    })
}

exports.bundleStart = (info) => {
    console.log('now starting.')

     // not searching for specific files: running in global synchronous mode to read all files found
     if (info.config === null || !!info.config && !info.config.search)
        filesearch.finder(info.path, info.bundle, info.bundleName) // not giving the object itself because i don't want it to be modified by the function

    // bundle the files
    fs.readdir('.', (err, dir) => {
        // file already exist: ask confirmation for overwriting
        if (dir.indexOf(info.bundleName) > -1) return overWrite(info, createBundle)

        // no file found with the bundle name: create and write inside a new file
        createBundle(info)
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
