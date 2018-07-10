
var t = require('assert')
var http = require('http')

var compose = require('request-compose')
var cookie = require('../')
compose.Request.cookie = cookie.Request
compose.Response.cookie = cookie.Response
var request = compose.client


describe('cookie', () => {
  var server

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      if (req.url === '/cookie-store') {
        res.writeHead(200, {
          'set-cookie': 'a=b'
        })
        res.end()
      }

      else if (req.url === '/cookie-redirect') {
        res.writeHead(301, {
          location: '/cookie-header',
          'set-cookie': 'c=d'
        })
        res.end()
      }
      else if (req.url === '/cookie-header') {
        res.end(req.headers.cookie)
      }

      else if (req.url === '/cookie-domain') {
        res.writeHead(200, {
          'set-cookie': 'a=b; Domain=foo.com'
        })
        res.end()
      }
    })
    server.listen(5000, done)
  })

  it('cookie store', async () => {
    var cookie = {}
    await request({
      url: 'http://localhost:5000/cookie-store',
      cookie,
    })
    t.equal(
      cookie.store.getCookieStringSync('http://localhost:5000'),
      'a=b',
      'set-cookie should be stored'
    )
  })

  it('cookie header', async () => {
    var cookie = {}
    var {body} = await request({
      url: 'http://localhost:5000/cookie-redirect',
      headers: {cookie: 'a=b'},
      cookie,
    })
    t.equal(
      cookie.store.getCookieStringSync('http://localhost:5000'),
      'c=d',
      'set-cookie should be stored'
    )
    t.equal(
      body,
      'a=b; c=d',
      'initial cookie header should be prepended'
    )
  })

  it('cookie for a different domain', async () => {
    var cookie = {}
    await request({
      url: 'http://localhost:5000/cookie-domain',
      cookie,
    })
    t.equal(
      cookie.store.getCookieStringSync('http://localhost:5000'),
      '',
      'set-cookie should not be stored'
    )
  })

  it('existing cookie store', async () => {
    var cookie = {}
    await request({
      url: 'http://localhost:5000/cookie-store',
      cookie,
    })
    t.equal(
      cookie.store.getCookieStringSync('http://localhost:5000'),
      'a=b',
      'set-cookie should be stored'
    )
    var {body} = await request({
      url: 'http://localhost:5000/cookie-header',
      cookie,
    })
    t.equal(
      body,
      'a=b',
      'cookie header should be sent'
    )
  })

  after((done) => {
    server.close(done)
  })

})
