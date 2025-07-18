"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import { Globe, Github, Linkedin, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ideas, setIdeas] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    setIdeas("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIdeas(data.ideas);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Idea Generator
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Powered by AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Transform Your Ideas Into
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creative Solutions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Enter any topic and let our AI generate innovative ideas, concepts, and creative solutions for you.
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 mb-8">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., 'podcast series', 'mobile app', 'business idea')"
                  className="w-full p-4 pr-12 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 text-sm sm:text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && topic.trim()) {
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Lightbulb className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <button
                onClick={(e) => topic.trim() && handleSubmit(e)}
                disabled={loading || !topic.trim()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Ideas</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Generated Ideas */}
          {ideas && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Generated Ideas
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    ol: (props) => (
                      <ol className="list-none space-y-4 sm:space-y-6" {...props} />
                    ),
                    li: (props) => (
                      <li className="group bg-gradient-to-r from-white to-gray-50 p-2 rounded-x">
                        <div className="flex items-start space-x-2">
                          <div className="flex-1 min-w-0 text-gray-800">
                            {props.children}
                          </div>
                        </div>
                      </li>
                    ),
                    strong: (props) => (
                      <strong className="text-lg sm:text-xl font-bold text-gray-900 block mb-2" {...props} />
                    ),
                    p: (props) => (
                      <p className="text-gray-800 leading-relaxed text-sm sm:text-base" {...props} />
                    ),
                  } as Components}
                >
                  {ideas}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-8 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm">
                Built with ❤️ by Jay Mandaviya
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://jaymandaviyadev.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                title="Personal Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/JayMandaviyaDev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-110"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jaymandaviya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}