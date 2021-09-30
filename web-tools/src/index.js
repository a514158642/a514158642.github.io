export default {
  /*
   * @description 对timeout的异步封装
   * @author cuishoujia 2021-09-30 14:36:38
   * @param {ms 非必传} Number 执行程序延迟的毫秒数
   * @return {Object}
  */
  sleep(ms = 0) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  },
  /*
   * @description 获取localstorage的数据对象
   * @author cuishoujia 2021-09-30 14:41:41
   * @param {key 非必传} String 指定要从localstorage中获取的字段，为空时返回整个对象
   * @return {Object}
  */
  getLocal(key) {
    if (key && this.getObjectType(key) !== 'String') {
      throw new Error('getLocal函数必须接受一个类型为String的参数')
    }
    const obj = JSON.parse(window.localStorage.getItem('appData') || "{}")
    return key ? obj[key] : obj
  },
  /*
   * @description 设置localstorage的数据对象
   * @author cuishoujia 2021-09-30 14:47:58
   * @param {obj 必传} Object 要保存此数据对象，通常是键值对
   * @return {Object}
  */
  setLocal(obj = {}) {
    if (this.getObjectType(obj) !== 'Object') {
      throw new Error('setLocal函数必须接受一个类型为Object的参数')
    }
    const temp = { ...this.getLocal(), ...obj }
    window.localStorage.setItem('appData', JSON.stringify(temp))
  },
  /*
   * @description 删除localstorage的数据对象
   * @author cuishoujia 2021-09-30 14:53:01
   * @param {key 非必传} String 指定要从localstorage中删除的字段，为空时删除整个对象
   * @return {Object}
  */
  clearLocal(key) {
    if (!key) {
      window.localStorage.removeItem('appData')
    } else if (this.getObjectType(key) !== 'String') {
      throw new Error('clearLocal函数必须接受一个类型为String的参数')
    } else {
      let temp = this.getLocal()
      delete temp[key]
      window.localStorage.removeItem('appData')
      this.setLocal(temp)
    }
  },
  /*
   * @description 获取sessionstorage的数据对象
   * @author cuishoujia 2021-09-30 14:41:41
   * @param {key 非必传} String 指定要从sessionstorage中获取的字段，为空时返回整个对象
   * @return {Object}
  */
  getSession(key) {
    if (key && this.getObjectType(key) !== 'String') {
      throw new Error('getSession函数必须接受一个类型为String的参数')
    }
    const obj = JSON.parse(window.sessionStorage.getItem('appData') || "{}")
    return key ? obj[key] : obj
  },
  /*
   * @description 设置sessionstorage的数据对象
   * @author cuishoujia 2021-09-30 14:47:58
   * @param {obj 必传} Object 要保存此数据对象，通常是键值对
   * @return {Object}
  */
  setSession(obj = {}) {
    if (this.getObjectType(obj) !== 'Object') {
      throw new Error('setSession函数必须接受一个类型为Object的参数')
    }
    const temp = { ...this.getSession(), ...obj }
    window.sessionStorage.setItem('appData', JSON.stringify(temp))
  },
  /*
   * @description 删除sessionstorage的数据对象
   * @author cuishoujia 2021-09-30 14:53:01
   * @param {key 非必传} String 指定要从sessionstorage中删除的字段，为空时删除整个对象
   * @return {Object}
  */
  clearSession(key) {
    if (!key) {
      window.sessionStorage.removeItem('appData')
    } else if (this.getObjectType(key) !== 'String') {
      throw new Error('clearSession函数必须接受一个类型为String的参数')
    } else {
      let temp = this.getSession()
      delete temp[key]
      window.sessionStorage.removeItem('appData')
      this.setSession(temp)
    }
  },
  /*
   * @description 获取对象类型，返回字符串
   * @author cuishoujia 2021-09-30 14:59:24
   * @param {obj} 要获取类型的目标对象
   * @return {Object}
  */
  getObjectType(obj) {
    // 以下函数返回obj的类型，如"[object Array]",从第7位至倒数第二位即为对象类型
    let typeStr = Object.prototype.toString.call(obj)
    return typeStr.substring(8, typeStr.length - 1)
  },
  /**
   * @author cuishoujia   2019-11-11
   * @description 循环遍历比较对象或者数组的各个元素
   * @param {Object 必传} source 需要遍历比较的第一个对象
   * @param {Object 必传} target 需要遍历比较的第二个对象
   * @param {Object 必传} isIgnoreSort 当比较到数组时是否忽略排序
   * @param {Array 选传} compareKeys 通过指定某些字段，判断两个对象是否相同
   */
  loopCompare(source, target, isIgnoreSort, compareKeys) {
    let temp = compareKeys || source
    let config = {
      isIgnoreSort: isIgnoreSort
    }
    for (let property in temp) {
      // 此处用for--in循环，适用于数组/对象
      // 判断source中的每个属性，在target中是否都存在，且其方式（自有/继承）相同
      property = compareKeys ? compareKeys[property] : property
      if (source.hasOwnProperty(property) !== target.hasOwnProperty(property)) {
        return false
      }
      if (!deepCompare(source[property], target[property], config)) return false
    }
    return true
  },
  /**
   * @author cuishoujia   2019-11-11
   * @description 比较两个对象是否相等   如果指定字段，前两个参数必须为Object
   * @param {Object 必传} source 比较的第一个对象
   * @param {Object 必传} target 比较的第二个对象
   * @param {Object 可选} config
   *      {compareKeys:[指定需要比较的字段],isIgnoreSort:是否忽略数组排序true/false}
   */
  deepCompare(source, target, config = {}) {
    const { compareKeys = [], isIgnoreSort = true } = config

    // 先排除undefined\null 两个特殊属性，防止下面调用hasOwnProperty报错
    // 两个参数如果有一个不存在，此时两个参数相等则返回true,不相等则返回false
    if (!source || !target) {
      // NaN不等于自身 所以当两个值同时为NaN,这里就视为相等
      // eslint-disable-next-line no-self-compare
      if (source !== source && target !== target) return true
      return source === target
    }

    // 获取两个对象的类型
    let typeSource = getObjectType(source)
    let typeTarget = getObjectType(target)

    // 如果有指定的比较字段，需要先确保前两个参数为Object,否则返回false
    if (compareKeys.length > 0) {
      if (typeSource !== 'Object' || typeTarget !== 'Object') {
        return false
      }
      return loopCompare(source, target, isIgnoreSort, compareKeys)
    }

    // 两个参数类型不同，返回false
    if (typeSource !== typeTarget) return false

    // 数字、字符串、布尔等基本数据类型，直接比较
    if (
      typeSource === 'Number' ||
      typeSource === 'Boolean' ||
      typeSource === 'String'
    ) {
      return source === target
    }

    // 日期、正则、symbol类型，转为字符串比较
    if (
      typeSource === 'Date' ||
      typeSource === 'Regex' ||
      typeSource === 'Symbol'
    ) {
      return source.toString() === target.toString()
    }

    // set map 转为数组比较
    if (typeSource === 'Set' || typeSource === 'Map') {
      return deepCompare([...source], [...target])
    }

    // 如两个参数为对象，先比较其key个数是否相等,再遍历其元素
    if (typeSource === 'Object') {
      return (
        Object.keys(source).length === Object.keys(target).length &&
        loopCompare(source, target, isIgnoreSort)
      )
    }

    // 如两个参数为数组，先比较其长度是否相等
    if (typeSource === 'Array') {
      if (source.length !== target.length) return false

      // 判断是否忽略排序
      if (!isIgnoreSort) return loopCompare(source, target, isIgnoreSort)

      // 定义变量接受目标数组，因为后面有删除元素操作，需要保护源数据
      let tempObject = [...target]
      for (let property in source) {
        let tempObjectPosition = tempObject.findIndex(value => {
          return deepCompare(value, source[property])
        })
        if (tempObjectPosition < 0) return false
        // 此处必须删掉目标里的对应元素，防止类似[1,2,2]和[1,2,3]的比较
        tempObject.splice(tempObjectPosition, 1)
      }
      return true
    }
    // 类型均不属于上述所有类型，即表示不支持，返回false
    return false
  },
  /*
   * @description 时间转换为 YYYY-MM-DD hh:mm:ss
   * @author cuishoujia 2021-09-30 15:02:41
   * @param {date 非必传} String | Number  时间字符串或毫秒
   * @return {Object}
  */
  parseDate(date = null) {
    date = new Date(date)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  },
  /*
   * @description 获取问号参数，返回对象
   * @author cuishoujia 2021-09-30 15:27:06
   * @param {Object}
   * @return {Object}
  */
  getUrlParams() {
    var res = {}
    if (url.includes("?")) {
      location.search.substr(1).split("&").map(item => {
        let temp = item.split("=")
        res[temp[0]] = unescape(temp[1])
      })
    }
    return res;
  }
}