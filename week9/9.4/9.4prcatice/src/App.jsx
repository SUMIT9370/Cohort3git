import { useState } from 'react'

const App =()=>{
  return(
    <div>
        <CARD>
          <h1>hi</h1>
          This is some content useImperativeHandle

        </CARD>

        <CARD>
          <h1>
            Second 

          </h1>
          this is second card component
        </CARD>
     
    </div>
  )
}

const CARD =({children})=>{
  return(
    <div style={{border:"1px, solid #ccc",borderRadius:"5px",
      padding:'20px', margin:'10px', boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',
    }}>
    
      {children}
    </div>
  )
}


export default App
