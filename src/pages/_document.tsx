import { APP_NAME } from '@/constants'
import { Html, Head, Main, NextScript } from 'next/document'
export const metadata = {
    title: "Bargikrit Bigyapan",
}
export default function Document() {
    return (
        <Html lang="en">
            <Head >
                <title>{APP_NAME}</title>
                <meta property="og:description" content={`${APP_NAME}, advertisement house, bargikrit bigyapan, advertisement, promote business, create job`} key="description" />
                <link rel="icon" href="/assets/bb-250.png" type="image/png" sizes="32x32" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
