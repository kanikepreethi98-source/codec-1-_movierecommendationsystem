# 🎬 Movie Recommendation System

A modern and interactive Movie Recommendation System built using HTML, CSS, and JavaScript. The application recommends movies based on user preferences using Content-Based Filtering and Collaborative Filtering techniques.

---

## 📖 Overview

Finding the perfect movie to watch can be overwhelming with thousands of options available today. This project solves that problem by providing personalized movie recommendations based on genres, ratings, and user behavior.

The system analyzes user interests and suggests movies that match their taste. It demonstrates the core concepts behind recommendation engines used by platforms like Netflix, Amazon Prime Video, and Disney+.

---

## ✨ Features

### 🎭 Personalized Recommendations
Get movie suggestions based on your preferences and ratings.

### ⭐ Movie Rating System
Rate movies and receive smarter recommendations.

### 🔍 Search Functionality
Quickly search movies by title.

### 🎬 Detailed Movie Information
View:
- Movie Title
- Release Year
- Genres
- Description
- Director
- Cast
- Duration

### 🤝 Collaborative Filtering
Recommends movies liked by users with similar tastes.

### 🎯 Content-Based Filtering
Suggests movies with similar genres and characteristics.

### 📱 Responsive Design
Works smoothly on:
- Desktop
- Tablet
- Mobile Devices

### 🎨 Attractive User Interface
Modern movie cards, gradients, icons, and smooth interactions.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Recommendation Techniques
- Content-Based Filtering
- Collaborative Filtering
- Similarity Matching

### Dataset
Custom dataset containing:
- 24 Popular Movies
- Multiple Genres
- User Ratings
- Metadata

---

## 📂 Project Structure

```text
movie-recommendation-system/
│
├── index.html
├── style.css
├── app.js
├── dataset.js
├── README.md
│
└── assets/
    ├── images/
    └── icons/
```

---

## 📊 Dataset Information

The project includes a curated movie dataset featuring popular films across various genres.

### Genres Covered

- Action
- Adventure
- Animation
- Comedy
- Crime
- Drama
- Fantasy
- Horror
- Mystery
- Romance
- Sci-Fi
- Thriller

### Sample Movies

- Inception
- Interstellar
- The Matrix
- Blade Runner 2049
- The Dark Knight
- Mad Max: Fury Road
- Parasite
- Forrest Gump
- The Godfather
- Pulp Fiction
- Spirited Away
- Whiplash
- Knives Out
- Spider-Man: Into the Spider-Verse

---

## ⚙️ Recommendation System Logic

### 1️⃣ Content-Based Filtering

The system recommends movies similar to those the user likes.

#### Example

If a user likes:

- Inception
- Interstellar

The system identifies common genres:

- Sci-Fi
- Adventure
- Action

Recommended movies:

- The Matrix
- Blade Runner 2049
- Mad Max: Fury Road

---

### 2️⃣ Collaborative Filtering

The system compares ratings from different users.

#### Process

1. Collect user ratings
2. Calculate user similarity
3. Identify users with similar preferences
4. Recommend highly-rated unseen movies

#### Example

User A likes:

- Inception
- Interstellar

Similar User B likes:

- The Matrix
- The Dark Knight

Recommended:

- The Matrix
- The Dark Knight

---

## 🧮 Recommendation Workflow

```text
User Rates Movies
        │
        ▼
Preference Analysis
        │
        ▼
Similarity Calculation
        │
        ▼
Recommendation Engine
        │
        ▼
Personalized Suggestions
```

---

## 🚀 Installation & Setup

### Method 1: Run Locally

#### Step 1

Clone the repository

```bash
git clone https://github.com/yourusername/movie-recommendation-system.git
```

#### Step 2

Navigate to project folder

```bash
cd movie-recommendation-system
```

#### Step 3

Open `index.html` in your browser.

---

### Method 2: VS Code Live Server

1. Install VS Code
2. Install Live Server Extension
3. Open project folder
4. Right-click `index.html`
5. Select **Open with Live Server**

Application will run at:

```text
http://127.0.0.1:5500
```

---

## 🌐 Deployment

### Deploy on GitHub Pages

1. Create a GitHub repository
2. Push project files

```bash
git init
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin https://github.com/yourusername/movie-recommendation-system.git
git push -u origin main
```

3. Open GitHub Repository
4. Go to Settings → Pages
5. Select:

```text
Source: Deploy from branch
Branch: main
Folder: /root
```

6. Save

Your project will be available at:

```text
https://yourusername.github.io/movie-recommendation-system/
```

---

## 📸 Screenshots

### Home Page

Displays all available movies with attractive cards.

### Recommendation Section

Shows personalized movie suggestions.

### Search Feature

Allows instant movie lookup.

---

## 🔍 Algorithm Details

### Similarity Calculation

The recommendation engine calculates similarity using:

#### Genre Matching

```text
Similarity Score =
Common Genres / Total Genres
```

#### User Rating Correlation

```text
Users with similar ratings
→ Similar preferences
→ Better recommendations
```

---

## 🎯 Use Cases

- Movie Discovery Platform
- Learning Recommendation Systems
- Academic Mini Project
- Internship Project
- Portfolio Project
- Web Development Practice

---

## 📈 Future Improvements

### Machine Learning Integration

Implement:

- KNN Recommender
- Matrix Factorization
- Neural Collaborative Filtering

### API Integration

Connect with:

- TMDB API
- OMDB API

### Additional Features

- User Login
- Watchlist
- Favorite Movies
- Movie Reviews
- Trending Section
- Dark Mode
- Movie Trailers
- Recommendation Explanations

---

## 🧪 Testing

Tested on:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Responsive on:

- Desktop
- Tablet
- Mobile

---

## 📚 Concepts Learned

This project demonstrates:

- Recommendation Systems
- Collaborative Filtering
- Content-Based Filtering
- JavaScript Programming
- Data Structures
- Frontend Development
- User Experience Design

---

## 👨‍💻 Author

**Preethi**

AI Intern Project

---

## 📜 License

This project is developed for educational and learning purposes.

Feel free to use, modify, and improve it.

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

### Built with ❤️ using HTML, CSS, and JavaScript
