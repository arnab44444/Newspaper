import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PollSection = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch poll on mount
  useEffect(() => {
    axiosSecure
      .get("/poll")
      .then((res) => setPoll(res.data))
      .catch((err) => {
        console.error("Failed to load poll:", err);
      });
  }, [axiosSecure]);

  if (!poll) return <p className="text-center text-gray-500">Loading poll...</p>;

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.post("/poll/vote", {
        optionIndex: selectedOption,
        email,
      });

      // Update poll with new results
      setPoll((prev) => ({ ...prev, options: res.data.options }));
      setSelectedOption(null);
      setEmail("");
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You have already voted.");
      } else {
        alert("Vote failed. Try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">
        🗳️ {poll.question}
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 mb-4 focus:outline-cyan-400"
      />

      <ul>
        {poll.options.map((opt, idx) => {
          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);

          return (
            <li key={idx} className="mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="pollOption"
                  checked={selectedOption === idx}
                  onChange={() => setSelectedOption(idx)}
                  disabled={loading}
                />
                <span className="flex-1">{opt.option}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {opt.votes} votes ({percent}%)
                </span>
              </label>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-1">
                <div
                  className="bg-cyan-500 h-2 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleVote}
        disabled={loading}
        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Vote"}
      </button>
    </div>
  );
};

export default PollSection;
