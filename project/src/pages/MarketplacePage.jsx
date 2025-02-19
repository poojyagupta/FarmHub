import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Truck, Package, BarChart3, Leaf, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { Cart } from '../components/Cart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function buttonClicked() {
    addToCart(product);
    console.log('Added to cart!');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide the popup after 2 seconds
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-green-600 font-medium">{product.category}</span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
        
        {showInfo && (
          <div className="mb-4 text-sm text-gray-600">
            <p className="mb-2">{product.description}</p>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
          )}
        </div>
        
        <button
          onClick={buttonClicked}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>

      {showPopup && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 mt-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
          <p>{product.title} has been added to your cart.</p>
        </div>
      )}
    </motion.div>
  );
};

const MarketStats = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const MarketplacePage = () => {
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      title: "Organic Fertilizer",
      price: "1,200",
      originalPrice: "1,500",
      category: "Fertilizers",
      description: "Premium quality organic fertilizer suitable for all crop types.",
      features: [
        "100% organic ingredients",
        "Improves soil fertility",
        "Eco-friendly packaging",
        "6-month shelf life"
      ],
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 2,
      title: "Premium Seeds Pack",
      price: "450",
      category: "Seeds",
      description: "High-quality seeds with excellent germination rate.",
      features: [
        "High germination rate",
        "Disease resistant varieties",
        "Suitable for all seasons",
        "Lab tested quality"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr5T8mHgARai3HTJjy0xOVSLXWu6k8EiqjVQ&s"
    },
    {
      id: 3,
      title: "Farming Tools Set",
      price: "2,500",
      originalPrice: "3,000",
      category: "Equipment",
      description: "Complete set of essential farming tools.",
      features: [
        "Durable steel construction",
        "Ergonomic handles",
        "Rust-resistant coating",
        "Includes storage case"
      ],
      image: "https://5.imimg.com/data5/SELLER/Default/2023/2/YL/SX/NS/81115096/festel-fiberglass-hoe-handle-500x500.jpg"
    },
    {
      id: 4,
      title: "Pesticide Sprayer",
      price: "3,200",
      category: "Equipment",
      description: "Professional-grade pesticide sprayer with adjustable nozzle.",
      features: [
        "Large capacity tank",
        "Adjustable spray patterns",
        "Comfortable straps",
        "Battery-powered operation"
      ],
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcThdEP8nACkmmm2tQUlFhD4-ZTWxx05drTU7eX22fZn49zf6nNjNA7vYpvBCnac9eHnwhgqtk-MUzBElxusckXJl0qVkucPBPP5MNsAHcBhnIO95t4oStXZ&usqp=CAE"
    },
    {
      id: 5,
      title: "Bio Pesticides",
      price: "800",
      originalPrice: "1,000",
      category: "Pesticides",
      description: "Natural pest control solution safe for organic farming.",
      features: [
        "100% natural ingredients",
        "Safe for beneficial insects",
        "No harmful residues",
        "Long-lasting effectiveness"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3zTlHFGaUplQR47YjpVzn-g9qIo274EHhg&s"
    },
    {
      id: 6,
      title: "Soil Testing Kit",
      price: "1,500",
      category: "Equipment",
      description: "Professional soil testing kit for nutrient analysis.",
      features: [
        "Tests multiple parameters",
        "Easy to use",
        "Quick results",
        "Includes guide book"
      ],
      image: "https://cdn.moglix.com/p/6pDXrNRjCzg0J-xxlarge.jpg"
    }
  ];

  const marketStats = [
    { icon: ShoppingBag, label: "Active Listings", value: "5,234" },
    { icon: Truck, label: "Vendors", value: "328" },
    { icon: Package, label: "Orders Today", value: "1,423" },
    { icon: BarChart3, label: "Market Growth", value: "+15.7%" }
  ];

  return (
    <div className="pt-16">
      <Cart />
      <div className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('marketplace.exploreProducts.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-100"
          >
            Your one-stop shop for all farming needs
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketStats.map((stat, index) => (
            <MarketStats key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;