
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { ArrowLeft, Trash2, Lock } from 'lucide-react';
import Logo from '@/components/Logo';
import GlowingBackground from '@/components/GlowingBackground';

const Admin = () => {
  const [waitlistEmails, setWaitlistEmails] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = 'malva2024'; // Simple static password for demo purposes

  useEffect(() => {
    const savedEmails = localStorage.getItem('waitlistEmails');
    if (savedEmails) {
      setWaitlistEmails(JSON.parse(savedEmails));
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
      localStorage.setItem('waitlistEmails', JSON.stringify([]));
      setWaitlistEmails([]);
      toast.success("Waitlist has been cleared");
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
            
            <div className="flex gap-4 mb-6">
              <Button 
                variant="destructive" 
                onClick={clearWaitlist} 
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Waitlist
              </Button>
            </div>
            
            {waitlistEmails.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No emails in the waitlist yet.
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-500">Total submissions: {waitlistEmails.length}</p>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Signup Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {waitlistEmails.map((email, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">Not recorded</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
