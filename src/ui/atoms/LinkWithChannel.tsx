"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {
	const { channel } = useParams<{ channel?: string }>();

	if (!href.startsWith("/")) {
		return <Link className="text-neutral-500 dark:text-gray-300"  {...props} href={href} />;
	}

	const encodedChannel = encodeURIComponent(channel ?? "");
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link className="text-neutral-500 dark:text-gray-300" {...props} href={hrefWithChannel} />;
};
