import Navbar from "../components/Navbar";
import { getRouteApi, useNavigate, useParams } from "@tanstack/react-router";
import projects from '../data/projects';
import { useEffect, useState } from "react";
import CanvasBackground from "../components/CanvasBackground";


const routeApi = getRouteApi('/projects/$projectId')


const ProjectPage = () => {

    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState(1);
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
        "src/assets/dots.jpg",
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
                        resolve(); // Continue even if an image fails
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
            {/* {isInitialLoadComplete && (
                <CanvasBackground
                    currentImage={backgroundImages[0]}
                    previousImage={backgroundImages[0]}
                    preloadedImages={preloadedImages}
                    transitionDirection={transitionDirection}
                />
            )} */}
            <div className="pt-20 px-4 min-h-screen">
                <h1 className="text-4xl font-bold mb-6">Projects</h1>
                <p>Project ID: {projectId}</p>
                <p className="mb-6">Welcome to my blog! This page is under construction.</p>

                <h1>{project.name}</h1>
                <p><strong>Year:</strong> {project.year}</p>
                <p>{project.description}</p>
                <div>
                    <strong>Tags:</strong> {project.tags.join(", ")}
                </div>
                <img src={`/images/${project.image}.jpg`} alt={project.name} />
            </div>
        </>
    );
};

export default ProjectPage;
