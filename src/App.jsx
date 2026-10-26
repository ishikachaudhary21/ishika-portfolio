import React, { Suspense, lazy, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

gsap.registerPlugin(ScrollTrigger)

// Lazy load non-critical sections (reference-style) for performance
const FrameScroll = lazy(() => import('./components/FrameScroll'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Expertise = lazy(() => import('./components/Expertise'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  // Lenis smooth scrolling — gives the whole page the reel's inertial,
  // buttery flow. Driven by GSAP's ticker so pinned scrub sections stay
  // perfectly in sync with the smoothed scroll position.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,        // lower = heavier, more cinematic glide
      anchors: true,     // nav links glide instead of jumping
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <FrameScroll frameCount={240} />
        <About />
        <Projects />
        <Expertise />
        <Contact />
        <Footer />
      </Suspense>
    </>
  )
}

export default App
