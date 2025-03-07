import { useRef, useEffect } from 'react';

interface CanvasBackgroundProps {
    currentImage: string;
    previousImage?: string;
    preloadedImages?: { [key: string]: HTMLImageElement };
    transitionDuration?: number;
    transitionDirection?: number; // 1 = down, -1 = up
}

const CanvasBackground: React.FC<CanvasBackgroundProps> = ({
    currentImage,
    previousImage,
    preloadedImages = {},
    transitionDuration = 1500,
    transitionDirection = 0
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number>(0);
    const lastImageRef = useRef<string>('');

    const transitionRef = useRef({
        active: false,
        startTime: 0,
        fromImage: '',
        toImage: '',
        direction: 0,
        prepared: false
    });

    const matrixRef = useRef<{
        dots: Array<{
            x: number, y: number, size: number, targetSize: number,
            currentBrightness: number, previousBrightness: number,
            waveOffset: number
        }>
    }>({
        dots: []
    });

    const wavesRef = useRef<Array<{
        x: number;
        y: number;
        startTime: number;
        radius: number;
        maxRadius: number;
        speed: number;
    }>>([]);

    const imageDataCacheRef = useRef<{ [key: string]: ImageData }>({});

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeMatrix();
        };

        const initializeMatrix = () => {
            const width = canvas.width;
            const height = canvas.height;

            const screenSize = Math.sqrt(width * height);
            const spacing = Math.max(10, Math.min(20, Math.floor(screenSize / 100)));

            const dots = [];
            for (let y = spacing; y < height; y += spacing) {
                for (let x = spacing; x < width; x += spacing) {
                    dots.push({
                        x,
                        y,
                        size: 0.5,
                        targetSize: 0.5,
                        currentBrightness: 0,
                        previousBrightness: 0,
                        waveOffset: 0
                    });
                }
            }

            matrixRef.current = { dots };
        };

        const processImageData = (imageSrc: string): ImageData | null => {
            if (!imageSrc || imageDataCacheRef.current[imageSrc]) {
                return imageDataCacheRef.current[imageSrc] || null;
            }

            const img = preloadedImages[imageSrc];
            if (!img) return null;

            const offCanvas = document.createElement('canvas');
            const offCtx = offCanvas.getContext('2d');
            if (!offCtx) return null;

            offCanvas.width = canvas.width;
            offCanvas.height = canvas.height;

            drawScaledImage(offCtx, img, canvas.width, canvas.height);

            const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
            imageDataCacheRef.current[imageSrc] = imageData;
            return imageData;
        };

        const getBrightnessAt = (imageData: ImageData, x: number, y: number): number => {
            const index = ((Math.floor(y) * imageData.width) + Math.floor(x)) * 4;
            if (index >= imageData.data.length) return 0;

            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];

            return (r + g + b) / 3 / 255;
        };

        const prepareTransition = (fromImg: string, toImg: string) => {
            const { dots } = matrixRef.current;

            const fromImgData = processImageData(fromImg);
            const toImgData = processImageData(toImg);

            if (!fromImgData || !toImgData) return false;

            dots.forEach(dot => {
                dot.previousBrightness = getBrightnessAt(fromImgData, dot.x, dot.y);
                dot.currentBrightness = getBrightnessAt(toImgData, dot.x, dot.y);
                dot.targetSize = 0.5 + (dot.previousBrightness * 4.0);
                dot.size = dot.targetSize;
                dot.waveOffset = 0;
            });

            return true;
        };

        const updateDotTargets = (progress: number, timestamp: number) => {
            const { dots } = matrixRef.current;
            const { direction } = transitionRef.current;

            // Update waves
            wavesRef.current = wavesRef.current.filter(wave => {
                const elapsed = timestamp - wave.startTime;
                wave.radius = elapsed * wave.speed;
                return wave.radius < wave.maxRadius;
            });

            dots.forEach(dot => {
                const previousSize = 0.5 + (dot.previousBrightness * 4.0);
                const targetSize = 0.5 + (dot.currentBrightness * 4.0);

                let dotProgress = progress;

                if (direction !== 0) {
                    const normalizedY = dot.y / canvas.height;
                    const wavePosition = direction > 0 ? (1 - normalizedY) : normalizedY;
                    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                    const waveWidth = 2.3;
                    const waveProgress = progress * (1 + waveWidth);
                    const dotWavePosition = Math.max(0, Math.min(1, (waveProgress - wavePosition) / waveWidth));
                    dotProgress = easeInOut(dotWavePosition);
                }

                let baseSize = previousSize * (1 - dotProgress) + targetSize * dotProgress;
                dot.waveOffset = 0;

                // Calculate single pulse wave effects
                wavesRef.current.forEach(wave => {
                    const dx = dot.x - wave.x;
                    const dy = dot.y - wave.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const pulseWidth = 50; // Width of the pulse in pixels
                    const pulsePosition = (wave.radius - distance) / pulseWidth;

                    // Gaussian-like pulse: single peak that fades out
                    const waveEffect = Math.max(0, Math.exp(-pulsePosition * pulsePosition) * 3); // Amplitude of 3
                    dot.waveOffset += waveEffect;
                });

                dot.targetSize = Math.max(0.5, baseSize + dot.waveOffset);
            });
        };

        const renderDots = () => {
            const { dots } = matrixRef.current;

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgb(100, 100, 100)';

            dots.forEach(dot => {
                dot.size += (dot.targetSize - dot.size) * 0.3;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            wavesRef.current.push({
                x,
                y,
                startTime: performance.now(),
                radius: 0,
                maxRadius: Math.max(canvas.width, canvas.height),
                speed: 0.1 // Pixels per millisecond
            });
        };

        const renderFrame = (timestamp: number) => {
            if (!lastImageRef.current && previousImage && !transitionRef.current.active) {
                const prepared = prepareTransition(previousImage, previousImage);
                if (prepared) renderDots();
            }

            if (currentImage !== lastImageRef.current && preloadedImages[currentImage]) {
                const fromImage = lastImageRef.current || previousImage || '';
                transitionRef.current = {
                    active: true,
                    startTime: timestamp,
                    fromImage,
                    toImage: currentImage,
                    direction: transitionDirection,
                    prepared: false
                };

                const prepared = prepareTransition(fromImage, currentImage);
                transitionRef.current.prepared = prepared;
                if (prepared) lastImageRef.current = currentImage;
            }

            const { active, startTime, prepared } = transitionRef.current;
            if (active && prepared) {
                const progress = Math.min(1, (timestamp - startTime) / transitionDuration);
                updateDotTargets(progress, timestamp);

                if (progress >= 1) transitionRef.current.active = false;
            } else {
                updateDotTargets(1, timestamp);
            }

            renderDots();

            animationIdRef.current = requestAnimationFrame(renderFrame);
        };

        const drawScaledImage = (
            ctx: CanvasRenderingContext2D,
            img: HTMLImageElement,
            width: number,
            height: number
        ) => {
            const imgRatio = img.width / img.height;
            const canvasRatio = width / height;

            let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

            if (imgRatio > canvasRatio) {
                drawHeight = height;
                drawWidth = img.width * (height / img.height);
                offsetX = (width - drawWidth) / 2;
            } else {
                drawWidth = width;
                drawHeight = img.height * (width / img.width);
                offsetY = (height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const handleResize = () => {
            imageDataCacheRef.current = {};
            setupCanvas();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('click', handleClick);
        setupCanvas();
        animationIdRef.current = requestAnimationFrame(renderFrame);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [currentImage, previousImage, preloadedImages, transitionDuration, transitionDirection]);

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    );
};

export default CanvasBackground;