import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding section-bg">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              Breaking Things to Build <span className="gradient-text">Better Solutions</span>
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              My journey from curious student to ML developer is driven by one philosophy: 
              understanding systems by exploring their limits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="animate-slide-up">
                <h3 className="text-xl font-semibold text-primary mb-4">The Career Transition Story</h3>
                <p className="text-secondary leading-relaxed mb-4">
                  I didn't start in tech, but that's exactly what makes me valuable. My background in 
                  <strong className="text-primary"> problem-solving across different domains</strong> gives 
                  me a unique perspective on approaching ML challenges.
                </p>
                <p className="text-secondary leading-relaxed">
                  While others see roadblocks, I see puzzles. I dive deep into documentation, 
                  experiment with edge cases, and push boundaries until I understand not just 
                  <em>how</em> something works, but <em>why</em> it works that way.
                </p>
              </div>

              <div className="animate-slide-up">
                <h3 className="text-xl font-semibold text-primary mb-4">Why Startups Love Working With Me</h3>
                <ul className="space-y-3 text-secondary">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-primary">Rapid Learning:</strong> I adapt quickly to new technologies and frameworks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-primary">Practical Focus:</strong> I build solutions that work in production, not just demos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-primary">Ownership Mindset:</strong> I take responsibility for outcomes, not just code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-primary">Cross-functional:</strong> I bridge technical complexity with business needs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="card p-8">
                <h3 className="text-xl font-semibold text-primary mb-6">Current Focus Areas</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-accent">
                    <h4 className="font-medium text-primary mb-2">Deep Learning & Computer Vision</h4>
                    <p className="text-sm text-secondary">
                      Building robust pipelines for real-time image processing and object detection
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-accent">
                    <h4 className="font-medium text-primary mb-2">MLOps & Production Systems</h4>
                    <p className="text-sm text-secondary">
                      Scaling ML models with Docker, Kubernetes, and cloud-native architectures
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-accent">
                    <h4 className="font-medium text-primary mb-2">Experimental AI Applications</h4>
                    <p className="text-sm text-secondary">
                      Exploring cutting-edge research and turning it into practical solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Available for new opportunities</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-secondary">Remote or Miami, FL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About