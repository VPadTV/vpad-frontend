'use client'
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="bg-background text-foreground relative">
      <Hero />
      {!isAuthenticated && (
        <>
        <Features />
        <Testimonials />
        </>
        )}
      <CTA />
      <Footer />
      
      <div 
        className="fixed top-0 -left-4 w-96 h-96 bg-gradient-to-r from-primary to-secondary opacity-[0.15] rounded-full blur-[100px] transform -translate-y-1/2"
        style={{
          transform: `translate(-50%, ${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.1}deg)`
        }}
      />
      <div 
        className="fixed bottom-0 -right-4 w-96 h-96 bg-gradient-to-l from-secondary to-primary opacity-[0.15] rounded-full blur-[100px] transform translate-y-1/2"
        style={{
          transform: `translate(50%, ${-scrollPosition * 0.2}px) rotate(${-scrollPosition * 0.1}deg)`
        }}
      />
      <div 
        className="fixed top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-[0.1] rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) rotate(${scrollPosition * 0.05}deg)`
        }}
      />
    </main>
  );
}
