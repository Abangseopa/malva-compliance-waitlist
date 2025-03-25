
// A shared cloud database service using jsonbin.io
// This creates a centralized database that works across all devices

const BIN_ID = "65e3a45d266cfc3fde81a07e"; // This is a free public bin for demo purposes
const READ_API_KEY = "$2a$10$V9qzCSueBe4MeVo/LdD4KO/s8qkpPHC36u8PTaQSUh7Y7nJcjA/tG"; // Read-only API key
const WRITE_API_KEY = "$2a$10$pLj1MhzzaSxQ5QVCQFx/n.2Nr5d1.2iY3USr07nDcxZNvx1JtMhS2"; // Write-enabled API key

export interface WaitlistEntry {
  email: string;
  date: string;
}

// Fetch all waitlist entries from the cloud database
export const fetchWaitlistEntries = async (): Promise<WaitlistEntry[]> => {
  try {
    console.log("Fetching waitlist entries from JSONBin...");
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': READ_API_KEY,
        'X-Bin-Meta': 'false'
      }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch waitlist data', await response.text());
      return [];
    }
    
    const data = await response.json();
    console.log("Received data from JSONBin:", data);
    
    if (!data || !Array.isArray(data)) {
      console.log("No entries or invalid data format returned from JSONBin, initializing empty array");
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return [];
  }
};

// Save waitlist entries to the cloud database
export const saveWaitlistEntry = async (email: string): Promise<boolean> => {
  try {
    console.log("Adding new email to waitlist:", email);
    
    // First get existing entries
    const entries = await fetchWaitlistEntries();
    console.log("Current entries:", entries);
    
    // Check if email already exists
    if (entries.some(entry => entry.email === email)) {
      console.log("Email already exists in waitlist");
      return false; // Email already exists
    }
    
    // Add new entry
    const newEntry = {
      email,
      date: new Date().toISOString()
    };
    
    const updatedEntries = [...entries, newEntry];
    console.log("Updated entries to save:", updatedEntries);
    
    // Update the remote database with WRITE_API_KEY
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': WRITE_API_KEY
      },
      body: JSON.stringify(updatedEntries)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to update remote database', errorText);
      return false;
    }
    
    console.log("Successfully saved to JSONBin");
    return true;
  } catch (error) {
    console.error('Error saving waitlist entry:', error);
    return false;
  }
};
