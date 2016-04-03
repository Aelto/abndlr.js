# abndlr.js
javascript bundler for node

# Install
```bash
$ npm install abndlr -g
```

# How to use
go to the directory you want to bundle then type
```bash
abndlr config.json path_to_directory bundle_path_and_name
```

# Your json configuration file
```json
{
  "bundler": {
    "order": ["file_1.js", "file_2.js", ...],
    "ignore": ["file_79.js", ...]
  }
}
```
let the arrays empty if you don't want to order or ignore any files
