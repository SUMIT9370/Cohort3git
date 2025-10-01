import {  useState} from "react";


function App() {
  const [count, setCount]= useState(0)
  

  return (
    <>
    <Printer count ={count}/>
    <Increase count ={count} setCount={setCount} />
    <Decrese count ={count} setCount={setCount}/>
    </>
    
  )
    

}




function Printer({count}){
  return(
    <>
    <h1>Count = {count}</h1>
    </>
  )
}

function Increase({setCount, count}){
  return(
    <>
    <button onClick={()=>{setCount(count+1)}}>Increse</button>
    
    </>
  )

}
function Decrese( {setCount, count}){
  return (
    <>
    <button onClick={()=>{setCount(count-1)}}>Decrese</button>
    </>
  )
  
}


export default App
