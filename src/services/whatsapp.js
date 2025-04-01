// This is a placeholder service for WhatsApp integration
// In production, you would use actual Twilio credentials

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'AC00000000000000000000000000000000';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+961 81 540 918';

// Mock implementation for development
const sendWhatsAppMessage = async (to, message) => {
  console.log(`Sending WhatsApp message to ${to}: ${message}`);
  
  // In development or without credentials, just return a success response
  return {
    success: true,
    message: 'Message would be sent in production environment',
    to,
    from: twilioPhoneNumber,
    body: message,
  };
};

// Mock implementation for staff notifications
const notifyStaff = async (staffPhoneNumbers, notification) => {
  console.log(`Notifying staff: ${notification}`);
  
  // In development, just log the notification
  staffPhoneNumbers.forEach(phoneNumber => {
    console.log(`Would send to ${phoneNumber}: ${notification}`);
  });
  
  return {
    success: true,
    message: 'Staff would be notified in production environment',
  };
};

export { sendWhatsAppMessage, notifyStaff };
