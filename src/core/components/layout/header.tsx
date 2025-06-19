import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  /** true si el fondo sobre el que va el header es oscuro (negro), false si es claro (blanco) */
  isDarkBg: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkBg }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
 
  // Según isDarkBg elegimos text-white o text-black
  const textColorClass = isDarkBg ? 'text-white hover:text-[#7F5AF0]' : 'text-black hover:text-[#7F5AF0]';
  const borderClass = isDarkBg ? 'border-transparent focus:ring-[#7F5AF0]' : 'border-gray-300 focus:ring-gray-700';
 const hero= () => window.scrollTo(0, 0);
  return (
    <header
      className={`
        w-full
        bg-transparent
        px-4 py-3
        flex items-center justify-between
        shadow-md
        fixed top-0 left-0 z-50
      `}
    >
      <nav className="flex-1">
        <ul className="flex flex-row justify-center gap-8 text-lg font-medium list-none m-0 p-0 cursor-pointer">
          <li>
            <a
            onClick={hero}
              className={`${textColorClass} transition-colors`}
            >
              {t('home')}
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`${textColorClass} transition-colors`}
            >
              {t('about')}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={`${textColorClass} transition-colors`}
            >
              {t('projects')}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`${textColorClass} transition-colors`}
            >
              {t('contact')}
            </a>
          </li>
        </ul>
      </nav>
      <div className="ml-4">
        <select
          value={i18n.language}
          onChange={e => changeLanguage(e.target.value)}
          className={`
            cursor-pointer
            bg-transparent
            px-2 py-1
            rounded
            focus:outline-none focus:ring-2
            ${textColorClass.replace(' hover:text-blue-400', '')}
            ${borderClass}
          `}
        >
          <option className="bg-white text-black" value="es">
            Es
          </option>
          <option className="bg-white text-black" value="en">
            En
          </option>
        </select>
      </div>
    
    </header>
  );
};

export default Header;