'use client';

import Lenis from 'lenis';
import { motion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useRef } from 'react';

/* ── scroll-triggered reveal ─────────────────────────────────────────── */

type RevealProps = Omit<HTMLMotionProps<'div'>, 'ref'> & { delay?: number };

/**
 * Fades + lifts content into view once, on scroll.
 *
 * Local to this route rather than the shared `@/components/animations/Reveal`:
 * this one travels further (34px vs 20px), takes longer, and accepts the extra
 * motion props the landing page passes through.
 */
export function Reveal({ children, delay = 0, className, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.7, ease: [0, 0, 0.3642, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ── parallax zoom image ─────────────────────────────────────────────── */

type ScaleImgProps = {
  src: string;
  alt: string;
  from?: number;
  to?: number;
  className?: string;
  imgClassName?: string;
  /** Set on the LCP image so the browser fetches it immediately. */
  eager?: boolean;
};

/**
 * The frame clips the overflow while the inner image scales as it travels
 * through the viewport — the depth cue that makes a flat section feel alive.
 */
export function ScaleImg({
  src,
  alt,
  from = 1.18,
  to = 1,
  className = '',
  imgClassName = '',
  eager = false,
}: ScaleImgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={`h-full w-full overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={{ scale }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ── smooth scrolling + progress bar ─────────────────────────────────── */

/**
 * Lenis smooth scrolling, the fixed progress bar and smooth in-page anchors
 * (`<a data-scroll-to="#id">`). Skipped entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.querySelector<HTMLElement>('.vc-progress-bar');

    if (prefersReduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      if (bar) bar.style.width = `${lenis.progress * 100}%`;
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-scroll-to]');
      const id = link?.getAttribute('data-scroll-to');
      if (!id) return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/* ── decorative waveform ─────────────────────────────────────────────── */

/**
 * Bars are seeded from their index (never `Math.random`) so the server and the
 * client render the same markup — a mismatch here would blow up hydration.
 */
export function Waveform({
  bars = 32,
  className = '',
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div className={`vc-wave ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, index) => {
        const height = 26 + ((index * 37) % 74);
        const duration = 0.7 + ((index * 13) % 9) / 10;
        return (
          <span
            key={index}
            style={{
              height: `${height}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${((index * 7) % 11) / 10}s`,
            }}
          />
        );
      })}
    </div>
  );
}
