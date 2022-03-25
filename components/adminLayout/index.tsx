import styles from "./index.module.scss"
import AdminHead from "./head"
export default function AdminLayout({ children }) {
  return (
    <div className={styles.root}>
      <AdminHead />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
