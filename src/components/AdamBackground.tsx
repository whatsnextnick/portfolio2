import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface OptimizationPoint {
  x: number
  y: number
  momentum: number
  velocity: number
}

interface LearningRateRegion {
  cx: number
  cy: number
  r: number
  intensity: number
}

const AdamBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const ballRef = useRef<SVGCircleElement>(null)
  const particlesRef = useRef<SVGGElement>(null)
  const landscapeRef = useRef<HTMLDivElement>(null)
  const regionsRef = useRef<HTMLDivElement>(null)

  // Extended optimization path from top to bottom
  const optimizationPath: OptimizationPoint[] = [
    { x: 20, y: 5, momentum: 0.1, velocity: 0.1 },   // Start at top
    { x: 25, y: 12, momentum: 0.15, velocity: 0.2 },
    { x: 35, y: 18, momentum: 0.2, velocity: 0.25 },
    { x: 30, y: 25, momentum: 0.25, velocity: 0.3 },  // Early exploration
    { x: 45, y: 32, momentum: 0.3, velocity: 0.35 },
    { x: 40, y: 40, momentum: 0.35, velocity: 0.4 },
    { x: 55, y: 47, momentum: 0.4, velocity: 0.45 },  // Mid descent
    { x: 60, y: 55, momentum: 0.45, velocity: 0.5 },
    { x: 70, y: 62, momentum: 0.5, velocity: 0.55 },
    { x: 75, y: 70, momentum: 0.55, velocity: 0.6 },
    { x: 80, y: 77, momentum: 0.6, velocity: 0.65 },  // Approaching minimum
    { x: 85, y: 83, momentum: 0.7, velocity: 0.75 },
    { x: 88, y: 88, momentum: 0.8, velocity: 0.85 },
    { x: 90, y: 92, momentum: 0.9, velocity: 0.95 },  // Near convergence
    { x: 92, y: 95, momentum: 0.95, velocity: 0.98 }  // Global minimum at bottom
  ]

  const learningRateRegions: LearningRateRegion[] = [
    { cx: 25, cy: 15, r: 20, intensity: 0.4 },   // Top region
    { cx: 45, cy: 35, r: 25, intensity: 0.5 },   // Mid region
    { cx: 65, cy: 55, r: 22, intensity: 0.6 },   // Lower mid
    { cx: 85, cy: 80, r: 18, intensity: 0.7 },   // Near bottom
    { cx: 90, cy: 93, r: 15, intensity: 0.8 }    // Convergence region
  ]

  const createOptimizationPath = (): string => {
    let path = `M ${optimizationPath[0].x} ${optimizationPath[0].y}`
    
    for (let i = 1; i < optimizationPath.length; i++) {
      const curr = optimizationPath[i]
      const prev = optimizationPath[i - 1]
      
      const cp1x = prev.x + (curr.x - prev.x) * 0.4
      const cp1y = prev.y + (curr.y - prev.y) * 0.4
      const cp2x = curr.x - (curr.x - prev.x) * 0.4
      const cp2y = curr.y - (curr.y - prev.y) * 0.4
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
    }
    
    return path
  }

  const getPointOnPath = (progress: number): { x: number, y: number } => {
    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress))
    
    if (progress === 0) {
      return { x: optimizationPath[0].x, y: optimizationPath[0].y }
    }
    
    if (progress === 1) {
      const lastPoint = optimizationPath[optimizationPath.length - 1]
      return { x: lastPoint.x, y: lastPoint.y }
    }
    
    // Find which segment we're in
    const totalSegments = optimizationPath.length - 1
    const segmentProgress = progress * totalSegments
    const segmentIndex = Math.floor(segmentProgress)
    const localProgress = segmentProgress - segmentIndex
    
    // Get the current and next points
    const currentPoint = optimizationPath[segmentIndex]
    const nextPoint = optimizationPath[Math.min(segmentIndex + 1, optimizationPath.length - 1)]
    
    // Calculate control points (same as in createOptimizationPath)
    const cp1x = currentPoint.x + (nextPoint.x - currentPoint.x) * 0.4
    const cp1y = currentPoint.y + (nextPoint.y - currentPoint.y) * 0.4
    const cp2x = nextPoint.x - (nextPoint.x - currentPoint.x) * 0.4
    const cp2y = nextPoint.y - (nextPoint.y - currentPoint.y) * 0.4
    
    // Calculate point on cubic bezier curve
    const t = localProgress
    const t2 = t * t
    const t3 = t2 * t
    const mt = 1 - t
    const mt2 = mt * mt
    const mt3 = mt2 * mt
    
    const x = mt3 * currentPoint.x + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * nextPoint.x
    const y = mt3 * currentPoint.y + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * nextPoint.y
    
    return { x, y }
  }

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !ballRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0.1'
      }
      return
    }

    // Initialize variables in outer scope for cleanup
    let mainTimeline: gsap.core.Timeline | null = null
    let regionAnimations: gsap.core.Tween[] = []
    let ballAnimation: gsap.core.Tween | null = null

    // Handle resize function in outer scope for cleanup
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    // Small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {

    const pathString = createOptimizationPath()
    if (pathRef.current) {
      pathRef.current.setAttribute('d', pathString)
    }

    // Set initial states
    gsap.set(containerRef.current, {
      willChange: 'transform',
      opacity: 0
    })

    gsap.set(ballRef.current, {
      scale: 0,
      opacity: 0,
      cx: optimizationPath[0].x,
      cy: optimizationPath[0].y,
      willChange: 'transform'
    })

    const adamParticles = document.querySelectorAll('.adam-particle')
    const learningRegions = document.querySelectorAll('.learning-rate-region')
    
    if (adamParticles.length > 0) {
      gsap.set('.adam-particle', {
        scale: 0,
        opacity: 0,
        willChange: 'transform'
      })
    }

    if (learningRegions.length > 0) {
      gsap.set('.learning-rate-region', {
        scale: 0.8,
        opacity: 0,
        willChange: 'transform'
      })
    }

    // Main scroll-triggered timeline
    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        ease: 'none',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Update landscape gradient intensity
          gsap.to('.loss-landscape-gradient', {
            opacity: 0.15 + progress * 0.1,
            duration: 0.3,
            ease: 'power2.out'
          })

          // Show particles progressively
          const activeParticles = Math.floor(progress * optimizationPath.length)
          const particles = document.querySelectorAll('.adam-particle')
          if (particles.length > 0) {
            gsap.to('.adam-particle', {
              opacity: (index) => index < activeParticles ? 0.4 : 0,
              scale: (index) => index < activeParticles ? 1 : 0,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.05
            })
          }
        }
      }
    })

    // Animate container fade in
    mainTimeline.to(containerRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })

    // Animate optimization ball along the exact path using bezier curve calculation
    ballAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Get exact point on the curved path
          const pathPoint = getPointOnPath(progress)
          
          // Update ball position to follow the exact path
          gsap.set(ballRef.current, {
            cx: pathPoint.x,
            cy: pathPoint.y,
            opacity: 0.9,
            scale: 1 + (progress > 0.8 ? (progress - 0.8) * 1.5 : 0)
          })
        }
      }
    })

    // Initial ball fade in
    gsap.to(ballRef.current, {
      opacity: 0.9,
      scale: 1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    })

    // Animate learning rate regions
    regionAnimations = learningRateRegions.map((_, index) => {
      return gsap.to(`.learning-rate-region-${index}`, {
        scale: 1.2,
        opacity: 0.15,
        duration: 3 + index * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      })
    })

    // Animate the path drawing
    gsap.fromTo(pathRef.current, {
      strokeDasharray: '5 5',
      strokeDashoffset: 100
    }, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
      }
    })

    // Add continuous glow animation to ball
    gsap.to(ballRef.current, {
      filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    window.addEventListener('resize', handleResize)

    }, 100) // 100ms delay

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      regionAnimations.forEach(animation => animation.kill())
      if (mainTimeline) {
        mainTimeline.kill()
      }
      if (ballAnimation) {
        ballAnimation.kill()
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      {/* Loss Landscape Background */}
      <div 
        ref={landscapeRef}
        className="absolute inset-0 opacity-30"
      >
        <div 
          className="loss-landscape-gradient absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 35% 25% at 25% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 50% 40%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 30% 20% at 70% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 25% 15% at 85% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse 20% 15% at 90% 95%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(75, 85, 99, 0.05) 0%, transparent 80%)
            `
          }}
        />
      </div>

      {/* Learning Rate Regions */}
      <div 
        ref={regionsRef}
        className="absolute inset-0"
      >
        {learningRateRegions.map((region, index) => (
          <div
            key={index}
            className={`learning-rate-region learning-rate-region-${index} absolute rounded-full`}
            style={{
              left: `${region.cx}%`,
              top: `${region.cy}%`,
              width: `${region.r}%`,
              height: `${region.r}%`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(59, 130, 246, ${region.intensity * 0.15}) 0%, transparent 70%)`,
              filter: 'blur(2px)',
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      {/* SVG Animation Layer */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <filter id="subtle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="ballGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>
        </defs>

        {/* Optimization Path */}
        <path
          ref={pathRef}
          d={createOptimizationPath()}
          fill="none"
          stroke="rgba(59, 130, 246, 0.4)"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtle-glow)"
          style={{ willChange: 'transform' }}
        />

        {/* Particle Trail */}
        <g ref={particlesRef}>
          {optimizationPath.map((point, index) => (
            <circle
              key={index}
              className="adam-particle text-blue-400"
              cx={point.x}
              cy={point.y}
              r="0.2"
              fill="currentColor"
              fillOpacity="0.6"
              style={{ willChange: 'transform' }}
            />
          ))}
        </g>

        {/* Optimization Ball */}
        <circle
          ref={ballRef}
          r="1.2"
          cx={optimizationPath[0].x}
          cy={optimizationPath[0].y}
          fill="url(#ballGradient)"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="0.1"
          filter="url(#subtle-glow)"
          style={{ willChange: 'transform' }}
        />

        {/* Labels */}
        <g className="hidden md:block">
          <text 
            x="22" 
            y="8" 
            fontSize="2" 
            fill="rgba(59, 130, 246, 0.3)" 
            className="font-medium"
          >
            Start
          </text>
          <text 
            x="88" 
            y="98" 
            fontSize="2" 
            fill="rgba(16, 185, 129, 0.4)" 
            className="font-medium"
          >
            Global Min
          </text>
        </g>
      </svg>

      {/* Info Panel */}
      <div className="absolute bottom-6 right-6 opacity-0 hover:opacity-40 transition-opacity duration-500 text-sm text-gray-600 hidden lg:block">
        <div className="space-y-1 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="font-medium">Adam Optimizer</div>
          <div className="text-xs opacity-70">Adaptive Moment Estimation</div>
          <div className="text-xs opacity-60">β₁=0.9, β₂=0.999</div>
        </div>
      </div>
    </div>
  )
}

export default AdamBackground