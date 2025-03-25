
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { ArrowLeft, Lock, ExternalLink, FileText, Code } from 'lucide-react';
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

  const googleAppScriptCode = `
function doGet(e) {
  return HtmlService.createHtmlOutput("Google Apps Script for Malva Waitlist");
}

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const docId = data.docId;
    
    // Open the document
    const doc = DocumentApp.openById(docId);
    const body = doc.getBody();
    
    // Append the email at the end of the document
    body.appendParagraph(email + " ");
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Email added successfully"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
  `;

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
            <h2 className="text-2xl font-bold mb-6">Waitlist Integration Setup</h2>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-center mb-8">
                <div className="bg-malva-100 p-4 rounded-full mb-4 inline-block">
                  <FileText className="h-8 w-8 text-malva-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Google Document Integration</h3>
                <p className="text-gray-600 mb-6">
                  Waitlist entries will be saved to your Google Document. Follow these steps to set up the integration:
                </p>
              </div>
              
              <div className="mb-8">
                <h4 className="font-semibold text-lg mb-3">Step 1: Access Your Google Document</h4>
                <Button className="mb-6 bg-malva-500 hover:bg-malva-600 flex items-center gap-2"
                  onClick={() => window.open('https://docs.google.com/document/d/1LtlvmTkeRvLrtk4fjS4EWOPooLJ-tn6h_O_xJDUggxo/edit', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Your Google Document
                </Button>
                
                <h4 className="font-semibold text-lg mb-3">Step 2: Create a Google Apps Script</h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-6">
                  <li>Go to <strong>Extensions</strong> &gt; <strong>Apps Script</strong> in your Google Document</li>
                  <li>Delete any existing code and paste the script below:</li>
                </ol>
                
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
                  <pre className="text-sm">{googleAppScriptCode}</pre>
                </div>
                
                <h4 className="font-semibold text-lg mb-3">Step 3: Deploy as Web App</h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Click the <strong>Deploy</strong> button and select <strong>New deployment</strong></li>
                  <li>Select <strong>Web app</strong> as the deployment type</li>
                  <li>Set <strong>Who has access</strong> to <strong>Anyone</strong></li>
                  <li>Click <strong>Deploy</strong> and authorize the app</li>
                  <li>Copy the Web app URL provided after deployment</li>
                  <li>Replace <code>YOUR_DEPLOYED_SCRIPT_ID</code> in the <code>waitlistService.ts</code> file with your script ID</li>
                </ol>
              </div>
              
              <p className="mt-8 text-sm text-gray-500">
                Note: This is a one-time setup process. Once configured, all waitlist submissions will be 
                automatically added to your Google Document.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
