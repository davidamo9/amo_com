import { motion } from 'framer-motion';
import { Zap, Shield, Workflow, Target } from 'lucide-react';

interface FeatureIconProps {
  type: 'tech' | 'security' | 'automation' | 'custom';
}

const FeatureIcon = ({ type }: FeatureIconProps) => {
  const containerVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.15, 1],
      rotate: 0, // Keep icon upright while border rotates
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const renderIcon = () => {
    switch (type) {
      case 'tech':
        return <Zap size={50} strokeWidth={1.5} />;
      case 'security':
        return <Shield size={50} strokeWidth={1.5} />;
      case 'automation':
        return <Workflow size={50} strokeWidth={1.5} />;
      case 'custom':
        return <Target size={50} strokeWidth={1.5} />;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px' }}>
      {/* Rotating border */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '100px',
          marginLeft: '-50px',
          marginTop: '-50px',
          border: '3px solid transparent',
          borderRadius: '50%',
          borderTopColor: '#E8D5C4',
          borderRightColor: '#00f0ff',
          willChange: 'transform',
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(135deg, #E8D5C4 0%, #00f0ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          {renderIcon()}
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureIcon;
