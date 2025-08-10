import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter,Route,Routes ,Links } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/11th' element={{c11th}}>

    
    </Routes>
    
    
    </BrowserRouter>  
  )
}
function c11th(){
  return (<>
  <h1>11th Class</h1>
  <p>Welcome to the 11th class page!</p>
  </>)
}

export default App
