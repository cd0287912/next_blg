import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./index.module.scss"
import Image from "next/image"
import classnames from "classnames"
const navlist = [
  {
    label: "文章",
    path: "/",
    id: 0,
  },
  {
    label: "专题",
    path: "/series",
    id: 1,
  },
  {
    label: "留言",
    path: "/leavmsg",
    id: 2,
  },
  {
    label: "关于",
    path: "/about",
    id: 3,
  },
]
export default function TopHead() {
  const [theme, toggleTheme] = useState(true)
  const router = useRouter()
  /*
   * 改变主题模式
   */
  const handleChangeTheme = (type) => {
    toggleTheme(type)
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark")
    } else {
      document.body.classList.add("dark")
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image src="/panda.svg" height="50" width="50"></Image>
              <div className={styles.title}>忘不了oh</div>
            </a>
          </Link>
        </div>
        <ul className={styles.nav}>
          {navlist.map((item) => (
            <li
              className={classnames({ active: router.pathname === item.path })}
              key={item.id}
            >
              <Link href={item.path}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.theme}>
          {theme ? (
            <i
              onClick={() => handleChangeTheme(!theme)}
              className="iconfont icon-tianqishuijueyewanshuijue"
            ></i>
          ) : (
            <i
              onClick={() => handleChangeTheme(!theme)}
              className="iconfont icon-sun"
            ></i>
          )}
          {/* <i title="github" className="iconfont icon-github"></i> */}
          {/* <i
            onClick={() => router.push("/admin")}
            title="后台管理"
            className="iconfont icon-data-view"
          ></i> */}
        </div>
      </div>
    </div>
  )
}
