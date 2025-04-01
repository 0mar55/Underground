// WhatsApp notification service using Twilio
import twilio from 'twilio';

// Twilio credentials (in a real app, these would be in environment variables)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Twilio sandbox number

// Initialize Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Send WhatsApp message
 * @param {string} to - Recipient phone number with WhatsApp prefix (e.g., 'whatsapp:+1234567890')
 * @param {string} message - Message content
 * @returns {Promise} - Promise with message details
 */
export const sendWhatsAppMessage = async (to, message) => {
  try {
    // Format the 'to' number if it doesn't have the WhatsApp prefix
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    // Send the message
    const messageResponse = await client.messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER,
      to: formattedTo
    });
    
    console.log(`WhatsApp message sent with SID: ${messageResponse.sid}`);
    return {
      success: true,
      sid: messageResponse.sid,
      status: messageResponse.status
    };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send staff alert for new booking
 * @param {Object} booking - Booking object
 * @param {string} staffPhone - Staff phone number
 * @returns {Promise} - Promise with message details
 */
export const sendBookingAlert = async (booking, staffPhone) => {
  const message = `🔔 NEW BOOKING ALERT 🔔
Room: ${booking.roomName}
Client: ${booking.clientName}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.startTime} (${booking.duration} hours)
Persons: ${booking.persons}
Total: ${booking.totalPrice.toLocaleString()} LBP

Please confirm or reject this booking in the staff portal.`;

  return sendWhatsAppMessage(staffPhone, message);
};

/**
 * Send booking confirmation to customer
 * @param {Object} booking - Booking object
 * @param {string} customerPhone - Customer phone number
 * @returns {Promise} - Promise with message details
 */
export const sendBookingConfirmation = async (booking, customerPhone) => {
  const message = `✅ BOOKING CONFIRMED ✅
Thank you for booking with Underground Chilling Room!

Room: ${booking.roomName}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.startTime} (${booking.duration} hours)
Persons: ${booking.persons}
Total: ${booking.totalPrice.toLocaleString()} LBP

We look forward to seeing you! For any changes, please contact us at least 2 hours before your booking time.`;

  return sendWhatsAppMessage(customerPhone, message);
};

/**
 * Send order alert to staff
 * @param {Object} order - Order object
 * @param {string} staffPhone - Staff phone number
 * @returns {Promise} - Promise with message details
 */
export const sendOrderAlert = async (order, staffPhone) => {
  // Create items list
  const itemsList = order.items.map(item => 
    `- ${item.quantity}x ${item.name} (${item.price.toLocaleString()} LBP)`
  ).join('\n');

  const message = `🔔 NEW ORDER ALERT 🔔
Room: ${order.roomName}
Client: ${order.clientName}
Items:
${itemsList}

Subtotal: ${order.subtotal.toLocaleString()} LBP
Service: ${order.serviceCharge.toLocaleString()} LBP
Total: ${order.total.toLocaleString()} LBP

Please prepare this order as soon as possible.`;

  return sendWhatsAppMessage(staffPhone, message);
};

/**
 * Send order status update to customer
 * @param {Object} order - Order object
 * @param {string} status - Order status
 * @param {string} customerPhone - Customer phone number
 * @returns {Promise} - Promise with message details
 */
export const sendOrderStatusUpdate = async (order, status, customerPhone) => {
  let statusEmoji, statusMessage;
  
  switch(status) {
    case 'preparing':
      statusEmoji = '👨‍🍳';
      statusMessage = 'Your order is now being prepared.';
      break;
    case 'delivered':
      statusEmoji = '✅';
      statusMessage = 'Your order has been delivered. Enjoy!';
      break;
    case 'cancelled':
      statusEmoji = '❌';
      statusMessage = 'Your order has been cancelled.';
      break;
    default:
      statusEmoji = '🔄';
      statusMessage = `Your order status is now: ${status}`;
  }
  
  const message = `${statusEmoji} ORDER UPDATE ${statusEmoji}
Order #${order.id}
${statusMessage}

Thank you for choosing Underground Chilling Room!`;

  return sendWhatsAppMessage(customerPhone, message);
};

/**
 * Send inventory alert to staff
 * @param {Object} item - Inventory item
 * @param {string} staffPhone - Staff phone number
 * @returns {Promise} - Promise with message details
 */
export const sendInventoryAlert = async (item, staffPhone) => {
  const message = `⚠️ LOW INVENTORY ALERT ⚠️
Item: ${item.name}
Current Quantity: ${item.quantity} ${item.unit}
Threshold: ${item.lowStockThreshold} ${item.unit}

Please restock this item soon.`;

  return sendWhatsAppMessage(staffPhone, message);
};

export default {
  sendWhatsAppMessage,
  sendBookingAlert,
  sendBookingConfirmation,
  sendOrderAlert,
  sendOrderStatusUpdate,
  sendInventoryAlert
};
