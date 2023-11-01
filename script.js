const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


const getMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

const showMovies = (movies) => {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')

        movieEl.classList.add('movie', 'col-lg-2', 'col-md-4', 'col-sm-6', 'mb-4') // Menambahkan kelas Bootstrap untuk membuat 4 film per baris

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3 style="font-size: 1rem;">${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3 style="font-size: 1rem;">Overview</h3>
          <p style="font-size: 0.8rem;">${overview}</p>
          
        </div>
        `


        main.appendChild(movieEl)
    })
}

const getClassByRate = (vote) => {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

getMovies(API_URL)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
