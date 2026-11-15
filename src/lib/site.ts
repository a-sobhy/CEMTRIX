/** Canonical origin of the production site, without a trailing slash. */
export const SITE_URL = 'https://cemtrix.ai';

/**
 * Brand name used in titles, Open Graph and structured data, written the same everywhere so Google
 * learns "Cemtrix AI" as one brand. The all-caps CEMTRIX wordmark in the design stays as it is.
 */
export const SITE_NAME = 'Cemtrix AI';

/**
 * Home page title, kept to ~63 characters so Google shows it whole. The longer
 * "Cemtrix AI | AI Platform for Cement Plant Intelligence & Predictive Maintenance" (79) gets cut off.
 */
export const HOME_TITLE = `${SITE_NAME} | Cement Plant Intelligence & Predictive Maintenance`;

/** Home page meta description (also the default for pages without their own), at most ~160 characters. */
export const HOME_DESCRIPTION =
    'Cemtrix AI is the AI platform for cement plants: AI-powered learning, plant intelligence and predictive maintenance for your people, performance and assets.';

/**
 * Open Graph fields every page shares. Next.js merges `openGraph` shallowly: a page that sets its
 * own `openGraph` replaces the layout's, so spread this into it to keep these fields.
 */
export const baseOpenGraph = {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
} as const;
