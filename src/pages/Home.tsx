import React, { useState, useRef, useEffect } from 'react'
import Header from '../core/components/layout/header'
import AboutMe from '../components/Home/AboutMe' 
import Projects from '../components/Home/Projects' 
import Contact from '../components/Home/Contact'
import Hero from '../components/Home/Hero'


const HomePage: React.FC = () => {
  // Referencias a las secciones
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)

  // Estado para el fondo
  const [isDarkBg, setIsDarkBg] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeTop = aboutMeRef.current?.getBoundingClientRect().top || 0
      // Si la parte superior de AboutMe está por encima de la mitad de la pantalla, cambiamos el fondo
   if (aboutMeTop <= 0) {
  setIsDarkBg(true)
} else {
  setIsDarkBg(false)
}
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
   <>
      <Header isDarkBg={isDarkBg} />
      <div ref={heroRef} id="hero">
      <Hero  />
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