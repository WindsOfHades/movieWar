const apiUrl = "http://www.omdbapi.com/";
const apiKey = "74caf9b3";


const searchMovie = async (searchText) => {
    const response = await axios.get(apiUrl, {
        params: {
            apikey: apiKey,
            s: searchText
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const getMovie = async (movieId) => {
    const response = await axios.get(apiUrl, {
        params: {
            apikey: apiKey,
            i: movieId
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data;
}

const renderMovieItem = (item) => {
    return `<image src="${item.Poster === "N/A" ? "" : item.Poster}">${item.Title}`;
}

const renderSelectedMovie = (item) => {
    document.querySelector(".tutorial").classList.add("is-hidden");
    return getMovie(item.imdbID);
}

let leftSummary;
let righSummary;
const renderSelectedMovieLeft = async (item) => {
    leftSummary = false;
    const movie = await renderSelectedMovie(item);
    document.querySelector("#summary-left").innerHTML = selectedMovieHtml(movie);
    leftSummary = true;
    compareStats();
}

const renderSelectedMovieRight = async (item) => {
    rightSummary = false;
    const movie = await renderSelectedMovie(item)
    document.querySelector("#summary-right").innerHTML = selectedMovieHtml(movie);
    rightSummary = true;
    compareStats();
}

const compareStats = () => {
    if (!(leftSummary && rightSummary)) {
        return;
    }
    const leftStats = document.querySelectorAll("#summary-left .notification");
    const rightStats = document.querySelectorAll("#summary-right .notification");
    console.log(rightStats);
    rightStats.forEach((element, index) => {
        if (parseInt(element.dataset.value) > parseInt(leftStats[index].dataset.value)) {
            element.classList.add("is-warning");
            element.classList.remove('is-primary');
        } else {
            element.classList.add("is-warning");
            element.classList.remove('is-primary');
        }
    })
}

const selectedMovieHtml = (movie) => {
    const metascore = parseInt(movie.Metascore);
    const imdbRating = parseFloat(movie.imdbRating);
    const imdbVotes = parseInt(movie.imdbVotes.replace(",", ""));
    const rottenTomatoesRating = parseInt(movie.Ratings[1].Value.replace("%", ""));
    return `
        <article class="media">
                <figure class="media-left">
                <p class=image>
                <img src="${movie.Poster}">
                    </p>
                    </figure>
                <div class="media-content">
                <div class="content">
                <h1>${movie.Title}</h1>
                <h4>${movie.Genre}</h4>
                <h6>${movie.Awards}</h6>
                <p>${movie.Plot}</p>
                </div>
                </div>
                </article>
                <article data-value=${metascore} class="notification is-primary">
                <p class="title">Metascore</p>
                <p class="subtitle">${movie.Metascore}</p>
                </article>
                <article data-value=${imdbRating} class="notification is-primary">
                <p class="title">IMDB Rating</p>
                <p class="subtitle">${movie.imdbRating}</p>
                </article>
                <article data-value=${imdbVotes} class="notification is-primary">
                <p class="title">IMDB Votes</p>
                <p class="subtitle">${movie.imdbVotes}</p>
                </article>
                <article data-value=${rottenTomatoesRating} class="notification is-primary">
                <p class="title">Rotten Tomatoes</p>
                <p class="subtitle">${movie.Ratings[1].Value}</p>
                </article>
                `;
};

const configLeft = {
    "root": document.querySelector("#autocomplete-left"),
    "fetchData": searchMovie,
    "renderItem": renderMovieItem,
    "renderSelectedItem": renderSelectedMovieLeft,
}
const configRight = {
    "root": document.querySelector("#autocomplete-right"),
    "fetchData": searchMovie,
    "renderItem": renderMovieItem,
    "renderSelectedItem": renderSelectedMovieRight,
}
const autoCompleteLeft = new AutoComplete(configLeft);
const autoCompleteRight = new AutoComplete(configRight);
