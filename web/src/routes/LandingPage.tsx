import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingFooter } from '@/components/MarketingFooter'

const lightModeVars = {
  '--background': '#f0f0e8',
  '--background-alt': '#1a1a1a',
  '--surface': '#ffffff',
  '--surface-alt': '#e8e8e0',
  '--surface-strong': '#1a1a1a',
  '--surface-muted': '#d8d8d0',
  '--foreground': '#1a1a1a',
  '--foreground-muted': '#888888',
  '--foreground-subtle': '#aaaaaa',
  '--foreground-inverse': '#f0f0e8',
  '--border': '#1a1a1a',
  '--border-subtle': '#cccccc',
  '--accent': '#2d5a2d',
  '--accent-hover': '#3a6a3a',
  '--accent-light': '#7cb87c',
  '--shadow-color': '#1a1a1a',
  '--shadow-accent': 'rgba(45,90,45,1)',
} as const satisfies Record<`--${string}`, string>

const valueProps = [
  {
    id: '01',
    title: 'LIVE PREVIEW',
    desc: 'See the PDF update while editing the same project data.',
  },
  {
    id: '02',
    title: 'PDFX OUTPUT',
    desc: 'Export the structure that drives the generated document.',
  },
  {
    id: '03',
    title: 'TEMPLATE FIRST',
    desc: 'Start from classic, modern, or minimal invoice layouts.',
  },
  {
    id: '04',
    title: 'EDITOR FLOW',
    desc: 'Adjust blocks like clips in a simple timeline-style workspace.',
  },
] as const

const steps = [
  {
    step: '1',
    action: 'CHOOSE',
    desc: 'Pick a template and open the preview.',
  },
  {
    step: '2',
    action: 'CUSTOMIZE',
    desc: 'Edit content, reorder blocks, and switch the visual tone.',
  },
  {
    step: '3',
    action: 'EXPORT',
    desc: 'Download the project structure and keep the PDF reproducible.',
  },
] as const

const comparison = {
  oldWay: [
    'Manual PDF changes',
    'Hard to reuse structure',
    'Preview and data are disconnected',
    'No clean export format',
  ],
  pdfx: [
    'Live rendered preview',
    'Structured project model',
    'Preview and editor stay in sync',
    'Exportable PDFx-style JSON',
  ],
}

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="top"
      className="min-h-screen font-mono selection:bg-[#2d5a2d] selection:text-[color:#f0f0e8]"
      style={{ ...(lightModeVars as React.CSSProperties), backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <nav
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-200 ${
          scrolled
            ? 'border-b-2 border-[#1a1a1a] bg-[#f0f0e8] text-[color:#1a1a1a]'
            : 'bg-transparent text-[color:#f0f0e8] drop-shadow-md'
        }`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xl font-black tracking-tighter transition-opacity duration-200 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            PDFx.
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
          <a href="#workflow" className="hover:underline underline-offset-4">
            Workflow
          </a>
          <a href="#compare" className="hidden hover:underline underline-offset-4 sm:block">
            Compare
          </a>
          <Link to="/studio/editor" className="hover:underline underline-offset-4">
            Editor
          </Link>
          <Link
            to="/studio/preview"
            className={`border-2 px-4 py-2 transition-colors ${
              scrolled
                ? 'border-[#1a1a1a] !bg-[#f0f0e8] !text-[color:#1a1a1a] !hover:bg-[#1a1a1a] !hover:text-[color:#f0f0e8]'
                : 'border-[#f0f0e8] !text-[color:#f0f0e8] !hover:bg-[#f0f0e8] !hover:text-[color:#1a1a1a]'
            }`}
          >
            Start
          </Link>
        </div>
      </nav>

      <section
        className="relative flex min-h-[85vh] flex-col justify-end overflow-x-clip border-b-2 border-[#1a1a1a] bg-cover bg-center bg-no-repeat px-6 pb-32 pt-32 text-[color:#f0f0e8] md:pb-24"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(124,184,124,0.22), transparent 22%), linear-gradient(135deg, rgba(26,26,26,0.82), rgba(45,90,45,0.46)), linear-gradient(135deg, #2a4732 0%, #1d2a20 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <h1
            className="ml-[-0.5vw] text-[25vw] font-black leading-[0.75] tracking-tighter sm:text-[22vw]"
            style={{
              textShadow: '8px 8px 0 #1a1a1a, 0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            PDFx
          </h1>

          <div className="mt-20 flex flex-col gap-12 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-full flex-col items-start gap-4 md:gap-6">
              <div className="max-w-full origin-bottom-left -rotate-2 border-2 border-[#1a1a1a] bg-[#f0f0e8] px-5 py-3 text-[color:#1a1a1a] shadow-[6px_6px_0px_0px_var(--shadow-color)] md:px-8 md:py-4 md:shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                <p className="text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl md:leading-none">
                  Live PDF preview for invoice workflows.
                </p>
              </div>
              <div className="bg-[#2d5a2d] text-[color:#f0f0e8] px-5 py-3 md:px-8 md:py-4 border-2 border-[#1a1a1a] shadow-[6px_6px_0px_0px_var(--shadow-color)] md:shadow-[8px_8px_0px_0px_var(--shadow-color)] rotate-1 origin-top-left ml-2 md:ml-8 max-w-full">
                <p className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight md:leading-none">
                  Customize blocks. Export structure.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row lg:mt-0 lg:justify-end">
              <Link
                to="/studio/preview"
                className="flex items-center justify-center self-start border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-4 text-lg font-black text-[color:#f0f0e8] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5a2d] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] md:px-8 md:py-5 md:text-xl md:hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] sm:self-auto"
                style={{ boxShadow: '8px 8px 0 0 var(--shadow-color)' }}
              >
                OPEN PREVIEW →
              </Link>
              <Link
                to="/studio/editor"
                className="flex items-center justify-center self-start border-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-4 text-lg font-black text-[color:#f0f0e8] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5a2d] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] md:px-8 md:py-5 md:text-xl md:hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] sm:self-auto"
                style={{ boxShadow: '8px 8px 0 0 var(--shadow-color)' }}              
              >
                OPEN EDITOR →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#1a1a1a] bg-[#f0f0e8]">
        <div className="grid grid-cols-1 divide-y-2 divide-[#1a1a1a] md:grid-cols-2 md:divide-x-2 md:divide-y-0 xl:grid-cols-4">
          {valueProps.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col p-8 transition-colors hover:bg-[#1a1a1a] hover:text-[color:#f0f0e8] lg:p-12"
            >
              <div className="mb-8 text-sm font-black text-[color:#888]">
                /{item.id}
              </div>
              <h3 className="mb-4 text-3xl font-black uppercase leading-none tracking-tighter lg:text-4xl">
                {item.title}
              </h3>
              <p className="mt-auto text-lg font-medium opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="border-b-2 border-[#1a1a1a] bg-[#e8e8e0] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2
            className="landing-section-title mb-16 text-center font-black uppercase tracking-tighter"
          >
            HOW IT WORKS.
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col border-2 border-[#1a1a1a] bg-[#f0f0e8] shadow-[12px_12px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
              >
                <div className="flex items-end justify-between border-b-2 border-[#1a1a1a] bg-[#1a1a1a] p-6 text-[color:#f0f0e8]">
                  <span className="text-7xl font-black leading-none">{item.step}</span>
                  <span className="mb-1 text-xl font-bold tracking-widest text-[color:#888]">STEP</span>
                </div>
                <div className="flex flex-grow flex-col p-8">
                  <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-[color:#2d5a2d] md:text-4xl">
                    {item.action}
                  </h3>
                  <p className="text-lg font-medium text-[color:#1a1a1a]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="border-b-2 border-[#1a1a1a] bg-[#f0f0e8] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="lg:w-1/3">
              <h2
                className="landing-section-title mb-6 font-black uppercase tracking-tighter"
              >
                THE
                <br />
                DIFFERENCE.
              </h2>
              <p className="max-w-sm text-xl font-medium text-[color:#888]">
                One side is scattered PDF work. The other keeps preview, editing, and structure in one flow.
              </p>
            </div>

            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 border-2 border-[#1a1a1a] shadow-[12px_12px_0px_0px_var(--shadow-color)] md:grid-cols-2">
                <div className="border-b-2 border-[#1a1a1a] bg-[#ffffff] p-8 md:border-b-0 md:border-r-2 md:p-12">
                  <div className="mb-2 text-sm font-bold tracking-widest text-[color:#888]">OLD WAY</div>
                  <div className="mb-8 text-5xl font-black tracking-tighter">Manual PDF</div>

                  <ul className="space-y-4 text-lg font-medium text-[color:#1a1a1a]">
                    {comparison.oldWay.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="font-black text-[color:#dc2626]">×</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-8 text-[color:#f0f0e8] md:p-12">
                  <div className="mb-2 text-sm font-bold tracking-widest text-[color:#7cb87c]">PDFX STUDIO</div>
                  <div className="mb-8 text-5xl font-black tracking-tighter text-[color:#7cb87c]">Structured</div>

                  <ul className="space-y-4 text-lg font-medium">
                    {comparison.pdfx.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="font-black text-[color:#7cb87c]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#1a1a1a] bg-[#2d5a2d] px-6 py-32 text-[color:#f0f0e8]">
        <div className="mx-auto max-w-5xl text-center">
          <blockquote className="mb-8 text-4xl font-black uppercase leading-tight tracking-tighter md:text-6xl">
            &quot;Build the PDF visually, keep the structure clean, and stop treating document work like a black box.&quot;
          </blockquote>
          <span className="inline-block border-2 border-[#f0f0e8] px-6 py-3 font-bold uppercase tracking-wider">
            PDFX STUDIO
          </span>
        </div>
      </section>

      <section className="bg-[#f0f0e8] px-6 py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2
            className="landing-section-title mb-8 font-black uppercase tracking-tighter"
          >
            START
            <br />
            NOW.
          </h2>
          <p className="mb-12 text-2xl font-medium text-[color:#888]">
            Open the preview or go straight into the editor.
          </p>
          <div className="flex flex-col gap-6 sm:flex-row">
            <Link
              to="/studio/preview"
              className="bg-[#1a1a1a] !text-[color:#f0f0e8] px-12 py-6 border-2 border-[#1a1a1a] text-2xl font-black uppercase tracking-wider hover:border-[#2d5a2d] transition-colors shadow-[12px_12px_0px_0px_var(--shadow-accent)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[8px_8px_0px_0px_var(--shadow-accent)]"
            >
              OPEN PREVIEW
            </Link>
            <Link
              to="/studio/editor"
              className="bg-[#1a1a1a] !text-[color:#f0f0e8] px-12 py-6 border-2 border-[#1a1a1a] text-2xl font-black uppercase tracking-wider hover:border-[#2d5a2d] transition-colors shadow-[12px_12px_0px_0px_var(--shadow-accent)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[8px_8px_0px_0px_var(--shadow-accent)]"
            >
              OPEN EDITOR
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
