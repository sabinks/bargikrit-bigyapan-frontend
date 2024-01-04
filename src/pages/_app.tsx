import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Bree_Serif, Roboto_Serif, Roboto_Flex, } from 'next/font/google'
import 'react-medium-image-zoom/dist/styles.css'
import SiteVisit from '../siteVisit';
import { appName } from '@/api/constants';
import Head from 'next/head';

export const nutino = Nunito({
    subsets: ['latin'],
    weight: '400'
});

export const bree = Bree_Serif({
    subsets: ['latin'],
    weight: '400'
});
export const roboto = Roboto_Serif({
    subsets: ['latin'],
    weight: '400'
});
export const robotoFlex = Roboto_Flex({
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {

    return <>
        <div className={nutino.className}>
            <Head>
                <title>{appName}</title>
                <meta name="description"
                    content="Quote Buckets, Quote Bucket, Quote Store, Quote Room" />
                <meta property='og:type'
                    content='website' />
                <meta property="og:title"
                    content='Quote Buckets' />
                <meta property='og:description'
                    content='Quote Buckets, Quote Bucket, Quote Store, Quote Room' />
            </Head>
            <Component {...pageProps} />
            <SiteVisit />
        </div>
    </>
}
