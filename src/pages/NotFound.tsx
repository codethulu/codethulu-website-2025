import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CanvasBackground from "../components/CanvasBackground";
import { Link } from "react-router-dom";

const NotFound = () => {
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [transitionDirection] = useState(1);
    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});


    const backgroundImages = [
        "/assets/404.jpg",
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
            {isInitialLoadComplete && (
                <CanvasBackground
                    currentImage={backgroundImages[0]}
                    previousImage={backgroundImages[0]}
                    preloadedImages={preloadedImages}
                    transitionDirection={transitionDirection}
                />
            )}
            <div className="flex flex-col items-center justify-center h-screen relative z-10 px-4 py-16 overflow-hidden text-center">
                <div className="mb-12 mt-10">
                    <h2 className="text-5xl md:text-7xl font-bold font-druk uppercase">You might be lost...</h2>
                    <p className="text-xl font-bold mt-4 uppercase mb-6">The page you were looking for could not be found.</p>
                    <Link
                        to="/"
                        className="bg-white bg-opacity-10 hover:bg-opacity-20 text-black uppercase font-bold py-3 px-4 transition-all cursor-pointer"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;