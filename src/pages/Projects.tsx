import { useState, useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import projects from '../data/projects';
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
    const search = useSearch({ from: '/projects' });
    const [searchQuery, setSearchQuery] = useState(search.query || "");

    useEffect(() => {
        setSearchQuery(search.query || "");
    }, [search.query]);

    const filteredProjects = projects.filter(project => {
        const searchLower = searchQuery.toLowerCase();
        return (
            project.name.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    });

    return (
        <>
            <Navbar />
            <div className="pt-20 px-4 min-h-screen bg-black">
                <h1 className="text-5xl md:text-7xl font-bold font-druk text-left uppercase mb-6 text-white">Projects</h1>
                <input
                    type="text"
                    placeholder="SEARCH PROJECTS"
                    className="mb-6 p-2 border border-gray-300 w-full text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Projects;