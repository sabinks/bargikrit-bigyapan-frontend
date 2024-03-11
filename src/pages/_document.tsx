import { APP_NAME } from '@/constants'
import { Html, Head, Main, NextScript } from 'next/document'
export const metadata = {
    title: "Bargikrit Bigyapan",
}
export default function Document() {
    return (
        <Html lang="en">
            <Head >
                {/* <title>{APP_NAME}</title> */}
                <meta property="og:description" content={`${APP_NAME}, advertisement, advertise, ads, ad, ad zoner, ad zone, ads zone, ads zoner, job hunt, post advertisement, post ads, advertisement house, bargikrit bigyapan, advertisement, promote business, create job`} key="description" />
                <link rel="icon" href="/assets/az_logo_500.png" type="image/png" sizes="32x32" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
