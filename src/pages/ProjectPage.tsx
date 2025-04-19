import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import projects from '../data/projects';
import { useEffect, useState } from "react";
import CanvasBackground from "../components/CanvasBackground";
import Tag from "../components/Tag";

const ProjectPage = () => {
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [transitionDirection] = useState(1);

    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});

    const navigate = useNavigate();
    const projectId = useParams({
        from: '/projects/$projectId',
        select: (params) => params.projectId,
    })
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        navigate({ to: '/404' });
        return null;
    }

    const backgroundImages = [
        "/assets/projects/" + project.image + ".jpg",
    ];

    useEffect(() => {
        const loadAllImages = async () => {
            const initialImages: { [key: string]: HTMLImageElement } = {};

            for (const src of backgroundImages) {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        initialImages[src] = img;
                        console.log(`Loaded: ${src}`);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load: ${src}`);
                        resolve();
                    };
                    img.src = src;
                });
            }

            setPreloadedImages(initialImages);
            setIsInitialLoadComplete(true);
            console.log('Preloaded images:', Object.keys(initialImages));
        };

        loadAllImages();
    }, []);

    return (
        <>
            <Navbar />
            {isInitialLoadComplete && (
                <CanvasBackground
                    currentImage={backgroundImages[0]}
                    previousImage={backgroundImages[0]}
                    preloadedImages={preloadedImages}
                    transitionDirection={transitionDirection}
                />
            )}
            <div className="relative z-10 min-h-screen px-4 py-16">
                <div className="mt-4 mx-8">
                    <div className="mb-8 -ml-8">
                        <Link
                            to="/projects"
                            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-black uppercase font-bold py-3 px-4 transition-all cursor-pointer inline-block"
                        >
                            Back to Projects
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold font-druk uppercase mt-6 text-left">
                            {project.name}
                        </h1>
                        <div className="mt-4 text-left">
                            {project.tags.map((tag) => (
                                <Tag key={tag} tag={tag} backgroundColor="white" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-4">
                    {/* Centered Content */}
                    <div className="flex flex-col items-center">
                        <img
                            src={`/assets/projects/${project.image}.jpg`}
                            alt={project.name}
                            className="w-full max-w-md aspect-square object-cover mb-8"
                        />
                        <div className="bg-white bg-opacity-90 p-16 max-w-3xl w-full uppercase">
                            <p className="text-gray-800 text-lg">{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectPage;