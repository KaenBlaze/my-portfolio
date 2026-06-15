import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CursorEffect from './components/CursorEffect';

const StarsCanvas = lazy(() => import('./components/Stars'));
const About = lazy(() => import('./components/About'));
const Service = lazy(() => import('./components/Service'));
const TechStack = lazy(() => import('./components/TechStack'));
const Work = lazy(() => import('./components/Work'));
const Testimonial = lazy(() => import('./components/Testimonial'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loadStars, setLoadStars] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoadStars(true);
    }, 150);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider>
      <CursorEffect />
      <div className="relative w-screen h-screen z-10">
        <Home />
        <Suspense fallback={null}>
          {loadStars && <StarsCanvas />}
        </Suspense>
      </div>
      <div className="relative z-0 body">
        <Navbar />
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <TechStack />
        </Suspense>
        <Suspense fallback={null}>
          <Service />
        </Suspense>
        <Suspense fallback={null}>
          <Work />
        </Suspense>
        <div className="relative mt-24 pb-28">
          <Suspense fallback={null}>
            <Testimonial />
          </Suspense>
        </div>
        <div className="contact mb-80">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
