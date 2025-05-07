
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Aloha Poop Scoop - Professional Pet Waste Removal in Hawaiian Paradise Park</title>
        <meta 
          name="description" 
          content="Professional pet waste removal services in Hawaiian Paradise Park (HPP) & nearby Puna areas. Weekly and bi-weekly service plans with satisfaction guarantee." 
        />
      </Helmet>
      
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
