import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WhatsAppService } from '../src/services/whatsapp';

// Mock the Twilio API
jest.mock('twilio', () => {
  return jest.fn().mockImplementation(() => {
    return {
      messages: {
        create: jest.fn().mockResolvedValue({
          sid: 'SM123456',
          status: 'queued',
          dateCreated: new Date().toISOString()
        })
      }
    };
  });
});

describe('WhatsApp Notification Service', () => {
  let whatsappService;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create WhatsApp service instance
    whatsappService = new WhatsAppService({
      accountSid: 'AC123456',
      authToken: 'auth123456',
      phoneNumber: '+961 81 540 918'
    });
  });

  it('sends booking confirmation notifications', async () => {
    // Test data
    const bookingData = {
      id: 'BK-2025-0401-1',
      client: {
        name: 'Nadia Mansour',
        phone: '+961 70 123 456'
      },
      room: 'Neon Lounge',
      date: '2025-04-01',
      time: '14:00-17:00',
      persons: 6,
      total: 450000
    };
    
    // Send notification
    const result = await whatsappService.sendBookingConfirmation(bookingData);
    
    // Check if Twilio API was called
    expect(result.success).toBe(true);
    expect(result.sid).toBe('SM123456');
    
    // Check if message contains correct information
    const twilioInstance = require('twilio')();
    const createCall = twilioInstance.messages.create.mock.calls[0][0];
    
    expect(createCall.to).toBe('+961 70 123 456');
    expect(createCall.from).toBe('whatsapp:+961 81 540 918');
    expect(createCall.body).toContain('Nadia Mansour');
    expect(createCall.body).toContain('BK-2025-0401-1');
    expect(createCall.body).toContain('Neon Lounge');
    expect(createCall.body).toContain('2025-04-01');
    expect(createCall.body).toContain('14:00-17:00');
  });

  it('sends order confirmation notifications', async () => {
    // Test data
    const orderData = {
      id: 'ORD-2025-0401-1',
      client: {
        name: 'Nadia Mansour',
        phone: '+961 70 123 456'
      },
      room: 'Neon Lounge',
      items: [
        { name: 'Arguile (Apple)', quantity: 1, price: 100000 },
        { name: 'Hummus', quantity: 1, price: 75000 },
        { name: 'Soft Drink', quantity: 2, price: 30000 }
      ],
      total: 235000
    };
    
    // Send notification
    const result = await whatsappService.sendOrderConfirmation(orderData);
    
    // Check if Twilio API was called
    expect(result.success).toBe(true);
    expect(result.sid).toBe('SM123456');
    
    // Check if message contains correct information
    const twilioInstance = require('twilio')();
    const createCall = twilioInstance.messages.create.mock.calls[0][0];
    
    expect(createCall.to).toBe('+961 70 123 456');
    expect(createCall.from).toBe('whatsapp:+961 81 540 918');
    expect(createCall.body).toContain('Nadia Mansour');
    expect(createCall.body).toContain('ORD-2025-0401-1');
    expect(createCall.body).toContain('Neon Lounge');
    expect(createCall.body).toContain('Arguile (Apple)');
    expect(createCall.body).toContain('Hummus');
    expect(createCall.body).toContain('Soft Drink');
    expect(createCall.body).toContain('235000');
  });

  it('sends staff alerts for new bookings', async () => {
    // Test data
    const bookingData = {
      id: 'BK-2025-0401-1',
      client: {
        name: 'Nadia Mansour',
        phone: '+961 70 123 456'
      },
      room: 'Neon Lounge',
      date: '2025-04-01',
      time: '14:00-17:00',
      persons: 6,
      total: 450000
    };
    
    const staffPhones = ['+961 71 987 654', '+961 71 876 543'];
    
    // Send notifications
    const results = await Promise.all(
      staffPhones.map(phone => 
        whatsappService.sendStaffBookingAlert(bookingData, phone)
      )
    );
    
    // Check if Twilio API was called for each staff member
    expect(results.length).toBe(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
    
    // Check if messages contain correct information
    const twilioInstance = require('twilio')();
    const createCalls = twilioInstance.messages.create.mock.calls;
    
    expect(createCalls.length).toBe(2);
    expect(createCalls[0][0].to).toBe('+961 71 987 654');
    expect(createCalls[1][0].to).toBe('+961 71 876 543');
    
    expect(createCalls[0][0].body).toContain('NEW BOOKING ALERT');
    expect(createCalls[0][0].body).toContain('Nadia Mansour');
    expect(createCalls[0][0].body).toContain('Neon Lounge');
  });

  it('sends staff alerts for new orders', async () => {
    // Test data
    const orderData = {
      id: 'ORD-2025-0401-1',
      client: {
        name: 'Nadia Mansour',
        phone: '+961 70 123 456'
      },
      room: 'Neon Lounge',
      items: [
        { name: 'Arguile (Apple)', quantity: 1, price: 100000 },
        { name: 'Hummus', quantity: 1, price: 75000 },
        { name: 'Soft Drink', quantity: 2, price: 30000 }
      ],
      total: 235000
    };
    
    const staffPhones = ['+961 71 987 654', '+961 71 876 543'];
    
    // Send notifications
    const results = await Promise.all(
      staffPhones.map(phone => 
        whatsappService.sendStaffOrderAlert(orderData, phone)
      )
    );
    
    // Check if Twilio API was called for each staff member
    expect(results.length).toBe(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
    
    // Check if messages contain correct information
    const twilioInstance = require('twilio')();
    const createCalls = twilioInstance.messages.create.mock.calls;
    
    expect(createCalls.length).toBe(2);
    expect(createCalls[0][0].to).toBe('+961 71 987 654');
    expect(createCalls[1][0].to).toBe('+961 71 876 543');
    
    expect(createCalls[0][0].body).toContain('NEW ORDER ALERT');
    expect(createCalls[0][0].body).toContain('Nadia Mansour');
    expect(createCalls[0][0].body).toContain('Neon Lounge');
    expect(createCalls[0][0].body).toContain('Arguile (Apple)');
  });

  it('handles errors gracefully', async () => {
    // Mock Twilio error
    const twilioInstance = require('twilio')();
    twilioInstance.messages.create.mockRejectedValueOnce(new Error('Twilio error'));
    
    // Test data
    const orderData = {
      id: 'ORD-2025-0401-1',
      client: {
        name: 'Nadia Mansour',
        phone: '+961 70 123 456'
      },
      room: 'Neon Lounge',
      items: [
        { name: 'Arguile (Apple)', quantity: 1, price: 100000 }
      ],
      total: 100000
    };
    
    // Send notification
    const result = await whatsappService.sendOrderConfirmation(orderData);
    
    // Check if error is handled
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe('Twilio error');
  });
});
