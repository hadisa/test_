import React from "react";
import { Header } from "@/ui/components/Header";
// import { Footer } from "@/ui/components/Footer";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout(props: {
	children: React.ReactNode;
	params: { channel: string; theme: string };
}) {
	return (
		<>
			<Header />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<div></div>
				{/* <Footer channel={props.params.channel} /> */}
			</div>
		</>
	);
}
