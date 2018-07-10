
var url = require('url')
var tough = require('tough-cookie')


exports.Request = (cookie, redirect) => ({options}) => {

  if (cookie && !cookie.store) {
    cookie.store = new tough.CookieJar(undefined, {looseMode: true})
  }

  if (!redirect || !redirect.followed) {
    var header = Object.keys(options.headers)
      .find((name) => name.toLowerCase() === 'cookie')
    if (header) {
      cookie.header = options.headers[header]
    }
  }

  var uri = url.parse(
    `${options.protocol}//${options.hostname}${options.path}`
      + (options.port ? `:${options.port}` : '')
  )

  var cookies = cookie.store.getCookieStringSync(uri)

  if (cookies && cookies.length) {
    options.headers.cookie =
      cookie.header ? `${cookie.header}; ${cookies}` : cookies
  }

  return {options}

}

exports.Response = (cookie) => ({options, res}) => {

  var header = Object.keys(res.headers)
    .find((name) => name.toLowerCase() === 'set-cookie')

  if (header) {
    var uri = url.parse(
      `${options.protocol}//${options.hostname}${options.path}`
        + (options.port ? `:${options.port}` : '')
    )
    ;[].concat(res.headers[header]).forEach((str) => {
      try {
        cookie.store.setCookieSync(str, uri, {ignoreError: true})
      }
      catch (err) {}
    })
  }

  return {options, res}

}
