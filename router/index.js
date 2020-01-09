const Router = require('koa-router')
// const User = 
const router = new Router({
  prefix: '/api'
})

router.
use(require('./user')).
get('/*', async (ctx, next) => {
  ctx.body = {
    code: 404,
    mas: 'not found'
  }
})
module.exports = router