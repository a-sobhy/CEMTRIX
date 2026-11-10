import Link from 'next/link';
import type { ReactNode } from 'react';

import { SectionLabel } from '@/components/SectionLabel';
import { legalContact, type LegalDocument } from '@/data/legal';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const linkPattern = new RegExp(`(${escapeRegExp(legalContact.email)}|Privacy Policy)`, 'g');

const linkClass = 'text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white';

/** Links the contact email and "Privacy Policy" wherever they appear in the text. */
function withLinks(text: string): ReactNode[] {
    return text.split(linkPattern).map((part, i) => {
        if (part === legalContact.email) {
            return <a key={i} href={`mailto:${part}`} className={linkClass}>{part}</a>;
        }
        if (part === 'Privacy Policy') {
            return <Link key={i} href="/privacy" className={linkClass}>{part}</Link>;
        }
        return part;
    });
}

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

/** Shared layout for the Privacy Policy and Terms of Use pages. Server-rendered, no animation, so the text is in the HTML. */
export function LegalPage({ document }: { document: LegalDocument }) {
    return (
        <div className="relative overflow-hidden pt-20">
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

            <section className="relative z-10 px-4 pt-28 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionLabel align="center" className="mb-8">{document.label}</SectionLabel>
                    <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl">
                        <span className="gradient-text">{document.title}</span>
                    </h1>
                    <p className="text-lg leading-relaxed text-gray-400">{document.intro}</p>
                    <p className="mt-6 text-sm text-gray-500">
                        Last updated: <time dateTime={document.lastUpdated}>{formatDate(document.lastUpdated)}</time>
                    </p>
                </div>
            </section>

            <section className="relative z-10 px-4 pb-32 sm:px-6 lg:px-8">
                <article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-dark-card/40 p-6 backdrop-blur-sm sm:p-10">
                    {document.sections.map((section, index) => (
                        <section key={section.heading} className={index > 0 ? 'mt-10 border-t border-white/10 pt-10' : ''}>
                            <h2 className="mb-4 text-2xl font-bold text-white">
                                <span className="gradient-text mr-3 text-base font-semibold">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {section.heading}
                            </h2>
                            <div className="space-y-4 leading-relaxed text-gray-400">
                                {section.body.map((block, i) =>
                                    Array.isArray(block) ? (
                                        <ul key={i} className="space-y-2 pl-1">
                                            {block.map((item) => (
                                                <li key={item} className="flex gap-3">
                                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-[#008bfd] to-secondary" />
                                                    <span>{withLinks(item)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p key={i}>{withLinks(block)}</p>
                                    ),
                                )}
                            </div>
                        </section>
                    ))}
                </article>
            </section>
        </div>
    );
}
