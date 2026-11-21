import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import { contact } from "./contact";
import s from "./card.module.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { absolute: `${contact.fullName} · ${contact.company}` },
  description: `${contact.title}, ${contact.company}. Save contact details and view the CEMTRIX brochure.`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#060E21" };

const tel = (n: string) => `tel:${n}`;
// Group digits for display: Egypt +20 12 3456 7890, UAE +971 54 123 4567.
const pretty = (n: string) =>
  n
    .replace(/^\+20(\d{2})(\d{4})(\d{4})$/, "+20 $1 $2 $3")
    .replace(/^\+971(\d{2})(\d{3})(\d{4})$/, "+971 $1 $2 $3");
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contact.address.street}, ${contact.address.city}`
)}`;

type Row = { label: string; value: string; href: string; icon: keyof typeof icons; external?: boolean };

const rows: Row[] = [
  { label: "Mobile", value: pretty(contact.mobile), href: tel(contact.mobile), icon: "phone" },
  { label: "WhatsApp", value: pretty(contact.whatsapp), href: `https://wa.me/${contact.whatsapp.replace("+", "")}`, icon: "chat", external: true },
  { label: "Phone", value: pretty(contact.phone), href: tel(contact.phone), icon: "phone" },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: "mail" },
  { label: "Website", value: contact.website.replace("https://", ""), href: contact.website, icon: "globe", external: true },
  { label: "LinkedIn", value: "linkedin.com/company/cemtrix", href: contact.linkedin, icon: "link", external: true },
  { label: "Office", value: `${contact.address.street}, ${contact.address.city}, UAE`, href: mapsUrl, icon: "pin", external: true },
];

const icons = {
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.5 8.5 0 1 1 21 11.5z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export default function CardPage() {
  return (
    <main className={`${s.page} ${poppins.variable} ${inter.variable}`}>
      <div className={s.card}>
        <header className={s.head}>
          <Image src="/cemtrix-logo.png" alt="CEMTRIX" width={641} height={150} className={s.logo} priority />
          <h1 className={s.name}>{contact.fullName}</h1>
          <p className={s.role}>{contact.title}, {contact.company}</p>
        </header>

        <a className={s.save} href="/card/vcf" download>
          <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" />
          </svg>
          Save contact
        </a>

        <a className={s.brochure} href={contact.brochure} target="_blank" rel="noopener">
          <Image src="/cemtrix-brochure-cover.jpg" alt="" width={1467} height={825} className={s.cover} sizes="(max-width: 480px) 100vw, 440px" />
          <span className={s.brochureText}>
            <span className={s.brochureTitle}>View company brochure</span>
            <span className={s.brochureMeta}>AI-powered intelligence for cement operations · PDF, 12 pages</span>
          </span>
        </a>

        <ul className={s.list}>
          {rows.map((r) => (
            <li key={r.label}>
              <a className={s.row} href={r.href} {...(r.external ? { target: "_blank", rel: "noopener" } : {})}>
                <Icon name={r.icon} />
                <span className={s.rowText}>
                  <span className={s.label}>{r.label}</span>
                  <span className={s.value}>{r.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className={s.foot}>
          <a href={contact.website}>cemtrix.ai</a>
        </footer>
      </div>
    </main>
  );
}
