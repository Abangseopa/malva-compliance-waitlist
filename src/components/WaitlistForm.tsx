
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { saveWaitlistEntry } from '@/services/waitlistService';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    console.log("WaitlistForm: Submitting email to Google Form:", email);

    try {
      // Save to Google Form
      const success = await saveWaitlistEntry(email);
      
      if (!success) {
        toast.error("There was a problem submitting your email. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      toast.success("You've been added to our waitlist!");
      console.log("WaitlistForm: Email successfully added to Google Form waitlist");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast.error("There was a problem adding you to the waitlist. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative fancy-input rounded-full shadow-sm">
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isSuccess ? (
                  <CheckCircle className="h-5 w-5 text-green-500 animate-fade-in" />
                ) : (
                  <Mail className="h-5 w-5 text-malva-500/70" />
                )}
              </div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-0 w-full focus:ring-2 focus:ring-malva-400 focus:ring-opacity-50 transition-all bg-white/90 backdrop-blur-sm shadow-inner"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`absolute right-1 top-1 bottom-1 rounded-full px-5 btn-hover-effect transition-all duration-300
                ${isSubmitting ? 'loading-animation bg-malva-400' : 'bg-malva-500 hover:bg-malva-600'}`}
            >
              {isSubmitting ? (
                "Adding you..."
              ) : isSuccess ? (
                "Added!"
              ) : (
                <div className="flex items-center">
                  <span className="mr-1">Join waitlist</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WaitlistForm;
