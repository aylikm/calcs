export const validCheck = (inputVal) => {
  let isReady = false
  const eachReady = []
  const objLength = Object.keys(inputVal)

  objLength.forEach((obj) => {
    if (inputVal[obj].val === null) {
      inputVal[obj].error = inputVal[obj].name
      return false
    } else {
      if (inputVal[obj].val < inputVal[obj].min) {
        inputVal[obj].error = `${inputVal[obj].min}以上を`
        return false
      }
      if (inputVal[obj].hasOwnProperty('error')) {
        inputVal[obj].valid = true
        inputVal[obj].error = ''
      }
      eachReady.push(inputVal[obj].valid)
    }
  }, inputVal)

  if (eachReady.length === objLength.length) {
    isReady = true
    return isReady
  }
}
