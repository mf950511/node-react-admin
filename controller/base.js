const until = {
  randomStr( len = 32 ){
    let strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let maxLen = strs.length
    let str = ''
    for(let i = 0; i < len; i++) {
      str += strs.charAt(Math.floor(Math.random() * maxLen))
    }
    return str
  },
  createTimeRstr( num = 8 ){
    return Date.now() + '_' + until.randomStr(num)
  }
}

module.exports = until