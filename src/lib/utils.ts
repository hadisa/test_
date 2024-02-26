import { ProductDetailsDocument, ProductListByCollectionDocument } from "@/gql/graphql";
import { default as edjsHTML } from "editorjs-html";
import { NextPageContext } from "next";
import { notFound } from "next/navigation";
import { executeGraphQL } from "./graphql";

const parser = edjsHTML();
export const formatDate = (date: Date | number) => {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

export const formatMoney = (amount: number, currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}



export async function getServerSideProps(context: NextPageContext) {
	const { params }: any = context;

	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: 'featured-products',
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		notFound();
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(products[0].slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;
	const variants = product.variants;

	return { props: { params, product, firstImage, description, variants } };
}
