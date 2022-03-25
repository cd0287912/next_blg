import { AppProps } from "next/app"
import "antd/dist/antd.min.css"
import "../styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
