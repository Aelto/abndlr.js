exports.abort = () => console.log('bundling aborted.\n')

exports.getExtension = (name) => name.split('.').splice(-1, 1)[0]
