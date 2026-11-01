export default {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': [
    'eslint --fix',
    'prettier --write',
    'cspell --no-progress --no-must-find-files',
  ],
  '*.{json,jsonc,yaml,yml,md,mdx,css,scss,html}': ['prettier --write', 'cspell --no-progress --no-must-find-files'],
}
