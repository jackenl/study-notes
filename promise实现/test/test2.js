const MyPromise = require('../2.statusSupport/MyPromise')

const promise = new MyPromise((resolve, reject) => {
  console.log(Math.random())
  Math.random() < 5 ? resolve('success') : reject('error')
})

function successLog1(data) {
  console.log('1.' + data)
}

function successLog2(data) {
  console.log('2.' + data)
}

function errorLog(reason) {
  console.log(reason)
}

promise.then(successLog1, errorLog)
setTimeout(() => {
  promise.then(successLog2, errorLog)
}, 0)