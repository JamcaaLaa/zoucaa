import { type Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'

export const copy404HtmlPlugin = (): Plugin => {
  return {
    name: 'copy-404html',
    apply: 'build',
    closeBundle() {
      const indexHtml = readFileSync('dist/index.html', {
        encoding: 'utf-8'
      })
      writeFileSync('dist/404.html', indexHtml, {
        encoding: 'utf-8'
      })
    }
  }
}