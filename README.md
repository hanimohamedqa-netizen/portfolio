# Bug Hunter Portfolio

A cutting-edge portfolio website for Hani Mohamed Sayed Ahmed - Software Test Engineer, featuring:
- **Bug-themed UI** with animated bugs crawling across the screen
- **Glitch effects** and terminal/debugger aesthetic
- **CV Download** with email notifications
- **AI Chat Assistant** trained on CV using RAG (Retrieval-Augmented Generation)
- **Responsive design** optimized for all devices

## Features

### 1. Interactive Bug Animations
Animated bugs move across the screen in random patterns, creating an immersive bug hunter experience.

### 2. Glitch Text Effects
Section titles feature glitch animations that reinforce the tester/debugger theme.

### 3. CV Download with Notifications
- Users enter their email to download the CV
- You receive instant email notifications with downloader details
- Tracks who is interested in your profile

### 4. AI Chat Assistant
- Powered by OpenAI GPT-4 (or fallback responses)
- Trained on your CV knowledge base
- Answers questions about experience, skills, projects
- Handles edge cases gracefully

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Vercel AI SDK + OpenAI
- **Email**: Resend API

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

- **RESEND_API_KEY**: Get from resend.com (free tier available)
- **NOTIFICATION_EMAIL**: Your email to receive download notifications
- **OPENAI_API_KEY**: Get from OpenAI (optional - fallback responses work without it)

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view your portfolio.

### 4. Update Your Information

Edit the following files with your details:

- `app/page.tsx` - Update GitHub, LinkedIn links
- `app/api/chat/route.ts` - Update CV_CONTEXT with your information
- `public/cv.pdf` - Replace with your CV

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Deploy: `netlify deploy --prod`

## Customization

### Change Colors

Edit `app/globals.css` to customize the color scheme.

### Add More Sections

Edit `app/page.tsx` to add new sections following the existing pattern.

### Customize AI Responses

Edit `app/api/chat/route.ts` to update CV_CONTEXT with your information.

## License

MIT - Feel free to use this template for your own portfolio!

## Credits

Built with bugs & love by Hani Mohamed
