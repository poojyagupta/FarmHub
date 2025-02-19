import React from 'react';
// Import motion for animations from framer-motion
import { motion } from 'framer-motion';

// ServiceCard component that displays a service with an icon, title, and description
export const ServiceCard = ({ title, description, icon: Icon, delay = 0, image }) => {
  return (
    // Animate the card when it comes into view
    <motion.div
      // Start invisible and slightly down
      initial={{ opacity: 0, y: 20 }}
      // Animate to visible and original position
      whileInView={{ opacity: 1, y: 0 }}
      // Add delay based on card position
      transition={{ duration: 0.5, delay }}
      // Only animate once when the card comes into view
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Background image with conditional rendering */}
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-10 transition-opacity duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      
      {/* Gradient overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card content */}
      <div className="relative p-6">
        {/* Icon container with hover animation */}
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        
        {/* Service title and description */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* Learn more link with hover animation */}
        <motion.div
          className="mt-4 inline-flex items-center text-green-600 font-medium"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Learn more
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};