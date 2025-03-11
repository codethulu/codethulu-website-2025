import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import ProjectCard from '../ProjectCard'; // Assuming you have the ProjectCard component
import projects from '../../data/projects'; // Assuming this is your projects data source

interface ProjectsViewProps {
    onNavigate: () => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Filter projects with 'favourite' tag
    const favouriteProjects = projects.filter(project =>
        project.tags.some(tag => tag.toLowerCase() === 'favourites')
    );

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollContainerRef.current.scrollLeft);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Check if scroll buttons should be visible
    const showLeftArrow = scrollPosition > 10;
    const showRightArrow = scrollContainerRef.current
        ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
        : true;

    return (
        <div className="flex flex-col items-center h-screen relative z-10 px-4 py-16 overflow-hidden">
            <div className="mb-12 mt-10">
                <h2 className="text-5xl md:text-7xl font-bold font-druk">PROJECTS</h2>
            </div>

            <div className="flex-1 flex flex-col w-full max-w-6xl">
                <motion.div
                    className="w-full bg-white text-black p-4 2xl:p-16 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl xl:text-3xl font-bold mb-2 xl:mb-4 uppercase font-druk">Professional Work</h3>
                    <div className="h-0.5 xl:h-1 bg-black bg-opacity-50 w-full my-2 xl:my-6"></div>

                    <p className="mb-4 text-xs xl:text-base text-justify uppercase leading-relaxed">
                        I am currently focused on developing on-premises infrastructure and internal software engineering projects in my professional role.
                        My work covers designing, developing and supporting our on-premises infrastructure, moving from an entirely cloud (AWS) platform. Alongside this, I am working
                        on internal software engineering projects (such as our web-based cluster management system for managing custers and robust deployment of our applications
                        through non-technical facing interfaces), our main C++ codebase and various other secret projects...
                    </p>

                    <p className="mb-4 text-xs xl:text-base text-justify uppercase leading-relaxed">
                        Due to the proprietary nature of these projects, details cannot be shared publicly. However, below you can explore some of my
                        personal projects:
                    </p>
                </motion.div>

                <div className="w-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase font-druk text-white">Featured Projects</h3>

                    <div className="relative">
                        {showLeftArrow && (
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow-lg text-black"
                                aria-label="Scroll left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
                            onScroll={handleScroll}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {favouriteProjects.length > 0 ? (
                                favouriteProjects.map(project => (
                                    <div key={project.id} className="flex-none w-64 md:w-72 lg:w-80">
                                        <ProjectCard project={project} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-white p-4">No featured projects available at the moment.</p>
                            )}
                        </div>

                        {showRightArrow && (
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow-lg text-black"
                                aria-label="Scroll right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <Link
                        to="/projects"
                        className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 uppercase transition-all duration-300 cursor-pointer upperase"
                        onClick={onNavigate}
                    >
                        View All Projects
                    </Link>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default ProjectsView;