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
      <div className={styles.desc}>
        <a href="http://beian.miit.gov.cn" target="_blank">
          {props.sysDesc}
        </a>
      </div>
      <div className={styles.desc}>
        <a href="/admin/articles" target="_blank" className={styles.desc}>
          后台管理
        </a>
        <span>{props.sysSubDesc}</span>
      </div>
    </div>
  )
}
