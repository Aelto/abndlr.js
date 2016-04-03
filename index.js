#! /usr/bin/env node
'use strict'

;(() => {
    const fs = require('fs')

    // take only arguments written by the user, if any
    const args = process.argv.splice(2)

    // if more than 3 or less than 2 arguments were supplied, throw error
    if (args.length !== 3)
        throw 'args: config.json directory bundle-name'

    const configPath = args[0]
    const folderPath = args[1]
    const bundleName = args[2]

    // create an object using the supplied json file
    let config = JSON.parse(fs.readFileSync(configPath))
    config = config.bundler || {order: [], ignore: []}

    if (!config.order) config.order = []
    if (!config.ignore) config.ignore = []

    console.log(config)


    // will hold the content of every .js file found inside the folder
    const bundle = []

    // returns true if the arr contains n
    const includes = (arr, n) => arr.filter(v => v === n).length > 0

    const recursiveSearch = (path) => {
        // get the list of every file/folder in the current directory
        const files = fs.readdirSync(path)

        files.forEach( fileName => {
            const fullPath = path + '/' + fileName
            const isDir =  fs.lstatSync(fullPath).isDirectory()

            // found another directory, start a recursiveSearch inside
            if (isDir) return recursiveSearch(fullPath)

            // the current file is a .js file, has a different name than the bundle name, and is not in the ignored list
            if (fileName.slice(-3) === '.js' && fileName !== bundleName && !includes(config.ignore, fileName))
                bundle.push({fileName, content: fs.readFileSync(fullPath, 'utf8'), done: false})
        })
    }

    const createBundle = () => {
        // define the final output
        let output = ''

        // start by the ordered files
        config.order.forEach(name => {
            // get an array of files with the same name
            const files = bundle.filter(o => o.fileName === name)

            if (!files.length) return

            files.forEach(o => {
                // check if the file is already in the final output
                if (!!o.done) return

                output += `\n\n\n// ----- ${o.fileName}\n${o.content}\n`
                o.done = true
            })
        })

        // now do the unordered files
        bundle.forEach(o => {
            // check if the file is already in the final output
            if (!!o.done) return

            output += `\n\n\n// ----- ${o.fileName}\n${o.content}\n`
            o.done = true
        })
        return output
    }

    recursiveSearch(folderPath)

    const bundleFinal = createBundle()
    fs.writeFileSync(bundleName, bundleFinal)

    console.log(`bundle created as '${bundleName}', with a total of ${bundleFinal.split('\n').length} lines`)
})()
