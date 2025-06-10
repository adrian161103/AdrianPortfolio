import React from 'react';
import { useTranslation } from 'react-i18next';
// import me from '../../assets/me.jpg';

const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="flex flex-col-reverse md:flex-row items-center px-6 py-12">
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-4xl font-bold">{t('about.title')}</h2>
        <p>{t('about.description')}</p>
        <ul className="grid grid-cols-3 gap-4 mt-6">
          {/* Iconos de tecnologías */}
          <li className="flex flex-col items-center">
            <img src="/assets/icons/react.svg" alt="React" className="w-12 h-12 mb-2"/>
            <span>React</span>
          </li>
          <li className="flex flex-col items-center">
            <img src="/assets/icons/tailwind.svg" alt="Tailwind" className="w-12 h-12 mb-2"/>
            <span>Tailwind CSS</span>
          </li>
          <li className="flex flex-col items-center">
            <img src="/assets/icons/gsap.svg" alt="GSAP" className="w-12 h-12 mb-2"/>
            <span>GSAP</span>
          </li>
        </ul>
      </div>
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        {/* <img src={me} alt="Adrian Alejos García" className="w-64 h-64 rounded-full object-cover border-4"/> */}
      </div>
    </section>
  );
};

export default AboutMe;