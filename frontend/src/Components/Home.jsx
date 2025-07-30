import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Server Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate production-ready server code with just a few clicks. Save
            hours of boilerplate coding and focus on what matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Quick Setup"
            description="Set up your server structure in minutes instead of hours"
            icon="⚡"
          />
          <FeatureCard
            title="Customizable"
            description="Choose your folder structure and file organization"
            icon="🔧"
          />
          <FeatureCard
            title="Best Practices"
            description="Generated code follows industry standards and best practices"
            icon="✨"
          />
        </div>

        <div className="text-center">
          <Link
            to="/generate"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300"
          >
            Start Generating →
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Home;
