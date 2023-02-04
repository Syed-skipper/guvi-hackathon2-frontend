const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "stream":false,
      "crypto":false,
      "http":false,
      "https":false,
      "net":false,
      "tls": false,
      "asn1.js":false,
      "json-stringify-safe": false,
      "mime": false,
      "punycode":false,
      "path": false,
      "querystring": false,
      "zlib": false,
      "os": require.resolve("os-browserify")
    }
  },
};