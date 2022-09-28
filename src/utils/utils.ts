export const connectArrText = (arr, splitStr) => {
  if (Array.isArray(arr) && arr.length) {
    const newArr = arr.filter(Boolean)
    if (newArr.length > 1)
      return arr.join(splitStr)
    else if (newArr.length === 1)
      return arr[0]
    else
      return ''
  }
  else {
    return ''
  }
}
