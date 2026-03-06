'use client'

import { Children, useEffect, useRef } from 'react';

/**
 * Props for the FuzzyText component
 * @interface FuzzyTextProps
 */
interface FuzzyTextProps {
    children: React.ReactNode;      // Text content to display
    fontSize?: number | string;     // Font size (px if number, CSS value if string)
    fontWeight?: number | string;   // Font weight
    fontFamily?: string;            // Font family
    color?: string;                 // Text color
    enableHover?: boolean;          // Whether to enable hover effect
    baseIntensity?: number;         // Base distortion intensity (0-1)
    hoverIntensity?: number;        // Hover distortion intensity (0-1)
}

/**
 * A component that renders text with a fuzzy/glitchy distortion effect
 * Text is drawn on a canvas with a controllable distortion effect
 */
export const FuzzyText: React.FC<FuzzyTextProps> = ({
    children,
    fontSize = 'clamp(2rem, 8vw, 8rem)',
    fontWeight = 900,
    fontFamily = 'inherit',
    color = 'black',
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5
}) => {
    // Reference to the canvas element with additional cleanup method
    const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);

    useEffect(() => {
        let animationFrameId: number;
        let isCancelled = false;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const init = async () => {
            // Wait for fonts to load to ensure correct text measurements
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }
            if (isCancelled) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Resolve inherited font-family if needed
            const computedFontFamily =
                fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;
            const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
            let numericFontSize: number;

            // Convert fontSize to a numeric value for calculations
            if (typeof fontSize === 'number') {
                numericFontSize = fontSize;
            } else {
                // Create a temporary element to compute the actual pixel size
                const temp = document.createElement('span');
                temp.style.fontSize = fontSize;
                document.body.appendChild(temp);
                const computedSize = window.getComputedStyle(temp).fontSize;
                numericFontSize = parseFloat(computedSize);
                document.body.removeChild(temp);
            }

            // Convert children to plain text
            const text = Children.toArray(children).join('');

            // Create offscreen canvas for text rendering
            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;

            // Set font properties for text measurement
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            const metrics = offCtx.measureText(text);

            // Get text dimensions from metrics
            const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
            const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
            const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

            // Calculate precise text dimensions
            const textBoundingWidth = Math.ceil(actualLeft + actualRight);
            const tightHeight = Math.ceil(actualAscent + actualDescent);

            // Add buffer space for the distortion effect
            const extraWidthBuffer = 10;
            const offscreenWidth = textBoundingWidth + extraWidthBuffer;

            // Set offscreen canvas dimensions
            offscreen.width = offscreenWidth;
            offscreen.height = tightHeight;

            // Draw text to offscreen canvas
            const xOffset = extraWidthBuffer / 2;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            offCtx.fillStyle = color;
            offCtx.fillText(text, xOffset - actualLeft, actualAscent);

            // Set up main canvas with margins for distortion effect
            const horizontalMargin = 50;
            const verticalMargin = 0;
            canvas.width = offscreenWidth + horizontalMargin * 2;
            canvas.height = tightHeight + verticalMargin * 2;
            ctx.translate(horizontalMargin, verticalMargin);

            // Define interactive area for hover detection
            const interactiveLeft = horizontalMargin + xOffset;
            const interactiveTop = verticalMargin;
            const interactiveRight = interactiveLeft + textBoundingWidth;
            const interactiveBottom = interactiveTop + tightHeight;

            let isHovering = false;
            const fuzzRange = 30; // Maximum pixel offset for distortion

            // Animation loop - applies distortion effect
            const run = () => {
                if (isCancelled) return;
                ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
                const intensity = isHovering ? hoverIntensity : baseIntensity;
                
                // Apply horizontal distortion line by line
                for (let j = 0; j < tightHeight; j++) {
                    const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
                    ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                }
                animationFrameId = window.requestAnimationFrame(run);
            };

            run();

            // Helper to check if mouse/touch is over text area
            const isInsideTextArea = (x: number, y: number) => {
                return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
            };

            // Mouse interaction handlers
            const handleMouseMove = (e: MouseEvent) => {
                if (!enableHover) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleMouseLeave = () => {
                isHovering = false;
            };

            // Touch interaction handlers
            const handleTouchMove = (e: TouchEvent) => {
                if (!enableHover) return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleTouchEnd = () => {
                isHovering = false;
            };

            // Add event listeners for interactivity
            if (enableHover) {
                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseleave', handleMouseLeave);
                canvas.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                canvas.addEventListener('touchend', handleTouchEnd);
            }

            // Create cleanup function to remove event listeners
            const cleanup = () => {
                window.cancelAnimationFrame(animationFrameId);
                if (enableHover) {
                    canvas.removeEventListener('mousemove', handleMouseMove);
                    canvas.removeEventListener('mouseleave', handleMouseLeave);
                    canvas.removeEventListener('touchmove', handleTouchMove);
                    canvas.removeEventListener('touchend', handleTouchEnd);
                }
            };

            // Attach cleanup to canvas for access in unmount
            canvas.cleanupFuzzyText = cleanup;
        };

        init();

        // Cleanup function for useEffect
        return () => {
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
            if (canvas && canvas.cleanupFuzzyText) {
                canvas.cleanupFuzzyText();
            }
        };
    }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

    return <canvas ref={canvasRef} />;
};
