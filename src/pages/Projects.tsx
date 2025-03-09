import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import projects from '../data/projects';

const Projects = () => {
    const [searchQuery, setSearchQuery] = useState("");

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
                    className="mb-6 p-2 border border-gray-300 rounded w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProjects.map(project => (
                        <Link to={`/projects/${project.id}`} key={project.id} className="block">
                            <div className="relative group aspect-square overflow-hidden">
                                <img
                                    src={`/src/assets/projects/${project.image}.jpg`}
                                    onError={(e) => { e.currentTarget.src = '/src/assets/projects/default.jpg'; }}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent 
                                    scale-y-[0.3] origin-bottom group-hover:scale-y-100 transition-transform duration-500">
                                </div>

                                <div className="absolute bottom-0 left-0 p-2 text-white transition-opacity duration-300 
                                    group-hover:opacity-0">
                                    <h2 className="text-lg font-bold font-druk">{project.name}</h2>
                                </div>

                                <div className="absolute inset-0">
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-2 h-2 bg-white rounded-[50%] group-hover:w-full group-hover:h-full 
                                            group-hover:rounded-[0%] transition-all duration-700 ease-in-out">
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 invisible group-hover:opacity-0 
                                        group-hover:delay-700 group-hover:visible group-hover:opacity-100 
                                        transition-opacity duration-300 ease-in-out">
                                        <div className="p-10 text-left text-black">
                                            <h2 className="text-xl font-druk">{project.name}</h2>
                                            <p className="text-md uppercase mb-4">{project.tags.join(" | ")}</p>
                                            <div className="h-0.5 xl:h-1 bg-black bg-opacity-50 w-full mb-4"></div>
                                            <p className="text-md uppercase mt-2 mb-6">
                                                {project.description.length > 100
                                                    ? `${project.description.substring(0, 97)}...`
                                                    : project.description}
                                            </p>
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="bg-black bg-opacity-10 hover:bg-opacity-20 text-white uppercase font-bold py-3 px-4 transition-all cursor-pointer"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Projects;