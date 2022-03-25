import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
export default function Messsage() {
  return (
    <AdminLayout>
      <Head>
        <title>留言管理</title>
      </Head>
      <div className={styles.root}>留言管理</div>
    </AdminLayout>
  )
}
