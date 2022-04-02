import { useState, useEffect } from "react"
import AdminLayout from "../../../components/adminLayout"
import styles from "./index.module.scss"
import { Form, Input, Button, message } from "antd"
import Head from "next/head"
import UploadBox from "./../../../components/uploadBox"
import { sysApis } from "./../../../apis"
import { Sys } from "./../../../types"

export default function System() {
  const [id, setId] = useState("")
  const [logo, setLogo] = useState("")
  const [form] = Form.useForm()
  useEffect(() => {
    const getSysInfo = async () => {
      const result = await sysApis.getSys<Sys>()
      if (!result) return
      form.setFields([
        {
          name: "sysTitle",
          value: result.sysTitle,
        },
        {
          name: "sysLogo",
          value: result.sysLogo,
        },
        {
          name: "sysAbout",
          value: result.sysAbout,
        },
        {
          name: "sysGithubLink",
          value: result.sysGithubLink,
        },
        {
          name: "sysDesc",
          value: result.sysDesc,
        },
        {
          name: "sysSubDesc",
          value: result.sysSubDesc,
        },
      ])
      setId(result.id)
      setLogo(result.sysLogo)
    }
    getSysInfo()
  }, [])

  const onFinish = async (values) => {
    const result = await sysApis.createSys<Sys>({ ...values, id })
    if (result && result.id) {
      message.success("保存成功")
    }
  }

  const uploadSuccess = (source) => {
    setLogo(source)
    form.setFields([
      {
        name: "sysLogo",
        value: source,
      },
    ])
  }
  return (
    <AdminLayout>
      <Head>
        <title>系统设置</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <Form
            name="sys"
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            onFinish={onFinish}
            autoComplete="off"
            className={styles.form}
          >
            <Form.Item
              label="系统名称"
              name="sysTitle"
              rules={[{ required: true, message: "输入系统名称" }]}
            >
              <Input placeholder="输入系统名称" />
            </Form.Item>

            <Form.Item
              initialValue={null}
              label="系统图标"
              name="sysLogo"
              rules={[{ required: true, message: "请上传系统图标" }]}
            >
              <UploadBox source={logo} onSuccess={uploadSuccess} />
            </Form.Item>

            <Form.Item
              label="关于"
              name="sysAbout"
              rules={[{ required: true, message: "输入关于" }]}
            >
              <Input placeholder="输入关于" />
            </Form.Item>

            <Form.Item
              label="Github链接"
              name="sysGithubLink"
              rules={[{ required: true, message: "输入Github链接" }]}
            >
              <Input placeholder="输入Github链接" />
            </Form.Item>

            <Form.Item
              label="系统描述"
              name="sysDesc"
              rules={[{ required: true, message: "输入描述" }]}
            >
              <Input placeholder="输入描述" />
            </Form.Item>

            <Form.Item
              label="系统描述"
              name="sysSubDesc"
              rules={[{ required: true, message: "输入描述" }]}
            >
              <Input placeholder="输入描述" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AdminLayout>
  )
}
