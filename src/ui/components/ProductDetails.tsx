/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { Product } from "@/gql/graphql";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";
import { VariantSelector } from "@/ui/components/VariantSelector";
import edjsHTML from "editorjs-html";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import xss from "xss"; // Import xss before other modules

const parser = edjsHTML();
type ProductDetailsProps = {
    product: Product | any;
    channel: string;
};
function ProductDetails({ product, channel }: ProductDetailsProps) {
    const { theme } = useTheme();
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (theme) {
            params.set("type", theme);
            push(`${pathname}?${params.toString()}`);
        }
    }, [theme, pathname, push, searchParams]);

    const productImage = product?.thumbnail;
    const description = product?.description ? parser.parse(JSON.parse(product.description)) : null;
    const variants = product?.variants;
    const selectedVariantID = variants?.[0]?.id; // Assuming you want to select the first variant initially

    const addItem = function (this: void) {
        console.log("You clicked on addItem!");
    };

    const isAvailable = variants?.some((variant: { quantityAvailable: any; }) => variant.quantityAvailable) ?? false;

    const selectedVariant = variants?.find(({ id }: { id: string }) => id === selectedVariantID);

    const price = selectedVariant?.pricing?.price?.gross
        ? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
        : isAvailable
            ? formatMoneyRange({
                start: product?.pricing?.priceRange?.start?.gross,
                stop: product?.pricing?.priceRange?.stop?.gross,
            })
            : "";

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        image: product?.thumbnail?.url,
        ...(selectedVariant
            ? {
                name: `${product.name} - ${selectedVariant.name}`,
                description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
                offers: {
                    "@type": "Offer",
                    availability: selectedVariant.quantityAvailable
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",
                    priceCurrency: selectedVariant?.pricing?.price?.gross.currency,
                    price: selectedVariant?.pricing?.price?.gross.amount,
                },
            }
            : {
                name: product?.name,
                description: product?.seoDescription || product?.name,
                offers: {
                    "@type": "AggregateOffer",
                    availability: product?.variants?.some((variant: { quantityAvailable: any; }) => variant.quantityAvailable)
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",
                    lowPrice: product?.pricing?.priceRange?.start?.gross.amount,
                    highPrice: product?.pricing?.priceRange?.stop?.gross.amount,
                },
            }),
    };

    return (
        <section className="mx-auto grid max-w-7xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd),
                }}
            />
            <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" onSubmit={addItem}>
                <div className="md:col-span-1 lg:col-span-5">
                    {productImage && (
                        <ProductImageWrapper
                            priority={true}
                            alt={productImage.alt ?? ""}
                            width={1024}
                            height={1024}
                            src={productImage.url}
                        />
                    )}
                </div>
                <div className="flex flex-col sm:col-span-1 lg:col-span-3 ">
                    <div className="pt-6 sm:px-6 sm:pt-0 lg:pt-16">
                        <h1 className="mb-4 flex-auto font-[`Haffer`] text-3xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                            {product?.name}
                        </h1>
                        <p className="mb-8 text-sm " data-testid="ProductElement_Price">
                            {price}
                        </p>
                        {variants && (
                            <VariantSelector
                                selectedVariant={selectedVariant}
                                variants={variants}
                                product={product}
                                channel={channel}
                            />
                        )}
                        <AvailabilityMessage isAvailable={isAvailable} />
                        <div className="mt-8 ">
                            <button type="submit" disabled={!selectedVariantID || !selectedVariant?.quantityAvailable}>
                                Add to Cart
                            </button>
                        </div>
                        {description && (
                            <div className="mt-8 space-y-6 text-sm text-gray-500 dark:text-gray-400">
                                {description.map((content: string, index: number) => (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: xss(content) }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
};
export default ProductDetails;

