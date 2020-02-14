var Archiver = require('archiver');
var NodeUtil = require('util');
var Path = require('path');
var Spawn = require('child_process').spawn;
var Stream = require('stream');

// A simple writable stream that records all data to a buffer string. Used to
// capture stdout/stderr from child processes
function Sink () {
    Stream.Writable.call(this);
    this.buffer = '';
}
NodeUtil.inherits(Sink, Stream.Writable);
Sink.prototype._write = function (chunk, encoding, cb) {
    this.buffer += chunk;
    if (cb)
        cb();
    return true;
};

function getModulePath (moduleName) {
    return [__dirname, '..', 'functions', moduleName].join('/');
}

// sets dest[destProp] = src[srcProp] only if srcProp is defined on src
function setProp (src, srcProp, dest, destProp) {
    if (src.hasOwnProperty(srcProp)) {
        dest[destProp] = src[srcProp];
        return;
    }
}

// Calls an async function on each member of arr, but waits for the last
// invocation to finish before proceeding to the next element
function blockingForEach (arr, fn) {
    if (arr.length === 0)
        return Promise.resolve();
    var head = arr[0];
    var tail = arr.slice(1);
    return fn(head)
    .then(function () {
        return blockingForEach(tail, fn);
    });
}

// Promisified child_process.spawn
function spawnP (cmd, args, options) {
    return new Promise(function (resolve, reject) {
        var child = Spawn(cmd, args, options);

        var sink = new Sink();
        child.stdin.pipe(sink);
        child.stdout.pipe(sink);

        child.on('exit', function (code, signal) {
            if (code !== null && code === 0) {
                resolve(sink.buffer);
            } else {
                reject({
                    code: code,
                    signal: signal,
                    log: sink.buffer,
                });
            }
        });
    });
}

// Zips all files in the given submodule and resolves on a buffer to that zip
function generateZip (moduleName, branch = 'master') {
    // FIXME: this could use streams and be more efficient, except aws-sdk
    // doesn't current allow streams for zip uploads
    return new Promise(function (resolve, reject) {
        var zipper = Archiver('zip');

        var buffers = [];
        zipper.on('data', function (buffer) {
            buffers.push(buffer);
        });
        zipper.on('end', function () {
            var buffer = Buffer.concat(buffers);
            resolve(buffer);
        });
        zipper.on('error', function (error) {
            reject(error);
        });

        // appends all contentes in the module's directory
        var modulePath = getModulePath(moduleName);
        var metadata = require(Path.join(modulePath, 'package.json'));

        if (branch === 'stable')
            metadata.userPoolId = metadata.userPoolIdProd;
        else
            metadata.userPoolId = metadata.userPoolIdDev;
        metadata.branch = branch;

        zipper.glob('**', {
            cwd: modulePath,
            ignore: ['package.json']
        });
        zipper.append(JSON.stringify(metadata, null, 4), {name: 'package.json'});
        zipper.finalize();
    });
}

function testIfExists (moduleName) {
    return new Promise(function (resolve, reject) {
        try {
            require(getModulePath(moduleName) + '/package.json');
        } catch (e) {
            reject();
        }
        resolve(moduleName);
    })
    .catch(function () {
        throw new Error(`Could not find package.json at ${getModulePath(moduleName)}`);
    });
}

// runs yarn install within the given module
function installModule (moduleName, force) {
    var childOpts = {
       cwd: getModulePath(moduleName),
    };
    var preInstall = Promise.resolve();
    if (force) {
        console.log('  Removing existing node modules...');
        preInstall = spawnP('rm', ['-rf', 'node_modules'], childOpts);
    }
    console.log('  Installing node modules...');
    return preInstall
    .then(function () {
        return spawnP('yarn', ['install'], childOpts);
    })
    .then(() => moduleName)
    .catch(function (e) {
        console.error(e.log);
        throw new Error(`Could not install node module ${moduleName}`);
    });
}

module.exports = {
    blockingForEach: blockingForEach,
    installModule: installModule,
    generateZip: generateZip,
    getModulePath: getModulePath,
    setProp: setProp,
    spawnP: spawnP,
    testIfExists: testIfExists,
    Sink: Sink,
};
