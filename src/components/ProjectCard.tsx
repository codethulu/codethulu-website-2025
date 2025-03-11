import { Link } from "@tanstack/react-router";
import Tag from "./Tag";

interface Project {
    id: string;
    image: string;
    name: string;
    tags: string[];
    description: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="block">
            <div className="relative group aspect-square overflow-hidden">
                <img
                    src={`/src/assets/projects/${project.image}.jpg`}
                    onError={(e) => { e.currentTarget.src = '/src/assets/projects/default.jpg'; }}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent 
          origin-bottom scale-y-100 transition-transform duration-500 border border-white">
                </div>

                <div className="absolute bottom-0 left-0 p-2 text-white transition-opacity duration-300 
          group-hover:opacity-0">
                    <h2 className="text-lg font-bold font-druk uppercase">{project.name}</h2>
                </div>

                <div className="absolute inset-0">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 bg-white rounded-[50%] group-hover:w-full group-hover:h-full 
              group-hover:rounded-[0%] transition-all duration-700 ease-in-out">
                        </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 invisible group-hover:opacity-0 
            group-hover:delay-500 group-hover:visible group-hover:opacity-100 
            transition-opacity duration-300 ease-in-out">
                        <div className="p-10 text-left text-black">
                            <h2 className="text-xl font-druk uppercase">{project.name}</h2>
                            <p className="text-md uppercase mb-4">
                                {project.tags.map((tag) => (
                                    <Tag key={tag} tag={tag} backgroundColor="black" />
                                ))}
                            </p>
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
    );
};

export default ProjectCard;