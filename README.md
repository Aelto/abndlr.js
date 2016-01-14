# abndlr.js
javascript bundler for node

# Install
```bash
$ npm install abndlr -g
```

# How to use
go to the folder you want to bundle then type
```bash
$ abndlr
```
# The options
3 arguments are available, their position are not important
* a path to the folder you want to bundle
* the bundle file name
* a path to the .json configuration file (todo)

## With options
```bash
$ abndlr bundle.js ./bin config.json
```
is the same as
```bash
$ abndlr config.json bundle.js ./bin 
```
