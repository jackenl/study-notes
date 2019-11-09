function MyPromise(fn) {
  let self = this
  self.value = null // 成功时的值
  self.error = null // 失败时的原因
  self.onFulfilled = null // 成功的回调函数
  self.onRejected = null // 失败的回调函数

  function resolve(value) {
    setTimeout(() => {
      self.value = value
      self.onFulfilled(self.value)
    }, 0)
  }

  function reject(error) {
    setTimeout(() => {
      self.error = error
      self.onRejected(self.error)
    })
  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // 在then函数中给promise实例注册成功失败回调
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
}

module.exports = MyPromise
