
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "How often should I have my yard cleaned?",
      answer: "For homes with 1-2 dogs, we recommend weekly service. For 3 or more dogs, or for larger breeds, twice weekly service may be more appropriate. We also offer bi-weekly service for those with smaller dogs or limited budgets."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "No, you don't need to be home! Just make sure your gate is unlocked or provide us with a gate code, and we'll take care of the rest. We'll send you a text notification when we've completed the service."
    },
    {
      question: "What areas in Puna do you service?",
      answer: "We currently service Hawaiian Paradise Park (HPP), Hawaiian Beaches, Ainaloa, Orchid Land, and Pahoa. If you're unsure if you're in our service area, please contact us!"
    },
    {
      question: "How is the waste disposed of?",
      answer: "We properly bag and dispose of all waste in accordance with local regulations. The waste is sealed in biodegradable bags and disposed of in approved facilities."
    },
    {
      question: "What if it's raining on my scheduled day?",
      answer: "We work in most weather conditions, including light to moderate rain. However, in cases of severe weather, we'll reschedule your service for the next available day and notify you of the change."
    },
    {
      question: "Do you offer one-time cleanups?",
      answer: "Yes, we offer one-time cleanups for special situations. These are priced based on yard size and condition. Please contact us for a custom quote."
    }
  ];
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our service? Find answers to our most commonly asked questions below.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left font-medium text-lg py-2 focus:outline-none"
              >
                <span>{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="py-3 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're happy to help!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:8081234567"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a
              href="sms:8081234567"
              className="btn-secondary inline-flex items-center justify-center gap-2 bg-lava"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Text Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
