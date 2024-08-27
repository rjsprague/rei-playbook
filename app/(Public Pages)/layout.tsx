import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"

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

    const gtmId = process.env.NEXT_PUBLIC_GTM_ID
    const whatConvertsUrl = process.env.NEXT_PUBLIC_WHAT_CONVERTS_URL
    const searchConsole = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION

    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager */}
                { gtmId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', '${gtmId}');
                            `}
                        </Script>
                    </>
                )}
                {/* End Google Tag Manager */}

                { searchConsole && <meta name="google-site-verification" content={`${searchConsole}`} />}
            </head>
            <body className={`${inter.variable} font-sans`}>
                {/* <!-- Google Tag Manager (noscript) --> */}
                { gtmId &&
                    <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                    </noscript>
                }
                {/* <!-- End Google Tag Manager (noscript) --> */}
                { whatConvertsUrl &&
                    <Script
                        src={`${whatConvertsUrl}`}
                        strategy="afterInteractive"
                    />
                }
                {children}
                <Analytics />
                <div id="root"></div>
                <div id="sticky-portal" className=""></div>
            </body>
        </html>
    )
}
