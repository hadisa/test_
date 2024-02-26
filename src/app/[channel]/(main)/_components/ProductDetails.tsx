"use client"
import { useEffect } from "react";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";
import { VariantSelector } from "@/ui/components/VariantSelector";
import edjsHTML from "editorjs-html";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import xss from "xss";
import { AddButton } from "../products/[slug]/AddButton";

const parser = edjsHTML();

const Productdetails = ({ product, channel }: any) => {
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
    }, [theme]);

    const productImage = product.thumbnail;
    const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

    const variants = product.variants;
    // const selectedVariantID = searchParams.variant;
    const selectedVariantID = null;
    const selectedVariant = variants?.find(({ id }: any) => id === selectedVariantID);

    const addItem = () => { };

    const isAvailable = variants?.some((variant: any) => variant.quantityAvailable) ?? false;

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
        image: product.thumbnail?.url,
        ...(selectedVariant
            ? {
                name: `${product.name} - ${selectedVariant.name}`,
                description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
                offers: {
                    "@type": "Offer",
                    availability: selectedVariant.quantityAvailable
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",
                    priceCurrency: selectedVariant.pricing?.price?.gross.currency,
                    price: selectedVariant.pricing?.price?.gross.amount,
                },
            }
            : {
                name: product.name,

                description: product.seoDescription || product.name,
                offers: {
                    "@type": "AggregateOffer",
                    availability: product.variants?.some((variant: any) => variant.quantityAvailable)
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",
                    priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
                    lowPrice: product.pricing?.priceRange?.start?.gross.amount,
                    highPrice: product.pricing?.priceRange?.stop?.gross.amount,
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
            <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" action={addItem}>
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
                            <AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
                        </div>
                        {description && (
                            <div className="mt-8 space-y-6 text-sm text-gray-500 dark:text-gray-400">
                                {description.map((content) => (
                                    <div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </section>
    );
};
export default Productdetails;
