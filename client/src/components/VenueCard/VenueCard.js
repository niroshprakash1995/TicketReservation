import "../VenueCard/VenueCard.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GoogleMaps from "../GoogleMaps/GoogleMaps";
import ReadMore from "../ReadMore/ReadMore";

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
  if (venueAddress !== "") {
    mapAddress = mapAddress + ", " + venueAddress;
  }

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
        <div className="row flex-md-row flex-column mx-auto" id="venueDetails">
          <div className="col justify-content-center text-center pt-2">
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
          <div className="col justify-content-center text-center pt-2">
            {venueTabData?.openHoursDetail && (
              <div className="pb-3">
                <label>Open Hours</label>
                <ReadMore inputText={venueTabData?.openHoursDetail}></ReadMore>
              </div>
            )}
            {venueTabData?.generalRule && (
              <div className="pb-3">
                <label>General Rule</label>
                <ReadMore inputText={venueTabData?.generalRule}></ReadMore>
              </div>
            )}
            {venueTabData?.childRule && (
              <div className="pb-3">
                <label>Child Rule</label>
                <ReadMore inputText={venueTabData?.childRule}></ReadMore>
              </div>
            )}
          </div>
        </div>
      </div>
      {mapAddress && (
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

          <Modal show={showGoogleMap} onHide={hideMap} backdrop="static">
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
      )}
    </div>
  );
}

export default VenueCard;
