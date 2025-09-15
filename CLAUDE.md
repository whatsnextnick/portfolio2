# Claude Development Guide

This document contains information for Claude Code to maintain and develop this ML portfolio website.

## Project Overview

A modern, minimalist portfolio website for a machine learning developer targeting startup opportunities. The site emphasizes technical expertise, curiosity-driven problem-solving, and professional approachability.

## Architecture

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express and TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and production builds
- **Design**: Mobile-first responsive design
- **Structure**: Single-page application with smooth scroll navigation
- **Interactive Element**: Neural network visualization using Canvas API and React hooks

## Key Design Principles

1. **Minimalist Aesthetic**: Clean layouts with strategic white space
2. **Mobile-First**: Responsive design starting from 320px viewport
3. **Performance**: Optimized loading times and smooth animations
4. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
5. **Professional**: Startup-friendly tone with technical credibility

## Content Strategy

- **Hero**: Clear value proposition for ML expertise
- **About**: Career transition story with problem-solving focus
- **Projects**: 4 ML projects showcasing modern technologies
- **Skills**: Technical competencies and mindset
- **Contact**: Startup recruiter-optimized

## Color Palette

- Primary: #1a1a1a (near black)
- Background: #ffffff (white)
- Accent: #3b82f6 (blue)
- Secondary: #6b7280 (gray)
- Text: #374151 (dark gray)

## Typography

- Primary: 'Inter', system fonts
- Clean, readable on mobile
- Responsive font sizes using clamp()

## Interactive Elements

- Neural network visualization in hero section
- Smooth scroll navigation
- Hover effects on project cards
- Animated skill progress indicators

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (frontend)
npm run dev

# Start backend server
npm run server:dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## File Structure

```
/
├── server/
│   └── index.ts        # Express backend server
├── src/
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── NeuralNetworkVisualization.tsx
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx         # Main React component
│   ├── main.tsx        # React entry point
│   └── index.css       # Tailwind CSS styles
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── CHANGELOG.md        # Version history
└── CLAUDE.md          # This file
```

## Future Enhancements

- Add blog section for technical articles
- Implement dark mode toggle
- Add more interactive ML demonstrations
- Include project case studies
- Add testimonials section