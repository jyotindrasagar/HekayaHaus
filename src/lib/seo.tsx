import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../data/site';
import { metaFor, organizationSchema, websiteSchema } from '../data/seo';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: object | object[];
  breadcrumbs?: { name: string; path: string }[];
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Updates the existing (prerendered) head tags in place, so there are never duplicates. */
export function Seo(props: SeoProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    const base = metaFor(pathname);
    const title = props.title ?? base?.title ?? SITE.name;
    const description = props.description ?? base?.description ?? SITE.philosophy;
    const image = `${SITE.url}${props.image ?? base?.image ?? '/media/img/portrait-lightbulb-duo-1440.webp'}`;
    const canonical = `${SITE.url}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', props.noindex ? 'noindex, follow' : 'index, follow');
    setLink('canonical', canonical);
    setMeta('property', 'og:type', props.type ?? 'website');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    const graph: object[] = [organizationSchema(), websiteSchema()];
    if (props.breadcrumbs?.length) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE.url}${b.path}`,
        })),
      });
    }
    if (props.jsonLd) graph.push(...(Array.isArray(props.jsonLd) ? props.jsonLd : [props.jsonLd]));

    let script = document.getElementById('ld-json') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, props.title, props.description, props.image, props.noindex]);
  return null;
}

export const faqSchema = (faqs: readonly { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
