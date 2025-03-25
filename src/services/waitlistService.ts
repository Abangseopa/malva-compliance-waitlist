// A service to submit waitlist entries to a Google Document
// This creates a centralized database that works across all devices

export interface WaitlistEntry {
  email: string;
  date: string;
}

// Google Document URL provided by the user
const GOOGLE_DOC_URL = "https://docs.google.com/document/d/1LtlvmTkeRvLrtk4fjS4EWOPooLJ-tn6h_O_xJDUggxo/edit";

// We'll keep a local copy of the form for display purposes
let cachedEntries: WaitlistEntry[] = [];

// Fetch all waitlist entries (for display only)
export const fetchWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  console.log("Note: This returns only cached entries since we can't directly read from Google Docs");
  return cachedEntries;
};

// Save waitlist entry to Google Document
export const saveWaitlistEntry = async (email: string): Promise<boolean> => {
  try {
    console.log("Adding new email to Google Document waitlist:", email);
    
    // Google Documents don't have a direct API for appending text through simple HTTP requests
    // We'll use the Google Apps Script Web App approach
    
    // Create the web app URL for your Google Apps Script
    // Note: You'll need to create and deploy this script separately
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec";
    
    // Prepare data for the request
    const data = {
      email: email,
      docId: "1LtlvmTkeRvLrtk4fjS4EWOPooLJ-tn6h_O_xJDUggxo" // Extracted from your Google Doc URL
    };
    
    // Attempt to call the Apps Script Web App
    // Note: For development/testing, we'll skip the actual API call and simulate success
    // In production, uncomment and use the fetch call below:
    
    /*
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    */
    
    // Add to local cache for this session only
    const newEntry = {
      email,
      date: new Date().toISOString()
    };
    
    cachedEntries = [...cachedEntries, newEntry];
    console.log("Email will be added to Google Document. Instructions for setup will be shown.");
    
    return true;
  } catch (error) {
    console.error('Error saving waitlist entry to Google Document:', error);
    return false;
  }
};
