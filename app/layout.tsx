import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
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
    description: businessName + 'services northwest Florida by providing fair cash offers for your home in as-is condition. No repairs, no commissions, no fees.',
    keywords: ['Pensacola', 'Cantonment', 'Pace', 'Milton', 'East Milton', 'Holley', 'Navarre', 'Gulf Breeze', 'Mary Esther', 'Fort Walton Beach', 'Shalimar', 'Wright', 'Crestview', 'Niceville', 'Valparaiso', 'Freeport', 'Destin', 'sell home', 'sell house', 'sell my home', 'sell my house', 'sell my home fast', 'sell my house fast', 'sell home fast', 'sell house fast', 'sell my home for cash', 'sell my house for cash', 'sell home for cash', 'sell house for cash', 'sell my home as-is', 'sell my house as-is', 'sell home as-is', 'sell house as-is', 'sell my home without a realtor', 'sell my house without a realtor', 'sell home without a realtor', 'sell house without a realtor', 'sell my home without an agent', 'sell my house without an agent', 'sell home without an agent', 'sell house without an agent', 'sell my home without repairs', 'sell my house without repairs', 'sell home without repairs', 'sell house without repairs', 'sell my home without fees', 'sell my house without fees', 'sell home without fees', 'sell house without fees', 'sell my home without commissions', 'sell my house without commissions', 'sell home without commissions', 'sell house without commissions'],
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
