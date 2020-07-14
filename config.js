/*
 * @Author: your name
 * @Date: 2020-01-10 09:29:44
 * @LastEditTime: 2020-07-14 16:04:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-admin-node\config.js
 */ 
const config = {
  redisConfig: {
		"port": 6379,
		"host": "127.0.0.1"
  },
  sessionConfig: {
    key: 'sessionId',
    httpOnly: true,
    maxAge: 86400000, // 一天
    signed: false
  }
}

module.exports = config