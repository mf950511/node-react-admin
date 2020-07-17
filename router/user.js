/*
 * @Author: your name
 * @Date: 2020-01-09 08:39:03
 * @LastEditTime: 2020-07-16 10:46:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin-node\router\user.js
 */ 
const Router = require('koa-router')
const router = new Router({
  prefix: '/user'
})

const { usernameList } = require('../config/userAuth.js')

const { data } = require('../codeDictionary.json')

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
  console.log('sessionData', sessionData)
  if(!sessionData) {
    ctx.body = {
      data: '123'
    }
  } else {
    ctx.body = sessionData 
  }
})

router.post('/logout', async (ctx, next) => {
  const result = await ctx.sessions.del()
  ctx.session = null
  console.log(result)
  ctx.body = {
    code: 0,
    data: {},
    msg: 'success'
  }
})

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body
  const { username } = body
  if(!usernameList.includes(username)) {
    return ctx.body = {
      ...data['202001'],
      data: {}
    }
  }
  // 存储登录相关信息至redis
  const sessionId = await ctx.sessions.set(body)
  // 设置session
  ctx.session.sessionId = sessionId
  return ctx.body = {
    code: 0,
    data: {
      ...body,
      sessionId
    },
    msg: '登陆成功'
  }
})

module.exports = router.routes()