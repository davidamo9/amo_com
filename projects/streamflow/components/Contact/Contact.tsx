import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ContactForm } from '../../types';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to transform your business? Let's talk!
          </p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.input
              type="text"
              name="company"
              placeholder="Company Name (Optional)"
              value={formData.company}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.textarea
              name="message"
              placeholder="Tell us about your needs"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
