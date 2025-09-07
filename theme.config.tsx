import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ 
      fontWeight: 700, 
      letterSpacing: '-0.025em',
      fontSize: '1.25rem',
      color: '#e4e4e7'
    }}>
      <span style={{ color: '#667eea' }}>NOETIC</span>
      <span style={{ 
        fontWeight: 300, 
        marginLeft: '0.25rem',
        color: '#a1a1aa' 
      }}>2.0</span>
    </span>
  ),
  project: {
    link: 'https://github.com/YOUR_GITHUB/noetic2'
  },
  chat: {
    link: ''
  },
  docsRepositoryBase: 'https://github.com/YOUR_GITHUB/noetic2',
  head: (
    <>
      <meta name="theme-color" content="#667eea" />
      <meta property="og:site_name" content="Noetic 2.0" />
      <meta property="og:title" content="Noetic 2.0 - Investment Thesis Platform" />
      <meta property="og:description" content="Strategic transformation from venture fund to CNS operating company. Professional investor documentation and thesis builder." />
      <meta property="og:image" content="/og.png" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  ),
  footer: {
    content: `© ${new Date().getFullYear()} David C. Nichols · Noetic 2.0`
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  }
}

export default config
