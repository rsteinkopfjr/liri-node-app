require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Omdbkey = keys.omdb.id;
var Gifkey = keys.gify.id

if (process.argv[2] === "spotify-this-song") {
    var track = process.argv.slice(3).join(" ");
    spotify.search({ type: 'track', query: track, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artistName = data.tracks.items[0].artists[0].name;
        console.log("Artist: " + artistName);
        var songName = data.tracks.items[0].name;
        console.log("Title: " + songName);
        var link = data.tracks.items[0].preview_url;
        console.log("Preview: " + link);
        var albumName = data.tracks.items[0].album.name;
        console.log("Album Name: " + albumName);
    });
}
if (process.argv[2] === "movie-this") {
    var movieName = process.argv.slice(3).join("+");
    var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + Omdbkey;
    axios.get(movieURL).then(function (response) {
        var movieTitle = response.data.Title;
        console.log("Title: " + movieTitle);
        var movieYear = response.data.Year;
        console.log("Year: " + movieYear);
        var imdbRating = response.data.Ratings[0].Value;
        console.log("IMDB Rating: " + imdbRating);
        var rottenTomatoes = response.data.Ratings[1].Value;
        console.log("Rotten Tomatoes Rating: " + rottenTomatoes);
        var movieCountry = response.data.Country;
        console.log("Country: " + movieCountry);
        var movieLang = response.data.Language;
        console.log("Language: " + movieLang);
        var moviePlot = response.data.Plot;
        console.log("Plot: " + moviePlot);
        var movieActors = response.data.Actors;
        console.log("Actors: " + movieActors);
    }).catch(
        function (error) {
            console.log(error);
        });
}
if (process.argv[2] === "gif-this") {
    var gifName = process.argv.slice(3).join("+");
    var gifURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=" + Gifkey + "&limit=1";
    axios.get(gifURL).then(function (response) {
        var gifTitle = response.data.data[0].title;
        console.log("Title: " + gifTitle);
        var gifRating = response.data.data[0].rating;
        console.log("Rating: " + gifRating);
        var gifPreview = response.data.data[0].images.preview.mp4;
        console.log("Preview URL: " + gifPreview);
    }).catch(
        function (error) {
            console.log(error);
        });
    // http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY
}
if (process.argv[2] === "do-what-it-says") {
    console.log("Do what random.txt says");
}