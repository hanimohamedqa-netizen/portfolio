'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, Code, CheckCircle2, Award, Briefcase, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import AIChat from '@/components/AIChat';

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Inspirational quotes array (Testing, Tech, Psychology)
  const quotes = [
    { text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "Philosophy" },
    { text: "Testing shows the presence, not the absence of bugs.", author: "Edsger Dijkstra", category: "Testing" },
    { text: "The mind is everything. What you think you become.", author: "Buddha", category: "Psychology" },
    { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries", category: "Tech" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", category: "Tech" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Philosophy" },
    { text: "A bug is never just a mistake. It represents something bigger. An error of thinking that makes you who you are.", author: "Mr. Robot", category: "Tech" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "Psychology" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "Philosophy" },
    { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard", category: "Tech" },
    { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale", category: "Psychology" },
    { text: "Testing can only prove the presence of bugs, not their absence.", author: "Edsger Dijkstra", category: "Testing" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Tech" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Psychology" },
    { text: "Automation is good, so long as you know exactly where to put the machine.", author: "Eliyahu Goldratt", category: "Testing" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Psychology" },
    { text: "Software testing is not just finding bugs, it's about preventing them.", author: "Unknown", category: "Testing" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", category: "Tech" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Philosophy" },
    { text: "A good test case is one that has a high probability of finding an undiscovered error.", author: "Glen Myers", category: "Testing" },
    { text: "What we think, we become.", author: "Buddha", category: "Psychology" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", category: "Tech" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", category: "Psychology" },
    { text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.", author: "Edsger Dijkstra", category: "Tech" },
    { text: "Quality is everyone's responsibility.", author: "W. Edwards Deming", category: "Testing" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "Philosophy" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Psychology" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde", category: "Philosophy" },
    { text: "Good testing is a combination of following rules and breaking them.", author: "James Bach", category: "Testing" },
    { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch", category: "Tech" },
  ];

  // Track visitor when page loads
  useEffect(() => {
    const trackVisitor = async () => {
      // Check if already tracked in this session
      if (sessionStorage.getItem('visitor_tracked')) {
        return;
      }

      try {
        await fetch('/api/visitor-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            page: window.location.pathname
          }),
        });

        // Mark as tracked for this session
        sessionStorage.setItem('visitor_tracked', 'true');
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Track after a short delay to ensure page is loaded
    const timer = setTimeout(trackVisitor, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Rotating quotes popup every 30 seconds
  useEffect(() => {
    // Show first quote after 5 seconds
    const initialTimer = setTimeout(() => {
      setShowQuote(true);
    }, 5000);

    // Rotate quotes every 30 seconds
    const quoteInterval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setShowQuote(true);
      }, 500); // Small delay for animation
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleDownload = async () => {
    try {
      // Send notification
      await fetch('/api/download-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Anonymous', timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }

    // Trigger download immediately
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Hani-Mohamed-Sayed-CV.pdf';
    link.click();
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-indigo-600 font-semibold mb-4 flex items-center gap-2"
              >
                <Sparkles size={20} />
                Software Test Engineer
              </motion.p>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Hi, I am <span className="gradient-text">Hani Mohamed</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <span className="font-semibold text-indigo-600">ISTQB Certified</span> QA Engineer with <span className="font-semibold text-indigo-600">2+ years</span> of expertise in manual & automated testing, API testing, and performance engineering.
                Delivering quality across <span className="font-semibold text-indigo-600">web, mobile, and enterprise applications</span> in diverse industries.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Download size={20} />
                  Download CV
                </motion.button>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all"
                >
                  Contact Me
                </motion.a>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/HaniASU' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/hani-mohamed-qa/' },
                  { icon: Mail, href: 'mailto:hani.mohamedqa@gmail.com' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <social.icon size={24} className="text-gray-700" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl rotate-6 opacity-20"></div>
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <CheckCircle2 size={120} className="mx-auto mb-4 float" />
                    <p className="text-2xl font-bold">Software Test Engineer</p>
                    <p className="text-indigo-100">ISTQB Certified</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-indigo-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-indigo-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2+', label: 'Years Experience', icon: Briefcase },
              { value: 'ISTQB', label: 'Certified Tester', icon: Award },
              { value: '5+', label: 'Projects Delivered', icon: CheckCircle2 },
              { value: '80%', label: 'Bug Detection Rate', icon: Code },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-3">
                  <stat.icon className="text-indigo-600" size={32} />
                </div>
                <div className="text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Working <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-600 text-lg">Domain Expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                name: 'Tracking Management System',
                domain: 'Logistics',
                tech: ['Manual Testing', 'UI Testing', 'API Testing', 'Azure DevOps'],
                status: 'active',
                bgColor: 'from-emerald-50 to-teal-50',
                borderColor: 'border-emerald-200'
              },
              {
                name: 'E-Justice',
                domain: 'Legal Services',
                tech: ['Manual Testing', 'UI Testing', 'Postman', 'Mobile Testing'],
                status: 'completed',
                bgColor: 'from-indigo-50 to-purple-50',
                borderColor: 'border-indigo-200'
              },
              {
                name: 'Key2Bus',
                domain: 'Transportation',
                tech: ['Mobile Testing', 'API Testing', 'GPS Tracking'],
                status: 'completed',
                bgColor: 'from-purple-50 to-pink-50',
                borderColor: 'border-purple-200'
              },
              {
                name: 'Consultant Platform',
                domain: 'Professional Services',
                tech: ['Selenium WebDriver', 'Gatling', 'Performance Testing'],
                status: 'completed',
                bgColor: 'from-cyan-50 to-blue-50',
                borderColor: 'border-cyan-200'
              },
              {
                name: 'Maktaby & Helpdesk',
                domain: 'Government',
                tech: ['Cross-platform', 'TestNG', 'Database Testing'],
                status: 'completed',
                bgColor: 'from-green-50 to-emerald-50',
                borderColor: 'border-green-200'
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${project.bgColor} p-4 rounded-xl border-2 ${project.borderColor} card-hover`}
              >
                {project.status === 'active' && (
                  <span className="inline-block px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                    In Progress
                  </span>
                )}
                <h3 className="font-bold text-gray-900 text-base mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 font-medium mb-3">{project.domain}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-600 text-lg">Professional Journey</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Software Test Engineer</h3>
              <p className="text-indigo-600 font-semibold text-sm mb-1">Step by Step Software</p>
              <p className="text-gray-600 text-xs mb-3">Jan 2024 - Present · Full-time</p>
              <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                Software Test Engineer with hands-on experience in mobile and web app testing. Excel in various testing
                methods and quality assurance processes, including manual and automated testing using Selenium and API testing with Postman.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Azure DevOps</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Test Automation</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">+27 skills</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">ManuTech Community</h3>
              <p className="text-purple-600 font-semibold text-sm mb-1">Chamber of IT & Telecommunication</p>
              <p className="text-gray-600 text-xs mb-3">Nov 2023 - Present · 2 years 2 months</p>
              <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                Member of ManuTech, an integrated initiative supporting digital transformation in the manufacturing sector.
                Selected participant in the ManuTech Challenge Boot Camp, focusing on manufacturing technology innovation.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Manufacturing</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Digital Transformation</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">+5 skills</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Education</span>
            </h2>
            <p className="text-gray-600 text-lg">Academic Foundation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border-2 border-cyan-200 card-hover">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Faculty of Computer and Information Sciences</h3>
              <p className="text-cyan-600 font-semibold text-sm mb-1">Ain Shams University</p>
              <p className="text-gray-600 text-xs mb-3">Bachelor's degree · Sep 2019 - Jul 2023</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Computer Science</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Test Automation</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Software Engineering</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-gray-600 text-lg">Technical Arsenal</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Test Automation',
                bgColor: 'from-indigo-50 to-purple-50',
                borderColor: 'border-indigo-200',
                skills: ['Selenium WebDriver', 'TestNG', 'SHAFT Engine', 'RestAssured', 'Cucumber', 'Data-Driven Testing'],
              },
              {
                title: 'API & Performance',
                bgColor: 'from-cyan-50 to-blue-50',
                borderColor: 'border-cyan-200',
                skills: ['Postman', 'REST API', 'Gatling', 'Load Testing', 'JMeter', 'API Security'],
              },
              {
                title: 'Development & Tools',
                bgColor: 'from-purple-50 to-pink-50',
                borderColor: 'border-purple-200',
                skills: ['Java', 'JavaScript', 'Azure DevOps', 'Git', 'Jira', 'CI/CD Pipelines'],
              },
              {
                title: 'Domain Expertise',
                bgColor: 'from-emerald-50 to-teal-50',
                borderColor: 'border-emerald-200',
                skills: ['Manufacturing', 'Legal Tech', 'Government', 'Mobile Apps'],
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${cat.bgColor} p-4 rounded-xl border-2 ${cat.borderColor} card-hover`}
              >
                <h3 className="text-base font-bold text-gray-900 mb-3">{cat.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-gray-600 text-lg">Continuous Learning & Professional Development</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-emerald-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">ISTQB Certified Tester</h3>
              <p className="text-emerald-600 font-semibold text-sm mb-2">Foundation Level</p>
              <p className="text-gray-600 text-xs">International Software Testing Qualifications Board</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">Test Automation: Leveling Up</h3>
              <p className="text-amber-600 font-semibold text-sm mb-2">60 Hours Training Course</p>
              <p className="text-gray-600 text-xs mb-3">Advanced test automation with Selenium & API testing</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">Selenium WebDriver</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">SHAFT Engine</span>
                <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-medium">RestAssured</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Passions & Interests */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Beyond <span className="gradient-text">Testing</span>
            </h2>
            <p className="text-gray-600 text-lg">What Drives Me Forward</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200 card-hover"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">Continuous Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Passionate about exploring new testing methodologies, automation frameworks, and emerging technologies.
                Always seeking opportunities to expand my knowledge and stay ahead in the QA field.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 card-hover"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">Manufacturing & AI Solutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Deep interest in manufacturing systems powered by artificial intelligence. Exploring AI-based solutions
                that optimize production processes, enhance quality control, and drive intelligent automation in manufacturing environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border-2 border-cyan-200 card-hover"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">Innovation & Experimentation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Love trying new tools, frameworks, and approaches. From AI-powered testing to performance optimization,
                I embrace challenges that push the boundaries of quality assurance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reflections Section */}
      <section className="py-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">Reflections & Memories</span>
            </h2>
            <p className="text-gray-600 text-lg">Coming Soon</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Life Stories</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                A collection of personal experiences, reflections, and moments that shaped my journey in technology and life.
              </p>
              <div className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-semibold inline-block">
                Coming Soon
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200 card-hover"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Soul Fragments</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Thoughts, philosophical musings, and introspective writings about the intersection of technology, humanity, and growth.
              </p>
              <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-xs font-semibold inline-block">
                Coming Soon
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Open to discussing new projects and opportunities
            </p>
            <motion.a
              href="mailto:hani.mohamedqa@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold shadow-lg inline-flex items-center gap-2"
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 text-gray-400 text-center">
        <p>© 2026 Hani Mohamed</p>
      </footer>

      {/* Rotating Quote Popup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showQuote ? 1 : 0, y: showQuote ? 0 : 50 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-32 right-8 max-w-md z-50 pointer-events-none"
      >
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/20">
          <div className="flex items-start gap-3">
            <Sparkles className="flex-shrink-0 mt-1" size={24} />
            <div>
              <p className="text-lg font-medium mb-2 leading-relaxed">&ldquo;{quotes[currentQuote].text}&rdquo;</p>
              <p className="text-indigo-100 text-sm">— {quotes[currentQuote].author}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                {quotes[currentQuote].category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AIChat />
    </main>
  );
}
