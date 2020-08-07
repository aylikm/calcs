export const validCheck = (inputVal) => {
  const eachReady = []
  const objLength = Object.keys(inputVal)

  objLength.forEach((obj) => {
    if (inputVal[obj].val === null) {
      inputVal[obj].error = inputVal[obj].name
    } else {
      if (inputVal[obj].val < inputVal[obj].min) {
        inputVal[obj].error = `${inputVal[obj].min}以上を`
      } else {
        inputVal[obj].valid = true
        inputVal[obj].error = ''
      }
      eachReady.push(inputVal[obj].valid)
    }
  }, inputVal)

  if (eachReady.length === objLength.length) {
    return true
  }
}
