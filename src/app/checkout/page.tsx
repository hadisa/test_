import { invariant } from "ts-invariant";
import { RootWrapper } from "./pageWrapper";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "Checkout · Saleor Storefront example",
};

export default function CheckoutPage({
	searchParams,
}: {
	searchParams: { checkout?: string; order?: string };
}) {
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh dark:bg-bgDark bg-white">
			<Header />
			<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8 dark:bg-bgDark bg-white">

				{/* <div className="flex items-center font-bold flex-row justify-between">
					<a aria-label="homepage" href="/">
						ACME
					</a>
					
				</div> */}
				<h1 className="mt-8 text-3xl font-bold text-gray-900 dark:bg-bgDark bg-white dark:text-gray-100">Checkout</h1>

				<section className="mb-12 mt-6 flex-1 dark:bg-bgDark bg-white ">
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section>
			</section>
		</div>
	);
}
