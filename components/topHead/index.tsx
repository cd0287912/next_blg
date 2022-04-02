import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./index.module.scss"
import classnames from "classnames"
import { spring, Motion } from "react-motion"
import { Sys } from "./../../types"
import { isCdn } from "../../tools"
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
    label: "README",
    path: "/readme",
    id: 3,
  },
]
export default function TopHead(props: Sys) {
  const [showMenu, setShowMenu] = useState(false)
  const [theme, toggleTheme] = useState(true)
  const router = useRouter()
  const handleChangeTheme = (type) => {
    toggleTheme(type)
    if (type) {
      document.body.classList.remove("dark")
    } else {
      document.body.classList.add("dark")
    }
  }
  useEffect(() => {
    if (document.body.classList.contains("dark")) {
      toggleTheme(false)
    } else {
      toggleTheme(true)
    }
  })
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <img src={isCdn(props.sysLogo)} width="50" height="50" alt="" />
              <div className={styles.title}>{props.sysTitle}</div>
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
        </div>
        <div onClick={() => setShowMenu(!showMenu)} className={styles.menu}>
          <i className="iconfont icon-toggle-left"></i>
        </div>
      </div>
      <Motion style={{ height: spring(showMenu ? 240 : 0) }}>
        {({ height }) => (
          <div
            className={styles.mobileMenu}
            style={{ height, overflow: "hidden" }}
          >
            {navlist.map((item) => (
              <div
                onClick={() => router.push(item.path)}
                className={classnames(styles.menuList, {
                  active: router.pathname === item.path,
                })}
                key={item.id}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </Motion>
    </div>
  )
}
