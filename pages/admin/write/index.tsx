import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import { Select, Modal, Form, Input, message } from "antd"
import UploadBox from "./../../../components/uploadBox"
import Head from "next/head"
import { marked } from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import { labelApis, articleApis } from "./../../../apis"
const { Option } = Select
interface Lable {
  id: string
  name: string
  isSeries: boolean
  cover: string
  description: string
}
interface Page {
  id: string
  title: string
  cover: string
  content: string
  description: string
  tag: any
}
export default function Write() {
  const router = useRouter()
  const [form] = Form.useForm()
  const { query } = useRouter()
  // html格式的
  const [html, setHtml] = useState("")
  const [rowhtml, setRowhtml] = useState("")
  const [pageInfo, setPageInfo] = useState({
    show: false,
    cover: "",
  })
  const [labels, setLabels] = useState<Lable[]>([])

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
    const id = query.id
    if (!id) return
    const getArticleById = async () => {
      const result = await articleApis.getArticle<Page>(id)
      setPageInfo({
        ...pageInfo,
        cover: result.cover,
      })
      setRowhtml(result.content)
      form.setFields([
        {
          name: "title",
          value: result.title,
        },
        {
          name: "description",
          value: result.description,
        },
        {
          name: "cover",
          value: result.cover,
        },
        {
          name: "tagId",
          value: result.tag ? result.tag.id : "",
        },
      ])
    }
    getArticleById()
  }, [query.id])

  const handleKeyDown = (event) => {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
      setPageInfo((pageInfo) => ({
        ...pageInfo,
        show: true,
      }))
      event.preventDefault()
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    const getAllLabels = async () => {
      const result = await labelApis.getAllLabels<Lable[]>()
      setLabels(result)
    }
    getAllLabels()
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const uploadSuccess = (source) => {
    setPageInfo({ ...pageInfo, cover: source })
    form.setFields([
      {
        name: "cover",
        value: source,
      },
    ])
  }

  const handleSubmit = () => {
    form.validateFields().then(async (data) => {
      data.content = rowhtml
      if (query.id) {
        const result = await articleApis.updateArticle(query.id, data)
        if (!result) return
        message.success("保存成功")
      } else {
        const result = await articleApis.createArticle<Page>(data)
        if (!result) return
        message.success("保存成功")
      }
      setTimeout(() => {
        router.push("/admin/articles")
      }, 2000)
    })
  }

  const handleCancel = () => {
    setPageInfo({
      ...pageInfo,
      show: false,
    })
  }
  return (
    <AdminLayout>
      <Head>
        <title>写文章</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.editor}>
          <textarea
            placeholder="请输出内容~"
            value={rowhtml}
            onChange={(e) => setRowhtml(e.target.value)}
            rows={10}
          ></textarea>
          <div
            id="show-area"
            dangerouslySetInnerHTML={{ __html: html }}
            className={styles.preview}
          ></div>
        </div>
      </div>

      <Modal
        title="文章信息"
        visible={pageInfo.show}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form}
          name="pageForm"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>

          <Form.Item label="描述" name="description">
            <Input placeholder="请输入描述" />
          </Form.Item>

          <Form.Item initialValue={null} label="封面" name="cover">
            <UploadBox source={pageInfo.cover} onSuccess={uploadSuccess} />
          </Form.Item>

          <Form.Item
            label="标签"
            name="tagId"
            rules={[{ required: true, message: "请选择标签" }]}
          >
            <Select>
              {labels.map((label) => (
                <Option key={label.id} value={label.id}>
                  {label.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  )
}
