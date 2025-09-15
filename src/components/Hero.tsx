import React, { useRef, useEffect } from 'react'

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
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Transforming Data Into{' '}
              <span className="gradient-text">Intelligent Solutions</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              ML Developer with a curiosity-driven approach to solving complex problems. 
              I break things to build better solutions, turning cutting-edge research into 
              practical applications that drive startup innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary">
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