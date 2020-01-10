const Router = require('koa-router')
const router = new Router({
  prefix: '/user'
})
router.get('/b', async (ctx, next) => {
  
})
router.get('/asd', async (ctx, next) => {
  ctx.session.sessionId = ''
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

module.exports = router.routes()