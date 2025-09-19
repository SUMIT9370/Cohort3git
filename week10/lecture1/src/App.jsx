import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link , useNavigate , Outlet} from "react-router-dom"

function App() {
 

  return (
    <BrowserRouter>
    <Link to ="/">homepage</Link>
    <br />
    <Link to ="/neet">neet</Link>
    <br />
    <Link to ="/jee">jee</Link>
    <br />
      <Routes>
        <Route path='/' element={<Upper/>}>
        
        
        <Route path='/' element={<Homepage />} />
        <Route path='/neet' element={<Neet />} />
        <Route path='/jee' element={<Jee />} />
        <Route path='*' element={<ErrorPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
function Upper(){
  return(
    <div style={{backgroundColor:"blue",color:"white",padding:"10px"}}>
      
      <Outlet/> 
      </div>
  )
}
  


function ErrorPage() {
  return <>you are in wrong route</>
}

function Homepage() {
  return (
    <h1>you are in homepage</h1>
  )
}

function Neet() {
  const navigate = useNavigate();
  setTimeout(()=>{
    navigate("/")
  },5000)
  return (
    <h1>you are in neet section</h1>
  )
}

function Jee() {
  return (
    <h1>you are in jee section</h1>
  )
}

export default App
