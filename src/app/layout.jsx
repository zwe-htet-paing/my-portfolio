import Script from 'next/script'
import '../styles/theme.css'
import AnimatedBackground from '../components/AnimatedBackground'

export const metadata = {
  title: 'Zwe Htet Paing — AI/ML Engineer',
  description:
    'AI/ML Engineer portfolio. Machine learning, NLP, generative AI, and end-to-end ML deployment.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme')}catch(e){var s=null}document.documentElement.classList.add(s==='light'?'light':'dark')})()`,
          }}
        />
      </head>
      <body>
        <AnimatedBackground />
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
