import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME

export const metadata: Metadata = {
    title: businessName,
    description: businessName + '',
    keywords: [],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <GoogleTagManager gtmId="5S8X6KB2" />
            <body className={`${inter.variable} font-sans`}>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=5S8X6KB2"
                    height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
                {children}
                <Analytics />
                <div id="root"></div>
                <div id="sticky-portal" className=""></div>
            </body>
        </html>
    )
}
