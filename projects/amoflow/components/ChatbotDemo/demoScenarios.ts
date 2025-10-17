import type { DemoScenario } from '../../types';

export const demoScenarios: DemoScenario[] = [
  {
    id: 'lead-qualification',
    title: 'Lead Qualification',
    description: 'Capture and qualify potential customers',
    icon: 'user-check',
    messages: [
      {
        text: "Hi! I'm interested in learning more about your AI chatbot solutions.",
        sender: 'user',
        extractedData: {
          intent: 'Product Inquiry',
        },
      },
      {
        text: "Hello! I'd be happy to help you learn about our AI chatbot solutions. May I have your name?",
        sender: 'ai',
      },
      {
        text: 'Sure, my name is Sarah Johnson.',
        sender: 'user',
        extractedData: {
          name: 'Sarah Johnson',
        },
      },
      {
        text: "Great to meet you, Sarah! What's the best email to send you more information?",
        sender: 'ai',
      },
      {
        text: 'You can reach me at sarah.johnson@techcorp.com',
        sender: 'user',
        extractedData: {
          email: 'sarah.johnson@techcorp.com',
          company: 'TechCorp',
        },
      },
      {
        text: "Perfect! I've got your details. Our team will send you a comprehensive overview of our solutions within the next hour. Is there anything specific you'd like to know right now?",
        sender: 'ai',
      },
      {
        text: 'What industries do you specialize in?',
        sender: 'user',
      },
      {
        text: 'We specialize in E-commerce, SaaS, Healthcare, and Financial Services. Our AI chatbots have helped companies reduce support costs by 60% on average. Would you like to schedule a live demo?',
        sender: 'ai',
      },
    ],
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    description: 'Handle complaints and create tickets',
    icon: 'headphones',
    messages: [
      {
        text: "I'm having issues with my recent order #12345.",
        sender: 'user',
        extractedData: {
          intent: 'Support Request',
          issue: 'Order Issue #12345',
        },
      },
      {
        text: "I'm sorry to hear that! I'll help you resolve this. May I have your name and email to look up your order?",
        sender: 'ai',
      },
      {
        text: 'Michael Chen, michael.chen@email.com',
        sender: 'user',
        extractedData: {
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
        },
      },
      {
        text: "Thanks Michael. I've found your order. What seems to be the problem?",
        sender: 'ai',
      },
      {
        text: 'The package arrived damaged and one item is missing.',
        sender: 'user',
        extractedData: {
          issue: 'Damaged package, missing item',
        },
      },
      {
        text: "I've created ticket #TK-8472 for your case. You'll receive a replacement shipment within 2-3 business days. Is there anything else I can help with?",
        sender: 'ai',
      },
    ],
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking',
    description: 'Schedule meetings and extract contact info',
    icon: 'calendar',
    messages: [
      {
        text: "I'd like to schedule a consultation for next week.",
        sender: 'user',
        extractedData: {
          intent: 'Appointment Request',
        },
      },
      {
        text: "I'd be happy to help you schedule a consultation! First, may I have your name?",
        sender: 'ai',
      },
      {
        text: 'Emily Rodriguez',
        sender: 'user',
        extractedData: {
          name: 'Emily Rodriguez',
        },
      },
      {
        text: 'Great! And your phone number so we can confirm?',
        sender: 'ai',
      },
      {
        text: '+1 (555) 123-4567',
        sender: 'user',
        extractedData: {
          phone: '+1 (555) 123-4567',
        },
      },
      {
        text: 'Perfect! We have Tuesday at 2 PM or Thursday at 10 AM available. Which works better for you?',
        sender: 'ai',
      },
      {
        text: 'Thursday at 10 AM works perfectly!',
        sender: 'user',
      },
      {
        text: "You're all set, Emily! You'll receive a calendar invite at your email shortly. Looking forward to speaking with you on Thursday!",
        sender: 'ai',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Query',
    description: 'Product inquiries and recommendations',
    icon: 'shopping-cart',
    messages: [
      {
        text: 'Do you have any AI chatbot plans for small businesses?',
        sender: 'user',
        extractedData: {
          intent: 'Product Inquiry - Small Business',
        },
      },
      {
        text: 'Absolutely! We have a Starter plan perfect for small businesses. It includes up to 1,000 conversations per month and all essential features. May I get your email to send you detailed pricing?',
        sender: 'ai',
      },
      {
        text: "Sure, it's david@mystartup.io",
        sender: 'user',
        extractedData: {
          email: 'david@mystartup.io',
          company: 'MyStartup',
        },
      },
      {
        text: "Thanks! I see you're with MyStartup. What's your name?",
        sender: 'ai',
      },
      {
        text: 'David Park',
        sender: 'user',
        extractedData: {
          name: 'David Park',
        },
      },
      {
        text: "Perfect, David! I've sent the pricing details to your email. The Starter plan is just $99/month with a 14-day free trial. Would you like to start your trial now?",
        sender: 'ai',
      },
    ],
  },
  {
    id: 'try-yourself',
    title: 'Try It Yourself',
    description: 'Chat with our AI and see the technology in action',
    icon: 'rocket',
    interactive: true,
    messages: [
      {
        text: "Hi! I'm your AI assistant. Ask me anything about our services, or just chat to see how I work!",
        sender: 'ai',
      },
    ],
  },
];
