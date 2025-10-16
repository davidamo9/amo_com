import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Database, Brain, Lock, TrendingUp } from 'lucide-react';

const StatsPanel = () => {
  const [messageCount, setMessageCount] = useState(12847);
  const [responseTime, setResponseTime] = useState(1.2);

  useEffect(() => {
    // Simulate message counter incrementing
    const interval = setInterval(() => {
      setMessageCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Response Time', value: `${responseTime}s`, icon: <Zap size={24} />, color: '#00f0ff' },
    { label: 'Accuracy Rate', value: '94.8%', icon: <Target size={24} />, color: '#7000ff' },
    { label: 'Messages Today', value: messageCount.toLocaleString(), icon: <TrendingUp size={24} />, color: '#ff006e' },
    { label: 'Uptime', value: '99.9%', icon: <Database size={24} />, color: '#ffd700' },
  ];

  const features = [
    {
      icon: <Database size={20} />,
      title: 'Document Ingestion',
      description: 'Multi-format support: PDF, DOCX, TXT, MD, HTML',
    },
    {
      icon: <Zap size={20} />,
      title: 'Advanced Retrieval',
      description: 'Hybrid search with vector + keyword matching',
    },
    {
      icon: <Target size={20} />,
      title: 'Sub-2s Response',
      description: 'Lightning-fast with intelligent caching',
    },
    {
      icon: <Brain size={20} />,
      title: 'Custom Models',
      description: 'GPT-4, Claude, Llama, or fine-tuned models',
    },
    {
      icon: <Lock size={20} />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption, on-premise options',
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Auto-Scaling',
      description: 'Handles 1K to 1M+ messages seamlessly',
    },
  ];

  return (
    <div className="extraction-panel">
      <div className="extraction-header">📊 Live Performance Stats</div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="extraction-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: `linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(112, 0, 255, 0.05) 100%)`,
              border: `1px solid ${stat.color}33`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <div className="extraction-card-label">{stat.label}</div>
            </div>
            <div className="extraction-card-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technology Showcase */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 700 }}>
          ⚡ Powered By Advanced AI
        </h4>
      </div>

      <div className="extraction-cards">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="extraction-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(0, 240, 255, 0.4)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginTop: '0.25rem',
                }}
              >
                {feature.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                  {feature.title}
                </div>
                <div style={{ color: '#a0a0a0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {feature.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(0, 240, 255, 0.05)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '8px',
              height: '8px',
              background: '#00ff00',
              borderRadius: '50%',
              boxShadow: '0 0 10px #00ff00',
            }}
          />
          <span style={{ color: '#00ff00', fontSize: '0.9rem', fontWeight: 600 }}>
            AI Engine Online
          </span>
        </div>
        <p style={{ color: '#666666', fontSize: '0.8rem', marginTop: '0.5rem', marginBottom: 0 }}>
          Ready to assist with your queries
        </p>
      </motion.div>
    </div>
  );
};

export default StatsPanel;
