
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">Last updated: May 3, 2024</p>
        </div>
      </div>
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p>
              At Aloha Poop Scoop, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, and billing information.</li>
              <li><strong>Service Information:</strong> Details about your property, pet information, service preferences, and gate codes (when provided).</li>
              <li><strong>Website Usage:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process payments and manage your account</li>
              <li>To communicate with you about your service</li>
              <li>To send service notifications and updates</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>Data Sharing and Disclosure</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul>
              <li>With service providers who help us operate our business (payment processors, scheduling software, etc.)</li>
              <li>When required by law or to protect our rights</li>
              <li>In the event of a business transfer or acquisition</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee the security of information transmitted through our website.
            </p>

            <h2>Your Choices</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access, correct, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request information about how your data is used</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@alohapoopscoop.com.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your experience and collect information about how you use our site. You can manage cookie preferences through your browser settings.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website or by email.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@alohapoopscoop.com<br />
              Phone: (808) 123-4567<br />
              Mail: Aloha Poop Scoop, P.O. Box 1234, Pahoa, HI 96778
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <Link to="/terms" className="text-ember hover:underline">
              View our Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
