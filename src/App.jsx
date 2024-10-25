import React, { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import L, { Icon, marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import cup from "./assets/tea-cup.png";
// UserLocationMarker component to render the mall locations with tooltips



function UserLocationMarker({ malls, distances }) {
  const customIcon = new L.Icon({
    iconUrl: cup,
    iconSize: [50, 50]
  
  })
  return (
    <>
      {malls.map((mall, index) => (
        <Marker
          key={index}
          position={mall}
          pathOptions={{ color: "red" }}
          radius={10}
          icon={customIcon}
        >
          <Tooltip>
            {distances[index]
              ? `Distance: ${(Math.round(distances[index]) / 1000).toFixed(3)} Km`
              : "Calculating..."}
            <br />
            {distances[index]
              ? `Time required to reach here: ${((Math.round(distances[index]) / 1000) / 5).toFixed(3)} hrs`
              : "Calculating..."}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}

// Main App component
function App() {
  const arryMall = [
    [19.981605305895977, 73.83384419162938],
    [19.964754300365655, 73.76200561803981],
    [20.029609234445015, 73.75573144063314],
    [19.96138448328795, 73.76290192909791],
    [19.982444658586747, 73.83102156951318],
    [19.971832168493393, 73.76609786422505],
    [19.96343528644327, 73.74890761178776],
    [19.96241716157973, 73.75367374025898],
    [19.966353874629117, 73.75367374025898],
    [19.966014506684772, 73.77035518990829],
    [19.9657430118035, 73.76291714093045],
    [19.978434897606824, 73.77035518990829],
  ];

  const [position, setPosition] = useState(null);
  const [distances, setDistances] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  useEffect(() => {
   
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [19.981602305595977, 73.83281419162938];
      setPosition(userLocation);

      // Calculate distances to each mall
      const calculatedDistances = arryMall.map((mall) => {
        const dist = L.latLng(userLocation).distanceTo(mall);
        return dist;
      });
      setDistances(calculatedDistances);
    });
  }, []);
    
  // const map = useMap();
  
  const gotoPosition = (mall) => {
    console.log(mall);
    // map.flyTo(mall, 15); 
  };

  return (
    <>
      <div
        className="container mx-auto flex justify-center items-center overflow-hidden"
        style={{ width: "100vw", height: "100vh", objectPosition: "center" }}
      >
        <MapContainer
          center={[19.981602305595977, 73.83281419162938]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <CircleMarker
            center={[19.981602305595977, 73.83281419162938]}
            radius={200}
            pathOptions={{ color: "#7CB9E8" }}
          >
            <Marker position={[19.981602305595977, 73.83281419162938]}></Marker>
            <Tooltip permanent>"Here you are"</Tooltip>
          </CircleMarker>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <UserLocationMarker malls={arryMall} distances={distances} />
        </MapContainer>
        <div className="absolute right-0">
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md bg-slate-100"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ zIndex: 1005 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-panel-left-open"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
          <path d="m14 9 3 3-3 3" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar h-screen relative  bg-slate-900 p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "420px", zIndex: 1000 }}
      >
          <h1 className="text-white text-4xl font-bold" style={{ zIndex: 100 }}>
            Stalls
          </h1>
          <ul className="text-white mt-4">
            {arryMall.map((mall, index) => (
              <li
                key={index}
                className="mb-4"
                style={{ cursor: "pointer", listStyleType: "none" }}
                onClick={() => gotoPosition(mall)} 
              >
                <strong>Stall {index + 1}:</strong>
                <br />
                <br />
                {distances[index]
                  ? `Distance: ${(Math.round(distances[index]) / 1000).toFixed(3)} Km`
                  : "Calculating..."}
                <br />
                {distances[index]
                  ? `Time: ${(((Math.round(distances[index]) / 1000) / 5).toFixed(3))} hrs`
                  : "Calculating..."}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
