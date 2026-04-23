import { Link } from 'react-router-dom'

export function MarketingFooter() {
  return (
    <footer className="border-t-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-16 text-[color:#f0f0e8]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:#888]">
              Product
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <Link to="/studio/preview" className="transition-colors hover:text-var(--accent)">
                  Open preview
                </Link>
              </li>
              <li>
                <Link to="/studio/editor" className="transition-colors hover:text-var(--accent)">
                  Open editor
                </Link>
              </li>
              <li>
                <Link to="/" className="transition-colors hover:text-var(--accent)">
                  Landing page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:#888]">
              Explore
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a href="#workflow" className="transition-colors hover:text-var(--accent)">
                  Workflow
                </a>
              </li>
              <li>
                <a href="#compare" className="transition-colors hover:text-var(--accent)">
                  Compare
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-var(--accent)">
                  Back to top
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:#888]">
              PDFx
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a
                  href="https://pdfx.akashpise.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:#7cb87c]"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://pdfx.akashpise.dev/blocks/invoices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:#7cb87c]"
                >
                  Invoice blocks
                </a>
              </li>
              <li>
                <a
                  href="https://pdfx.akashpise.dev/blocks/reports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:#7cb87c]"
                >
                  Report blocks
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[color:#888]">
              Build
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a
                  href="https://www.npmjs.com/package/pdfx-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:#7cb87c]"
                >
                  pdfx-cli
                </a>
              </li>
              <li>
                <a
                  href="https://pdfx.akashpise.dev/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:#7cb87c]"
                >
                  Installation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#333] pt-8 md:flex-row">
          <span className="text-3xl font-black tracking-tighter">PDFx.</span>
          <span className="text-sm text-[color:#888]">
            Live preview and structured editing for PDF workflows.
          </span>
        </div>
      </div>
    </footer>
  )
}
