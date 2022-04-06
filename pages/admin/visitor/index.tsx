import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Space, Table, Button, Pagination, Popconfirm, message } from "antd"
import { visitorApis } from "../../../apis"
import { Visitor } from "./../../../types"
import dayjs from "dayjs"

interface VisitorResult {
  list: Visitor[]
  total: number
}

export default function VisitorList() {
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 10 })
  const [state, setState] = useState<VisitorResult>({ list: [], total: 0 })
  const columns: any = [
    {
      title: "时间",
      align: "center",
      dataIndex: "create_time",
      key: "create_time",
      width: 200,
      render: (_) => <span>{dayjs(_).format("YYYY-MM-DD HH:mm:ss")}</span>,
    },
    {
      title: "浏览器",
      align: "center",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "操作系统",
      align: "center",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "IP",
      align: "center",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "地址",
      align: "center",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space>
          <Popconfirm
            onConfirm={() => del(record.id)}
            title="确定删除"
            okText="是的"
            cancelText="偶~不"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const del = async (id) => {
    const result = await visitorApis.deleteVisitor<Visitor>(id)
    if (!result.id) return
    message.success("删除成功")
    setPagination({ pageNo: 1, pageSize: pagination.pageSize })
  }

  useEffect(() => {
    const getVisitor = async () => {
      const result = await visitorApis.getVisitor<VisitorResult>(pagination)
      setState(result)
    }
    getVisitor()
  }, [pagination])
  return (
    <AdminLayout>
      <Head>
        <title>访客记录</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>访客记录</div>
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
