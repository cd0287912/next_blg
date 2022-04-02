import OSS from "ali-oss"
import dayjs from "dayjs"
import { authApis } from "../apis"

export const TOKEN = "_token"

export function aliUpload(file) {
  return new Promise(async (resolve, reject) => {
    const { AccessKeyId, AccessKeySecret, SecurityToken } =
      await authApis.getSts()
    let client = new OSS({
      region: "oss-cn-chengdu",
      secure: true,
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
      bucket: "cd028",
    })
    const fileUrl = `/${dayjs().format("YYYY-MM-DD")}/${file.name}`
    const res = await client.multipartUpload(fileUrl, file)
    if (res) {
      resolve(fileUrl)
    } else {
      reject(false)
    }
  })
}

export function isCdn(url) {
  if (!url) return null
  return "https://cd028.oss-cn-chengdu.aliyuncs.com" + url
}

export function throllte1(fn: Function, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}

export function throllte2(fn: Function, delay) {
  let pre = 0
  return function (...args) {
    let now = +new Date()
    if (now - pre > delay) {
      fn.apply(this, args)
      pre = now
    }
  }
}

export function debounce(fn: Function, delay) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
