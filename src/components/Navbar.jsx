import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <motion.nav 
      className="navbar navbar-expand navbar-glass"
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
        <div className="navbar-nav">
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
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
