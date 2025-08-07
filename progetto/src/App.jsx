import { useState, useEffect } from 'react'
import './App.css'

function App() {
useEffect(() => {
  fetch("http://localhost:3000/aziende/1")
  .then((result)=> result.json())
  .then((data)=> console.log(data))
  .catch((err) => console.error(err))
}, [])
  return (
    <>
     <h1>Sono attivo</h1> 
    </>
  )
}

export default App
