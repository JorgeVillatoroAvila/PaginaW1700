const apiKey = '15b51316aa787201c132cc7d7076573a';
const apiUrl = 'https://api.themoviedb.org/3';

const genreSelect = document.getElementById('genreSelect');
const moviesContainer = document.getElementById('moviesContainer');
const toggleLanguageButton = document.getElementById('toggleLanguage');
let currentLanguage = 'en';

// Función para obtener los géneros desde la API  JW
async function fetchGenres() {
  try {
    const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${apiKey}&language=${currentLanguage}`);
    const data = await response.json();
    data.genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

// Función para obtener y mostrar las películas JW
async function fetchMovies(genreId = '') {
  try {
    const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=${currentLanguage}&with_genres=${genreId}`);
    const data = await response.json();
    moviesContainer.innerHTML = '';
    data.results.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');
      movieDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
      `;
      moviesContainer.appendChild(movieDiv);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Cambiar idioma
toggleLanguageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
  fetchGenres();
  fetchMovies();
});

// Cargar géneros y películas al inicio JW1700
fetchGenres();
fetchMovies();

// Cambiar películas al seleccionar un género
genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  fetchMovies(selectedGenre);
});
