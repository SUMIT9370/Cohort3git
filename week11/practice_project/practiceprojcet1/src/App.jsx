import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function useCounter(){
  cosnt [ count, setCount]= useState(0);

  function Increase(){
    setCount(count+1);
  }

  return {
    count: count,
  Increase: Increase
  }
  
}

function App() {
  cosnt [data , setData]= useCounter();
  return (
    <>
     <button>hi there</button>
    
      
    </>
  )
}

export default App
