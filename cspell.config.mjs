import { readFileSync } from 'node:fs'

export default {
  version: '0.2',
  language: 'en,en-GB',
  useGitignore: true,
  ignorePaths: readFileSync(new URL('./.cspellignore', import.meta.url), 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#')),
  dictionaryDefinitions: [{ name: 'project-words', path: './.cspell/project-words.txt', addWords: true }],
  dictionaries: ['project-words'],
}
