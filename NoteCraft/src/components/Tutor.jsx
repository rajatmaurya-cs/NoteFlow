import { useState, useContext, useMemo } from "react";
import { ToggleTheme } from "./AuthProvider";

import MOCK_TUTORS from "../data/tutors.json";

const Tutor = () => {
  const { Theme } = useContext(ToggleTheme);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutor, setSelectedTutor] = useState(null);

  const filteredTutors = useMemo(() => {
    return MOCK_TUTORS.filter(
      (tutor) =>
        tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const bgColor = Theme === "Light" ? "bg-white text-slate-800" : "bg-gray-900 text-white";
  const cardBg = Theme === "Light" ? "bg-slate-50 hover:bg-slate-100" : "bg-gray-800 hover:bg-gray-700";
  const inputBg = Theme === "Light" ? "bg-white border-slate-300 text-slate-800" : "bg-gray-800 border-gray-700 text-white";

  return (
    <div className={`min-h-screen pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bgColor}`}>
      <div className="max-w-7xl mx-auto">
        {!selectedTutor ? (
          <>
            <div className="text-center mb-12 mt-30">
              <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Find Your Perfect Tutor
              </h1>
              <p className={`text-lg ${Theme === "Light" ? "text-slate-600" : "text-gray-400"}`}>
                Search by subject or name to find the best expert for your doubts.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a subject (e.g., Physics, Math)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-6 py-4 rounded-full border-2 focus:outline-none focus:border-indigo-500 shadow-sm text-lg transition-colors ${inputBg}`}
                />
                <span className="absolute right-6 top-4 text-2xl">
                  🔍
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    onClick={() => setSelectedTutor(tutor)}
                    className={`rounded-2xl p-6 cursor-pointer shadow-md transition-all duration-300 transform hover:-translate-y-1 ${cardBg}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full mb-4 bg-indigo-100 border-4 border-indigo-50"
                      />
                      <h3 className="text-xl font-bold mb-1">{tutor.name}</h3>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-3">
                        {tutor.subject}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        ⭐ {tutor.rating}
                      </div>
                      <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors w-full font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className={`text-xl ${Theme === "Light" ? "text-slate-500" : "text-gray-500"}`}>
                    No tutors found matching your search.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto mt-8">
            <button
              onClick={() => setSelectedTutor(null)}
              className={`mb-6 px-4 py-2 flex items-center gap-2 rounded-xl transition-colors ${
                Theme === "Light" ? "bg-slate-200 hover:bg-slate-300 text-slate-800" : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              ← Back to Search
            </button>
            <div className={`rounded-3xl p-8 shadow-2xl ${cardBg}`}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={selectedTutor.avatar}
                  alt={selectedTutor.name}
                  className="w-48 h-48 rounded-full bg-indigo-100 border-8 border-indigo-50 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl font-extrabold mb-2">{selectedTutor.name}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-lg font-semibold">
                      {selectedTutor.subject}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                      ⭐ {selectedTutor.rating} Rating
                    </span>
                  </div>
                  <div className={`p-6 rounded-2xl mb-6 ${Theme === "Light" ? "bg-white" : "bg-gray-900"}`}>
                    <h3 className="text-xl font-bold mb-3 border-b pb-2 border-indigo-100 dark:border-gray-700">Professional Background</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="block text-sm text-gray-500 font-semibold mb-1">Experience</span>
                        <span className={`font-medium text-lg ${Theme === "Light" ? "text-slate-800" : "text-gray-200"}`}>
                          💼 {selectedTutor.experience}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 font-semibold mb-1">Education</span>
                        <span className={`font-medium text-lg ${Theme === "Light" ? "text-slate-800" : "text-gray-200"}`}>
                          🎓 {selectedTutor.degree}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <span className="block text-sm text-gray-500 font-semibold mb-2">Core Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedTutor.coreSubjects.map((sub, index) => (
                          <span key={index} className={`px-3 py-1 rounded-lg text-sm font-medium ${Theme === "Light" ? "bg-indigo-50 text-indigo-700" : "bg-indigo-900/40 text-indigo-300"}`}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 border-b pb-2 mt-6 border-indigo-100 dark:border-gray-700">About the Tutor</h3>
                    <p className={`leading-relaxed text-lg ${Theme === "Light" ? "text-slate-700" : "text-gray-300"}`}>
                      {selectedTutor.bio}
                    </p>
                  </div>

                  {/* Contact Box */}
                  <div className={`p-6 rounded-2xl mb-6 border-2 border-dashed ${Theme === "Light" ? "bg-indigo-50/50 border-indigo-200" : "bg-indigo-900/10 border-indigo-800/50"}`}>
                    <h3 className="text-xl font-bold mb-4 text-center">Contact Information</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a 
                        href="mailto:rajatmaurya176@gmail.com" 
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-lg flex-1 shadow-sm ${Theme === "Light" ? "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200" : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"}`}
                      >
                        ✉️ rajatmaurya176@gmail.com
                      </a>
                      <a 
                        href="https://wa.me/916350624971" 
                        target="_blank" 
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-lg flex-1 shadow-sm ${Theme === "Light" ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" : "bg-green-900/20 text-green-400 hover:bg-green-900/40 border border-green-900/50"}`}
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Removed old buttons */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutor;
