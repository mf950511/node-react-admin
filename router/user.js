const Router = require('koa-router')
const router = new Router({
  prefix: '/user'
})
router.get('/b', async (ctx, next) => {
  if(ctx.session.user) {
  }
})
router.get('/asd', async (ctx, next) => {
  ctx.session.user = '12312312332'
  ctx.body = '我是登录页'
})
router.get('/a', async (ctx, next) => {
  const user = ctx.session.user
  ctx.body = user 
})

module.exports = router.routes()