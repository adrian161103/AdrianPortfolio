import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Header from '../core/components/layout/header'
import AboutMe from '../components/Home/AboutMe' 
import Projects from '../components/Home/Projects' 
import Contact from '../components/Home/Contact'
import Hero from '../components/Home/Hero'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



const HomePage: React.FC = () => {
  // Referencias a las secciones
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)

  // Estado para el fondo
  const [isDarkBg, setIsDarkBg] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeTop = aboutMeRef.current?.getBoundingClientRect().top || 0
      // Si la parte superior de AboutMe está por encima de la mitad de la pantalla, se cambia el fondo
   if (aboutMeTop <= 0) {
  setIsDarkBg(true)
} else {
  setIsDarkBg(false)
}
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
   useLayoutEffect(() => {
    if (!heroRef.current || !aboutMeRef.current) return

    const ctx = gsap.context(() => {
      // Pin Hero mientras AboutMe aparece
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: false,
      })

      gsap.set(aboutMeRef.current, {
        position: 'relative',
        zIndex: 1,
      })
      // Animar AboutMe subiendo y apareciendo
      gsap.fromTo(
        aboutMeRef.current,
        { y: 200, opacity: 0, zIndex: 1 },
        {
          y: 0,
          opacity: 1,
          zIndex: 5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutMeRef.current,
            start: 'top bottom',
            end: 'top top+=100',
            scrub: true,
          },
        }
      )
      // Animar opacidad de Hero mientras AboutMe aparece
      gsap.fromTo(
        heroRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutMeRef.current,
            start: 'top bottom',
            end: 'top top+=100',
            scrub: true,
          },
        }
      )
    }, [heroRef, aboutMeRef])

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
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