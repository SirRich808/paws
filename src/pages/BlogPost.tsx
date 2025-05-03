
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Simulated blog post data
  const blogPosts = {
    "1": {
      title: "5 Reasons to Hire a Professional Poop Scoop Service",
      date: "October 15, 2023",
      author: "Dylan Kawaikini",
      category: "Benefits",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=2574",
      content: `
        <p class="mb-4">If you're a dog owner in Hawaiian Paradise Park or anywhere in the Puna area, you know that picking up after your furry friend is an important but often unpleasant task. Many pet owners are now turning to professional pet waste removal services to handle this necessary chore. Here are five compelling reasons to consider hiring Aloha Poop Scoop for this service:</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">1. Save Valuable Time</h3>
        <p class="mb-4">The average dog owner spends about 30 minutes per week cleaning up after their pet. That adds up to 26 hours per year – more than a full day of your life! By hiring a professional service, you reclaim this time for activities you actually enjoy with your family and pets.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">2. Health and Safety Benefits</h3>
        <p class="mb-4">Dog waste can carry parasites, bacteria, and viruses that are harmful to humans and other pets. Professional removal reduces these health risks and helps prevent the spread of diseases like roundworm, E. coli, and giardia. This is especially important for families with children who play in the yard.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">3. Thorough and Consistent Cleaning</h3>
        <p class="mb-4">Our technicians are trained to spot waste that might be hidden in tall grass, under bushes, or in other hard-to-see areas. We provide consistent, thorough cleaning regardless of weather conditions or your busy schedule. No more rushing through the task or missing spots!</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">4. Environmental Protection</h3>
        <p class="mb-4">When left on the ground, dog waste can wash into storm drains and eventually into local waterways, contributing to water pollution. This is particularly concerning in our beautiful Hawaiian ecosystem. Professional services ensure proper disposal that protects our environment.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">5. Enhanced Property Enjoyment</h3>
        <p class="mb-4">A clean yard is more enjoyable for everyone. No more watching your step or dealing with unpleasant odors. You can fully enjoy your outdoor space for barbecues, family activities, or simply relaxing on your lanai without worrying about unsightly or smelly messes.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Conclusion</h3>
        <p class="mb-4">Professional pet waste removal is more than a convenience—it's an investment in your time, health, and property enjoyment. Aloha Poop Scoop provides reliable, thorough service at affordable rates for Hawaiian Paradise Park and surrounding Puna communities.</p>
        
        <p class="mb-4">Ready to enjoy a consistently clean yard? Contact us today to set up your regular service plan!</p>
      `
    },
    "2": {
      title: "How Often Should You Clean Your Yard of Dog Waste?",
      date: "September 28, 2023",
      author: "Keala Pelekai",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=2574",
      content: `
        <p class="mb-4">For dog owners, maintaining a clean yard is an ongoing responsibility. But how often should you actually be cleaning up dog waste? The answer depends on several factors, including the number of dogs you have, their size, your yard size, and local climate conditions. Here in Hawaiian Paradise Park, our unique climate adds another consideration.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Single Dog Households</h3>
        <p class="mb-4">If you have one small to medium-sized dog, cleaning your yard once per week is generally sufficient. For larger breeds that produce more waste, twice-weekly cleanup might be more appropriate. Weekly service is our most popular option for single-dog homes.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Multiple Dog Households</h3>
        <p class="mb-4">With two or more dogs, the waste accumulates much faster. For two medium-sized dogs, we recommend twice-weekly cleaning. For three or more dogs, you might want to consider service every other day, especially if your yard is on the smaller side.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Yard Size Considerations</h3>
        <p class="mb-4">The size of your yard also affects how quickly waste becomes a problem. Smaller yards tend to need more frequent cleaning since there's less space for distribution. For large properties, weekly service might be adequate even with multiple dogs.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Hawaii's Unique Climate Factors</h3>
        <p class="mb-4">Our tropical climate in Hawaiian Paradise Park presents unique challenges. The warm, humid conditions can accelerate decomposition, which increases odor and attracts insects. Additionally, our frequent rain can wash untreated waste into groundwater. For these reasons, regular cleaning is even more important in our area.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Health and Comfort Factors</h3>
        <p class="mb-4">Beyond the practical considerations, there are health and comfort factors to consider. Dog waste can take up to a year to naturally decompose and can transmit parasites and bacteria in the meantime. More frequent cleanup reduces health risks and makes your yard more enjoyable for both humans and pets.</p>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Our Recommendation</h3>
        <p class="mb-4">Based on our experience serving hundreds of homes in Hawaiian Paradise Park and surrounding Puna communities, we recommend:</p>
        <ul class="list-disc ml-6 mb-4 space-y-2">
          <li>For 1 dog: Weekly service</li>
          <li>For 2 dogs: Weekly service</li>
          <li>For 3+ dogs: Weekly service with the option to upgrade to twice weekly</li>
          <li>For special events or company: One-time additional cleanup</li>
        </ul>
        
        <h3 class="text-2xl font-bold mt-8 mb-4">Conclusion</h3>
        <p class="mb-4">The right frequency for waste removal depends on your specific situation. At Aloha Poop Scoop, we offer flexible scheduling options to meet the needs of any household. We're happy to discuss your particular circumstances and recommend the ideal service frequency for your home.</p>
        
        <p class="mb-4">Want to enjoy a consistently clean yard without the hassle? Contact us today to set up your regular service!</p>
      `
    }
  };
  
  const post = blogPosts[id as keyof typeof blogPosts];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!post) {
    return (
      <div>
        <Navigation />
        <div className="pt-32 pb-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Navigation />
      
      <div className="pt-24 pb-12 bg-lava text-white">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-gray-300 hover:text-white mb-4">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Posts
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-gray-300">{post.date}</span>
            <span className="text-gray-300">By {post.author}</span>
            <span className="bg-ember text-white px-3 py-1 rounded-full text-sm">{post.category}</span>
          </div>
        </div>
      </div>
      
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Share This Post</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700">
                  <span className="sr-only">Share on WhatsApp</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M21.943 11.672c0 5.209-4.247 9.434-9.475 9.434a9.5 9.5 0 01-4.514-1.142L2 22l2.101-6.163a9.365 9.365 0 01-1.258-4.684c0-5.208 4.247-9.433 9.475-9.433 5.228 0 9.625 4.225 9.625 9.433zm-9.475-7.877c-4.371 0-7.929 3.54-7.929 7.877 0 1.724.557 3.327 1.5 4.627l-.978 2.874 2.979-.942a7.962 7.962 0 004.427 1.318c4.372 0 7.93-3.54 7.93-7.877 0-4.337-3.558-7.877-7.929-7.877zm4.732 9.999a.894.894 0 00-.571-.308.912.912 0 00-.661.165c-.514.308-1.158.659-1.715.56-.618-.109-2.342-1.02-3.137-2.801-.211-.473-.214-1.155-.211-1.302.3-.147.388-.278.571-.43.183-.15.387-.414.365-.634-.21-.22-.85-2.01-.993-2.24-.143-.23-.307-.252-.571-.26a1.69 1.69 0 00-.427.024c-.3.054-.572.123-.824.359-.244.228-.93.907-.93 2.214 0 1.308.955 2.589 1.084 2.767.13.18 1.894 3.024 4.667 4.109.665.297 1.186.475 1.577.606.664.214 1.267.184 1.745.112.575-.081 1.77-.76 2.019-1.495.248-.735.248-1.365.173-1.496-.072-.128-.265-.2-.571-.347z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800">
                  <span className="sr-only">Share via Email</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/blog/3" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80&w=2574"
                      alt="Blog post" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2 group-hover:text-ember transition-colors">
                      The Environmental Impact of Proper Pet Waste Disposal
                    </h4>
                    <span className="text-ember font-medium flex items-center">
                      Read More 
                      <svg className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              <Link to="/blog/4" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2574"
                      alt="Blog post" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2 group-hover:text-ember transition-colors">
                      Pet Waste and Health: Protecting Your Family
                    </h4>
                    <span className="text-ember font-medium flex items-center">
                      Read More 
                      <svg className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link to="/blog" className="btn-primary">
                View All Posts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
