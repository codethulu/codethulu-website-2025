import { useRef, useState, useEffect } from 'react';
import CanvasBackground from '../components/CanvasBackground';
import HomeView from '../components/views/HomeView';
import AboutView from '../components/views/AboutView';
import CareerView from '../components/views/CareerView';
import ProjectsView from '../components/views/ProjectsView';
import ContactView from '../components/views/ContactView';
import NavigationDots from '../components/NavigationDots';
import Navbar from '../components/Navbar';

const MainPortfolio = () => {
    const viewRefs = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null)
    ];
    const [currentView, setCurrentView] = useState(0);
    const [previousView, setPreviousView] = useState(1); // Start with dots.jpg
    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState(1);

    const viewNames = ['Home', 'About', 'Career', 'Projects', 'Contact'];

    const backgroundImages = [
        "/assets/waves.jpg",
        "/assets/intertwine.jpg",
        "/assets/dots.jpg",
        "/assets/triangles.jpg",
        "/assets/wish.jpg"
    ];

    // Preload all images
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

    const handleViewChange = (newIndex: number) => {
        if (newIndex !== currentView) {
            const newDirection = newIndex > currentView ? 1 : -1;
            console.log(`View change: ${currentView} -> ${newIndex}, direction: ${newDirection}`);
            setTransitionDirection(newDirection);
            setPreviousView(currentView);
            setCurrentView(newIndex);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const viewIndex = viewRefs.findIndex(ref => ref.current === entry.target);
                        if (viewIndex !== -1 && viewIndex !== currentView) {
                            handleViewChange(viewIndex);
                        }
                    }
                });
            },
            { threshold: 0.6 }
        );

        viewRefs.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, [currentView]);

    const handleNavigate = (index: number) => {
        if (index !== currentView && viewRefs[index]?.current) {
            handleViewChange(index);
            viewRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const views = [
        { component: HomeView, props: { onNavigate: () => handleNavigate(1) } },
        { component: AboutView, props: { onNavigate: () => handleNavigate(2) } },
        { component: CareerView, props: { onNavigate: () => handleNavigate(3) } },
        { component: ProjectsView, props: { onNavigate: () => handleNavigate(4) } },
        { component: ContactView, props: { onNavigate: () => handleNavigate(0) } }
    ];

    return (
        <>
            <Navbar />
            {isInitialLoadComplete && (
                <CanvasBackground
                    currentImage={backgroundImages[currentView]}
                    previousImage={backgroundImages[previousView]}
                    preloadedImages={preloadedImages}
                    transitionDirection={transitionDirection}
                />
            )}

            {!isInitialLoadComplete && (
                <div className="fixed inset-0 bg-black flex items-center justify-center z-10">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}

            <div className="snap-y snap-mandatory h-screen overflow-y-auto relative">
                {views.map((View, index) => (
                    <div key={index} ref={viewRefs[index]} className="snap-start h-screen">
                        <View.component {...View.props} />
                    </div>
                ))}
            </div>

            <NavigationDots
                views={viewNames}
                currentViewIndex={currentView}
                onNavigate={handleNavigate}
            />
        </>
    );
};

export default MainPortfolio;