import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import styles from "./index.module.scss"
import classnames from "classnames"
import { homeApi } from "./../../apis/index"
import { isCdn } from "./../../tools"
import dayjs from "dayjs"
import { marked } from "marked"
import hljs from "highlight.js"
import NavBox from "../../components/navBox"
import Meta from "../../components/meta"
import Spinner from "../../components/spinner"
import { Post, Tag, Sys } from "./../../types"

interface Props {
  pageInfo: Post
  recomdList: Post[]
  allTags: Tag[]
  sys: Sys
}

export default function ArticleDetail({
  pageInfo,
  recomdList,
  allTags,
  sys,
}: Props) {
  const router = useRouter()
  const [html, setHtml] = useState()
  useEffect(() => {
    if (!pageInfo.content) return
    const html = marked(pageInfo.content, {
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: true,
      smartLists: true,
      smartypants: true,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
    })
    setHtml(html)
  }, [pageInfo.content])

  return (
    <Layout {...sys}>
      <Head>
        <title>忘不了oh</title>
      </Head>

      <div className={styles.root}>
        <div
          className={classnames(styles.pageContainer, {
            cover: !pageInfo.cover,
          })}
        >
          {pageInfo.cover && (
            <div className={styles.pageCover}>
              <img src={isCdn(pageInfo.cover)} alt="" />
            </div>
          )}
          <div className={styles.pageTitle}>
            <h2>{pageInfo.title}</h2>
            <p>
              <span>{dayjs(pageInfo.create_time).format("YYYY-MM-DD")}</span>
              <span>{pageInfo.tag.name}</span>
              <span>{pageInfo.view_times} 次浏览</span>
            </p>
            <div className={styles.hr}></div>
          </div>
          {!html ? (
            <div className={styles.spinner}>
              <Spinner></Spinner>
            </div>
          ) : (
            <div
              className={classnames(styles.pageContent, "markdown-body")}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          )}
        </div>
        <div className={styles.pageSide}>
          <div className={styles.navContent}>
            <NavBox title="推荐阅读">
              <div className={styles.recomdList}>
                {recomdList.map((page) => (
                  <div
                    onClick={() => router.push(`/article/${page.id}`)}
                    key={page.id}
                    className={classnames(styles.recomd, "text-overflow")}
                  >
                    {page.title}
                  </div>
                ))}
              </div>
            </NavBox>
            <NavBox title="专题系列">
              <div className={styles.recomdList}>
                {allTags.map((tag) => (
                  <div
                    onClick={() => router.push(`/series/${tag.id}`)}
                    key={tag.id}
                    className={classnames(styles.recomd, "text-overflow")}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </NavBox>
            <Meta {...sys} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const id = ctx.params.id
  const pageInfo = await homeApi.getPageById<Post>(id)
  const recomdList = await homeApi.getRecommdPages<Post[]>()
  const allTags = await homeApi.getAllTags<Tag[]>()
  const sys = await homeApi.getSysDetail<Sys>()
  return {
    props: {
      pageInfo,
      recomdList,
      allTags,
      sys,
    },
  }
}
