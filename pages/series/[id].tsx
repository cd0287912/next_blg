import React, { useMemo } from "react"
import Layout from "../../components/layout"
import ArticlItem from "../../components/articleItem"
import Meta from "../../components/meta"
import Head from "next/head"
import { homeApi } from "./../../apis"
import styles from "./[id].module.scss"
import { isCdn } from "../../tools"
import { useRouter } from "next/router"
import classnames from "classnames"
import NavBox from "./../../components/navBox"
import { Tag, Post, Sys } from "./../../types"
import dayjs from "dayjs"

interface Props {
  tagInfo: Tag
  allTags: Tag[]
  recomdList: Post[]
  sys: Sys
}
export default function SeriesDetail({
  tagInfo,
  recomdList,
  allTags,
  sys,
}: Props) {
  const router = useRouter()
  const posts = useMemo<Post[]>(() => {
    const posts = []
    tagInfo.post.forEach((post) => {
      post.tag = {
        name: tagInfo.name,
        id: tagInfo.id,
        create_time: tagInfo.create_time,
        cover: tagInfo.cover,
        description: tagInfo.description,
      }
      posts.push(post)
    })
    return posts
  }, [tagInfo])
  return (
    <Layout {...sys}>
      <Head>
        <title>
          {sys.sysTitle}-{tagInfo.name}
        </title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.tagInfo}>
            <div className={styles.tagCover}>
              <img src={isCdn(tagInfo.cover)} alt="" />
            </div>
            <div className={styles.tagDetail}>
              <div className={styles.name}>{tagInfo.name}</div>
              <div className={styles.description}>{tagInfo.description}</div>
              <div className={styles.count}>
                <span>「{posts.length}」篇</span>
                <span className={styles.diver}></span>
                <span>{dayjs(tagInfo.create_time).format("YYYY-MM-DD")}</span>
              </div>
            </div>
          </div>

          <div className={styles.articalContainer}>
            {posts.map((post) => (
              <ArticlItem key={post.id} {...post} />
            ))}
          </div>
        </div>
        <div className={styles.nav}>
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
            <NavBox title="其他专题">
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
  const tagInfo = await homeApi.getTagById(id)
  const sys = await homeApi.getSysDetail<Sys>()
  const recomdList = await homeApi.getRecommdPages<Post[]>()
  let allTags = await homeApi.getAllTags<Tag[]>()
  allTags = allTags.filter((tag) => tag.id != id)
  return {
    props: {
      tagInfo,
      recomdList,
      allTags,
      sys,
    },
  }
}
