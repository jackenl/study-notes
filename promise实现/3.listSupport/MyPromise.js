// 支持链式操作
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn) {
  let self = this
  self.value = null
  self.error = null
  self.status = PENDING
  
  self.onFulfilledCallbacks = [] // 成功回调数组
  self.onRejectedCallbacks = [] // 失败回调数组
  
  function resolve(value) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = FULFILLED
        self.value = value
        self.onFulfilledCallbacks.forEach((callback) => {
          callback(self.value)
        })
      }, 0)
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = REJECTED
        self.error = error
        self.onRejectedCallbacks.forEach((callback) => {
          callback(self.error)
        })
      }, 0)
    }
  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectedCallbacks.push(onRejected)
  } else if (this.status === FULFILLED) {
    this.onFulfilled(this.value)
  } else if (this.status === REJECTED) {
    this.onRejected(this.error)
  }
  return this; // 通过返回自身实现链式操作
}

module.exports = MyPromise