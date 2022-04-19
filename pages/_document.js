import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="//at.alicdn.com/t/font_3203231_a6gp0sx67h6.css"
          />
          <meta name="Description" content="这是一个前端博客,前端知识库"></meta>
          <meta
            name="Keywords"
            content="忘不了,博客,前端,vue.js,react.js,next.js "
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
