import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Service } from '../../types';
import ServiceIcon from './ServiceIcon';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData: Service[] = [
  {
    id: 'website',
    icon: 'website',
    title: 'Website Creation & Optimization',
    description: 'Build modern, high-performing websites with complete setup',
    features: [
      'Domain configuration & hosting',
      'Traffic analytics & monitoring',
      'SEO optimization',
      'Responsive design',
    ],
  },
  {
    id: 'chatbot',
    icon: 'chatbot',
    title: 'AI Chatbot Integration',
    description: 'Customer-facing intelligent chatbots with automated workflows',
    features: [
      'Lead & complaint extraction',
      'Automated email replies',
      'Ticket creation & management',
      'Zapier integration for automation',
    ],
  },
  {
    id: 'internal',
    icon: 'internal',
    title: 'Internal AI Knowledge System',
    description: 'On-premise RAG chatbot for secure, company-specific training',
    features: [
      'On-premise hosting for security',
      'Internal guidelines & documentation',
      'Technical training & onboarding',
      'No external data sharing',
    ],
  },
  {
    id: 'crm',
    icon: 'crm',
    title: 'CRM Integration',
    description: 'Seamless connection between AI chatbots and your CRM',
    features: [
      'Automatic lead capture',
      'Multi-platform CRM support',
      'Real-time data synchronization',
      'Custom workflow automation',
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card');

      gsap.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions to power your digital transformation
          </p>
        </motion.div>

        <div className="services-grid" ref={cardsRef}>
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className="service-card"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="service-icon">
                <ServiceIcon type={service.icon as 'website' | 'chatbot' | 'internal' | 'crm'} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
