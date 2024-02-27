"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export function NavLink({ href, children }: { href: string; children: JSX.Element | string }) {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<LinkWithChannel
				href={href}
				className={clsx(
					isActive ? "border-neutral-900 text-primary-500 " : "border-transparent text-gray-900 dark:text-gray-100",
					"inline-flex items-center border-b-2  dark:border-gray-500 pt-px text-sm font-medium ",
				)}
			>
				{children}
			</LinkWithChannel>
		</li>
	);
}
