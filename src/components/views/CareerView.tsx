import React, { useEffect, useRef, useState } from 'react';
import careerList from '../../data/careerList';
import { motion } from 'framer-motion';

interface CareerViewProps {
    onNavigate: () => void;
}

const CareerView: React.FC<CareerViewProps> = ({ onNavigate }) => {
    const [activeIndex, setActiveIndex] = useState(careerList.length - 1);
    const [animating, setAnimating] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

    const DOT_SPACING = Math.min(400, window.innerWidth * 0.6);
    const EXPANDED_DOT_SIZE = Math.min(520, window.innerWidth * 0.8);
    const DOT_SIZE = 50;

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const updateVisibleDots = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const halfWidth = containerWidth / 2;

            const visible: number[] = [];
            careerList.forEach((_, index) => {
                const dotPos = (index - activeIndex) * DOT_SPACING;
                if (Math.abs(dotPos) <= halfWidth) {
                    visible.push(index);
                }
            });

            setVisibleIndices(visible);
        };

        updateVisibleDots();
        window.addEventListener('resize', updateVisibleDots);
        return () => window.removeEventListener('resize', updateVisibleDots);
    }, [activeIndex]);

    const navigateTo = (index: number) => {
        if (index === activeIndex || animating) return;

        setAnimating(true);
        setShowContent(false);

        setTimeout(() => {
            setActiveIndex(index);

            setTimeout(() => {
                setShowContent(true);
                setAnimating(false);
            }, 400);
        }, 300);
    };

    const goNext = () => {
        if (activeIndex < careerList.length - 1 && !animating) {
            navigateTo(activeIndex + 1);
        }
    };

    const goPrevious = () => {
        if (activeIndex > 0 && !animating) {
            navigateTo(activeIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen relative z-10 px-4 overflow-hidden">
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-5xl md:text-7xl font-bold mt-16 font-druk">CAREER</h2>
            </div>

            <div className="w-full flex-grow-[2] flex flex-col justify-center items-center relative">
                <div
                    className="absolute w-[90%] h-2 top-1/2 transform -translate-y-1/2"
                    style={{
                        background: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                    }}
                ></div>

                <div ref={containerRef} className="relative w-full h-[500px] overflow-visible">
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2"
                        animate={{ x: -activeIndex * DOT_SPACING }}
                        transition={{
                            type: "spring",
                            stiffness: 70,
                            damping: 20,
                            delay: 0.1
                        }}
                    >
                        {careerList.map((item, index) => {
                            const isVisible = visibleIndices.includes(index);
                            const variants = {
                                hidden: { opacity: 0, scale: 0 },
                                visible: { opacity: 1, scale: 1 }
                            };

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute top-1/2 transform -translate-y-1/2"
                                    style={{
                                        left: `${index * DOT_SPACING}px`,
                                        pointerEvents: isVisible ? 'auto' : 'none'
                                    }}
                                    variants={variants}
                                    initial="hidden"
                                    animate={isVisible ? "visible" : "hidden"}
                                    transition={{
                                        opacity: { duration: 0.5 },
                                        scale: { duration: 0.5 }
                                    }}
                                >
                                    <div className="relative">
                                        <motion.div
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
                                            animate={{
                                                width: activeIndex === index && showContent
                                                    ? isSmallScreen ? `90vw` : `${EXPANDED_DOT_SIZE}px`
                                                    : `${DOT_SIZE}px`,
                                                height: activeIndex === index && showContent
                                                    ? isSmallScreen ? `400px` : `${EXPANDED_DOT_SIZE}px`
                                                    : `${DOT_SIZE}px`,
                                                borderRadius: activeIndex === index && showContent
                                                    ? "0"
                                                    : "50%",
                                                scale: !showContent && activeIndex === index ? 0.8 : 1
                                            }}
                                            style={{
                                                backgroundColor: 'white',
                                                zIndex: activeIndex === index ? 30 : 20,
                                                boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30
                                            }}
                                            onClick={() => navigateTo(index)}
                                        >
                                            {activeIndex === index && showContent && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                    className={`w-full ${isSmallScreen ? 'px-8 py-8' : 'px-12 xl:px-16'} max-w-full`}
                                                >
                                                    <h3 className="text-2xl xl:text-3xl font-bold text-black text-left uppercase font-druk">{item.institution}</h3>

                                                    <p className="text-md xl:text-xl text-black font-bold text-left uppercase">{item.role}</p>

                                                    <p className="text-xs xl:text-base text-black text-opacity-90 font-medium text-left mb-4">{item.start_date} - {item.end_date}</p>

                                                    <div className="h-0.5 xl:h-1 bg-black bg-opacity-50 w-full mb-4"></div>

                                                    <p className={`text-xs xl:text-base text-black text-opacity-90 leading-snug ${isSmallScreen ? 'text-left' : 'text-justify'} uppercase`}>{item.description}</p>
                                                </motion.div>
                                            )}
                                        </motion.div>

                                        {(activeIndex !== index || !showContent) && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hidden md:block absolute bottom-[30px] left-0 transform -translate-x-1/2 text-white text-opacity-70 text-xs whitespace-nowrap mt-2 uppercase font-bold text-center"
                                            >
                                                <p>{item.institution}</p>
                                            </motion.div>
                                        )}
                                        {(activeIndex !== index || !showContent) && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hidden md:block absolute top-[20px] left-0 transform -translate-x-1/2 text-white text-opacity-70 text-xs whitespace-nowrap mt-2 uppercase font-bold text-center"
                                            >
                                                <p>{item.start_date}</p>
                                                <p>{item.end_date}</p>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <div className="flex justify-center gap-8 mb-10 mt-16">
                <motion.button
                    animate={{ opacity: activeIndex > 0 ? 1 : 0.3 }}
                    className="bg-white rounded-full p-3 text-black hover:bg-opacity-70 transition-all cursor-pointer"
                    onClick={goPrevious}
                    disabled={activeIndex === 0 || animating}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                <motion.button
                    animate={{ opacity: activeIndex < careerList.length - 1 ? 1 : 0.3 }}
                    className="bg-white rounded-full p-3 text-black hover:bg-opacity-70 transition-all cursor-pointer"
                    onClick={goNext}
                    disabled={activeIndex === careerList.length - 1 || animating}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
};

export default CareerView;