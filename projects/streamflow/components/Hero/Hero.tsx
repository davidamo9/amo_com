import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.textContent?.split('');
      if (letters) {
        titleRef.current.innerHTML = letters
          .map((letter, i) => `<span class="letter" style="animation-delay: ${i * 0.03}s">${letter === ' ' ? '&nbsp;' : letter}</span>`)
          .join('');
      }
    }

    // Mouse follow effect for gradient orbs
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          left: clientX,
          top: clientY,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          left: clientX,
          top: clientY,
          duration: 2,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
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
    <section id="home" className="hero" ref={heroRef}>
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 ref={titleRef} className="hero-title">
          Transform Your Business with AI-Powered Solutions
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          From intelligent websites to custom chatbots and seamless CRM integration -
          we automate your workflow and elevate customer experience
        </motion.p>

        <motion.div className="cta-buttons" variants={itemVariants}>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
          <motion.a
            href="#services"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="gradient-orb orb-1" ref={orb1Ref}></div>
      <div className="gradient-orb orb-2" ref={orb2Ref}></div>
    </section>
  );
};

export default Hero;
