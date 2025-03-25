
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { ArrowLeft, Lock, ExternalLink } from 'lucide-react';
import Logo from '@/components/Logo';
import GlowingBackground from '@/components/GlowingBackground';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'malva2024'; // Simple static password for demo purposes

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast.success("Successfully logged in");
    } else {
      toast.error("Incorrect password");
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
            
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center flex-col text-center">
                <div className="bg-malva-100 p-4 rounded-full mb-4">
                  <ExternalLink className="h-8 w-8 text-malva-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Google Sheets Integration</h3>
                <p className="text-gray-600 mb-6">
                  Waitlist entries are now being saved to a Google Sheet through a Google Form submission.
                  You'll need to access your Google Sheet directly to view all submissions.
                </p>
                <Button className="bg-malva-500 hover:bg-malva-600 flex items-center gap-2"
                  onClick={() => window.open('https://docs.google.com/spreadsheets/create', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Access Google Sheets
                </Button>
                <p className="mt-8 text-sm text-gray-500">
                  Note: This is a one-way integration. All form submissions are sent to your Google Sheet,
                  but this admin panel cannot display them.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
