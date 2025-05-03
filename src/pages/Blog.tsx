
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Blog = () => {
  const [filter, setFilter] = useState("all");
  
  // Simulated blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "5 Reasons to Hire a Professional Poop Scoop Service",
      excerpt: "Learn why more Hawaii pet owners are hiring professionals for pet waste removal and the benefits it brings.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=2574",
      date: "October 15, 2023",
      category: "Benefits"
    },
    {
      id: 2,
      title: "How Often Should You Clean Your Yard of Dog Waste?",
      excerpt: "Find out the recommended frequency for yard clean-up based on the number of dogs and yard size.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=2574",
      date: "September 28, 2023",
      category: "Tips"
    },
    {
      id: 3,
      title: "The Environmental Impact of Proper Pet Waste Disposal",
      excerpt: "Discover how proper waste disposal contributes to environmental health in Hawaiian Paradise Park.",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80&w=2574",
      date: "September 10, 2023",
      category: "Environment"
    },
    {
      id: 4,
      title: "Pet Waste and Health: Protecting Your Family",
      excerpt: "Understanding the health risks associated with pet waste and how regular clean-up protects your family.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2574",
      date: "August 22, 2023",
      category: "Health"
    },
    {
      id: 5,
      title: "Preparing Your Yard for Our First Visit",
      excerpt: "Tips on what to do before our team arrives for the first clean-up service.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=2574",
      date: "August 5, 2023",
      category: "Tips"
    }
  ];

  const categories = ["all", "Tips", "Benefits", "Environment", "Health"];
  
  const filteredPosts = filter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <div>
      <Navigation />
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Poop Scoop Blog</h1>
          <p className="text-xl max-w-2xl">
            Tips, insights, and updates from Hawaiian Paradise Park's pet waste removal experts.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`mx-2 px-4 py-2 rounded-full mb-2 ${
                  filter === category
                    ? "bg-ember text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Posts" : category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-ember text-white px-4 py-1 text-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-ember transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-ember font-medium flex items-center">
                      Read More 
                      <svg className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No posts found in this category.</p>
              <button 
                onClick={() => setFilter("all")} 
                className="mt-4 text-ember hover:underline"
              >
                View all posts
              </button>
            </div>
          )}
          
          {/* Pagination placeholder - can be implemented for actual blog */}
          <div className="mt-12 flex justify-center">
            <span className="px-4 py-2 border rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">Previous</span>
            <span className="px-4 py-2 border rounded-md mx-1 bg-ember text-white">1</span>
            <span className="px-4 py-2 border rounded-md cursor-not-allowed bg-gray-100 text-gray-400">Next</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Get the latest pet care tips, special offers, and updates delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-ember focus:border-transparent"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
