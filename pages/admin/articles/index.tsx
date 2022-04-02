import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { useEffect, useState } from "react"
import {
  Button,
  Table,
  Tag,
  message,
  Pagination,
  Dropdown,
  Menu,
  Modal,
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { articleApis } from "./../../../apis"
import { useRouter } from "next/router"
import { isCdn } from "../../../tools"

interface Page {
  id: string
  title: string
  description: string
  create_time: string
  cover: string
  tag: {
    name: string
  }
}

interface Pagelist {
  list: Page[]
  total: number
}

export default function Articles() {
  const router = useRouter()
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 10 })
  const [state, setState] = useState<Pagelist>({ list: [], total: 0 })

  useEffect(() => {
    const getInfo = async () => {
      const result = await articleApis.getArticles<Pagelist>(pagination)
      setState(result)
    }
    getInfo()
  }, [pagination])

  const menu = (id, record) => {
    return (
      <Menu>
        <Menu.Item onClick={() => toggleRecomd(id)}>
          {record.recommend ? "取消" : ""}推荐
        </Menu.Item>
        <Menu.Item onClick={() => router.push(`/admin/write?id=${id}`)}>
          编辑
        </Menu.Item>
        <Menu.Item onClick={() => del(id, record.title)}>删除</Menu.Item>
      </Menu>
    )
  }

  const columns: any = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "时间",
      align: "center",
      width: 180,
      dataIndex: "create_time",
      key: "create_time",
      render: (_) => <div>{dayjs(_).format("YYYY-MM-DD HH:mm:ss")}</div>,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      align: "center",
      ellipsis: true,
    },
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      align: "center",
      width: 200,
      render: (_) => (
        <div className={styles.cover}>
          <img src={isCdn(_)} alt="" />
        </div>
      ),
    },
    {
      title: "标签",
      dataIndex: "cover",
      key: "cover",
      align: "center",
      width: 200,
      render: (_, record) =>
        record.tag && <Tag color="geekblue">{record.tag.name}</Tag>,
    },
    {
      title: "推荐",
      dataIndex: "recommend",
      key: "recommend",
      align: "center",
      width: 100,
      render: (_) => <span>{_ ? "推荐" : "-"}</span>,
    },
    {
      title: "浏览量",
      dataIndex: "view_times",
      key: "view_times",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "control",
      key: "control",
      align: "center",
      // width: 300,
      render: (_, record) => (
        <Dropdown overlay={menu(record.id, record)} placement="bottomRight">
          <i style={{ fontSize: 20 }} className="iconfont icon--more"></i>
        </Dropdown>
      ),
    },
  ]

  /**
   * 推荐置顶
   * @param {string} id
   */
  const toggleRecomd = async (id: string) => {
    const res = await articleApis.toggleArticleRecommd<string>(id)
    if (res) {
      setPagination({ ...pagination })
      message.success("设置成功")
    }
  }

  /**
   * 删除文章
   * @param {string} id
   */
  const del = (id: string, title: string) => {
    Modal.confirm({
      title: `删除${title}吗`,
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await articleApis.delArticle<string>(id)
        if (!res) return
        message.success("删除成功")
        setPagination({ ...pagination, pageNo: 1 })
      },
    })
  }

  return (
    <AdminLayout>
      <Head>
        <title>文章管理</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <Button onClick={() => router.push("/admin/write")} type="primary">
            写文章
          </Button>
          <div className={styles.table}>
            <Table
              rowKey={(c) => c.id}
              pagination={false}
              columns={columns}
              dataSource={state.list}
            />
          </div>
          <div className={styles.pagination}>
            <Pagination
              hideOnSinglePage
              current={pagination.pageNo}
              pageSize={pagination.pageSize}
              onChange={(pageNo) => setPagination({ ...pagination, pageNo })}
              total={state.total}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
