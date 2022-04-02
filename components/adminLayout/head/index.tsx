import React, { useEffect, useState } from "react"
import classnames from "classnames"
import { useRouter } from "next/router"
import Image from "next/image"
import { Tooltip, Avatar } from "antd"
import styles from "./index.module.scss"
import { userApis } from "./../../../apis"
import { User } from "./../../../types"
const navList = [
  // {
  //   path: "/admin",
  //   label: "统计·分析",
  //   icon: "icon-data-view",
  // },
  {
    path: "/admin/write",
    label: "写文章",
    icon: "icon-text",
  },
  {
    path: "/admin/articles",
    label: "文章",
    icon: "icon-file-open",
  },
  {
    path: "/admin/label",
    label: "标签",
    icon: "icon-task",
  },
  {
    path: "/admin/user",
    label: "游客",
    icon: "icon-user",
  },
  {
    path: "/admin/visitor",
    label: "访客记录",
    icon: "icon-navigation",
  },
  {
    path: "/admin/message",
    label: "留言",
    icon: "icon-comment",
  },
  {
    path: "/admin/about",
    label: "README",
    icon: "icon-map",
  },
  {
    path: "/admin/sys",
    label: "系统设置",
    icon: "icon-setting",
  },
]
function AdminHead() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<User>({ username: "", id: "" })
  const handlePush = (path: string) => {
    router.push(path)
  }
  useEffect(() => {
    const getUserInfo = async () => {
      const result = await userApis.getUserInfo<User>()
      setUserInfo(result)
    }
    getUserInfo()
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Image src="/panda.svg" height="40" width="40"></Image>
        <div className={styles.title}>忘不了后台管理</div>
      </div>
      <div className={styles.navContainer}>
        {navList.map((item) => (
          <div
            onClick={() => handlePush(item.path)}
            key={item.path}
            className={classnames(styles.navItem, {
              active: item.path === router.pathname,
            })}
          >
            <i className={`iconfont ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.tips}>
        <Tooltip placement="bottom" title="全屏">
          <div className={styles.tipItem}>
            <i className="iconfont icon-fullscreen-expand"></i>
          </div>
        </Tooltip>
        <div className={styles.tipItem}>
          <Avatar src="https://picsum.photos/38">{userInfo.username}</Avatar>
          <span className={styles.username}>{userInfo.username}</span>
        </div>
      </div>
    </div>
  )
}
export default AdminHead
