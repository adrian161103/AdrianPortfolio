import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BubbleConfig {
  x: number;
  size: number;
  delay: number;
  offsetX: number;
  offsetY: number;
}

export const AnimatedLavaLamp: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const lampStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '24vw',
    height: '80vh',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const H = container.current?.clientHeight || window.innerHeight;
      const W = container.current?.clientWidth || window.innerWidth;

      // Erupción de gotas medianas
      const mediumDrops = gsap.utils.toArray<HTMLElement>('.lava-medium');
      mediumDrops.forEach((drop, i) => {
        const offsetX = (Math.random() - 0.5) * W * 0.3;
        const offsetY = H * (0.5 + Math.random() * 0.3);
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 + Math.random(), delay: i * 0.3 });

        tl.set(drop, { x: 0, y: 0, scale: 0.5, opacity: 1 })
          .to(drop, {
            x: offsetX,
            y: -offsetY,
            scale: 1,
            duration: 0.8 + Math.random() * 0.2,
            ease: 'power2.out',
          })
          .to(drop, {
            x: 0,
            y: 0,
            scale: 0.5,
            duration: 1.5 + Math.random(),
            ease: 'bounce.out',
          });
      });

      // Burbujas pequeñas ascendentes
      const bubbles: BubbleConfig[] = Array.from({ length: 30 }).map(() => ({
        x: Math.random() * (W - 20) + 10,
        size: Math.random() * 12 + 6,
        delay: Math.random() * 3,
        offsetX: (Math.random() - 0.5) * 20,
        offsetY: H * 0.9,
      }));

      bubbles.forEach(cfg => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        Object.assign(bubble.style, {
          position: 'absolute',
          bottom: '0px',
          left: `${cfg.x}px`,
          width: `${cfg.size}px`,
          height: `${cfg.size}px`,
          borderRadius: '50%',
          background: 'rgba(165,94,234,0.6)',
        });
        container.current!.appendChild(bubble);

        gsap.to(bubble, {
          x: cfg.offsetX,
          y: -cfg.offsetY,
          duration: 2 + Math.random() * 2,
          ease: 'power1.out',
          delay: cfg.delay,
          repeat: -1,
          yoyo: true,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} style={lampStyle}>
      {/* Bola base fija */}
      <div
        className="lava-big"
        style={{
          position: 'absolute',
          bottom: '-300px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at bottom, #a55eea, #5f27cd)',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Gotas medianas para erupción */}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="lava-medium"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${30 + Math.random() * 20}px`,
            height: `${30 + Math.random() * 20}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle at bottom, #a55eea, #5f27cd)',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};
