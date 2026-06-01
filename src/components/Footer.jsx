import Container from './Container.jsx'

const SOCIAL_LINKS = [
  { href: 'https://github.com/zwe-htet-paing', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/zwe-htet-paing/', label: 'LinkedIn' },
  { href: 'https://www.kaggle.com/zwehtetpaing123', label: 'Kaggle' },
  { href: '#', label: 'X' },
]

/**
 * Page footer.
 *
 * The outer <footer> spans the full viewport width so the top border
 * spans edge-to-edge. The inner <Container> constrains the copyright
 * + social links to 1200px max-width with the constant 24px horizontal
 * gutter. Vertical padding is `py-5` (20px).
 */
function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 py-5">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <p className="text-on-surface-variant font-label-caps text-[12px] tracking-[0.2em] text-center md:text-left">
          © 2026 ZWE HTET PAING. ENGINEERED FOR INTELLIGENCE.
        </p>
        <ul className="flex gap-6 items-center">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href === '#' ? undefined : '_blank'}
                rel={link.href === '#' ? undefined : 'noreferrer'}
                className="text-on-surface-variant hover:text-primary transition-all duration-300 font-label-code text-[12px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}

export default Footer
