// Equivalent to the old `extends: 'next/core-web-vitals'`.
// `eslint-config-next/typescript` is deliberately not added: it turns on ~110
// pre-existing errors that are out of scope for the lint script.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// eslint-config-next 16.3 ships eslint-plugin-react-hooks v6, whose React
// Compiler rules fire on two patterns this template uses on purpose. Scoped by
// path rather than switched off wholesale, so the rules stay live everywhere
// else. See docs/adr/0001-react-compiler-lint-rules.md.
const reactCompilerRules = {
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/refs': 'off',
  'react-hooks/immutability': 'off',
  'react-hooks/preserve-manual-memoization': 'off',
}

const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'dist/**'] },
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  {
    // Vendored Tiptap editor UI — third-party source the template ships but does
    // not maintain. Upstream owns these patterns.
    files: [
      'src/components/tiptap-*/**',
      'src/hooks/use-cursor-visibility.ts',
      'src/hooks/use-menu-navigation.ts',
      'src/lib/tiptap-utils.ts',
    ],
    rules: reactCompilerRules,
  },
  {
    // Subscriptions to an external source: the effect takes one synchronous
    // snapshot, then keeps it current from the source's own callback. The rule
    // cannot tell this apart from a cascading render, and its own message names
    // this case as legitimate.
    files: [
      'src/app/(app)/post/GalleryImages.tsx',
      'src/hooks/use-carousel-arrow-buttons.ts',
      'src/hooks/use-carousel-dot-buttons.ts',
      'src/hooks/useIntersectionObserver.ts',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    // Client-only gate: the theme is read from localStorage on mount, which
    // cannot be derived at render.
    files: ['src/app/theme-provider.tsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    // False positive: `commentActions` is an array literal. The rule reaches a
    // ref through one of the onClick closures and attributes it to the array.
    files: ['src/components/CommentCard/CommentCard.tsx'],
    rules: { 'react-hooks/refs': 'off' },
  },
]

export default config
