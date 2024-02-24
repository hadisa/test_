import React from 'react';
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";
export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout(props: { children: React.ReactNode; params: { channel: string } }) {
	return (
		<>
			<Header channel={props.params.channel} />
			{/* <div className="w-full flex justify-end p-5"><ThemeSwitch /></div> */}
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<Footer channel={props.params.channel} />
			</div>
		</>
	);
}
