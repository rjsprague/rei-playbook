import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
// import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

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
            <head>
                {/* Google Tag Manager */}
                {/* {(
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtm.js?id=GTM-5S8X6KB2`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'GTM-5S8X6KB2');
                            `}
                        </Script>
                    </>
                )} */}
                {/* End Google Tag Manager */}
            </head>
            <GoogleTagManager gtmId="GTM-5S8X6KB2" />
            <body className={`${inter.variable} font-sans`}>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5S8X6KB2"
                    height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
                {children}
                {/* <Analytics /> */}
                <div id="root"></div>
                <div id="sticky-portal" className=""></div>
            </body>
        </html>
    )
}
