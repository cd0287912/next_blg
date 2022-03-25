import React from "react"
import styles from "./index.module.scss"
function NavBox({ children, title }) {
  return (
    <div className={styles.root}>
      <div className={styles.head}>{title}</div>
      {children}
    </div>
  )
}
export default NavBox
