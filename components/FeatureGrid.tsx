import React from 'react'
import features from '@/data/features'
const FeatureGrid = () => {
  return (
    <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="w-full max-w-sm p-5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from bg-purple-500 to-pink-600 rounded-md flex items-center justify-center mb-5">
            <span className="text-2xl">{feature.icon}</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 ">
            {feature.title}
          </h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureGrid