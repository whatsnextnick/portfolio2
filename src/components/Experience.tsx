import React, { useRef, useEffect } from 'react'
import epicChamberLogo from '../assets/epic-chamber-logo.png'

interface ExperienceItem {
  company: string
  logo?: string
  position: string
  location?: string
  period: string
  description: string[]
}

const Experience: React.FC = () => {
  const experienceRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (experienceRef.current) {
      observer.observe(experienceRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const experiences: ExperienceItem[] = [
    {
      company: "EPIC | US Chamber of Commerce",
      logo: epicChamberLogo,
      position: "Full Stack Developer (AI Integration) Intern",
      period: "Summer 2025",
      description: [
        "Implemented intelligent team dynamics analysis along with an automated recommendation system by integrating OpenAI's GPT-3.5-turbo model",
        "Leveraged insights from natural language processing and ML techniques to analyze team dynamics, generate data-driven recommendations, and provide actionable steps for teams to improve their synchrony",
        "Built and integrated custom dashboard and UI components into the existing full-stack platform, enhancing the insights derived from the application's AI-analytics",
        "Presented to stakeholders the technologies and methods used to implement the final dashboard/solution for the company"
      ]
    },
    {
      company: "Syneurgy",
      position: "Full Stack Developer (AI Integration) Intern",
      period: "Summer 2025",
      description: [
        "Implemented intelligent team dynamics analysis along with an automated recommendation system by integrating OpenAI's GPT-3.5-turbo model",
        "Leveraged insights from natural language processing and ML techniques to analyze team dynamics, generate data-driven recommendations, and provide actionable steps for teams to improve their synchrony",
        "Built and integrated custom dashboard and UI components into the existing full-stack platform, enhancing the insights derived from the application's AI-analytics",
        "Presented to stakeholders the technologies and methods used to implement the final dashboard/solution for the company"
      ]
    },
    {
      company: "Wix.com",
      position: "Product Support Owner",
      location: "Miami Beach, FL",
      period: "August 2020 - June 2023",
      description: [
        "Analyze data on user feedback and generate monthly and quarterly reports. Document user's pain points and work closely with Product Managers and relevant stakeholders on improving user experience and creating new features",
        "Update relevant departments the timeline of new releases and new internal workflows for the Wix Mobile App",
        "Deliver data-driven quarterly roadmap presentations to senior leadership including C-level executives on performance metrics for product"
      ]
    }
  ]

  return (
    <section ref={experienceRef} id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              My journey through various roles where I've applied machine learning, 
              AI technologies, and full-stack development to create impactful solutions.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
              >
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-px h-12 bg-gradient-to-b from-blue-300 to-transparent"></div>
                )}
                
                <div className="grid lg:grid-cols-4 gap-8 items-start">
                  
                  {/* Company Logo & Info */}
                  <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                    {exp.logo && (
                      <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden shadow-md bg-white p-2 flex items-center justify-center">
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-primary text-center lg:text-left mb-2">
                      {exp.company}
                    </h3>
                    <div className="text-sm text-secondary text-center lg:text-left">
                      <div className="font-medium text-blue-600 mb-1">{exp.period}</div>
                      {exp.location && (
                        <div className="text-gray-500">{exp.location}</div>
                      )}
                    </div>
                  </div>

                  {/* Position & Description */}
                  <div className="lg:col-span-3">
                    <h4 className="text-2xl font-semibold text-primary mb-4">
                      {exp.position}
                    </h4>
                    
                    <div className="space-y-3">
                      {exp.description.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-secondary leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Skills Tags */}
                    {index === 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {['OpenAI GPT-3.5-turbo', 'NLP', 'Machine Learning', 'React', 'Dashboard Development', 'Stakeholder Presentations'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {index === 2 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {['Data Analysis', 'Product Management', 'User Experience', 'Mobile App', 'C-level Presentations', 'Roadmap Planning'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience