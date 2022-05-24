import './App.css';
import Maker from './pages/Maker';
import About from './pages/About';
import React, { useState, useEffect } from 'react'



function App() {


  const [selected, setSelected] = useState("Maker");


  return (
    <>
    {selected === "Maker" && <Maker setPage={setSelected} />}
    {selected === "About" && <About setPage={setSelected} />}

    </>
  );
}

export default App;
