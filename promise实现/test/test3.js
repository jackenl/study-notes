const MyPromise = require('../3.listSupport/MyPromise')

const promise = new MyPromise((resolve, reject) => {
  console.log(Math.random())
  Math.random() < 5 ? resolve('success') : reject('error')
})

function f1(data) {
  console.log('1.' + data)
}

function f2(data) {
  console.log('2.' + data)
}

function f3(data) {
  console.log('3.' + data)
}

promise.then(f1).then(f2).then(f3)