import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from './Container.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const NAV_LINKS = [
  { to: '/', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Sticky top navigation, anchored to the global 1200px content container.
 *
 * The outer <header> spans the full viewport width so the blurred
 * surface and bottom border paint edge-to-edge. The inner <Container
 * as="nav"> constrains the logo / links / Resume button to 1200px
 * max-width and applies the constant 24px horizontal gutter.
 *
 * Below `md` the bar collapses to a compact h-14 layout with a hamburger
 * menu that opens a full-width nav drawer.
 */
function Header({ activePath }) {
  const { pathname } = useLocation()
  const current = activePath ?? pathname

  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [menuOpen])

  const hamburgerButton = (
    <button
      type="button"
      onClick={() => setMenuOpen((v) => !v)}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      aria-controls="mobile-nav"
      className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded text-on-surface hover:text-primary transition-colors"
    >
      <span aria-hidden="true" className="material-symbols-outlined text-2xl">
        {menuOpen ? 'close' : 'menu'}
      </span>
    </button>
  )

  return (
    <>
      <header className="nav-blur border-b border-white/5 fixed top-0 inset-x-0 z-50">
        <Container
          as="nav"
          aria-label="Primary"
          className="flex items-center justify-between h-14"
        >
          <Link
            to="/"
            className="font-headline-lg text-[15px] font-semibold text-on-surface tracking-tight hover:text-primary transition-colors truncate"
          >
            ZWEHTETPAING.DEV
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = current === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={closeMenu}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'text-on-surface font-label-code text-sm border-b border-primary'
                        : 'text-on-surface-variant font-label-code text-sm hover:text-primary transition-colors duration-300'
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download="Zwe-Htet-Paing-Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-on-primary font-label-code text-sm font-bold px-5 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all"
            >
              Resume
              <span className="material-symbols-outlined text-[16px] leading-none">
                download
              </span>
            </a>
            {hamburgerButton}
          </div>
        </Container>
      </header>

      <MobileDrawer open={menuOpen} onClose={closeMenu} links={NAV_LINKS} current={current} />
    </>
  )
}

function MobileDrawer({ open, onClose, links, current }) {
  return (
    <div
      id="mobile-nav"
      className={`md:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <nav
        aria-label="Mobile"
        className={`absolute top-14 inset-x-0 bg-surface/95 backdrop-blur-xl border-b border-white/5 transition-transform duration-300 ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        <Container as="ul" className="flex flex-col gap-1 py-6 list-none">
          {links.map((link) => {
            const isActive = current === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'block py-3 px-4 rounded text-on-surface font-label-code text-base border-l-2 border-primary bg-primary/5'
                      : 'block py-3 px-4 rounded text-on-surface-variant font-label-code text-base hover:text-primary hover:bg-white/5 transition-colors'
                  }
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li className="mt-4 sm:hidden">
            <a
              href="/resume.pdf"
              download="Zwe-Htet-Paing-Resume.pdf"
              className="flex w-full items-center justify-center gap-1.5 bg-primary text-on-primary font-label-code text-sm font-bold px-6 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all"
            >
              Resume
              <span className="material-symbols-outlined text-[16px] leading-none">
                download
              </span>
            </a>
          </li>
        </Container>
      </nav>
    </div>
  )
}

export default Header
