import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 800, letterSpacing: '0.3px' }}>noetic1</span>,
  project: {
    link: 'https://github.com/YOUR_GITHUB/noetic1'
  },
  chat: {
    link: ''
  },
  docsRepositoryBase: 'https://github.com/YOUR_GITHUB/noetic1',
  head: (
    <>
      <meta name="theme-color" content="#667eea" />
      <meta property="og:site_name" content="noetic1" />
      <meta property="og:image" content="/og.png" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  footer: {
    content: `© ${new Date().getFullYear()} David C. Nichols · noetic1`
  }
}

export default config
