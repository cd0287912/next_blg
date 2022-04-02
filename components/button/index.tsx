import { ReactNode } from "react"
import classnames from "classnames"
import styles from "./index.module.scss"

interface ButtonProps {
  children: ReactNode
  onClick?: (...args) => void
  type?: "primary"
}
export default function Button({ onClick, children, type }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={classnames(styles.root, { primary: type === "primary" })}
    >
      {children}
    </div>
  )
}
