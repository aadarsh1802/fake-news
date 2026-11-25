
import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import NewsInput from "./components/NewsInput";
import ResultCard from "./components/ResultCard";

import {
  ShieldCheck,
  Search,
  BrainCircuit,
  Activity
} from "lucide-react";

import "./App.css";


const API_URL = "http://127.0.0.1:8000";


function App() {

  const [news, setNews] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Call FastAPI backend
  const analyzeNews = async () => {

    if (news.trim().length < 20) {

      setError(
        "Please enter at least 20 characters of news."
      );

      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {

      const response = await fetch(
        `${API_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            news: news
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Prediction failed"
        );
      }

      if (!data.success || !data.data) {
        throw new Error("Invalid response from server");
      }

      setResult(data.data);

    } catch (error) {

      setError(
        error.message ||
        "Unable to connect to backend."
      );

    } finally {

      setLoading(false);

    }
  };


  // Reset application
  const resetApplication = () => {

    setNews("");
    setResult(null);
    setError("");

  };


  return (

    <div className="app">

      <Navbar />

      <main className="container">

        {/* Hero Section */}

        <section className="hero">

          <div className="hero-tag">
            <Activity size={15} />
            AI POWERED NEWS ANALYSIS
          </div>

          <h1>
            Discover the Truth
            <span> Behind Every Story.</span>
          </h1>

          <p>
            Analyze news articles using machine learning
            and identify potentially misleading information.
          </p>

        </section>


        {/* News Input */}

        <NewsInput
          news={news}
          setNews={setNews}
          onAnalyze={analyzeNews}
          loading={loading}
          onReset={resetApplication}
        />


        {/* Error Message */}

        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        {/* Prediction Result */}

        <ResultCard result={result} />


        {/* Features */}

        <section className="features">

          <div className="feature-card">

            <BrainCircuit size={28} />

            <h3>Machine Learning</h3>

            <p>
              Passive Aggressive Classifier
            </p>

          </div>


          <div className="feature-card">

            <Search size={28} />

            <h3>NLP Processing</h3>

            <p>
              TF-IDF and text preprocessing
            </p>

          </div>


          <div className="feature-card">

            <ShieldCheck size={28} />

            <h3>News Classification</h3>

            <p>
              Real and Fake news prediction
            </p>

          </div>

        </section>

      </main>


      <footer>

        <p>
          TruthLens AI | Fake News Detection System
        </p>

        <span>
          Powered by Machine Learning and NLP
        </span>

      </footer>

    </div>

  );

}

export default App;
