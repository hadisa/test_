// import { Nav } from "./nav/Nav"; // Import "./nav/Nav" before other imports

import { Logo } from "./Logo";
import { ThemeSwitch } from "./themeSwitch/ThemeSwitch";

// export function Header({ channel }: { channel: string }) {
export function Header() {
	return (
		<header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md dark:bg-bgDark">
			{/* <header className="sticky top-0 z-20 bg-transparent"> */}
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="flex h-16 justify-between gap-4 md:gap-8">
					<Logo />
					{/* <Nav channel={channel} /> */}
					<ThemeSwitch />
				</div>
			</div>
		</header>
	);
}
