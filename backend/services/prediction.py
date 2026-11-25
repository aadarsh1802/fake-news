"""Load the trained model and make fake-news predictions."""



import re
import pickle
import nltk

from pathlib import Path
from functools import lru_cache
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

MODEL_PATH = MODEL_DIR / "model.pkl"
VECTOR_PATH = MODEL_DIR / "vector.pkl"


# Download NLTK resources
def download_nltk_resources():
    resources = [
        "punkt",
        "punkt_tab",
        "stopwords",
        "wordnet",
        "omw-1.4"
    ]

    for resource in resources:
        nltk.download(resource, quiet=True)


download_nltk_resources()


# Load model and vectorizer once
@lru_cache(maxsize=1)
def load_artifacts():

    if not MODEL_PATH.exists():
        raise FileNotFoundError("model.pkl not found")

    if not VECTOR_PATH.exists():
        raise FileNotFoundError("vector.pkl not found")

    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)

    with open(VECTOR_PATH, "rb") as file:
        vectorizer = pickle.load(file)

    return model, vectorizer


# NLP objects
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))


# Text preprocessing
def preprocess_text(news):

    review = news

    # Remove special characters and numbers
    review = re.sub(r"[^a-zA-Z\s]", "", review)

    # Convert to lowercase
    review = review.lower()

    # Tokenization
    review = nltk.word_tokenize(review)

    corpus = []

    # Stopword removal and lemmatization
    for word in review:

        if word not in stop_words:
            corpus.append(lemmatizer.lemmatize(word))

    return " ".join(corpus)


# Prediction function
def predict_news(news):

    model, vectorizer = load_artifacts()

    # Preprocessing
    cleaned_news = preprocess_text(news)

    if not cleaned_news.strip():
        raise ValueError("News text contains no meaningful words.")

    # TF-IDF transformation
    vectorized_data = vectorizer.transform([cleaned_news])

    # Prediction
    prediction = model.predict(vectorized_data)[0]

    # Your notebook uses 1 = Fake and 0 = Real
    if prediction == 1:
        result = "Fake"
        message = "This news is classified as potentially fake."
    else:
        result = "Real"
        message = "This news is classified as potentially real."

    return {
        "prediction": result,
        "label": int(prediction),
        "message": message
    }
