const sha1 = require('sha1') // 加密
const { createTimeRstr } = require('../controller/base')
const RedisStore = require('../controller/redisStore')
const store = new RedisStore()
class Session {
  constructor(ctx){
    this.ctx = ctx
  }
  async check(){
    const sessionId = this.getSessionId()
    return await store.exists(sessionId)
  }
  getSessionId(){
    return this.ctx.session && this.ctx.session.sessionId || ''
  }
  async get(){
    let sessionId = this.getSessionId()
    let sessionData = await store.get(sessionId)
    return sessionData
  }

  async set(updateSessionData = {}){
    let sessionId = this.getSessionId()
    if(!await this.check()) {
      sessionId = sha1(createTimeRstr(16))
    }
    const sessionData = await store.get(sessionId)
    await store.set(sessionId, {
      ...sessionData,
      ...updateSessionData,
      timeStr: Date.now()
    })
    const time = sessionData && sessionData.invalidSessionTime
    await store.pexpire(sessionId, time || 24 * 60 * 60 * 1000)
    return sessionId
  }
  async clear(sessionUpdate={}){
		const sessionId = this.getSessionId()
		await store.set(sessionId,{});
	}

}

module.exports = async (ctx, next)=>{
  ctx.sessions = new Session(ctx)
  ctx.store = store
  await next()
}