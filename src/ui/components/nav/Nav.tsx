import { Suspense } from "react";
import { CartNavItem } from "./components/CartNavItem";

export const Nav = ({ channel }: { channel: string }) => {
	// const { isDarkTheme }: any = useStateProvider();

	// const { theme } = useTheme()
	return (
		<nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
			{/* <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul> */}
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				{/* <div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div> */}
				{/* <Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense> */}
			</div>
			<div className="flex items-center">
				<Suspense fallback={<div className="w-6 pb-[-10px]" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>
			{/* <Suspense>
				<MobileMenu>
					<SearchBar channel={channel} />
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense> */}
		</nav>
	);
};
