var express = require("express");
var app = express();
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const ticketMaster_apiKey = "uZn2m2M44KW7fdc115Dj9MjlhoXGoMEu";
const spotify_clientId = "6ae2557807bb473e89ced5807fb4866c";
const spotify_clientSecret = "174e1fe25556484781446f962c29af8e";

//Keyword search
app.get("/keywordsearch", async function (req, res) {
  var keyword = req.query.keyword;
  var keyword_responses = [];
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/suggest?apikey=${ticketMaster_apiKey}&keyword=${keyword}`
    )
    .then((response) => {
      var len = response?.data?._embedded?.attractions?.length ?? 0;
      for (var i = 0; i < len; i++) {
        keyword_responses[i] =
          response?.data?._embedded?.attractions[i]?.name ?? "";
      }
      res.json({
        keywords: keyword_responses,
      });
    })
    .catch((error) => {
      console.log("Error in keyword search at server");
      console.log(error);
    });
});

//Get table data
app.get("/getData", async function (req, res) {
  if (req.method == "GET") {
    var keyword = req.query.keyword;
    var distance = req.query.distance;
    var category = req.query.category;
    var geohash = req.query.geohash;

    var map = new Map();
    if (category == "") {
      segmentId = "";
    } else {
      map.set("Music", "KZFzniwnSyZfZ7v7nJ");
      map.set("Sports", "KZFzniwnSyZfZ7v7nE");
      map.set("Arts & Theatre", "KZFzniwnSyZfZ7v7na");
      map.set("Film", "KZFzniwnSyZfZ7v7nn");
      map.set("Miscellaneous", "KZFzniwnSyZfZ7v7n1");
      map.set("Default", "");
      segmentId = map.get(category);
    }

    var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMaster_apiKey}&keyword=${keyword}&segmentId=${segmentId}&radius=${distance}&
        unit=miles&geoPoint=${geohash}`;

    axios
      .get(url)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.log("Error in event search at server");
        console.log(error);
      });
  } else {
    const data = {
      results: {},
    };
    res.end(data);
  }
});

async function getSpotifyToken() {
  const axios = require("axios");
  const btoa = require("btoa");

  const authHeader =
    "Basic " + btoa(`${spotify_clientId}:${spotify_clientSecret}`);

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}

//Get event related data
app.get("/getCardDetails", async function (req, res) {
  if (req.method == "GET") {
    var id = req.query.id;
    var venue = req.query.venue;

    //Events and Venues API call
    var url1 =
      "https://app.ticketmaster.com/discovery/v2/events/" +
      id +
      "?apikey=" +
      ticketMaster_apiKey;

    var url3 =
      "https://app.ticketmaster.com/discovery/v2/venues?apikey=" +
      ticketMaster_apiKey +
      "&keyword=" +
      venue;

    const [eventData, venueData] = await Promise.all([
      axios.get(url1).then((response) => response.data),
      axios.get(url3).then((response) => response.data),
    ]);

    var artistsNamesArray = [];
    var artistsIdArray = [];
    var artistsLength = eventData?._embedded?.attractions?.length ?? 0;
    artistsLength = artistsLength === undefined ? 0 : artistsLength;

    //Fetching music artist names
    for (var i = 0; i < artistsLength; i++) {
      if (
        eventData &&
        Array.isArray(eventData?._embedded?.attractions) &&
        Array.isArray(eventData._embedded.attractions[i].classifications)
      ) {
        var relatedField =
          eventData?._embedded?.attractions[i]?.classifications[0]?.segment
            ?.name;
        relatedField =
          relatedField == undefined || relatedField.toLowerCase() == "undefined"
            ? ""
            : relatedField;
      }
      if (relatedField.toLowerCase() == "music") {
        var artistName = eventData?._embedded?.attractions[i]?.name ?? "";
        if (artistName != "") {
          artistsNamesArray.push(artistName);
        }
      }
    }

    //Spotify API call
    const SpotifyWebApi = require("spotify-web-api-node");
    const spotifyApi = new SpotifyWebApi();

    var spotifyToken = await getSpotifyToken();
    spotifyApi.setAccessToken(spotifyToken);

    var spotifyData = [];
    const artistPromises = artistsNamesArray.map(async (artistName) => {
      var JSONObj = {
        name: "",
        image: "",
        followers: 0,
        popularity: "",
        spotifyLink: "",
        album1img: "",
        album2img: "",
        album3img: "",
      };
      try {
        const response = await spotifyApi.searchArtists(artistName);
        var artistIdVal = response?.body?.artists?.items[0]?.id ?? "";
        if (artistIdVal != "") {
          artistsIdArray.push(artistIdVal);
        }
        JSONObj.name = response?.body?.artists?.items[0]?.name ?? "";
        JSONObj.image = response?.body?.artists?.items[0]?.images[0]?.url ?? "";
        JSONObj.followers = response.body.artists.items[0].followers.total;
        JSONObj.popularity =
          response?.body?.artists?.items[0]?.popularity ?? "";
        JSONObj.spotifyLink =
          response?.body?.artists?.items[0]?.external_urls?.spotify ?? "";
        return JSONObj;
      } catch (error) {
        if (error.statusCode === 401) {
          const token = await spotifyApi.clientCredentialsGrant();
          spotifyApi.setAccessToken(token.body.access_token);
          const response = await spotifyApi.searchArtists(artistName);
          var artistIdVal = response?.body?.artists?.items[0]?.id ?? "";
          if (artistIdVal != "") {
            artistsIdArray.push(artistIdVal);
          }
          JSONObj.name = response?.body?.artists?.items[0]?.name ?? "";
          JSONObj.image =
            response?.body?.artists?.items[0]?.images[0]?.url ?? "";
          JSONObj.followers = response.body.artists.items[0].followers.total;
          JSONObj.popularity =
            response?.body?.artists?.items[0]?.popularity ?? "";
          JSONObj.spotifyLink =
            response?.body?.artists?.items[0]?.external_urls?.spotify ?? "";
          return JSONObj;
        } else {
          console.error(error);
        }
      }
    });

    spotifyData = await Promise.all(artistPromises);

    //To fetch images for carousel
    try {
      const responses = await Promise.all(
        artistsIdArray.map((id) =>
          spotifyApi.getArtistAlbums(id, {
            limit: 3,
          })
        )
      );

      responses.forEach((response, i) => {
        spotifyData[i].album1img =
          response?.body?.items[0]?.images[0]?.url ?? "";
        spotifyData[i].album2img =
          response?.body?.items[1]?.images[0]?.url ?? "";
        spotifyData[i].album3img =
          response?.body?.items[2]?.images[0]?.url ?? "";
      });
    } catch (error) {
      console.error(error);
    }

    const spotifyDataJson = JSON.stringify(spotifyData);

    const eventVenueJson = {
      eventData: eventData,
      spotifyData: spotifyDataJson,
      venueData: venueData,
    };

    res.json(eventVenueJson);
  }
});

const PORT = process.env.PORT || 8000;

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

const root = require("path").join(__dirname, "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});
