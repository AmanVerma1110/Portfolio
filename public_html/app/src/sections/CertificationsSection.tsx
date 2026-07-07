import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: 'Project Management Professional (PMP)',
    badge: 'PMP',
    issuer: 'Project Management Institute',
    date: 'Aug 2024',
    link: 'https://www.credly.com/badges/4511d027-1fbe-4eee-b5e9-7f67a318a055/public_url',
    accent: 'amber',
    accentColor: '#C8963E',
  },
  {
    title: 'Certified Scrum Product Owner (CSPO)',
    badge: 'CSPO',
    issuer: 'Scrum Alliance',
    date: 'March 2025',
    link: 'https://bcert.me/bc/html/show-badge.html?b=uezcrpum',
    accent: 'teal',
    accentColor: '#2DD4BF',
  },
  {
    title: 'Career Essentials in Business Analysis',
    badge: 'BA',
    issuer: 'Microsoft & LinkedIn',
    date: 'Dec 2023',
    link: 'https://www.linkedin.com/learning/certificates/019d74bae7f9175b128fd9744f1b7c730f37e339d35b6a72a19c241b1560382c',
    accent: 'blue',
    accentColor: '#3B82F6',
  },
  {
    title: 'Internal Certified Trainer',
    badge: 'TRAINER',
    issuer: 'vivo India',
    date: '2024–2025',
    link: '#',
    accent: 'green',
    accentColor: '#22C55E',
  },
];

function CredentialCard({
  cert,
}: {
  cert: (typeof certifications)[0];
}) {
  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card group block rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'rgba(26, 35, 50, 0.8)',
        border: `1px solid ${cert.accentColor}30`,
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cert.accentColor}60`;
        e.currentTarget.style.boxShadow = `0 0 40px ${cert.accentColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${cert.accentColor}30`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Badge Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${cert.accentColor}15` }}
      >
        <span
          className="font-mono text-lg font-bold"
          style={{ color: cert.accentColor }}
        >
          {cert.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-primary-text leading-snug mb-2">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="text-sm text-secondary-text">{cert.issuer}</p>

      {/* Date */}
      <p className="text-sm text-secondary-text mt-1">{cert.date}</p>

      {/* Verify Link */}
      <div className="mt-6 flex items-center gap-2">
        <span
          className="text-sm font-mono flex items-center gap-1 transition-colors duration-200"
          style={{ color: cert.accentColor }}
        >
          Verify
          <ExternalLink size={14} />
        </span>
      </div>
    </a>
  );
}

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.cert-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 md:py-32 bg-deep-navy"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="VALIDATED EXPERTISE"
          title="Certifications"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {certifications.map((cert, index) => (
            <CredentialCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
