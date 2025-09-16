function App() {
  return (
    <div style={{backgroundColor:"beige" ,height:"100%", display: "flex", alignItems:"center",flexDirection:"column"}}>

      <Posts />
      <Posts/>
    </div>
  );
}
const pile={
  height:"100px",
  width:"150px", border:"0.5px solid black", margin:"5px", marginTop:"5px",display:"flex",  borderRadius:"3px",
  backgroundColor:"white"
}

function Posts() {
  return (
    <div>
      <div style={pile}>
        <div style={{ display: "flex",height:"30px" , width:"100%",border:"0.7px,solid"}}>
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQHpK-QaiiWSYg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1706842216401?e=1761177600&v=beta&t=LfcAGP1-I2O1611vCUtL3ZqacWGz_yTQUmLznE3LnKI"
            alt=""
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "7px" }}>
            <p style={{ fontSize: "7px", fontWeight: "bold", margin: 0 }}>Vijay A Patil</p>
            <p style={{ fontSize: "3px", margin: "2px" }}>DEVOPS at infosys</p>
             <p style={{ fontSize: "3px", margin: "2px", marginTop:"0px" }}>on 7.30pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
