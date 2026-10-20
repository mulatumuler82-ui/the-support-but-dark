import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="pf-root min-h-screen bg-[#07090F] text-[#E8EBF5] overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
