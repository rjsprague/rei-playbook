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
    const searchConsole = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION

    return (
        <html lang="en">
            <head>
                {searchConsole && <meta name="google-site-verification" content={`${searchConsole}`} />}
            </head>
            <body className={`${inter.variable} font-sans`}>
                {children}
                <Analytics />
                <div id="root"></div>
                <div id="sticky-portal" className=""></div>
                {/* Google Tag Manager */}
                {gtmId && (
                    <Script id="load-gtm" strategy="afterInteractive">
                        {`
                       var GTMCode="${gtmId}", GTMLoaded=!1;
                       function loadGTM() {
                           if(!GTMLoaded) {
                               GTMLoaded=!0;
                               var e,a,t,o,d,r="script",s="dataLayer";
                               e=window,a=document,t=GTMCode,e[s]=e[s]||[],e[s].push({"gtm.start":new Date().getTime(),event:"gtm.js"});
                               o=a.getElementsByTagName(r)[0],(d=a.createElement(r)).async=!0,d.src="https://www.googletagmanager.com/gtm.js?id="+t+("dataLayer"!=s?"&l="+s:""),o.parentNode.insertBefore(d,o)
                           }
                       }
                       window.addEventListener('scroll', loadGTM, { once: true });
                       window.addEventListener('touchstart', loadGTM, { once: true });
                       window.addEventListener('mousemove', loadGTM, { once: true });
                   `}
                    </Script>
                )}
                {/* End Google Tag Manager */}
                {/* <!-- Google Tag Manager (noscript) --> */}
                {gtmId &&
                    <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                    </noscript>
                }
                {/* <!-- End Google Tag Manager (noscript) --> */}
            </body>
        </html>
    )
}
