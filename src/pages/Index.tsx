
import { useEffect } from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Plans from "../components/Plans";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload the hero image
    const heroImage = new Image();
    heroImage.src = "/lovable-uploads/96adf5e6-14b4-4501-bae7-5a20da774c5b.png";
    heroImage.fetchPriority = "high";
  }, []);

  return (
    <div>
      <Navigation />
      <Hero />
      <HowItWorks />
      <Plans />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
