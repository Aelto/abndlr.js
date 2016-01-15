'use strict';
const fs = require('fs')
const util = require('./util.js')

// searching for files synchronously
const finder = (path, bundle, bundleName) => {
    const files = fs.readdirSync(path)
    
    files.forEach( fileName => {
        const fullPath = path + '/' + fileName
        const dir = fs.lstatSync(fullPath).isDirectory()

        if (dir) return finder(fullPath, bundle, bundleName)

        if (util.getExtension( fileName ) === 'js' && fileName !== bundleName) {
            const comment = `// ----- ${fileName}\n`
            const data = comment + fs.readFileSync(fullPath, 'utf8')
            bundle.push({fileName, data})
        }
    })

}
exports.finder = finder

exports.finderAsync = (path, bundle, deep) => {
    fs.readdir(path, (err, files) => {
        if (err) {
            console.log(err)
        } else if (!!files.length) {
            files.forEach( fileName => {
                fs.lstat(path + '/' + fileName, (err, stats) => {
                    if (stats.isDirectory()) return finder(path + '/' + fileName, deep + ' ')
                    isFile(path, fileName)
                })
            } )
        }
    })
}

function isFile(path, fileName) {
    fs.readFile(path + fileName, 'utf8', (err, data) => {

        console.log(`${deep}-${fileName}`)
    })
}
