// frontend/src/hooks/useLenisScroll.js
import { useEffect } from 'react';
import Lenis from 'lenis'

const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      direction: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1,
      lerp: 0.08,
      wheelMultiplier: 0.8,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};

export default useLenisScroll;