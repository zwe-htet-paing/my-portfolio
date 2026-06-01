import Header from './Header.jsx'
import Footer from './Footer.jsx'

/**
 * Shared page shell. Wraps route content with the sticky header and footer
 * so individual route components don't need to repeat either.
 *
 * The header is `fixed` (h-14); main content is offset with matching top padding.
 *
 * @param {{ children: React.ReactNode, activePath?: string }} props
 */
function Layout({ children, activePath }) {
  return (
    <div className="min-h-screen w-full flex flex-col text-on-surface font-sans overflow-x-clip">
      <Header activePath={activePath} />
      <main className="flex-grow w-full pt-14">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
