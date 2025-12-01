import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.ts',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                card: 'var(--card-body)',
                brand: {
                    1: '#060A1A',
                    2: '#0A102A',
                    3: '#050515',
                },
            },
        },
    },
    plugins: [typography],
};
