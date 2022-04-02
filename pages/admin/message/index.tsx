import { useEffect, useState } from "react"
import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { Table, Button, Pagination, message, Popconfirm } from "antd"
import dayjs from "dayjs"
import { commentApis } from "./../../../apis"
import { Pagination as Page, Comment } from "./../../../types"
interface CommentList {
  list: Comment[]
  total: number
}

export default function Messsage() {
  const [pagination, setPagination] = useState<Page>({
    pageNo: 1,
    pageSize: 10,
  })
  const [commentList, setCommentList] = useState<CommentList>({
    list: [],
    total: 0,
  })
  useEffect(() => {
    const getComment = async () => {
      const result = await commentApis.getCommentList<CommentList>(pagination)
      setCommentList({
        list: result.list,
        total: result.total,
      })
    }
    getComment()
  }, [pagination])
  const columns: any = [
    {
      title: "用户名",
      dataIndex: "user",
      key: "user",
      width: 200,
      ellipsis: true,
      render: (_) => <span>{_.username}</span>,
    },
    {
      title: "时间",
      dataIndex: "create_time",
      key: "create_time",
      align: "center",
      width: 200,
      render: (_) => <span>{dayjs(_).format("YYYY-MM-DD HH:mm:ss")}</span>,
    },
    {
      title: "设备",
      dataIndex: "agent",
      key: "agent",
      align: "center",
      ellipsis: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      align: "center",
      ellipsis: true,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "control",
      key: "control",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Popconfirm
          placement="bottom"
          title="确认删除?"
          onConfirm={() => handleDel(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>删除</Button>
        </Popconfirm>
      ),
    },
  ]
  const handleDel = async (id) => {
    const result = await commentApis.delCommentById(id)
    if (result) {
      message.success("删除成功")
      setPagination({ pageNo: 1, pageSize: pagination.pageSize })
    }
  }
  return (
    <AdminLayout>
      <Head>
        <title>留言管理</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <Table
            pagination={false}
            rowKey={(c) => c.id}
            columns={columns}
            dataSource={commentList.list}
          />
          <div className={styles.pagination}>
            <Pagination
              hideOnSinglePage
              current={pagination.pageNo}
              pageSize={pagination.pageSize}
              onChange={(pageNo) => setPagination({ ...pagination, pageNo })}
              total={commentList.total}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
