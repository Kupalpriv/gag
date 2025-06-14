import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <Loader2 className="h-12 w-12 text-green-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading Stock Data</h2>
          <p className="text-gray-400">Fetching the latest information...</p>
        </div>
      </div>
    </div>
  );
};