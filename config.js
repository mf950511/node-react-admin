const config = {
  redisConfig: {
		"port": 6379,
		"host": "127.0.0.1"
  },
  sessionConfig: {
    key: 'sessionId',
    httpOnly: true,
    signed: false
  }
}

module.exports = config