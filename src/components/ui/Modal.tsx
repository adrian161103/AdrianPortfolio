import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && modalRef.current && backdropRef.current) {
      // 1) Animación del modal
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, rotateX: -40, transformOrigin: '50% 100%' },
        { opacity: 1, scale: 1, rotateX: 0, duration: 2, ease: 'power3.out' }
      );

      // 2) Animación de la variable CSS --blur
      gsap.fromTo(
        backdropRef.current,
        { '--blur': '0px' },
        { '--blur': '15px', duration: 1, ease: 'power3.out' }
      );
    }
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      // inicializamos la variable CSS a 0px
      style={{
        '--blur': '0px',
        backdropFilter: 'blur(var(--blur))'
      } as React.CSSProperties}
    >
      <div
        ref={modalRef}
        className="bg-[#18181b] rounded-2xl shadow-2xl p-12 min-w-[400px] max-w-[95vw] relative border-2 border-[#7F5AF0] flex flex-col items-center"
        style={{ minHeight: 320 }}
      >
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-[#7F5AF0] text-3xl font-bold"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
        {title && (
          <h2 className=" text-3xl font-extrabold mt-12 mb-8 text-white text-center w-full">
            {title}
          </h2>
        )}
        <div className="w-full flex flex-row gap-6 justify-center items-center mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;