import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  Github,
  FileText,
  Award,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: Mail,
    label: 'aman.verma1796@gmail.com',
    href: 'mailto:aman.verma1796@gmail.com',
  },
  {
    icon: Phone,
    label: '+91 8004668544',
    href: 'tel:+918004668544',
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/amanvpmp',
    href: 'https://linkedin.com/in/amanvpmp/',
  },
  {
    icon: Globe,
    label: 'amanverma.net',
    href: 'https://amanverma.net/',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/AmanVerma1110/JAVA', label: 'GitHub' },
  {
    icon: FileText,
    href: 'https://drive.google.com/drive/folders/1Haf0sBOpy6GfcDlXhE4vu4CMqweQZjbw?usp=sharing',
    label: 'Notebooks',
  },
  {
    icon: Award,
    href: 'https://www.credly.com/badges/4511d027-1fbe-4eee-b5e9-7f67a318a055/public_url',
    label: 'PMP Badge',
  },
  {
    icon: GraduationCap,
    href: 'https://bcert.me/bc/html/show-badge.html?b=uezcrpum',
    label: 'CSPO Badge',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const leftCol = sectionRef.current?.querySelector('.contact-left');
    const rightCol = sectionRef.current?.querySelector('.contact-right');

    if (leftCol) {
      gsap.from(leftCol, {
        x: -60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    if (rightCol) {
      gsap.from(rightCol, {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: '#0D1B2A',
      }}
    >
      {/* Amber glow in top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(200,150,62,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
          {/* Left Column */}
          <div className="contact-left lg:w-[60%]">
            <SectionHeader
              eyebrow="LET'S CONNECT"
              title="Open to Strategic Leadership Roles"
              subtitle="Seeking opportunities to drive complex technical programs, lead cross-functional teams, and deliver transformative product experiences at the intersection of mobile, IoT, and AI."
            />

            <a
              href="mailto:aman.verma1796@gmail.com"
              className="inline-block mt-8 px-10 py-4 rounded-full bg-amber-glow text-deep-navy font-medium transition-all duration-200 hover:bg-amber-light hover:scale-[1.02]"
            >
              Start a Conversation
            </a>
          </div>

          {/* Right Column - Contact Card */}
          <div className="contact-right lg:w-[40%]">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(26, 35, 50, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(45, 212, 191, 0.2)',
              }}
            >
              {/* Profile Row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-data/30 flex-shrink-0">
                  <img
                    src="/images/me.jpg"
                    alt="Aman Verma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary-text">
                    Aman Verma
                  </h3>
                  <p className="text-sm text-secondary-text mt-0.5">
                    Program Lead · PMP · CSPO
                  </p>
                </div>
              </div>

              {/* Contact Items */}
              <div className="space-y-5">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-teal-data/10 flex items-center justify-center flex-shrink-0">
                        <Icon
                          className="text-teal-data transition-transform duration-200 group-hover:scale-110"
                          size={18}
                        />
                      </div>
                      <span className="text-sm md:text-base text-primary-text group-hover:text-teal-data transition-colors duration-200">
                        {item.label}
                      </span>
                      {item.href.startsWith('http') && (
                        <ExternalLink
                          size={14}
                          className="text-secondary-text opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-teal-data/10">
                <p className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-4">
                  Resources
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="w-11 h-11 rounded-full bg-charcoal border border-teal-data/30 flex items-center justify-center text-teal-data transition-all duration-200 hover:bg-teal-data/20 hover:border-teal-data/60 hover:scale-110"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
