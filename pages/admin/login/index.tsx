import React, { useState } from "react"
import { useRouter } from "next/router"
import { message } from "antd"
import { authApis } from "./../../../apis"
import styles from "./index.module.scss"
import Head from "next/head"
import md5 from "md5"
export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loginType, setLoginType] = useState<boolean>(true)
  const changeLoginType = (type: boolean) => {
    setUsername("")
    setPassword("")
    setLoginType(type)
  }
  const submit = async () => {
    if (!username.trim()) {
      return message.error("请填写用户名")
    }
    if (!password.trim()) {
      return message.error("请填写密码")
    }
    if (username.trim() && password.trim()) {
      const params = { username, password: md5(password) }
      if (loginType) {
        const result = await authApis.login(params)
        if (!result) return
        localStorage.setItem("_token", result.data)
        message.success("登录成功")
        setTimeout(() => {
          if (router.query.back) {
            const backUrl = String(router.query.back)
            location.replace(backUrl)
          } else {
            router.replace("/admin")
          }
        }, 1000)
      } else {
        await authApis.regist(params)
        message.success("注册成功!")
        setLoginType(true)
      }
    }
  }
  return (
    <div className={styles.root}>
      <Head>
        <title>忘不了oh-登录</title>
      </Head>
      <div
        className={styles.loginBg}
        style={{ backgroundImage: `url(/images/login_banner.jpg)` }}
      ></div>
      <div className={styles.content}>
        <div className={styles.loginBox}>
          <div className={styles.tab}>
            <div>
              <span
                onClick={() => changeLoginType(true)}
                className={loginType ? "active" : ""}
              >
                登录
              </span>
            </div>
            <div>
              <span
                onClick={() => changeLoginType(false)}
                className={!loginType ? "active" : ""}
              >
                游客注册
              </span>
            </div>
          </div>
          <div className={styles.inputContinaer}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="用户名"
              type="text"
              key={String(loginType)}
            />
          </div>
          <div className={styles.inputContinaer}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              type="password"
              key={String(loginType)}
            />
          </div>
          <div onClick={submit} className={styles.btn}>
            {loginType ? "登 录" : "注 册"}
          </div>
        </div>
      </div>
    </div>
  )
}
