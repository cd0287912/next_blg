import Head from "next/head"
import styles from "./index.module.scss"
import AdminLayout from "./../../components/adminLayout"

export default function Admin() {
  return (
    <AdminLayout>
      <Head>
        <title>统计·分析</title>
      </Head>
      <div className={styles.root}>待定</div>
    </AdminLayout>
  )
}
