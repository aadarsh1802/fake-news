import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Info
} from "lucide-react";

function ResultCard({ result }) {

  if (!result) return null;

  const isFake = result.prediction === "Fake";

  return (
    <section
      className={`result-card ${
        isFake ? "fake" : "real"
      }`}
    >

      <div className="result-icon">

        {isFake ? (
          <AlertTriangle size={38} />
        ) : (
          <ShieldCheck size={38} />
        )}

      </div>

      <div className="result-content">

        <span className="result-label">
          ANALYSIS RESULT
        </span>

        <h2>
          {isFake
            ? "Potentially Fake News"
            : "Classified as Real News"}
        </h2>

        <p>{result.message}</p>

        <div className="result-badge">
          {result.prediction.toUpperCase()}
        </div>

        <div className="result-disclaimer">
          <Info size={17} />
          <span>
            This is an automated machine learning
            classification, not independent fact verification.
          </span>
        </div>

      </div>

    </section>
  );
}

export default ResultCard;
