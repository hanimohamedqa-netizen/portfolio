'use client';

import { motion } from 'framer-motion';
import { Bug, Download, Mail, Github, Linkedin, Terminal, Code, TestTube, Zap } from 'lucide-react';
import { useState } from 'react';
import AnimatedBug from '@/components/AnimatedBug';
import GlitchText from '@/components/GlitchText';
import AIChat from '@/components/AIChat';

export default function Home() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    const email = prompt('Enter your email to download CV (for notification purposes):');
    const name = prompt('Enter your name:');

    if (email && name) {
      try {
        await fetch('/api/download-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, timestamp: new Date().toISOString() }),
        });
      } catch (error) {
        console.error('Failed to send notification:', error);
      }

      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Hani-Mohamed-Sayed-CV.pdf';
      link.click();
    }

    setDownloading(false);
  };

  return (
    <main className="min-h-screen bg-black text-[#00ff41] relative overflow-hidden">
      <AnimatedBug delay={0} color="#ff0055" size={32} />
      <AnimatedBug delay={5} color="#00d4ff" size={28} />
      <AnimatedBug delay={10} color="#ffff00" size={24} />
      <AnimatedBug delay={15} color="#ff6600" size={30} />

      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 text-[#00d4ff] text-sm font-mono">
              {"> initializing_portfolio.sh..."}
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <GlitchText text="HANI MOHAMED" />
            </h1>

            <div className="text-2xl md:text-4xl mb-8 text-[#ff0055] font-mono">
              <GlitchText text="Software Test Engineer" />
            </div>

            <p className="text-xl mb-8 text-[#00ff41] font-mono">
              [ Bug Hunter | QA Automation | API Testing Specialist ]
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 border-2 border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 border-2 border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:hani.mohamedqa@gmail.com"
                whileHover={{ scale: 1.1 }}
                className="p-3 border-2 border-[#00ff41] rounded hover:bg-[#00ff41] hover:text-black transition-all"
              >
                <Mail size={24} />
              </motion.a>
            </div>

            <motion.button
              onClick={handleDownload}
              disabled={downloading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#ff0055] text-white font-bold text-lg rounded-lg hover:bg-[#ff3377] transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              <Download size={24} />
              {downloading ? 'Downloading...' : 'Download CV'}
            </motion.button>

            <div className="mt-8 text-sm text-[#00d4ff]">
              {"> scroll_down() for more_info();"}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
              <Terminal className="text-[#ff0055]" size={40} />
              <GlitchText text="{> about_me}" />
            </h2>

            <div className="bg-black/50 border-2 border-[#00ff41] p-8 rounded-lg font-mono">
              <p className="text-lg mb-4 leading-relaxed">
                <span className="text-[#ff0055]">{">"}</span> Software Test Engineer with <span className="text-[#00d4ff]">2+ years</span> of experience hunting bugs in web and mobile applications.
              </p>
              <p className="text-lg mb-4 leading-relaxed">
                <span className="text-[#ff0055]">{">"}</span> Expert in <span className="text-[#00d4ff]">manual testing, API validation, and test automation</span> using Selenium, TestNG, and Postman.
              </p>
              <p className="text-lg mb-4 leading-relaxed">
                <span className="text-[#ff0055]">{">"}</span> Improved defect resolution time by <span className="text-[#00d4ff]">~20%</span> and regression efficiency by <span className="text-[#00d4ff]">~15%</span> through automation.
              </p>
              <p className="text-lg leading-relaxed">
                <span className="text-[#ff0055]">{">"}</span> Active member of <span className="text-[#00d4ff]">ManuTech_CIT Industry 4.0</span>, staying current with AI, IoT, and digital transformation trends.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4">
              <Code className="text-[#00d4ff]" size={40} />
              <GlitchText text="{> experience.log}" />
            </h2>

            <div className="space-y-8">
              <motion.div
                whileHover={{ x: 10 }}
                className="bg-black/50 border-l-4 border-[#ff0055] p-6 rounded-r-lg"
              >
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-2xl font-bold text-[#00d4ff]">Software Test Engineer</h3>
                  <span className="text-[#00ff41]">Jan 2024 - Present</span>
                </div>
                <p className="text-[#ff0055] mb-4">Step by Step</p>
                <ul className="space-y-2 font-mono text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <Bug size={16} className="mt-1 flex-shrink-0 text-[#ff0055]" />
                    <span>Designed test cases & plans in Azure DevOps/Jira with full traceability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bug size={16} className="mt-1 flex-shrink-0 text-[#ff0055]" />
                    <span>Identified 15+ critical API issues, reducing error rates by ~10%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bug size={16} className="mt-1 flex-shrink-0 text-[#ff0055]" />
                    <span>Led frontend-backend integration testing & UAT facilitation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bug size={16} className="mt-1 flex-shrink-0 text-[#ff0055]" />
                    <span>Introduced Selenium/TestNG automation improving efficiency by ~15%</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4">
              <TestTube className="text-[#ffff00]" size={40} />
              <GlitchText text="{> tested_projects[]}" />
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'E-Justice',
                  desc: 'Cross-platform legal services app for lawyers & experts',
                  tech: 'UI/API Testing • Postman • Azure DevOps • UAT',
                  bugs: '20+',
                },
                {
                  name: 'Key2Bus',
                  desc: 'Real-time bus tracking for students (Native Android/iOS)',
                  tech: 'GPS Validation • API Testing • Smoke/Regression',
                  bugs: '10+',
                },
                {
                  name: 'Consultant Platform',
                  desc: 'Consultation services with transportation workflows',
                  tech: 'Selenium Automation • Gatling Performance Testing',
                  bugs: '15+',
                },
                {
                  name: 'Maktaby & Helpdesk',
                  desc: 'Paperless workflow for Oman government employees',
                  tech: 'Cross-platform • 99% Uptime • API Sync Validation',
                  bugs: '12+',
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/70 border-2 border-[#00ff41] p-6 rounded-lg transition-all hover:border-[#ff0055]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-[#00d4ff]">{project.name}</h3>
                    <div className="flex items-center gap-1 text-[#ff0055]">
                      <Bug size={20} />
                      <span className="font-bold">{project.bugs}</span>
                    </div>
                  </div>
                  <p className="text-[#00ff41] mb-4">{project.desc}</p>
                  <p className="text-sm font-mono text-[#00d4ff]">{project.tech}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center gap-4">
              <Zap className="text-[#ff0055]" size={40} />
              <GlitchText text="{> skills.json}" />
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/50 border-2 border-[#00ff41] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#ff0055] mb-4">Testing & QA</h3>
                <div className="flex flex-wrap gap-2">
                  {['Manual Testing', 'API Testing', 'Automation', 'Selenium', 'TestNG', 'Postman', 'Gatling', 'ISTQB'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#00ff41] text-black rounded-full text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 border-2 border-[#00d4ff] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#00d4ff] mb-4">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {['Jira', 'Azure DevOps', 'Git/GitHub', 'Trello', 'IntelliJ', 'Android Studio', 'Databases'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#00d4ff] text-black rounded-full text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 border-2 border-[#ffff00] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#ffff00] mb-4">Programming</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'JavaScript', 'Scala', 'SQL', 'POM'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#ffff00] text-black rounded-full text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 border-2 border-[#ff0055] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#ff0055] mb-4">AI & Emerging Tech</h3>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'TensorFlow', 'NLP', 'AI Tools'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#ff0055] text-white rounded-full text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AIChat />

      <footer className="py-8 text-center border-t-2 border-[#00ff41]">
        <p className="font-mono text-sm">
          {"> exit 0"} <br />
          Built with bugs & love by Hani Mohamed
        </p>
      </footer>
    </main>
  );
}
