import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nunito, Bree_Serif, Roboto_Serif, Roboto_Flex, } from 'next/font/google'
import 'react-medium-image-zoom/dist/styles.css'

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
            <Component {...pageProps} />
        </div>
    </>
}
