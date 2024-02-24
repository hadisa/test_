import { redirect } from "next/navigation"; // Import "next/navigation" before "@/gql/graphql"
import { type ProductListItemFragment } from "@/gql/graphql"; // Import named export

export function ProductList({ products }: { products: readonly ProductListItemFragment[] }) { // Change to named export
	redirect(`/default-channel/products/${products[0].slug}`);
}
