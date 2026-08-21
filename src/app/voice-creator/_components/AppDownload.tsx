import { APP_DOWNLOAD_URL } from '@/config/links';

const GooglePlayIcon = () => (
  <svg width="22" height="24" viewBox="0 0 30 33" fill="none" aria-hidden="true">
    <path
      d="M0.589795 0.507905C0.219104 0.901783 0 1.51306 0 2.30465V30.5871C0 31.38 0.219104 31.99 0.589795 32.3839L0.684059 32.476L16.4658 16.6326V16.4459V16.2592L0.684059 0.414551L0.589795 0.507905Z"
      fill="#00E3FF"
    />
    <path
      d="M21.7256 21.9143L16.4658 16.6315V16.4448V16.2581L21.7268 10.9766L21.8453 11.0443L28.0783 14.5995C29.8578 15.6149 29.8578 17.2761 28.0783 18.2927L21.8453 21.8479L21.7256 21.9143Z"
      fill="#FFBD00"
    />
    <path
      d="M21.8454 21.8471L16.4646 16.4453L0.589845 32.3833C1.17582 33.0074 2.14522 33.0841 3.23691 32.4626L21.8454 21.8471Z"
      fill="#FF3A44"
    />
    <path
      d="M21.8454 11.044L3.23691 0.429781C2.14522 -0.193006 1.17582 -0.114998 0.589845 0.509069L16.4659 16.4471L21.8454 11.044Z"
      fill="#00F076"
    />
  </svg>
);

const AppStoreIcon = () => (
  <svg width="20" height="24" viewBox="0 0 28 35" fill="none" aria-hidden="true">
    <path
      d="M23.1299 18.1721C23.1637 15.5342 24.5748 13.0382 26.8134 11.6566C25.4012 9.6318 23.0358 8.34802 20.5748 8.27073C17.95 7.99414 15.4053 9.84752 14.0677 9.84752C12.7043 9.84752 10.6449 8.29819 8.42723 8.34399C5.53664 8.43775 2.84188 10.0876 1.43555 12.6246C-1.58751 17.879 0.667421 25.6012 3.56326 29.8484C5.01211 31.9282 6.7054 34.2513 8.92103 34.1689C11.0892 34.0787 11.8989 32.781 14.516 32.781C17.1089 32.781 17.8686 34.1689 20.1292 34.1165C22.4557 34.0786 23.9215 32.0275 25.3195 29.9281C26.3605 28.4462 27.1615 26.8084 27.693 25.0753C24.9589 23.9144 23.1331 21.1522 23.1299 18.1721Z"
      fill="currentColor"
    />
    <path
      d="M18.86 5.47753C20.1285 3.94879 20.7534 1.98385 20.6021 0C18.6641 0.204344 16.8739 1.1342 15.5883 2.60428C14.3311 4.04063 13.6768 5.971 13.8005 7.87902C15.7392 7.89906 17.6451 6.99441 18.86 5.47753Z"
      fill="currentColor"
    />
  </svg>
);

const STORES = [
  { key: 'play', label: 'Google Play', icon: <GooglePlayIcon /> },
  { key: 'ios', label: 'App Store', icon: <AppStoreIcon /> },
];

/**
 * The page's single conversion action, everywhere it appears: download the
 * MultiMe app and register as an Audio Creator Partner.
 *
 * Deliberately not the shared `AppDownloadBadges`: this landing page has its own
 * type scale and a dark pill treatment, and it needs the localized "download on"
 * line above each store name.
 */
export default function AppDownload({
  downloadOn,
  className = '',
  size = 'lg',
}: {
  /** Localized "Download on" line above the store name. */
  downloadOn: string;
  className?: string;
  size?: 'sm' | 'lg';
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {STORES.map(store => (
        <a
          key={store.key}
          href={APP_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download the MultiMe app on ${store.label}`}
          className={`flex items-center gap-3 rounded-full bg-[#2c1d5a] text-white shadow-[0_10px_26px_rgba(44,29,90,0.22)] transition-transform duration-300 hover:scale-[1.03] hover:bg-[#3a2775] focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 focus-visible:outline-none ${
            size === 'lg' ? 'px-6 py-3.5' : 'px-5 py-3'
          }`}
        >
          {store.icon}
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-medium tracking-[1px] text-white/70 uppercase">
              {downloadOn}
            </span>
            <span className={`block font-bold ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
              {store.label}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
