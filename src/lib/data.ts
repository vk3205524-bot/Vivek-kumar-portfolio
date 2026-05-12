/* ──── Profile ──── */
export const profile = {
  name: 'Vivek Kumar',
  title: 'AI Agent Developer & Automation Architect',
  tagline: 'Building intelligent automation systems that transform businesses — from AI agents to WhatsApp bots to 3D web experiences.',
  email: 'vk3205524@gmail.com',
  location: 'India',
  university: 'Amity University Kolkata',
  degree: 'BCom Honours',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/vivek-kumar',
    linkedin: 'https://linkedin.com/in/vivek-kumar',
    twitter: 'https://twitter.com/vivek_kumar',
  },
  roles: [
    'AI Agent Developer',
    'n8n Automation Developer',
    'WhatsApp Automation Specialist',
    'Gmail Automation Builder',
    'AI Call Agent Developer',
    'AI Integration Specialist',
    'Finance & Accounting Student',
    'Web Developer',
    '3D Resume Developer',
  ],
};

/* ──── Navigation ──── */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Work', href: '#ai-work' },
  { label: 'Contact', href: '#contact' },
];

/* ──── Skills ──── */
export interface Skill {
  name: string;
  category: string;
  level: number;
  icon: string;
  color: string;
}

export const skills: Skill[] = [
  { name: 'AI Agent Development',    category: 'AI',        level: 92, icon: '🤖', color: '#00f0ff' },
  { name: 'n8n Workflow Automation', category: 'AI',        level: 90, icon: '⚡', color: '#8b5cf6' },
  { name: 'WhatsApp Automation',     category: 'AI',        level: 88, icon: '💬', color: '#25D366' },
  { name: 'Gmail Automation',        category: 'AI',        level: 85, icon: '📧', color: '#EA4335' },
  { name: 'AI Calling Agents',       category: 'AI',        level: 82, icon: '📞', color: '#3b82f6' },
  { name: 'AI Integration Systems',  category: 'AI',        level: 88, icon: '🔗', color: '#ec4899' },
  { name: 'AI Workflow Engineering', category: 'AI',        level: 86, icon: '⚙️', color: '#f59e0b' },
  { name: 'Web Development',         category: 'Code',      level: 80, icon: '🌐', color: '#00f0ff' },
  { name: '3D Resume Development',   category: 'Code',      level: 78, icon: '🎮', color: '#8b5cf6' },
  { name: 'API Integrations',        category: 'Code',      level: 85, icon: '🔌', color: '#3b82f6' },
  { name: 'No-Code Automation',      category: 'Tools',     level: 92, icon: '🧩', color: '#10b981' },
  { name: 'CRM Automation',          category: 'Tools',     level: 80, icon: '📊', color: '#f59e0b' },
  { name: 'Automation Architecture', category: 'Tools',     level: 85, icon: '🏗️', color: '#ec4899' },
  { name: 'AI Content Systems',      category: 'AI',        level: 83, icon: '✍️', color: '#10b981' },
  { name: 'Accounting',              category: 'Finance',   level: 82, icon: '📋', color: '#f59e0b' },
  { name: 'Finance',                 category: 'Finance',   level: 80, icon: '💰', color: '#10b981' },
  { name: 'Tally + AI Integration',  category: 'Finance',   level: 78, icon: '🧮', color: '#8b5cf6' },
  { name: 'Business Workflow Systems', category: 'Tools',   level: 84, icon: '🏢', color: '#3b82f6' },
];

/* ──── Experience ──── */
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: 'AI Agent & Workflow Developer',
    company: 'Freelance',
    period: '2025 – Present',
    description: 'Building intelligent automation systems using n8n, AI agents, WhatsApp APIs, Gmail automation, AI integrations, workflow automations, and AI business systems. Designing end-to-end pipelines that eliminate manual work.',
    tags: ['n8n', 'AI Agents', 'WhatsApp API', 'Gmail', 'Automation', 'AI Integration'],
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    period: '2024 – Present',
    description: 'Developing modern websites, interactive UI systems, 3D portfolio experiences, and AI-integrated web applications. Specializing in immersive digital experiences that showcase cutting-edge technology.',
    tags: ['React', 'Next.js', 'Three.js', '3D Web', 'TypeScript'],
  },
  {
    role: 'Finance & Accounting Student',
    company: 'Amity University Kolkata',
    period: '2022 – Present',
    description: 'Studying accounting systems, finance management, Tally, and commerce operations. Pioneering AI integration into accounting workflows — bridging traditional finance with modern automation.',
    tags: ['BCom Honours', 'Tally', 'Finance', 'Accounting', 'AI + Finance'],
  },
];

/* ──── Projects ──── */
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured: boolean;
  status?: string;
}

export const projects: Project[] = [
  {
    title: 'AI Reel Factory',
    description: 'AI-powered automated reel generation system — generates short-form content automatically using AI voice, scripts, automated video workflows, and social media content pipelines.',
    tags: ['AI Agents', 'Video Gen', 'n8n', 'Automation'],
    featured: true,
    status: 'Working On',
  },
  {
    title: 'WhatsApp AI Agent',
    description: 'Intelligent WhatsApp automation system capable of auto replies, AI conversations, lead handling, and business workflow automation via WhatsApp Business API.',
    tags: ['WhatsApp API', 'AI Agent', 'NLP', 'CRM'],
    featured: true,
  },
  {
    title: 'Gmail Automation Agent',
    description: 'Workflow system that sends automatic emails, handles smart replies, automates notifications, and connects with AI workflows for intelligent email management.',
    tags: ['Gmail API', 'n8n', 'AI', 'Email Automation'],
    featured: true,
  },
  {
    title: 'AI Workflow Systems',
    description: 'Advanced workflow automation using n8n, APIs, AI integrations, and business process automations — streamlining complex multi-step operations.',
    tags: ['n8n', 'API', 'AI Integration', 'Automation'],
    featured: false,
  },
  {
    title: '3D Interactive Resume',
    description: 'This very website — a cinematic 3D portfolio built with React Three Fiber, featuring interactive objects, scroll-driven cameras, and holographic UI.',
    tags: ['Three.js', 'R3F', 'Next.js', 'GSAP'],
    featured: false,
  },
];

/* ──── Certifications ──── */
export interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export const certifications: Certification[] = [
  { title: 'AI Agent Development', issuer: 'Industry', year: '2025', icon: '🤖' },
  { title: 'n8n Workflow Automation Expert', issuer: 'n8n.io', year: '2025', icon: '⚡' },
  { title: 'WhatsApp Business API', issuer: 'Meta', year: '2025', icon: '💬' },
  { title: 'Prompt Engineering', issuer: 'Anthropic', year: '2025', icon: '✍️' },
  { title: 'Web Development', issuer: 'Industry', year: '2024', icon: '🌐' },
  { title: 'Tally ERP 9 Certified', issuer: 'Tally Solutions', year: '2023', icon: '📋' },
];

/* ──── Timeline (journey) ──── */
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'career' | 'achievement';
}

export const timeline: TimelineItem[] = [
  { year: '2022', title: 'Started BCom Honours', description: 'Began studying commerce, accounting, and finance at Amity University Kolkata.', type: 'education' },
  { year: '2023', title: 'Discovered AI Automation', description: 'Built first n8n workflow, automating a 4-hour manual task into 10 minutes.', type: 'achievement' },
  { year: '2024', title: 'Web Development Journey', description: 'Started building modern websites and interactive web applications.', type: 'career' },
  { year: '2024', title: 'First AI Agent', description: 'Built an autonomous AI agent for business workflow automation.', type: 'achievement' },
  { year: '2025', title: 'WhatsApp & Gmail Automation', description: 'Developed intelligent WhatsApp bots and Gmail automation agents for businesses.', type: 'achievement' },
  { year: '2025', title: 'AI Reel Factory', description: 'Architecting an AI-powered automated content generation pipeline.', type: 'achievement' },
  { year: '2025', title: '3D Interactive Resume', description: 'Built this cinematic 3D portfolio — combining AI, web dev, and interactive storytelling.', type: 'career' },
];

/* ──── Hotspot config for 3D scene ──── */
export interface Hotspot {
  id: string;
  label: string;
  section: string;
  position: [number, number, number];
  color: string;
}

export const hotspots: Hotspot[] = [
  { id: 'about',    label: 'About',       section: '#about',      position: [3, 1, 0],    color: '#00f0ff' },
  { id: 'skills',   label: 'Skills',      section: '#skills',     position: [-3, 1, 0],   color: '#8b5cf6' },
  { id: 'projects', label: 'Projects',    section: '#projects',   position: [0, 1, 3],    color: '#f59e0b' },
  { id: 'exp',      label: 'Experience',  section: '#experience', position: [0, 1, -3],   color: '#3b82f6' },
  { id: 'ai',       label: 'AI Work',     section: '#ai-work',    position: [2, 2.5, 2],  color: '#ec4899' },
  { id: 'contact',  label: 'Contact',     section: '#contact',    position: [-2, 2.5, -2],color: '#10b981' },
];
