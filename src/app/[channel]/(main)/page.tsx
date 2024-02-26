
import { ProductDetailsDocument, ProductListByCollectionDocument } from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";
import { executeGraphQL } from "@/lib/graphql";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";
import { VariantSelector } from "@/ui/components/VariantSelector";
import { Nav } from "@/ui/components/nav/Nav";
import edjsHTML from "editorjs-html";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { type Product, type WithContext } from "schema-dts";
import { invariant } from "ts-invariant";
import xss from "xss";
import { AddButton } from "./products/[slug]/AddButton";
// import useStateProvider from "@/checkout/providers/StateProviderServer";

const parser = edjsHTML();

export default async function Page({ params }: { params: { channel: string, theme: any } }) {


	// const { theme }: any = useTheme()
	// let theme = 'light'
	console.log("Theme in the page ::", params.channel, params.theme)
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) throw Error("No products found");

	const products = data.collection?.products.edges.map(({ node: product }) => product);
	let product; // Declare product variable outside the if-else block

	if (params.theme === 'dark') {
		const darkProduct = await executeGraphQL(ProductDetailsDocument, {
			variables: {
				slug: decodeURIComponent(products[1].slug),
				channel: params.channel,
			},
			revalidate: 60,
		});

		product = darkProduct.product;
	} else {
		const lightProduct = await executeGraphQL(ProductDetailsDocument, {
			variables: {
				slug: decodeURIComponent(products[1].slug),
				channel: params.channel,
			},
			revalidate: 60,
		});

		product = lightProduct.product;
	}

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const variants = product.variants;
	// const selectedVariantID = searchParams.variant;
	const selectedVariantID = null;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	async function addItem() {
		"use server";

		const checkout = await Checkout.findOrCreate({
			checkoutId: Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});
		invariant(checkout, "This should never happen");

		Checkout.saveIdToCookie(params.channel, checkout.id);

		// if (!selectedVariantID) {
		// 	return;
		// }

		// TODO: error handling
		// await executeGraphQL(CheckoutAddLineDocument, {
		// 	variables: {
		// 		id: checkout.id,
		// 		productVariantId: decodeURIComponent(selectedVariantID),
		// 	},
		// 	cache: "no-cache",
		// });

		revalidatePath("/cart");
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
			? formatMoneyRange({
				start: product?.pricing?.priceRange?.start?.gross,
				stop: product?.pricing?.priceRange?.stop?.gross,
			})
			: "";

	const productJsonLd: WithContext<Product> = {
		"@context": "https://schema.org",
		"@type": "Product",
		image: product.thumbnail?.url,
		...(selectedVariant
			? {
				name: `${product.name} - ${selectedVariant.name}`,
				description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
				offers: {
					"@type": "Offer",
					availability: selectedVariant.quantityAvailable
						? "https://schema.org/InStock"
						: "https://schema.org/OutOfStock",
					priceCurrency: selectedVariant.pricing?.price?.gross.currency,
					price: selectedVariant.pricing?.price?.gross.amount,
				},
			}
			: {
				name: product.name,

				description: product.seoDescription || product.name,
				offers: {
					"@type": "AggregateOffer",
					availability: product.variants?.some((variant) => variant.quantityAvailable)
						? "https://schema.org/InStock"
						: "https://schema.org/OutOfStock",
					priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
					lowPrice: product.pricing?.priceRange?.start?.gross.amount,
					highPrice: product.pricing?.priceRange?.stop?.gross.amount,
				},
			}),
	};

	return (
		<section className="mx-auto grid max-w-7xl p-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" action={addItem}>
				<div className="md:col-span-1 lg:col-span-5">
					{firstImage && (
						<ProductImageWrapper
							priority={true}
							alt={firstImage.alt ?? ""}
							width={1024}
							height={1024}
							src={firstImage.url}
						/>
					)}
				</div>
				<div className="flex flex-col sm:col-span-1 lg:col-span-3 ">
					<Nav channel={"default-channel"} />
					<div className="pt-6 sm:px-6 sm:pt-0 lg:pt-16">
						<h1 className="mb-4 flex-auto font-[`Haffer`] text-3xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
							{product?.name}
						</h1>
						<p className="mb-8 text-sm " data-testid="ProductElement_Price">
							{price}
						</p>

						{variants && (
							<VariantSelector
								selectedVariant={selectedVariant}
								variants={variants}
								product={product}
								channel={params.channel}
							/>
						)}
						<AvailabilityMessage isAvailable={isAvailable} />
						<div className="mt-8 ">
							<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
						</div>
						{description && (
							<div className="mt-8 space-y-6 text-sm text-gray-500 dark:text-gray-400">
								{description.map((content) => (
									<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
								))}
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	);
}