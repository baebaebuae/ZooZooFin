// import { useState } from 'react'

import { Routes, Route, Link } from 'react-router-dom'


function App() {

  return (
    <>


    <h1>ZooZooFin 시작 ~</h1>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {/* <Link to="/mission">Today's Mission</Link> */}
          <Link to="/map">Map</Link>
          {/* <Link to="/turn">Current Turn</Link> */}
        </nav>
        
        <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/map" element={<Map/ >} />
        </Routes>
        </div>
    </>
  )
}

function Home(){
  return <h1>Home Page</h1>
}

function Map(){
  return <h1>Map</h1>
}

export default App
