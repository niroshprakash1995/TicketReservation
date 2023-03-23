import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../DetailsCard/DetailsCard.css";
import { useState, useEffect } from "react";
import EventsCard from "../EventsCard/EventsCard";
import VenueCard from "../VenueCard/VenueCard";
import SpotifyCard from "../SpotifyCard/SpotifyCard";

function DetailsCard({
  eventsTabData,
  spotifyTabData,
  venueTabData,
  onBackClick,
}) {
  const [isFilled, setIsFilled] = useState(false);

  const [activeTab, setActiveTab] = useState("events");

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };

  useEffect(() => {
    const localStorageItem = JSON.parse(localStorage.getItem("items") || "[]");
    const isFavorite = localStorageItem.some(
      (item) => item.id === eventsTabData.id
    );
    setIsFilled(isFavorite);
  }, [eventsTabData.id]);

  const handleClick = (eventsTabData) => {
    var localStorageItems = JSON.parse(localStorage.getItem("items") || "[]");
    //Remove item from local storage
    if (isFilled) {
      var requiredIndex = -1;
      for (var i = 0; i < localStorageItems.length; i++) {
        if (localStorageItems[i].id === eventsTabData.id) {
          requiredIndex = i;
          break;
        }
      }
      if (requiredIndex !== -1) {
        localStorageItems.splice(requiredIndex, 1);
        localStorage.setItem("items", JSON.stringify(localStorageItems));
      }
      alert("Removed from favorites!");
    }
    //Add item to local storage
    else {
      var localStorageDate = eventsTabData.localStorageDate;
      var name = eventsTabData.name;
      var venue = eventsTabData.venue;
      var genres = eventsTabData.genres;
      var id = eventsTabData.id;
      var localStorageJSON = {
        id: id,
        date: localStorageDate,
        name: name,
        venue: venue,
        genres: genres,
      };

      localStorageItems.push(localStorageJSON);
      localStorage.setItem("items", JSON.stringify(localStorageItems));
      alert("Event Added to Favorites!");
    }
    setIsFilled(!isFilled);
  };

  return (
    <div className="container w-md-50 w-sm-100 detailscard mb-5">
      <button onClick={onBackClick} className="btn backbutton">
        &lt;<u>Back</u>
      </button>
      <div
        className="pb-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <p className="h3 text-light text-center">{eventsTabData.name}</p>
        <div
          onClick={() => handleClick(eventsTabData)}
          className="detailscard-svg"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            marginLeft: "10px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFilled ? "red" : "none"}
            stroke={isFilled ? "red" : "grey"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex"
          >
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
          </svg>
        </div>
      </div>
      <div className="centered-tabs">
        <Tabs
          defaultActiveKey="events"
          transition={true}
          id="tabs"
          activeKey={activeTab}
          onSelect={handleTabSelect}
          className={`tabsdiv border-bottom-0 ${
            activeTab !== "" ? "slide" : ""
          }`}
        >
          <Tab eventKey="events" title="Events" id="e1">
            <EventsCard eventsTabData={eventsTabData}></EventsCard>
          </Tab>
          <Tab eventKey="spotify" title="Artist/Teams">
            <SpotifyCard spotifyTabData={spotifyTabData}></SpotifyCard>
          </Tab>
          <Tab eventKey="venue" title="Venue">
            <VenueCard venueTabData={venueTabData}></VenueCard>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default DetailsCard;
