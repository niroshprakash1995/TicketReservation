import "../VenueCard/VenueCard.css";
import ShowMoreText from "react-show-more-text";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GoogleMaps from "../GoogleMaps/GoogleMaps";

function VenueCard({ venueTabData }) {
  const [showGoogleMap, setShowGoogleMap] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  var mapAddress = "";
  var venueName = venueTabData?.name;
  venueName =
    venueName === undefined || venueName.toLowerCase() === "undefined"
      ? ""
      : venueName;
  mapAddress = venueName;

  var venueAddress = venueTabData?.address;
  venueAddress =
    venueAddress === undefined || venueAddress.toLowerCase() === "undefined"
      ? ""
      : venueAddress;
  mapAddress = mapAddress + ", " + venueAddress;

  const showMap = async () => {
    var key = "AIzaSyCXalOHLiAuigAYK-BHrWvKTknN1-LzdJI";
    var url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      mapAddress +
      "&key=" +
      key;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (jsonResponse.status === "OK") {
      const { lat, lng } = jsonResponse.results[0].geometry.location;
      setLat(lat);
      setLon(lng);
    }
    setShowGoogleMap(true);
  };
  const hideMap = () => {
    setShowGoogleMap(false);
  };
  return (
    <div>
      <div className="container">
        <div className="row" id="venueDetails">
          <div className="col justify-content-center text-center pt-5">
            {venueTabData?.name && (
              <div>
                <label>Name</label>
                <p id="venueName" className="text-wrap">
                  {venueTabData.name}
                </p>
              </div>
            )}
            {venueTabData?.address && (
              <div className="pt-3">
                <label>Address</label>
                <p id="venueAddress" className="text-wrap">
                  {venueTabData.address}
                </p>
              </div>
            )}
            {venueTabData?.phoneNumber && (
              <div className="pt-3">
                <label>Phone Number</label>
                <p id="venuePhoneNumber" className="text-wrap">
                  {venueTabData.phoneNumber}
                </p>
              </div>
            )}
          </div>
          <div className="col justify-content-center text-center pt-5">
            {venueTabData?.openHoursDetail && (
              <div className="pb-3">
                <label>Open Hours</label>
                <ShowMoreText
                  lines={2}
                  more={
                    <span style={{ display: "inline-block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show more
                      </span>
                      <FaAngleDown />
                    </span>
                  }
                  less={
                    <span style={{ display: "block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show less
                      </span>
                      <FaAngleUp />
                    </span>
                  }
                  className="showmore"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={
                    <div style={{ display: "block" }}></div>
                  }
                >
                  {venueTabData?.openHoursDetail}
                </ShowMoreText>
              </div>
            )}
            {venueTabData?.generalRule && (
              <div className="pb-3">
                <label>General Rule</label>
                <ShowMoreText
                  lines={2}
                  more={
                    <span style={{ display: "inline-block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show more
                      </span>
                      <FaAngleDown />
                    </span>
                  }
                  less={
                    <span style={{ display: "block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show less
                      </span>
                      <FaAngleUp />
                    </span>
                  }
                  className="showmore"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={
                    <div style={{ display: "block" }}></div>
                  }
                >
                  {venueTabData?.generalRule}
                </ShowMoreText>
              </div>
            )}
            {venueTabData?.childRule && (
              <div className="pb-3">
                <label>Child Rule</label>
                <ShowMoreText
                  lines={2}
                  more={
                    <span style={{ display: "inline-block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show more
                      </span>
                      <FaAngleDown />
                    </span>
                  }
                  less={
                    <span style={{ display: "block", color: "#49a1eb" }}>
                      <span style={{ borderBottom: "1px solid" }}>
                        Show less
                      </span>
                      <FaAngleUp />
                    </span>
                  }
                  className="showmore"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={
                    <div style={{ display: "block" }}></div>
                  }
                >
                  {venueTabData?.childRule}
                </ShowMoreText>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container pt-3 pb-3 justify-content-center text-center">
        <Button
          variant="danger"
          className="w-30"
          onClick={() => {
            showMap();
          }}
        >
          Show venue on Google Map
        </Button>

        <Modal show={showGoogleMap} onHide={hideMap}>
          <Modal.Header>
            <Modal.Title>Event Venue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GoogleMaps lat={lat} lon={lon}></GoogleMaps>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <Button
              variant="btn btn-dark"
              onClick={() => {
                hideMap();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default VenueCard;
