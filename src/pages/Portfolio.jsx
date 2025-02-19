import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProjectModal from '../components/ProjectModal';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // En producción, esto sería una llamada API real
        const response = await import('../data/projects.json');
        setProjects(response.projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
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

  return (
    <div 
      className="portfolio-container"
    >
      <h2 className="text-center mb-5">My Projects</h2>
      
      <div className="filters text-center mb-4 d-none">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`btn ${filter === 'web' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
          onClick={() => setFilter('web')}
        >
          Web
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
            role="button"
          >
            <LazyLoadImage
              src={project.image}
              alt={project.title}
              effect="blur"
              className="project-image"
            />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="technologies mb-3">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="badge bg-secondary me-2">
                    {tech}
                  </span>
                ))}
              </div>
              <button className="btn btn-primary w-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal 
        show={selectedProject !== null}
        onHide={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}

export default Portfolio;
