import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Building2,
  Award,
  MessageSquare,
  Calendar,
  ChevronDown,
  FileText,
  Coins,
  Sprout
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BlogPost = ({ title, excerpt, author, date, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

const EventCard = ({ title, date, location, icon: Icon }) => {
  return (
    <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

const SchemeCard = ({ title, description, eligibility, benefits, deadline, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700"
            >
              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Application Deadline: {deadline}
                  </span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CommunityPage = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      title: "Sustainable Farming Practices",
      excerpt: "Learn about the latest sustainable farming techniques that can help improve your yield while protecting the environment.",
      author: "Dr. Rajesh Kumar",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Success Story: Organic Revolution",
      excerpt: "How a small farming community transformed their lives by switching to organic farming methods.",
      author: "Priya Singh",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Government Schemes Update",
      excerpt: "Latest updates on agricultural schemes and subsidies available for farmers in 2024.",
      author: "Amit Sharma",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const events = [
    {
      title: "Farmer's Workshop on Modern Techniques",
      date: "March 25, 2024",
      location: "Agricultural Center, Delhi",
      icon: Calendar
    },
    {
      title: "Community Meet & Greet",
      date: "March 28, 2024",
      location: "Community Hall, Mumbai",
      icon: Users
    },
    {
      title: "Agricultural Technology Expo",
      date: "April 5, 2024",
      location: "Exhibition Center, Bangalore",
      icon: Award
    }
  ];

  const schemes = [
    {
      title: "PM-KISAN Scheme",
      description: "Direct income support of ₹6,000 per year to eligible farmer families",
      icon: Coins,
      eligibility: [
        "Small and marginal farmers",
        "Land holding up to 2 hectares",
        "Valid bank account and Aadhaar card"
      ],
      benefits: [
        "₹6,000 annual financial benefit",
        "Direct bank transfer",
        "No middlemen involved"
      ],
      deadline: "Open throughout the year"
    },
    {
      title: "Soil Health Card Scheme",
      description: "Free soil testing and recommendations for farmers",
      icon: Sprout,
      eligibility: [
        "All farmers with agricultural land",
        "Must provide land details",
        "Valid identification proof"
      ],
      benefits: [
        "Free soil health assessment",
        "Customized crop recommendations",
        "Reduced input costs"
      ],
      deadline: "March 31, 2024"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Comprehensive crop insurance scheme",
      icon: FileText,
      eligibility: [
        "All farmers growing notified crops",
        "Both loanee and non-loanee farmers",
        "Must apply before crop season"
      ],
      benefits: [
        "Coverage against crop loss",
        "Minimal premium rates",
        "Quick claim settlement"
      ],
      deadline: "Varies by crop season"
    }
  ];

  return (
    <div className="pt-16">
      <div className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('community.blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-100"
          >
            Join our farming community and stay updated with the latest news and events
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Government Welfare Schemes</h2>
          <div className="grid grid-cols-1 gap-6">
            {schemes.map((scheme, index) => (
              <SchemeCard key={index} {...scheme} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;