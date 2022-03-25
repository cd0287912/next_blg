import Head from "next/head"
import styles from "./index.module.scss"
import AdminLayout from "./../../components/adminLayout"

export default function Admin() {
  return (
    <AdminLayout>
      <Head>
        <title>仪表盘</title>
      </Head>
      <div className={styles.root}>12e</div>
    </AdminLayout>
  )
}
