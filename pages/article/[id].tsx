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
// import Tocify from "./tocify"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import NavBox from "../../components/navBox"
import { Post, Tag } from "./../../types"

// let tocify = new Tocify()
const renderer = new marked.Renderer()
// renderer.heading = function (text, level, raw) {
//   const anchor = tocify.add(text, level)
//   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
// }

interface Props {
  pageInfo: Post
  recomdList: Post[]
  allTags: Tag[]
}
export default function ArticleDetail({
  pageInfo,
  recomdList,
  allTags,
}: Props) {
  const router = useRouter()
  const [html, setHtml] = useState()
  useEffect(() => {
    if (!pageInfo.content) return
    const html = marked(pageInfo.content, {
      // renderer: new marked.Renderer(),
      renderer,
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
    // return () => {
    //   tocify.reset()
    // }
  }, [pageInfo.content])

  return (
    <Layout>
      <Head>
        <title>忘不了oh</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.pageContainer}>
          {pageInfo.cover && (
            <div className={styles.pageCover}>
              <img src={isCdn(pageInfo.cover)} alt="" />
            </div>
          )}
          <div className={styles.pageTitle}>
            <h2>{pageInfo.title}</h2>
            <p>
              <span>{dayjs(pageInfo.create_time).format("YYYY-MM-DD")}</span>
              <span>{pageInfo.view_times} 次浏览</span>
            </p>
            <div className={styles.hr}></div>
          </div>
          <div
            className={styles.pageContent}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
        <div className={styles.pageSide}>
          {/* <div className={styles.catalogue}>
            <div className={styles.cataTitle}>目录</div>
            <div className="toc">{tocify && tocify.render()}</div>
          </div> */}
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
  return {
    props: {
      pageInfo,
      recomdList,
      allTags,
    },
  }
}
