import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'MCA (AI / ML)',
    school: 'Amity University',
    date: '2020 – 2022',
    grade: '82%',
    description: 'Specialized in Artificial Intelligence and Machine Learning',
  },
  {
    degree: 'MBA',
    school: 'NMIMS University',
    date: 'Completed',
    grade: '72%',
    description: 'Business Administration and Strategic Management',
  },
  {
    degree: 'Bachelor of Science',
    school: 'Bundelkhand University',
    date: '2013 – 2016',
    grade: '62%',
    description: 'Foundation in Computer Science',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll('.edu-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
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
      id="education"
      className="relative py-24 md:py-32 bg-deep-navy"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="ACADEMIC FOUNDATION"
          title="Education"
          subtitle="A unique blend of technical depth and business acumen — MCA in AI/ML paired with an MBA."
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="edu-card glass-card glass-card-hover rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-glow/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-glow/20 transition-colors">
                <GraduationCap className="text-amber-glow" size={28} />
              </div>

              <h3 className="text-xl font-medium text-primary-text mb-1">
                {edu.degree}
              </h3>

              <p className="text-base text-teal-data font-medium mb-1">
                {edu.school}
              </p>

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-sm text-secondary-text font-mono">
                  {edu.date}
                </span>
                <span className="text-secondary-text/30">|</span>
                <span className="text-sm font-mono text-amber-glow">
                  {edu.grade}
                </span>
              </div>

              <p className="text-sm text-secondary-text leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
