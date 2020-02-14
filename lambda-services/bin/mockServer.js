var Express = require('express');
var Http = require('http');
var Path = require('path');
var Program = require('commander');
var Util = require('util');

var Config = require('../package.json');
var Utils = require('../lib/utils');

Program
    .version(Config.version)
    .option('-f, --force', 'Remove node_modules from modules and functions before running npm install')
    .option('-p, --port <port>', 'Specify the port to listen to (default: 4444)', '4444')
    .parse(process.argv);

const BASE_API_FORMAT = '/2015-03-31/functions/%s/invocations/';

function install (moduleName) {
    return Utils.installModule(moduleName, Program.force);
}

function setupRoute (moduleName) {
    var metadata = require(Path.join(Utils.getModulePath(moduleName), 'package.json'));
    metadata.version = Config.version;

    // this will load what is specified in the package.json's "main" field
    var lambda = require(Utils.getModulePath(moduleName));

    // strip the main from the handler signature
    var mainImport = Path.basename(metadata.main, '.js');
    var idx = metadata.lambda.handler.indexOf(mainImport);

    if (idx == -1)
        return Promise.reject(new Error(`Could not parse package.json for lambda ${moduleName}: ` +
                                        `lambda.handler line does not contain main import`));

    var handlerName = metadata.lambda.handler.substr(idx + mainImport.length + 1);
    app.post(Util.format(BASE_API_FORMAT, metadata.name), function (request, response) {
        function _sendError (res, handled) {
            res.set({
                'X-Amz-Function-Error': handled ? 'Handled' : 'Unhandled',
            })
            .status(200)
            .end();
        }

        function _processBody (body) {
            var context = {
                succeed: function (data) {
                    var elapsed = process.hrtime(this.startTime);
                    var elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
                    console.log(`Succesfully invoked function ${metadata.name} in ${elapsedMs} ms`);
                    response.json(data);
                },
                fail: function (e) {
                    console.log(`Failed to invoke function ${metadata.name}`);
                    console.log(`Error was: ${e}; Error stack:\n ${e.stack}`);
                    _sendError(response, true);
                },
                startTime: process.hrtime(),
            };

            try {
                var json = JSON.parse(body);
                lambda[handlerName](json, context);
            } catch (e) {
                console.log(`Caught error during invocation of function ${metadata.name}`);
                console.log(`Error was: ${e}; Error stack:\n ${e.stack}`);
                _sendError(response, false);
            }
        }

        var reqBody = '';
        request.on('data', function (chunk) {
            reqBody += chunk;
        });
        request.on('end', function () {
            _processBody(reqBody);
        });
        request.on('error', function (e) {
            console.log(`Error reading request data for function ${metadata.name}`);
            console.log(`Error was: ${e}; Error stack:\n ${e.stack}`);
            _sendError(response, false);
        });
    });

    return Promise.resolve();
}

Program.port = parseInt(Program.port);

var app = Express();
app.set('port', Program.port);

Utils.blockingForEach(Config.lambdaFunctions, function (lambdaName) {
    console.log(`Setting up route for ${lambdaName}`);
    return Utils.testIfExists(lambdaName)
    .then(install)
    .then(setupRoute)
    .then(function () {
        console.log(`Successfully set up route for ${lambdaName}\n`);
    })
    .catch(function (err) {
        console.error(`Failed to set up route for ${lambdaName}: ${err.stack}\n`);
    });
});

var server = Http.createServer(app);
server.listen(app.get('port'));
server.on('listening', function () {
    console.log(`Mock lambda server listening on port ${app.get('port')}`);
});
