import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isWhiteBg, setIsWhiteBg] = useState(false);

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
      // Detecta el color de fondo bajo el cursor
      const elem = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;
      if (elem) {
        // Si el elemento es un botón o enlace, busca el fondo en el padre relevante
        let current: HTMLElement | null = elem;
        // Si es button o a, sube al padre
        if (current.tagName === "BUTTON" || current.tagName === "A") {
          current = current.parentElement;
        }
        let bg = "";
        while (current && (!bg || bg === "transparent" || bg === "rgba(0,0,0,0)")) {
          const style = getComputedStyle(current);
          bg = style.backgroundColor.replace(/\s/g, "").toLowerCase();
          current = current.parentElement;
        }
        setIsWhiteBg(
          bg === "#fff" ||
          bg === "#ffffff" ||
          bg === "rgb(255,255,255)" ||
          bg === "white"
        );
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Clases condicionales según fondo
  const haloClass = isWhiteBg
    ? "bg-black/40"
    : "bg-white/50";
  const glowClass = isWhiteBg
    ? "bg-black/60"
    : "bg-white/50";
  const dotClass = isWhiteBg
    ? "bg-black/80"
    : "bg-white/60";

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50"
    >
      {/** Halo exterior grande **/}
      <div
        className={`
          absolute top-0 left-0
          w-[200px] h-[200px]
          rounded-full
          ${haloClass}       /* baja opacidad */
          filter blur-[100px]
          -translate-x-1/2 -translate-y-1/2
          z-0
        `}
      />

      {/** Glow intermedio **/}
      <div
        className={`
          absolute top-0 left-0
          w-[80px] h-[80px]
          rounded-full
          ${glowClass}       /* aún más sutil */
          filter blur-[30px]
          -translate-x-1/2 -translate-y-1/2
          z-5
        `}
      />

      {/** Punto central suave **/}
      <div
        className={`
          absolute top-0 left-0
          w-4 h-4
          rounded-full
          ${dotClass}      
          filter blur-[15px] 
          -translate-x-1/2 -translate-y-1/2
          z-10
        `}
      />
    </div>
  );
};

export default AnimatedCursor;