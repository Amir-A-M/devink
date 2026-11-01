import { defineConfig } from '@fullstacksjs/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

// Preserve existing React Compiler exceptions while migrating the baseline.
const reactCompilerRules = {
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/refs': 'off',
  'react-hooks/immutability': 'off',
  'react-hooks/preserve-manual-memoization': 'off',
}

const hooksConfig = [reactHooks.configs.flat.recommended]

const config = defineConfig(
  {
    prettier: false,
    react: { overrides: { rules: { 'react-refresh/only-export-components': 'off' } } },
    stylistic: false,
    typescript: {
      tsconfigRootDir: import.meta.dirname,
      projectService: { allowDefaultProject: ['*.mjs', 'scripts/*.mjs'] },
    },
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'dist/**',
      'src/components/tiptap-*/**',
      'src/components/ui/tiptap-*/**',
      'src/styles/_tiptap-*.scss',
      'src/libs/utils/tiptap-utils.ts',
      'src/libs/hooks/use-menu-navigation.ts',
      'src/libs/hooks/use-cursor-visibility.ts',
    ],
  },
  [
    { ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'dist/**'] },
    ...hooksConfig,
    {
      files: ['src/app/**/page.tsx'],
      rules: { 'max-lines': ['error', { max: 50, skipBlankLines: true, skipComments: true }] },
    },
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
        'src/components/ui/tiptap-*/**',
        'src/libs/hooks/use-cursor-visibility.ts',
        'src/libs/hooks/use-menu-navigation.ts',
        'src/libs/utils/tiptap-utils.ts',
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
        'src/libs/hooks/use-carousel-arrow-buttons.ts',
        'src/libs/hooks/use-carousel-dot-buttons.ts',
        'src/libs/hooks/useIntersectionObserver.ts',
      ],
      rules: { 'react-hooks/set-state-in-effect': 'off' },
    },
    {
      // Client-only gate: the theme is read from localStorage on mount, which
      // cannot be derived at render.
      files: ['src/libs/providers/theme-provider.tsx'],
      rules: { 'react-hooks/set-state-in-effect': 'off' },
    },
    {
      // False positive: `commentActions` is an array literal. The rule reaches a
      // ref through one of the onClick closures and attributes it to the array.
      files: ['src/components/common/comments/CommentCard/CommentCard.tsx'],
      rules: { 'react-hooks/refs': 'off' },
    },
  ]
)

export default config
