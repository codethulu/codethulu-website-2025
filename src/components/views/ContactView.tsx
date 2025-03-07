import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactViewProps {
    onNavigate: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const contactButtons = [
        {
            id: 'github',
            label: 'GITHUB',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
            link: 'https://github.com/codethulu',
            color: '#333333'
        },
        {
            id: 'bluesky',
            label: 'BLUE SKY',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3.268 64 68.414" fill="currentColor" className="w-8 h-8">
                    <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z" />
                </svg>
            ),
            link: 'https://bsky.app/profile/codethulu.dev',
            color: '#0085FF'
        },
        {
            id: 'x',
            label: 'X',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            link: 'https://twitter.com/Codethulu_',
            color: '#000000'
        },
        {
            id: 'email',
            label: 'EMAIL',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
            ),
            link: 'mailto:brendan@codethulu.dev',
            color: '#D44638'
        },
        {
            id: 'linkedin',
            label: 'LINKEDIN',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            link: 'https://www.linkedin.com/in/brendanbelldev/',
            color: '#0077B5'
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen relative z-10 px-4 overflow-hidden">
            {/* Heading */}
            <div className="mb-12 mt-16">
                <h2 className="text-5xl md:text-7xl font-bold font-druk">CONTACT</h2>
            </div>

            {/* Contact buttons grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl w-full px-4">
                {contactButtons.map((button) => (
                    <motion.a
                        key={button.id}
                        href={button.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden text-white"
                        style={{ backgroundColor: button.color }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.5 }
                        }}
                        onHoverStart={() => setHoveredButton(button.id)}
                        onHoverEnd={() => setHoveredButton(null)}
                    >
                        {/* button content */}
                        <div className="p-4 xl:p-8 flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <span className="text-lg xl:text-2xl font-bold uppercase font-druk">{button.label}</span>
                                <motion.div
                                    className="h-1 bg-white mt-2 w-full"
                                />
                            </div>

                            <div className="text-white">
                                {button.icon}
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* footer */}
            <div className="absolute bottom-0 w-full flex flex-col items-center pb-8">
                <div className="h-1 bg-white bg-opacity-10 w-[90%] mb-6"></div>
                <p className="text-white text-opacity-70 font-bold text-sm uppercase">
                    Brendan Bell &copy; 2025
                </p>
            </div>
        </div>
    );
};

export default ContactView;