import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.div 
      className="container text-center hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="display-1 logo mb-4">alixti</h1>
      <h2 className="display-4 mb-4">Software Engineer</h2>
      <p className="lead mb-5">
        Turning ideas into reality through code
      </p>
      <div className="social-links">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://github.com/alixti"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-lg mx-2"
        >
          <i className="bi bi-github"></i> GitHub
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://linkedin.com/in/alixtidev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg mx-2"
        >
          <i className="bi bi-linkedin"></i> LinkedIn
        </motion.a>
      </div>
    </motion.div>
  );
}

export default Home;
