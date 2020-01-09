const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const router = require('./router')

const sessionConfig = {
  key: 'sessionId',
  httpOnly: true,
  signed: false
}

app.
use(session(sessionConfig, app)).
use(router.routes()).
use(router.allowedMethods())

app.listen(8888, () => {
  'node is listening 8888 port'
})