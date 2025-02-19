import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Cerrar el menú al cambiar de ruta
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    // Manejar clics fuera del navbar para cerrar el menú
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      ref={navbarRef}
      className="navbar navbar-expand-lg navbar-glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            alixti
          </motion.span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            {[
              { path: '/portfolio', label: 'Portfolio' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <motion.li key={path} className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                  to={path}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
            <motion.li className="nav-item">
              <motion.button 
                className="btn btn-link nav-link theme-toggle"
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? '☀️' : '🌙'}
              </motion.button>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
