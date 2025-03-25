
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { ArrowLeft, Trash2, Lock, Download, Upload } from 'lucide-react';
import Logo from '@/components/Logo';
import GlowingBackground from '@/components/GlowingBackground';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface WaitlistEntry {
  email: string;
  date: string;
}

const Admin = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'malva2024'; // Simple static password for demo purposes

  useEffect(() => {
    // Check URL for imported data
    const params = new URLSearchParams(window.location.search);
    const importData = params.get('importData');
    
    if (importData) {
      try {
        const decodedData = decodeURIComponent(importData);
        const parsedData = JSON.parse(atob(decodedData));
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Save imported data to localStorage
          localStorage.setItem('waitlistEntries', JSON.stringify(parsedData));
          setWaitlistEntries(parsedData);
          toast.success(`Imported ${parsedData.length} waitlist entries`);
          
          // Remove the query parameter
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error("Error importing data:", error);
        toast.error("Failed to import data. Invalid format.");
      }
    } else {
      // Regular loading from localStorage
      const savedEntries = localStorage.getItem('waitlistEntries');
      
      if (savedEntries) {
        setWaitlistEntries(JSON.parse(savedEntries));
      } else {
        // Fall back to the old format if needed
        const savedEmails = localStorage.getItem('waitlistEmails');
        if (savedEmails) {
          // Convert old format to new format
          const emails = JSON.parse(savedEmails);
          const entries: WaitlistEntry[] = emails.map((email: string) => ({
            email,
            date: new Date().toISOString()
          }));
          setWaitlistEntries(entries);
          // Store in the new format as well
          localStorage.setItem('waitlistEntries', JSON.stringify(entries));
        }
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast.success("Successfully logged in");
    } else {
      toast.error("Incorrect password");
    }
  };

  const clearWaitlist = () => {
    if (confirm('Are you sure you want to clear all waitlist emails? This cannot be undone.')) {
      localStorage.setItem('waitlistEntries', JSON.stringify([]));
      localStorage.setItem('waitlistEmails', JSON.stringify([]));
      setWaitlistEntries([]);
      toast.success("Waitlist has been cleared");
    }
  };

  const exportWaitlist = () => {
    if (waitlistEntries.length === 0) {
      toast.info("No entries to export");
      return;
    }
    
    // Convert to base64 to make it URL-safe
    const data = btoa(JSON.stringify(waitlistEntries));
    
    // Create shareable URL with data
    const exportUrl = `${window.location.origin}${window.location.pathname}?importData=${encodeURIComponent(data)}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(exportUrl).then(() => {
      toast.success("Export URL copied to clipboard! Share this with your other devices or team members.");
    }).catch(err => {
      console.error("Could not copy to clipboard: ", err);
      toast.error("Failed to copy to clipboard. Select and copy the URL manually.");
      // Show in alert as fallback
      alert(`Copy this URL to import waitlist data: ${exportUrl}`);
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch(e) {
      return "Date not available";
    }
  };

  return (
    <div className="min-h-screen w-full">
      <GlowingBackground />
      
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Logo />
        <Button 
          variant="ghost" 
          className="rounded-full px-5 hover:bg-white/80 border border-transparent hover:border-gray-200 transition-all duration-300 flex items-center gap-2"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </header>

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isAuthenticated ? (
          <div className="glass-card p-8 rounded-lg max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-malva-100 p-3 rounded-full">
                <Lock className="h-8 w-8 text-malva-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full bg-malva-500 hover:bg-malva-600">
                Login
              </Button>
            </form>
          </div>
        ) : (
          <div className="glass-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Waitlist Submissions</h2>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Button 
                variant="destructive" 
                onClick={clearWaitlist} 
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Waitlist
              </Button>
              
              <Button 
                variant="outline" 
                onClick={exportWaitlist} 
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Waitlist
              </Button>
            </div>
            
            {waitlistEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No emails in the waitlist yet.
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-500">Total submissions: {waitlistEntries.length}</p>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Signup Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {waitlistEntries.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{entry.email}</TableCell>
                          <TableCell>{formatDate(entry.date)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
