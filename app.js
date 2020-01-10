const path = require('path')
const Koa = require('koa')
const app = new Koa()
const koaSession = require('koa-session')
const router = require('./router')
const serve = require('koa-static')
const sessionMiddleWares = require('./middlewares/session')
const { sessionConfig } = require('./config')

app.
use(serve(path.resolve(__dirname, 'static'))).
use(koaSession(sessionConfig, app)).
use(sessionMiddleWares).
use(router.routes()).
use(router.allowedMethods())

app.listen(8888, () => {
  'node is listening 8888 port'
})