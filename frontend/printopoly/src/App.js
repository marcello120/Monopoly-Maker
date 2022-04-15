import './App.css';
import React, { useState, useEffect } from 'react'
import DualPropertyInput from './components/DualPropertyInput';
import TriplePropertyInput from './components/TriplePropertyInput';



function App() {

  const [master, setMaster] = useState(
    {
      title: 'Gangopoly',
      currency: 'fa-solid fa-sterling-sign',

      railicon: 'fa-solid fa-train fa-5x',
      chesticon: 'fa-solid fa-gift fa-5x',
      chanceicon: 'fa-solid fa-circle-question fa-5x',
      util1icon: 'fa-solid fa-lightbulb fa-5x',
      util2icon: 'fa-solid fa-shower fa-5x',
      gojailicon: 'fa-solid fa-handcuffs fa-5x',
      parkingicon: 'fa-solid fa-car-side fa-5x',
      jailicon: 'fa-solid fa-face-dizzy fa-5x',
      tax1icon: 'fa-solid fa-money-bill-wave-alt fa-5x',
      tax2icon: 'fa-solid fa-money-bill-wave-alt fa-5x',

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
      cyancolor: "cyan",
      purplecolor: "purple",
      orangecolor: "orange",
      redcolor: "red",
      yellowcolor: "yellow",
      greencolor: "green",
      bluecolor: "blue",
      railcolor: "black",
      util1color: "yellow",
      util2color: "blue",
      chancecolor: "orange",
      chestcolor: "blue",
      tax1color: "orange",
      tax2color: "purple",
      parkingcolor: "green",
      gojailcolor: "red",
    }
  );

  



  return (
    <div className="App">
      <h1>Properties</h1>
      <h2>Property group 1</h2>
      <DualPropertyInput incolor = {"brown"} master={master} setMaster={setMaster}></DualPropertyInput>
      <h2>Property group 2</h2>
      <TriplePropertyInput incolor = {"cyan"} master={master} setMaster={setMaster}></TriplePropertyInput>

      <pre>{JSON.stringify(master, null, 2)}</pre>

    </div>
  );
}

export default App;
