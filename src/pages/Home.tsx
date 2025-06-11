import React, { useState } from 'react'
import Header from '../core/components/layout/header'
import Homes from '../components/Home/Homes'
import AboutMe from '../components/Home/AboutMe' 
import Projects from '../components/Home/Projects' 
import Contact from '../components/Home/Contact'

const HomePage: React.FC = () => {
  // Alterna el fondo claro/oscuro para luego superponer cada sección
  const [isDarkBg] = useState(false)

  return (
    <div className={`${isDarkBg ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      {/* Header recibe el estado de fondo para ajustar su estilo */}
      <Header isDarkBg={isDarkBg} />

      {/* Secciones principales */}
      <Homes  />
      <AboutMe />
      <Projects />
      <Contact />

      {/* Aquí podrías añadir un Footer, ajustes de idioma, o controles de animación */}
    </div>
  )
}

export default HomePage