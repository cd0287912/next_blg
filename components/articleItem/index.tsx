import classnames from "classnames"
import dayjs from "dayjs"
import styles from "./index.module.scss"
import { isCdn } from "./../../tools"
import { useRouter } from "next/router"
import { Post } from "./../../types"

function ArticlItem(props: Post) {
  const router = useRouter()
  return (
    <div
      className={styles.root}
      onClick={() => router.push(`/article/${props.id}`)}
    >
      <div className={classnames(styles.title, "text-overflow")}>
        {props.title}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={classnames(styles.desc, "text3-overflow")}>
            {props.description}
          </div>
          <div className={styles.detail}>
            {props.tag && (
              <div className={classnames(styles.tag, "text-overflow")}>
                {props.tag.name}
              </div>
            )}
            <div className={classnames(styles.viewTimes, "text-overflow")}>
              {props.view_times}·浏览
            </div>
            <div className={styles.time}>
              {dayjs(props.create_time).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
        {props.cover && (
          <div className={styles.cover}>
            <img src={isCdn(props.cover)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticlItem
