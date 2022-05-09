import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import DualPropertyInput from './components/DualPropertyInput';
import TriplePropertyInput from './components/TriplePropertyInput';
import axios from 'axios';
import IconChooser from './components/IconChooser';
import { IconPicker } from 'react-fa-icon-picker'
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
  const utilityRef = useRef();
  const taxRef = useRef();
  const chanceRef = useRef();
  const chestRef = useRef();
  const parkingRef = useRef();
  const jailRef = useRef();
  const titleRef = useRef();




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
  const scrollToUtility = () => {
    utilityRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToTax = () => {
    taxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToChance = () => {
    chanceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToChest = () => {
    chestRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToParking = () => {
    parkingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToJail = () => {
    jailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const scrollToTitle = () => {
    titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const [loading, setLoading] = useState(false);


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

  const cardMaster = {
    brown1: {
      title: "borwn1",
      color: "red",
      price: "60",
      rent0: "2",
      rent1: "10",
      rent2: "30",
      rent3: "90",
      rent4: "160",
      rentH: "250",
      housecost: "50"
    },
    brown2: {
      title: "borwn2",
      color: "red",
      price: "60",
      rent0: "4",
      rent1: "20",
      rent2: "60",
      rent3: "180",
      rent4: "320",
      rentH: "450",
      housecost: "50"
    },
    cyan1: {
      title: "cyan1",
      color: "blue",
      price: "100",
      rent0: "6",
      rent1: "30",
      rent2: "90",
      rent3: "270",
      rent4: "400",
      rentH: "550",
      housecost: "50"
    },
    cyan2: {
      title: "cyan2",
      color: "blue",
      price: "100",
      rent0: "6",
      rent1: "30",
      rent2: "90",
      rent3: "270",
      rent4: "400",
      rentH: "550",
      housecost: "50"
    },
    cyan3: {
      title: "cyan3",
      color: "blue",
      price: "120",
      rent0: "8",
      rent1: "40",
      rent2: "100",
      rent3: "300",
      rent4: "450",
      rentH: "600",
      housecost: "50"
    },
    purple1: {
      title: "pink1",
      color: "pink",
      price: "140",
      rent0: "10",
      rent1: "50",
      rent2: "150",
      rent3: "450",
      rent4: "625",
      rentH: "750",
      housecost: "100"
    },
    purple2: {
      title: "pink2",
      color: "pink",
      price: "140",
      rent0: "10",
      rent1: "50",
      rent2: "150",
      rent3: "450",
      rent4: "625",
      rentH: "750",
      housecost: "100"
    },
    purple3: {
      title: "pink3",
      color: "pink",
      price: "160",
      rent0: "12",
      rent1: "60",
      rent2: "180",
      rent3: "500",
      rent4: "700",
      rentH: "900",
      housecost: "100"
    },
    orange1: {
      title: "orange1",
      color: "orange",
      price: "180",
      rent0: "14",
      rent1: "70",
      rent2: "200",
      rent3: "550",
      rent4: "750",
      rentH: "950",
      housecost: "150"
    },
    orange2: {
      title: "orange2",
      color: "orange",
      price: "180",
      rent0: "14",
      rent1: "70",
      rent2: "200",
      rent3: "550",
      rent4: "750",
      rentH: "950",
      housecost: "150"
    },
    orange3: {
      title: "orange3",
      color: "orange",
      price: "200",
      rent0: "16",
      rent1: "80",
      rent2: "220",
      rent3: "600",
      rent4: "800",
      rentH: "1000",
      housecost: "150"
    },
    red1: {
      title: "red1",
      color: "red",
      price: "220",
      rent0: "18",
      rent1: "90",
      rent2: "250",
      rent3: "700",
      rent4: "875",
      rentH: "1050",
      housecost: "150"
    },
    red2: {
      price: "220",
      rent0: "18",
      rent1: "90",
      rent2: "250",
      rent3: "700",
      rent4: "875",
      rentH: "1050",
      housecost: "150"
    },
    red3: {
      price: "240",
      rent0: "20",
      rent1: "100",
      rent2: "300",
      rent3: "750",
      rent4: "925",
      rentH: "1100",
      housecost: "150"
    },
    yellow1: {
      price: "260",
      rent0: "22",
      rent1: "110",
      rent2: "330",
      rent3: "800",
      rent4: "975",
      rentH: "1175",
      housecost: "150"
    },
    yellow2: {
      price: "260",
      rent0: "22",
      rent1: "110",
      rent2: "330",
      rent3: "800",
      rent4: "975",
      rentH: "1175",
      housecost: "150"
    },
    yellow3: {
      price: "280",
      rent0: "24",
      rent1: "120",
      rent2: "360",
      rent3: "850",
      rent4: "1025",
      rentH: "1200",
      housecost: "150"
    },
    green1: {
      price: "300",
      rent0: "26",
      rent1: "130",
      rent2: "390",
      rent3: "900",
      rent4: "1100",
      rentH: "1275",
      housecost: "200"
    },
    green2: {
      price: "300",
      rent0: "26",
      rent1: "130",
      rent2: "390",
      rent3: "900",
      rent4: "1100",
      rentH: "1275",
      housecost: "200"
    },
    green3: {
      price: "320",
      rent0: "28",
      rent1: "150",
      rent2: "450",
      rent3: "1000",
      rent4: "1200",
      rentH: "1400",
      housecost: "200"
    },
    blue1: {
      price: "350",
      rent0: "35",
      rent1: "175",
      rent2: "500",
      rent3: "1100",
      rent4: "1300",
      rentH: "1500",
      housecost: "200"
    },
    blue2: {
      price: "400",
      rent0: "50",
      rent1: "200",
      rent2: "600",
      rent3: "1400",
      rent4: "1700",
      rentH: "2000",
      housecost: "200"
    },
    rail: {
      title: "rail",
      color: "black",
      price: "200",
      rent1: "25",
      rent2: "50",
      rent3: "100",
      rent4: "200",
    },
    util: {
      price: "150",
      rent1: "4",
      rent2: "10",
    }
  }

  const doit = async () => {
    const  path = process.env.REACT_APP_SERVER_PATH + '/printopoly';
    setLoading(true);
    axios({
      url: path , //your url
      method: 'POST',
      responseType: 'blob', // important
      contentType: 'application/json',
      origin: 'printopoly',
      data: {
        printopoly: master, cards: cardMaster 
      }
  }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'printopoly.zip'); //or any other extension
      document.body.appendChild(link);
      link.click();
      setLoading(false);
  });
  }




  const postData = async () => {
    // const response = await axios.post('http://localhost:5000/create', { printopoly: master, cards: cardMaster }).catch(function (error) {
    const response = await axios.post('http://localhost:5000/printopoly', { printopoly: master, cards: cardMaster }).catch(function (error) {

      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

    });
    console.log(response);
  }



  return (
    <div className="App">
      <div className='left'>
        <div className='heading2'> <h1>Title</h1></div>
        <div className='neu'>
          <label className='desc'> Title: </label>
          <input
            className='input'
            value={master.title}
            type="text"
            onChange={e => setMaster({ ...master, title: e.target.value })}
            name="title"
            onFocus={e => scrollToTitle()}
          />
        </div>
        <div className='heading2'> <h1>Currency</h1></div>
        <div className='iconcontainer'>
          <label className='desc' > Currency: </label>
          <div className='iconstyle'>
            <IconPicker
              value={master.currency}
              onChange={(v) => setMaster({ ...master, currency: v })}
            />
          </div>
        </div>

        <div className='heading2' ><h1>Properties</h1> </div>

        <DualPropertyInput number={1} incolor={"brown"} master={master} setMaster={setMaster} scroll={scrollToBrown}></DualPropertyInput>
        <TriplePropertyInput number={2} incolor={"cyan"} master={master} setMaster={setMaster} scroll={scrollToCyan}></TriplePropertyInput>
        <TriplePropertyInput number={3} incolor={"purple"} master={master} setMaster={setMaster} scroll={scrollToPurple}></TriplePropertyInput>
        <TriplePropertyInput number={4} incolor={"orange"} master={master} setMaster={setMaster} scroll={scrollToOrange}></TriplePropertyInput>
        <TriplePropertyInput number={5} incolor={"red"} master={master} setMaster={setMaster} scroll={scrollToRed}></TriplePropertyInput>
        <TriplePropertyInput number={6} incolor={"yellow"} master={master} setMaster={setMaster} scroll={scrollToYellow}></TriplePropertyInput>
        <TriplePropertyInput number={7} incolor={"green"} master={master} setMaster={setMaster} scroll={scrollToGreen}></TriplePropertyInput>
        <DualPropertyInput number={8} incolor={"blue"} master={master} setMaster={setMaster} scroll={scrollToBlue}></DualPropertyInput>

        <div className='heading2'> <h1>Specials</h1></div>
        <DualPropertyInputWithIcon title={"Taxes"} incolor={"tax"} master={master} setMaster={setMaster} scroll={scrollToTax} ></DualPropertyInputWithIcon>
        <DualPropertyInputWithIcon title={"Utility"} incolor={"util"} master={master} setMaster={setMaster} scroll={scrollToUtility}></DualPropertyInputWithIcon>
        <QuadPropertyInputWithIcon title={"Transportation"} incolor={"rail"} master={master} setMaster={setMaster} scroll={scrollToRail}></QuadPropertyInputWithIcon>
        <SinglePropertyInputWithIcon title={"Chance"} incolor={"chance"} master={master} setMaster={setMaster} scroll={scrollToChance}></SinglePropertyInputWithIcon>
        <SinglePropertyInputWithIcon title={"Community Chest"} incolor={"chest"} master={master} setMaster={setMaster} scroll={scrollToChest}></SinglePropertyInputWithIcon>




        <SinglePropertyInputWithIcon title={"Jail"} incolor={"jail"} master={master} setMaster={setMaster} scroll={scrollToJail}></SinglePropertyInputWithIcon>
        <div className='neu'>
          <div className='neutext'>  <h2> Go to Jail Icon: </h2></div>
          <IconChooser master={master} setMaster={setMaster} iconName={"gojailicon"} iconColor={"gojailcolor"} scroll={scrollToJail} ></IconChooser>
        </div>

        <SinglePropertyInputWithIcon title={"Parking"} incolor={"parking"} master={master} setMaster={setMaster} scroll={scrollToParking}></SinglePropertyInputWithIcon>


        {loading ? <div className='heading2'> <h1>Loading... This will take a minute...  Do Not Panic!</h1></div>: <></>}
        <button disabled={loading}  className='submitButton' onClick={doit}>Print</button>
      </div>
      <div className='right'>

        <h1 ref={titleRef} className="title">{master.title}</h1>

        <div className='exprow' ref={brownRef}>
          <TilePreview name={master.brown1} color={master.browncolor} currency={master.currency} price={cardMaster.brown1.price}></TilePreview>
          <TilePreview name={master.brown2} color={master.browncolor} currency={master.currency} price={cardMaster.brown2.price}></TilePreview>
        </div>
        <div className='exprow' ref={cyanRef}>
          <TilePreview name={master.cyan1} color={master.cyancolor} currency={master.currency} price={cardMaster.cyan1.price}></TilePreview>
          <TilePreview name={master.cyan2} color={master.cyancolor} currency={master.currency} price={cardMaster.cyan2.price}></TilePreview>
          <TilePreview name={master.cyan3} color={master.cyancolor} currency={master.currency} price={cardMaster.cyan3.price}></TilePreview>
        </div>
        <div className='exprow' ref={purpleRef}>
          <TilePreview name={master.purple1} color={master.purplecolor} currency={master.currency} price={cardMaster.purple1.price}></TilePreview>
          <TilePreview name={master.purple2} color={master.purplecolor} currency={master.currency} price={cardMaster.purple2.price}></TilePreview>
          <TilePreview name={master.purple3} color={master.purplecolor} currency={master.currency} price={cardMaster.purple3.price}></TilePreview>
        </div>
        <div className='exprow' ref={orangeRef}>
          <TilePreview name={master.orange1} color={master.orangecolor} currency={master.currency} price={cardMaster.orange1.price}></TilePreview>
          <TilePreview name={master.orange2} color={master.orangecolor} currency={master.currency} price={cardMaster.orange2.price}></TilePreview>
          <TilePreview name={master.orange3} color={master.orangecolor} currency={master.currency} price={cardMaster.orange3.price}></TilePreview>
        </div>
        <div className='exprow' ref={redRef}>
          <TilePreview name={master.red1} color={master.redcolor} currency={master.currency} price={cardMaster.red1.price}></TilePreview>
          <TilePreview name={master.red2} color={master.redcolor} currency={master.currency} price={cardMaster.red2.price}></TilePreview>
          <TilePreview name={master.red3} color={master.redcolor} currency={master.currency} price={cardMaster.red3.price}></TilePreview>
        </div>
        <div className='exprow' ref={yellowRef}>
          <TilePreview name={master.yellow1} color={master.yellowcolor} currency={master.currency} price={cardMaster.yellow1.price}></TilePreview>
          <TilePreview name={master.yellow2} color={master.yellowcolor} currency={master.currency} price={cardMaster.yellow2.price}></TilePreview>
          <TilePreview name={master.yellow3} color={master.yellowcolor} currency={master.currency} price={cardMaster.yellow3.price}></TilePreview>
        </div>
        <div className='exprow' ref={greenRef}>
          <TilePreview name={master.green1} color={master.greencolor} currency={master.currency} price={cardMaster.green1.price}></TilePreview>
          <TilePreview name={master.green2} color={master.greencolor} currency={master.currency} price={cardMaster.green2.price}></TilePreview>
          <TilePreview name={master.green3} color={master.greencolor} currency={master.currency} price={cardMaster.green3.price}></TilePreview>
        </div>
        <div className='exprow' ref={blueRef}>
          <TilePreview name={master.blue1} color={master.bluecolor} currency={master.currency} price={cardMaster.blue1.price}></TilePreview>
          <TilePreview name={master.blue2} color={master.bluecolor} currency={master.currency} price={cardMaster.blue2.price}></TilePreview>
        </div>

        <div className='exprow' ref={taxRef}>
          <TilePreviewWithIcon name={master.tax1} icon={master.tax1icon} color={master.tax1color} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          <TilePreviewWithIcon name={master.tax2} icon={master.tax2icon} color={master.tax2color} currency={master.currency} price={'200'}></TilePreviewWithIcon>
        </div>

        <div className='exprow' ref={utilityRef}>
          <TilePreviewWithIcon name={master.util1} icon={master.util1icon} color={master.util1color} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          <TilePreviewWithIcon name={master.util2} icon={master.util2icon} color={master.util2color} currency={master.currency} price={'200'}></TilePreviewWithIcon>
        </div>

        <div className='exprow' ref={railRef}>
          <div style={{ flex: '0 0 50%', justifyContent: 'center' }}>
            <TilePreviewWithIcon name={master.rail1} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{ flex: '0 0 50%', justifyContent: 'center' }}>
            <TilePreviewWithIcon name={master.rail2} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{ flex: '0 0 50%', justifyContent: 'center' }}>
            <TilePreviewWithIcon name={master.rail3} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
          <div style={{ flex: '0 0 50%', justifyContent: 'center' }}>
            <TilePreviewWithIcon name={master.rail4} icon={master.railicon} color={master.railcolor} currency={master.currency} price={'200'}></TilePreviewWithIcon>
          </div>
        </div>

        <div className='exprow' ref={chanceRef}>
          <div ref={chestRef}>
            <TilePreviewWithIcon name={master.chance} icon={master.chanceicon} color={master.chancecolor} currency={master.currency} price={''}></TilePreviewWithIcon>
            <TilePreviewWithIcon name={master.chest} icon={master.chesticon} color={master.chestcolor} currency={master.currency} price={''}></TilePreviewWithIcon>
          </div>
        </div>

        <div className='exprow' ref={jailRef}>
          <TilePreviewWithIcon name={master.jail} icon={master.jailicon} color={master.jailcolor} currency={master.currency} price={''}></TilePreviewWithIcon>
          <TilePreviewWithIcon name={"Go to " + master.jail} icon={master.gojailicon} color={master.gojailcolor} currency={master.currency} price={''}></TilePreviewWithIcon>

        </div>

        <div className='exprow' ref={parkingRef}>
          <TilePreviewWithIcon name={"Free " + master.parking} icon={master.parkingicon} color={master.parkingcolor} currency={master.currency} price={''}></TilePreviewWithIcon>
        </div>

        <br>
        </br>
        <h1>-</h1>
      </div>

    </div>
  );
}

export default App;
