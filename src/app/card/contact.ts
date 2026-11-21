// Single source of truth for the card page and the downloadable vCard.
export const contact = {
  firstName: "Mahmoud",
  lastName: "Wageeh",
  prefix: "Mr",
  fullName: "Mahmoud Wageeh",
  title: "CEO",
  company: "CEMTRIX AI",
  mobile: "+971547294934",
  phone: "+201288827427",
  whatsapp: "+201009852737",
  email: "mahmoud.wageeh@cemtrix.ai",
  website: "https://cemtrix.ai",
  linkedin: "https://www.linkedin.com/company/cemtrix",
  address: {
    street: "Building A1, Dubai Digital Park, Dubai Silicon Oasis",
    city: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
  },
  brochure: "/cemtrix-brochure.pdf",
};

const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildVCard() {
  const c = contact;
  const a = c.address;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(c.lastName)};${esc(c.firstName)};;${esc(c.prefix)};`,
    `FN:${esc(c.fullName)}`,
    `ORG:${esc(c.company)}`,
    `TITLE:${esc(c.title)}`,
    `TEL;TYPE=CELL,VOICE,PREF:${c.mobile}`,
    // Phone and WhatsApp numbers are saved under the custom label "Phone", not "work". iPhone reads the
    // label from itemN.X-ABLabel; Android turns an X- type into a custom label. Keep X-Phone the only
    // type: Android uses the first one.
    `item1.TEL;TYPE=X-Phone:${c.phone}`,
    "item1.X-ABLabel:Phone",
    `item2.TEL;TYPE=X-Phone:${c.whatsapp}`,
    "item2.X-ABLabel:Phone",
    `EMAIL;TYPE=INTERNET,WORK:${c.email}`,
    `URL:${c.website}`,
    `URL;TYPE=LinkedIn:${c.linkedin}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};${esc(a.region)};;${esc(a.country)}`,
    "END:VCARD",
  ].join("\r\n");
}
