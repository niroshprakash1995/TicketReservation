import React from "react";
import "../EventsCard/EventsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";

function EventsCard({ eventsTabData }) {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-6 col-lg-5 order-md-first mx-auto">
              <div id="eventData-props" className="text-center pt-2 pb-5">
                {eventsTabData.date && (
                  <div id="eventData-date-div" className="pb-3">
                    <label>Date</label>
                    <p id="eventData-date">{eventsTabData.date}</p>
                  </div>
                )}
                {eventsTabData.artistsTeam && (
                  <div id="eventData-artist-div" className="pb-3">
                    <label>Artist/Team</label>
                    <p id="eventData-artist" style={{ whiteSpace: "initial" }}>
                      {eventsTabData.artistsTeam}
                    </p>
                  </div>
                )}
                {eventsTabData.venue && (
                  <div id="eventData-venue-div" className="pb-3">
                    <label>Venue</label>
                    <p id="eventData-venue">{eventsTabData.venue}</p>
                  </div>
                )}
                {eventsTabData.genres && (
                  <div id="eventData-genres-div" className="pb-3">
                    <label>Genres</label>
                    <p id="eventData-genres" style={{ whiteSpace: "initial" }}>
                      {eventsTabData.genres}
                    </p>
                  </div>
                )}
                {eventsTabData.priceRanges && (
                  <div id="eventData-prices-div" className="pb-3">
                    <label>Price Ranges</label>
                    <p id="eventData-prices">{eventsTabData.priceRanges}</p>
                  </div>
                )}
                {eventsTabData.ticketStatus && (
                  <div id="eventData-status-div" className="pb-3">
                    <label>Ticket status</label>
                    <p
                      id="eventData-status"
                      className="pl-5 pr-5"
                      style={{
                        backgroundColor: eventsTabData.statusTextColor,
                        width: "max-content",
                        margin: "auto",
                        borderRadius: "5px",
                        paddingLeft: "3px",
                        paddingRight: "3px",
                      }}
                    >
                      {eventsTabData.ticketStatus}
                    </p>
                  </div>
                )}
                {eventsTabData.url && (
                  <div id="eventData-buy-div">
                    <label>Buy Ticket at:</label>
                    <br />
                    <a
                      id="eventData-buy"
                      target="_blank"
                      href={eventsTabData.url}
                      rel="noreferrer"
                    >
                      Ticketmaster
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-lg-6 order-md-last align-self-center pt-2 pb-5">
              <div className="text-center">
                {eventsTabData.seatMap && (
                  <img
                    alt="Seatmap not available"
                    className="w-100 h-75 d-block mx-auto"
                    src={eventsTabData.seatMap}
                    style={{ color: "white" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pb-3 social-container text-center d-flex align-items-center justify-content-center">
        <label className="text-light">Share on:</label>
        <a
          href={`https://twitter.com/share?url=${eventsTabData.url}&text=Check ${eventsTabData.name} on Ticketmaster.%0A`}
          rel="noreferrer"
          target="_blank"
          className="twitter social"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href={`https://facebook.com/sharer/sharer.php?u=${eventsTabData.url}`}
          rel="noreferrer"
          target="_blank"
          className="facebook social"
        >
          <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
        </a>
      </div>
    </div>
  );
}

export default EventsCard;
