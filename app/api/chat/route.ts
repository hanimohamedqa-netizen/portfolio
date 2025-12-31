import { NextRequest, NextResponse } from 'next/server';

// CV Knowledge Base - Hani Mohamed's Professional Information
const CV_DATA = {
  basic: {
    name: 'Hani Mohamed Sayed Ahmed',
    role: 'Software Test Engineer',
    location: 'Cairo, Egypt',
    email: 'hani.mohamedqa@gmail.com',
    experience: '2+ years',
    linkedin: 'https://www.linkedin.com/in/hani-mohamed-qa/',
    github: 'https://github.com/HaniASU'
  },
  current: {
    company: 'Step by Step',
    position: 'Software Test Engineer',
    startDate: 'Jan 2024',
    achievements: [
      'Designed test cases and plans in Azure DevOps and Jira',
      'Performed API testing using Postman, identified 15+ critical integration issues',
      'Reduced error rates by ~10%',
      'Led frontend-backend integration testing',
      'Improved defect resolution time by ~20%',
      'Introduced Selenium & TestNG automation, improving regression efficiency by ~15%'
    ]
  },
  projects: [
    {
      name: 'Tracking Management System',
      domain: 'Logistics & Order Management',
      status: 'Currently Working',
      tech: ['Manual Testing', 'UI Testing', 'API Testing', 'Azure DevOps', 'Functional Testing']
    },
    {
      name: 'E-Justice',
      domain: 'Legal Services',
      description: 'Cross-platform legal management application',
      tech: ['Manual Testing', 'UI Testing', 'Postman', 'Azure DevOps', 'Mobile Testing']
    },
    {
      name: 'Key2Bus',
      domain: 'Transportation',
      description: 'Native mobile app with GPS tracking',
      achievements: ['Reduced tracking errors by 20%', 'Identified 10+ critical defects before release']
    },
    {
      name: 'Consultant Platform',
      domain: 'Professional Services',
      tech: ['Selenium WebDriver', 'Gatling', 'Performance Testing', 'Load Testing']
    },
    {
      name: 'Maktaby & Helpdesk',
      domain: 'Government',
      description: 'Paperless workflow system for Oman government',
      achievements: ['99% uptime during production', 'Reduced issue resolution time by 15-20%']
    }
  ],
  skills: {
    testing: ['Manual Testing', 'API Testing', 'Automation', 'Selenium WebDriver', 'TestNG', 'Postman', 'Gatling', 'ISTQB', 'SHAFT Engine', 'RestAssured', 'Cucumber'],
    languages: ['Java', 'JavaScript', 'Scala', 'SQL'],
    tools: ['Azure DevOps', 'Jira', 'Git/GitHub', 'IntelliJ', 'Android Studio'],
    aiml: ['TensorFlow', 'Machine Learning', 'Deep Learning', 'NLP']
  },
  certifications: [
    'ISTQB Certified Tester - Foundation Level',
    'Test Automation: Leveling Up (60 Hours Training Course)',
    'Diploma in Digital Payments & FinTech (In progress)',
    'Complete Automation Testing and Best Practices',
    'Gatling Performance Testing Scala'
  ],
  education: 'Faculty of Computer and Information Sciences, Ain Shams University (2019-2023)',
  achievements: ['Selected in top 12 teams out of 200+ in DELL-AI Empower Egypt Hackathon']
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const response = getIntelligentResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { response: "I'm here to answer questions about Hani's professional background. Feel free to ask about his experience, skills, projects, or education!" },
      { status: 200 }
    );
  }
}

// Intelligent pattern-matching response system
function getIntelligentResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Greeting patterns
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(lowerMessage)) {
    return `Hello! 👋 I'm Hani's AI assistant. I can help you learn about his ${CV_DATA.basic.experience} of experience as a ${CV_DATA.basic.role}. What would you like to know?`;
  }

  // Who is/are you patterns
  if (/who (is|are) (you|hani)|tell me about (you|hani)|introduce/i.test(lowerMessage)) {
    return `I'm representing ${CV_DATA.basic.name}, a ${CV_DATA.basic.role} with ${CV_DATA.basic.experience} of experience. He's currently working at ${CV_DATA.current.company} in ${CV_DATA.basic.location}, specializing in manual testing, API testing, and test automation. Would you like to know more about his projects or skills?`;
  }

  // Experience patterns
  if (/experience|years|work|career|background|history/i.test(lowerMessage)) {
    return `Hani has ${CV_DATA.basic.experience} of experience as a ${CV_DATA.basic.role}. Currently at ${CV_DATA.current.company} since ${CV_DATA.current.startDate}, he has:\n• Identified 15+ critical integration issues through API testing\n• Reduced error rates by ~10% and defect resolution time by ~20%\n• Improved regression efficiency by ~15% through test automation\n• Led end-to-end QA across multiple high-impact projects`;
  }

  // Skills patterns
  if (/skill|technolog|tool|know|proficien|expert/i.test(lowerMessage)) {
    if (/automation|automat|selenium/i.test(lowerMessage)) {
      return `Hani's test automation skills include: ${CV_DATA.skills.testing.filter(s => s.includes('Selenium') || s.includes('TestNG') || s.includes('SHAFT') || s.includes('RestAssured') || s.includes('Cucumber')).join(', ')}. He's completed a 60-hour Test Automation course and has hands-on experience implementing automation frameworks.`;
    }
    if (/api|postman/i.test(lowerMessage)) {
      return `Hani is highly skilled in API testing using Postman and RestAssured. He's identified 15+ critical integration issues and has extensive experience testing RESTful APIs across multiple projects including E-Justice, Key2Bus, and government platforms.`;
    }
    if (/performance|load|gatling/i.test(lowerMessage)) {
      return `For performance testing, Hani uses Gatling (Scala) and has improved response times by 15% on the Consultant Platform project. He's certified in Gatling Performance Testing and experienced in load testing scenarios.`;
    }
    return `Hani's core technical skills:\n\n**Testing:** ${CV_DATA.skills.testing.slice(0, 8).join(', ')}\n**Languages:** ${CV_DATA.skills.languages.join(', ')}\n**Tools:** ${CV_DATA.skills.tools.join(', ')}\n**AI/ML:** ${CV_DATA.skills.aiml.join(', ')}`;
  }

  // Projects patterns
  if (/project|work on|portfolio|built|developed|tested/i.test(lowerMessage)) {
    if (/current|now|present|recent/i.test(lowerMessage)) {
      const current = CV_DATA.projects[0];
      const techStack = current.tech ? `This involves ${current.tech.join(', ')}, focusing on order tracking and admin management for streamlined operations.` : 'He focuses on comprehensive QA testing for order tracking and admin management.';
      return `Hani is currently working on the **${current.name}** - a ${current.domain} system. ${techStack}`;
    }
    if (/government|oman/i.test(lowerMessage)) {
      const gov = CV_DATA.projects.find(p => p.name.includes('Maktaby'));
      return `Hani worked on **${gov?.name}** for the Oman government - a paperless workflow system. He achieved 99% uptime during production releases and reduced issue resolution time by 15-20% through comprehensive cross-platform testing.`;
    }
    const projectList = CV_DATA.projects.map((p, i) =>
      `${i + 1}. **${p.name}** (${p.domain}) - ${p.description || 'Comprehensive QA testing'}`
    ).join('\n');
    return `Hani has worked on ${CV_DATA.projects.length} major projects:\n\n${projectList}\n\nWhich project would you like to know more about?`;
  }

  // Certification patterns
  if (/certif|istqb|course|training|qualif/i.test(lowerMessage)) {
    return `Hani holds several professional certifications:\n• ${CV_DATA.certifications.slice(0, 3).join('\n• ')}\n\nHe's also completed specialized training in Selenium WebDriver, SHAFT Engine, RestAssured, and performance testing with Gatling.`;
  }

  // Education patterns
  if (/education|university|degree|college|study|studied/i.test(lowerMessage)) {
    return `Hani graduated from the ${CV_DATA.education}. He's also pursuing a Diploma in Digital Payments & FinTech from LSBR to expand his expertise in emerging technologies.`;
  }

  // Contact patterns
  if (/contact|email|reach|hire|connect|linkedin|github/i.test(lowerMessage)) {
    return `You can connect with Hani:\n📧 Email: ${CV_DATA.basic.email}\n💼 LinkedIn: ${CV_DATA.basic.linkedin}\n🔗 GitHub: ${CV_DATA.basic.github}\n📍 Location: ${CV_DATA.basic.location}`;
  }

  // Achievement patterns
  if (/achievement|award|hackathon|accomplishment|recognition/i.test(lowerMessage)) {
    return `Hani was selected among the **top 12 teams out of 200+** in the DELL-AI Empower Egypt Hackathon, where he collaborated with a 5-member team on an innovative AI-based solution. He's also an active member of the ManuTech_CIT Industry 4.0 Initiative.`;
  }

  // Domain-specific patterns
  if (/logistic|tracking|order/i.test(lowerMessage)) {
    return `Hani has deep interest and experience in logistics and order management systems. He's currently working on a Tracking Management System that streamlines operations through order tracking and admin management. He's passionate about building efficient systems for complex business environments.`;
  }

  if (/mobile|android|ios|app/i.test(lowerMessage)) {
    return `Hani has extensive mobile testing experience across Android and iOS platforms. Notable projects include Key2Bus (GPS tracking app) where he reduced tracking errors by 20%, and Maktaby & Helpdesk Apps for Oman government with 99% uptime.`;
  }

  // Thank you patterns
  if (/thank|thanks|appreciate/i.test(lowerMessage)) {
    return `You're welcome! Feel free to ask if you have any other questions about Hani's experience, skills, or projects. I'm here to help! 😊`;
  }

  // Download CV patterns
  if (/cv|resume|download|pdf/i.test(lowerMessage)) {
    return `You can download Hani's CV by clicking the "Download CV" button at the top of this page. You'll get to solve a fun riddle first! 🎯`;
  }

  // Default response with helpful suggestions
  return `I can help you learn about Hani's professional background! Here's what you can ask me about:\n\n✅ Work experience and current role\n✅ Technical skills (testing, automation, API, performance)\n✅ Projects and achievements\n✅ Certifications (ISTQB, Test Automation)\n✅ Education background\n✅ Contact information\n\nWhat would you like to know?`;
}
