import { motion } from 'framer-motion';
import { Globe, MessageSquareCode, Lock, Link2 } from 'lucide-react';

interface ServiceIconProps {
  type: 'website' | 'chatbot' | 'internal' | 'crm';
}

const ServiceIcon = ({ type }: ServiceIconProps) => {
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const renderIcon = () => {
    switch (type) {
      case 'website':
        return <Globe size={60} strokeWidth={1.5} />;
      case 'chatbot':
        return <MessageSquareCode size={60} strokeWidth={1.5} />;
      case 'internal':
        return <Lock size={60} strokeWidth={1.5} />;
      case 'crm':
        return <Link2 size={60} strokeWidth={1.5} />;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      {/* Icon */}
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderIcon()}
      </motion.div>
    </div>
  );
};

export default ServiceIcon;
