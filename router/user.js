/*
 * @Author: your name
 * @Date: 2020-01-09 08:39:03
 * @LastEditTime: 2020-06-12 11:25:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin-node\router\user.js
 */ 
const Router = require('koa-router')
const router = new Router({
  prefix: '/user'
})
router.get('/b', async (ctx, next) => {
  
})
router.get('/asd', async (ctx, next) => {
  const sessionId = await ctx.sessions.set({
    username: '张三',
    age: 24
  })
  ctx.session.sessionId = sessionId
  ctx.body = sessionId
})
router.get('/a', async (ctx, next) => {
  const sessionData = await ctx.sessions.get()
  ctx.body = sessionData 
})

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body
  const sessionId = await ctx.sessions.set(body)
  ctx.session.sessionId = sessionId
  ctx.body = {
    code: 0,
    data: {
      ...body,
      sessionId
    },
    msg: '登陆成功'
  }
})

module.exports = router.routes()