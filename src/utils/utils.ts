export const connectArrText = (arr, splitStr = ',') => {
  if (Array.isArray(arr) && arr.length) {
    const newArr = arr.filter(Boolean)
    if (newArr.length > 1)
      return newArr.join(splitStr)
    else if (newArr.length === 1)
      return newArr[0]
    else
      return ''
  }
  else {
    return ''
  }
}
