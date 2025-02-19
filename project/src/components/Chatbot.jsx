import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const suggestions = [
    t('chatbot.suggestions.crops'),
    t('chatbot.suggestions.soil'),
    t('chatbot.suggestions.equipment'),
    t('chatbot.suggestions.veterinary'),
    t('chatbot.suggestions.weather')
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');
      // Simulate bot response
      setTimeout(() => {
        const responses = [
          t('chatbot.responses.default1'),
          t('chatbot.responses.default2'),
          t('chatbot.responses.default3')
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Clear messages when closing
    setMessages([]);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
        ref={chatbotRef}
      >
        <motion.button
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1
              }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`fixed ${
                isMobile 
                  ? 'inset-4' 
                  : 'bottom-24 right-6 w-96'
              } bg-white rounded-lg shadow-xl overflow-hidden`}
              style={{
                maxHeight: isMobile ? 'calc(100vh - 2rem)' : '500px'
              }}
            >
              <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                <h3 className="text-lg font-semibold">{t('chatbot.title')}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleMinimize}
                    className="text-white hover:text-gray-200 transition-colors duration-200 p-1"
                    title={isMinimized ? "Expand" : "Minimize"}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-white hover:text-gray-200 transition-colors duration-200 p-1"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {!isMinimized && (
                <>
                  <div className="h-[350px] overflow-y-auto p-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm text-gray-800">{t('chatbot.welcome')}</p>
                        </div>
                      </div>
                      {messages.map((message, index) => (
                        <div key={index} className={`flex items-start ${message.type === 'user' ? 'justify-end' : ''}`}>
                          <div className={`rounded-lg p-3 max-w-[80%] ${
                            message.type === 'user' ? 'bg-green-600 text-white' : 'bg-green-100 text-gray-800'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {messages.length === 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">{t('chatbot.suggestionsTitle')}</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors duration-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chatbot.inputPlaceholder')}
                        className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={handleSend}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        {!isMobile && <span>{t('chatbot.send')}</span>}
                        
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};