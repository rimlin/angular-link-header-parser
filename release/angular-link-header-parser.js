var URIUtil = require('uri-util');

(function () {
  angular
    .module("ig.linkHeaderParser", [])
    .factory("linkHeaderParser", linkHeaderParser);

  /* @ngInject */
  function linkHeaderParser() {
    var service = {
      parse: parse
    };

    return service;

    ////////////////////////////////////////////////////

    /**
     *
     * @param linkHeader
     * @returns {*}
     */
    function parse(linkHeader) {
      var linkHeaderObject = {};


      if ( typeof linkHeader !== "string" )
        return new Error("Expected a string as parameter type but received: '" + typeof linkHeader + "'!");
      if ( linkHeader.length == 0 )
        return new Error("Empty string provided!");

      var links = linkHeader.split(",");


      _.forEach(links, function (link) {
        _parseElement(link, linkHeaderObject);
      });


      return linkHeaderObject;
    }

    ////////////////////////////////////////////////////

    /**
     *
     * @param element
     * @param object
     * @private
     */
    function _parseElement(element, object) {

      var items = element.split(";");

      items[ 0 ] = items[ 0 ].trim();
      items[ 1 ] = items[ 1 ].trim();


      object[ _parseRelElement(items[ 1 ]) ] = _parseURLElement(items[ 0 ]);
    }

    /**
     *
     * @param relElement
     * @returns {*}
     * @private
     */
    function _parseRelElement(relElement) {

      var items = relElement.split("=");

      items[ 1 ] = items[ 1 ].trim().toLowerCase();
      items[ 1 ] = items[ 1 ].replace(/"/g, "");


      return items[ 1 ];
    }

    /**
     *
     * @param urlElement
     * @returns {*|{}}
     * @private
     */
    function _parseURLElement(urlElement) {

      urlElement = urlElement.replace(/^</, "").replace(/>$/, "");

      var extracted = URIUtil.parse(urlElement);

      extracted.url = urlElement;


      return extracted;
    }
  }
  linkHeaderParser.$inject = [];
})();
