import './App.css';
import Maker from './pages/Maker';
import About from './pages/About';
import React, { useState, useEffect } from 'react'



function App() {


  const [selected, setSelected] = useState("About");
  const [master, setMaster] = useState(
    {
      title: 'Printopoly',
      currency: 'FaDollarSign',

      railicon: 'FaTrain',
      chesticon: 'FaBoxOpen',
      chanceicon: 'FaDice',
      util1icon: 'FaBriefcase',
      util2icon: 'FaShoppingCart',
      gojailicon: 'FaGavel',
      parkingicon: 'FaParking',
      jailicon: 'FaRegFrown',
      tax1icon: 'FaMoneyBillAlt',
      tax2icon: 'FaMoneyBillAlt',

      brown1: "brown1",
      brown2: "brown2",
      cyan1: "cyan1",
      cyan2: "cyan2",
      cyan3: "cyan3",
      purple1: "purple1",
      purple2: "purple2",
      purple3: "purple3",
      orange1: "orange1",
      orange2: "orange2",
      orange3: "orange3",
      red1: "red1",
      red2: "red2",
      red3: "red3",
      yellow1: "yellow1",
      yellow2: "yellow2",
      yellow3: "yellow3",
      green1: "green1",
      green2: "green2",
      green3: "green3",
      blue1: "blue1",
      blue2: "blue2",
      rail1: "rail1",
      rail2: "rail2",
      rail3: "rail3",
      rail4: "rail4",
      util1: "util1",
      util2: "util2",
      chance: "chance",
      chest: "chest",
      tax1: "tax1",
      tax2: "tax2",

      jail: "jail",
      parking: "parking",

      browncolor: "#964B00",
      cyancolor: "#00FFFF",
      purplecolor: "#6a0dad",
      orangecolor: "#FFA500",
      redcolor: "#FF0000",
      yellowcolor: "#FFFF00",
      greencolor: "#00FF00",
      bluecolor: "#0000FF",
      railcolor: "#000000",
      util1color: "#FFFF00",
      util2color: "#0000FF",
      chancecolor: "#FFA500",
      chestcolor: "#0000FF",
      tax1color: "#FFA500",
      tax2color: "#6a0dad",
      parkingcolor: "#FF0000",
      gojailcolor: "#000000",
    }
  );


  return (
    <>
    {selected === "Maker" && <Maker setSelected={setSelected} master={master} setMaster={setMaster} />}
    {selected === "About" && <About setPage={setSelected} />}

    </>
  );
}

export default App;
