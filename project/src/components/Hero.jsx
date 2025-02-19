import React from 'react';
import { motion } from 'framer-motion';
import { Plane as Plant, Droplet, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Plant className="w-6 h-6 text-green-600" />, label: t('hero.features.smartFarming') },
    { icon: <Droplet className="w-6 h-6 text-blue-600" />, label: t('hero.features.resourceOptimization') },
    { icon: <Sun className="w-6 h-6 text-yellow-600" />, label: t('hero.features.sustainableGrowth') }
  ];

  return (
    <div className="relative h-[calc(100vh*9/16)] min-h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)'
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-white/80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="relative z-20 h-full">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-full md:w-2/3">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('hero.title')} <br />
              <span className="text-green-600">{t('hero.subtitle')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button 
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plant className="w-5 h-5" />
                <span>{t('hero.getStarted')}</span>
              </motion.button>
              <motion.button 
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-md hover:bg-green-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.learnMore')}
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="mt-12 grid grid-cols-3 gap-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {features.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="bg-white/80 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.icon}
                  </motion.div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};