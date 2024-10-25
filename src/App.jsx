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
import useGeoLocation from "./useGeoLocation";






function PerSonMarker() {
  const map =useMap();
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const [position, setPosition] = useState(null);

  const location  = useGeoLocation();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      // console.log(e.latlng.lat);
      
setPosition([e.latlng.lat, e.latlng.lng]);
      // setPosition(pesonStand);
      map.flyTo(e.latlng, map.getZoom());
    })
  },[map,location])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          // console.log(result);
          if (result.state === "granted") {
      
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
      // console.log(position);
  },[position])
  // useEffect(() => {
  //   fetch('https://api.ipgeolocation.io/ipgeo?apiKey=d37cd550c7414f85b53431f21161a735')
  //   .then(response => response.json())
  //   .then(data => {
  //     setPosition([data.latitude, data.longitude]);
  //   })
  //   .catch(error => console.error('Error fetching IP location:', error));
  // }, []);


  const personIcon = new L.Icon({
    iconUrl: person,
    iconSize: [50, 50]
  });
  return (
  <>
   {
    position ?    <CircleMarker center={position} radius={200} pathOptions={{ color: "#7CB9E8" }}>
    <Marker position={position} icon={personIcon}>
    <Tooltip >"Here you are"</Tooltip>
    </Marker>
   
   </CircleMarker> : "none"
   }
  </>
  );
}
function UserLocationMarker({ malls }) {
  const [selectedStall, setSelectedStall] = useState(null);



  const [distances, setDistances] = useState([]);


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

      {/* Toast message */}
      {selectedStall && (
        <div className="absolute toast bottom-4 left-0 bg-gray-100 text-white px-8 py-4 rounded-md shadow-lg" style={{ zIndex: "9999", width: "100%" }}>
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




  return (
    <>
<div className="absolute top-0 w-full bg-zinc-100 text-black" style={{zIndex: 1000}}><h1 className="text-xl font-bold text-center">Find Tea Stall Near You</h1></div>
      <MapContainer center={[19.963873912499395, 73.76624711906366]}  zoom={13}>
    <PerSonMarker></PerSonMarker>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UserLocationMarker malls={arryMall}  />
      </MapContainer>
    
    </>
  );
}

export default App;
