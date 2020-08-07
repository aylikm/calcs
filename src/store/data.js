export const addData = (data, list, storageName) => {
  // TODO deep copyの書き方
  const parse = JSON.stringify(data)
  list.push(JSON.parse(parse))
  localStorage.setItem(storageName, JSON.stringify(list))
}

export const delData = (data, index, storageName) => {
  data.splice(index, 1)
  localStorage.setItem(storageName, JSON.stringify(data))
}

export const alreadyDatas = (data, storageName) => {
  Object.assign(data, JSON.parse(localStorage.getItem(storageName)))
}
