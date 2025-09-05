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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
    </>
  ),
  footer: {
    content: `© ${new Date().getFullYear()} David C. Nichols · noetic1`
  }
}

export default config
