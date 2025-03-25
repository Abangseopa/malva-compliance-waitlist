
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Mail, CheckCircle, ArrowRight, Download } from 'lucide-react';

interface WaitlistEntry {
  email: string;
  date: string;
}

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);

  // Load saved entries from localStorage when component mounts
  useEffect(() => {
    const savedEmails = localStorage.getItem('waitlistEmails');
    const savedEntries = localStorage.getItem('waitlistEntries');
    
    if (savedEntries) {
      setWaitlistEntries(JSON.parse(savedEntries));
    } else if (savedEmails) {
      // Convert old format to new format
      const entries = JSON.parse(savedEmails).map((email: string) => ({
        email,
        date: new Date().toISOString()
      }));
      setWaitlistEntries(entries);
      localStorage.setItem('waitlistEntries', JSON.stringify(entries));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if email is already in the waitlist
    if (waitlistEntries.some(entry => entry.email === email)) {
      toast.info("This email is already on our waitlist!");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newEntry = {
        email: email,
        date: new Date().toISOString()
      };
      
      const updatedEntries = [...waitlistEntries, newEntry];
      
      // Save to localStorage (both formats for compatibility)
      localStorage.setItem('waitlistEntries', JSON.stringify(updatedEntries));
      localStorage.setItem('waitlistEmails', JSON.stringify(updatedEntries.map(entry => entry.email)));
      
      setWaitlistEntries(updatedEntries);
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      toast.success("You've been added to our waitlist!");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  const downloadEmailsAsCSV = () => {
    if (waitlistEntries.length === 0) {
      toast.error("No emails in the waitlist yet");
      return;
    }

    // Format emails as CSV content
    const csvContent = "data:text/csv;charset=utf-8,Email,Date\n" + 
      waitlistEntries.map(entry => `${entry.email},${new Date(entry.date).toLocaleString()}`).join("\n");
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `malva-waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Downloaded ${waitlistEntries.length} email${waitlistEntries.length > 1 ? 's' : ''}`);
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

      {waitlistEntries.length > 0 && (
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadEmailsAsCSV}
            className="text-xs text-gray-500 hover:text-malva-600 flex items-center gap-1 mx-auto"
          >
            <Download className="h-3 w-3" />
            Download {waitlistEntries.length} email{waitlistEntries.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
