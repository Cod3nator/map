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

  return (
    <div>

Leaflet page
<div id="map"></div>


    </div>
  )
}

export default Leaflet