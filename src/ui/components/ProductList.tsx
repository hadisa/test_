import { type ProductListItemFragment } from "@/gql/graphql";
import { redirect } from "next/navigation";

export default function ProductList({ products }: { products: readonly ProductListItemFragment[] }) {
	redirect(`/default-channel/products/${products[0].slug}`);

}
