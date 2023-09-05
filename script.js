const apiKey = '15b51316aa787201c132cc7d7076573a';
const apiUrl = 'https://api.themoviedb.org/3';

const genreSelect = document.getElementById('genreSelect');
const moviesContainer = document.getElementById('moviesContainer');
const toggleLanguageButton = document.getElementById('toggleLanguage');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
let currentLanguage = 'en';
let currentPage = 1;

// Función para obtener los géneros desde la API
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

// Función para obtener y mostrar las películas
async function fetchMovies(genreId = '', page = 1) {
  try {
    const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=${currentLanguage}&with_genres=${genreId}&page=${page}`);
    const data = await response.json();
    moviesContainer.innerHTML = '';
    data.results.slice(0, 10).forEach(movie => { // Limita a 10 películas por página
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

// Actualizar página al hacer clic en "Siguiente"
nextPageButton.addEventListener('click', () => {
  currentPage++;
  fetchMovies(genreSelect.value, currentPage);
});

// Actualizar página al hacer clic en "Anterior"
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies(genreSelect.value, currentPage);
  }
});

// Cambiar idioma
toggleLanguageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
  fetchGenres(); // Actualiza los géneros al cambiar el idioma
  fetchMovies(genreSelect.value, currentPage);
});

// Cargar géneros y películas al inicio
fetchGenres();
fetchMovies();

// Cambiar películas al seleccionar un género
genreSelect.addEventListener('change', () => {
  currentPage = 1; // Resetear la página al cambiar el género
  fetchMovies(genreSelect.value, currentPage);
});
