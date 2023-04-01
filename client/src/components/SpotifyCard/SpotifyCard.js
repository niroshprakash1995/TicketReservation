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
              <div className="d-flex row container pb-1 align-items-center justify-content-center">
                <div className="text-center col-md-3 justify-content-center align-items-center">
                  {item.image && (
                    <img
                      className="rounded-circle col-7 col-md-10 mb-3"
                      alt="Not available"
                      src={item.image}
                    />
                  )}
                  {item.name && (
                    <p className="text-center d-flex justify-content-center font-weight-bold">
                      {item.name}
                    </p>
                  )}
                </div>

                <div className="col-md-2 justify-content-center align-items-center">
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

                <div className="col-md-2 justify-content-center align-items-center">
                  {item.followers && (
                    <div className="d-flex flex-column align-items-center">
                      <p>Followers</p>
                      <label className="pb-2">
                        {item.followers.toLocaleString()}
                      </label>
                    </div>
                  )}
                </div>

                <div className="col-md-2 justify-content-center align-items-center">
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
              <div className="album-featuring col-9 mx-auto d-flex flex-wrap justify-content-center justify-content-md-start text-center text-md-left">
                <p className="pt-2 text-wrap">Album featuring {item.name}</p>
              </div>
            )}
            <div className="d-flex row justify-content-center align-content-center">
              {item.album1img && (
                <img
                  className="col-7 col-md-3 mb-3"
                  src={item.album1img}
                  alt="First"
                />
              )}
              {item.album2img && (
                <img
                  className="col-7 col-md-3 mb-3"
                  src={item.album2img}
                  alt="Second"
                />
              )}
              {item.album3img && (
                <img
                  className="col-7 col-md-3 mb-3"
                  src={item.album3img}
                  alt="Third"
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
                <div className="d-flex row container pb-1 align-items-center justify-content-center">
                  <div className="text-center col-md-3 justify-content-center align-items-center">
                    {item.image && (
                      <img
                        className="rounded-circle col-7 col-md-10 mb-3"
                        alt="Not available"
                        src={item.image}
                      />
                    )}
                    {item.name && (
                      <p className="text-center d-flex justify-content-center font-weight-bold">
                        {item.name}
                      </p>
                    )}
                  </div>

                  <div className="col-md-2 justify-content-center align-items-center">
                    {item.popularity && (
                      <div className="d-flex flex-column align-items-center">
                        <p className="align-items-center">Popularity</p>
                        <div style={{ width: 34, height: 36 }}>
                          <CircularProgressbar
                            value={item.popularity}
                            text={`${item.popularity}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-2 justify-content-center align-items-center">
                    {item.followers && (
                      <div className="align-items-center followers">
                        <p>Followers</p>
                        <label className="pb-2">
                          {item.followers.toLocaleString()}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-md-2 justify-content-center align-items-center">
                    {item.spotifyLink && (
                      <div className="align-items-center">
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
                <div className="album-featuring col-9 mx-auto d-flex flex-wrap justify-content-center justify-content-md-start text-center text-md-left">
                  <p className="pt-2 text-wrap">Album featuring {item.name}</p>
                </div>
              )}
              <div className="d-flex row justify-content-center align-content-center">
                {item.album1img && (
                  <img
                    className="col-7 col-md-3 mb-3"
                    src={item.album1img}
                    alt="First"
                  />
                )}
                {item.album2img && (
                  <img
                    className="col-7 col-md-3 mb-3"
                    src={item.album2img}
                    alt="Second"
                  />
                )}
                {item.album3img && (
                  <img
                    className="col-7 col-md-3 mb-3"
                    src={item.album3img}
                    alt="Third"
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
