'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, Github, Linkedin, Award, CheckCircle, Bug, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import AIChat from '../components/AIChat';

const workingProjects = [
  {
    name: 'Tracking Management System',
    domain: 'Logistics',
    summary: 'Designed and executed manual, UI, and API test suites to validate complex shipment tracking, routing algorithms, and multi-tenant inventory workflows managed via Azure DevOps.',
    tech: ['Manual Testing', 'UI Testing', 'API Testing', 'Azure DevOps'],
  },
  {
    name: 'E-Justice',
    domain: 'Legal Services',
    summary: 'Conducted robust functional, mobile, and API testing using Postman to verify secure e-filing portals, case management lifecycles, and role-based access control policies.',
    tech: ['Manual Testing', 'UI Testing', 'Postman', 'Mobile Testing'],
  },
  {
    name: 'Key2Bus',
    domain: 'Transportation',
    summary: 'Performed end-to-end mobile and API testing, validating real-time GPS coordinates, vehicle dispatching feeds, and user ticketing flows across iOS and Android devices.',
    tech: ['Mobile Testing', 'API Testing', 'GPS Tracking'],
  },
  {
    name: 'Consultant Platform',
    domain: 'Professional Services',
    summary: 'Engineered automated regression suites using Selenium WebDriver and executed load/stress tests with Gatling to ensure low-latency performance and high reliability.',
    tech: ['Selenium WebDriver', 'Gatling', 'Performance Testing'],
  },
  {
    name: 'Maktaby & Helpdesk',
    domain: 'Government',
    summary: 'Validated cross-platform ticket dispatching workflows with backend database testing using TestNG, ensuring data integrity across complex transaction cycles.',
    tech: ['Cross-platform', 'TestNG', 'Database Testing'],
  },
];

const technicalPrototypes = [
  {
    name: 'SIMA - AI-Powered Code Generation Suite',
    domain: 'AI / Developer Tools',
    summary: 'Engineered a code generation suite using LLM integration and prompt engineering to automate developer workflows.',
    tech: ['LLM Integration', 'Prompt Engineering', 'AI Automation'],
    link: 'https://siima.netlify.app/',
  },
  {
    name: 'Egxos - AI Market Predictor',
    domain: 'Algorithmic FinTech',
    summary: 'Developed Egxos, an algorithmic engine tailored for the Egyptian Stock Exchange (EGX) to forecast market trends.',
    tech: ['Financial Modeling', 'Data Analysis'],
  },
];

const skillCategories = [
  {
    title: 'Test Automation',
    skills: ['Selenium WebDriver', 'TestNG', 'SHAFT Engine', 'Appium', 'Playwright'],
  },
  {
    title: 'API & Performance',
    skills: ['RestAssured', 'Postman', 'JMeter', 'Apache Benchmark', 'Swagger'],
  },
  {
    title: 'Domain Expertise',
    skills: ['Manual Testing', 'Test Planning', 'Bug Reporting', 'Regression Testing', 'ISTQB Methodology'],
  },
  {
    title: 'Development & Tools',
    skills: ['Java', 'Git & GitHub', 'JIRA', 'Jenkins', 'SQL'],
  },
];

/* ─── Bug Finder Animation ─── */
function BugFinderAnimation() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square rounded overflow-hidden bg-[#23262f] border border-[#333333] flex flex-col shadow-2xl">
      {/* Mock IDE Window Header */}
      <div className="w-full h-12 bg-[#1a1c23] border-b border-[#333333] flex items-center px-6 gap-3 z-20 relative">
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <span className="ml-4 text-gray-500 text-xs font-mono tracking-widest">test_runner.java</span>
      </div>

      {/* Code Blocks Area */}
      <div className="w-full flex-grow p-10 flex flex-col gap-8 relative z-10 overflow-hidden bg-[#23262f]">
        {/* Line 1 */}
        <div className="w-3/4 h-3 bg-[#333333] rounded-sm" />
        {/* Line 2 */}
        <div className="w-1/2 h-3 bg-[#333333] rounded-sm" />
        {/* Line 3 - The Bug */}
        <div className="relative flex items-center gap-3">
          <div className="w-2/3 h-3 bg-[#333333] rounded-sm" />
          {/* Bug Icon */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: [1, 1, 0], scale: [1, 1.2, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0, 0.6, 1] }}
            className="absolute right-6 text-coral"
          >
            <Bug size={18} />
          </motion.div>
          {/* Check Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0, 0.6, 0.75, 0.95, 1] }}
            className="absolute right-6 text-green-400"
          >
            <CheckCircle size={18} />
          </motion.div>
        </div>
        {/* Line 4 */}
        <div className="w-1/3 h-3 bg-[#333333] rounded-sm" />
        {/* Line 5 */}
        <div className="w-4/5 h-3 bg-[#333333] rounded-sm" />
        {/* Line 6 */}
        <div className="w-1/2 h-3 bg-[#333333] rounded-sm" />

        {/* Flat Scanner Line */}
        <motion.div
          initial={{ top: '48px' }}
          animate={{ top: ['48px', 'calc(100% - 64px)', '48px'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          className="absolute w-full h-16 bg-coral/5 border-y-2 border-coral/30 pointer-events-none z-30"
        />

        {/* Test Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 10] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0, 0.6, 0.75, 0.95, 1] }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-[#1a1c23] px-8 py-3 rounded-sm font-sans text-xs font-bold shadow-xl flex items-center gap-3 z-40 whitespace-nowrap uppercase tracking-widest border border-gray-200"
        >
          <CheckCircle size={14} className="text-green-500" />
          All Tests Passed
        </motion.div>
      </div>
    </div>
  );
}

/* ─── ISTQB Badge Graphic ─── */
function IstqbBadgeGraphic() {
  return (
    <div className="flex items-center justify-center select-none py-12">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative flex flex-col items-center justify-center border-4 border-coral rounded-full w-60 h-60 bg-[#1a1c23] shadow-2xl p-6"
      >
        {/* SVG Certified Tester Shield/Seal */}
        <div className="flex flex-col items-center text-center">
          <span className="text-coral text-4xl font-display font-extrabold tracking-wide uppercase mb-1">ISTQB</span>
          <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase border-y border-gray-600 py-2 w-36 mb-1">CERTIFIED</span>
          <span className="text-coral text-sm font-bold tracking-widest uppercase mt-1">TESTER</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const targetText = 'I Am Hani Mohamed';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(targetText.substring(0, index + 1));
      index++;
      if (index >= targetText.length) {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasTracked = sessionStorage.getItem('portfolio-tracked');
    if (!hasTracked) {
      sessionStorage.setItem('portfolio-tracked', 'true');
      fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: Date.now(),
          page: window.location.pathname,
        }),
      }).catch((err) => console.error('Error sending tracking event:', err));
    }
  }, []);

  return (
    <div className="font-sans">
      {/* Navbar (Dark) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1c23]/95 backdrop-blur border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-5 flex justify-between items-center">
          <div className="text-3xl font-display font-bold text-coral tracking-tight">
            Hani
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
            <a href="#" className="hover:text-coral transition-colors">Home</a>
            <a href="#about" className="hover:text-coral transition-colors">About</a>
            <a href="#experience" className="hover:text-coral transition-colors">Experience</a>
            <a href="#academics" className="hover:text-coral transition-colors">Academics</a>
            <a href="#portfolio" className="hover:text-coral transition-colors">Projects</a>
            <a href="#credentials" className="hover:text-coral transition-colors">Certificates</a>
            <a href="#skills" className="hover:text-coral transition-colors">Skills</a>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#1a1c23]">

        {/* Hero Section (Dark) */}
        <section className="bg-[#1a1c23] min-h-screen flex items-center pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Text Side */}
              <div className="flex-1 w-full">
                <h3 className="text-coral font-bold text-sm tracking-widest mb-4 uppercase">Hello!</h3>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-2">
                  <span className="typewriter-caret pr-2">{typedText}</span>
                </h1>
                <p className="text-base md:text-lg italic text-gray-300 font-sans font-semibold tracking-wide mb-8 opacity-90">
                  &ldquo;Ain&apos;t no map for this life road; we draw it our own way, and love keeps it real&rdquo;
                </p>
                <div className="mb-10 pl-4 border-l-2 border-coral">
                  <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed">
                    I&apos;m a Software Test Engineer with over 2+ years of extensive experience. My expertise is to ensure flawless execution, UI testing, API integration, and performance validation across multiple platforms.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#portfolio" className="bg-coral hover:bg-coral/90 text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-0.5 inline-block text-xs">View Work</a>
                  <a href="/Hani-Mohamed-Sayed-Software Test Engineer.pdf" target="_blank" rel="noreferrer" className="bg-coral hover:bg-coral/90 text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-0.5 inline-block text-xs">Download CV</a>
                </div>
                <div className="flex items-center gap-6 mt-10">
                  <a href="https://github.com/HaniASU" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-coral transition-colors"><Github size={20} /></a>
                  <a href="https://www.linkedin.com/in/hani-mohamed-qa/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-coral transition-colors"><Linkedin size={20} /></a>
                  <a href="mailto:hani.mohamedqa@gmail.com" className="text-gray-400 hover:text-coral transition-colors"><Mail size={20} /></a>
                </div>
              </div>
              {/* Animation Side */}
              <div className="flex-1 flex justify-center">
                <BugFinderAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* About Section (Light) */}
        <section id="about" className="bg-light-section py-32">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Side: ISTQB Certification Emblem */}
              <div className="flex-1 flex justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <IstqbBadgeGraphic />
                </motion.div>
              </div>

              {/* Right Text Content */}
              <div className="flex-1 w-full">
                <h3 className="text-coral font-bold tracking-widest uppercase mb-2 text-sm">About Me</h3>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1a1c23] mb-8">
                  I Am Passionate <span className="text-coral">Test Engineer</span>
                </h2>
                <p className="text-gray-600 font-sans leading-relaxed mb-8 text-sm md:text-base">
                  Dedicated to ensuring software quality through comprehensive testing strategies. I bridge the gap between development and production by catching critical issues before they reach end users.
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="text-center">
                    <h4 className="text-coral font-display font-bold text-3xl mb-1">2+</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Years Exp.</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-coral font-display font-bold text-3xl mb-1">5+</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Projects</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-coral font-display font-bold text-3xl mb-1">27+</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Test Cases</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-coral font-display font-bold text-3xl mb-1">99%</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Quality Rate</p>
                  </div>
                </div>
                <a href="#experience" className="bg-coral hover:bg-coral/90 text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-0.5 inline-block text-xs">My Experience</a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section (Dark) */}
        <section id="experience" className="bg-[#1a1c23] py-32 border-y border-[#333333]">
          <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
            <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Career</h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16">My Experience</h2>
            <div className="relative border-l-2 border-[#333333] ml-4 pl-12 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 relative"
              >
                <div className="absolute -left-[49px] top-1 w-5 h-5 rounded-full border-4 border-[#1a1c23] bg-coral" />
                <span className="text-coral font-bold text-sm mb-2 block">Jan 2024 - Present</span>
                <h4 className="text-2xl font-display font-bold text-white mb-1 flex items-center flex-wrap gap-3">
                  Software Test Engineer
                  <span className="text-coral bg-coral/10 border border-coral/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider select-none">
                    Full-time
                  </span>
                </h4>
                <p className="text-gray-400 font-sans mb-4">Step by Step Software</p>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  Software Test Engineer with hands-on experience in mobile and web app testing. Excel in various testing methods and quality assurance processes, including manual and automated testing using Selenium and API testing with Postman.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[49px] top-1 w-5 h-5 rounded-full border-4 border-[#1a1c23] bg-[#333333]" />
                <span className="text-coral font-bold text-sm mb-2 block">Nov 2023 - Present</span>
                <h4 className="text-2xl font-display font-bold text-white mb-1">ManuTech Community</h4>
                <p className="text-gray-400 font-sans mb-4">Chamber of IT & Telecommunication</p>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  Member of ManuTech, an integrated initiative supporting digital transformation in the manufacturing sector. Selected participant in the ManuTech Challenge Boot Camp, focusing on manufacturing technology innovation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Academics Section (Light) */}
        <section id="academics" className="bg-light-section py-32 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Education</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1c23]">Academics</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 border-t-4 border-coral shadow-lg group hover:shadow-xl transition-shadow relative overflow-hidden"
              >
                <span className="text-coral font-bold text-sm tracking-widest uppercase">Sep 2019 - Jul 2023</span>
                <h4 className="text-2xl font-display font-bold text-[#1a1c23] mb-1 mt-2">Bachelor's Degree</h4>
                <p className="text-gray-600 font-sans font-semibold text-sm">Faculty of Computer and Information Sciences</p>
                <p className="text-gray-500 font-sans text-xs mt-1">Ain Shams University</p>
                <div className="absolute top-6 right-[-30px] bg-coral text-white text-[10px] font-bold tracking-widest uppercase px-10 py-1 rotate-45 shadow-md">
                  Graduate
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-10 border-t-4 border-gray-300 shadow-lg group hover:shadow-xl transition-shadow relative overflow-hidden"
              >
                <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">In Progress</span>
                <h4 className="text-2xl font-display font-bold text-[#1a1c23] mb-1 mt-2">Diploma in Digital Payments & FinTech</h4>
                <p className="text-gray-600 font-sans font-semibold text-sm">LSBR</p>
                <p className="text-gray-500 font-sans text-xs mt-1">Self-study</p>
                <div className="absolute top-6 right-[-30px] bg-gray-400 text-white text-[10px] font-bold tracking-widest uppercase px-10 py-1 rotate-45 shadow-md">
                  Self-Study
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Projects Section (Dark) */}
        <section id="portfolio" className="bg-[#1a1c23] py-32 border-y border-[#333333]">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Projects</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Technical Projects</h2>
            </div>

            {/* Interactive Row Portfolio Design */}
            <div className="divide-y divide-[#333333]">
              {workingProjects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col lg:flex-row items-start lg:items-center gap-8 py-12 group cursor-default"
                >
                  {/* Left: Domain & Name */}
                  <div className="lg:w-1/2">
                    <span className="text-coral text-xs font-bold tracking-widest uppercase block mb-3">{project.domain}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white group-hover:text-coral transition-colors">{project.name}</h3>
                  </div>
                  {/* Middle: Summary */}
                  <div className="lg:w-1/3">
                    <p className="text-gray-400 font-sans leading-relaxed text-sm">{project.summary}</p>
                  </div>
                  {/* Right: Tech Stack */}
                  <div className="lg:w-1/3 flex items-center justify-end">
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs font-semibold bg-[#1a1c23] text-gray-300 px-3 py-1.5 rounded border border-[#333333] group-hover:border-coral/50 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Credentials Section (Light) */}
        <section id="credentials" className="bg-light-section py-32">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Qualifications</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1c23]">Certificates</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

              {/* ISTQB Credential */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded border-t-4 border-coral shadow-lg text-center group transition-colors flex flex-col h-full"
              >
                <Award className="text-coral w-12 h-12 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-display font-bold text-[#1a1c23] mb-2">ISTQB Foundation Level</h4>
                <p className="text-gray-400 font-sans text-sm mb-4">International Software Testing Qualifications Board</p>
                <p className="text-coral font-bold text-sm tracking-widest uppercase mb-8 flex-grow">ID: 251117042</p>

                <div className="mt-auto">
                  <a href="https://scr.istqb.org/?number=251117042" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-coral hover:bg-coral/80 text-white px-6 py-3 rounded font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 text-sm">
                    View Certificate <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>

              {/* Test Automation Credential */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-10 rounded border-t-4 border-coral shadow-lg text-center group transition-colors flex flex-col h-full"
              >
                <Award className="text-coral w-12 h-12 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-display font-bold text-[#1a1c23] mb-2">Test Automation: Leveling Up</h4>
                <p className="text-gray-400 font-sans text-sm mb-4">60 Hours Training Course</p>
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">Advanced test automation with Selenium &amp; API testing</p>

                <div className="flex flex-wrap justify-center gap-2 mb-8 flex-grow content-start">
                  <span className="text-xs font-semibold bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-200">Selenium WebDriver</span>
                  <span className="text-xs font-semibold bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-200">SHAFT Engine</span>
                  <span className="text-xs font-semibold bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-200">RestAssured</span>
                </div>

                <div className="mt-auto">
                  <a href="https://drive.google.com/file/d/1NTqbBIq3H2cQjVhyGS8q1biVdDrkHwDu/view?usp=drive_link" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-coral hover:bg-coral/80 text-white px-6 py-3 rounded font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 text-sm">
                    View Certificate <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Self-Initiated Technical Prototypes Section (Different Dark) */}
        <section id="prototypes" className="bg-[#23262f] py-32 border-y border-[#333333]">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Innovation</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Self-Initiated Technical Prototypes</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {technicalPrototypes.map((proto, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1a1c23] p-10 border-t-4 border-[#333333] hover:border-coral transition-colors shadow-lg group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-gray-400 font-bold text-sm tracking-widest uppercase group-hover:text-coral transition-colors mt-2">{proto.domain}</span>
                    {proto.link && (
                      <a href={proto.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-coral/20 border border-coral/30 text-coral px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm" title="View Project">
                        Live Demo <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white mb-4">{proto.name}</h4>
                  <p className="text-gray-400 font-sans leading-relaxed mb-8">{proto.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {proto.tech.map((t, j) => (
                      <span key={j} className="text-xs font-semibold bg-[#23262f] text-gray-400 px-3 py-1.5 rounded border border-[#333333] group-hover:border-coral/30 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section (Light) */}
        <section id="skills" className="bg-light-section py-32 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-20">
              <h3 className="text-coral font-bold tracking-widest uppercase mb-2">Technical Arsenal</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1c23]">Skills &amp; Expertise</h2>
            </div>

            {/* Sleek 4-Column Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="border-b-2 border-gray-200 pb-4 mb-8">
                    <h3 className="text-xl font-display font-bold text-[#1a1c23] flex items-center gap-3">
                      <CheckCircle className="text-coral w-5 h-5" />
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {category.skills.map((skill, index) => (
                      <li key={index} className="text-gray-600 font-sans font-semibold flex items-center gap-3">
                        <div className="w-2 h-2 rounded-sm bg-gray-300" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Merged Contact Block */}
            <div id="contact" className="max-w-4xl mx-auto text-center mt-32 pt-32 border-t border-gray-200">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-[#1a1c23]">Let&apos;s Work Together</h2>
              <p className="text-gray-600 font-sans text-lg mb-12">I&apos;m currently available for freelance work or full-time opportunities. If you have a project that needs a quality architect, let&apos;s talk.</p>

              <div className="mt-8">
                <a href="mailto:hani.mohamedqa@gmail.com" className="bg-coral hover:bg-coral/80 text-white text-lg px-12 py-4 rounded font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-1 inline-block">Hire Me Now</a>
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1c23] py-8 text-center border-t border-[#333333]">
          <p className="text-gray-500 font-sans text-sm tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Hani Mohamed · Software Test Engineer
          </p>
        </footer>

      </main>
      <AIChat />
    </div>
  );
}
