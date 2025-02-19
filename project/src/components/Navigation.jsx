import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tractor, ShoppingCart, Users, Globe2, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import logo from '../components/logo.png'


export const Navigation = () => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const langMenuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { getCartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      label: t('navigation.services'),
      icon: <Tractor className="w-5 h-5" />,
      path: '/services'
    },
    {
      label: t('navigation.marketplace'),
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/marketplace'
    },
    {
      label: t('navigation.community'),
      icon: <Users className="w-5 h-5" />,
      path: '/community'
    },
    {
      label: t('navigation.diseasePredictor'),
      icon: <Stethoscope className="w-5 h-5" />,
      path: '/disease-predictor'
    }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' }
  ];

  const changeLanguage = (lng) => {
    if (lng === 'en' || lng === 'hi') {
      i18n.changeLanguage(lng);
    }
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-17">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <motion.div
                className="text-2xl font-bold text-green-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
               <img 
                  src={logo}
                  alt="Logo"
                  style={{ 
                    width: '80px', 
                    height: '70px', 
                    overflow:'hidden',
                  }} 
                />
              </motion.div>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:bg-green-50 rounded-full"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200">
              {t('navigation.signIn')}
            </button>
            
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
              >
                <Globe2 className="w-5 h-5" />
                {!isMobile && <span>{t('navigation.language')}</span>}
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}