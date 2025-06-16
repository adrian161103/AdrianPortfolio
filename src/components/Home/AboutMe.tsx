import React, { useRef, useLayoutEffect, useState } from 'react';
import { SplitText } from 'gsap/all';
import { gsap } from 'gsap';
import Modal from '../ui/Modal';

gsap.registerPlugin(SplitText);

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

      // Timeline para texto
      const tl = gsap.timeline({ defaults: 
        { duration: 1, 
          y: 25, autoAlpha: 0, 
          ease: 'power2.out', 
          filter: 'blur(20px)',
        },
  
      });

      tl
        .from(splitTitle.chars, { y: 50, stagger: 0.1 })
        .from(splitSubtitle.words, { y: 35, duration: 1.5, stagger: 0.2 }, 0)
        .from(splitSummary.words, { stagger: 0.07 }, 0)
        .from(enlaceContainer, { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from(splitEnlace.words, { y: 35, stagger: 0.07 }, '<');

      // Animación respiración aura
      if (auraRef.current) {
        gsap.to(auraRef.current, {
          scale: 1.15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }

      // Animación sutil de imagen
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -10,
           duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }
 
      // Cleanup al desmontar
      return () => {
        splitTitle.revert();
        splitSubtitle.revert();
        splitSummary.revert();
        splitEnlace.revert();
        tl.kill();
        gsap.killTweensOf(auraRef.current!);
        gsap.killTweensOf(imageRef.current!);
      };
    }, containerRef);

    // Se asegura de limpiar el contexto GSAP
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="aboutme"
      ref={containerRef}
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black "
     
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
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 bg-[#7F5AF0] text-black font-medium rounded-lg shadow hover:bg-[#5e4e8d] transition"
          >
            Descargar CV
          </button>
          <a
            href="#portfolio"
            className="px-5 py-3 border border-gray-600 rounded-lg hover:border-[#5e4e8d] transition"
          >
            Ver Portfolio
          </a>
        </div>
      </div>

      {/* Modal para elegir idioma del CV */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="¿Qué quieres descargar?">
        <a
          href="/Adrian_Alejos_CV_ES.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-[#7F5AF0] text-black rounded-lg font-semibold text-center text-lg hover:bg-[#5e4e8d] transition shadow-lg min-w-[140px]"
        >
          Español
        </a>
        <a
          href="/Adrian_Alejos_CV_EN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-[#7F5AF0] text-black rounded-lg font-semibold text-center text-lg hover:bg-[#5e4e8d] transition shadow-lg min-w-[140px]"
        >
          Inglés
        </a>
      </Modal>

      {/* Derecha: Imagen con aura animada */}
      <div className="relative mt-8 lg:mt-0 lg:ml-16 flex items-center justify-center">
        {/* Aura morada animada */}
        <div className="absolute">
          <span
            ref={auraRef}
            className="block w-115 h-115 rounded-full filter blur-5xl"
            style={{
              background: 'radial-gradient(circle, rgba(127,90,240,0.7) 0%, rgba(127,90,240,0) 70%)'
            }}
          />
        </div>
        {/* Imagen de perfil animada */}
        <div
          ref={imageRef}
          className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-cover bg-center ring-4 ring-[#7F5AF0] overflow-hidden"
          style={{ backgroundImage: `url('Adrian.jpg')` }}
        />
      </div>
    </section>
  );
};

export default AboutMe;
