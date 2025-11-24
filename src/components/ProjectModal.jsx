import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../css/ProjectModal.css';

function ProjectModal({ project, show, onHide }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const allImages = project ? [...(project.screenshots || [])] : [];

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        className="project-modal"
        backdropClassName="modal-backdrop-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allImages.length > 0 && (
            <div className="project-gallery user-select-none">
              {!imagesLoaded && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 768 ? 1 : 'auto'}
                coverflowEffect={{
                  rotate: window.innerWidth < 768 ? 0 : 50,
                  stretch: 0,
                  depth: window.innerWidth < 768 ? 0 : 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="project-swiper"
                onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
              >
                {allImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${project?.title} screenshot ${index + 1}`}
                      onLoad={index === currentImageIndex ? handleImageLoad : undefined}
                      style={{ display: imagesLoaded ? 'block' : 'none', cursor: 'zoom-in' }}
                      onClick={() => setLightboxOpen(true)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className={`project-details ${allImages.length > 0 ? 'mt-4' : ''}`}>
            <h4>About this project</h4>
            <p>{project?.description}</p>
            <h4>Technologies used</h4>
            <div className="technologies mb-4">
              {project?.technologies.map(tech => (
                <span key={tech} className="badge bg-secondary me-2">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project?.github && (
                <a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project?.github}
                  className="btn btn-dark me-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              )}
              {project?.live && (
                <a
                  href={project?.live}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={lightboxOpen}
        onHide={() => setLightboxOpen(false)}
        size="xl"
        centered
        className="lightbox-modal"
        backdropClassName="modal-backdrop-lightbox"
      >
        <Modal.Body className="p-0">
          <button
            className="btn-close lightbox-close"
            onClick={() => setLightboxOpen(false)}
          />
          <img
            src={allImages[currentImageIndex]}
            alt={`${project?.title} full size`}
            className="lightbox-image"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectModal;
