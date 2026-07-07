import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import {
  Globe,
  Wifi,
  RefreshCw,
  Brain,
  Shield,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'vivo/iQOO Market Readiness & Ecosystem Program',
    metric: '40% fewer escalations',
    tags: ['GTM', 'South Asia', 'Stakeholder Management'],
    tagColors: ['teal', 'teal', 'amber'],
    description:
      'Spearheaded Go-to-Market readiness for vivo and iQOO in India. Cultivated and managed an ecosystem of 1000+ external stakeholders with structured communication channels. Drove strategic product improvements that reduced post-launch market escalations by 40%.',
    image: '/images/project-market-readiness.jpg',
    icon: Globe,
  },
  {
    title: 'South Asia Connectivity & IoT Integration Initiative',
    metric: '5 markets unified',
    tags: ['IoT', '4G/5G', 'Telecommunication'],
    tagColors: ['teal', 'teal', 'teal'],
    description:
      'Led regional telecommunication and localization strategy across five South Asian markets. Orchestrated integration of wearables, third-party applications, and secure banking platforms with seamless network performance.',
    image: '/images/project-iot-connectivity.jpg',
    icon: Wifi,
  },
  {
    title: 'OTA Lifecycle & Product Quality Management',
    metric: 'Critical modules managed',
    tags: ['OTA', 'Quality Assurance', 'Deployment'],
    tagColors: ['teal', 'amber', 'teal'],
    description:
      'Managed software lifecycle and pre-OTA deployment validation for critical device modules including Network Adapters, Power Management, and System Performance. Facilitated resolution of critical field issues between regional teams and global developers.',
    image: '/images/project-ota-lifecycle.jpg',
    icon: RefreshCw,
  },
  {
    title: 'AI Integration & Next-Gen Digital Experiences',
    metric: '4 AI features shipped',
    tags: ['Generative AI', 'LLM', 'Product Innovation'],
    tagColors: ['teal', 'teal', 'amber'],
    description:
      'Led commercial integration of AI Note Assist, AI Transcript Assist, AI Erase & Color Adjustment, and AI Global Translation into flagship Funtouch OS for premium device series — deploying consumer-facing AI at scale.',
    image: '/images/project-ai-integration.jpg',
    icon: Brain,
  },
  {
    title: 'Semiconductor-Level Security Initiative',
    metric: '120+ products secured',
    tags: ['Security', 'MTK', 'Supply Chain'],
    tagColors: ['amber', 'teal', 'amber'],
    description:
      'Investigated local supply chains to identify hardware-level vulnerabilities. Collaborated with global R&D to develop and deploy an MTK chipset-level security patch across 120+ commercial products.',
    image: '/images/project-semiconductor-security.jpg',
    icon: Shield,
  },
  {
    title: 'vivo AI Feature Quality Program',
    metric: 'LLM-AI Quality',
    tags: ['AI QA', 'Feature Testing', 'Automation'],
    tagColors: ['teal', 'amber', 'teal'],
    description:
      'Established quality frameworks for AI-powered features in vivo devices. Defined test strategies for LLM-based features ensuring accuracy, performance, and user experience across diverse South Asian languages and use cases.',
    image: '/images/project-ai-quality.jpg',
    icon: CheckCircle,
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const Icon = project.icon;

  return (
    <div
      className="project-card group relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        height: '220px',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.height = '440px';
        card.style.transform = 'translateY(-12px)';
        card.style.zIndex = '10';
        card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.height = '220px';
        card.style.transform = 'translateY(0)';
        card.style.zIndex = '1';
        card.style.boxShadow = 'none';
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.95)] via-[rgba(10,22,40,0.7)] to-[rgba(10,22,40,0.3)] group-hover:from-[rgba(10,22,40,0.95)] group-hover:via-[rgba(10,22,40,0.85)]" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-teal-data/20 flex items-center justify-center mb-3">
          <Icon className="text-teal-data" size={20} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-primary-text leading-snug">
          {project.title}
        </h3>

        {/* Metric */}
        <p className="mt-1 font-mono text-sm text-teal-data">{project.metric}</p>

        {/* Expandable Content */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{
            maxHeight: '0px',
            opacity: 0,
            transition: 'max-height 0.4s ease 0.1s, opacity 0.3s ease 0.15s',
          }}
          ref={(el) => {
            if (!el) return;
            const parent = el.parentElement?.parentElement;
            if (!parent) return;
            const observer = new MutationObserver(() => {
              const isExpanded = parent.style.height === '440px';
              el.style.maxHeight = isExpanded ? '200px' : '0px';
              el.style.opacity = isExpanded ? '1' : '0';
            });
            observer.observe(parent, { attributes: true, attributeFilter: ['style'] });
          }}
        >
          <p className="mt-3 text-sm text-secondary-text leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full border ${
                  project.tagColors[i] === 'amber'
                    ? 'border-amber-glow/40 text-amber-glow bg-amber-glow/10'
                    : 'border-teal-data/40 text-teal-data bg-teal-data/10'
                }`}
                style={{
                  transitionDelay: `${0.2 + i * 0.05}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
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
      id="projects"
      className="relative py-24 md:py-32 bg-deep-navy"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="IMPACT DELIVERED"
          title="Key Projects"
          subtitle="Select initiatives that demonstrate end-to-end program leadership at scale."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
