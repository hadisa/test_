import clsx from "clsx";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export async function Pagination({
	pageInfo,
}: {
	pageInfo: {
		basePathname: string;
		hasNextPage: boolean;
		readonly urlSearchParams?: URLSearchParams;
	};
}) {
	return (
		<nav className="flex items-center justify-center gap-x-4 border-neutral-200  dark:border-neutral-500 px-4 pt-12">
			<LinkWithChannel
				href={pageInfo.hasNextPage ? `${pageInfo.basePathname}?${pageInfo.urlSearchParams?.toString()}` : "#"}
				className={clsx("px-4 py-2 text-sm font-medium ", {
					"rounded bg-bgComp text-primary-500 hover:bg-bgComp_hover": pageInfo.hasNextPage,
					"cursor-not-allowed rounded border text-primary-600": !pageInfo.hasNextPage,
					"pointer-events-none": !pageInfo.hasNextPage,
				})}
				aria-disabled={!pageInfo.hasNextPage}
			>
				Next page
			</LinkWithChannel>
		</nav>
	);
}
