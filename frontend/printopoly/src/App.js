import './App.css';
import React, { useState, useEffect } from 'react'
import DualPropertyInput from './components/DualPropertyInput';
import TriplePropertyInput from './components/TriplePropertyInput';
import axios from 'axios';




function App() {

  const [master, setMaster] = useState(
    {
      title: 'Printopoly',
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

  const postData = async () => {
    const response = await axios.post('http://localhost:5000/create', {printopoly:master});
    console.log(response);
  }


  



  return (
    <div className="App">
      <div className='left'>
      <h1>Title</h1>
      <div>
                <label> Title: </label>
                <input
                    value={master.title}
                    type="text"
                    onChange={e => setMaster({ ...master, title: e.target.value })}
                    name="title"
                />
            </div>
      <h1>Properties</h1>
      <DualPropertyInput number={1} incolor = {"brown"} master={master} setMaster={setMaster}></DualPropertyInput>
      <TriplePropertyInput number={2} incolor = {"cyan"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <TriplePropertyInput number={3} incolor = {"purple"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <TriplePropertyInput number={4} incolor = {"orange"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <TriplePropertyInput number={5} incolor = {"red"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <TriplePropertyInput number={6} incolor = {"yellow"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <TriplePropertyInput number={7} incolor = {"green"} master={master} setMaster={setMaster}></TriplePropertyInput>
      <DualPropertyInput number={8} incolor = {"blue"} master={master} setMaster={setMaster}></DualPropertyInput>
      <button onClick={postData}>Post</button>
      </div>
      <div className='right'>
      <pre>{JSON.stringify(master, null, 2)}</pre>
      </div>

    </div>
  );
}

export default App;
