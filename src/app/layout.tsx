import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification"; // Moved this import after React import
import { Wrapper } from "@/app/wrapper";
import "./globals.css";
import AppProvider from "@/contexts/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				<AppProvider>
					{children}
					<DraftModeNotification />
				</AppProvider>
			</body>
		</html>
	);
}
