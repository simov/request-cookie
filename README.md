
# request-cookie

[![npm-version]][npm] [![test-ci-img]][test-ci-url] [![test-cov-img]][test-cov-url] [![snyk-vulnerabilities]][snyk]

> _Cookie store for [request-compose]_

```js
var compose = require('request-compose')
var cookie = require('request-cookie')
compose.Request.cookie = cookie.Request
compose.Response.cookie = cookie.Response
var request = compose.client

;(async () => {
  var cookie = {}
  var {body} = await request({
    url: 'http://website.com',
    cookie,
  })
})()
```

  [npm-version]: https://img.shields.io/npm/v/request-cookie.svg?style=flat-square (NPM Version)
  [test-ci-img]: https://img.shields.io/github/actions/workflow/status/simov/request-cookie/test.yml?style=flat-square (Build Status)
  [test-cov-img]: https://img.shields.io/coveralls/simov/request-cookie.svg?style=flat-square (Test Coverage)
  [snyk-vulnerabilities]: https://img.shields.io/badge/vulnerabilities-0-geen?style=flat-square (Vulnerabilities)

  [npm]: https://www.npmjs.com/package/request-cookie
  [test-ci-url]: https://github.com/simov/request-cookie/actions/workflows/test.yml
  [test-cov-url]: https://coveralls.io/r/simov/request-cookie?branch=master
  [snyk]: https://snyk.io/test/npm/request-cookie

  [request-compose]: https://www.npmjs.com/package/request-compose
