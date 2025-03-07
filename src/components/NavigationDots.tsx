import React, { useState } from 'react';

interface NavigationDotsProps {
    views: string[];
    currentViewIndex: number;
    onNavigate: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
    views,
    currentViewIndex,
    onNavigate
}) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {views.map((view, index) => (
                <div
                    key={index}
                    className="relative items-center my-2 group hidden sm:flex cursor-pointer"
                >
                    <div
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-200 transform
                            ${currentViewIndex === index
                                ? 'bg-white scale-125'
                                : 'bg-gray-500 bg-opacity-50 hover:bg-opacity-75'}`}
                        onClick={() => onNavigate(index)}
                    />

                    {isHovering && (
                        <span className="absolute right-6 whitespace-nowrap text-white text-opacity-70 uppercase text-xs tracking-wider bg-black p-1">
                            {view}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavigationDots;