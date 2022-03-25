import Layout from "./../../components/layout"
import styles from "./index.module.scss"
import { CommentForm, CommentItem } from "./../../components/comment"
import Head from "next/head"
function Leavmsg() {
  return (
    <Layout>
      <Head>
        <title>忘不了oh-留言</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.head}>
          <div className={styles.title}>✌🏻留言寄语耶✌🏻</div>
          <div className={styles.info}>「来都来了，你说是不是~」</div>
        </div>
        <div className={styles.comments}>
          <CommentForm />
          <CommentItem />
        </div>
      </div>
    </Layout>
  )
}
export default Leavmsg
