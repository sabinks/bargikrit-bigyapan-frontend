import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/auth";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-medium-image-zoom/dist/styles.css'
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApplicationProvider } from "../../context/application";
import AuthLayout from "@/components/authLayout";
import Layout from "@/components/layout";
import { SubscriptionProvider } from "../../context/subscription";
import SiteVisit from "@/components/siteVisit";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400"],
    variable: '--font-roboto',
});


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 60 * 5,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    const pages = ['/reset-password', '/register', '/login', '/forgot-passowrd', '/email-verify']

    return (
        <div className={`${roboto.variable}`}>
            <QueryClientProvider client={queryClient}>
                {/* <GoogleOAuthProvider clientId={"902325181054-s9o11078ph5fgbqsljntfm3oinsmjbov.apps.googleusercontent.com"}> */}
                <ApplicationProvider>
                    <AuthProvider>
                        <SubscriptionProvider>
                            {
                                router.pathname.startsWith("/auth") ?
                                    <AuthLayout props={<Component {...pageProps} />} /> :
                                    pages.includes(router.pathname) ? <Component {...pageProps} /> :
                                        <Layout props={<Component {...pageProps} />} />
                            }
                        </SubscriptionProvider>
                    </AuthProvider>
                </ApplicationProvider>
                {/* </GoogleOAuthProvider>; */}

                <ToastContainer />
                {/* <SiteVisit /> */}
            </QueryClientProvider>
        </div>
    );
}
