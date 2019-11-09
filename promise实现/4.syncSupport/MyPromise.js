// 支持串行异步操作
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
        self.onFulfilledCallbacks.forEach((callback) => callback(self.value))
      }, 0)
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(() => {
        self.status = REJECTED
        self.error = error
        self.onRejectedCallbacks.forEach((callback) => callback(self.error))
      }, 0)
    }
  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this
  let bridgePromise

  // 给成功和失败回调赋默认函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error }
  if (this.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    })
  } else if (this.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      // 通过setTimeout异步队列保证异步串行
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  } else if (this.status === REJECTED) {
    // 通过setTimeout异步队列保证异步串行
    setTimeout(() => {
      try {
        let x = onRejected(self.error)
        resolvePromise(bridgePromise, x, resolve, reject)
      } catch (e) {
        reject(e)
      }
    }, 0)
  }
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

// 解析回调的返回值x
function resolvePromise(bridgePromise, x, resolve, reject) {
  // 避免循环引用
  if (bridgePromise === x) {
    return reject(new TypeError('Circular reference'))
  }

  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject)
      }, error => {
        reject(error)
      })
    } else {
      x.then(resolve, reject)
    }
  } else {
    resolve(x) // 如果是值则通过成功回调返回该值
  }
}

module.exports = MyPromise