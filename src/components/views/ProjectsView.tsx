import React from 'react';

interface ProjectsViewProps {
    onNavigate: () => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">About Me</h2>
            <p className="text-lg md:text-xl max-w-2xl text-center text-white mb-6">
                I'm a passionate developer specializing in creating beautiful,
                interactive web experiences with modern technologies.
            </p>
            <button
                onClick={onNavigate}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white py-2 px-4 rounded transition-all"
            >
                Back to Top
            </button>
        </div>
    );
};

export default ProjectsView;