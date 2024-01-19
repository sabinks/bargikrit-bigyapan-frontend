import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import { poppins } from './fonts'

export const metadata: Metadata = {
    title: 'Bargikrit Bigyapan',
    description: 'Bargikrit Bigypan is advertisement house.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <div className={poppins.className}>
                    {children}
                </div>
                <Footer />
            </body>
        </html >
    )
}
