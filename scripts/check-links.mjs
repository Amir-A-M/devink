// Cross-checks every internal link in the built HTML against the routes that
// actually exist. Worth running because the dynamic routes set
// `dynamicParams = false`: a handle that is not in generateStaticParams returns
// 404 rather than falling back to on-demand rendering. Swap the fixtures in
// src/data/ for a real CMS and this is the first thing that breaks quietly.
//
// Run it after `npm run build`:  node scripts/check-links.mjs

import { readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'

const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'))
const routesManifest = JSON.parse(readFileSync('.next/routes-manifest.json', 'utf8'))

// Static and SSG routes that have already been prerendered.
const prerendered = new Set(Object.keys(manifest.routes || {}))

// Routes rendered on demand (search, api...) — a regex match is enough, they
// do not need to be prerendered.
const dynamicRoutes = (routesManifest.dynamicRoutes || []).map((r) => new RegExp(r.regex))
const staticRoutes = new Set((routesManifest.staticRoutes || []).map((r) => r.page))

// A dynamic route with dynamicParams = false must NOT be waved through on a
// regex match: only the prerendered paths exist. Detected by reading the source.
const strictPrefixes = []
for await (const file of glob('src/app/**/[[]handle[]]/page.tsx')) {
  if (/export const dynamicParams\s*=\s*false/.test(readFileSync(file, 'utf8'))) {
    strictPrefixes.push(
      file
        .replace(/^src\/app\//, '/')
        .replace(/\/page\.tsx$/, '')
        .replace(/\/\([^)]+\)/g, '')
        .replace(/\/\[handle\]$/, '')
    )
  }
}

const isStrict = (path) => strictPrefixes.some((p) => path.startsWith(p + '/'))

const exists = (path) => {
  if (prerendered.has(path) || staticRoutes.has(path)) return true
  if (isStrict(path)) return false // dynamicParams=false → only prerendered paths are live
  return dynamicRoutes.some((re) => re.test(path))
}

// Collect every internal href out of the built HTML.
const links = new Map() // path -> Set<pages that link to it>
for await (const file of glob('.next/server/app/**/*.html')) {
  const from = file.replace('.next/server/app', '').replace(/(\/index)?\.html$/, '') || '/'
  const html = readFileSync(file, 'utf8')
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const path = href.length > 1 ? href.replace(/\/$/, '') : href
    if (path.startsWith('/_next')) continue
    if (!links.has(path)) links.set(path, new Set())
    links.get(path).add(from)
  }
}

const broken = [...links].filter(([path]) => !exists(path)).sort()

console.log(`Scanned ${links.size} unique internal links across ${prerendered.size} prerendered pages.`)
console.log(`Strict routes (dynamicParams=false): ${strictPrefixes.join(', ')}\n`)

if (!broken.length) {
  console.log('OK — no broken links.')
  process.exit(0)
}

console.log(`${broken.length} link(s) point at a route that does not exist (they will 404):\n`)
for (const [path, sources] of broken) {
  const list = [...sources]
  console.log(`  ${path}`)
  console.log(`      from: ${list.slice(0, 3).join(', ')}${list.length > 3 ? ` (+${list.length - 3} pages)` : ''}`)
}
process.exit(1)
