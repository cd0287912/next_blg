import { useRef, ChangeEvent } from "react"
import styles from "./index.module.scss"
import { aliUpload, isCdn } from "./../../tools"
export default function UploadBox({ source, onSuccess }) {
  const fileRef = useRef<HTMLInputElement>()
  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0]
    const url = await aliUpload(file)
    if (url) {
      onSuccess(url)
    }
  }
  return (
    <div className={styles.root} onClick={() => fileRef.current.click()}>
      {!source && <i className="iconfont icon-add"></i>}
      {source && <img src={isCdn(source)} alt="" />}
      <input
        onChange={fileChange}
        ref={(input) => (fileRef.current = input)}
        type="file"
      />
    </div>
  )
}
