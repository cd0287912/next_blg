import { AppProps } from "next/app"
import "antd/dist/antd.min.css"
import "../styles/globals.css"
import "../styles/github-markdown.css"
import "../styles/github-code-light.css"
import "../styles/github-code-dark.css"
import Router from "next/router"
import "nprogress/nprogress.css"
import NProgress from "nprogress"
import { useEffect } from "react"
import { homeApi } from "./../apis"
function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start()
    })
    Router.events.on("routeChangeComplete", () => {
      NProgress.done()
    })
  }, [])
  useEffect(() => {
    homeApi.saveVisitor()
  })
  return <Component {...pageProps} />
}

export default App
