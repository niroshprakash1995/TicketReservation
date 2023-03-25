import React from "react";
import "../TabsCard/TabsCard.css";
import { useState, useEffect } from "react";
import EventsCard from "../EventsCard/EventsCard";
import VenueCard from "../VenueCard/VenueCard";
import SpotifyCard from "../SpotifyCard/SpotifyCard";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableViews from "react-swipeable-views";

function TabsCard({
  eventsTabData,
  spotifyTabData,
  venueTabData,
  onBackClick,
}) {
  const [isFilled, setIsFilled] = useState(false);
  const [tabIndex, setTabIndex] = useState("0");
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
        <TabContext value={tabIndex}>
          <TabList className="tablist" onChange={handleTabChange} centered>
            <Tab className="tabButton" label="Events" value={"0"} />
            <Tab className="tabButton" label="Artist/Teams" value={"1"} />
            <Tab className="tabButton" label="Venue" value={"2"} />
          </TabList>
          <SwipeableViews axis={"x"} index={Number(tabIndex)} disabled>
            <TabPanel value="0">
              <EventsCard eventsTabData={eventsTabData}></EventsCard>
            </TabPanel>
            <TabPanel value="1">
              <SpotifyCard spotifyTabData={spotifyTabData}></SpotifyCard>
            </TabPanel>
            <TabPanel value="2">
              <VenueCard venueTabData={venueTabData}></VenueCard>
            </TabPanel>
          </SwipeableViews>
        </TabContext>
      </div>
    </div>
  );
}
export default TabsCard;
