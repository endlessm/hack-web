# Hack web lambda-services

Repository for Hack Web AWS Lambda functions.


Creating Lambda functions:
--------------------------

To add a new Lambda function `foo`:

1. `mkdir functions/foo`
2. Create a `functions/foo/package.json` which defines the runtime and dev
dependencies of `foo` (a description would be nice, too)
3. Add a `lambda` key to your `package.json` with the following properties:
    * `handler`: **(required)** the name of your Lambda function's handler
      method
    * `role`: **(required)** the ARN of your function's role
    * `memorySize`: (optional) how much RAM (in MB) should be allocated to your
      function, defaults to 128
4. Implement your function, add unit tests, setup your `npm test` script
5. Add `foo` to this directory's `package.json`'s `lambdaFunctions` list

Your function will now be deployable to Lambda by running `npm run deploy`.
Note that the following environment variables must be set for the targeted
Lambda account:
* `AWS_SECRET`
* `AWS_REGION`
* `AWS_ACCESS_KEY`


Modules vs. Functions:
----------------------

To share code between two Lambda functions, create a separate node module
(complete with its own `package.json`) in the `modules` directory. Then in your
Lambda function's `package.json`, list the module you just made as a
dependency.  For example:

```
{
    dependencies: {
        "my-great-module": "file:../../modules/my-great-module"
    }
}
```

Now you can `require('my-great-module')` within your Lambda function.


Testing Lambda functions:
-------------------------

You can test your specific Lambda functions by running `npm test` within the
function's directory, or you can test all functions by running

`npm run deploy -- --dryrun`

which will perform all the deployment steps except for zipping/sending your
Lambda function to AWS.

There is also a `--force` option for the deploy script that'll remove each
function's `node_modules` dir before re-installing it, ensuring you have the
latest version of e.g. a local module.

It's also possible to deploy the Lambda functions on a "mock" server that does
not use AWS. The mock server is available when running

`npm run mock-server`

which will start it with the default options. It's possible to override the
port the mock server listens to passing a `--port` option.  The default is
`4444`.

Testing modules:
----------------

`npm test` while in `cognito-lambda-services` will run the unit tests in each
module.
