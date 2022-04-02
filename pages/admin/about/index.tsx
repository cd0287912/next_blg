import { useState, useEffect } from "react"
import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { marked } from "marked"
import classnames from "classnames"
import hljs from "highlight.js"
import { readmeApis } from "../../../apis"
import { Modal, message, Result } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

export default function About() {
  const [html, setHtml] = useState("")
  const [rowhtml, setRowhtml] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    if (!rowhtml) return
    const html = marked(rowhtml, {
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
  }, [rowhtml])

  useEffect(() => {
    const getReadme = async () => {
      const result = await readmeApis.getReadme<{
        id: string
        content: string
      }>()
      if (result.id) {
        setId(result.id)
      }
      if (result.content) {
        setRowhtml(result.content)
      }
    }
    getReadme()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        Modal.confirm({
          title: "确认保存吗",
          icon: <ExclamationCircleOutlined />,
          okText: "确认",
          cancelText: "取消",
          onOk: async () => {
            const data = { id, content: rowhtml }
            const result = await readmeApis.createReadme<{
              id: string
              content: string
            }>(data)
            if (result.id) {
              message.success("保存成功")
            }
          },
        })
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  return (
    <AdminLayout>
      <Head>
        <title>README</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.root}>
          <div className={styles.editor}>
            <textarea
              placeholder="README~"
              value={rowhtml}
              onChange={(e) => setRowhtml(e.target.value)}
              rows={10}
            ></textarea>
            <div
              id="show-area"
              dangerouslySetInnerHTML={{ __html: html }}
              className={classnames(styles.preview, "markdown-body")}
            ></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
