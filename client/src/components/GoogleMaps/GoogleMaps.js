import { useMemo } from "react";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../GoogleMaps/GoogleMaps.css";

function GoogleMaps({ lat, lon }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfq4RjkU8G5cYUfyMybmyNS7SHHNJHP8o",
  });

  const mapContainerClassName = useMemo(
    () => "map-container " + (isLoaded ? "loaded" : ""),
    [isLoaded]
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <GoogleMap
      zoom={15}
      center={{ lat: lat, lng: lon }}
      mapContainerClassName={mapContainerClassName}
    >
      <Marker position={{ lat: lat, lng: lon }} />
    </GoogleMap>
  );
}

export default GoogleMaps;
