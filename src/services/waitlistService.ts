// A service to submit waitlist entries to a Google Form
// This creates a centralized database that works across all devices

export interface WaitlistEntry {
  email: string;
  date: string;
}

// We'll keep a local copy of the form for display purposes
let cachedEntries: WaitlistEntry[] = [];

// Fetch all waitlist entries (for display only)
export const fetchWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  console.log("Note: This returns only cached entries since we can't directly read from Google Forms");
  return cachedEntries;
};

// Save waitlist entry to Google Form
export const saveWaitlistEntry = async (email: string): Promise<boolean> => {
  try {
    console.log("Submitting email to Google Form waitlist:", email);
    
    // This is the Google Form submission URL
    // Replace FORM_ID with your actual Google Form ID
    // and ENTRY_ID with your email field entry ID from the form
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdFiWnf-UjcrnE1QNB46AWkSxMCvpkUXRIl9XTw6hbQFY2wpQ/formResponse";
    
    // Create form data
    const formData = new FormData();
    formData.append('entry.123456789', email); // Replace 123456789 with your actual entry ID
    
    // Attempt to submit to Google Form
    // Note: Due to CORS restrictions, this will work when deployed but may not work in development
    // For testing, we'll use a no-cors request which won't return a proper response but will submit the data
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // This is important to avoid CORS issues
      body: formData
    });
    
    // Add to local cache for this session only
    const newEntry = {
      email,
      date: new Date().toISOString()
    };
    
    cachedEntries = [...cachedEntries, newEntry];
    console.log("Email submitted to Google Form waitlist");
    
    return true;
  } catch (error) {
    console.error('Error saving waitlist entry to Google Form:', error);
    return false;
  }
};

// Instructions for Google Form setup:
/*
1. Create a new Google Form at https://forms.google.com/
2. Add a question of type "Short answer" for the email field
3. Click on the three dots on the question and select "Get pre-filled link"
4. Fill in a sample email and click "Get link"
5. From the URL, copy the form ID (long string after /e/ and before /formResponse)
6. Also note the entry ID (the number after "entry.")
7. Update the GOOGLE_FORM_URL and entry ID in this file
8. Responses will be collected in the "Responses" tab of your Google Form
   and can be exported to Google Sheets
*/
