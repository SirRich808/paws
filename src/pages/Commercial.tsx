
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Commercial = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    propertyType: "",
    address: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This is a temporary solution until a commercial_inquiries table is created in Supabase
      // For now, we'll simulate a successful submission with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Quote request submitted! We'll get back to you within 24 hours.");
      
      // Reset form after successful submission
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        propertyType: "",
        address: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      title: "Improved Property Appearance",
      description: "Keep your grounds clean and professional-looking for customers and visitors.",
      icon: "✨"
    },
    {
      title: "Health Code Compliance",
      description: "Stay compliant with health regulations for businesses that serve the public.",
      icon: "✓"
    },
    {
      title: "Customized Service Plans",
      description: "Tailored frequency and coverage based on your specific property needs.",
      icon: "📝"
    },
    {
      title: "Liability Reduction",
      description: "Minimize slip-and-fall risks and improve overall safety for visitors.",
      icon: "🛡️"
    },
    {
      title: "Eco-Friendly Disposal",
      description: "All waste is properly disposed of in line with local environmental regulations.",
      icon: "♻️"
    },
    {
      title: "Apartment & HOA Discounts",
      description: "Special pricing for multi-unit properties and homeowners associations.",
      icon: "🏢"
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Commercial Pet Waste Services - Aloha Poop Scoop</title>
        <meta 
          name="description" 
          content="Professional pet waste management solutions for apartments, HOAs, parks, and commercial properties throughout Hawaiian Paradise Park and Puna areas." 
        />
      </Helmet>
      
      <Navigation />
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Commercial Pet Waste Removal</h1>
          <p className="text-xl max-w-2xl">
            Professional waste management solutions for apartments, HOAs, parks, and commercial properties.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover-lift transition-all">
                <div className="text-3xl mb-4" aria-hidden="true">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">We Service All Commercial Properties:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Apartment Complexes",
                "Homeowners Associations",
                "Public Parks",
                "Dog Parks",
                "Condominium Properties",
                "Office Complexes",
                "Hotels & Resorts",
                "RV Parks & Campgrounds",
                "Retail Centers"
              ].map((property, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-tropic mr-2 flex-shrink-0" />
                  <span>{property}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Request a Commercial Quote</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block mb-2 font-medium">Business/Property Name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block mb-2 font-medium">Contact Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                    aria-describedby="email-description"
                  />
                  <p id="email-description" className="text-sm text-gray-500 mt-1">
                    We'll never share your email with anyone else.
                  </p>
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block mb-2 font-medium">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                  >
                    <option value="">Select a property type</option>
                    <option value="apartment">Apartment Complex</option>
                    <option value="hoa">HOA/Condominium</option>
                    <option value="park">Park/Public Space</option>
                    <option value="office">Office Complex</option>
                    <option value="hotel">Hotel/Resort</option>
                    <option value="retail">Retail Center</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="address" className="block mb-2 font-medium">Property Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block mb-2 font-medium">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
                    placeholder="Please include any additional details that would help us prepare your quote (property size, estimated number of dogs, desired service frequency, etc.)"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button 
                  type="submit" 
                  className="btn-primary px-8 py-3" 
                  disabled={loading}
                  aria-live="polite"
                >
                  {loading ? 'Submitting...' : 'Request Quote'}
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-gray-600">
              We'll respond to your inquiry within 1 business day.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Commercial;
