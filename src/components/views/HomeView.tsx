import React, { useRef, useEffect, useState } from 'react';

interface HomeViewProps {
    onNavigate: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [titleWidth, setTitleWidth] = useState(0);

    useEffect(() => {
        const measureTitleWidth = () => {
            if (titleRef.current) {
                const width = titleRef.current.getBoundingClientRect().width;
                setTitleWidth(width);
            }
        };

        measureTitleWidth();

        document.fonts.ready.then(measureTitleWidth);

        const resizeObserver = new ResizeObserver(measureTitleWidth);
        if (titleRef.current) {
            resizeObserver.observe(titleRef.current);
        }

        window.addEventListener('resize', measureTitleWidth);

        return () => {
            if (titleRef.current) {
                resizeObserver.unobserve(titleRef.current);
            }
            resizeObserver.disconnect();
            window.removeEventListener('resize', measureTitleWidth);
        };
    }, []);

    const openGithub = () => {
        window.open('https://github.com/codethulu', '_blank');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full relative z-10">
            <div className='bg-black/10 p-6 backdrop-blur-[5px]'>
                <h1 ref={titleRef} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white font-druk">CODETHULU</h1>

                <div
                    className="h-1 bg-white mt-2 mb-3"
                    style={{ width: `${titleWidth}px` }}
                ></div>

                <div
                    className="flex justify-between mb-12"
                    style={{ width: `${titleWidth}px` }}
                >
                    <span className="text-white uppercase font-bold text-sm md:text-2xl">Brendan Bell</span>
                    <span className="text-white uppercase font-bold text-sm md:text-2xl">Software Engineer</span>
                </div>

                <div
                    className="mb-6 text-justify"
                    style={{ width: `${titleWidth}px` }}
                >
                    <span className="text-white uppercase text-sm md:text-2xl">Welcome to my website. I am a Software Engineer with an enthusiasm for learning and solving problems. I have previously worked for Canonical (creators of Ubuntu) and am currently helping to disrupt the sports tracking industry by covering dev-ops and software engineering problems at Bolt6. Please scroll to allow me to introduce you to my corner of the internet.</span>
                </div>

                <div
                    className="flex space-x-4"
                    style={{ width: `${titleWidth}px` }}
                >
                    <button
                        onClick={onNavigate}
                        className="bg-white bg-opacity-10 hover:bg-opacity-20 text-black uppercase font-bold py-3 px-4 transition-all cursor-pointer"
                    >
                        About Me
                    </button>

                    <button
                        onClick={openGithub}
                        className="bg-white bg-opacity-10 hover:bg-opacity-20 text-black uppercase font-bold py-3 px-4 transition-all cursor-pointer"
                    >
                        Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeView;