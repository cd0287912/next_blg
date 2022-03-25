import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { Space, Table, Button, Pagination, Popconfirm, message } from "antd"
import { useState, useEffect } from "react"
import { userApis } from "../../../apis"
import dayjs from "dayjs"
// https://api.prodless.com/avatar.png
interface User {
  id: string
  username: string
  create_time: string
}
interface UserList {
  total: number
  list: User[]
}
export default function User() {
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 6 })
  const [state, setState] = useState<UserList>({ list: [], total: 0 })
  const columns: any = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 100,
      render: (_, r, index) => <span>{index + 1}</span>,
    },
    {
      title: "用户名",
      align: "center",
      width: 300,
      dataIndex: "username",
      key: "username",
    },
    {
      title: "注册时间",
      align: "center",
      dataIndex: "create_time",
      key: "create_time",
      render: (_) => <span>{dayjs(_).format("YYYY-MM-DD HH:mm:ss")}</span>,
    },
    {
      title: "IP",
      align: "center",
      dataIndex: "create_time",
      key: "create_time",
      render: (_) => <span>192.168.38.96</span>,
    },
    {
      title: "评论数量",
      align: "center",
      dataIndex: "create_time",
      key: "create_time",
      render: (_) => <span>{100}</span>,
    },
    {
      title: "操作",
      align: "center",
      render: (_, record) => (
        <Space>
          <Popconfirm
            onConfirm={() => del(record.id)}
            title={`确定删除 ${record.username}`}
            okText="是的"
            cancelText="偶~不"
          >
            <Button danger>删号</Button>
          </Popconfirm>
          <Button type="primary">授权</Button>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    const getUsers = async () => {
      const result = await userApis.getUsers<UserList>(pagination)
      setState(result)
    }
    getUsers()
  }, [pagination])

  const del = async (id: string) => {
    await userApis.delUser(id)
    message.success("删除成功")
    setPagination({ ...pagination, pageNo: 1 })
  }
  return (
    <AdminLayout>
      <Head>
        <title>游客管理</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>游客列表</div>
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
