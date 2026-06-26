import { cmsApi } from '@/config/api'
import NavbarClient from './NavbarClient'
import { getHeaderNavLinks } from "@/config/header-menu";

interface NavLink {
    id: string
    href: string
    label: string
    children?: NavLink[]
}

interface CmsMenuItem {
    id: string
    parent_id: string | null
    url: string
    type?: string
    slug?: string
    label?: string
    translations?: { language_code: string; label: string }[]
    children?: CmsMenuItem[]
}

const FALLBACK_LINKS = getHeaderNavLinks();

function buildMenuTree(items: CmsMenuItem[]): NavLink[] {
    return items.map(item => {
        const label = item.label || item.translations?.find(t => t.language_code === 'en')?.label || 'Untitled'

        let href = item.url
        if (!href) {
            if (item.type === 'category' && item.slug) {
                href = `/blogs/category/${item.slug}`
            } else if (item.type === 'post' && item.slug) {
                href = `/${item.slug}`
            } else {
                const lowerLabel = label.toLowerCase().trim()
                if (['home'].includes(lowerLabel)) href = '/'
                else if (['about'].includes(lowerLabel)) href = '/about'
                else if (['contact'].includes(lowerLabel)) href = '/contact'
                else if (['blog', 'blogs'].includes(lowerLabel)) href = '/blog'
                else if (['how it works'].includes(lowerLabel)) href = '/how-it-works'
                else if (['multime', 'app'].includes(lowerLabel)) href = '/multime'
                else href = '#'
            }
        }

        return {
            id: item.id || Math.random().toString(36).substr(2, 9),
            href: href,
            label: label,
            children: item.children && item.children.length > 0 ? buildMenuTree(item.children) : []
        }
    })
}

export default async function Navbar() {
    try {
        const res = await cmsApi.getMenu('header-menu')

        if (res?.data?.items && res.data.items.length > 0) {
            const dynamicLinks = buildMenuTree(res.data.items)
            
            // Check if Home exists
            const hasHome = dynamicLinks.some(link => 
                link.href === '/' || link.label.toLowerCase() === 'home'
            )

            const finalLinks = hasHome ? dynamicLinks : [{ id: 'nav-home', href: '/', label: 'Home' }, ...dynamicLinks]
            console.log('[Navbar] Loaded from CMS:', finalLinks.length, 'items')
            return <NavbarClient navLinks={finalLinks} />
        }
    } catch (err) {
        console.error('Failed to load menu from CMS:', err)
    }

    console.log('[Navbar] Using Fallback Menu')
    return <NavbarClient navLinks={FALLBACK_LINKS} />
}
