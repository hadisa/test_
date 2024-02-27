import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className="aspect-square overflow-hidden bg-neutral-50 dark:bg-gray-800 ">
			<NextImage {...props} className="h-full w-full object-contain object-center p-1" />
		</div>
	);
};
