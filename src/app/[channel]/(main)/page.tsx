import { executeGraphQL } from "@/lib/graphql";
import { notFound } from "next/navigation";

import { Nav } from "@/ui/components/nav/Nav";
import { ProductDetailsDocument, ProductListByCollectionDocument } from "@/gql/graphql";
import ProductDetails from "@/ui/components/ProductDetails";

export default async function Page({ params, searchParams }: { searchParams: any; params: { channel: string } }) {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) throw Error("No products found");

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(searchParams.type === 'light' ? products[0].slug : products[1].slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	return (
		<div className="mx-auto grid max-w-7xl p-8">
			<Nav channel={params.channel} />
			<ProductDetails product={product} channel={params.channel} />
		</div>
	);
}
