import './App.css'
import { useTranslation } from 'react-i18next';

function App() {
    
  const { t, i18n } = useTranslation('test');

  const cambiarIdioma = (lng: 'en' | 'es') => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <button onClick={() => cambiarIdioma('es')}>ES</button>
      <button onClick={() => cambiarIdioma('en')}>EN</button>
      <h1>{t('welcome')}</h1>
      <nav>
        <ul>
          <li>{t('home')}</li>
          <li>{t('about')}</li>
          <li>{t('contact')}</li>
        </ul>
      </nav>
    </>
  )
}

export default App
