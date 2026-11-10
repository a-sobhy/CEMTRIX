import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { services } from "@/data/services";
import { productJsonLd } from "@/lib/structured-data";
import ProductClient from "./ProductClient";

// Prerender every product page at build time so navigation from the home page
// is instant (served from the CDN and prefetched by <Link>) instead of waiting
// for a serverless render on each click.
export function generateStaticParams() {
    return services.map((service) => ({ id: service.id }));
}

// Unknown product ids return a 404 instead of rendering on demand.
export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const service = services.find((s) => s.id === id);
    if (!service) return {};

    return {
        title: `${service.category} – ${service.title}`,
        description: service.description,
        alternates: { canonical: `/products/${service.id}` },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const service = services.find((s) => s.id === id);
    if (!service) notFound();

    return (
        <>
            <JsonLd data={productJsonLd(service)} />
            <ProductClient id={id} />
        </>
    );
}
