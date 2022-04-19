import styles from "./index.module.scss"
export default function Spinner() {
  return (
    <div className={styles.atomSpinner}>
      <div className={styles.spinnerInner}>
        <div className={styles.spinnerLine}></div>
        <div className={styles.spinnerLine}></div>
        <div className={styles.spinnerLine}></div>
        {/* <!--Chrome renders little circles malformed :(--> */}
        <div className={styles.pinnerCircle}>&#9679;</div>
      </div>
      <div className={styles.loading}>加载中...</div>
    </div>
  )
}
