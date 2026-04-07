function App() {
  return (
    <main className="min-h-screen bg-[oklch(0.96_0.01_95)] px-6 py-12 text-[oklch(0.18_0.02_95)]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col justify-between border-2 border-[oklch(0.18_0.02_95)] bg-white p-8 shadow-[12px_12px_0_0_oklch(0.18_0.02_95)] sm:p-12">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]">
            <span className="border-2 border-current px-3 py-1">Phase 1</span>
            <span>Bun + Vite initialized</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
            <section className="space-y-6">
              <p className="max-w-xl text-sm uppercase tracking-[0.28em] text-[oklch(0.43_0.03_95)]">
                PDFx Studio foundation
              </p>
              <h1 className="max-w-3xl text-5xl font-black uppercase tracking-[-0.08em] sm:text-7xl">
                Bun app scaffolded and ready for the studio build.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[oklch(0.35_0.02_95)] sm:text-lg">
                The app now runs on Bun, React, Vite, Tailwind 4, and the base
                dependencies needed for the PDFx preview/editor work. The next
                phase can layer in the shared design system, PDFx CLI assets,
                and the invoice studio routes.
              </p>
            </section>
            <section className="space-y-3 border-2 border-[oklch(0.18_0.02_95)] bg-[oklch(0.95_0.01_95)] p-5">
              <h2 className="text-sm font-black uppercase tracking-[0.24em]">
                Installed
              </h2>
              <ul className="space-y-2 text-sm leading-6">
                <li>`react-router-dom`</li>
                <li>`@react-pdf/renderer`</li>
                <li>`lucide-react`</li>
                <li>`@radix-ui/react-slot`</li>
                <li>`class-variance-authority` + `clsx` + `tailwind-merge`</li>
                <li>`tailwindcss` + `@tailwindcss/vite`</li>
              </ul>
            </section>
          </div>
        </div>

        <section className="grid gap-4 border-t-2 border-[oklch(0.18_0.02_95)] pt-6 text-sm uppercase tracking-[0.18em] sm:grid-cols-3">
          <div>
            <p className="text-[oklch(0.43_0.03_95)]">Alias</p>
            <p className="mt-2 font-bold">@/* and @ds/*</p>
          </div>
          <div>
            <p className="text-[oklch(0.43_0.03_95)]">Tailwind</p>
            <p className="mt-2 font-bold">Configured for app + design-system</p>
          </div>
          <div>
            <p className="text-[oklch(0.43_0.03_95)]">Next</p>
            <p className="mt-2 font-bold">PDFx init + design system wiring</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
