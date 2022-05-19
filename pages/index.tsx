import { useState, useEffect, useRef } from "react";
import { Carousel } from "antd";
import classnames from "classnames";
import Layout from "./../components/layout";
import styles from "./index.module.scss";
import NavBox from "./../components/navBox";
import ArticlItem from "./../components/articleItem";
import Meta from "./../components/meta";
import Head from "next/head";
import { homeApi } from "./../apis";
import { isCdn, debounce } from "../tools";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Post, Tag, Sys } from "./../types";

interface Prop {
  tagList: Tag[];
  recomdList: Post[];
  pageList: Post[];
  total: number;
  sys: Sys;
}

interface SwiperPorps {
  recomdList: Post[];
}
const PAGESIZE = 20;

export default function Home(props: Prop) {
  const pageNoRef = useRef(1);
  const router = useRouter();
  const { recomdList, tagList, pageList, total, sys } = props;

  const [list, setList] = useState(() => pageList);

  useEffect(() => {
    const getInfo = async () => {
      const params = {
        pageNo: pageNoRef.current,
        pageSize: PAGESIZE,
        tagId: "",
      };
      const result = await homeApi.getPagesList<{
        list: Post[];
        total: number;
      }>(params);
      setList((pre) => [...pre, ...result.list]);
    };
    const fn = async (e) => {
      const body = document.documentElement || document.body;
      const scrollHeight = body.scrollHeight;
      const scrollTop = body.scrollTop;
      const clientHeight = body.clientHeight;
      if (clientHeight + scrollTop >= scrollHeight) {
        const maxPageNo = Math.ceil(total / PAGESIZE);
        if (pageNoRef.current < maxPageNo) {
          pageNoRef.current++;
          getInfo();
        }
      }
    };

    document.addEventListener("scroll", debounce(fn, 300));
    return () => {
      document.removeEventListener("scroll", debounce(fn, 300));
    };
  }, []);
  return (
    <Layout {...sys}>
      <Head>
        <title>{sys.sysTitle}-文章</title>
      </Head>
      <div className={styles.root}>
        <section className={styles.content}>
          <Swiper recomdList={recomdList} />
          <div className={styles.pageList}>
            {list.map((page) => (
              <ArticlItem {...page} key={page.id} />
            ))}
          </div>
        </section>
        <aside className={styles.nav}>
          <div className={styles.navContent}>
            <NavBox title="关于">
              <div className={styles.introduce}>{sys.sysAbout}</div>
            </NavBox>
            <NavBox title="推荐阅读">
              <div className={styles.recomdList}>
                {recomdList.map((page) => (
                  <div
                    onClick={() => router.push(`/article/${page.id}`)}
                    key={page.id}
                    className={classnames(styles.recomd, "text-overflow")}>
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
                    className={classnames(styles.recomd, "text-overflow")}>
                    {tag.name}
                  </div>
                ))}
              </div>
            </NavBox>
            <Meta {...sys} />
          </div>
        </aside>
      </div>
    </Layout>
  );
}

function Swiper(props: SwiperPorps) {
  const { recomdList } = props;
  const router = useRouter();
  return (
    <div className={styles.swiperContainer}>
      <Carousel autoplay>
        {recomdList.map((page) => {
          return (
            <div
              onClick={() => router.push(`/article/${page.id}`)}
              key={page.id}>
              <div
                className={styles.swiperItem}
                style={{
                  backgroundImage: `url(${isCdn(page.cover)})`,
                }}>
                <div className={styles.mask}>
                  <div className={styles.name}>{page.title}</div>
                  <div className={styles.info}>
                    <span>{dayjs(page.create_time).format("MM/DD/YYYY")}</span>
                    <span>{page.view_times} 次浏览</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export async function getServerSideProps() {
  const params = { pageNo: 1, pageSize: PAGESIZE, tagId: "" };
  const recomdList = await homeApi.getRecommdPages<Post[]>();
  const tagList = await homeApi.getAllTags<Tag[]>();
  const result = await homeApi.getPagesList<{
    list: Post[];
    total: number;
  }>(params);
  const sys = await homeApi.getSysDetail<Sys>();
  return {
    props: {
      recomdList,
      tagList,
      pageList: result.list,
      total: result.total,
      sys,
    },
  };
}
