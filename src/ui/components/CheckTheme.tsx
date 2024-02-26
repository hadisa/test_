"use client"
import { ProductDetailsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { useTheme } from "next-themes";
export async function CheckTheme({ products, params }: any) {
	const { theme }: any = useTheme()


	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(theme !== 'dark' ? products[0].slug : products[1].slug),
			channel: params.channel,
		},
		revalidate: 60,
	});
	return product
}
