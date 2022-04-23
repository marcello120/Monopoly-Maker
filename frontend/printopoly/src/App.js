import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import DualPropertyInput from './components/DualPropertyInput';
import TriplePropertyInput from './components/TriplePropertyInput';
import axios from 'axios';
import IconChooser from './components/IconChooser';
import { IconPicker } from 'react-fa-icon-picker'
import Icon from './components/Icon';
import *  as IconPack from 'react-icons/fa';
import DualPropertyInputWithIcon from './components/DualPropertyInputWithIcon';
import SinglePropertyInputWithIcon from './components/SinglePropertyInputWithIcon';
import QuadPropertyInputWithIcon from './components/QuadPropertyInputWithIcon';
import TilePreview from './components/TilePreview';
import TilePreviewWithIcon from './components/TilePreviewWithIcon';





function App() {

  const brownRef = useRef();
  const cyanRef = useRef();
  const purpleRef = useRef();
  const orangeRef = useRef();
  const redRef = useRef();
  const yellowRef = useRef();
  const greenRef = useRef();
  const blueRef = useRef();
  const railRef = useRef();

  const scrollToBrown = () => {
    brownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  const scrollToCyan = () => {
    cyanRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToPurple = () => {
    purpleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToOrange = () => {
    orangeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToRed = () => {
    redRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToYellow = () => {
    yellowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToGreen = () => {
    greenRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToBlue = () => {
    blueRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToRail = () => {
    railRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }



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

  const postData = async () => {
    const response = await axios.post('http://localhost:5000/create', { printopoly: master });
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

        <h1>Currency</h1>
        <div>
          <label> Currency: </label>
          <div className='center'>
            <IconPicker
              value={master.currency}
              onChange={(v) => setMaster({ ...master, currency: v })}
            />
          </div>
        </div>


        <h1>Properties</h1>
        <DualPropertyInput number={1} incolor={"brown"} master={master} setMaster={setMaster} scroll={scrollToBrown}></DualPropertyInput>
        <TriplePropertyInput number={2} incolor={"cyan"} master={master} setMaster={setMaster} scroll={scrollToCyan}></TriplePropertyInput>
        <TriplePropertyInput number={3} incolor={"purple"} master={master} setMaster={setMaster} scroll={scrollToPurple}></TriplePropertyInput>
        <TriplePropertyInput number={4} incolor={"orange"} master={master} setMaster={setMaster} scroll={scrollToOrange}></TriplePropertyInput>
        <TriplePropertyInput number={5} incolor={"red"} master={master} setMaster={setMaster} scroll={scrollToRed}></TriplePropertyInput>
        <TriplePropertyInput number={6} incolor={"yellow"} master={master} setMaster={setMaster} scroll={scrollToYellow}></TriplePropertyInput>
        <TriplePropertyInput number={7} incolor={"green"} master={master} setMaster={setMaster} scroll={scrollToGreen}></TriplePropertyInput>
        <DualPropertyInput number={8} incolor={"blue"} master={master} setMaster={setMaster} scroll={scrollToBlue}></DualPropertyInput>


        <h1>Specials</h1>
        <SinglePropertyInputWithIcon title={"Parking"} incolor={"parking"} master={master} setMaster={setMaster}></SinglePropertyInputWithIcon>

        <SinglePropertyInputWithIcon title={"Jail"} incolor={"jail"} master={master} setMaster={setMaster}></SinglePropertyInputWithIcon>
        <h2>Go to Jail Icon</h2>
        <IconChooser master={master} setMaster={setMaster} iconName={"gojailicon"} iconColor={"gojailcolor"} ></IconChooser>



        <QuadPropertyInputWithIcon title={"Transportation"} incolor={"rail"} master={master} setMaster={setMaster} scroll={scrollToRail}></QuadPropertyInputWithIcon>
        <h2>Cards</h2>
        <SinglePropertyInputWithIcon title={"Chance"} incolor={"chance"} master={master} setMaster={setMaster}></SinglePropertyInputWithIcon>
        <SinglePropertyInputWithIcon title={"Community Chest"} incolor={"chest"} master={master} setMaster={setMaster}></SinglePropertyInputWithIcon>
        <DualPropertyInputWithIcon title={"Taxes"} incolor={"tax"} master={master} setMaster={setMaster}></DualPropertyInputWithIcon>


        <button onClick={postData}>Post</button>
      </div>
      <div className='right'>

        <h1 className="title">{master.title}</h1>

        <div className='exprow' ref={brownRef}>
          <TilePreview name={master.brown1} color={master.browncolor} currency={master.currency} price={'100'}></TilePreview>
          <TilePreview name={master.brown2} color={master.browncolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={cyanRef}>
          <TilePreview name={master.cyan1} color={master.cyancolor} currency={master.currency} price={'100'}></TilePreview>
          <TilePreview name={master.cyan2} color={master.cyancolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.cyan3} color={master.cyancolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={purpleRef}>
          <TilePreview name={master.purple1} color={master.purplecolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.purple2} color={master.purplecolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.purple3} color={master.purplecolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={orangeRef}>
          <TilePreview name={master.orange1} color={master.orangecolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.orange2} color={master.orangecolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.orange3} color={master.orangecolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={redRef}>
          <TilePreview name={master.red1} color={master.redcolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.red2} color={master.redcolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.red3} color={master.redcolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={yellowRef}>
          <TilePreview name={master.yellow1} color={master.yellowcolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.yellow2} color={master.yellowcolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.yellow3} color={master.yellowcolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={greenRef}>
          <TilePreview name={master.green1} color={master.greencolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.green2} color={master.greencolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.green3} color={master.greencolor} currency={master.currency} price={'200'}></TilePreview>
        </div>
        <div className='exprow' ref={blueRef}>
          <TilePreview name={master.blue1} color={master.bluecolor} currency={master.currency} price={'200'}></TilePreview>
          <TilePreview name={master.blue2} color={master.bluecolor} currency={master.currency} price={'200'}></TilePreview>
        </div>

        <div className='exprow' ref={railRef}>
          <div style={{flex: '0 0 50%', justifyContent: 'center'}}>
          <TilePreviewWithIcon name={master.rail1} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{flex: '0 0 50%', justifyContent: 'center'}}>
          <TilePreviewWithIcon name={master.rail2} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{flex: '0 0 50%', justifyContent: 'center'}}>
          <TilePreviewWithIcon name={master.rail3} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{flex: '0 0 50%', justifyContent: 'center'}}>
          <TilePreviewWithIcon name={master.rail4} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
        </div>
        <pre>{JSON.stringify(master, null, 2)}</pre>
      </div>

    </div>
  );
}

export default App;
