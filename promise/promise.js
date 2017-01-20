
let promise = (pro) => new Promise(
  (resolve, reject) => {
    if (pro) {
      resolve('成功了')
    }else {
      reject('失败了')
    }
  }
)

promise(false)
  .then(
    (value) => console.log(value)
  )
