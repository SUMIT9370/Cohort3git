import { useState } from 'react'
import { useEffect }  from 'react';

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  function increment(){
    setCount(counter => counter +1);
  }
  useEffect(()=>{
    console.log("component mounted");
    setInterval(increment,1000);

  },[])

  


  return (
    <div>{count}</div>   
  )
}

export default App
