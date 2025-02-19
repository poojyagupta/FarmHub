import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, MessageSquare, ChevronRight } from 'lucide-react';

const AnimalOption = ({ name, image, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="overflow-hidden rounded-xl transition-all duration-300 group-hover:shadow-2xl shadow-lg">
        <motion.div
          className="h-64 sm:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div 
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isHovered ? 0.3 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          animate={{
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-white mb-2"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
          >
            {name}
          </motion.h3>
          <motion.p
            className="text-white text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Click to analyze diseases for {name.toLowerCase()}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const UploadSection = ({ selectedFile, onFileChange }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileChange(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-8 mb-16"
    >
      <div 
        className={`text-center border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          isDragOver ? 'border-green-500 bg-green-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div
          animate={{ 
            scale: isDragOver ? 1.05 : 1,
            rotate: isDragOver ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Upload Disease Image</h2>
        <p className="text-gray-600 mb-8">
          Drag and drop your image here or click to browse
        </p>
        <label className="inline-block">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Choose Image</span>
          </motion.span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files[0])}
          />
        </label>
        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 flex items-center justify-center space-x-2 text-green-600"
            >
              <ChevronRight className="w-5 h-5" />
              <p>Selected: {selectedFile.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ExpertAdvice = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <MessageSquare className="w-8 h-8 text-green-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Need Expert Advice?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Connect with our veterinary experts for personalized consultation and treatment plans
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <MessageSquare className="w-6 h-6" />
            <span>Ask the Expert</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const DiseasePredictorPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const animals = [
    {
      name: "Cow",
      image: "https://st.depositphotos.com/1562606/3765/i/450/depositphotos_37650119-stock-photo-banteng-red-bull-in-rainforest.jpg"
    },
    {
      name: "Buffalo",
      image: "https://media.istockphoto.com/id/541861362/photo/indian-buffalo-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=wo3OtPTCmM2LXqBKSLiE8ek8U0NAYQIujciED3PAl7o="
    },
    {
      name: "Goat",
      image: "https://media.istockphoto.com/id/959042952/photo/black-bengal-goat-close-up-look-shot.jpg?s=612x612&w=0&k=20&c=oYuY7JFlnyMlM4AIUd5w_FYla8VsejTaZGOItPFxmQE="
    },
    {
      name: "Sheep",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyqyEtlWE5DhO-gsaEaIfIzUdv8zDZYWKmA&s"
    }
  ];

  return (
    <div className="pt-16">
      <motion.div 
        className="bg-green-600 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Disease Predictor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-100"
          >
            Identify livestock diseases quickly and accurately
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {animals.map((animal, index) => (
            <AnimalOption 
              key={animal.name} 
              {...animal} 
              index={index}
            />
          ))}
        </div>

        <UploadSection 
          selectedFile={selectedFile}
          onFileChange={setSelectedFile}
        />

        <ExpertAdvice />
      </div>
    </div>
  );
};

export default DiseasePredictorPage;