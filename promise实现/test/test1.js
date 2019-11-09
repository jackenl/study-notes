const MyPromise = require('../1.base/MyPromise')

const promise = new MyPromise((resolve, reject) => {
  console.log('pending')
  Math.random > 0.5 ? resolve('success') : reject('error')
})

function successLog(data) {
  console.log(data)
}

function errorLog(reason) {
  console.log(reason)
}

promise.then(successLog, errorLog)