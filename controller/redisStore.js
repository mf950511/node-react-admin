const redis = require('redis')
const { redisConfig } = require('../config')

let client = redis.createClient({...redisConfig, retry_strategy: function(){
  console.log("----------------------- 重新连接 -----------------------");
	console.log(error);
	return 5000;
}})

client.on('error', function(error){
  console.log("----------------------- redis连接出错 -----------------------");
	console.log(error);
})

console.log("----------------------- redis store -----------------------")

class RedisStore{
  get(key){
    console.log(3455, key)
    return new Promise((res, rej) => {
      if(!key) {
        res(null)
      }
      console.log(34555, key)
      client.get(`react_node_${key}`, function(error, data){
        console.log(3455, error, data)
        if(error) {
          rej({
            msg: error,
            code: -1,
            status: 200
          })
        } else {
          res(JSON.parse(data) || {})
        }
      })
    })
  }
  set(key, value) {
    return new Promise((res, rej) => {
      if(!key) {
        res(null)
      }
      value = JSON.stringify(value)
      client.set(`react_node_${key}`, value, function(err){
        console.log(123123123, err)
        if(err) {
          rej({
            msg: err,
            code: -1,
            status: 200
          })
        } else {
          res()
        }
      })
    })
  }
  exists(key) {
    return new Promise((res, rej) => {
      if(!key) {
        res(null)
      }
      client.exists(`react_node_${key}`, function(err, reply) {
        if(err) {
          rej({
            msg: err,
            code: -1,
            status: 200
          })
        } else {
          res(reply == 1)
        }
      })
    })
  }
  del(key){
		return new Promise((res, rej)=>{
			if(!key){ return res(null)};
			client.del(`react_node_${key}`, function(err, reply) {
			  if(err){
					rej({
            msg: err,
            code: -1,
            status: 200
          })
				}else{
					res(reply==1 ? true : false);
				}
			})
		})
  }
  pexpire(key, time = 604800000) {
    return new Promise((res, rej) => {
      if(!key) {
        res(null)
      }
      client.pexpire(`react_node_${key}`, time, function(err, reply){
        if(err) {
          rej({
            msg: err,
            code: -1,
            status: 200
          })
        } else {
          res(reply == 1)
        }
      })
    })
  }
}

module.exports = RedisStore
