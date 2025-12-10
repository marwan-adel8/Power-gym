// Simple encryption/decryption utility
// This makes tokens unreadable in localStorage

const SECRET_KEY = 'FitMaker_2024_Secret_Key_XYZ123'; // Change this to your own secret

// Simple XOR encryption (good enough for hiding data in DevTools)
export const encryptData = (data) => {
  if (!data) return null;
  
  try {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    let encrypted = '';
    
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }
    
    // Convert to base64 to make it look more encrypted
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  if (!encryptedData) return null;
  
  try {
    // Decode from base64
    const encrypted = atob(encryptedData);
    let decrypted = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }
    
    // Try to parse as JSON, if it fails return as string
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    // If decryption fails, it might be unencrypted data from old storage
    // Return the original data as-is
    try {
      return JSON.parse(encryptedData);
    } catch {
      return encryptedData;
    }
  }
};

// Secure storage wrapper
export const secureStorage = {
  setItem: (key, value) => {
    const encrypted = encryptData(value);
    if (encrypted) {
      localStorage.setItem(key, encrypted);
    }
  },
  
  getItem: (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    // Try to decrypt, if it fails return original data
    const decrypted = decryptData(data);
    return decrypted;
  },
  
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};
