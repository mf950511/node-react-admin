/*
 * @Author: your name
 * @Date: 2020-07-17 09:56:08
 * @LastEditTime: 2020-07-17 14:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin-node\middlewares\authority.js
 */ 
const { data } = require('../codeDictionary.json')
const unless = require('koa-unless')

const authority = async (ctx, next) => {
  if(await ctx.sessions.get()) {
    await next()
  } else {
    ctx.session = null
    return ctx.body = {
      ...data['202002'],
      data: {}
    }
  }
}

// 相关接口过滤
authority.unless = function() {
  return unless.call(this, { path: [
    '/api/user/login'
  ]})
}

module.exports = authority