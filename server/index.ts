import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'Neural Style Transfer',
      description: 'Deep learning model that applies artistic styles to images using TensorFlow and PyTorch',
      tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'AWS'],
      github: 'https://github.com/example/neural-style-transfer',
      demo: 'https://neural-style-demo.vercel.app',
      image: '/project1.jpg'
    },
    {
      id: 2,
      title: 'Predictive Analytics Dashboard',
      description: 'Real-time ML pipeline for customer behavior prediction with interactive visualizations',
      tech: ['Python', 'Scikit-learn', 'React', 'FastAPI', 'PostgreSQL'],
      github: 'https://github.com/example/predictive-dashboard',
      demo: 'https://predictive-dashboard.vercel.app',
      image: '/project2.jpg'
    },
    {
      id: 3,
      title: 'NLP Sentiment Analyzer',
      description: 'Multi-language sentiment analysis using transformer models and cloud deployment',
      tech: ['Python', 'Transformers', 'Docker', 'GCP', 'FastAPI'],
      github: 'https://github.com/example/sentiment-analyzer',
      demo: 'https://sentiment-analyzer.vercel.app',
      image: '/project3.jpg'
    },
    {
      id: 4,
      title: 'Computer Vision Pipeline',
      description: 'End-to-end object detection and tracking system for real-time video analysis',
      tech: ['Python', 'YOLO', 'OpenCV', 'MLflow', 'Kubernetes'],
      github: 'https://github.com/example/cv-pipeline',
      demo: 'https://cv-pipeline-demo.vercel.app',
      image: '/project4.jpg'
    }
  ];
  
  res.json(projects);
});

app.get('/api/skills', (req, res) => {
  const skills = {
    technical: [
      { name: 'Python', level: 90 },
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'Machine Learning', level: 88 },
      { name: 'Deep Learning', level: 82 },
      { name: 'Data Science', level: 86 },
      { name: 'React/TypeScript', level: 80 },
      { name: 'AWS/GCP', level: 75 },
      { name: 'Docker/Kubernetes', level: 78 }
    ],
    soft: [
      'Problem Solving',
      'Critical Thinking',
      'Curiosity-Driven Learning',
      'Collaborative Development',
      'Adaptability',
      'Technical Communication'
    ]
  };
  
  res.json(skills);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});