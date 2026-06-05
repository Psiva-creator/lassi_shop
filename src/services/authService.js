const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await delay(1500); // Simulate network latency

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    if (password.length < 6) {
      throw new Error("Invalid email or password.");
    }

    const user = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      token: "mock_jwt_token_" + Date.now(),
      loyalty: {
        points: 450,
        tier: "Silver",
        history: [
          { id: 1, type: 'earn', points: 150, description: 'Order #1234', date: '2026-05-20' },
          { id: 2, type: 'earn', points: 300, description: 'Referral Bonus', date: '2026-05-15' }
        ]
      }
    };

    localStorage.setItem('auth_user', JSON.stringify(user));
    return user;
  },

  async register(name, email, phone, password) {
    await delay(1500);

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const user = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email,
      name,
      phone,
      token: "mock_jwt_token_" + Date.now(),
      loyalty: {
        points: 0,
        tier: "Bronze",
        history: []
      }
    };

    localStorage.setItem('auth_user', JSON.stringify(user));
    return user;
  },

  async logout() {
    await delay(500);
    localStorage.removeItem('auth_user');
  },

  async getCurrentUser() {
    // Return synchronously to prevent flash of logged-out state,
    // or simulate a brief verification delay.
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      // Ensure loyalty exists for old mock users
      if (!user.loyalty) {
        user.loyalty = { points: 250, tier: "Bronze", history: [] };
      }
      return user;
    }
    return null;
  },

  async updateLoyaltyPoints(points, type, description) {
    await delay(800);
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) throw new Error("Not authenticated");
    
    const user = JSON.parse(userStr);
    const currentLoyalty = user.loyalty || { points: 0, tier: "Bronze", history: [] };
    
    const newPoints = type === 'earn' ? currentLoyalty.points + points : currentLoyalty.points - points;
    if (newPoints < 0) throw new Error("Insufficient points");

    // Update tier
    let newTier = "Bronze";
    if (newPoints > 3000) newTier = "Platinum";
    else if (newPoints > 1500) newTier = "Gold";
    else if (newPoints > 500) newTier = "Silver";

    const newHistoryEntry = {
      id: Date.now(),
      type,
      points,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedUser = { 
      ...user, 
      loyalty: { 
        points: newPoints, 
        tier: newTier, 
        history: [newHistoryEntry, ...currentLoyalty.history] 
      } 
    };
    
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async updateProfile(updates) {
    await delay(1000);
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) throw new Error("Not authenticated");
    
    const user = JSON.parse(userStr);
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async addAddress(address) {
    await delay(800);
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) throw new Error("Not authenticated");
    
    const user = JSON.parse(userStr);
    const addresses = user.addresses || [];
    const newAddress = { 
      id: "addr_" + Math.random().toString(36).substr(2, 9),
      ...address 
    };
    const updatedUser = { ...user, addresses: [...addresses, newAddress] };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async removeAddress(addressId) {
    await delay(800);
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) throw new Error("Not authenticated");
    
    const user = JSON.parse(userStr);
    const addresses = (user.addresses || []).filter(a => a.id !== addressId);
    const updatedUser = { ...user, addresses };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async updateSettings(settings) {
    await delay(800);
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) throw new Error("Not authenticated");
    
    const user = JSON.parse(userStr);
    const updatedUser = { ...user, settings: { ...(user.settings || {}), ...settings } };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async sendPasswordReset(email) {
    await delay(1500);
    if (!email) throw new Error("Email is required.");
    return true; // Simulate success
  },

  async verifyOTP(otp) {
    await delay(1500);
    if (otp !== "123456" && otp !== "1234") {
      throw new Error("Invalid OTP. Try 123456.");
    }
    return true;
  },

  async getAllUsers() {
    await delay(800);
    return [
      { id: "usr_1", name: "Siva", email: "siva@example.com", phone: "123-456-7890", loyalty: { points: 1200, tier: "Gold" } },
      { id: "usr_2", name: "Alice", email: "alice@example.com", phone: "987-654-3210", loyalty: { points: 300, tier: "Bronze" } },
      { id: "usr_3", name: "Bob", email: "bob@example.com", phone: "555-555-5555", loyalty: { points: 4500, tier: "Platinum" } }
    ];
  }
};
