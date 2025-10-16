import StreamflowApp from '@/projects/streamflow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StreamFlow AI - Intelligent Chatbot Platform | Aung Myint Oo',
  description: 'Experience our AI-powered chatbot platform with automated lead capture, document knowledge base, and CRM integration. Interactive demo available.',
  openGraph: {
    title: 'StreamFlow AI - Intelligent Chatbot Platform',
    description: 'AI-powered automation and chatbot platform with lead capture and CRM integration',
    type: 'website',
  },
};

export default function StreamflowPage() {
  return <StreamflowApp />;
}
