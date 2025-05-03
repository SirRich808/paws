
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Last updated: May 3, 2024</p>
        </div>
      </div>
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p>
              Welcome to Aloha Poop Scoop. Please read these Terms of Service carefully before using our website or services.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By using our website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2>2. Service Description</h2>
            <p>
              Aloha Poop Scoop provides pet waste removal services for residential and commercial properties in Hawaiian Paradise Park and surrounding Puna areas. Our services include scheduled waste removal on a weekly or bi-weekly basis, as well as one-time cleanup services.
            </p>

            <h2>3. Service Agreement</h2>
            <p>
              When you schedule service with us, you agree to:
            </p>
            <ul>
              <li>Provide accurate information about your property and pets</li>
              <li>Ensure safe access to your property on scheduled service days</li>
              <li>Secure pets during our service visits</li>
              <li>Pay for services in accordance with our payment terms</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              Payment is due at the time of service scheduling. We accept major credit cards through our secure payment system. For recurring services, your card will be automatically charged according to your service plan (weekly or bi-weekly).
            </p>
            <p>
              Prices are subject to change with 30 days notice. Cancellations with less than 24 hours notice may be subject to a cancellation fee.
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              You may cancel scheduled service without penalty with at least 24 hours notice. For recurring service plans, you may cancel at any time with written notice (email or text message). No refunds will be provided for partially completed service periods.
            </p>

            <h2>6. Service Guarantee</h2>
            <p>
              We strive to provide thorough and satisfactory service. If you are not satisfied with our service, please notify us within 24 hours, and we will return to address any issues at no additional charge.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              Aloha Poop Scoop is not liable for:
            </p>
            <ul>
              <li>Damage to property not caused directly by our service technicians</li>
              <li>Inability to access your property due to locked gates, dangerous conditions, or aggressive animals</li>
              <li>Weather-related service delays (severe storms, flooding, etc.)</li>
              <li>Pre-existing property damage or conditions</li>
            </ul>

            <h2>8. Property Access and Safety</h2>
            <p>
              You agree to provide safe access to your property. Our technicians reserve the right to refuse service if they encounter aggressive animals, unsafe conditions, or other hazards. In such cases, you may still be charged for the scheduled service.
            </p>

            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the new terms.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Email: info@alohapoopscoop.com<br />
              Phone: (808) 123-4567<br />
              Mail: Aloha Poop Scoop, P.O. Box 1234, Pahoa, HI 96778
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <Link to="/privacy" className="text-ember hover:underline">
              View our Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
