'use client';

import { usePathname } from 'next/navigation';

/**
 * Routes that ship their own header and must not also get the site navbar.
 * `/voice-creator` is a self-contained landing page: it renders the same fixed
 * header the multi-locale strongbody.ai build uses, and two stacked fixed bars
 * would cover the hero.
 */
const BARE_ROUTES = ['/voice-creator'];

export default function ChromeSlot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );

  return bare ? null : <>{children}</>;
}
