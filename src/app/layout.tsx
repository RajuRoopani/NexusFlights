import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
})

export const metadata: Metadata = {
  title: 'FlightVision 2030 | AI-Native Flight Comparison',
  description: 'The future of flight comparison - AI-powered, sustainable, and designed for 2030',
  keywords: ['flights', 'travel', 'AI', 'sustainability', 'future', 'comparison'],
  authors: [{ name: 'FlightVision Team' }],
  openGraph: {
    title: 'FlightVision 2030',
    description: 'Experience the future of flight booking with AI-native technology',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-neural-950 via-neural-900 to-quantum-950 text-white">
        <div className="neural-grid min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
