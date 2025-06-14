import React from 'react';
import { Facebook, Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">Churchill</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Full Stack Developer</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by Churchill</span>
            </span>
            
            <a
              href="https://www.facebook.com/Churchill.Dev4100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Facebook className="h-4 w-4" />
              <span>Connect</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Churchill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
