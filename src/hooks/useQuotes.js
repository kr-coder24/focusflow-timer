import { useState, useEffect } from 'react';

const FALLBACK_QUOTES = [
  { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { quote: "You learn more from failure than from success.", author: "Unknown" },
  { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { quote: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" }
];

export const useQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(FALLBACK_QUOTES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
        headers: {
          'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setCurrentQuote({
            quote: data[0].quote,
            author: data[0].author
          });
        } else {
          // Use random fallback quote
          const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
          setCurrentQuote(randomQuote);
        }
      } else {
        // Use random fallback quote
        const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        setCurrentQuote(randomQuote);
      }
    } catch (error) {
      console.log('Failed to fetch quote, using fallback');
      // Use random fallback quote
      const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setCurrentQuote(randomQuote);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial quote on mount
  useEffect(() => {
    fetchNewQuote();
  }, []);

  return {
    currentQuote,
    isLoading,
    fetchNewQuote
  };
};