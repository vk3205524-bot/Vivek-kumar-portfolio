'use client';

import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/20 font-mono">
          © {new Date().getFullYear()} {profile.name}. Crafted with AI & passion.
        </p>
        <div className="flex gap-6">
          {Object.entries(profile.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-cyber-cyan transition-colors capitalize"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
