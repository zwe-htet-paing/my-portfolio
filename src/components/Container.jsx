/**
 * Container — the single source of truth for horizontal layout width.
 *
 * Every section on every page wraps its INNER content in <Container>; the
 * outer section still spans the full viewport width so backgrounds,
 * borders, and shadows can paint edge-to-edge. The Container then
 * constrains the inner content to:
 *
 *   max-width: 1400px
 *   margin: 0 auto
 *   padding: 0 24px  (< md, mobile gutter)
 *   padding: 0 40px  (md — 1024px, tablet gutter)
 *   padding: 0 64px  (≥ lg, desktop gutter)
 *
 * The 64px desktop gutter and 1400px max-width are the global values
 * applied to every page's inner wrapper, so all sections share a single
 * consistent content column.
 *
 * Use the `as` prop to render a different element when the section's
 * inner wrapper needs to be a <nav>, <footer>, <form>, etc.
 *
 *   <Container as="nav" className="flex justify-between items-center h-14">
 *     ...
 *   </Container>
 */
function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Container
