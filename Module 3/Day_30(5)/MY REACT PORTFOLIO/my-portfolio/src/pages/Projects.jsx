import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'Sheger Transit Web App',
    image: '/sheger-transit.png',
    imageAlt: 'Sheger Transit app screenshot',
    description: 'A web application built to assist commuters in navigating transit routes and local public transportation in Addis Ababa.',
    technologies: 'HTML5, CSS3, JavaScript, Git',
    link: 'https://github.com/lozayonasadugna-dotcom',
  },
  {
    title: 'Personal Developer Portfolio',
    image: '/project1.png',
    imageAlt: 'Personal portfolio screenshot',
    description: 'An accessible, responsive site showcasing my software development journey, medical background, and leadership credentials.',
    technologies: 'HTML5, CSS3, Git, GitHub',
    link: 'https://github.com/lozayonasadugna-dotcom',
  },
  {
    title: 'Dala Studio Web Layout',
    image: '/project2.png',
    imageAlt: 'Dala Studio website screenshot',
    description: 'Responsive interface design project built during software bootcamp coursework, emphasizing clean UI structure.',
    technologies: 'HTML5, CSS Layouts, Responsive Design',
  },
  {
    title: 'Graphic Design & Media Hub',
    image: '/project3.png',
    imageAlt: 'Graphic Design Hub screenshot',
    description: 'Promotional graphics, marketing campaign assets, and digital layouts designed for graduation committees and organizations.',
    technologies: 'Canva, Visual Layout Tools, Graphic Design',
  },
  {
    title: 'Aura Books',
    description: 'My own React data-driven application, built to explore and present book-related content.',
    technologies: 'React, JavaScript',
    link: 'https://aurabooks-fjym8jqbt-lozayonasadugna-dotcom.vercel.app/',
    linkLabel: 'Visit Aura Books',
  },
  {
    title: 'Addis Eats',
    image: '/addis.png',
    imageAlt: 'Addis Eats food and menu project',
    description: 'A foundational Next.js project for exploring food and menus.',
    technologies: 'Next.js, React, JavaScript',
    link: 'https://addis-eats-next-uo58.vercel.app/',
    linkLabel: 'Visit Addis Eats',
  },
  {
    title: 'Sheger Foodie',
    image: '/sheger.png',
    imageAlt: 'Sheger Foodie local food trails project',
    description: 'A React-based web application designed to curate culinary experiences across Addis Ababa by showcasing local food trails, dynamic event listings, and a booking system for secret pop-up suppers. Built with dynamic routing, Zustand for state management, persistent local storage, custom SVG branding, and theme switching (Dark/Light mode), it offers a seamless and responsive platform for food enthusiasts to discover and save their favorite local dining spots.',
    technologies: 'React, Zustand, Dynamic Routing, Local Storage',
    link: 'https://ibt-fullstack-course-ybu4.vercel.app/',
    linkLabel: 'Visit Sheger Foodie',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedProject && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedProject]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <main id="projects">
      <section>
        <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '0.5rem' }}>Featured Projects</h2>
        <p className="card-hint">Select a project to see its details.</p>

        <div className="cards-grid project-grid">
          {projects.map((project) => (
            <article
              className="info-card project-card"
              key={project.title}
              style={{ '--project-image': `url("${project.image || '/background.jpg'}")` }}
            >
              <button
                className="project-card-trigger"
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for ${project.title}`}
              >
                <span>{project.title}</span>
                <span className="project-card-prompt">View project <span aria-hidden="true">↗</span></span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedProject && (
          <div className="project-dialog-content">
            <button className="project-dialog-close" type="button" onClick={closeDialog} aria-label="Close project details">
              ×
            </button>
            {selectedProject.image && (
              <img src={selectedProject.image} alt={selectedProject.imageAlt} className="project-dialog-image" />
            )}
            <h3 id="project-dialog-title">{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>
            <p className="project-dialog-tech"><strong>Technologies:</strong> {selectedProject.technologies}</p>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="project-dialog-link">
                {selectedProject.linkLabel || 'View on GitHub'}
              </a>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
