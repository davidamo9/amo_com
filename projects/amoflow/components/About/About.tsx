import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Feature } from '../../types';
import FeatureIcon from './FeatureIcon';
import './About.css';

const featuresData: Feature[] = [
  {
    id: 'tech',
    icon: 'tech',
    title: 'Modern Technology',
    description: 'Cutting-edge AI solutions tailored to your business needs',
  },
  {
    id: 'security',
    icon: 'security',
    title: 'Security First',
    description: 'On-premise options for sensitive data protection',
  },
  {
    id: 'automation',
    icon: 'automation',
    title: 'Automation',
    description: 'Streamline workflows and reduce manual tasks',
  },
  {
    id: 'custom',
    icon: 'custom',
    title: 'Custom Solutions',
    description: 'Every solution tailored to your specific requirements',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Choose AMOflow?</h2>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="feature-icon">
                <FeatureIcon type={feature.icon as 'tech' | 'security' | 'automation' | 'custom'} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
