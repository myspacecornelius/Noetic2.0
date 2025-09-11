import type { AppProps } from 'next/app'
import '../styles/global.css'
// Import chart configuration to ensure Chart.js is properly registered
import '../lib/chart-config'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}