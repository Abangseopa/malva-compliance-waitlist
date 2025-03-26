
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, HelpCircle, Phone, Flag } from 'lucide-react';
import Logo from '@/components/Logo';
import GlowingBackground from '@/components/GlowingBackground';
import FadeInSection from '@/components/FadeInSection';

const Contact = () => {
  return (
    <div className="min-h-screen w-full">
      <GlowingBackground />
      
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            className="rounded-full px-5 hover:bg-white/80 border border-transparent hover:border-gray-200 transition-all duration-300"
            onClick={() => window.location.href = '/'}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="rounded-full px-5 hover:bg-white/80 border border-transparent hover:border-gray-200 transition-all duration-300"
            onClick={() => window.location.href = '/admin'}
          >
            Admin
          </Button>
        </div>
      </header>

      <main className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-gray-900">
            Contact & Support
          </h1>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto text-center">
            Have questions or need help? Our team is here to assist you with any inquiries about Malva's payment platform.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FadeInSection delay={100}>
            <div className="glass-card p-8 flex flex-col items-center">
              <div className="h-16 w-16 bg-malva-50 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-malva-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-gray-600 text-center mb-6">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.open('mailto:abang@wharton.upenn.edu')}
              >
                <Mail className="h-4 w-4" />
                abang@wharton.upenn.edu
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="glass-card p-8 flex flex-col items-center">
              <div className="h-16 w-16 bg-malva-50 rounded-full flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-malva-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <p className="text-gray-600 text-center mb-6">
                Speak directly with our support team during business hours.
              </p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => window.open('tel:+12679394192')}
              >
                <Flag className="h-4 w-4 text-blue-600" /> 
                <span className="mr-1">🇺🇸</span>
                +1 267 939 4192
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="glass-card p-8 flex flex-col items-center">
              <div className="h-16 w-16 bg-malva-50 rounded-full flex items-center justify-center mb-6">
                <HelpCircle className="h-8 w-8 text-malva-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">FAQs</h3>
              <p className="text-gray-600 text-center mb-6">
                Find answers to commonly asked questions about our services.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
              >
                View FAQs
              </Button>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection>
          <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-malva-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-malva-500"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-malva-500"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-malva-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button className="w-full md:w-auto bg-malva-500 hover:bg-malva-600">
                Send Message
              </Button>
            </div>
          </div>
        </FadeInSection>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-500 mt-2">
              Free and instant global B2B payments
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

export default Contact;
