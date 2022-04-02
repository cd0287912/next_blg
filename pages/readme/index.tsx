import Layout from "./../../components/layout"
import Head from "next/head"
import styles from "./index.module.scss"
import classnames from "classnames"
import { marked } from "marked"
import hljs from "highlight.js"
import { homeApi } from "./../../apis"
import { Sys } from "./../../types"
import { useEffect, useState } from "react"
// README
interface Props {
  sys: Sys
  readme: { content: string }
}
function Readme({ readme, sys }: Props) {
  const [html, setHtml] = useState("")
  useEffect(() => {
    if (!readme.content) return
    const html = marked(readme.content, {
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
  }, [readme.content])
  return (
    <Layout {...sys}>
      <Head>
        <title>{sys.sysTitle}-README</title>
      </Head>
      <div
        className={classnames(styles.root, "markdown-body")}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Layout>
  )
}
export async function getStaticProps() {
  const readme = await homeApi.getReadme<{ content: string }>()
  const sys = await homeApi.getSysDetail<Sys>()
  return { props: { readme, sys } }
}
export default Readme
