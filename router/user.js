const Router = require('koa-router')
const menu = require('../config/menu.json')
const router = new Router({
  prefix: '/user'
})

const { usernameList } = require('../config/userAuth.js')

const { data } = require('../codeDictionary.json')

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
  body.menu = menu[username]
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

router.post('/menu', async(ctx, next) => {
  const session = await ctx.sessions.get()
  const { menu } = session || {}
  return ctx.body = {
    code: 0,
    data: {
      menu
    },
    msg: 'success'
  }
})

module.exports = router.routes()