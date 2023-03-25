import React from "react";
import { useState } from "react";
import DataTable from "../components/DataTable/DataTable";
//import DetailsCard from "../components/DetailsCard/DetailsCard";
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
      debugger;
      var date = eventData?.dates?.start?.localDate ?? "";
      var localStorageDate = date;
      var time = eventData?.dates?.start?.localTime ?? "";
      date = date + " " + time;

      var attractionsLength = eventData?._embedded?.attractions?.length;
      attractionsLength =
        attractionsLength === undefined ? 0 : attractionsLength;
      var artistsTeam = "";
      for (var i = 0; i < attractionsLength; i++) {
        if (i > 0) {
          artistsTeam = artistsTeam + " | ";
        }
        var artistsTeamName = eventData?._embedded?.attractions[i]?.name;
        artistsTeamName =
          artistsTeamName === undefined ||
          artistsTeamName.toLowerCase() === "undefined"
            ? ""
            : artistsTeamName;
        artistsTeam = artistsTeam + artistsTeamName;
      }

      var venue = eventData?._embedded?.venues[0]?.name;
      venue =
        venue === undefined || venue.toLowerCase() === "undefined" ? "" : venue;

      //TO-DO : Issue fixed. Need to monitor
      if (eventData && Array.isArray(eventData.classifications)) {
        var segmentName = eventData?.classifications[0]?.segment?.name;
        segmentName =
          segmentName === undefined || segmentName.toLowerCase() === "undefined"
            ? ""
            : segmentName;
        var genreName = eventData?.classifications[0]?.genre?.name;
        genreName =
          genreName === undefined || genreName.toLowerCase() === "undefined"
            ? ""
            : genreName;
        var subGenreName = eventData?.classifications[0]?.subGenre?.name;
        subGenreName =
          subGenreName === undefined ||
          subGenreName.toLowerCase() === "undefined"
            ? ""
            : subGenreName;
        var typeName = eventData?.classifications[0]?.type?.name;
        typeName =
          typeName === undefined || typeName.toLowerCase() === "undefined"
            ? ""
            : typeName;
        var subTypeName = eventData?.classifications[0]?.subType?.name;
        subTypeName =
          subTypeName === undefined || subTypeName.toLowerCase() === "undefined"
            ? ""
            : subTypeName;

        var genres = "";
        if (segmentName !== "") {
          genres = segmentName;
        }
        if (genreName !== "") {
          genres = genres + " | " + genreName;
        }
        if (subGenreName !== "") {
          genres = genres + " | " + subGenreName;
        }
        if (typeName !== "") {
          genres = genres + " | " + typeName;
        }
        if (subTypeName !== "") {
          genres = genres + " | " + subTypeName;
        }
      }

      var minPrice = "";
      var maxPrice = "";
      if (eventData && Array.isArray(eventData.priceRanges)) {
        minPrice = eventData?.priceRanges[0]?.min;
        maxPrice = eventData?.priceRanges[0]?.max;
      }
      minPrice = minPrice === undefined ? "" : minPrice;
      maxPrice = maxPrice === undefined ? "" : maxPrice;

      var priceRanges = "";
      if (minPrice !== "" || maxPrice !== "") {
        priceRanges = minPrice + "-" + maxPrice;
      }

      var ticketStatus = eventData?.dates?.status?.code;
      ticketStatus =
        ticketStatus === undefined || ticketStatus.toLowerCase() === "undefined"
          ? ""
          : ticketStatus;

      var statusTextColor = "";
      switch (ticketStatus) {
        case "onsale":
          statusTextColor = "green";
          break;
        case "offsale":
          statusTextColor = "red";
          break;
        case "canceled":
          statusTextColor = "black";
          break;
        case "cancelled":
          statusTextColor = "black";
          break;
        case "postponed":
          statusTextColor = "orange";
          break;
        case "rescheduled":
          statusTextColor = "orange";
          break;
        default:
          statusTextColor = "";
      }

      var ticketMasterUrl = eventData?.url;
      ticketMasterUrl =
        ticketMasterUrl === undefined ||
        ticketMasterUrl.toLowerCase() === "undefined"
          ? ""
          : ticketMasterUrl;

      var seatMap = eventData?.seatmap?.staticUrl;
      seatMap =
        seatMap === undefined || seatMap.toLowerCase() === "undefined"
          ? ""
          : seatMap;

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
      //Fetching events tab data - End

      //2. Fetching spotify data - Start
      var spotifyDataJson = spotifyData;
      setSpotifyTabData(spotifyDataJson);
      //Fetching spotify data - End

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
        var name = parentNode?.name;
        name =
          name === undefined || name.toLowerCase() === "undefined" ? "" : name;

        var address = "";
        var addressLine1 = parentNode?.address?.line1;
        address =
          addressLine1 === undefined ||
          addressLine1.toLowerCase() === "undefined"
            ? ""
            : addressLine1;

        var city = parentNode?.city?.name;
        address =
          city === undefined || city.toLowerCase() === "undefined"
            ? address
            : address + ", " + city;

        var state = parentNode?.state?.name;
        address =
          state === undefined || state.toLowerCase() === "undefined"
            ? address
            : address + ", " + state;

        //TO-DO : Format the phone number
        var phoneNumber = parentNode?.boxOfficeInfo?.phoneNumberDetail;
        phoneNumber = phoneNumber === undefined ? "" : phoneNumber;

        var openHoursDetail = parentNode?.boxOfficeInfo?.openHoursDetail ?? "";
        openHoursDetail =
          openHoursDetail === undefined ||
          openHoursDetail.toLowerCase() === "undefined"
            ? ""
            : openHoursDetail;

        var generalRule = parentNode?.generalInfo?.generalRule ?? "";
        generalRule =
          generalRule === undefined || generalRule.toLowerCase() === "undefined"
            ? ""
            : generalRule;
        var childRule = parentNode?.generalInfo?.childRule ?? "";
        childRule =
          generalRule === undefined || childRule.toLowerCase() === "undefined"
            ? ""
            : childRule;

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
      //Fetch venue tab data - end
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
