import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TfiClose } from 'react-icons/tfi';
import { motion } from 'framer-motion';
import { zoomIn } from '../utils/motion';
import style from './styles/popup.module.css';
import Carousel from './Carousel';

const Popup = ({ handleClose, project }) => {
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocumentOverflowX = document.documentElement.style.overflowX;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflowX = originalDocumentOverflowX;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <motion.div
      className={style.overlay}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0, transition: { type: 'tween', duration: 0.5 } }}
      variants={zoomIn(0, 0.5)}
      onClick={handleOverlayClick}
    >
      <div
        className={style.container}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={style.close_btn} onClick={handleClose} aria-label="Close project details">
          <TfiClose />
        </button>
        <Carousel carousel={project.carousel} />
        <div className={style.content}>
          <h2 id="project-modal-title" className={style.name}>{project.name}</h2>
          <p className={style.tech}>
            {project.tech.map((i) => (
              <span key={i} className={style.tech_list}>{`#${i}`}</span>
            ))}
          </p>
          <p className={style.description}>{project.desc}</p>
          <div className={style.link}>
            <a href={project.source_link} target="_blank" className={`${style.source_link} ${style.btn_container}`} rel="noreferrer">
              <span className={style.btn_hover}>View Source</span>
              <span className={style.btn}>View Source</span>
            </a>
            {project.live_link ? (
              <a href={project.live_link} target="_blank" className={`${style.live_link} ${style.btn_container}`} rel="noreferrer">
                <span className={style.btn_hover}>View Live</span>
                <span className={style.btn}>View Live</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    carousel: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    desc: PropTypes.string.isRequired,
    source_link: PropTypes.string.isRequired,
    live_link: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Popup;
