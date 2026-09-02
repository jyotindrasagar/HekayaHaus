export interface RedirectRule {
  from: string;
  to: string;
  statusCode: number;
}

export const REDIRECT_MAP: Record<string, string> = {
  // Legacy Framer routes mapped to new canonical routes
  '/allserviceshekayahaus': '/allserviceshekayahaus',
  '/media-production-dubai': '/media-production-dubai',
  '/content-marketing-dubai': '/content-marketing-dubai',
  '/graphics-dubai': '/graphics-dubai',
  '/event-organise-dubai': '/event-organise-dubai',
  '/web-development-dubai': '/web-development-dubai',
  '/audio-direction-dubai': '/audio-direction-dubai',
  '/contact-us': '/contact-us',
  '/blogs': '/blogs',
  '/services': '/allserviceshekayahaus',
  '/contact': '/contact-us',
  '/work': '/#work',
  '/portfolio': '/#work',
  '/about': '/#about',
  '/why-us': '/#why-us',
  '/process': '/#process',
  '/insights': '/blogs',
  '/privacy': '/privacy-policy',
  '/terms-and-conditions': '/terms',
};

export function resolveRedirect(path: string): string | null {
  const normalized = path.toLowerCase().replace(/\/$/, '');
  return REDIRECT_MAP[normalized] || null;
}
