import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const move = (e: MouseEvent) => {
      gsap.to(el, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50"
    >
      {/** Halo exterior grande **/}
      <div
        className="
          absolute top-0 left-0
          w-[200px] h-[200px]
          rounded-full
          bg-white/50       /* baja opacidad */
          filter blur-[100px]
          -translate-x-1/2 -translate-y-1/2
          z-0
        "
      />

      {/** Glow intermedio **/}
      <div
        className="
          absolute top-0 left-0
          w-[80px] h-[80px]
          rounded-full
          bg-white/50       /* aún más sutil */
          filter blur-[30px]
          -translate-x-1/2 -translate-y-1/2
          z-5
        "
      />

      {/** Punto central suave **/}
      <div
        className="
          absolute top-0 left-0
          w-4 h-4
          rounded-full
          bg-white/60       
          filter blur-[15px] 
          -translate-x-1/2 -translate-y-1/2
          z-10
        "
      />
    </div>
  );
};

export default AnimatedCursor;