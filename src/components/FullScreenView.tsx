import React, { forwardRef } from 'react';

interface FullScreenViewProps {
    children: React.ReactNode;
}

const FullScreenView = forwardRef<HTMLDivElement, FullScreenViewProps>(
    ({ children }, ref) => {
        return (
            <div ref={ref} className="snap-start h-screen w-full overflow-hidden relative">
                {children}
            </div>
        );
    }
);

export default FullScreenView;