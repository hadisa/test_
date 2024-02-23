import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import { type Config } from "tailwindcss";

const { fontFamily } = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
	darkMode: 'class',
	theme: {
		extend: {
			lineHeight: {
				11: '2.75rem',
				12: '3rem',
				13: '3.25rem',
				14: '3.5rem',
			},
			fontFamily: {
				sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
			},
			// colors: {

			// },
			typography: ({ theme }: any) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.600')}`,
							},
							code: { color: theme('colors.primary.400') },
						},
						'h1,h2': {
							fontWeight: '700',
							letterSpacing: theme('letterSpacing.tight'),
						},
						h3: {
							fontWeight: '600',
						},
						code: {
							color: theme('colors.indigo.500'),
						},
					},
				},
				invert: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.400')}`,
							},
							code: { color: theme('colors.primary.400') },
						},
						'h1,h2,h3,h4,h5,h6': {
							color: theme('colors.gray.100'),
							font: 'Haffer, sans-serif',
						},
					},
				},
			}),
		},
	},
};

export default config;
