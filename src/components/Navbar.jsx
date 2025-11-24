import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { path: '/', label: 'Home', icon: 'bi-house-fill' },
    { path: '/portfolio', label: 'Portfolio', icon: 'bi-briefcase-fill' },
    // { path: '/contact', label: 'Contact', icon: 'bi-envelope-fill' }
  ];

  return (
    <motion.nav 
      className="navbar-floating"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      initial={{ y: -100 }}
    >
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            alixti
          </motion.span>
        </Link>
        
        <div className="navbar-menu">
          {navItems.map(({ path, label, icon }) => (
            <Link 
              key={path}
              className={`nav-item-link ${location.pathname === path ? 'active' : ''}`}
              to={path}
            >
              <motion.div
                className="nav-item-content"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`bi ${icon}`}></i>
                <span>{label}</span>
              </motion.div>
            </Link>
          ))}
          
          <div className="nav-divider"></div>
          
          <motion.button 
            className="theme-toggle-btn"
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
