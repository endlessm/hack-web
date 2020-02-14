var Aws = require('aws-sdk');

var AWS_LAMBDA_API_VERSION = '2015-03-31';
var AWS_REGION = 'us-east-2';

var _lambda = null;
function _getLambdaHandle () {
    return new Promise(function (resolve, reject) {
        if (_lambda === null) {
            var envVars = ['AWS_SECRET_ACCESS_KEY', 'AWS_ACCESS_KEY_ID'];
            var allSet = envVars.every(process.env.hasOwnProperty, process.env);

            if (!allSet)
                throw new Error(`The following AWS environment variables must be set: ${envVars}`);

            Aws.config.update({
                accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
                secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
                region: process.env['AWS_REGION'] || AWS_REGION,
            });

            _lambda = new Aws.Lambda({
                apiVersion: AWS_LAMBDA_API_VERSION,
            });
        }

        resolve(_lambda);
    });
}

// Given a full set of parameters for an AWS Lambda::createFunction call,
// either update an existing Lambda function by that name or create the
// function if it doesn't already exist
exports.deployFunction = function (params) {
    return  _getLambdaHandle()
    .then(function (lambda) {
        return lambda.getFunction({
            FunctionName: params.FunctionName,
        })
        .promise()
        .then(function (data) {
            return lambda.updateFunctionCode({
                FunctionName: params.FunctionName,
                ZipFile: params.Code.ZipFile,
            })
            .promise()
            .then(function (data) {
                delete params.Code;
                delete params.Runtime;
                return lambda.updateFunctionConfiguration(params).promise();
            });
        }, function (err) {
            if (err.statusCode === 404) {
                return lambda.createFunction(params).promise();
            } else {
                throw err;
            }
        });
    });
};
