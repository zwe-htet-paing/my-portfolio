import Header from './Header.jsx'
import Footer from './Footer.jsx'

/**
 * Shared page shell. Wraps route content with the sticky header and footer
 * so individual route components don't need to repeat either.
 *
 * The header is `fixed`. The Portfolio/Projects variant is h-16; the
 * Contact variant grows to h-20 on md+. The Layout detects the active
 * path and applies the matching top padding.
 *
 * @param {{ children: React.ReactNode, activePath?: string }} props
 */
function Layout({ children, activePath }) {
  const isContact = activePath === '/contact'
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-on-surface font-sans overflow-x-clip">
      <Header activePath={activePath} />
      <main className={`flex-grow w-full ${isContact ? 'pt-14' : 'pt-14'}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
