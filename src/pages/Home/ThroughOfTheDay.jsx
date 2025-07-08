import React, { useEffect, useState } from "react";

const quotes = [
  "🖋️ The pen is mightier than the sword.",
  "📚 Journalism is what we need to make democracy work. — Walter Cronkite",
  "🧠 An investment in knowledge always pays the best interest. — Benjamin Franklin",
  "🕊️ Freedom of the press is not just important to democracy, it is democracy. — Walter Cronkite",
  "💡 The best way to predict the future is to create it. — Peter Drucker",
  "📰 If you don't read the newspaper, you're uninformed. — Mark Twain",
  "📢 Information is the currency of democracy. — Thomas Jefferson",
];

const ThoughtOfTheDay = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          🧠 Thought of the Day
        </h2>
        <p className="text-xl italic text-gray-700 transition-opacity duration-500 ease-in-out">
          {quotes[currentQuote]}
        </p>
      </div>
    </section>
  );
};

export default ThoughtOfTheDay;
