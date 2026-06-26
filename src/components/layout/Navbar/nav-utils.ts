export function normalizeNavHref(href: string): string {
  if (!href || href === "#") return "#";

  let path = href.trim();
  if (path.startsWith("#")) return "#";

  try {
    if (/^https?:\/\//i.test(path)) {
      const url = new URL(path);
      if (url.hash && (url.pathname === "/" || url.pathname === "")) return "#";
      path = url.pathname;
    }
  } catch {
    /* keep */
  }

  const hashIndex = path.indexOf("#");
  if (hashIndex >= 0) {
    const beforeHash = path.slice(0, hashIndex);
    if (!beforeHash || beforeHash === "/") return "#";
    path = beforeHash;
  }

  path = path.split("?")[0];
  if (path !== "/" && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

function isRootHref(href: string): boolean {
  return normalizeNavHref(href) === "/";
}

function isSubmenuHrefActive(pathname: string, href: string): boolean {
  const target = normalizeNavHref(href);
  if (target === "#" || target === "/") return false;
  return isNavLinkActive(pathname, href);
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const current = normalizeNavHref(pathname);
  const target = normalizeNavHref(href);
  if (target === "#") return false;
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function isMeaningfulParentHref(href: string): boolean {
  const target = normalizeNavHref(href);
  return target !== "#" && target !== "/";
}

export function isNavGroupActive(
  pathname: string,
  href: string,
  children?: { href: string }[],
): boolean {
  if (children?.length) {
    const childActive = children.some((c) => isSubmenuHrefActive(pathname, c.href));
    if (childActive) return true;
    return isMeaningfulParentHref(href) && isNavLinkActive(pathname, href);
  }
  return isNavLinkActive(pathname, href);
}

export function isNavDropdownChildActive(pathname: string, href: string): boolean {
  return isSubmenuHrefActive(pathname, href);
}

export function isNavHomeActive(pathname: string, href: string): boolean {
  return isRootHref(href) && isNavLinkActive(pathname, href);
}
