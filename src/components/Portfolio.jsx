import Layout from './Layout.jsx'
import Container from './Container.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'

/**
 * Cinematic AI Engineer Portfolio — direct port of
 * Google Stitch screen `projects/7443188833512928909/screens/264d7521…`.
 *
 * Structure:
 *  - Hero: 12-col grid, 7/5 split (text + portrait), 24px gap, items-start
 *  - Tech Stack: 1/2/3-col grid of 6 themed groups
 *  - Experience: vertical timeline, 5 entries, line centered on md+,
 *    alternating via `md:order-1/2` on a 2-col grid
 *  - Education: single glass card with decorative school icon
 *
 * Every section is structured as:
 *   <section className="...vertical padding...">
 *     <Container>     <-- 1200px max-width, 20/24 gutter
 *       ...content...
 *     </Container>
 *   </section>
 * so backgrounds/borders paint edge-to-edge while the inner content
 * never stretches past 1200px.
 */
function Portfolio() {
  useScrollReveal('.reveal')

  return (
    <Layout activePath="/">
      {/* ---------- Hero ---------- */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-[1fr_480px] gap-12 md:gap-20 items-start py-[60px]">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2.5 terminal-badge px-3.5 py-1.5 mb-6 rounded-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
              </span>
              <span className="font-label-code text-xs text-primary/80">
                $ whoami --location "Bangkok, Thailand"
              </span>
            </div>

            <p
              className="uppercase mb-2 text-on-surface-variant"
              style={{
                fontSize: '13px',
                letterSpacing: '0.15em',
              }}
            >
              Hi, I'm
            </p>
            <h1 className="font-headline-xl text-[64px] md:text-[88px] leading-[0.9] font-extrabold tracking-tighter text-white uppercase mb-3">
              <span className="text-gradient-primary">Zwe Htet</span>
              <br />
              <span className="text-gradient-primary">Paing</span>
            </h1>

            <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-semibold tracking-tight uppercase mb-4">
              AI / ML Engineer
            </h2>

            <div className="max-w-lg">
              <p className="font-body-md text-lg md:text-xl text-on-surface leading-relaxed mb-3">
                Focused on machine learning, NLP, and generative AI systems.
                Building end-to-end pipelines for RAG and automated trading.
              </p>
              <p className="font-body-md text-on-surface-variant leading-loose">
                With 5 years of hands-on experience across social media,
                e-commerce, and crypto-fintech domains, I specialize in
                developing end-to-end ML deployment solutions. I bridge
                research and production.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end min-w-0 md:mt-10">
            <div className="relative w-full h-[420px] overflow-hidden rounded-lg border border-white/10 bg-surface-container shadow-2xl ring-1 ring-primary/5">
              <img
                alt="Cinematic portrait of AI Engineer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0-02eXLGL_8ACe8vetU-oxehdH3oEsunWDOYlDdBcn4Ly44qWO0z4mPVjRhkFsT0sZ8Mk_nSEkMbb27_yw1ppSZqb2h6UoD9M9QSDpkJJwHlT6meszoobUiLfn_dqDK2MtFP0kCX58G31vwGdQA3cLXfnDQDcHIWRrSo8wGgf90wMzvLIno8dnLFvV7FE7MpWte6RTDVOKuaRBccBLd_-NyPsBHyQ1qgGChDwY5OxJzt0A5q3E853pbMvwgnxtaHpNeQgEhdlJNg"
                width="480"
                height="420"
                loading="eager"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-in-out opacity-90 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent pointer-events-none" />
              {/* Subtle inner border highlight on top of the image. */}
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Tech Stack ---------- */}
      <section>
        <Container className="py-[60px]">
          <div className="section-divider mb-12">
            <h2 className="font-headline-lg text-2xl uppercase tracking-widest text-on-surface font-bold">
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'terminal', title: 'Languages & Databases', items: ['Python', 'JavaScript', 'Rust', 'MySQL', 'PostgreSQL', 'MongoDB', 'Supabase'] },
              { icon: 'psychology', title: 'ML & AI Frameworks', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'MLflow'] },
              { icon: 'temp_preferences_custom', title: 'Generative AI', items: ['Agents', 'LangChain', 'LangGraph', 'RAG', 'Vector Stores', 'OpenAI', 'Anthropic', 'Gemini'] },
              { icon: 'automation', title: 'Data & Automation', items: ['Apache Airflow', 'Prefect', 'n8n', 'FastAPI'] },
              { icon: 'cloud', title: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'Terraform'] },
              { icon: 'visibility', title: 'NLP & Computer Vision', items: ['NER', 'Sentiment Analysis', 'Speech Recognition', 'Object Detection', 'Recommendation'] },
            ].map((group) => (
              <div
                key={group.title}
                className="reveal card-glow bg-surface-container-low p-6 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {group.icon}
                  </span>
                  <h3 className="font-label-caps text-xs text-on-surface tracking-wider">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="tag-chip font-label-code text-[11px] border border-outline-variant/30 text-on-surface-variant px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Experience ---------- */}
      <section>
        <Container className="py-[60px]">
          <div className="section-divider mb-20">
            <h2 className="font-headline-lg text-2xl uppercase tracking-widest text-on-surface font-bold">
              Experience
            </h2>
          </div>

          {/*
            2-column symmetric grid on desktop, 24px gap. The 1px timeline
            stroke at 50% sits flush between the two columns on every entry.
            Alternation is achieved via md:order-1/2 on the period + card
            pair: left-aligned entries keep the natural order; right-aligned
            entries flip the order so the period is on the left visually and
            the card sits on the right.
          */}
          <div className="relative">
            <div className="timeline-line timeline-line-md" />

            {[
              {
                period: 'Dec 2025 — Present',
                role: 'Software Engineer',
                company: 'iSocialize | Japan (Remote)',
                description:
                  'Engineered n8n automation workflows for AI-powered content generation. Implemented an MCP server enabling seamless integration between social marketplace and ChatGPT.',
                align: 'left',
              },
              {
                period: 'Jul 2024 — Sep 2024',
                role: 'AI Software Developer',
                company: 'B4Purpose | France (Remote)',
                description:
                  'Built an ESG report generation pipeline using prompt engineering and LLMs, automating a previously manual reporting process and improving system throughput.',
                align: 'right',
              },
              {
                period: 'Dec 2022 — Apr 2024',
                role: 'AI/ML Engineer',
                company: 'PROMES Myanmar | Yangon, Myanmar',
                description:
                  'Automated collection and processing of community and social media data. Prototyped a Burmese NLP pipeline covering NER, sentiment analysis, and speech recognition.',
                align: 'left',
              },
              {
                period: 'Dec 2021 — Nov 2022',
                role: 'Data Scientist',
                company: 'BIT | Yangon',
                description:
                  'Developed NLP models for sentiment analysis and topic modeling. Improved Burmese speech-to-text accuracy through language model adaptation.',
                align: 'right',
              },
              {
                period: 'Nov 2020 — Jun 2021',
                role: 'AI/ML Engineer (Junior)',
                company: 'METRO Computer Myanmar | Yangon',
                description:
                  'Co-developed computer vision models for human activity recognition using deep learning. Managed large-scale data collection.',
                align: 'left',
              },
            ].map((entry) => {
              const isLeft = entry.align === 'left'
              // Right-aligned entries swap the visual order of period and
              // card so the period sits on the left of the line and the
              // card sits on the right.
              const orderPeriod = isLeft ? 'md:order-1' : 'md:order-2'
              const orderCard = isLeft ? 'md:order-2' : 'md:order-1'
              return (
                <div
                  key={entry.role}
                  className="relative mb-16 last:mb-0"
                >
                  {/* Node — exactly on the line at 50% on md+ */}
                  <div className="reveal timeline-node timeline-node-md top-4" />

                  <div className="md:grid md:grid-cols-2 gap-4 items-start">
                    {/* Period label — desktop only.
                        Left-aligned entries (date on the left of the line):
                        right-align the text and pad the right edge 16px so
                        the date sits flush to the line.
                        Right-aligned entries (date on the right of the line):
                        left-align the text and pad the left edge 16px. */}
                    <div
                      className={`hidden md:block ${orderPeriod} pt-4 ${
                        isLeft ? 'text-right pr-4' : 'text-left pl-4'
                      }`}
                    >
                      <span className="font-label-code text-primary text-sm">
                        {entry.period}
                      </span>
                    </div>

                    {/* Card.
                        Mobile: 48px left padding to clear the vertical
                        timeline. Desktop: 16px to sit close to the line. */}
                    <div className={`pl-12 md:pl-4 ${orderCard}`}>
                      <div
                        className={`reveal glass-card card-glow p-6 rounded-lg border border-white/5 ${
                          isLeft ? '' : 'md:text-right'
                        }`}
                      >
                        <div className={`md:hidden mb-2 ${isLeft ? '' : 'text-left'}`}>
                          <span className="font-label-code text-primary text-xs">
                            {entry.period}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-on-surface mb-1">
                          {entry.role}
                        </h4>
                        <p className="font-label-code text-xs text-primary mb-4">
                          {entry.company}
                        </p>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ---------- Education ---------- */}
      <section>
        <Container className="py-[60px]">
          <div className="section-divider mb-12">
            <h2 className="font-headline-lg text-2xl uppercase tracking-widest text-on-surface font-bold">
              Education
            </h2>
          </div>

          <div>
            <div className="reveal glass-card card-glow p-8 md:p-10 rounded-lg border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <span
                  className="material-symbols-outlined text-[160px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">
                      Graduated
                    </span>
                    <span className="font-label-code text-xs text-on-surface-variant">
                      2013 — 2019
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2">
                    Bachelor of Science
                  </h3>
                  <p className="text-lg text-primary mb-1">
                    Information Science and Technology
                  </p>
                  <p className="text-on-surface-variant text-sm italic">
                    University of Technology (Yatanarpon Cyber City), Myanmar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export default Portfolio
