import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CareerTimeline from './components/CareerTimeline';
import EngineeringNotes from './components/EngineeringNotes';
import UpstreamContributions from './components/UpstreamContributions';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <CareerTimeline />
        <EngineeringNotes />
        <UpstreamContributions />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}

export default App;
