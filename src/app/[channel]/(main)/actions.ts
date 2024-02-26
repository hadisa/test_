"use server";

import { ProductDetailsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function fetchProductDetails(channel: any, products: any, index: string | number) {
    const { product } = await executeGraphQL(ProductDetailsDocument, {
        variables: {
            slug: decodeURIComponent(products[index].slug),
            channel: channel,
        },
        revalidate: 60,
    });

    return product
}

