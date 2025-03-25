
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { ArrowLeft, Trash2, Lock } from 'lucide-react';
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
import { fetchWaitlistEntries, WaitlistEntry } from '@/services/waitlistService';

const Admin = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const correctPassword = 'malva2024'; // Simple static password for demo purposes

  useEffect(() => {
    // Only load entries if authenticated
    if (isAuthenticated) {
      loadWaitlistEntries();
    }
  }, [isAuthenticated]);

  const loadWaitlistEntries = async () => {
    setIsLoading(true);
    try {
      const entries = await fetchWaitlistEntries();
      setWaitlistEntries(entries);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading waitlist entries:", error);
      toast.error("Failed to load waitlist entries. Please try again.");
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast.success("Successfully logged in");
    } else {
      toast.error("Incorrect password");
    }
  };

  const refreshWaitlist = async () => {
    await loadWaitlistEntries();
    toast.success("Waitlist refreshed");
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
                variant="outline" 
                onClick={refreshWaitlist} 
                className="flex items-center gap-2"
              >
                Refresh Waitlist
              </Button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <p>Loading waitlist data...</p>
              </div>
            ) : waitlistEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No emails in the waitlist yet.</p>
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
                <p className="mt-6 text-sm text-gray-500">
                  This waitlist is now centralized. All submissions from any device will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
