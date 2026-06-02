import type { UserConfig } from 'tsdown'
import { toArray } from '@antfu/utils'
import { defineConfig } from 'tsdown'

type Banner = Record<string, string | string[]>

const sharedBanner: Banner = {
  author: 'libraoly <uylor.liao@gmail.com>',
  homepage: 'https://github.com/libraoly/userscripts',
  homepageURL: 'https://github.com/libraoly/userscripts',
  supportURL: 'https://github.com/libraoly/userscripts/issues',
  license: 'MIT',
  contributionURL: 'https://github.com/sponsors/libraoly',
}

interface ScriptConfig {
  id: string
  banner: Banner
  bundled?: string[]
}

const scripts: ScriptConfig[] = [
  {
    id: 'windy-premium',
    banner: {
      'name': 'Windy Premium Cleaner',
      'name:zh-CN': 'Windy Premium 清理器',
      'version': '1.0.1',
      'description': 'Remove Windy Premium watermark and grayscale filter.',
      'description:zh-CN': '移除 Windy Premium 水印和灰度滤镜。',
      'run-at': 'document-start',
      'match': 'https://www.windy.com/*',
      'grant': 'GM_addStyle',
    },
  },
  {
    id: 'flightconnections-premium',
    banner: {
      'name': 'FlightConnections Premium',
      'name:zh-CN': 'FlightConnections Premium',
      'version': '1.0.1',
      'description': 'Unlock premium features on flightconnections.com.',
      'description:zh-CN': '解锁 flightconnections.com 的 Premium 功能。',
      'run-at': 'document-start',
      'match': 'https://www.flightconnections.com/*',
      'grant': 'none',
    },
  },
]

export default defineConfig(
  scripts.map((script): UserConfig => {
    return {
      entry: `./src/${script.id}.ts`,
      platform: 'browser',
      format: 'iife',
      minify: 'dce-only',
      outputOptions: {
        entryFileNames: '[name].user.js',
      },
      inlineOnly: script.bundled,
      banner: generateBanner({
        ...script.banner,
        ...sharedBanner,
        namespace: `https://github.com/libraoly/userscripts/releases/latest/download/${script.id}.user.js`,
        downloadURL: `https://github.com/libraoly/userscripts/releases/latest/download/${script.id}.user.js`,
      }),
    }
  }),
)

function generateBanner(properties: Banner) {
  const maxLength = Math.max(...Object.keys(properties).map(key => key.length))
  const lines = Object.entries(properties).flatMap(([key, value]) => {
    return toArray(value).map(value => `// @${key.padEnd(maxLength + 1)} ${value}`)
  })
  return `// ==UserScript==
${lines.join('\n')}
// ==/UserScript==
`
}
