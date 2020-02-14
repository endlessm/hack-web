var Path = require('path');
var Program = require('commander');

var Config = require('../package.json');
var Lambda = require('../lib/lambda');
var Utils = require('../lib/utils');

Program
    .version(Config.version)
    .option('--dryrun', 'Install and run function tests but do not deploy to AWS Lambda')
    .option('-f,--force', 'Removes node_modules from modules and functions before running npm install')
    .option('-b,--branch [branchname]', 'The release branch to target when deploying. Defaults to master')
    .parse(process.argv);

function install (moduleName) {
    return Utils.installModule(moduleName, Program.force);
}

// zips the given module and attempts to upload the function to AWS Lambda
function deploy (moduleName) {
    if (Program.dryrun) {
        console.log('  Skipping deployment...');
        return Promise.resolve();
    }
    console.log('  Generating zipfile...');
    return Utils.generateZip(moduleName, Program.branch)
    .then(function (zipData) {
        var metadata = require(Path.join(Utils.getModulePath(moduleName), 'package.json'));

        var branch = Program.branch;
        if (!branch) {
            branch = 'master';
        }

        console.log(`  Deploying to AWS (branch: ${branch})...`);

        // AWS Lambda doesn't support periods in function names, so replace
        // them with dashes
        branch = branch.replace(/\./g, '-');

        // separate the function name from its branch with an underscore
        metadata.name += '-' + branch;
        metadata.version = Config.version;

        // required parameters
        var params = {
            FunctionName: metadata.name,
            Code: {
                ZipFile: zipData,
            },
            Handler: metadata.lambda.handler,
            Role: metadata.lambda.role,
            Runtime: 'nodejs12.x',
        };

        Utils.setProp(metadata, 'description', params, 'Description');
        Utils.setProp(metadata.lambda, 'timeout', params, 'Timeout');
        Utils.setProp(metadata.lambda, 'memorySize', params, 'MemorySize');
        return Lambda.deployFunction(params);
    });
}

// For every module enumerated in the main package.json, perform:
//  - npm install
//  - npm test
//  - AWS Lambda deploy
Utils.blockingForEach(Config.lambdaFunctions, function (lambdaName) {
    console.log(`Deploying ${lambdaName}`);
    return Utils.testIfExists(lambdaName)
    .then(install)
    .then(deploy)
    .then(function () {
        console.log(`Successfully deployed ${lambdaName}\n`);
    })
    .catch(function (err) {
        console.error(`Failed to deploy ${lambdaName} ${err.stack}\n`);
        process.exit(1);
    });
});
