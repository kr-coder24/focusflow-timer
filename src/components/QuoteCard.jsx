import React from 'react';
import { Quote, RefreshCw } from 'lucide-react';

const QuoteCard = ({ quote, onRefresh, isDark }) => {
  return (
    <div className={`${isDark ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-lg rounded-2xl p-6 shadow-xl border ${isDark ? 'border-gray-700/20' : 'border-white/20'}`}>
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full flex-shrink-0">
          <Quote className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <blockquote className={`${isDark ? 'text-gray-200' : 'text-gray-800'} text-lg font-medium leading-relaxed mb-2`}>
            "{quote.quote}"
          </blockquote>
          <cite className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>— {quote.author}</cite>
        </div>
        <button
          onClick={onRefresh}
          className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-full transition-all duration-200 transform hover:scale-110 flex-shrink-0`}
          title="Get new quote"
        >
          <RefreshCw size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;