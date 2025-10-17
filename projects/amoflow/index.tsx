'use client';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import ChatbotDemo from './components/ChatbotDemo/ChatbotDemo';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Import global styles for AMOflow
import './styles/global.css';

export default function AmoflowApp() {
  return (
    <div className="amoflow-app">
      <Navbar />
      <Hero />
      <Services />
      <ChatbotDemo />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
