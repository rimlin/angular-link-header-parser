# Contributing Guide


## Dependencies

To make sure that the following instructions work, please install the following dependencies on your machine:

* Node.js (used v0.12.7, not tested on v4+)
* npm
* bower
* gulp (globally)
* Git

## Installation

Get the source by clonning the git repository:

```
$ git clone https://github.com/igorissen/angular-link-header-parser.git
```

Navigate to the project folder and install needed dependencies:

```
$ npm install
$ bower install
```

## Building

This module comes with a few gulp tasks wich help you automate the development process. The following tasks are provided:

###### gulp help

Will show you the list of available tasks.

###### gulp clean

Will delete `release` folder where the module and his minified version are copied.

###### gulp build-min

Will updates the minified version of the module (`angular-link-header-parser.min.js`).

###### gulp copy-module

Will updates the module (`angular-link-header-parser.js`).

###### gulp build

Simple task wich trigger `build-min` and `copy-module` tasks.

## Submitting fixes and/or improvements

I'm using the `git-flow` process so I have only 2 branches `master` and `develop`. `develop` is used to the development process.

* Checkout a new branch based on `develop` and name it to what you intend to do
	* Example: `$ git checkout -b BRANCH_NAME`
* Make your changes
* Commit your changes
	* Please provide a git message which explains what you've done
* Merge your changes to `develop`
* Make a pull request

Please don't forget to update module version in `bower.json` and `package.json`.