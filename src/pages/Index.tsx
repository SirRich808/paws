
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
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // We don't need to preload here anymore since we're using the link preload in the HTML head
    // and the optimized loading in the Hero component directly
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
