import TopHead from "./../topHead"
function Layout(porps) {
  return (
    <div className="app-container">
      <TopHead />
      <div className="app-content">{porps.children}</div>
    </div>
  )
}
export default Layout
