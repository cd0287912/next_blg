import { ReactNode } from "react"
import TopHead from "./../topHead"
import { Sys } from "./../../types"

interface Props extends Sys {
  children: ReactNode
}
function Layout(props: Props) {
  const { children, ...sys } = props
  return (
    <div className="app-container">
      <TopHead {...sys} />
      <div className="app-content">{children}</div>
    </div>
  )
}
export default Layout
