'use client'

import { useEffect } from 'react'
import Layout from './Layout.jsx'
import Container from './Container.jsx'

/**
 * Contact — page header + two-column form/sidebar layout.
 *
 *   outer:  full viewport
 *   inner:  max-width: 1280px, padding: 48px 64px
 *   grid:   1fr 400px, gap: 24px
 *
 * Form inputs are tightly sized (44px / 14px) and the SEND button is
 * capped at 44px. The right column shows full email/github/linkedin
 * values (no truncation) in compact contact cards.
 */
function Contact() {
  useEffect(() => {
    const inputs = document.querySelectorAll('input, textarea')
    const handlers = []
    inputs.forEach((input) => {
      const label = input.parentElement?.querySelector('label')
      if (!label) return
      const onFocus = () => {
        label.classList.remove('text-on-surface-variant')
        label.classList.add('text-primary')
      }
      const onBlur = () => {
        label.classList.remove('text-primary')
        label.classList.add('text-on-surface-variant')
      }
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', onBlur)
      handlers.push([input, onFocus, onBlur])
    })
    return () => handlers.forEach(([el, f, b]) => {
      el.removeEventListener('focus', f)
      el.removeEventListener('blur', b)
    })
  }, [])

  return (
    <Layout activePath="/contact">
      <section>
        <Container className="py-[48px]">
          {/* ---------- Page Header ---------- */}
          <div className="mb-5 md:mb-10 text-center animate-fade-up">
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4 uppercase tracking-tight">
              Get In Touch
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-80">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions. Let's build something
              scalable and intelligent together.
            </p>
          </div>

          {/* ---------- Two-Column Grid (form + 400px sidebar) ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3 md:gap-6">
            {/* Left column: form */}
            <div className="animate-fade-up delay-100 min-w-0">
              <div className="obsidian-card rounded-xl p-4 md:p-8">
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Message sent successfully!')
                  }}
                >
                  {/* NAME + EMAIL row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-label-code text-[12px] font-medium tracking-[0.08em] text-on-surface-variant uppercase mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full box-border bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2.5 text-[14px] font-label-code text-on-surface placeholder:text-outline placeholder:opacity-60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        style={{ height: '44px' }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-label-code text-[12px] font-medium tracking-[0.08em] text-on-surface-variant uppercase mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="email@example.com"
                        className="w-full box-border bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2.5 text-[14px] font-label-code text-on-surface placeholder:text-outline placeholder:opacity-60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        style={{ height: '44px' }}
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-label-code text-[12px] font-medium tracking-[0.08em] text-on-surface-variant uppercase mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Project Inquiry"
                      className="w-full box-border bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2.5 text-[14px] font-label-code text-on-surface placeholder:text-outline placeholder:opacity-60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      style={{ height: '44px' }}
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-label-code text-[12px] font-medium tracking-[0.08em] text-on-surface-variant uppercase mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell me about your project..."
                      className="w-full box-border bg-surface-container border border-outline-variant rounded-lg px-3.5 py-2.5 text-[14px] font-label-code text-on-surface placeholder:text-outline placeholder:opacity-60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-y"
                      style={{ minHeight: '120px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-label-code font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] shadow-xl shadow-primary/10"
                    style={{ height: '44px' }}
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>

            {/* Right column: info + availability (400px) */}
            <div className="flex flex-col gap-3 animate-fade-up delay-200 min-w-0">
              {/* Connect With Me */}
              <div className="obsidian-card rounded-xl p-4">
                <h3 className="font-headline-lg text-base text-on-surface mb-4 border-l-4 border-primary pl-3 uppercase tracking-tighter">
                  Connect With Me
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    className="flex items-center gap-3 group"
                    href="mailto:zwehtetpaing.works@gmail.com"
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <span className="material-symbols-outlined text-base">mail</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest mb-0.5">
                        Email
                      </p>
                      <p className="text-on-surface font-label-code text-[13px] group-hover:text-primary transition-colors break-words">
                        zwehtetpaing.works@gmail.com
                      </p>
                    </div>
                  </a>

                  <a className="flex items-center gap-3 group" href="https://www.linkedin.com/in/zwe-htet-paing/" target="_blank" rel="noreferrer">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <span className="material-symbols-outlined text-base">person</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest mb-0.5">
                        LinkedIn
                      </p>
                      <p className="text-on-surface font-label-code text-[13px] group-hover:text-primary transition-colors break-words">
                        linkedin.com/in/zwe-htet-paing
                      </p>
                    </div>
                  </a>

                  <a className="flex items-center gap-3 group" href="https://github.com/zwe-htet-paing" target="_blank" rel="noreferrer">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <span className="material-symbols-outlined text-base">code</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest mb-0.5">
                        GitHub
                      </p>
                      <p className="text-on-surface font-label-code text-[13px] group-hover:text-primary transition-colors break-words">
                        github.com/zwe-htet-paing
                      </p>
                    </div>
                  </a>

                  <a className="flex items-center gap-3 group" href="https://www.kaggle.com/zwehtetpaing123" target="_blank" rel="noreferrer">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <span className="material-symbols-outlined text-base">dataset</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest mb-0.5">
                        Kaggle
                      </p>
                      <p className="text-on-surface font-label-code text-[13px] group-hover:text-primary transition-colors break-words">
                        kaggle.com/zwehtetpaing123
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 group">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-base">location_on</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-label-caps text-on-surface-variant uppercase text-[11px] tracking-widest mb-0.5">
                        Location
                      </p>
                      <p className="text-on-surface font-label-code text-[13px]">
                        Bangkok, Thailand
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability — quote + status pill */}
              <div className="obsidian-card rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/60 to-transparent" />
                <div className="mb-6">
                  <p className="font-body-md text-on-surface leading-relaxed opacity-90 italic text-sm">
                    "I specialize in building scalable products and modern
                    software engineering solutions. Whether it's a complex web
                    application or a streamlined tool, I'm here to help you ship
                    faster and better."
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant/30">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-3 uppercase tracking-widest text-[11px]">
                    Current Status
                  </p>
                  <div className="flex items-center gap-3 bg-surface-container p-3 rounded-lg border border-outline-variant">
                    <div className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                    </div>
                    <span className="font-label-code text-on-surface text-xs font-bold tracking-wider">
                      OPEN TO NEW PROJECTS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export default Contact
