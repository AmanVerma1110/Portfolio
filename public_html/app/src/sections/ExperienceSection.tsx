import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Project Lead',
    company: 'vivo India',
    date: 'Jul 2018 – Present',
    location: 'Greater Noida, India',
    bullets: [
      'Spearheaded joint projects with top Indian IoT OEMs and major financial institutions',
      'Led market research, competitive benchmarking, and product launches across 5 South Asian markets',
      'Integrated Generative AI features into product lines; managed 1000+ participant beta ecosystems',
      'Increased team productivity by 40% through PMP methodologies and Agile optimization',
    ],
  },
  {
    role: 'QA Analyst',
    company: 'Xiaomi',
    date: 'Dec 2017 – Jun 2018',
    location: 'Gurugram, India',
    bullets: [
      'Collaborated with engineering teams to troubleshoot critical path issues and shorten release cycles',
      'Managed cross-platform technical environments for seamless deployment of mobile applications',
    ],
  },
  {
    role: 'QA Analyst',
    company: 'Samsung India',
    date: 'Dec 2016 – Nov 2017',
    location: 'Greater Noida, India',
    bullets: [
      'Assisted in transitioning to Agile development, shortening release cycles by 3 weeks',
      'Supported test environments for 15+ default mobile applications',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll('.timeline-card');
    if (!cards) return;

    cards.forEach((card) => {
      gsap.from(card, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });

    const line = cardsRef.current?.querySelector('.timeline-line');
    if (line) {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 bg-dark-slate"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="CAREER JOURNEY"
          title="Experience"
          subtitle="From QA foundations to Program Leadership — 9.5 years of building and shipping products at scale."
        />

        <div ref={cardsRef} className="relative" style={{ perspective: '1000px' }}>
          <div className="timeline-line absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-data/60 via-teal-data/30 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="timeline-card relative pl-16 md:pl-20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute left-3 md:left-5 top-6 w-6 h-6 rounded-full border-2 border-teal-data bg-deep-navy flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-data" />
                </div>

                <div className="glass-card glass-card-hover rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-data/10">
                      <Briefcase className="text-teal-data" size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <h3 className="text-xl md:text-2xl font-medium text-primary-text">
                          {exp.role}
                        </h3>
                        <span className="text-sm text-secondary-text font-mono whitespace-nowrap">
                          {exp.date}
                        </span>
                      </div>

                      <p className="mt-1 text-base text-teal-data font-medium">
                        {exp.company}
                      </p>

                      <p className="text-sm text-secondary-text mt-1">
                        {exp.location}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="text-sm md:text-base text-secondary-text leading-relaxed pl-4 border-l-2 border-teal-data/30"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
