import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
export default function About() {
  return (
    <AdminLayout>
      <Head>
        <title>关于</title>
      </Head>
      <div className={styles.root}>关于</div>
    </AdminLayout>
  )
}
