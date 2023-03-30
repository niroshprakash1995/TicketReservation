import React from "react";
import "../SpotifyCard/SpotifyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Carousel from "react-bootstrap/Carousel";
import Message from "../Message/Message";

function SpotifyCard({ spotifyTabData }) {
  if (spotifyTabData.length === 0) {
    return (
      <div
        className="spotify-card justify-content-center align-items-center w-100"
        style={{
          marginTop: "150px",
          minHeight: "200px",
        }}
      >
        <Message
          className="noArtist"
          message={"No music related artist details to show"}
        ></Message>
      </div>
    );
  } else if (spotifyTabData.length === 1) {
    return (
      <div
        className="spotify-card w-100"
        style={{
          minHeight: "200px",
        }}
      >
        {spotifyTabData.map((item, index) => (
          <div key={index}>
            <div className="pt-3 d-flex text-center justify-content-center">
              <div className="d-flex container pb-1 flex-wrap align-items-center justify-content-center">
                <div className="text-center col-3 justify-content-center align-items-center containerFull">
                  {item.image && (
                    <img
                      className="rounded-circle"
                      alt="Not available"
                      src={item.image}
                      style={{ height: "150px", width: "auto" }}
                    />
                  )}
                  {item.name && (
                    <p className="text-center d-flex justify-content-center font-weight-bold">
                      {item.name}
                    </p>
                  )}
                </div>

                <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                  {item.popularity && (
                    <div className="d-flex flex-column align-items-center">
                      <p className="">Popularity</p>
                      <div style={{ width: 34, height: 34 }}>
                        <CircularProgressbar
                          value={item.popularity}
                          text={`${item.popularity}`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                  {item.followers && (
                    <div className="d-flex flex-column align-items-center">
                      <p>Followers</p>
                      <label className="pb-2">
                        {item.followers.toLocaleString()}
                      </label>
                    </div>
                  )}
                </div>

                <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                  {item.spotifyLink && (
                    <div className="d-flex flex-column align-items-center">
                      <p>Spotify Link</p>
                      <a
                        href={item.spotifyLink}
                        target="_blank"
                        rel="noreferrer"
                        className="spotify social"
                      >
                        <FontAwesomeIcon icon={faSpotify} size="2x" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {item.name && (
              <div className="album-featuring text-wrap">
                <p className="pt-2 text-wrap">Album featuring {item.name}</p>
              </div>
            )}
            <div className="d-flex row justify-content-center align-content-center">
              {item.album1img && (
                <img
                  className="col-3 mb-3"
                  src={item.album1img}
                  alt="First"
                  style={{ height: "180px", width: "auto" }}
                />
              )}
              {item.album2img && (
                <img
                  className="col-3 mb-3"
                  src={item.album2img}
                  alt="Second"
                  style={{ height: "180px", width: "auto" }}
                />
              )}
              {item.album3img && (
                <img
                  className="col-3 mb-3"
                  src={item.album3img}
                  alt="Third"
                  style={{ height: "180px", width: "auto" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="spotify-card w-100">
        <Carousel
          slide={true}
          indicators={false}
          interval={null}
          className=""
          variant="dark"
        >
          {spotifyTabData.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="pt-3 d-flex text-center justify-content-center">
                <div className="d-flex container pb-1 flex-wrap align-items-center justify-content-center">
                  <div className="text-center col-3 justify-content-center align-items-center containerFull">
                    {item.image && (
                      <img
                        className="rounded-circle"
                        alt="ArtistIcon"
                        src={item.image}
                        style={{ height: "150px", width: "auto" }}
                      />
                    )}
                    {item.name && (
                      <p className="text-center d-flex justify-content-center font-weight-bold">
                        {item.name}
                      </p>
                    )}
                  </div>

                  <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                    {item.popularity && (
                      <div className="d-flex flex-column align-items-center">
                        <p className="">Popularity</p>
                        <div style={{ width: 34, height: 36 }}>
                          <CircularProgressbar
                            value={item.popularity}
                            text={`${item.popularity}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                    {item.followers && (
                      <div className="d-flex flex-column align-items-center followers">
                        <p>Followers</p>
                        <label className="pb-2">
                          {item.followers.toLocaleString()}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="d-flex col-2 justify-content-center align-items-center containerFull">
                    {item.spotifyLink && (
                      <div className="d-flex flex-column align-items-center">
                        <p>Spotify Link</p>
                        <a
                          href={item.spotifyLink}
                          target="_blank"
                          rel="noreferrer"
                          className="spotify social"
                        >
                          <FontAwesomeIcon icon={faSpotify} size="2x" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {item.name && (
                <div className="album-featuring text-wrap">
                  <p className="pt-2 text-wrap">Album featuring {item.name}</p>
                </div>
              )}
              <div className="d-flex row justify-content-center align-content-center">
                {item.album1img && (
                  <img
                    className="col-3 mb-3"
                    src={item.album1img}
                    alt="First"
                    style={{ height: "180px", width: "auto" }}
                  />
                )}
                {item.album2img && (
                  <img
                    className="col-3 mb-3"
                    src={item.album2img}
                    alt="Second"
                    style={{ height: "180px", width: "auto" }}
                  />
                )}
                {item.album3img && (
                  <img
                    className="col-3 mb-3"
                    src={item.album3img}
                    alt="Third"
                    style={{ height: "180px", width: "auto" }}
                  />
                )}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}
export default SpotifyCard;
