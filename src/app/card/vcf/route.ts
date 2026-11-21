import { buildVCard } from "../contact";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Mahmoud-Wageeh-CEMTRIX.vcf"',
    },
  });
}
