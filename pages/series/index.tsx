import Layout from "./../../components/layout"
import styles from "./index.module.scss"
import Head from "next/head"
import { homeApi } from "./../../apis"
import { isCdn } from "./../../tools"
import { useRouter } from "next/router"
import { Tag } from "./../../types"

interface Prop {
  tagList: Tag[]
}
function Series(props: Prop) {
  const { tagList } = props
  return (
    <Layout>
      <Head>
        <title>忘不了oh-专题</title>
      </Head>
      <div className={styles.root}>
        {tagList.map((tag) => (
          <SeriesBox key={tag.id} {...tag} />
        ))}
      </div>
    </Layout>
  )
}

function SeriesBox(props: Tag) {
  const router = useRouter()
  return (
    <div className={styles.item}>
      <div className={styles.itemContainer}>
        <div
          onClick={() => {
            router.push(`/series/${props.id}`)
          }}
          className={styles.itemContent}
          style={{
            backgroundImage: `url(${isCdn(props.cover)})`,
          }}
        >
          <div className={styles.mask}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.info}>{props.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const tagList = await homeApi.getAllTags<Tag[]>()
  return { props: { tagList } }
}

export default Series
