import React, { useState } from "react"
import styles from "./index.module.scss"
import Modal from "../modal"
import Button from "../button"
import { homeApi } from "../../apis"
import { Comment } from "./../../types"
import { TOKEN } from "./../../tools"
import dayjs from "dayjs"

export function CommentForm({ onSuccess }) {
  const [content, setContent] = useState("")
  const [show, setShow] = useState(false)

  const save = async () => {
    if (!content.trim()) return
    try {
      await homeApi.saveComment({ content })
      setContent("")
      onSuccess()
    } catch (error) {
      const { status } = error.response
      if (status === 401) {
        setShow(true)
      }
    }
  }

  const handleFocus = () => {
    if (!localStorage.getItem(TOKEN)) {
      setShow(true)
    }
  }

  const handle2Login = () => {
    location.href = "/admin/login?back=" + encodeURIComponent(location.href)
  }

  return (
    <div className={styles.root}>
      <textarea
        placeholder="请输入留言内容哦~"
        className={styles.input}
        rows={4}
        maxLength={250}
        onFocus={handleFocus}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className={styles.controls}>
        <Button onClick={save}>发表</Button>
      </div>
      <Modal
        onOk={handle2Login}
        onCancel={() => setShow(false)}
        show={show}
        okText="去登录"
        cancelText="下次一定"
      >
        <div className={styles.modalContent}>
          <i className="iconfont icon-jinggao"></i>
          <div>看官，留言是需要登录的哦~</div>
        </div>
      </Modal>
    </div>
  )
}

export function CommentItem(props: Comment) {
  return (
    <div className={styles.commentItem}>
      <div className={styles.user}>
        <img src={"https://picsum.photos/38?random=" + props.id} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <span className={styles.username}>{props.user.username}</span>
          <span className={styles.useragent}>{props.agent}</span>
        </div>
        <div className={styles.values}>{props.content}</div>
        <div className={styles.detail}>
          <span className={styles.time}>
            {dayjs(props.create_time).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span>{props.address}</span>
        </div>
      </div>
    </div>
  )
}
