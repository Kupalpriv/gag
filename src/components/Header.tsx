import React from 'react';
import { Sprout, Github, ExternalLink } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-lg p-2">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Grow A Garden</h1>
              <p className="text-emerald-100 text-sm">Stock Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white text-sm font-medium">Created by Churchill</p>
              <a 
                href="https://www.facebook.com/Churchill.Dev4100" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-200 hover:text-white text-xs flex items-center space-x-1 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Facebook Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}