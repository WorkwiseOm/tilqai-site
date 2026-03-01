import { useEffect } from "react";

interface SEOProps {
    title: string;
    description: string;
    url: string;
    lang?: "en" | "ar";
}

/**
 * Lightweight SEO hook — injects <title>, meta description,
 * Open Graph tags, Twitter Card, and hreflang into the document head.
 * No external dependency needed.
 */
export function useSEO({ title, description, url, lang = "en" }: SEOProps) {
    useEffect(() => {
        // ── Title ──────────────────────────────────────────────
        document.title = title;

        // ── Helper: upsert a <meta> tag ────────────────────────
        const setMeta = (selector: string, attr: string, value: string) => {
            let el = document.querySelector<HTMLMetaElement>(selector);
            if (!el) {
                el = document.createElement("meta");
                const [attrName, attrVal] = selector.replace("meta[", "").replace("]", "").split("=");
                el.setAttribute(attrName.trim(), attrVal.replace(/"/g, "").trim());
                document.head.appendChild(el);
            }
            el.setAttribute(attr, value);
        };

        // ── Helper: upsert a <link> tag ────────────────────────
        const setLink = (rel: string, hreflang: string, href: string) => {
            let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"][hreflang="${hreflang}"]`);
            if (!el) {
                el = document.createElement("link");
                el.rel = rel;
                el.setAttribute("hreflang", hreflang);
                document.head.appendChild(el);
            }
            el.href = href;
        };

        // ── Standard meta ──────────────────────────────────────
        setMeta(`meta[name="description"]`, "content", description);

        // ── Open Graph ─────────────────────────────────────────
        setMeta(`meta[property="og:title"]`, "content", title);
        setMeta(`meta[property="og:description"]`, "content", description);
        setMeta(`meta[property="og:url"]`, "content", url);
        setMeta(`meta[property="og:type"]`, "content", "website");
        setMeta(`meta[property="og:image"]`, "content", "https://tilqai.om/og-image.png");
        setMeta(`meta[property="og:image:width"]`, "content", "1200");
        setMeta(`meta[property="og:image:height"]`, "content", "630");
        setMeta(`meta[property="og:site_name"]`, "content", "Tilqai");
        setMeta(`meta[property="og:locale"]`, "content", lang === "ar" ? "ar_OM" : "en_US");

        // ── Twitter Card ───────────────────────────────────────
        setMeta(`meta[name="twitter:card"]`, "content", "summary_large_image");
        setMeta(`meta[name="twitter:title"]`, "content", title);
        setMeta(`meta[name="twitter:description"]`, "content", description);
        setMeta(`meta[name="twitter:image"]`, "content", "https://tilqai.om/og-image.png");

        // ── hreflang alternates ────────────────────────────────
        // Google uses these to serve the right language version
        setLink("alternate", "en", url);
        setLink("alternate", "ar", url);          // same URL, language toggled in-app
        setLink("alternate", "x-default", url);

        // ── html lang attribute ────────────────────────────────
        document.documentElement.lang = lang;

        // ── Canonical ─────────────────────────────────────────
        let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    }, [title, description, url, lang]);
}
