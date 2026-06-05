export const EVENT_STATUSES = ["Inquiry Received", "Contacted", "Quotation Sent", "Confirmed", "Completed"];

const getInquiries = () => {
  try {
    const str = localStorage.getItem('freshsip_event_inquiries');
    return str ? JSON.parse(str) : [];
  } catch {
    return [];
  }
};

const saveInquiries = (inquiries) => {
  localStorage.setItem('freshsip_event_inquiries', JSON.stringify(inquiries));
};

export const eventService = {
  submitInquiry: async (inquiryData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newInquiry = {
      id: "enq_" + Math.random().toString(36).substr(2, 9),
      ...inquiryData,
      status: "Inquiry Received",
      createdAt: new Date().toISOString(),
      followUps: []
    };

    const inquiries = getInquiries();
    inquiries.push(newInquiry);
    saveInquiries(inquiries);
    return newInquiry;
  },

  getAllInquiries: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getInquiries().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  updateInquiryStatus: async (id, status) => {
    const inquiries = getInquiries();
    const index = inquiries.findIndex(enq => enq.id === id);
    if (index !== -1) {
      inquiries[index].status = status;
      saveInquiries(inquiries);
      return inquiries[index];
    }
    throw new Error("Inquiry not found");
  },

  addFollowUp: async (id, note) => {
    const inquiries = getInquiries();
    const index = inquiries.findIndex(enq => enq.id === id);
    if (index !== -1) {
      inquiries[index].followUps.push({
        id: Date.now(),
        note,
        date: new Date().toISOString()
      });
      saveInquiries(inquiries);
      return inquiries[index];
    }
    throw new Error("Inquiry not found");
  }
};
