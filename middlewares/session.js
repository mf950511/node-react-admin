

class Session {
  constructor(ctx){
    this.ctx = ctx
  }
  check(){

  }
  getSessionId(){
    return this.ctx.session.sessionId
  }
  async get(){
    let sessionId = this.getSessionId()
    let sessionData = await redis.get(sessionid)
    return sessionData
  }

}