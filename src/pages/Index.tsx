
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
