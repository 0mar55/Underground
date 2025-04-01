// Mock WhatsApp service without Twilio dependency

// Mock implementation for sending messages
const sendWhatsAppMessage = async (to, message) => {
  console.log(`[MOCK] Sending WhatsApp message to ${to}: ${message}`);
  
  // Return a success response
  return {
    success: true,
    message: 'Message sent successfully (mock)',
    to,
    from: '+961 81 540 918',
    body: message,
  };
};

// Mock implementation for staff notifications
const notifyStaff = async (staffPhoneNumbers, notification) => {
  console.log(`[MOCK] Notifying staff: ${notification}`);
  
  // Log the notification
  staffPhoneNumbers.forEach(phoneNumber => {
    console.log(`[MOCK] Would send to ${phoneNumber}: ${notification}`);
  });
  
  return {
    success: true,
    message: 'Staff notified successfully (mock)',
  };
};

export { sendWhatsAppMessage, notifyStaff };
