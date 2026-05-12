'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { timeline } from '@/lib/data';

const typeColors = {
  education: 'border-cyber-blue bg-cyber-blue/10 text-cyber-blue',
  career: 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan',
  achievement: 'border-cyber-gold bg-cyber-gold/10 text-cyber-gold',
};

const dotColors = {
  education: 'bg-cyber-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]',
  career: 'bg-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]',
  achievement: 'bg-cyber-gold shadow-[0_0_10px_rgba(245,158,11,0.5)]',
};

export default function Timeline() {
  return (
    <section id="timeline" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-gold tracking-[0.3em] uppercase"
          >
            07 — Timeline
          </motion.span>
          <AnimatedText
            text="The Journey So Far"
            className="heading-lg mt-3 justify-center"
          />
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-cyan/30 via-cyber-purple/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-4 md:left-auto top-2 w-3 h-3 rounded-full ${dotColors[item.type]} ${
                      isLeft ? 'md:right-0 md:translate-x-[calc(50%+0.5px)]' : 'md:left-0 md:-translate-x-[calc(50%+0.5px)]'
                    }`}
                  />

                  {/* Year badge */}
                  <span className="text-xs font-mono text-white/30">{item.year}</span>

                  <h3 className="text-sm font-semibold text-white mt-1">{item.title}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{item.description}</p>

                  <span
                    className={`inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full border ${typeColors[item.type]}`}
                  >
                    {item.type}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
