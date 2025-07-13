"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Globe, Github, Linkedin } from "react-bootstrap-icons";

export default function HomePage() {
  // 'topic' will hold the string from the input box.
  const [topic, setTopic] = useState("");
  // 'loading' will be true when we are waiting for the API response.
  const [loading, setLoading] = useState(false);
  // 'ideas' will store the AI-generated text.
  const [ideas, setIdeas] = useState("");
  // 'error' will store any error messages.
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center py-12">
        <div className="w-full max-w-2xl px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            AI-Powered Idea Generator
          </h1>

          <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., 'podcast series')"
              className="flex-grow p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Ideas"}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {ideas && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                Generated Ideas:
              </h2>
              <ReactMarkdown
                components={{
                  ol: ({ ...props }) => (
                    <ol className="list-none space-y-5" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                      <div className="flex-1">{props.children}</div>
                    </li>
                  ),
                  strong: ({ ...props }) => (
                    <strong
                      className="text-lg font-semibold text-gray-900 block mb-1"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-gray-700 leading-relaxed" {...props} />
                  ),
                }}
              >
                {ideas}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full text-center p-6 bg-white border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6">
          <a
            href="https://jaymandaviyadev.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
            title="Personal Website"
          >
            <Globe size={24} />
          </a>
          <a
            href="https://github.com/JayMandaviyaDev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
            title="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/jaymandaviya/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
