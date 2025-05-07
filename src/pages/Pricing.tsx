
import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Plans from "../components/Plans";

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl max-w-2xl">
            Choose the plan that works best for your home and pets. All plans include our satisfaction guarantee.
          </p>
        </div>
      </div>
      <Plans />
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Pricing Questions</h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Are there any setup fees or contracts?",
                answer: "No setup fees and no contracts! You can cancel anytime with just a simple email or phone call."
              },
              {
                question: "Do you offer discounts for multiple properties?",
                answer: "Yes, we offer discounts for customers with multiple properties. Please contact us for details."
              },
              {
                question: "What forms of payment do you accept?",
                answer: "We accept all major credit cards through our secure payment system. We also offer automatic billing for your convenience."
              },
              {
                question: "What if I'm not satisfied with the service?",
                answer: "We offer a satisfaction guarantee! If you're not happy with our service, let us know within 24 hours and we'll return to address any issues at no additional charge."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-6 bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="tel:8081234567" className="btn-primary inline-block">
              Call For Custom Pricing
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
