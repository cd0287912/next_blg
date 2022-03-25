import React from "react"
import classnames from "classnames"
import { useRouter } from "next/router"
import Image from "next/image"
import { Tooltip, Avatar } from "antd"
import styles from "./index.module.scss"
const navList = [
  {
    path: "/admin",
    label: "仪表盘",
    icon: "icon-data-view",
  },
  {
    path: "/admin/write",
    label: "写文章",
    icon: "icon-text",
  },
  {
    path: "/admin/articles",
    label: "文章管理",
    icon: "icon-file-open",
  },
  {
    path: "/admin/label",
    label: "标签系列",
    icon: "icon-task",
  },
  {
    path: "/admin/user",
    label: "游客管理",
    icon: "icon-user",
  },
  {
    path: "/admin/message",
    label: "留言",
    icon: "icon-comment",
  },
  {
    path: "/admin/about",
    label: "关于",
    icon: "icon-map",
  },
]
function AdminHead() {
  const router = useRouter()
  const handlePush = (path: string) => {
    router.push(path)
  }
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
          <Avatar>USER</Avatar>
          <span className={styles.username}>忘不了oh</span>
        </div>
      </div>
    </div>
  )
}
export default AdminHead
