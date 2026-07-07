import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.from(el.querySelector('.eyebrow'), {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
      .from(
        el.querySelector('.title'),
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .from(
        el.querySelector('.subtitle'),
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <p className="eyebrow font-mono text-xs uppercase tracking-[0.15em] text-teal-data mb-4">
        {eyebrow}
      </p>
      <h2 className="title font-display text-4xl md:text-5xl lg:text-[56px] font-semibold text-primary-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="subtitle mt-4 text-lg md:text-xl text-secondary-text max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
