import React, { useEffect, useRef } from 'react';

export default function ContourBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      time += 0.004;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const numLines = 26; // Number of contour rings/lines
      const step = height / (numLines * 0.7);

      ctx.lineWidth = 1;

      // Draw flowing topographic contour lines
      for (let i = 0; i < numLines; i++) {
        const baseY = (i * step) - (height * 0.15);
        const alpha = Math.sin((i / numLines) * Math.PI) * 0.12 + 0.02; // subtle opacity
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;

        ctx.beginPath();
        const segments = 60;
        const segmentWidth = width / segments;

        for (let j = 0; j <= segments; j++) {
          const x = j * segmentWidth;
          // Dual sine wave with spatial wave modulation
          const wave1 = Math.sin(x * 0.0025 + time + i * 0.25) * 35;
          const wave2 = Math.cos(x * 0.005 - time * 0.7 + i * 0.15) * 20;
          const wave3 = Math.sin((x + baseY) * 0.0015 + time * 0.5) * 15;
          const y = baseY + wave1 + wave2 + wave3;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Subtle radial dark gradient mask at center to focus content
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.1,
        width / 2,
        height / 2,
        width * 0.7
      );
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
