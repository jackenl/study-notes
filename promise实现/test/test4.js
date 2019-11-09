const MyPromise = require('../4.syncSupport/MyPromise')

const promise = new MyPromise((resolve, reject) => {
  Math.random() < 5 ? resolve('success') : reject('error')
})

function f1(data) {
  console.log(data)
  return new MyPromise((resolve, reject) => {
    Math.random() < 5 ? resolve(1) : reject('error')
  })
}

function f2(data) {
  console.log(data)
  return new MyPromise((resolve, reject) => {
    Math.random() < 5 ? resolve(2) : reject('error')
  })
}

function f3(data) {
  console.log(data)
}

function errorLog(reason) {
  console.log(reason)
}

promise.then(f1).then(f2).then(f3).catch(errorLog)