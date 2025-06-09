import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const LavaLampMetaballs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    ctx.filter = 'blur(5px) saturate(1.5)';
    ctx.globalCompositeOperation = 'lighter';

    // Partículas y gotas
    const particles: Particle[] = Array.from({ length: 20 }).map(createParticle);
    const droplets: Droplet[] = [];

    // Animación de subida indefinida
    particles.forEach(p => animateParticle(p, ctx, H));

    // Click/tap para explotar
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      particles.forEach(p => {
        const dx = x - p.x;
        const dy = y - p.y;
        if (Math.hypot(dx, dy) < p.r) {
          explodeAsDrop(p);
        }
      });
    };
    canvas.addEventListener('click', handleClick);

    // Explosión estilo gota de agua
    function explodeAsDrop(p: Particle) {
      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 50 + Math.random() * 30;
        droplets.push({
          x: p.x,
          y: p.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: p.r * 0.2 + Math.random() * (p.r * 0.1),
          opacity: 1
        });
      }
      gsap.killTweensOf(p);
      resetParticle(p, H);
      animateParticle(p, ctx, H);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Dibujar metaballs
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        drawBall(ctx, p);
        ctx.restore();
      });

      // Dibujar gotas y actualizarlas
      droplets.forEach((d, i) => {
        const dt = 1 / 60;
        d.x += d.vx * dt;
        d.y += d.vy * dt + 30 * dt;
        d.vy += 100 * dt;
        d.opacity -= 2 * dt;

        if (d.opacity <= 0) {
          droplets.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = d.opacity;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(145, 7, 216, 1)';
          ctx.fill();
          ctx.restore();
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('click', handleClick);
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
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  );
};

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  delay: number;
  opacity: number;
}
interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

function createParticle(): Particle {
  const r = 40 + Math.random() * 30;
  return {
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + r,
    r,
    speed: 3 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 40,
    delay: Math.random() * 1.5,
    opacity: 1,
  };
}

function resetParticle(p: Particle, H: number) {
  p.y = H + p.r;
  p.x = Math.random() * window.innerWidth;
  p.r = 40 + Math.random() * 30;
  p.opacity = 1;
}

function animateParticle(p: Particle, ctx: CanvasRenderingContext2D, H: number) {
  gsap.to(p, {
    y: -p.r,
    x: `+=${p.drift}`,
    duration: p.speed * 1.8,
    ease: 'power1.out',
    delay: p.delay,
    repeat: -1,
    onRepeat: () => resetParticle(p, H)
  });
}

function drawBall(ctx: CanvasRenderingContext2D, p: Particle) {
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
  ctx.ellipse(p.x, p.y, p.r * 0.9, p.r * 0.75, 0, 0, Math.PI * 2);
  ctx.fill();

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
}
