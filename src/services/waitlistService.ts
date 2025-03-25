// A service to submit waitlist entries to a Google Form
// This creates a centralized database that works across all devices

export interface WaitlistEntry {
  email: string;
  date: string;
}

// Google Form submission URL
// This form will automatically save entries to a Google Sheet
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdFiWnf-UjcrnE1QNB46AWkSxMCvpkUXRIl9XTw6hbQFY2wpQ/formResponse";
const EMAIL_ENTRY_ID = "entry.1694508658"; // The entry ID for the email field in your Google Form

// We'll keep a local copy of the form for display purposes, but all submissions go to Google
let cachedEntries: WaitlistEntry[] = [];

// Fetch all waitlist entries (for display only - we can't actually retrieve from Google Forms)
export const fetchWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  console.log("Note: This returns only cached entries since we can't directly read from Google Forms");
  return cachedEntries;
};

// Save waitlist entry to Google Form
export const saveWaitlistEntry = async (email: string): Promise<boolean> => {
  try {
    console.log("Adding new email to Google Form waitlist:", email);
    
    // Create form data for submission
    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, email);
    
    // Use no-cors mode to allow the form submission without CORS issues
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // This prevents CORS issues but also means we won't get a proper response
      body: formData
    });
    
    // Since we're using no-cors, we won't get a proper response
    // We'll assume it worked and add to our local cache for display
    const newEntry = {
      email,
      date: new Date().toISOString()
    };
    
    // Add to local cache for this session only
    cachedEntries = [...cachedEntries, newEntry];
    console.log("Email submitted to Google Form and added to local cache");
    
    return true;
  } catch (error) {
    console.error('Error saving waitlist entry to Google Form:', error);
    return false;
  }
};
