// Movie Recommendation Algorithms

/**
 * Computes the similarity between the active user and a seed user.
 * Uses Cosine Similarity centered around 3 (neutral rating).
 */
function computeUserSimilarity(ratingsA, ratingsB) {
  const centeredA = {};
  const centeredB = {};

  for (const [id, r] of Object.entries(ratingsA)) {
    centeredA[id] = r - 3; // Normalize so 1, 2 are negative; 4, 5 are positive
  }
  for (const [id, r] of Object.entries(ratingsB)) {
    centeredB[id] = r - 3;
  }

  const keysA = Object.keys(ratingsA);
  const keysB = Object.keys(ratingsB);

  // Find intersection of rated movies
  const overlap = keysA.filter(k => keysB.includes(k));
  if (overlap.length === 0) return 0;

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  overlap.forEach(movieId => {
    dotProduct += centeredA[movieId] * centeredB[movieId];
  });

  keysA.forEach(movieId => {
    magA += centeredA[movieId] * centeredA[movieId];
  });

  keysB.forEach(movieId => {
    magB += centeredB[movieId] * centeredB[movieId];
  });

  if (magA === 0 || magB === 0) return 0;

  const cosineSim = dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));

  // Dampen similarity for users with very small overlapping ratings
  // For example, if only 1 movie is in common, multiply similarity by 1/3 = 0.33
  // If 3 or more movies in common, no dampening.
  const overlapDampener = Math.min(overlap.length / 3, 1.0);
  return cosineSim * overlapDampener;
}

/**
 * Content-Based Recommendation Engine
 * Computes recommendations based on user genre, cast, and director preferences.
 */
function getContentBasedRecommendations(userRatings, movies, limit = 6) {
  if (Object.keys(userRatings).length === 0) {
    return [];
  }

  // 1. Build profile of user interests
  const genreScores = {};
  const castScores = {};
  const directorScores = {};

  for (const [movieIdStr, rating] of Object.entries(userRatings)) {
    const movieId = parseInt(movieIdStr);
    const movie = movies.find(m => m.id === movieId);
    if (!movie) continue;

    // Center rating around 2.5 (neutral)
    const weight = rating - 2.5;

    // Accumulate genre preference
    movie.genres.forEach(g => {
      genreScores[g] = (genreScores[g] || 0) + weight;
    });

    // Accumulate cast preference
    movie.cast.forEach(c => {
      castScores[c] = (castScores[c] || 0) + weight * 0.5; // lower weight for cast
    });

    // Accumulate director preference
    if (movie.director) {
      directorScores[movie.director] = (directorScores[movie.director] || 0) + weight * 0.8;
    }
  }

  // 2. Score unrated movies against user profile
  const recommendations = [];

  movies.forEach(movie => {
    // Skip if already rated
    if (userRatings[movie.id] !== undefined) return;

    let score = 0;
    const reasons = [];

    // Genre similarity calculation
    let genreMatchScore = 0;
    movie.genres.forEach(g => {
      if (genreScores[g]) {
        genreMatchScore += genreScores[g];
      }
    });

    // Divide by square root of length to prevent bias towards long genre lists
    if (movie.genres.length > 0) {
      genreMatchScore = genreMatchScore / Math.sqrt(movie.genres.length);
    }
    if (genreMatchScore > 0) {
      score += genreMatchScore;
    }

    // Cast similarity
    let castMatchScore = 0;
    movie.cast.forEach(c => {
      if (castScores[c]) {
        castMatchScore += castScores[c];
      }
    });
    if (castMatchScore > 0) {
      score += castMatchScore;
    }

    // Director similarity
    if (movie.director && directorScores[movie.director]) {
      score += directorScores[movie.director];
    }

    // Find main reasons for recommendation
    let bestGenre = null;
    let maxGenreScore = -Infinity;
    movie.genres.forEach(g => {
      if (genreScores[g] > maxGenreScore && genreScores[g] > 0) {
        maxGenreScore = genreScores[g];
        bestGenre = g;
      }
    });

    if (bestGenre) {
      reasons.push(`Matches your preference for ${bestGenre}`);
    }

    if (movie.director && directorScores[movie.director] > 0.8) {
      reasons.push(`Directed by ${movie.director}, whom you seem to enjoy`);
    }

    let bestCast = null;
    movie.cast.forEach(c => {
      if (castScores[c] > 0.5) {
        bestCast = c;
      }
    });
    if (bestCast && reasons.length < 2) {
      reasons.push(`Stars ${bestCast}, whom you've rated highly`);
    }

    if (score > 0) {
      recommendations.push({
        movie,
        score: parseFloat(score.toFixed(2)),
        reasons: reasons.slice(0, 2),
        type: "Content-Based"
      });
    }
  });

  // Sort by score descending
  return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * User-Based Collaborative Filtering Engine
 * Recommends movies by finding users with similar rating patterns.
 */
function getCollaborativeRecommendations(userRatings, seedUsers, movies, limit = 6) {
  if (Object.keys(userRatings).length === 0) {
    return [];
  }

  // 1. Calculate similarity with all seed users
  const userSimilarities = [];
  seedUsers.forEach(otherUser => {
    const sim = computeUserSimilarity(userRatings, otherUser.ratings);
    if (sim > 0.1) { // Keep users with positive similarity
      userSimilarities.push({
        user: otherUser,
        similarity: sim
      });
    }
  });

  // Sort by similarity descending
  userSimilarities.sort((a, b) => b.similarity - a.similarity);

  if (userSimilarities.length === 0) {
    return [];
  }

  const recommendations = [];

  // 2. Predict ratings for unrated movies using weighted average of neighbors
  movies.forEach(movie => {
    // Skip if already rated
    if (userRatings[movie.id] !== undefined) return;

    let weightedSum = 0;
    let similaritySum = 0;
    const ratingsFromNeighbors = [];

    userSimilarities.forEach(simObj => {
      const neighbor = simObj.user;
      const sim = simObj.similarity;
      const rating = neighbor.ratings[movie.id];

      if (rating !== undefined) {
        weightedSum += sim * rating;
        similaritySum += sim;
        ratingsFromNeighbors.push({
          name: neighbor.name.replace(/\s*\(.*\)/, ""), // Strip description
          rating,
          similarity: sim
        });
      }
    });

    if (similaritySum > 0) {
      const predictedRating = weightedSum / similaritySum;

      // Only recommend movies with a predicted rating of 3.5 or above
      if (predictedRating >= 3.5) {
        ratingsFromNeighbors.sort((a, b) => b.similarity - a.similarity);
        const topNeighbor = ratingsFromNeighbors[0];

        const reasons = [
          `Predicted rating: ${predictedRating.toFixed(1)} ★ based on similar tastes`,
          `Highly rated by ${topNeighbor.name} (${topNeighbor.rating}★)`
        ];

        recommendations.push({
          movie,
          score: parseFloat(predictedRating.toFixed(2)),
          reasons,
          type: "Collaborative"
        });
      }
    }
  });

  // Sort by predicted rating descending
  return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
}

// Export functions for browser or node usage
if (typeof window !== "undefined") {
  window.getContentBasedRecommendations = getContentBasedRecommendations;
  window.getCollaborativeRecommendations = getCollaborativeRecommendations;
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    computeUserSimilarity,
    getContentBasedRecommendations,
    getCollaborativeRecommendations
  };
}
