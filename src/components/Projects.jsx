import { useState } from 'react'
import Layout from './Layout.jsx'
import Container from './Container.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

/**
 * Projects grid — direct port of
 * Google Stitch screen `projects/7443188833512928909/screens/d028d412…`.
 *
 * Six project cards with Stitch's exact copy, tags, and image URLs.
 * Outer <section> spans the full viewport; the inner <Container>
 * constrains the content to 1200px max-width with the constant 24px
 * horizontal gutter.
 *
 * Cards are equal-height on a single row via `items-stretch`; the inner
 * flex column pushes the action buttons to the bottom regardless of body
 * length.
 */
const PROJECTS = [
  {
    title: 'Cook Assistant with RAG',
    tags: ['LLMs', 'Vector Stores', 'RAG'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrOSeknThNg7_wBCRjdDeWtm-upqe2486HHntOURiZXgN0t92xFSCzb9ui_vGO8nDChBCpuoTda7pKC9Pwete-tzDI44Oa516Ef0kPIaDjqt9eMZwyy_3c79G2uV20MYfdWdGxjgF9M-x-vupjLPyo6QdH1RlywUv4nURHZOqpdfelC8ydL2LKTny80XJwM4y7LllcRcAazOVPBFghao8JvoP1VY5ALQb6mK9WMWO6nqroEyk2mUwAUj_hrruyBzpzkWNl-QxAFcw',
    description:
      'Implemented a Retrieval-Augmented Generation (RAG) system for a culinary assistant, utilizing large language models and vector databases for precise recipe retrieval and cooking guidance.',
    primary: { label: 'Demo', icon: 'open_in_new' },
    code: 'https://github.com/zwe-htet-paing/cook-assistant',
  },
  {
    title: 'ESG Report Pipeline',
    tags: ['Prompt Engineering', 'SQL', 'Python'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5rHm-I-lRW1UCbxrUYqOfNm-XPWIUnMvb-nIn1AdC0rZ94TBXpJiz0It-yhZ94HT156B411gViDxSUCEOUaMzYHztv4M_Ygq31y-z-mNwqNwivz7FiekFOrQ1ToW4-UQoM_YcGpkqanIhIWo0jw-un9nxgusckorraAAHT25Lf0wiOFxGGAxNI5lWRGYD4VtpAwO23BbQg2kYDwL5z84pfTxFj9Sc-3NActfJMJKPD35LAi11hyC186t3-P3VSnwrGpPRgcYR_j8',
    description:
      'Developed an automated ESG report generation pipeline using advanced prompt engineering and SQL data extraction to streamline corporate sustainability reporting workflows.',
    primary: { label: 'Docs', icon: 'description' },
  },
  {
    title: 'Algo Trading Platform',
    tags: ['Python', 'FastAPI', 'Docker'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwOCxByd6vOfT36nS_ZqocpxevKJ_emRxdl27CpDuOTaUbTq08zYRgMB4Mq9NLt1QuGyyRZgbqwOL41A7h7EkzyACeXT29pOFq2W8UbL_yTYerCXClQUNwqs-K8jASMWkbSsFJhrEMQhHTz99RIfAPxZJe8rHd79zYjG_H7qDHuCKozZY2n8UzoK6b_wFhsRmDhkf0eb4VzlLHGWSr_NDW3J82eNFqUOlc4_cbcYIkxLMwpHCuLW7OzpvGSUD_lcXGH1_E-1BSeY',
    description:
      'A high-performance algorithmic trading system built with FastAPI and containerized with Docker, featuring real-time strategy execution and backtesting capabilities.',
    primary: { label: 'Demo', icon: 'open_in_new' },
  },
  {
    title: 'Burmese NLP Pipeline',
    tags: ['NLP', 'PyTorch', 'Deep Learning'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkLjPOc-qBbLwYP3RRKTifVNBp7-6JEtbwC7F4L_W4V9ufPTHGl1qXjXzjqDEzl8M9MXC_WR1dtUme1VYwn5Y40OD2Xa-bhHaSOH2Z6PoosdSq2-xbrXm-gtBfLdooDohQHx7oyUEGp_XUfFOiYrMEGh1yc-zL9CrOkfL0tJAuvJnkMSbEXiy9V7wnL077g3ZSOoQSGHYFxqf0J2I-gpcrB9Y3W5lfBsvSms8nRWNXeiMNtZXg4VvEMkXOqJpbUkM5j8Wwn4EzAR8',
    description:
      'Designed and trained a comprehensive NLP pipeline for the Burmese language using PyTorch, addressing low-resource language challenges in tokenization and sentiment analysis.',
    primary: { label: 'Demo', icon: 'open_in_new' },
  },
  {
    title: 'Airbnb Price Prediction',
    tags: ['MLOps', 'Scikit-Learn'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA39RWSa3cdjj2ed-L-O45KX4nTm3BZ5IuAgg1BAB9wMseQliGhBr_7gEBmf77fMMQQyWn7ZiLq5we26PoIi_Pq9iDH2geiTYt-sN5Xgq7Mhdsqe_tjEJM-yLk5qAL6tYwxC9cOAA1tcaSK0vNjnJrx0g9Gw-SCYURewyqoszsuuJHJYMRQo7ztTbjdfgoPXG5sAGeKB5N9uTUTcwZwUao9u9Qb-niSs2H-LYTVVMMDCutui3FvtFc1o0C4Z-rTU23z6vh4n9sUXKE',
    description:
      'Built an end-to-end machine learning model to predict Airbnb rental prices, incorporating MLOps principles for model tracking, deployment, and performance monitoring.',
    primary: { label: 'Paper', icon: 'article' },
    code: 'https://github.com/zwe-htet-paing/airbnb-price-prediciton',
  },
  {
    title: 'House Price Prediction',
    tags: ['Regression', 'Data Science'],
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwOCxByd6vOfT36nS_ZqocpxevKJ_emRxdl27CpDuOTaUbTq08zYRgMB4Mq9NLt1QuGyyRZgbqwOL41A7h7EkzyACeXT29pOFq2W8UbL_yTYerCXClQUNwqs-K8jASMWkbSsFJhrEMQhHTz99RIfAPxZJe8rHd79zYjG_H7qDHuCKozZY2n8UzoK6b_wFhsRmDhkf0eb4VzlLHGWSr_NDW3J82eNFqUOlc4_cbcYIkxLMwpHCuLW7OzpvGSUD_lcXGH1_E-1BSeY',
    description:
      'A regression-based predictive model analyzed real estate market data to forecast property values with high accuracy using advanced feature engineering techniques.',
    primary: { label: 'Demo', icon: 'open_in_new' },
    code: 'https://github.com/zwe-htet-paing/house-price-prediction',
  },
]

function ProjectCard({ project }) {
  return (
    <article className="reveal card-glow flex flex-col h-full rounded-xl overflow-hidden group">
      <div className="w-full h-[200px] overflow-hidden border-b border-outline-variant/20 relative">
        <img
          alt={project.title}
          src={project.cover}
          width="640"
          height="200"
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
        />
        {/* Subtle indigo wash on hover. */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-headline-lg text-xl mb-2 text-on-surface group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-on-surface-variant text-body-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-nowrap gap-1.5 mb-4 overflow-x-auto scrollbar-none">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-chip font-label-code text-[10px] border border-outline-variant/30 text-on-surface-variant px-2 py-1 rounded uppercase tracking-wider shrink-0 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-outline-variant/20">
          <a
            href={project.primary.href || '#'}
            target={project.primary.href ? '_blank' : undefined}
            rel={project.primary.href ? 'noreferrer' : undefined}
            className="flex-1 bg-primary text-on-primary text-center font-label-code text-[11px] font-bold py-1.5 rounded-full hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-1"
          >
            {project.primary.label}
            <span className="material-symbols-outlined text-[13px] leading-none">
              {project.primary.icon}
            </span>
          </a>
          <a
            href={project.code || '#'}
            target={project.code ? '_blank' : undefined}
            rel={project.code ? 'noreferrer' : undefined}
            className="flex-1 border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container hover:border-outline text-center font-label-code text-[11px] py-1.5 rounded-full transition-all flex items-center justify-center gap-1"
          >
            Code
            <span className="material-symbols-outlined text-[13px] leading-none">code</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function Projects() {
  useScrollReveal('.reveal')

  // ---- Pagination ----
  // 6 projects per page (2 rows of the 3-col grid). Future projects added
  // to PROJECTS will automatically land on the next page.
  const PER_PAGE = 6
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const visible = PROJECTS.slice(start, start + PER_PAGE)

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages)
    setPage(next)
    // Scroll the grid back into view on page change for context.
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Layout activePath="/projects">
      <section>
        <Container className="py-[60px]">
          {/* ---------- Section Header ---------- */}
          <div className="mb-16 md:mb-20 text-center max-w-[600px] mx-auto">
            <p className="eyebrow mb-4">Selected work</p>
            <h1 className="font-headline-xl text-headline-xl mb-5 tracking-tight">
              All Projects
            </h1>
            <p className="text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed">
              A showcase of my projects, from traditional Machine Learning
              models to modern Generative AI-powered solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <nav
            aria-label="Project pages"
            className="mt-12 flex items-center justify-center gap-2"
          >
              <button
                type="button"
                onClick={() => goTo(safePage - 1)}
                disabled={safePage === 1}
                aria-label="Previous page"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-code text-xs font-bold hover:text-on-surface hover:bg-surface-container hover:border-outline disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-outline-variant/30 disabled:hover:text-on-surface-variant transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">
                  chevron_left
                </span>
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = p === safePage
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goTo(p)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Page ${p}`}
                    className={
                      isActive
                        ? 'min-w-[36px] h-9 px-3 rounded-full bg-primary text-on-primary font-label-code text-xs font-bold'
                        : 'min-w-[36px] h-9 px-3 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-code text-xs hover:text-on-surface hover:bg-surface-container hover:border-outline transition-all'
                    }
                  >
                    {p}
                  </button>
                )
              })}

              <button
                type="button"
                onClick={() => goTo(safePage + 1)}
                disabled={safePage === totalPages}
                aria-label="Next page"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-code text-xs font-bold hover:text-on-surface hover:bg-surface-container hover:border-outline disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-outline-variant/30 disabled:hover:text-on-surface-variant transition-all"
              >
                Next
                <span className="material-symbols-outlined text-[15px]">
                  chevron_right
                </span>
              </button>
            </nav>
        </Container>
      </section>
    </Layout>
  )
}

export default Projects
