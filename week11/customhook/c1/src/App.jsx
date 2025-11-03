import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function useCounter(){
  const [count , setCount]=useState()

 function Increase(){
   setCount(count +1);
 }

  return {
      count: count,
    Increase : Increase
  }

  

  
}

function App() {
  

  return (
    <div className="App"></div>
  )
}

export default App
