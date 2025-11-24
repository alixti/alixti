import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProjectModal from '../components/ProjectModal';
import generateProjectPlaceholder from '../utils/placeholder';
import projectsData from '../data/projects.json';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/Portfolio.css';

function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    setProjects(projectsData.projects);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <motion.div 
          className="portfolio-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="portfolio-title">My Projects</h1>
          <p className="portfolio-subtitle">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>
        
        <motion.div 
          className="filters-section d-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <i className="bi bi-grid-3x3-gap me-2"></i>
            All Projects
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            <i className="bi bi-globe me-2"></i>
            Web
          </button>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => {
            const imageSrc = project.image || generateProjectPlaceholder(project.title);
            
            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                onClick={() => {
                  setSelectedProject(project);
                  setShowProjectModal(true);
                }}
                role="button"
                tabIndex={0}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="project-image-wrapper">
                  <LazyLoadImage
                    src={imageSrc}
                    alt={project.title}
                    effect="blur"
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <i className="bi bi-eye"></i>
                    <span>View Details</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="technologies">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-badge tech-badge-more">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="bi bi-inbox"></i>
            <p>No projects found</p>
          </motion.div>
        )}

        <ProjectModal 
          show={showProjectModal}
          onHide={() => setShowProjectModal(false)}
          onExited={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </div>
    </div>
  );
}

export default Portfolio;
