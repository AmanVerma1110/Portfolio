import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Business & Strategy',
    borderColor: 'border-amber-glow',
    skills:
      'Program & Project Management · Strategic Partnerships · B2B Stakeholder Management · Market Research & Benchmarking · Cross-functional Leadership',
  },
  {
    title: 'Technical & Data',
    borderColor: 'border-teal-data',
    skills:
      'Python · SQL · Generative AI & LLMs · IoT Integration · Connectivity Technologies · Mobile Ecosystems · LLM-AI Quality',
  },
  {
    title: 'Tools & Methods',
    borderColor: 'border-primary-text',
    skills: 'Jira · Microsoft Project · Power BI · Agile Methodologies · PMP · CSPO',
  },
];

const innerRing = ['Python', 'SQL', 'Jira', 'Power BI'];
const middleRing = ['Agile', 'PMP', 'CSPO', 'GenAI', 'IoT', 'LLM'];
const outerRing = [
  'Stakeholder Mgmt',
  'Market Research',
  'GTM Strategy',
  'Quality Assurance',
  'Product Mgmt',
  'Cross-functional Lead',
];

function OrbitalRings() {
  const renderRing = (
    items: string[],
    radius: number,
    animationClass: string,
    duration: number
  ) => {
    return (
      <div
        className={`absolute ${animationClass}`}
        style={{
          width: radius * 2,
          height: radius * 2,
          animationDuration: `${duration}s`,
        }}
      >
        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = radius + radius * Math.cos(rad) - 40;
          const y = radius + radius * Math.sin(rad) - 12;

          return (
            <div
              key={i}
              className="absolute text-xs font-mono text-secondary-text hover:text-primary-text transition-colors duration-200 cursor-default whitespace-nowrap px-2 py-1 rounded-full bg-charcoal/80 border border-teal-data/20 hover:border-teal-data/50"
              style={{
                left: x,
                top: y,
                animationName: animationClass.includes('ccw')
                  ? 'orbit-ccw'
                  : 'orbit-cw',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDirection: 'reverse',
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-[500px] h-[500px] mx-auto hidden lg:block">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-teal-data/5 blur-3xl" />

      {/* Center point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-data/50" />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderRing(innerRing, 80, 'animate-orbit-cw', 30)}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderRing(middleRing, 150, 'animate-orbit-ccw', 45)}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderRing(outerRing, 220, 'animate-orbit-cw-slow', 60)}
      </div>

      {/* Decorative circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-teal-data/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-teal-data/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-teal-data/10" />
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const leftCol = sectionRef.current?.querySelector('.skills-left');
    const rightCol = sectionRef.current?.querySelector('.skills-right');

    if (leftCol) {
      gsap.from(leftCol, {
        x: -60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    if (rightCol) {
      gsap.from(rightCol, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 bg-dark-slate overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left Column */}
          <div className="skills-left lg:w-[45%]">
            <SectionHeader
              eyebrow="CORE COMPETENCIES"
              title="Skills & Expertise"
              subtitle="A dual-track competency spanning business strategy and technical depth — enabling me to translate between engineering teams and executive stakeholders with fluency."
            />

            <div className="mt-12 space-y-8">
              {skillCategories.map((cat, i) => (
                <div
                  key={i}
                  className={`pl-5 border-l-[3px] ${cat.borderColor}`}
                >
                  <h4 className="text-lg font-medium text-primary-text mb-2">
                    {cat.title}
                  </h4>
                  <p className="text-sm md:text-base text-secondary-text leading-relaxed">
                    {cat.skills}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Orbital Rings */}
          <div className="skills-right lg:w-[55%] flex items-center justify-center">
            <OrbitalRings />

            {/* Mobile fallback - skill tags */}
            <div className="lg:hidden flex flex-wrap gap-2">
              {[
                ...innerRing,
                ...middleRing,
                ...outerRing,
              ].map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full border border-teal-data/30 text-teal-data bg-teal-data/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
