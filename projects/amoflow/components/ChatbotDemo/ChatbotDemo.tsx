import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage, ExtractedData } from '../../types';
import { demoScenarios } from './demoScenarios';
import StatsPanel from './StatsPanel';
import './ChatbotDemo.css';

const ChatbotDemo = () => {
  const [activeScenario, setActiveScenario] = useState(demoScenarios[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData>({});
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoSectionRef = useRef<HTMLDivElement>(null);

  const isInteractive = activeScenario.interactive || false;

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    const chatMessages = messagesEndRef.current?.parentElement;
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  useEffect(() => {
    // Only auto-scroll if we have messages
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    // Reset when scenario changes
    setMessages([]);
    setExtractedData({});
    setCurrentMessageIndex(0);
    setUserInput('');

    // Start playing scenario only if not interactive
    if (!isInteractive) {
      playScenario();
    } else {
      // Load initial AI message for interactive mode
      if (activeScenario.messages.length > 0) {
        const initialMessage: ChatMessage = {
          id: Date.now().toString(),
          text: activeScenario.messages[0].text,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages([initialMessage]);
      }
    }
  }, [activeScenario]);

  const playScenario = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= activeScenario.messages.length) {
        clearInterval(interval);
        return;
      }

      const scenarioMessage = activeScenario.messages[index];

      // Show typing indicator
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const newMessage: ChatMessage = {
          id: Date.now().toString() + index,
          text: scenarioMessage.text,
          sender: scenarioMessage.sender,
          timestamp: new Date(),
          extractedData: scenarioMessage.extractedData,
        };

        setMessages(prev => [...prev, newMessage]);

        // Update extracted data
        if (scenarioMessage.extractedData) {
          setExtractedData(prev => ({
            ...prev,
            ...scenarioMessage.extractedData,
          }));
        }

        setCurrentMessageIndex(index + 1);
      }, scenarioMessage.sender === 'ai' ? 1500 : 800);

      index++;
    }, 3000);
  };

  // API Integration - Connected to Railway backend via Vercel API
  const sendMessageToAI = async (userMessage: string): Promise<string> => {
    try {
      // Build messages array for conversation context
      const conversationMessages = [
        ...messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages,
          sessionId: sessionStorage.getItem('chatSessionId') || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();

      // Store session ID for conversation continuity
      if (data.sessionId) {
        sessionStorage.setItem('chatSessionId', data.sessionId);
      }

      return data.content || data.response || data.message || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error('Error calling chat API:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsSending(true);
    setIsTyping(true);

    try {
      const aiResponse = await sendMessageToAI(userInput);

      setIsTyping(false);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);

      // Show error message to user
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="demo" className="chatbot-demo" ref={demoSectionRef}>
      <div className="chatbot-demo-container">
        <motion.div
          className="demo-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="demo-title">See It In Action</h2>
          <p className="demo-subtitle">
            Watch our AI chatbot extract data, qualify leads, and automate workflows in real-time
          </p>
        </motion.div>

        {/* Scenario Switcher */}
        <div className="scenario-switcher">
          {demoScenarios.map((scenario) => (
            <motion.button
              key={scenario.id}
              className={`scenario-btn ${activeScenario.id === scenario.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveScenario(scenario);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {scenario.title}
            </motion.button>
          ))}
        </div>

        {/* Demo Grid */}
        <div className="demo-grid">
          {/* Chat Interface */}
          <motion.div
            className="chat-interface"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="chat-header">💬 Live Conversation</div>
            <div className="chat-messages">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className="chat-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`message-bubble ${message.sender}`}>
                      <p className="message-text">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="chat-message">
                  <div className="message-bubble ai">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Field - Only show in interactive mode */}
            {isInteractive && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isSending}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(10, 10, 10, 0.6)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                    e.target.style.background = 'rgba(10, 10, 10, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                    e.target.style.background = 'rgba(10, 10, 10, 0.6)';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isSending}
                  style={{
                    padding: '0.875rem 1.75rem',
                    background: userInput.trim() && !isSending
                      ? 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)'
                      : 'rgba(100, 100, 100, 0.3)',
                    border: 'none',
                    borderRadius: '12px',
                    color: userInput.trim() && !isSending ? '#000000' : '#666666',
                    fontWeight: 600,
                    cursor: userInput.trim() && !isSending ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSending ? '...' : 'Send'}
                </button>
              </div>
            )}
          </motion.div>

          {/* Extraction Panel or Stats Panel */}
          {isInteractive ? (
            <StatsPanel />
          ) : (
            <motion.div
              className="extraction-panel"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            <div className="extraction-header">🎯 Extracted Data</div>
            <div className="extraction-cards">
              <AnimatePresence>
                {extractedData.name && (
                  <motion.div
                    key="extraction-name"
                    className="extraction-card name"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="extraction-card-label">Name</div>
                    <div className="extraction-card-value">{extractedData.name}</div>
                  </motion.div>
                )}

                {extractedData.email && (
                  <motion.div
                    key="extraction-email"
                    className="extraction-card email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="extraction-card-label">Email</div>
                    <div className="extraction-card-value">{extractedData.email}</div>
                  </motion.div>
                )}

                {extractedData.phone && (
                  <motion.div
                    key="extraction-phone"
                    className="extraction-card phone"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="extraction-card-label">Phone</div>
                    <div className="extraction-card-value">{extractedData.phone}</div>
                  </motion.div>
                )}

                {extractedData.company && (
                  <motion.div
                    key="extraction-company"
                    className="extraction-card intent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="extraction-card-label">Company</div>
                    <div className="extraction-card-value">{extractedData.company}</div>
                  </motion.div>
                )}

                {extractedData.intent && (
                  <motion.div
                    key="extraction-intent"
                    className="extraction-card intent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="extraction-card-label">Intent</div>
                    <div className="extraction-card-value">{extractedData.intent}</div>
                  </motion.div>
                )}

                {extractedData.issue && (
                  <motion.div
                    key="extraction-issue"
                    className="extraction-card intent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="extraction-card-label">Issue</div>
                    <div className="extraction-card-value">{extractedData.issue}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {Object.keys(extractedData).length === 0 && (
                <div className="empty-state">
                  <div className="empty-state-icon">📊</div>
                  <p>Data will appear here as the conversation progresses...</p>
                </div>
              )}
            </div>
          </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemo;
