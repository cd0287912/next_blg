import { useState, useEffect } from "react"
import { Carousel } from "antd"
import classnames from "classnames"
import Layout from "./../components/layout"
import styles from "./index.module.scss"
import NavBox from "./../components/navBox"
import ArticlItem from "./../components/articleItem"
import Meta from "./../components/meta"
import Head from "next/head"
import { homeApi } from "./../apis"
import { isCdn } from "../tools"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import { Post, Tag } from "./../types"

interface Prop {
  tagList: Tag[]
  recomdList: Post[]
  pageList: Post[]
  total: number
}

interface PageFilter {
  pageNo: number
  pageSize: number
  tagId: string
}

interface SwiperPorps {
  recomdList: Post[]
}

export default function Home(props: Prop) {
  const router = useRouter()
  const { recomdList, tagList, pageList, total } = props

  const [pageFilter, setPageFilter] = useState<PageFilter>({
    pageNo: 1,
    pageSize: 20,
    tagId: "",
  })

  const [pageInfo, setPageInfo] = useState(() => ({
    total,
    list: pageList,
  }))

  // useEffect(() => {
  //   const getPageList = async () => {
  //     const result = await homeApi.getPagesList<{
  //       list: Post[]
  //       total: number
  //     }>(pageFilter)
  //     setPageInfo(result)
  //   }
  //   getPageList()
  // }, [pageFilter])

  return (
    <Layout>
      <Head>
        <title>忘不了oh-文章</title>
      </Head>
      <div className={styles.root}>
        <section className={styles.content}>
          <Swiper recomdList={recomdList} />
          <div className={styles.pageList}>
            {pageInfo.list.map((page) => (
              <ArticlItem {...page} key={page.id} />
            ))}
          </div>
        </section>
        <aside className={styles.nav}>
          <div className={styles.navContent}>
            <NavBox title="自我介绍">
              <div className={styles.introduce}>
                hello!
                我是忘不了oh，一位专业的前端BUG制造者，希望能制造更多的bug~
              </div>
            </NavBox>
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
                {tagList.map((tag) => (
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
            <Meta />
          </div>
        </aside>
      </div>
    </Layout>
  )
}

function Swiper(props: SwiperPorps) {
  const { recomdList } = props
  const router = useRouter()
  return (
    <div className={styles.swiperContainer}>
      <Carousel autoplay>
        {recomdList.map((page) => {
          return (
            <div
              onClick={() => router.push(`/article/${page.id}`)}
              key={page.id}
            >
              <div
                className={styles.swiperItem}
                style={{
                  backgroundImage: `url(${isCdn(page.cover)})`,
                }}
              >
                <div className={styles.mask}>
                  <div className={styles.name}>{page.title}</div>
                  <div className={styles.info}>
                    <span>{dayjs(page.create_time).format("MM/DD/YYYY")}</span>
                    <span>{page.view_times} 次浏览</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export async function getStaticProps() {
  const params = { pageNo: 1, pageSize: 20, tagId: "" }
  const recomdList = await homeApi.getRecommdPages<Post[]>()
  const tagList = await homeApi.getAllTags<Tag[]>()
  const result = await homeApi.getPagesList<{
    list: Post[]
    total: number
  }>(params)
  return {
    props: { recomdList, tagList, pageList: result.list, total: result.total },
  }
}
