import React from "react";
import { useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import Message from "../components/Message/Message";
import SearchForm from "../components/SearchForm/SearchForm";
import TabsCard from "../components/TabsCard/TabsCard";

function Search() {
  const [tableData, setTableData] = useState([]);
  const [noResultsFlag, setNoResultsFlag] = useState(false);

  //State variables for all 3 tabs
  const [eventsTabData, setEventsTabData] = useState();
  const [spotifyTabData, setSpotifyTabData] = useState();
  const [venueTabData, setVenueTabData] = useState();

  const getCardDetails = async (eventId, eventVenue, eventName) => {
    var url = "/getCardDetails?id=" + eventId + "&venue=" + eventVenue;
    const response = await fetch(url);
    if (response.status === 200) {
      const jsonResponse = await response.json();

      var eventData = jsonResponse.eventData;
      var spotifyData = JSON.parse(jsonResponse.spotifyData);
      var venueData = jsonResponse.venueData;

      //1. Fetching events tab data - Start
      var id = eventData.id;
      var date = eventData?.dates?.start?.localDate ?? "";
      date = date.toLowerCase() === undefined ? "" : date;
      var localStorageDate = date;
      var time = eventData?.dates?.start?.localTime ?? "";
      time = time.toLowerCase() === undefined ? "" : time;
      date = date + " " + time;

      var attractionsLength = eventData?._embedded?.attractions?.length ?? 0;
      var artistsTeam = "";
      for (var i = 0; i < attractionsLength; i++) {
        if (i > 0) {
          artistsTeam = artistsTeam + " | ";
        }
        var artistsTeamName = eventData?._embedded?.attractions[i]?.name ?? "";
        artistsTeamName =
          artistsTeamName.toLowerCase() === undefined ? "" : artistsTeamName;
        artistsTeam = artistsTeam + artistsTeamName;
      }

      var venue = eventData?._embedded?.venues[0]?.name ?? "";

      if (eventData && Array.isArray(eventData.classifications)) {
        var segmentName = eventData?.classifications[0]?.segment?.name ?? "";
        segmentName =
          segmentName.toLowerCase() === "undefined" ? "" : segmentName;
        var genreName = eventData?.classifications[0]?.genre?.name ?? "";
        genreName = genreName.toLowerCase() === "undefined" ? "" : genreName;
        var subGenreName = eventData?.classifications[0]?.subGenre?.name ?? "";
        subGenreName =
          subGenreName.toLowerCase() === "undefined" ? "" : subGenreName;
        var typeName = eventData?.classifications[0]?.type?.name ?? "";
        typeName = typeName.toLowerCase() === "undefined" ? "" : typeName;
        var subTypeName = eventData?.classifications[0]?.subType?.name ?? "";
        subTypeName =
          subTypeName.toLowerCase() === "undefined" ? "" : subTypeName;
        var genres = "";
        if (segmentName !== "") {
          genres = genres + segmentName;
        }
        if (genreName !== "") {
          if (genres !== "") {
            genres = genres + " | ";
          }
          genres = genres + genreName;
        }
        if (subGenreName !== "") {
          if (genres !== "") {
            genres = genres + " | ";
          }
          genres = genres + subGenreName;
        }
        if (typeName !== "") {
          if (genres !== "") {
            genres = genres + " | ";
          }
          genres = genres + typeName;
        }
        if (subTypeName !== "") {
          if (genres !== "") {
            genres = genres + " | ";
          }
          genres = genres + subTypeName;
        }
      }

      var minPrice = "";
      var maxPrice = "";
      if (eventData && Array.isArray(eventData.priceRanges)) {
        minPrice = eventData?.priceRanges[0]?.min ?? 0;
        maxPrice = eventData?.priceRanges[0]?.max ?? 0;
      }

      var priceRanges = "";
      if (minPrice !== "") {
        priceRanges = minPrice;
      }
      if (maxPrice !== "") {
        priceRanges = priceRanges + "-" + maxPrice;
      }

      var ticketStatus = eventData?.dates?.status?.code ?? "";
      ticketStatus =
        ticketStatus.toLowerCase() === undefined ? "" : ticketStatus;
      var statusTextColor = "";
      var statusText = "";
      switch (ticketStatus) {
        case "onsale":
          statusTextColor = "green";
          statusText = "On Sale";
          break;
        case "offsale":
          statusTextColor = "red";
          statusText = "Off Sale";
          break;
        case "canceled":
          statusTextColor = "black";
          statusText = "Canceled";
          break;
        case "cancelled":
          statusTextColor = "black";
          statusText = "Canceled";
          break;
        case "postponed":
          statusTextColor = "orange";
          statusText = "Postponed";
          break;
        case "rescheduled":
          statusTextColor = "orange";
          statusText = "Rescheduled";
          break;
        default:
          statusTextColor = "";
          statusText = "";
      }

      ticketStatus = statusText;

      var ticketMasterUrl = eventData?.url ?? "";
      ticketMasterUrl =
        ticketMasterUrl.toLowerCase() === "undefined" ? "" : ticketMasterUrl;
      var seatMap = eventData?.seatmap?.staticUrl ?? "";
      seatMap = seatMap.toLowerCase() === "undefined" ? "" : seatMap;

      var eventsDataJson = {
        id: id,
        name: eventName,
        date: date,
        artistsTeam: artistsTeam,
        venue: venue,
        genres: genres,
        priceRanges: priceRanges,
        ticketStatus: ticketStatus,
        statusTextColor: statusTextColor,
        url: ticketMasterUrl,
        seatMap: seatMap,
        localStorageDate: localStorageDate,
      };
      setEventsTabData(eventsDataJson);

      //2. Fetching spotify data - Start
      var spotifyDataJson = spotifyData;
      setSpotifyTabData(spotifyDataJson);

      //3. Fetching venue tab data - start
      var venueDataJson = {
        name: "",
        address: "",
        phoneNumber: "",
        openHoursDetail: "",
        generalRule: "",
        childRule: "",
      };
      var parentNode = venueData?._embedded?.venues[0] ?? "";
      if (parentNode !== "") {
        var name = parentNode?.name ?? "";
        name = name.toLowerCase() === "undefined" ? "" : name;
        var address = "";
        var addressLine = parentNode?.address?.line1 ?? "";
        addressLine =
          addressLine.toLowerCase() === "undefined" ? "" : addressLine;
        var city = parentNode?.city?.name ?? "";
        city = city.toLowerCase() === "undefined" ? "" : city;
        var state = parentNode?.state?.name ?? "";
        state = state.toLowerCase() === "undefined" ? "" : state;
        if (addressLine !== "") {
          address = addressLine;
        }
        if (city !== "") {
          if (address !== "") {
            address = address + ", ";
          }
          address = address + city;
        }
        if (state !== "") {
          if (address !== "") {
            address = address + ", ";
          }
          address = address + state;
        }
        var phoneNumber = parentNode?.boxOfficeInfo?.phoneNumberDetail ?? "";
        phoneNumber =
          phoneNumber.toLowerCase() === "undefined" ? "" : phoneNumber;
        var openHoursDetail = parentNode?.boxOfficeInfo?.openHoursDetail ?? "";
        openHoursDetail =
          openHoursDetail.toLowerCase() === "undefined" ? "" : openHoursDetail;
        var generalRule = parentNode?.generalInfo?.generalRule ?? "";
        generalRule =
          generalRule.toLowerCase() === "undefined" ? "" : generalRule;
        var childRule = parentNode?.generalInfo?.childRule ?? "";
        childRule = childRule.toLowerCase() === "undefined" ? "" : childRule;

        venueDataJson = {
          name: name,
          address: address,
          phoneNumber: phoneNumber,
          openHoursDetail: openHoursDetail,
          generalRule: generalRule,
          childRule: childRule,
        };
      }

      setVenueTabData(venueDataJson);
    }
  };

  return (
    <div>
      <SearchForm
        setData={(data) => {
          setTableData(data);
          setEventsTabData(undefined);
          setSpotifyTabData(undefined);
          setVenueTabData(undefined);
        }}
        setNoResultsFlag={setNoResultsFlag}
      ></SearchForm>
      {noResultsFlag && <Message message={"No results available"}></Message>}

      {eventsTabData || spotifyTabData || venueTabData ? (
        <TabsCard
          eventsTabData={eventsTabData}
          spotifyTabData={spotifyTabData}
          venueTabData={venueTabData}
          onBackClick={() => {
            setEventsTabData(undefined);
            setSpotifyTabData(undefined);
            setVenueTabData(undefined);
          }}
        ></TabsCard>
      ) : (
        tableData.length > 0 && (
          <DataTable tableData={tableData} getCardDetails={getCardDetails} />
        )
      )}
    </div>
  );
}

export default Search;
