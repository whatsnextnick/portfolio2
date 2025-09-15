import React, { useState, useEffect } from 'react'
import { SkillSet } from '../types'

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillSet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills')
        const data = await response.json()
        setSkills(data)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
        setSkills({
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
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const SkillBar: React.FC<{ name: string; level: number; delay: number }> = ({ name, level, delay }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedLevel(level)
      }, delay)
      return () => clearTimeout(timer)
    }, [level, delay])

    return (
      <div className="mb-4 animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary font-medium">{name}</span>
          <span className="text-sm text-secondary">{level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-accent to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedLevel}%` }}
          />
        </div>
      </div>
    )
  }

  if (loading || !skills) {
    return (
      <section id="skills" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-secondary">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="section-padding section-bg">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            A comprehensive skill set built through hands-on experimentation, 
            continuous learning, and real-world application in ML projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              Technical Skills
            </h3>
            <div className="space-y-4">
              {skills.technical.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill, index) => (
                  <div
                    key={skill}
                    className="card p-4 text-center hover:scale-105 transition-transform duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-primary font-medium text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-primary mb-4">Learning Philosophy</h4>
                <div className="space-y-3 text-secondary text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Experiment First:</strong> I learn by building, breaking, and rebuilding</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Stay Current:</strong> Active in ML communities, following latest research</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Cross-Domain:</strong> Apply insights from one field to solve problems in another</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg px-6 py-3 shadow-md">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-primary font-medium">Always learning, always building</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills