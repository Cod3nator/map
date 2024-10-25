import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Tooltip,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cup from "./assets/tea-cup.png";
import person from "./assets/person.png";

function UserLocationMarker({ malls }) {
  const [selectedStall, setSelectedStall] = useState(null);
const map =useMap();
  const customIcon = new L.Icon({
    iconUrl: cup,
    iconSize: [50, 50]
  });

  function openToast(mall) {
    setSelectedStall(mall);
    map.flyTo(mall.position, map.getZoom("15"))
  }
  return (
    <>
      {malls.map((mall, index) => (
        <Marker
          key={index}
          position={mall.position}
          icon={customIcon}
          eventHandlers={{
            click: () => openToast(mall),
          }}
        >
        </Marker>
      ))}

      {selectedStall && (
        <div className="absolute toast bottom-0 left-0 bg-gray-100 text-white p-4 rounded-md shadow-lg" style={{ zIndex: "9999", width: "100%" }}>
          <h3 className="font-bold text-lg text-slate-800 pb-4">{selectedStall.name}</h3>
          <a href={selectedStall.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         Get Directions
         </button>
          </a>
          <button
            onClick={() => setSelectedStall(null)}
            className="ml-4 text-white bg-red-500 py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  const arryMall = [
    {
      "position": [19.981605305895977, 73.83384419162938],
      "name": "Tea Stall 1",
      "link": "https://www.google.com/maps?q=19.981605305895977,73.83384419162938"
    },
    {
      "position": [19.964754300365655, 73.76200561803981],
      "name": "Tea Stall 2",
      "link": "https://www.google.com/maps?q=19.964754300365655,73.76200561803981"
    },
    {
      "position": [20.029609234445015, 73.75573144063314],
      "name": "Tea Stall 3",
      "link": "https://www.google.com/maps?q=20.029609234445015,73.75573144063314"
    },
    {
      "position": [19.96138448328795, 73.76290192909791],
      "name": "Tea Stall 4",
      "link": "https://www.google.com/maps?q=19.96138448328795,73.76290192909791"
    },
    {
      "position": [19.982444658586747, 73.83102156951318],
      "name": "Tea Stall 5",
      "link": "https://www.google.com/maps?q=19.982444658586747,73.83102156951318"
    },
    {
      "position": [19.971832168493393, 73.76609786422505],
      "name": "Tea Stall 6",
      "link": "https://www.google.com/maps?q=19.971832168493393,73.76609786422505"
    },
    {
      "position": [19.96343528644327, 73.74890761178776],
      "name": "Tea Stall 7",
      "link": "https://www.google.com/maps?q=19.96343528644327,73.74890761178776"
    },
    {
      "position": [19.96241716157973, 73.75367374025898],
      "name": "Tea Stall 8",
      "link": "https://www.google.com/maps?q=19.96241716157973,73.75367374025898"
    },
    {
      "position": [19.966353874629117, 73.75367374025898],
      "name": "Tea Stall 9",
      "link": "https://www.google.com/maps?q=19.966353874629117,73.75367374025898"
    },
    {
      "position": [19.966014506684772, 73.77035518990829],
      "name": "Tea Stall 10",
      "link": "https://www.google.com/maps?q=19.966014506684772,73.77035518990829"
    },
    {
      "position": [19.9657430118035, 73.76291714093045],
      "name": "Tea Stall 11",
      "link": "https://www.google.com/maps?q=19.9657430118035,73.76291714093045"
    },
    {
      "position": [19.978434897606824, 73.77035518990829],
      "name": "Tea Stall 12",
      "link": "https://www.google.com/maps?q=19.978434897606824,73.77035518990829"
    }
  ]

  const [position, setPosition] = useState(null);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    // Function to request location
    const requestLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(userPosition);

          // Calculate distances to each mall
          const calculatedDistances = arryMall.map((mall) => {
            const dist = L.latLng(userPosition).distanceTo(L.latLng(mall.position));
            return dist;
          });
          setDistances(calculatedDistances);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          alert("Unable to get your location. Please enable location permissions.");
        }
      );
    };

    // Check geolocation permission status
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          requestLocation();
        } else if (permissionStatus.state === "prompt") {
          
          requestLocation();
        } else {
          alert("Location access denied. Please enable it in your browser settings.");
        }
      })
      .catch((error) => {
        console.error("Permission API error:", error);
        alert("Unable to access location permissions.");
      });
  }, []);

  if (!position) {
    return <div>Loading your location...</div>;
  }
  const personIcon = new L.Icon({
    iconUrl: person,
    iconSize: [50, 50]
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Find Tea Stall Near You</h1>
      <MapContainer center={[19.963873912499395, 73.76624711906366]} zoom={13} >
        <CircleMarker center={position} radius={200} pathOptions={{ color: "#7CB9E8" }}>
         <Marker position={position} icon={personIcon}>
         <Tooltip >"Here you are"</Tooltip>
         </Marker>
        
        </CircleMarker>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UserLocationMarker malls={arryMall} distances={distances} />
      </MapContainer>
    
    </>
  );
}

export default App;
