
import React from "react";
import { Search, RotateCcw, FileText } from "lucide-react";

function NewsInput({
  news,
  setNews,
  onAnalyze,
  loading,
  onReset
}) {

  return (
    <section className="analyzer">

      <div className="section-heading">

        <div className="heading-icon">
          <FileText size={23} />
        </div>

        <div>
          <h2>News Analyzer</h2>
          <p>Paste your news article below</p>
        </div>

      </div>

      <textarea
        placeholder="Paste your complete news article here..."
        value={news}
        onChange={(e) => setNews(e.target.value)}
        maxLength={20000}
      />

      <div className="input-footer">

        <span>
          {news.length} / 20000 characters
        </span>

        <button
          className="reset-btn"
          onClick={onReset}
          type="button"
        >
          <RotateCcw size={15} />
          Reset
        </button>

      </div>

      <button
        className="analyze-btn"
        onClick={onAnalyze}
        disabled={loading}
      >

        {loading ? (
          "Analyzing News..."
        ) : (
          <>
            <Search size={19} />
            Analyze News
          </>
        )}

      </button>

    </section>
  );
}

export default NewsInput;
