import React from 'react';

interface AboutViewProps {
    onNavigate: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ }) => {
    return (
        <div className="flex flex-col items-center h-screen relative z-10 px-4 py-16 overflow-hidden">
            <div className="mb-12 mt-10">
                <h2 className="text-5xl md:text-7xl font-bold font-druk">ABOUT</h2>
            </div>

            <div className="flex-1 flex items-center w-full max-w-6xl">
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12 w-full sm:px-10">
                    <div
                        className="hidden md:block w-full md:w-1/3 aspect-square transition-all transform hover:scale-105 filter grayscale hover:filter-none duration-500"
                    >
                        <div className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: "url('/assets/profile.jpg')", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}></div>
                    </div>

                    <div
                        className="w-full md:w-2/3 bg-white text-black p-4 2xl:p-16 self-start"
                    >
                        <div className="md:hidden w-30 aspect-square mb-6">
                            <div className="w-30 h-30 bg-cover bg-center"
                                style={{ backgroundImage: "url('/assets/profile.jpg')", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}></div>
                        </div>
                        <h3 className="text-2xl xl:text-3xl font-bold mb-4 uppercase font-druk">Brendan Bell</h3>
                        <div className="h-0.5 xl:h-1 bg-black bg-opacity-50 w-full my-2 xl:my-6"></div>

                        <p className="mb-4 text-xs xl:text-base text-justify uppercase leading-relaxed">
                            Hello, my name is Brendan. I love solving problems, particularly those that involve computers.
                        </p>

                        <p className="mb-4 text-xs xl:text-base text-justify uppercase leading-relaxed">
                            I like creating algorithms, building great software, designing interfaces, and working with others to build awesome things. I am drawn to solving complex problems, and I try to develop the range of my abilities by pushing myself to work on diverse projects. Currently, my focus is on developing on-premises infrastructure and internal software engineering projects (full stack web development and C++/Python over our tech stack) in my professional role. Outside of work, I like to work on game development, typically engine design. It is my favourite way outside of work to invent technical solutions to interesting problems, and express my creativity.
                        </p>

                        <p className="mb-4 text-xs xl:text-base text-justify uppercase leading-relaxed">
                            Even outside of programming, I like to create things; painting, graphic design and drawing is something I have fun doing. I also enjoy reading, bouldering (at an amateur level), collecting records and listening to music, as well as spending time with my friends and family.
                        </p>

                        <div className="h-0.5 xl:h-1 bg-black bg-opacity-50 w-full my-2 xl:my-6"></div>

                        <p className="text-xs xl:text-sm uppercase">
                            Software Engineer • DevOps/Platform Engineer • Web Developer • Designer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;
