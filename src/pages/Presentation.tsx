import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
// import { AnimatedLavaLamp } from '../components/Presentation/AnimatedLavaLamp';
import {LavaLampMetaballs} from '../components/Presentation/LavaLampMetaballs';
export const Presentation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<'en' | 'es'>(i18n.language as 'en' | 'es');

  const selectLang = (lng: 'en'|'es') => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const handleContinue = () => {
    window.location.href = '/home';
  };

  return (
    <div className="dark bg-black text-white min-h-screen flex items-center justify-center relative">
      <LavaLampMetaballs />
      {/* <AnimatedLavaLamp /> */}
      <div className="z-10 text-center p-8">
        <h1 className="text-4xl font-bold mb-4">{t('welcomeToMyWebPage')}</h1>
        <p className="mb-8 text-lg">{t('whichLanguage')}</p>
        <div className="flex justify-center gap-8 mb-12">
          <button
            onClick={() => selectLang('en')}
            className={`cursor-pointer px-6 py-2 rounded-lg border ${lang==='en'? 'bg-white text-black':'border-white'}`}
          >
            English
          </button>
          <button
            onClick={() => selectLang('es')}
            className={` cursor-pointer px-6 py-2 rounded-lg border ${lang==='es'? 'bg-white text-black':'border-white'}`}
          >
            Español
          </button>
        </div>
        <button
          onClick={handleContinue}
          className="cursor-pointer px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          {lang === 'en' ? 'Continue' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};