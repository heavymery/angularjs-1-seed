# AngularJS 1 Seed

Seed project for AngularJS 1.

## Source structure

```
+- app
|   +- images
|   +- styles
|   |   +- sass
|   |   +- main.css
|   +- scripts
|   |   +- controllers
|   |   +- app.js
|   |   +- templates.js
|   +- views
|   +- index.html
+- test
|   +- e2e
|   +- spec
|   +- karma.conf.js
+- dist
+- ...
```

**TODO:** Update `app` folder structure to `client` and `server`.

## Development environment

You first need to install [Node.js](http://nodejs.org/). We recommend to use version management tools like a [ndenv](https://github.com/riywo/ndenv).

### Install Node.js (by ndenv)

1. Install ndenv (https://github.com/riywo/ndenv#install)
2. Install node-build (https://github.com/riywo/node-build#install)
3. Install node (version of described in `.node-version` will be installed)

```sh
$ ndenv install
$ ndenv rehash # rehash is desirable after new node.js version installed
```

### Install Node modules / Bower packages

Install node modules described in `package.json`, and  bower packages described in `bower.json`.

```sh
$ npm install
$ ndenv rehash # rehash is desirable after new node module installed
```

### Set `.env`

**TODO:** To run the app locally, create a `.env` file and set below environment variables.

```sh
################################################################################
#
#  Section
#
################################################################################

########################################
#  Sub section
########################################
```


## Development

### Start

Launch local development server with LiveReload.

```sh
$ npm start # or npm run serve
```

Launch local server as `staging` environment.

```sh
$ npm run serve:stg
```

Launch local server as `production` environment.

```sh
$ npm run serve:prod
```

### Test

Run the unit tests.

```sh
$ npm run test
```

Run the E2E tests after unit tests.

```sh
$ npm run test:e2e
```

Run the E2E tests with `ngMockE2E`.

```sh
$ npm run test:mock-e2e
```

**TODO:** Tests are not implemented yet.

### Styleguide

Generate styleguide at `app/styleguide`.

**TODO:** Styles not fixed yet.

## Release

**TODO:** Release process will be automated in future. (using CircleCI or Travis or ...)

Merge to `master` and tagging. (recommend to use [git-flow](https://github.com/nvie/gitflow))

```sh
$ git checkout master && git merge develop # merge develop to master
$ git tag # check current tags
$ git tag vX.X.X # add new tag (e.g. v1.1.1-beta)
$ git push origin master # push master
$ git push origin --tags # push tags
```

### Deploy to Staging

Build for `staging` environment.

```sh
$ npm run build:stg
```

Deploy to `staging` environment.

```sh
$ npm run deploy:stg
```

### Deploy to Production

Build for `production` environment.

```sh
$ npm run build:prod
```

Deploy to `production` environment.


```sh
$ npm run deploy:prod
```
