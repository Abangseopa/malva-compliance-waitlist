
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Settings, BarChart3, Lock, FileCheck } from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Logo from '@/components/Logo';
import FeatureCard from '@/components/FeatureCard';
import GlowingBackground from '@/components/GlowingBackground';
import FadeInSection from '@/components/FadeInSection';

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <GlowingBackground />
      
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Logo />
        <Button variant="ghost" className="rounded-full px-5 hover:bg-white/80 border border-transparent hover:border-gray-200 transition-all duration-300">
          Contact
        </Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="perspective">
            <div className="transform-3d animate-fade-up max-w-3xl mx-auto">
              <div className="inline-block mb-3 px-3 py-1 bg-malva-50 text-malva-600 text-xs font-medium tracking-wider uppercase rounded-full">
                Coming Soon
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-gray-900 to-malva-800">
                Compliance simplified for stablecoin transactions
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                Malva provides seamless compliance solutions for companies managing stablecoin transactions, ensuring regulatory adherence without compromising on efficiency.
              </p>
              
              <WaitlistForm />
              
              <p className="mt-4 text-sm text-gray-500 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>We respect your privacy. No spam, ever.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-16">Compliance that works for you</h2>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <FadeInSection delay={100}>
              <FeatureCard
                icon={Shield}
                title="Regulatory Compliance"
                description="Stay compliant with evolving stablecoin regulations across jurisdictions with automated monitoring and updates."
                delay={100}
              />
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <FeatureCard
                icon={Settings}
                title="Seamless Integration"
                description="Easily integrate with your existing financial systems and blockchain infrastructure with minimal development effort."
                delay={200}
              />
            </FadeInSection>
            
            <FadeInSection delay={300}>
              <FeatureCard
                icon={BarChart3}
                title="Real-time Analytics"
                description="Monitor transaction compliance status in real-time with comprehensive dashboards and reporting capabilities."
                delay={300}
              />
            </FadeInSection>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-malva-100 rounded-full opacity-60 blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <FadeInSection direction="left">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Why trust Malva with your compliance needs?</h2>
                  <p className="text-gray-600 mb-8">
                    Our platform is built by experts in both blockchain technology and regulatory compliance, ensuring your stablecoin operations remain fully compliant.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      { icon: Lock, text: "End-to-end encryption for all sensitive data" },
                      { icon: FileCheck, text: "Automated reporting for regulatory requirements" },
                      { icon: Shield, text: "Continuous compliance monitoring and alerts" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-malva-500">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
              
              <FadeInSection direction="right" delay={200}>
                <div className="relative perspective">
                  <div className="glass-card p-6 transform-3d rotate-y-1 rotate-x-1 animate-float shadow-lg border border-white/40">
                    <div className="p-8 flex flex-col items-center">
                      <div className="h-16 w-16 bg-malva-50 rounded-full flex items-center justify-center mb-6">
                        <Shield className="h-8 w-8 text-malva-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">Ready for the future of finance</h3>
                      <p className="text-gray-600 text-center mb-6">
                        As stablecoin regulations evolve, Malva adapts to keep your operations compliant and future-proof.
                      </p>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-malva-500 h-full w-3/4 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Join 75% of leading stablecoin companies</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to simplify your stablecoin compliance?</h2>
              <p className="text-gray-600 mb-10">
                Be among the first to experience Malva's revolutionary compliance solution. Join our waitlist today.
              </p>
              <WaitlistForm />
            </div>
          </FadeInSection>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-500 mt-2">
              Compliance made simple for stablecoin transactions
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Malva. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
