import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import Head from "next/head"
import { useEffect, useState } from "react"
import { Button, Table, Space, Modal, Form, Input, Radio, message } from "antd"
import { labelApis } from "./../../../apis"
import UploadBox from "./../../../components/uploadBox"
import { isCdn } from "../../../tools"
import { Tag } from "./../../../types"

export default function Label() {
  const [form] = Form.useForm()
  const [modal, setModal] = useState({ show: false, id: "", cover: "" })
  const [state, setState] = useState<Tag[]>([])

  const getInfo = async () => {
    const result = await labelApis.getAllLabels<Tag[]>()
    setState(result)
  }

  useEffect(() => {
    getInfo()
  }, [])
  const columns: any = [
    {
      title: "标题",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      align: "center",
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
      title: "操作",
      dataIndex: "control",
      key: "control",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button onClick={() => addLabel(record)} type="primary">
            编辑
          </Button>
          <Button onClick={() => handleDel(record.id)} danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]
  const cancel = () => {
    form.resetFields()
    setModal({ show: false, id: "", cover: "" })
  }
  const addLabel = (val) => {
    if (val) {
      form.setFields([
        {
          name: "name",
          value: val.name,
        },
        {
          name: "description",
          value: val.description,
        },
        {
          name: "cover",
          value: val.cover,
        },
      ])
      setModal({ show: true, id: val.id, cover: val.cover })
    } else {
      setModal({ show: true, id: "", cover: "" })
    }
  }
  const uploadSuccess = (source) => {
    setModal({ ...modal, cover: source })
    form.setFields([
      {
        name: "cover",
        value: source,
      },
    ])
  }
  const submit = () => {
    form.validateFields().then(async (data) => {
      let result
      if (!modal.id) {
        result = await labelApis.createLabel<Tag>(data)
      } else {
        result = await labelApis.updateLabel<Tag>(modal.id, data)
      }
      if (result.id) {
        message.success("操作成功")
        cancel()
      }
      getInfo()
    })
  }
  const handleDel = async (id: string) => {
    await labelApis.deLabel(id)
    message.success("删除成功")
    getInfo()
  }
  return (
    <AdminLayout>
      <Head>
        <title>标签管理</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <Button onClick={() => addLabel(null)} type="primary">
            添加标签
          </Button>
          <div className={styles.table}>
            <Table
              pagination={false}
              rowKey={(c) => c.id}
              columns={columns}
              dataSource={state}
            />
          </div>
        </div>
      </div>
      <Modal
        title={modal.id ? "修改" : "添加"}
        onOk={submit}
        onCancel={cancel}
        visible={modal.show}
        cancelText="取消"
        okText="保存"
      >
        <Form
          form={form}
          name="labelForm"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="name"
            rules={[{ required: true, message: "请填写标题" }]}
          >
            <Input placeholder="标题" />
          </Form.Item>
          <Form.Item initialValue={null} label="描述" name="description">
            <Input placeholder="描述" />
          </Form.Item>
          <Form.Item initialValue={null} label="封面" name="cover">
            <UploadBox source={modal.cover} onSuccess={uploadSuccess} />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  )
}
