# angular-link-header-parser

AngularJS factory that parse Link header and return a JSON object.

## TODO

* unit testing
* more code documentations
* add examples

## License

Released under the terms of the [MIT License](https://github.com/igorissen/angular-link-header-parser/blob/master/LICENSE.md).

## Contributing

If you want to contribute, please read this small [guide](https://github.com/igorissen/angular-link-header-parser/blob/master/CONTRIBUTING.md).

## Changelog

You ask yourself what has changed? Please read the [changelog](https://github.com/igorissen/angular-link-header-parser/blob/master/CHANGELOG.md).

## Installation

```
bower install [--save] angular-link-header-parser
```

## Usage

Include `angular-link-header-parser.js` or minified version `angular-link-header-parser.min.js`.

```html
<script src="path/to/vendors/angular-link-header-parser/release/angular-link-header-parser.js"></script>
<!-- OR -->
<script src="path/to/vendors/angular-link-header-parser/release/angular-link-header-parser.min.js"></script>
```

Add the module `ig.linkHeaderParser` as a dependency to your app module.

```js
angular.module("app", [ "ig.linkHeaderParser" ]);
```

Then when needed inject `linkHeaderParser` as a dependency.

```js
angular
  .module("app")
  .controller("Controller", Controller);

Controller.$inject = [ "linkHeaderParser" ];

function Controller(linkHeaderParser) {
  var vm = this;
  
  var linkHeaderText = '<http://localhost:28786/dev/certifications?page=1&limit=100>; rel="first", <http://localhost:28786/dev/certifications?page=1&limit=100>; rel="last", <http://localhost:28786/dev/certifications?page=1&limit=100>; rel="next", <http://localhost:28786/dev/certifications?page=1&limit=100>; rel="prev"';
  
  var json = linkHeaderParser.parse(linkHeaderText);
  
  console.log(json);
}
```

You will receive a JSON object like this :

```json
{
  "first": {
    "limit": 100,
    "page": 1,
    "url": "http://localhost:28786/dev/certifications?page=1&limit=100"
  },
  "last": {
    "limit": 100,
    "page": 1,
    "url": "http://localhost:28786/dev/certifications?page=1&limit=100"
  },
  "next": {
    "limit": 100,
    "page": 1,
    "url": "http://localhost:28786/dev/certifications?page=1&limit=100"
  },
  "prev": {
    "limit": 100,
    "page": 1,
    "url": "http://localhost:28786/dev/certifications?page=1&limit=100"
  },
}
```