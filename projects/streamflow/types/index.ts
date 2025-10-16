export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  extractedData?: ExtractedData;
}

export interface ExtractedData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  intent?: string;
  issue?: string;
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
  icon: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  messages: Omit<ChatMessage, 'id' | 'timestamp'>[];
  interactive?: boolean;
}
