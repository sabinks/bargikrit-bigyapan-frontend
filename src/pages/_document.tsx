import { APP_NAME } from '@/constants'
import { Html, Head, Main, NextScript } from 'next/document'
export const metadata = {
    title: "Nepteka Solutions - All in One solutions",
}
export default function Document() {
    return (
        <Html lang="en">
            <Head >
                <title>{APP_NAME}</title>
                <meta property="og:description" content={`${APP_NAME}, property deaer`} key="description" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
