import React from "react"
import styles from "./index.module.scss"

export function CommentForm() {
  return (
    <div className={styles.root}>
      <textarea
        placeholder="请输入留言内容哦~"
        className={styles.input}
        rows={4}
      ></textarea>
      <div className={styles.controls}>
        <button className={styles.publishBtn}>发表</button>
      </div>
    </div>
  )
}
export function CommentItem() {
  return <div>121</div>
}
