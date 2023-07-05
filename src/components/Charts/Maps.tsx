import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import L from "leaflet";
// @ts-ignore
import markerIcon from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Maps = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/countries"],
    queryFn: async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
        <div className="h-screen flex items-center justify-center">
          <div>Loading..</div>
        </div>
      );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>Error..</div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="h-full w-full relative">
        {/* @ts-ignore */}
        <MapContainer className="h-full" center={[0, 0]} zoom={2}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((country: any) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              // @ts-ignore
              icon={L.icon({ iconUrl: markerIcon })}
            >
              <Popup>
                <div>
                  <h2>{country.country}</h2>
                  <p>Total Active Cases: {country.active}</p>
                  <p>Total Recovered Cases: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
