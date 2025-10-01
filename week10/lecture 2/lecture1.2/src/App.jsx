import {  createContext, useContext, useState} from "react";

const  SetContext= createContext();
function App() {
  
  

  return (
    <>
   <Parent/>
    </>
    
  )
    

}

function ContextSetr({children}){
  const [count , setCount]=useState(0)

  return (
    <>
    <SetContext.Provider value={{count, setCount}}>
      {children}

    </SetContext.Provider>
    
    </>
  )

}

function Parent() {
  
  

  return (
    <>
    <ContextSetr>

    <Printer/>
    <Increase />
    <Decrese/>
    </ContextSetr>
    </>
    
  )
    

}
function Printer(){
  const {count}=useContext(SetContext);
  return(
    <>
    <h1>Count = {count}</h1>
    </>
  )
}

function Increase(){
  const {count, setCount}=useContext(SetContext);
  return(
    <>
    <button onClick={()=>{setCount(count+1)}}>Increse</button>
    
    </>
  )

}
function Decrese( ){
  const {count, setCount}=useContext(SetContext);
  return (
    <>
    <button onClick={()=>{setCount(count-1)}}>Decrese</button>
    </>
  )
  
}


export default App
