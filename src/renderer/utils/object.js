export function flattenObject(obj) {
  let res = {}

  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if ((typeof obj[i]) == 'object') {
      let flatObject = flattenObject(obj[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        res[i + '.' + x] = flatObject[x];
      }
    }
    else {
      res[i] = obj[i];
    }
  }

  return res;
}

export function unflattenObject(obj) {
  let res = {}
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    let keys = i.split('.')
    keys.reduce((acc, v, j) => {
      if (keys.length - 1 === j) {
        acc[v] = obj[i] || null
      }
      else {
        acc[v] = acc[v] || {}
      }
      return acc[v]
    }, res)
  }
  return res
}
