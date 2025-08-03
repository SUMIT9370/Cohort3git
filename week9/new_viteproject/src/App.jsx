import { useState ,useEffect }   from "react";

function data(){
  return <div>
    <Counter></Counter>
     
  </div>
  
}


function Counter(){
  const [t, setTimer]=useState(0)
  console.log("we are at main function")
 
  useEffect(()=>{
    console.log("we are at use effect")
    
    console.log("the counter are being mounted")
  })
  
  return <div>
    <h1>{t}</h1>
    
  </div>

}





export default data