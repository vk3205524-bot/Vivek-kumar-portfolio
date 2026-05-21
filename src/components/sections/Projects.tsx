'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/lib/data';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-gold tracking-[0.3em] uppercase"
          >
            04 — Projects
          </motion.span>
          <AnimatedText
            text="Featured Work"
            className="heading-lg mt-3"
          />
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featured.map((project, i) => (
            <GlassCard key={project.title} delay={i * 0.12} className="group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-white/20">0{i + 1}</span>
                  {project.status && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.status}
                    </span>
                  )}
                </div>

                {project.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-5 border border-white/10 group-hover:border-cyber-cyan/30 transition-all duration-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                )}

                <h3 className="heading-md text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                  {project.title}
                </h3>

                <p className="body-text text-sm flex-1 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <MagneticButton href={project.link} variant="ghost" className="self-start text-xs">
                    View Project →
                  </MagneticButton>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((project, i) => (
              <GlassCard key={project.title} delay={0.4 + i * 0.1} className="flex items-start gap-4">
                <span className="text-xl mt-1">🔗</span>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{project.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{project.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
