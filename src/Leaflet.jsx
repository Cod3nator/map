import React, { useEffect, useState } from 'react'

const Leaflet = () => {

const [position, setPosition] = useState([])
// useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//         setPosition([position.coords.latitude, position.coords.longitude]);
//     }, 
//     (error) => {
//         console.error(error); // Handle errors
//     },
//     { 
//         enableHighAccuracy: true, 
//         timeout: 5000, 
//         maximumAge: 0 
//     });
// }, []);
useEffect(() => {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=d37cd550c7414f85b53431f21161a735')
    .then(response => response.json())
    .then(data => {
        setPosition([data.latitude, data.longitude]);
    })
    .catch(error => console.error('Error fetching IP location:', error));
}, []);
useEffect(()=>{
    console.log(position);
    
},[position])

  console.log(position);


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
    <div>

Leaflet page
<div id="map"></div>


    </div>
  )
}

export default Leaflet

   {/* <div className="absolute right-0">
    
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
        </div> */}