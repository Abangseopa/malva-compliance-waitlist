
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';

const WaitlistForm = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/1W5wqRoa6RGapNqHLOuuBW7rmohoVmPQdT2ZvxuPvpus/edit";
  
  const handleRedirectToForm = () => {
    window.open(googleFormUrl, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full">
        <div className="relative fancy-input rounded-full shadow-sm">
          <Button
            onClick={handleRedirectToForm}
            className="w-full py-6 rounded-full px-5 btn-hover-effect transition-all duration-300 bg-malva-500 hover:bg-malva-600"
          >
            <div className="flex items-center justify-center">
              <Mail className="h-5 w-5 mr-3" />
              <span>Join the waitlist</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500 flex items-center justify-center">
          <span>You'll be redirected to our Google Form</span>
        </p>
      </div>
    </div>
  );
};

export default WaitlistForm;
