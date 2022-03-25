import styles from "./index.module.scss"
export default function Meta() {
  return (
    <div className={styles.root}>
      <a href="" target="_blank" className={styles.iconContainer}>
        <i className="iconfont icon-github"></i>
      </a>
      <div className={styles.desc}>Design By cd0287912</div>
      <a href="/admin" target="_blank" className={styles.desc}>
        后台管理
      </a>
    </div>
  )
}
