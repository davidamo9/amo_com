import AmoflowApp from '@/projects/amoflow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AMOflow - AI Business Solutions | Aung Myint Oo',
  description: 'Experience AMOflow: AI-powered platform for seamless business operations. Automated lead capture, intelligent chatbots, and workflow automation for SMBs.',
  openGraph: {
    title: 'AMOflow - AI Business Solutions',
    description: 'AI-powered platform for better connectivity and efficiency in your business operations',
    type: 'website',
  },
};

export default function AmoflowPage() {
  return <AmoflowApp />;
}
