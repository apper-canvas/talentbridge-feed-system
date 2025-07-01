import React from 'react';

const Loading = ({ type = 'default' }) => {
  if (type === 'jobs') {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg shimmer-loading"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2 shimmer-loading"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 shimmer-loading"></div>
                </div>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded shimmer-loading"></div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="h-4 bg-gray-200 rounded w-40 shimmer-loading"></div>
              <div className="h-4 bg-gray-200 rounded w-36 shimmer-loading"></div>
              <div className="h-4 bg-gray-200 rounded w-44 shimmer-loading"></div>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-20 shimmer-loading"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24 shimmer-loading"></div>
            </div>
            
            <div className="h-4 bg-gray-200 rounded w-full mb-2 shimmer-loading"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 shimmer-loading"></div>
            
            <div className="flex space-x-3">
              <div className="h-10 bg-gray-200 rounded flex-1 shimmer-loading"></div>
              <div className="h-10 bg-gray-200 rounded w-32 shimmer-loading"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === 'companies') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl shimmer-loading"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2 shimmer-loading"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 shimmer-loading"></div>
                <div className="h-4 bg-gray-200 rounded w-28 shimmer-loading"></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full shimmer-loading"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 shimmer-loading"></div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 bg-gray-200 rounded w-32 shimmer-loading"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20 shimmer-loading"></div>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-16 shimmer-loading"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20 shimmer-loading"></div>
            </div>
            
            <div className="h-10 bg-gray-200 rounded shimmer-loading"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // Default loading
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;