
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {
  const teamMembers = [
    {
      name: "Dylan Kawaikini",
      position: "Founder & Owner",
      bio: "Born and raised in Hilo, Dylan founded Aloha Poop Scoop after noticing a need for professional pet waste removal services in the Puna area. A dog owner himself, he understands the importance of maintaining a clean and healthy environment for pets and families.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2574"
    },
    {
      name: "Keala Pelekai",
      position: "Operations Manager",
      bio: "With 5+ years of experience in pet care services, Keala oversees daily operations and ensures every yard gets the attention it deserves. She's passionate about providing excellent customer service and maintaining the highest standards of cleanliness.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=2574"
    },
    {
      name: "Kai Mahelona",
      position: "Service Technician",
      bio: "Kai is one of our dedicated service technicians who visits properties daily. He's known for his attention to detail and friendly demeanor. When not cleaning yards, Kai enjoys surfing and volunteering at the local animal shelter.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=2574"
    }
  ];

  return (
    <div>
      <Navigation />
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Aloha Poop Scoop</h1>
          <p className="text-xl max-w-2xl">
            Hawaiian Paradise Park's trusted pet waste removal service.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80&w=2574" 
                alt="Hawaiian landscape" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 2020, Aloha Poop Scoop was born from a simple observation: busy pet owners in Hawaiian Paradise Park and across Puna needed a reliable, professional solution for keeping their yards clean and safe.
              </p>
              <p className="text-lg mb-4">
                What started as a single-person operation has grown into a trusted local business serving over 100 regular customers throughout the area. Our mission is simple: provide exceptional pet waste removal services that give owners more time to enjoy their pets and their properties.
              </p>
              <p className="text-lg mb-4">
                We're proud to be locally owned and operated, with deep roots in the Hawaiian Paradise Park community. We understand the unique challenges of maintaining properties in our tropical climate and terrain.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-tropic mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reliability you can count on, week after week</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-tropic mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thoroughness in every yard, every time</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-tropic mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Local knowledge and aloha spirit</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-tropic mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Environmental responsibility in all operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover-lift"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-tropic font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join over 100 satisfied customers who trust Aloha Poop Scoop with their pet waste removal needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/pricing" className="btn-primary">
              See Our Plans
            </a>
            <a href="tel:8081234567" className="btn-secondary bg-lava">
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
