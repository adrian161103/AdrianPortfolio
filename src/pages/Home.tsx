import React, { useState, useRef, useEffect } from 'react'
import Header from '../core/components/layout/header'
import Homes from '../components/Home/Homes'
import AboutMe from '../components/Home/AboutMe' 
import Projects from '../components/Home/Projects' 
import Contact from '../components/Home/Contact'


const HomePage: React.FC = () => {
  // Referencias a las secciones
  const homesRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)

  // Estado para el fondo
  const [isDarkBg, setIsDarkBg] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeTop = aboutMeRef.current?.getBoundingClientRect().top || 0
      // Si la parte superior de AboutMe está por encima de la mitad de la pantalla, cambiamos el fondo
   if (aboutMeTop <= 0) {
  setIsDarkBg(false)
} else {
  setIsDarkBg(true)
}
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
   <>
      <Header isDarkBg={isDarkBg} />
      <div ref={homesRef} id="homes">
        <Homes />
      </div>
      <div ref={aboutMeRef} id="aboutme">
        <AboutMe />
      </div>
      <Projects />
      <Contact />
      </>
  )
}

export default HomePage