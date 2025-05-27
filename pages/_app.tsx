import type { AppProps } from 'next/app'
import '../styles/globals.css'
import LandscapeGuard from '../components/LandscapeGuard'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LandscapeGuard>
      <Component {...pageProps} />
    </LandscapeGuard>
  )
}