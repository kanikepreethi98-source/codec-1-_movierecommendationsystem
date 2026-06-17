// Application State and UI Controls

// State Variables
let userRatings = {}; // Key: movieId (number), Value: rating (number 1-5)
let currentMode = 'content'; // 'content' or 'collaborative'
let searchQuery = '';
let selectedGenre = null; // Filter catalog by genre

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Load initial data from localStorage if available
  const savedRatings = localStorage.getItem("cine_match_ratings");
  if (savedRatings) {
    try {
      userRatings = JSON.parse(savedRatings);
    } catch (e) {
      console.error("Error reading ratings from localStorage", e);
      userRatings = {};
    }
  }

  // Populate UI
  initializeGenreTags();
  renderCatalog();
  updateUI();
});

// Populate Sidebar with unique genres
function initializeGenreTags() {
  const container = document.getElementById("genre-filter-container");
  if (!container) return;

  // Extract all unique genres from MOVIES
  const genresSet = new Set();
  MOVIES.forEach(m => m.genres.forEach(g => genresSet.add(g)));
  const uniqueGenres = Array.from(genresSet).sort();

  container.innerHTML = uniqueGenres.map(genre => `
    <button class="genre-badge" id="genre-badge-${genre.replace(/\s+/g, '-')}" onclick="toggleGenreFilter('${genre}')">
      ${genre}
    </button>
  `).join('');
}

// Toggle Genre Filtering in the Catalog
function toggleGenreFilter(genre) {
  const badge = document.getElementById(`genre-badge-${genre.replace(/\s+/g, '-')}`);
  
  if (selectedGenre === genre) {
    selectedGenre = null;
    badge.classList.remove("active-pos");
  } else {
    // Reset previous active badge
    if (selectedGenre) {
      const prevBadge = document.getElementById(`genre-badge-${selectedGenre.replace(/\s+/g, '-')}`);
      if (prevBadge) prevBadge.classList.remove("active-pos");
    }
    selectedGenre = genre;
    badge.classList.add("active-pos");
  }

  renderCatalog();
  
  // Smooth scroll to catalog
  document.getElementById("catalog-grid").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle Search Input
function handleSearch(query) {
  searchQuery = query.toLowerCase().trim();
  renderCatalog();
}

// Set recommendation mode (Content-Based vs Collaborative Filtering)
function setRecommendationMode(mode) {
  currentMode = mode;
  
  const cbBtn = document.getElementById("btn-content-based");
  const cfBtn = document.getElementById("btn-collaborative");
  const modeBadge = document.getElementById("stat-mode-badge");

  if (mode === 'content') {
    cbBtn.classList.add("active");
    cfBtn.classList.remove("active");
    modeBadge.textContent = "Content-Based";
  } else {
    cbBtn.classList.remove("active");
    cfBtn.classList.add("active");
    modeBadge.textContent = "Collaborative";
  }

  updateRecommendations();
}

// Save rating
function rateMovie(movieId, rating) {
  movieId = parseInt(movieId);
  if (userRatings[movieId] === rating) {
    // Toggle rating off if clicked same rating
    delete userRatings[movieId];
  } else {
    userRatings[movieId] = rating;
  }
  
  // Persist
  localStorage.setItem("cine_match_ratings", JSON.stringify(userRatings));
  
  updateUI();
  
  // If we are rating inside the drawer, update the drawer UI too
  const drawer = document.getElementById("movie-drawer");
  if (drawer.classList.contains("active") && parseInt(drawer.dataset.movieId) === movieId) {
    updateDrawerRatingStars(movieId);
  }
}

// Delete individual rating from sidebar log
function deleteRating(movieId) {
  delete userRatings[parseInt(movieId)];
  localStorage.setItem("cine_match_ratings", JSON.stringify(userRatings));
  updateUI();
  
  // If drawer is open, reset rating there too
  const drawer = document.getElementById("movie-drawer");
  if (drawer.classList.contains("active") && parseInt(drawer.dataset.movieId) === parseInt(movieId)) {
    updateDrawerRatingStars(movieId);
  }
}

// Clear all user ratings
function clearAllRatings() {
  if (confirm("Are you sure you want to clear all your ratings? This will reset your recommendations.")) {
    userRatings = {};
    localStorage.removeItem("cine_match_ratings");
    updateUI();
    
    // Reset any active stars in the drawer if open
    const drawer = document.getElementById("movie-drawer");
    if (drawer.classList.contains("active")) {
      const activeMovieId = parseInt(drawer.dataset.movieId);
      updateDrawerRatingStars(activeMovieId);
    }
  }
}

// Update the full interface state
function updateUI() {
  updateStats();
  renderUserRatingsList();
  renderGenreProfile();
  updateRecommendations();
  
  // Re-render Explore catalog to show updated star ratings
  renderCatalog();
}

// Update top statistics badges
function updateStats() {
  const count = Object.keys(userRatings).length;
  document.getElementById("user-ratings-count").textContent = count;
  document.getElementById("stat-rated-count").textContent = count;
  
  const clearBtn = document.getElementById("btn-clear-ratings");
  if (count > 0) {
    clearBtn.classList.remove("hidden");
  } else {
    clearBtn.classList.add("hidden");
  }
}

// Render rating log in sidebar
function renderUserRatingsList() {
  const container = document.getElementById("rated-movies-container");
  if (!container) return;

  const ratedIds = Object.keys(userRatings);
  if (ratedIds.length === 0) {
    container.innerHTML = `
      <div style="color: var(--color-text-dim); font-size: 0.8rem; font-style: italic; padding: 0.5rem 0;">
        No movies rated yet. Rate movies below to generate recommendations!
      </div>
    `;
    return;
  }

  let html = '';
  ratedIds.forEach(idStr => {
    const id = parseInt(idStr);
    const movie = MOVIES.find(m => m.id === id);
    if (!movie) return;

    const rating = userRatings[id];
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= rating ? '★' : '☆';
    }

    html += `
      <div class="rated-movie-item">
        <div style="display:flex; flex-direction:column; gap:2px; max-width: 170px;">
          <span class="rated-movie-title" title="${movie.title}">${movie.title}</span>
          <span class="rated-movie-stars">${starsHtml}</span>
        </div>
        <button class="delete-rating-btn" onclick="deleteRating(${movie.id})" title="Delete Rating">✕</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render dynamic colored indicators on genres based on rating profile
function renderGenreProfile() {
  // Compute average rating per genre
  const genreTotalWeights = {};
  const genreCounts = {};

  Object.entries(userRatings).forEach(([movieIdStr, rating]) => {
    const movie = MOVIES.find(m => m.id === parseInt(movieIdStr));
    if (!movie) return;

    // Weight relative to neutral 3.0
    const weight = rating - 3; 
    movie.genres.forEach(g => {
      genreTotalWeights[g] = (genreTotalWeights[g] || 0) + weight;
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  // Highlight genre badges in sidebar based on calculated preference
  // If genre has positive score, make badge greenish. If negative, reddish.
  const badges = document.querySelectorAll("#genre-filter-container .genre-badge");
  badges.forEach(badge => {
    const genre = badge.textContent.trim();
    badge.classList.remove("active-pos", "active-neg");
    
    // If selected, keep the selected state
    if (selectedGenre === genre) {
      badge.classList.add("active-pos");
      return;
    }

    const weight = genreTotalWeights[genre] || 0;
    if (weight > 0.5) {
      badge.classList.add("active-pos"); // High affinity
    } else if (weight < -0.5) {
      badge.classList.add("active-neg"); // Low affinity
    }
  });
}

// Re-calculate and draw recommended movies
function updateRecommendations() {
  const recGrid = document.getElementById("recommendations-grid");
  const heroSection = document.getElementById("hero-recommendation-section");
  const recSubtitle = document.getElementById("recommendations-subtitle");
  
  if (!recGrid) return;

  const ratedCount = Object.keys(userRatings).length;

  if (ratedCount === 0) {
    // Show empty state
    heroSection.classList.add("hidden");
    recSubtitle.textContent = "Provide ratings below to seed recommendations";
    recGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">✨</div>
        <h3 class="empty-state-title">Recommendation Engine Offline</h3>
        <p class="empty-state-desc">
          Rate a few movies in the catalog below (click the stars) to seed your taste profile. CineMatch AI will instantly compute recommendations!
        </p>
      </div>
    `;
    return;
  }

  // Get recommendations from active algorithm
  let recommendations = [];
  if (currentMode === 'content') {
    recommendations = getContentBasedRecommendations(userRatings, MOVIES, 7); // fetch 7 to account for potential top pick
  } else {
    recommendations = getCollaborativeRecommendations(userRatings, SEED_USERS, MOVIES, 7);
  }

  if (recommendations.length === 0) {
    heroSection.classList.add("hidden");
    recSubtitle.textContent = "Add more ratings or switch algorithms";
    recGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No Recommendations Available</h3>
        <p class="empty-state-desc">
          We couldn't compute recommendations using ${currentMode === 'content' ? 'Content-Based' : 'Collaborative'} filtering based on your current rating pattern. Try rating more movies of varying genres or switch recommendation engines.
        </p>
      </div>
    `;
    return;
  }

  // 1. Separate top pick for the Hero Section
  const topPick = recommendations[0];
  const otherRecommendations = recommendations.slice(1, 7); // keep next 6 recommendations

  // Draw Hero Banner
  heroSection.classList.remove("hidden");
  document.getElementById("hero-banner").dataset.movieId = topPick.movie.id;
  document.getElementById("hero-gradient").style.background = topPick.movie.gradient;
  document.getElementById("hero-algorithm-tag").textContent = topPick.type === 'Content-Based' ? 'Content Similarity Match' : 'Collaborative Taste Match';
  document.getElementById("hero-title").textContent = topPick.movie.title;
  document.getElementById("hero-year").textContent = topPick.movie.year;
  document.getElementById("hero-duration").textContent = topPick.movie.duration;
  document.getElementById("hero-genres").textContent = topPick.movie.genres.join(', ');
  document.getElementById("hero-description").textContent = topPick.movie.description;
  document.getElementById("hero-reason").textContent = topPick.reasons[0] || 'Similar to your rated movies';
  document.getElementById("hero-score").textContent = `Score Match: ${topPick.score} ${topPick.type === 'Content-Based' ? 'Similarity' : '★'}`;

  // Draw other recommendation cards
  recSubtitle.textContent = `Smart suggestions calculated using ${currentMode === 'content' ? 'Content-Based similarity model' : 'Collaborative User filtering'}`;
  
  if (otherRecommendations.length === 0) {
    // Only 1 recommendation exists (the hero)
    recGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-dim); font-size: 0.85rem; padding: 2rem;">
        Rate more movies to unlock more suggestions in this row.
      </div>
    `;
  } else {
    recGrid.innerHTML = otherRecommendations.map(rec => renderMovieCardHtml(rec.movie, rec)).join('');
    setupStarRatingHover();
  }
}

// Render full explore movies catalog grid (filtered by search and selected genre)
function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  const countLabel = document.getElementById("catalog-count-label");
  if (!grid) return;

  let filteredMovies = MOVIES;

  // Apply genre filter
  if (selectedGenre) {
    filteredMovies = filteredMovies.filter(m => m.genres.includes(selectedGenre));
  }

  // Apply search query filter
  if (searchQuery) {
    filteredMovies = filteredMovies.filter(m => 
      m.title.toLowerCase().includes(searchQuery) ||
      m.director.toLowerCase().includes(searchQuery) ||
      m.cast.some(actor => actor.toLowerCase().includes(searchQuery)) ||
      m.genres.some(genre => genre.toLowerCase().includes(searchQuery))
    );
  }

  // Update counts
  if (selectedGenre || searchQuery) {
    countLabel.textContent = `Found ${filteredMovies.length} matching movies`;
  } else {
    countLabel.textContent = `Showing all ${filteredMovies.length} movies`;
  }

  if (filteredMovies.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔎</div>
        <h3 class="empty-state-title">No Movies Found</h3>
        <p class="empty-state-desc">
          No matches found for your search "${searchQuery}". Check the spelling or clear the genre filters.
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredMovies.map(movie => renderMovieCardHtml(movie)).join('');
  setupStarRatingHover();
}

// Generate HTML for a movie card (supporting either raw movie object or recommendation object)
function renderMovieCardHtml(movie, recObj = null) {
  const currentRating = userRatings[movie.id] || 0;
  
  // Star rating controls
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const isActive = i <= currentRating ? 'active' : '';
    starsHtml += `<span class="star ${isActive}" data-rating="${i}" data-movie-id="${movie.id}">★</span>`;
  }

  // Recommendation Badge/Score indicator
  let scoreBadgeHtml = '';
  if (recObj) {
    const badgeClass = recObj.type === 'Content-Based' ? 'cb' : 'cf';
    const scoreText = recObj.type === 'Content-Based' ? `${recObj.score} sim` : `${recObj.score} ★`;
    scoreBadgeHtml = `<div class="card-score-badge ${badgeClass}">Match: ${scoreText}</div>`;
  }

  // Recommendation Explanatory note
  let reasonBoxHtml = '';
  if (recObj && recObj.reasons && recObj.reasons.length > 0) {
    reasonBoxHtml = `
      <div class="card-reason-box" title="${recObj.reasons.join('\n')}">
        <span>💡</span>
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
          ${recObj.reasons[0]}
        </span>
      </div>
    `;
  }

  return `
    <div class="movie-card" onclick="handleCardClick(event, ${movie.id})">
      <div class="card-poster">
        <div class="poster-art-bg" style="background: ${movie.gradient};"></div>
        <div class="poster-art-overlay"></div>
        <span class="poster-icon">${movie.icon}</span>
        ${scoreBadgeHtml}
      </div>
      
      <div class="card-content">
        <div class="card-header-info">
          <div class="card-genres">
            ${movie.genres.map(g => `<span class="card-genre">${g}</span>`).join('')}
          </div>
          <h3 class="card-title" title="${movie.title}">${movie.title}</h3>
          <div class="card-year-duration">${movie.year} • ${movie.duration}</div>
        </div>
        
        <p class="card-description">${movie.description}</p>
        
        ${reasonBoxHtml}
        
        <div class="card-rating-container" onclick="event.stopPropagation()">
          <span class="rate-label">My Rating</span>
          <div class="star-rating" data-movie-id="${movie.id}">
            ${starsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Star Rating Interactive Hover effect logic
function setupStarRatingHover() {
  const starContainers = document.querySelectorAll(".star-rating");
  
  starContainers.forEach(container => {
    const stars = container.querySelectorAll(".star");
    const movieId = parseInt(container.dataset.movieId);
    
    stars.forEach(star => {
      // Hover event
      star.onmouseenter = () => {
        const hoverVal = parseInt(star.dataset.rating);
        stars.forEach(s => {
          const val = parseInt(s.dataset.rating);
          if (val <= hoverVal) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      };
      
      // Click event
      star.onclick = (e) => {
        e.stopPropagation();
        const clickedVal = parseInt(star.dataset.rating);
        rateMovie(movieId, clickedVal);
      };
    });
    
    // Mouse leave - restore to actual saved rating state
    container.onmouseleave = () => {
      const savedRating = userRatings[movieId] || 0;
      stars.forEach(s => {
        const val = parseInt(s.dataset.rating);
        if (val <= savedRating) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    };
  });
}

// Redirect card click to opening movie detail (preventing event conflict with rating stars click)
function handleCardClick(event, movieId) {
  // If target is inside rating stars container, do not trigger modal
  if (event.target.closest(".card-rating-container")) {
    return;
  }
  openMovieDetail(movieId);
}

// Opening Details sliding drawer panel
function openMovieDetail(movieId) {
  const movie = MOVIES.find(m => m.id === parseInt(movieId));
  if (!movie) return;

  const drawer = document.getElementById("movie-drawer");
  const backdrop = document.getElementById("movie-drawer-backdrop");
  
  // Set drawer dataset reference
  drawer.dataset.movieId = movie.id;
  
  // Fill details
  document.getElementById("drawer-title").textContent = movie.title;
  document.getElementById("drawer-art-bg").style.background = movie.gradient;
  document.getElementById("drawer-description").textContent = movie.description;
  document.getElementById("drawer-director").textContent = movie.director;
  document.getElementById("drawer-duration-val").textContent = movie.duration;
  document.getElementById("drawer-meta").innerHTML = `
    <span>Release: ${movie.year}</span>
    <span>•</span>
    <span>Duration: ${movie.duration}</span>
  `;
  
  // Genres badges
  document.getElementById("drawer-genres").innerHTML = movie.genres.map(g => `
    <span class="genre-badge" style="cursor:default;">${g}</span>
  `).join('');
  
  // Starring cast
  document.getElementById("drawer-cast").innerHTML = movie.cast.map(actor => `
    <span class="drawer-cast-member">${actor}</span>
  `).join('');
  
  // Initialize star rating
  updateDrawerRatingStars(movie.id);
  
  // Activate panels
  backdrop.classList.add("active");
  drawer.classList.add("active");
}

// Render dynamic star controls inside details drawer
function updateDrawerRatingStars(movieId) {
  const container = document.getElementById("drawer-star-rating");
  const ratingText = document.getElementById("drawer-user-rating-text");
  const rating = userRatings[movieId] || 0;
  
  ratingText.textContent = rating > 0 ? `${rating} of 5 Stars` : "Not Rated";

  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const isActive = i <= rating ? 'active' : '';
    starsHtml += `<span class="star ${isActive}" data-rating="${i}" style="font-size: 1.6rem;">★</span>`;
  }
  container.innerHTML = starsHtml;
  
  // Setup drawer star event handlers
  const stars = container.querySelectorAll(".star");
  stars.forEach(star => {
    star.onmouseenter = () => {
      const hoverVal = parseInt(star.dataset.rating);
      stars.forEach(s => {
        const val = parseInt(s.dataset.rating);
        if (val <= hoverVal) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    };
    
    star.onclick = () => {
      const clickedVal = parseInt(star.dataset.rating);
      rateMovie(movieId, clickedVal);
    };
  });
  
  container.onmouseleave = () => {
    const currentRating = userRatings[movieId] || 0;
    stars.forEach(s => {
      const val = parseInt(s.dataset.rating);
      if (val <= currentRating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  };
}

// Close details sliding drawer
function closeMovieDetail() {
  document.getElementById("movie-drawer").classList.remove("active");
  document.getElementById("movie-drawer-backdrop").classList.remove("active");
}
