import React from "react";

const Home: React.FC = () => {
  const applicationName = "Dream11"; // Replace with actual app name if different

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">🏏 Welcome to {applicationName} Fantasy Cricket! 🏆</h1>
      <p className="text-lg text-gray-300 mb-6">
        Play Fantasy Cricket on {applicationName} and win big!
      </p>

      {/* Introduction */}
      <div className="max-w-3xl text-center">
        <p className="text-gray-300 mb-6">
          Enter into the thrilling world of Fantasy sports, a strategy-based online sports game wherein you can create a virtual team of real players playing in real-life matches.
        </p>
        <p className="text-gray-300 mb-6">
          Create your team to win points based on all the players' performance in a live game.
        </p>
      </div>

      {/* Steps Section */}
      <div className="mt-10 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">🚀 How to Play?</h2>
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-blue-500">1️⃣</span>
            <div>
              <h3 className="text-xl font-semibold">Select A Match</h3>
              <p className="text-gray-400">Choose an upcoming match that you want to play.</p>
              <p className="text-gray-300">Example: Dream11 MI vs CSK Match.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-green-500">2️⃣</span>
            <div>
              <h3 className="text-xl font-semibold">Create Your Team</h3>
              <p className="text-gray-400">Use your skills to pick the right players.</p>
              <p className="text-gray-300">Example: Select MI & CSK players wisely.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-yellow-500">3️⃣</span>
            <div>
              <h3 className="text-xl font-semibold">Join Contests</h3>
              <p className="text-gray-400">Choose between different contests and compete.</p>
              <p className="text-gray-300">Example: Join paid or free contests for rewards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image / Animation Placeholder */}
      <div className="mt-10">
        <img
          src="https://png.pngtree.com/png-vector/20240614/ourlarge/pngtree-a-cricketer-hitting-the-ball-with-bat-cricket-png-image_12743416.png"
          alt="Fantasy Cricket"
          className="w-96 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
