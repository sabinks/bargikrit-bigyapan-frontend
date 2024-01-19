import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'banner-bg': "url('/assets/banner-image-1.png')",
                'dot-bg': "url('/assets/dot.png')",
                'small-white-dot': "url('/assets/small-white-dot.png')"
            },
            animation: {
                // Bounces 5 times 1s equals 5 seconds
                'bounce-short': 'bounce 1s ease-in-out 5'
            },
            colors: {
                'primary': '#FCB80B',
                'secondary': '#171717',
                'accent1': '#ff49db',
                'accent2': '#ff7849',
                'white': '#fff',
                'black': '#000',
                'gray-dark': '#273444',
                'gray': '#8492a6',
                'gray-light': '#777991',
            },
        },
    },
    plugins: [],
}
export default config
