import type { Config } from 'tailwindcss'
// import 'dotenv/config'

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
            },
            boxShadow: {
                'outline-gray': '0 0 0 3px rgba(113, 128, 150, 0.5)',
                'border-shadow': '0 0 5px rgba(0,0,0,.5)'
            },
                
        },
        colors: {
                primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#000000',
                secondary: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#FFFFFF',
                white: '#FFFFFF',
                black: '#000000',
                gray: {
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
                blue: {
                    100: '#E6F3FF',
                    200: '#BFDEFF',
                    300: '#99C9FF',
                    400: '#4DA0FF',
                    500: '#0077FF',
                    600: '#006BE6',
                    700: '#004C99',
                    800: '#003866',
                    900: '#002433',
                },
                green: {
                    100: '#E6FFE6',
                    200: '#BFFFBF',
                    300: '#99FF99',
                    400: '#4DFF4D',
                    500: '#00FF00',
                    600: '#00E600',
                    700: '#009900',
                    800: '#006600',
                    900: '#003300',
                },
                yellow: {
                    100: '#FFFCE6',
                    200: '#FFF9BF',
                    300: '#FFF699',
                    400: '#FFF14D',
                    500: '#FFEB00',
                    600: '#E6D100',
                    700: '#998000',
                    800: '#736600',
                    900: '#4D4400',
                },
                red: {
                    100: '#FFE6E6',
                    200: '#FFBFBF',
                    300: '#FF9999',
                    400: '#FF4D4D',
                    500: '#FF0000',
                    600: '#E60000',
                    700: '#990000',
                    800: '#730000',
                    900: '#4D0000',
                },
                purple: {
                    100: '#E6E6FF',
                    200: '#BFBFFF',
                    300: '#9999FF',
                    400: '#4D4DFF',
                    500: '#0000FF',
                    600: '#0000E6',
                    700: '#000099',
                    800: '#000073',
                    900: '#00004D',
                },
                pink: {
                    100: '#FFE6F3',
                    200: '#FFBFE6',
                    300: '#FF99D9',
                    400: '#FF4DBF',
                    500: '#FF00A5',
                    600: '#E60094',
                    700: '#990062',
                    800: '#730046',
                    900: '#4D002F',
                },
            }, // Add comma here
    },
    plugins: [],
}
export default config
