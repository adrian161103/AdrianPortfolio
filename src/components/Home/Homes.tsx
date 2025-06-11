import React, { useRef, useLayoutEffect } from 'react';
import { SplitText } from 'gsap/all';
import { gsap } from 'gsap';

gsap.registerPlugin(SplitText);

const Homes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Creamos un contexto de GSAP para React 18
    const ctx = gsap.context(() => {
      const title = containerRef.current!.querySelector('h1') as HTMLElement;
      const subtitle = containerRef.current!.querySelector('p:nth-of-type(1)') as HTMLElement;
      const summary = containerRef.current!.querySelector('p:nth-of-type(2)') as HTMLElement;
      const enlaceContainer = containerRef.current!.querySelector('div.mt-4') as HTMLElement;
      const enlaces = enlaceContainer.querySelectorAll('a');

      // Splits
      const splitTitle = new SplitText(title, { type: 'words,chars' });
      const splitSubtitle = new SplitText(subtitle, { type: 'words,chars' });
      const splitSummary = new SplitText(summary, { type: 'words' });
      const splitEnlace = new SplitText(enlaces as NodeListOf<HTMLElement>, { type: 'words' });

      // Timeline
      const tl = gsap.timeline({ defaults: { duration: 1, y: 25, autoAlpha: 0, ease: 'power2.out', filter: 'blur(20px)' } });

      tl
        .from(splitTitle.chars, { y: 50, stagger: 0.1 })
        .from(splitSubtitle.words, { y: 35, duration: 1.5, stagger: 0.2 }, 0)
        .from(splitSummary.words, { stagger: 0.07 }, 0)
        .from(enlaceContainer, { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from(splitEnlace.words, { y: 35, stagger: 0.07 }, '<');

      // Cleanup al desmontar
      return () => {
        splitTitle.revert();
        splitSubtitle.revert();
        splitSummary.revert();
        splitEnlace.revert();
        tl.kill();
      };
    }, containerRef);

    // Se asegura de limpiar el contexto GSAP
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 text-white"
      style={{ backgroundColor: '#000' }}
    >
      {/* Izquierda: Texto */}
      <div className="z-10 lg:w-1/2 space-y-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
          Adrián Alejos García
        </h1>
        <p className="text-lg text-[#7F5AF0] font-semibold">
          Full-Stack Web Developer
        </p>
        <p className="text-base lg:text-lg max-w-md text-gray-200">
          Especializado en JavaScript/TypeScript, React, Tailwind CSS y animaciones avanzadas con GSAP. Apasionado por la optimización y la experiencia de usuario.
        </p>
        <div className="flex space-x-4 mt-4">
          <a
            href="/Adrian_Alejos_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#7F5AF0] text-black font-medium rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Descargar CV
          </a>
          <a
            href="#portfolio"
            className="px-5 py-3 border border-gray-600 rounded-lg hover:border-yellow-500 transition"
          >
            Ver Portfolio
          </a>
        </div>
      </div>

      {/* Derecha: Imagen */}
      <div
        className="mt-8 lg:mt-0 lg:ml-16 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-cover bg-center ring-4 ring-[#7F5AF0]"
        style={{ backgroundImage: `url('Adrian.jpg')` }}
      />
    </section>
  );
};

export default Homes;
