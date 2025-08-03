import { useState ,useEffect }   from "react";

function data(){
  return <div>
    <Counter></Counter>
     
  </div>
  
}


function Counter(){
  const [t, setTimer]=useState(0)
  const [stoper, setStop]=useState(false);
  console.log("her i in use main function");
 
  
  useEffect(()=>{

    if (stoper) return;
    
    const clock=setInterval(()=>{
      setTimer(time => time+1)
    },1000)

   
    return(
      ()=>{
         clearInterval(clock);
      }
    )
   

  },[stoper])
  function stop(){
    setStop(true);
    setTimer(0);

  }

  function start(){
    setStop(false);
    
  }


  
  return <div>
    <h1>{t}</h1>
    <button  onClick={stop}>stop </button>
    <button onClick={start}>start</button>
  </div>

}





export default data