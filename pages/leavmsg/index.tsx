import { useState, useEffect } from "react"
import Layout from "./../../components/layout"
import styles from "./index.module.scss"
import { CommentForm, CommentItem } from "./../../components/comment"
import Head from "next/head"
import { Pagination } from "antd"
import { homeApi } from "./../../apis"
import { Comment, Pagination as Page, Sys } from "./../../types"

interface CommentList {
  list: Comment[]
  total: number
}
interface Props {
  sys: Sys
}
function Leavmsg({ sys }: Props) {
  const [pageInfo, setPageInfo] = useState<Page>({ pageNo: 1, pageSize: 10 })
  const [commentList, setCommentList] = useState<CommentList>({
    list: [],
    total: 0,
  })
  useEffect(() => {
    const getComment = async () => {
      const result = await homeApi.getCommentList<CommentList>(pageInfo)
      setCommentList({
        list: result.list,
        total: result.total,
      })
    }
    getComment()
  }, [pageInfo])
  return (
    <Layout {...sys}>
      <Head>
        <title>{sys.sysTitle}-留言</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.head}>
          <div className={styles.title}>✌🏻留言寄语耶✌🏻</div>
          <div className={styles.info}>「来都来了，你说是不是~」</div>
        </div>
        <div className={styles.comments}>
          <CommentForm
            onSuccess={() =>
              setPageInfo({ pageNo: 1, pageSize: pageInfo.pageSize })
            }
          />
          {commentList.list.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
        <div className={styles.pagination}>
          <Pagination
            onChange={(pageNo, pageSize) => setPageInfo({ pageNo, pageSize })}
            current={pageInfo.pageNo}
            pageSize={pageInfo.pageSize}
            total={commentList.total}
          />
        </div>
      </div>
    </Layout>
  )
}
export async function getStaticProps() {
  const sys = await homeApi.getSysDetail<Sys>()
  return { props: { sys } }
}
export default Leavmsg
