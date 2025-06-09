import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const LavaLampMetaballs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    // ctx.filter = 'blur(8px) saturate(1.5)'; 
     ctx.filter = ' saturate(1.5)'; 
    // Modo de composición aditiva para que las bolas se iluminen al fusionarse
    ctx.globalCompositeOperation = 'lighter';

    // Creamos las partículas (metaballs)
    const particles = Array.from({ length: 20 }).map(() => {
      const r = 40 + Math.random() * 30;
      return {
        x: Math.random() * W,
        y: H + r, 
        r,
        speed: 3 + Math.random() * 4,
        drift: (Math.random() - 0.5) * 40,
        delay: Math.random() * 1.5,
      };
    });

    // Animación GSAP: suben y se reinician
    particles.forEach(p => {
      gsap.to(p, {
        y: -p.r,
        x: `+=${p.drift}`,
        duration: p.speed * 1.8,
        ease: 'power1.out',
        delay: p.delay,
        repeat: -1,
        onRepeat: () => {
          p.y = H + p.r;
          p.x = Math.random() * W;
        }
      });
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        ctx.save();

        // Bolsa vientre más plana con ellipse
        const baseGrad = ctx.createRadialGradient(
          p.x, p.y - p.r * 0.1, p.r * 0.1,
          p.x, p.y, p.r
        );
          baseGrad.addColorStop(0.00, 'rgba(39, 11, 62, 1)');
        baseGrad.addColorStop(0.25, 'rgba(42, 9, 56, 1)');
        baseGrad.addColorStop(0.50, 'rgba(75, 1, 125, 1)');
        baseGrad.addColorStop(0.75, 'rgba(145, 7, 216, 1)');
        baseGrad.addColorStop(1.00, 'rgba(46, 8, 69, 1)');


        ctx.fillStyle = baseGrad;
        ctx.beginPath();
        ctx.ellipse(
          p.x,
          p.y,
          p.r * 0.9,
          p.r * 0.75,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Especular highlight
        const hl = ctx.createRadialGradient(
          p.x - p.r * 0.2,
          p.y - p.r * 0.4,
          p.r * 0.05,
          p.x - p.r * 0.2,
          p.y - p.r * 0.4,
          p.r * 0.3
        );
        hl.addColorStop(0, 'rgba(255,255,255,0.8)');
        hl.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hl;
        ctx.beginPath();
        ctx.ellipse(
          p.x - p.r * 0.2,
          p.y - p.r * 0.4,
          p.r * 0.25,
          p.r * 0.15,
          -0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(draw);
    }

    draw();

    // Redimensionado del canvas
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.killTweensOf(particles);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};