import OSS from "ali-oss"
import dayjs from "dayjs"
import { authApis } from "../apis"
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
