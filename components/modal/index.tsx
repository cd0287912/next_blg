import { ReactNode, useEffect } from "react"
import Button from "./../button"
import styles from "./index.module.scss"

interface Props {
  show: boolean
  children: ReactNode
  okText: string
  cancelText: string
  onOk?: () => void
  onCancel?: () => void
}
// https://picsum.photos/
export default function Modal({
  children,
  show,
  okText,
  cancelText,
  onOk,
  onCancel,
}: Props) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("hidden")
    } else {
      document.body.classList.remove("hidden")
    }
  }, [show])
  if (!show) return null
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.contentBody}>{children}</div>
        <div className={styles.footer}>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onOk} type="primary">
            {okText}
          </Button>
        </div>
      </div>
    </div>
  )
}
