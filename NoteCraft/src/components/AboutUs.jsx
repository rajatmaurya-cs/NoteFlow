import React from "react";
import Us from '../assets/README.png'
import Aihub from "./Animation/Aihub";
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] py-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
          AI NoteCraft
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-purple-300">
          Smart AI Productivity App for Students
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3 py-8 px-4">
        <Aihub/>
      </div>

      {/* Intro */}
      <div className="text-center px-6 max-w-5xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            🌟 What is NoteCraft?
          </h2>
          <p className="text-slate-300 leading-8 text-lg">
            <strong>AI Powered NoteCraft</strong> is a next-gen productivity
            suite built specifically for students — combining intelligent
            note-taking, an AI tutor, task scheduling, and progress analytics
            into one beautiful, distraction-free workspace.
          </p>
        </div>
      </div>

      {/* Features Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-14 max-w-7xl mx-auto">
        {[
          {
            title: "Smart Notes",
            desc: "Create, organize & search notes effortlessly",
            icon: "📝",
          },
          {
            title: "Multi-Model AI",
            desc: "Multiple AI models for every learning style",
            icon: "🤖",
          },
          {
            title: "Task Manager",
            desc: "Schedule, prioritize & track daily tasks",
            icon: "📅",
          },
          {
            title: "Progress Analytics",
            desc: "Beautiful charts to visualize your growth",
            icon: "📈",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center hover:scale-105 transition"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-purple-300">{item.title}</h3>
            <p className="text-slate-400 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
          👨‍💻 Team
        </h2>

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">
          <h3 className="text-2xl font-bold mb-4">🏆 Team Leader</h3>
          <p className="text-xl font-semibold">Rajat</p>
          <p className="text-slate-400">2400290120197</p>

          <h3 className="text-2xl font-bold mt-10 mb-6">🤝 Contributors</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Priyanshu Tewatiya", "2400290120194"],
              ["Puspendar Chauhan", "2400290120195"],
              ["Sahil Kumar", "2400290120215"],
            ].map(([name, id], i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl p-5 border border-slate-700"
              >
                <p className="font-semibold">{name}</p>
                <p className="text-slate-400 text-sm">{id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
  src={Us}
  alt="NoteCraft Development Team"
  className="w-[560px] rounded-2xl mx-auto mt-8 shadow-xl"
/>

      {/* Features Table */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
          ✨ Features
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            "📝 Smart Notes",
            "🤖 AI Tutor",
            "📥 Save AI Answers",
            "📅 Task Scheduler",
            "📈 Progress Tracker",
            "🌙 Premium Dark UI",
            "⚡ Focus Mode",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
          🛠️ Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "⚛️ React.js",
            "🎨 Tailwind CSS",
            "🌌 Modern Animations",
            "📊 Recharts",
            "🤖 Multi-Model AI",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
          🚀 Future Roadmap
        </h2>

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-4 text-lg">
          <p>🎤 Voice Notes — In Planning</p>
          <p>☁️ Cloud Sync — In Planning</p>
          <p>👥 Team Collaboration — Upcoming</p>
          <p>🧠 AI Summary Generator — Upcoming</p>
          <p>📱 Mobile App — Upcoming</p>
          <p>🌍 Multi-language — Future</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-14 px-4 border-t border-slate-800">
        <p className="text-xl font-semibold">
          ⭐ If NoteCraft helps your studies, give it a star!
        </p>
        <p className="mt-4 text-slate-400">
          Built with 💜 by Team NoteCraft
        </p>
      </div>
    </div>
  );
};

export default AboutUs;