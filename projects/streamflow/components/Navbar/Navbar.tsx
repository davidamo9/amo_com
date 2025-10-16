import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navLinksRef = useRef<(HTMLLIElement | null)[]>([]);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section instanceof HTMLElement) {
          if (scrollPosition >= section.offsetTop) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getActiveIndex = () => navItems.findIndex(item => item.id === activeSection);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          StreamFlow
        </motion.div>

        <ul className="nav-links">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              ref={(el: HTMLLIElement | null) => { if (el) navLinksRef.current[index] = el; }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={activeSection === item.id ? 'active' : ''}
            >
              <a href={item.href}>{item.label}</a>
              {activeSection === item.id && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
