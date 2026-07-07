import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleNetwork from '@/components/ParticleNetwork';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(content.querySelector('.hero-photo'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(
        content.querySelector('.hero-label'),
        { opacity: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .from(
        content.querySelector('.hero-name'),
        { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .from(
        content.querySelector('.hero-creds'),
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      .from(
        content.querySelector('.hero-tagline'),
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .from(
        content.querySelector('.hero-ctas'),
        { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      .from(
        content.querySelector('.scroll-indicator'),
        { opacity: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=50%',
        pin: true,
        scrub: 0.5,
      },
    }).to(content, {
      y: -80,
      opacity: 0.2,
      ease: 'none',
    });
  }, { scope: sectionRef });

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #111827 50%, #0D1B2A 100%)',
      }}
    >
      <ParticleNetwork />

      <div
        ref={contentRef}
        className="relative z-10 max-w-[1280px] mx-auto w-full px-6 lg:px-12 pt-24 pb-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="hero-label font-mono text-xs uppercase tracking-[0.15em] text-teal-data mb-6">
              Technical Program Lead
            </p>

            <h1 className="hero-name font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-primary-text leading-[1.1]">
              Aman Verma
            </h1>

            <p className="hero-creds mt-4 text-xl md:text-2xl font-medium text-amber-glow">
              PMP® · CSPO®
            </p>

            <p className="hero-tagline mt-6 text-lg md:text-xl text-secondary-text max-w-[640px] leading-relaxed mx-auto lg:mx-0">
              9.5+ Years Orchestrating Mobile Ecosystems, IoT Integration &amp; AI-First Product
              Launches Across South Asia
            </p>

            <div className="hero-ctas mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToSkills}
                className="px-8 py-3 rounded-full border border-teal-data text-teal-data font-medium text-sm transition-all duration-200 hover:bg-teal-data hover:text-deep-navy"
              >
                View Skills
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-3 rounded-full bg-amber-glow text-deep-navy font-medium text-sm transition-all duration-200 hover:bg-amber-light hover:scale-[1.02]"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hero-photo flex-shrink-0">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-teal-data/30 via-amber-glow/20 to-teal-data/10 blur-xl" />
              
              {/* Photo container */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-teal-data/30"
                style={{
                  boxShadow: '0 0 60px rgba(45, 212, 191, 0.15), 0 0 120px rgba(200, 150, 62, 0.1)',
                }}
              >
                <img
                  src="/images/me.jpg"
                  alt="Aman Verma"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-2 -right-2 md:right-4 bg-charcoal border border-teal-data/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-teal-data animate-pulse" />
                <span className="text-xs font-mono text-teal-data">Open to Work</span>
              </div>

              <div className="absolute -top-2 -left-2 md:left-2 bg-charcoal border border-amber-glow/30 rounded-full px-3 py-1.5 shadow-lg">
                <span className="text-xs font-mono text-amber-glow">9.5+ Yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-10 bg-secondary-text/50 relative overflow-hidden">
            <div className="w-full h-3 bg-teal-data rounded-full animate-scroll-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
