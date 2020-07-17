/*
 * @Author: your name
 * @Date: 2020-01-09 08:17:58
 * @LastEditTime: 2020-07-17 10:23:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin-node\app.js
 */ 
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const koaSession = require('koa-session')
const router = require('./router')
const serve = require('koa-static')
const koaBody = require('koa-body')
const sessionMiddleWares = require('./middlewares/session')
const { sessionConfig } = require('./config')
const authority = require('./middlewares/authority')

app.
use(serve(path.resolve(__dirname, 'static'))).
use(koaSession(sessionConfig, app)).
use(sessionMiddleWares).
use(authority.unless()).
use(koaBody({ "formLimit":"5mb", "jsonLimit":"5mb", "textLimit":"5mb" })).
use(router.routes()).
use(router.allowedMethods())

app.listen(8888, () => {
  'node is listening 8888 port'
})