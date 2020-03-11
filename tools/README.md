# Tools

Some tools require git submodules. Make sure they have been
initialized:

    git submodule init
    git submodule update --remote

## inklecate

This tool can compile and play `.ink` files.

To compile the `.ink` file to the JSON bytecode-like format:

    tools/inklecate TheIntercept.ink

To play the `.ink` file in the command line:

    tools/inklecate -p TheIntercept.ink


## Deploy

The deploy.js upload the build directory to the AWS S3 bucket, to be able to
deploy you should build before and you should have the deploy credentials.

Add the AWS deploy credentials to a new `.env` file:

```
# File: .env
KEY='xxxxxxxxxxxxxxxxxxxx'
SECRET='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

Then you can build and deploy using yarn or npm:

```
yarn install
yarn build
yarn deploy
```
