import React from 'react';
import { useTranslation } from 'react-i18next';

const Homes: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-5xl font-extrabold mb-4">{t('home.title')}</h1>
      <p className="text-lg max-w-xl text-center">{t('home.subtitle')}</p>
      <div className="mt-8 space-x-4">
        <button
          onClick={() => {/* navegar a /about */}}
          className="px-6 py-2 border rounded-full hover:bg-gray-200 hover:text-black transition"
        >
          {t('home.ctaAbout')}
        </button>
        <button
          onClick={() => {/* navegar a /projects */}}
          className="px-6 py-2 border rounded-full hover:bg-gray-200 hover:text-black transition"
        >
          {t('home.ctaProjects')}
        </button>
      </div>
    </section>
  );
};

export default Homes;