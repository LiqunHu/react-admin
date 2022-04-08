import CryptoJS from 'crypto-js'
import _ from 'lodash'
import dayjs from 'dayjs'
import { message } from 'antd'

const loadJs = function (urlstr: string) {
  return new Promise(function (resolve, reject) {
    for (let c of document.head.children as any) {
      if (c.tagName === 'SCRIPT') {
        if (c.src === urlstr) {
          resolve('loaded')
        }
      }
    }
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script') as any
    script.type = 'text/javascript'
    script.src = urlstr
    script.onerror = reject
    script.onload = script.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null
        resolve('loaded')
      }
    }
    head.insertBefore(script, head.firstChild)
  })
}

const loadCss = function (cssstr: string) {
  return new Promise(function (resolve, reject) {
    for (let c of document.head.children as any) {
      if (c.tagName === 'LINK') {
        if (c.href === cssstr) {
          resolve('loaded')
        }
      }
    }
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link') as any
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = cssstr
    link.onerror = reject
    link.onload = link.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === 'loaded' ||
        this.readyState === 'complete'
      ) {
        // Handle memory leak in IE
        link.onload = link.onreadystatechange = null
        resolve('loaded')
      }
    }
    head.insertBefore(link, head.firstChild)
  })
}

const generateRandomAlphaNum = function (len: number) {
  let rdmString = ''
  // toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
  for (; rdmString.length < len; ) {
    rdmString += Math.random().toString(16).substr(2)
  }
  return rdmString.substring(0, len)
}

const aesEncryptModeCFB = function (msg: string, pwd: string) {
  let magicNo = generateRandomAlphaNum(32)

  let key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(pwd).toString())
  let iv = CryptoJS.enc.Hex.parse(magicNo)

  let identifyCode = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
  return [magicNo, identifyCode]
}

const success = function(msg: string) {
  message.success(msg)
}

const info = function(msg: string) {
  message.info(msg)
}

const fault = function(err: any) {
  console.error(err)
}

const warning = function(msg: string) {
  message.warning(msg)
}

const error = function(msg: string) {
  message.error(msg)
}

const clearStoreData = function () {
  window.localStorage.clear()
}

const setStoreData = function (key: string, value: Object) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getStoreData = function (key: string) {
  let storeStr = window.localStorage.getItem(key)
  if (storeStr) {
    return JSON.parse(storeStr)
  } else {
    return null
  }
}

const removeStoreData = function (key: string) {
  window.localStorage.removeItem(key)
}
const clearSessionStoreData = function () {
  window.sessionStorage.clear()
}

const setSessionStoreData = function (key: string, value: object) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

const getSessionStoreData = function (key: string) {
  let storeStr = window.sessionStorage.getItem(key)
  if (storeStr) {
    return JSON.parse(storeStr)
  } else {
    return null
  }
}

const removeSessionStoreData = function (key: string) {
  window.sessionStorage.removeItem(key)
}

const checkAuth = function (key: string) {
  let userinfo = getStoreData('userinfo')
  if (_.findIndex(userinfo.authApis, { api_function: key }) >= 0) {
    return true
  } else {
    return false
  }
}

//设置参数，将属性值为 null,undefined,空 属性移除
const clearEmptyParams = (params: any) => {
  for (let [key, value] of Object.entries(params)) {
    if (value === '' || value == null) delete params[key]
    if (Array.isArray(value)) {
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          params[key][i] = clearEmptyParams(value[i])
        }
      }
    }
  }
  return params
}

/**
 * 计算两个日期间隔
 * @param start 开始时间
 * @param end 结束时间
 * @param type 'day' 'month' 'minute' 'seconds'
 * @returns {number}
 */
const diff = (
  start: any,
  end: any,
  type: 'day' | 'month' | 'minute' | 'seconds'
) => {
  if (!start || !end) {
    return 0
  }
  const startDate = dayjs(new Date(start))
  const endDate = dayjs(new Date(end))
  return endDate.diff(startDate, type)
}

const isFloat = function (v: string) {
  return /^-?\d*\.\d+$/.test(v)
}
export default {
  loadJs,
  loadCss,
  aesEncryptModeCFB,
  clearStoreData,
  setStoreData,
  getStoreData,
  removeStoreData,
  clearSessionStoreData,
  setSessionStoreData,
  getSessionStoreData,
  removeSessionStoreData,
  checkAuth,
  clearEmptyParams,
  success,
  info,
  fault,
  warning,
  error,
  diff,
  isFloat,
}
