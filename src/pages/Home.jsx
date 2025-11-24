import { motion } from 'framer-motion';
import '../css/Home.css';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="home-page">
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <div className="logo-wrapper">
            <h1 className="hero-logo">alixti</h1>
            <div className="logo-underline"></div>
          </div>
        </motion.div>

        <motion.h2 className="hero-title" variants={itemVariants}>
          Software Engineer
        </motion.h2>
        
        <motion.p className="hero-description" variants={itemVariants}>
          Turning ideas into reality
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/alixti"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-primary"
          >
            <i className="bi bi-github me-2"></i>
            <span>GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/alixtidev"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            <i className="bi bi-linkedin me-2"></i>
            <span>LinkedIn</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
