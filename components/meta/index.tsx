import styles from "./index.module.scss"
import { Sys } from "./../../types"

export default function Meta(props: Sys) {
  return (
    <div className={styles.root}>
      <a
        href={props.sysGithubLink}
        target="_blank"
        className={styles.iconContainer}
      >
        <i className="iconfont icon-github"></i>
      </a>
      <div className={styles.desc}>{props.sysDesc}</div>
      <a href="/admin/articles" target="_blank" className={styles.desc}>
        Admin Manage
      </a>
    </div>
  )
}
