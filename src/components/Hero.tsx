import React, { useRef, useEffect } from 'react'
import profilePhoto from '../assets/profile-photo.png'

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50/80 via-white/70 to-blue-50/80">
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Content Column */}
            <div className="animate-slide-up order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Hi, my name is{' '}
                <span className="gradient-text">Nicholas Monplaisir</span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-secondary mb-8 leading-relaxed">
                I am both a{' '}
                <span className="gradient-text">Machine Learning Engineer</span>{' '}
                (also skilled in full stack web technologies). I like to apply technologies in machine learning and AI to create solutions, turning cutting-edge research into{' '}
                <span className="gradient-text">practical applications that drive startup innovation</span>.
              </h2>
              
              <p className="text-lg sm:text-xl text-secondary mb-8 max-w-3xl leading-relaxed">
                ML Developer with a curiosity-driven approach to solving complex problems. 
                I like to apply technologies in machine learning and AI to create solutions, 
                turning cutting-edge research into practical applications that drive startup innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-start mb-12">
                <a 
                  href="#projects" 
                  className="btn-primary w-full sm:w-auto text-center"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="btn-secondary w-full sm:w-auto text-center"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Let's Connect
                </a>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></div>
                  <span>Python & TensorFlow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></div>
                  <span>Cloud & MLOps</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></div>
                  <span>Startup Ready</span>
                </div>
              </div>
            </div>
            
            {/* Photo Column */}
            <div className="animate-slide-up order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 backdrop-blur-sm">
                  <img 
                    src={profilePhoto} 
                    alt="Nicholas Monplaisir - Machine Learning Engineer" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-15 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a 
          href="#about"
          className="animate-bounce inline-block p-2 text-accent hover:text-blue-700 transition-colors"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero