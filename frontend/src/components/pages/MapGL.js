import "../map.css";
import '../../App.css';
import '../Table.css';
import PolylineOverlay from "../PolyLine";
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl,FlyToInterpolator } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";

//components
import Register from "../Register";
import Login from "../Login";
import ControlPanel from '../ControlPanel'
import Tablepin from '../TablePin';
import Tablenatural from '../TableNatural';
import Tablehotel from '../TableHotel';
import Tabletemple from '../TableTemple';
import Tableport from '../TablePort';
import Tableairport from '../TableAirport';
import Tablebus from '../TableBus';
import Howto from '../howto'

//icon
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import BeachAccessRoundedIcon from '@material-ui/icons/BeachAccessRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import CommuteRoundedIcon from '@material-ui/icons/CommuteRounded';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
import { BsTable } from "react-icons/bs";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import FlagIcon from '@material-ui/icons/Flag';



function MapGL() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [temples, setTemples] = useState([]);
  const [naturals, setNaturals] = useState([]);
  const [ports, setPorts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [buses, setBuses] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null); 
  const [rating, setRating] = useState(0); 
  const [fileName,setFileName]= useState("");
  const [showControlPanel, setShowControlPanel] = useState(false);  
  const [showRegister, setShowRegister] = useState(false);  
  const [showLogin, setShowLogin] = useState(false);
  const [showtablepin,setShowtablepin]= useState(false);
  const [showtablehotel,setShowtablehotel]= useState(false);
  const [showtablenatural,setShowtablenatural]= useState(false);
  const [showtabletemple,setShowtabletemple]= useState(false);
  const [showtableport,setShowtableport]= useState(false);
  const [showtableairport,setShowtableairport]= useState(false);
  const [showtablebus,setShowtablebus]= useState(false);
  const [showhowto,setShowhowto]= useState(false);
  
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "88.5vh",
    
    latitude: 7.955928898604195, 
    longitude: 98.33681618013172,
    zoom: 10
  });

  const geolocateStyle = {
    top: 5,
    left: 0,
    padding: '10px'
  };
  
  const fullscreenControlStyle = {
    top: 50,
    left: 0,
    padding: '10px'
  };
  
  const navStyle = {
    top: 90,
    left: 0,
    padding: '10px'
  };
  
  const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
  };

  const [RouteCall, SetRouteCall] = useState([])
  const [direction, SetDirection] = useState([])
  const [nameDirection,SetnameDirection] = useState([])
  const start = []
 

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    //setViewport({ ...viewport, latitude: lat, longitude: long });
   // let arr = [...direction]
    
   // SetDirection([...direction,[long,lat]])
  };
  const DirectionSet = (name,lat, long) => {
    //setViewport({ ...viewport, latitude: lat, longitude: long });
    let arr = [...direction]
    let naaa = [...name]
    SetnameDirection([...nameDirection,[name]])
    SetDirection([...direction,[long,lat]])
    console.log(arr);
  };
  
  console.log(nameDirection.length)
  
  const instructions = document.getElementById('instructions');
  const [duration ,setDuration] = useState()
  const listDirections = direction.map((direct,index) => `${direct}${index<direction.length-1 ? ";" :''}` );
  useEffect(() => {
    console.log(direction.length)
    const fetchData = async () => {
      if(direction.length >= 2 ){
        const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${listDirections.join('').toString()}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoibnV0dGhhd2F0IiwiYSI6ImNrcnJuMTF6bDBzam4ybnBvZTUwZnY4eDQifQ.qEC3Kx_q8T2qvcqao5Pkjg`).then(rs=>rs.json()).then(rs=>rs)
        const json = res;
        const data = json.routes[0];
        const ins = json.routes[0].duration;
        const steps = data.legs[0].steps;
        console.log(steps)
        console.log(data)
        let tripInstructions = '';

        const min = ins/60
        const distancetrip = data.distance/1000;
        console.log('distance =' + distancetrip.toFixed(2) + 'Km')
        console.log(min.toFixed(0)+' minutes')
        //for (const step of steps) {
         // tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        //}
        //instructions.innerHTML = `<p><strong>Trip duration: ${min.toFixed(0)} minutes 🚴 Trip Distance : ${distancetrip.toFixed(2)} Km.  </strong></p><ol>${tripInstructions}</ol>`;
        const route = data.geometry.coordinates;
        SetRouteCall(route);
        const test = ['a','b']
        for (const x of nameDirection){
          tripInstructions += `<li>${x}</li>`;
        }
        instructions.innerHTML = `<p><strong>Trip duration: ${min.toFixed(0)} minutes 🚴 Trip Distance : ${distancetrip.toFixed(2)} Km.  </strong></p><ol>${tripInstructions}</ol>`;
      }
        // const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${direction.start.toString()};${direction.end.toString()}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoibnV0dGhhd2F0IiwiYSI6ImNrcnJuMTF6bDBzam4ybnBvZTUwZnY4eDQifQ.qEC3Kx_q8T2qvcqao5Pkjg`).then(rs=>rs.json()).then(rs=>rs);
        // SetDirection(res.data);
      
    };
    fetchData();
  }, [direction]);

  function Clear_Place(){
    SetDirection([]);
    SetRouteCall([]);
    SetnameDirection([])
    instructions.innerHTML = ``;
  };


  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const res = await axios.get("/hotels");
        setHotels(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getHotels();
  }, []);

  useEffect(() => {
    const getTemples = async () => {
      try {
        const res = await axios.get("/temples");
        setTemples(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getTemples();
  }, []);

  useEffect(() => {
    const getNaturals = async () => {
      try {
        const res = await axios.get("/naturals");
        setNaturals(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getNaturals();
  }, []);


  useEffect(() => {
    const getPorts = async () => {
      try {
        const res = await axios.get("/ports");
        setPorts(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getPorts();
  }, []);

  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await axios.get("/airports");
        setAirports(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getAirports();
  }, []);

  useEffect(() => {
    const getBuses = async () => {
      try {
        const res = await axios.get("/buses");
        setBuses(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getBuses();
  }, []);

//เรียกจุดล่าสุด
const getPins= async ()=>{
  try{
      const res =await axios.get("/pins");
      setPins(res.data);
  }catch(err){
      console.log(err);
  }
}

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData =new FormData();
    formData.append("username",currentUsername);
    formData.append("title",title);
    formData.append("desc",desc);
    formData.append("rating",rating);
    formData.append("lat",newPlace.lat);
    formData.append("long",newPlace.long);
    formData.append("pinImage",fileName);

    try {
      const res = await axios.post("/pins", formData);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  

  
  //ฟังก์ชันลบจุด
  const onDelete= (id) =>{
    axios.delete(`/pins/delete/${id}`).then((res) => {
      alert("Successfully deleted");
      getPins();
    });
  };

  const onChangFile = (e)=>{
    setFileName(e.target.files[0]);  
  };
  const onSelectCity = () => {
    setViewport({
      ...viewport,
      latitude: 7.955928898604195, 
      longitude: 98.33681618013172,
      zoom: 10,
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto'
    });
  };

  return ( 

  <div className="MapGL">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/nutthawat/cksaol7s79asa18qqd20o0kg3"
      onDblClick = {handleAddClick}
      transitionDuration = "100"
    >
          <PolylineOverlay points={RouteCall} />
          <div id="instructions">

          </div>
    {/*"Pin point Start"*/}
      {pins.map(p=>(
        <>
        <div>
      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
      <button  className="button-fly" onClick={onSelectCity}>
      <FlightTakeoffIcon style={{ fontSize: 15 }}></FlightTakeoffIcon>
      </button>
      </div>
      
          <button className="button-ControlPanel" 
            onClick={()=>setShowControlPanel(true)}
            >Legend
          </button>
          <button className="button-clear" onClick={Clear_Place}>
            Clear
          </button>
          
      <Marker 
        latitude={p.lat}  
        longitude={p.long} 
        offsetLeft={-viewport.zoom * 1} 
        offsetTop={-viewport.zoom * 1}
        >
        <Room
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
          </Marker>
          {p._id === currentPlaceId && (
         <Popup
         className="mappopup"
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
         
         <div className="cardPins">
                  <label>Place</label>
                  <h4 className="placePins">{p.title}</h4>
                  
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                 <img src={`/uploads/${p.pinImage}`} alt="..." style={{margin:"0 auto",width:"50%",height:"30%",display:"flex"}} />
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                  <div>
                  <button className="button-Direction" onClick={() => {DirectionSet(p.title,p.lat, p.long);setCurrentPlaceId(null)}}>
                  Set direction
                  </button>
                  </div>
                  {p.username === currentUsername ?
                  
                  
    // ปุ่มคอนเฟริมลบ //<DeleteOutlineIcon  style={{color:"#FFFFFF", fontSize: 25 }}/>
      (
      <div>
    
        <button className="buttonDelete"onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you want to delete this point.?"
                          )
                          if (confirmBox === true) {
                            onDelete(p._id)
                          }
                        }} > Delete </button>
    </div>
    ): 
    ( 
    <div>
    </div>
    )} 
   </div>

      </Popup>
        )}
        </>
        ))}
        {/*"Pin point End"*/}

        {/*"naturals point Start"*/}
        {naturals.map(naturals =>(
          <>
          <Marker
          latitude={naturals.long}  
          longitude={naturals.lat} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <BeachAccessRoundedIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#3399FF",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(naturals._id, naturals.long, naturals.lat)}
              />
          </Marker>
          {naturals._id === currentPlaceId && (
          <Popup
          className="mappopup"
          latitude={naturals.long}
          longitude={naturals.lat}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardNaturals">
                  <label>Place</label>
                  <h4 className="placeTrans"><b>NameTH:</b> {naturals.namenatth}</h4>
                  <h4 className="placeTrans"><b>NameEN:</b> {naturals.namenat}</h4>
                  <label>Description</label>
                  <p className="desc">{naturals.description}</p>
                  <img src={`/Natural/${naturals.idnatural}.jpg`} alt="..." style={{margin:"0 auto",width:"80%",height:"70%",display:"flex"}} />
                  <div>
                  <button className="button-Direction" onClick={() => {DirectionSet(naturals.namenatth,naturals.long, naturals.lat);setCurrentPlaceId(null)}}>
                  Set direction</button>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
        {/*"naturals point End"*/}
        {/*{direction.map(
    d => (
      <Marker 
        latitude={d[1]}  
        longitude={d[0]}
        offsetLeft={-viewport.zoom * 1} 
        offsetTop={-viewport.zoom * 1}
        >
        <Room
                style={{
                  fontSize: 3 * viewport.zoom,
                  color:"green",
                  cursor: "pointer"
                }}
              />
          </Marker>
        
    )
    
              )}*/}
  
  {direction.map(d =>(
          <>
          <Marker
          latitude={d[1]}  
          longitude={d[0]} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
         <FlagIcon
                style={{
                  fontSize: 2 * viewport.zoom,
                  color:"#0033FF",
                  cursor: "pointer"
                }}
              />
          </Marker>
          {/*<Popup
          className="mappopup"
          latitude={d[1]}
          longitude={d[0]}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardHotels">
                  <label>{nameDirection}</label>
                </div>
          </Popup>*/}
          
          </>
        ))}
        {/*"hotels point End"*/}
        {/*"hotels point Start"*/}
        {hotels.map(hotels =>(
          <>
          <Marker
          latitude={hotels.lat}  
          longitude={hotels.long} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <HotelIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#8bc34a",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(hotels._id, hotels.lat, hotels.long)}
              />
          </Marker>
          {hotels._id === currentPlaceId && (
          <Popup
          className="mappopup"
          latitude={hotels.lat}
          longitude={hotels.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardHotels">
                  <label>Place</label>
                  <h4 className="placeHotels"><b>NameTH:</b> {hotels.namehotelth}</h4>
                  <h4 className="placeHotels"><b>NameEN:</b> {hotels.namehotelen}</h4>
                  <label>Address</label>
                  <p className="desc">{hotels.address}</p>
                  <label>Review</label>
                  <p className="desc">{hotels.description}</p>
                  <label>Grade</label>
                  <div className="stars">
                    {Array(hotels.grade).fill(<Star className="star" />)}
                  </div>
                  <label>Price</label>
                  <p className="desc">{hotels.price}</p>
                  <label>Contact</label>
                  <p className="desc">{hotels.tel}</p>
                  <div>
                  <img src={`/Hotel/${hotels.idhotel}.jpg`} alt="..." style={{margin:"0 auto",width:"90%",height:"50%",display:"flex"}} />
                  <button className="button-Direction" onClick={() => {DirectionSet(hotels.namehotelth,hotels.lat,hotels.long);setCurrentPlaceId(null)}}>Set direction</button>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
        {/*"hotels point End"*/}

        {/*"temples point Start"*/}
        {temples.map(temples =>(
          <>
          <Marker
          latitude={temples.long}  
          longitude={temples.lat} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <AccountBalanceRoundedIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#ffc107",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(temples._id, temples.long, temples.lat)}
              />
          </Marker>
          {temples._id === currentPlaceId && (
          <Popup
          className="mappopup"
          latitude={temples.long}
          longitude={temples.lat}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardTemples">
                  <label>Place</label>
                  <h4 className="placeTemples"><b>NameTH:</b> {temples.nametemth}</h4>
                  <h4 className="placeTemples"><b>NameEN:</b> {temples.nametemen}</h4>
                  <label>Description</label>
                  <p className="desc">{temples.description}</p>
                  <label>Address</label>
                  <p className="desc">{temples.address}</p>
                  <label>Business hours</label>
                  <p className="desc">{temples.businesshours}</p>
                  <label>Contact</label>
                  <p className="desc">{temples.tel}</p>
                  <img src={`/Temple/${temples.idtemple}.jpg`} alt="..." style={{radius: "10px", margin:"0 auto",width:"70%",height:"60%",display:"flex"}} />
                  <div>
                  <button className="button-Direction" onClick={() => {DirectionSet(temples.nametemth,temples.long, temples.lat);setCurrentPlaceId(null)}}>Set direction</button>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
        {/*"temples point End"*/}

        {/*"ports point Start"*/}
            {ports.map(ports =>(
          <>
          <Marker
          className="mappopup"
          latitude={ports.lat}  
          longitude={ports.long} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <DirectionsBoatIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#777777",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(ports._id, ports.lat, ports.long)}
              />
          </Marker>
          {ports._id === currentPlaceId && (
          <Popup class = "cardTrans"
          latitude={ports.lat}
          longitude={ports.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardTrans">
                  <label>Place</label>
                  <h4 className="placeTrans"><b>NameTH:</b> {ports.nameportth}</h4>
                  <h4 className="placeTrans"><b>NameEN:</b> {ports.nameporten}</h4>
                  <label>Description</label>
                  <p className="desc">{ports.description}</p>
                  <label>Price</label>
                  <p className="desc">{ports.price}</p>
                  <div>
                  <img src={`/Port/${ports.idport}.jpg`} alt="..." style={{margin:"0 auto",width:"70%",height:"50%",display:"flex"}} />
                  <div>
                  <button className="button-Direction" onClick={() => {DirectionSet(ports.nameportth,ports.lat,ports.long);setCurrentPlaceId(null)}}>Set direction</button>
                  </div>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
      
        {/*"ports point End"*/}

        {/*"airports point Start"*/}
        {airports.map(airports =>(
          <>
          <Marker
          className="mappopup"
          latitude={airports.lat}  
          longitude={airports.long} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <LocalAirportIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#777777",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(airports._id, airports.lat, airports.long)}
              />
          </Marker>
          {airports._id === currentPlaceId && (
          <Popup class = "cardTrans"
          latitude={airports.lat}
          longitude={airports.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardTrans">
                  <label>Place</label>
                  <h4 className="placeTrans"><b>NameTH:</b> {airports.nameairportth}</h4>
                  <h4 className="placeTrans"><b>NameEN:</b> {airports.nameairporten}</h4>
                  <label>Description</label>
                  <p className="desc">{airports.description}</p>
                  <div>
                  <img src={`/Airport/${airports.idairport}.jpg`} alt="..." style={{margin:"0 auto",width:"90%",height:"50%",display:"flex"}} />
                  <button className="button-Direction" onClick={() => {DirectionSet(airports.nameairportth,airports.lat, airports.long);setCurrentPlaceId(null)}}>Set direction</button>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
      
        {/*"airports point End"*/}

          {/*"buses point Start"*/}
          {buses.map(buses =>(
          <>
          <Marker
          className="mappopup"
          latitude={buses.lat}  
          longitude={buses.long} 
          offsetLeft={-viewport.zoom * 1} 
          offsetTop={-viewport.zoom * 1}
          >
          <CommuteRoundedIcon
                style={{
                  fontSize: 1.5 * viewport.zoom,
                  color:"#777777",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(buses._id, buses.lat, buses.long)}
              />
          </Marker>
          {buses._id === currentPlaceId && (
          <Popup 
          className="mappopup"
          latitude={buses.lat}
          longitude={buses.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
          onClose={() => setCurrentPlaceId(null)}>
          
          <div className="cardTrans">
                  <label>Place</label>
                  <h4 className="placeTrans"><b>NameTH:</b> {buses.namebusth}</h4>
                  <h4 className="placeTrans"><b>NameEN:</b> {buses.namebusen}</h4>
                  <label>Description</label>
                  <p className="desc">{buses.description}</p>
                  <img src={`/Bus/${buses.idbus}.jpg`} alt="..." style={{margin:"0 auto",width:"90%",height:"50%",display:"flex"}} />
                  <div>
                  <button className="button-Direction" onClick={() => {DirectionSet(buses.namebusth,buses.lat,buses.long);setCurrentPlaceId(null)}}>Set direction</button>
                  </div>
                </div>
          </Popup>
          )}
          </>
        ))}
      
        {/*"buses point End"*/}
        
      {/*"เข้าถึงแค่ข้อมูลของผู้ใช้ , หลังล็อคอินถึงจะแสดงช่องเพิ่มข้อมูล*/ } 
  {currentUsername ?(
  <div>
    {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"  
        onClose={() => setNewPlace(null)}>
          <div>
            <form onSubmit = {handleSubmit}>
              <label>Title</label>
              <input placeholder = "Enter a title" onChange={(e) => setTitle(e.target.value)}></input>
              <label>Review</label>
              <textarea placeholder = "Say us something about this place." onChange={(e) => setDesc(e.target.value)}></textarea>
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value = "0">-</option>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
              </select>
              <div className="form-group">
            <label htmlFor="file">Choose image</label>
            <input type="file" filename="pinImage" 
            onChange={onChangFile}
              />
            </div>
          <button className="submitButton" type="submit">Add Pin</button>
            </form>
          </div>
        </Popup>
        )}
  </div>
):(
  //ถ้าไม่ล็อกอินแสก DIV ว่าง //ก่อนล็อกอิน 
<div>

</div>
)}
        
        {currentUsername ? (
          <>

<div class="dropdown">
  <button onclick="myFunction()" class="dropbtn"><BsTable style={{ fontSize: 15 }}></BsTable ></button>
  <div id="myDropdown" class="dropdown-content">
  <a onClick={()=>setShowtablepin(true)}>Table Pin</a>
  <a onClick={()=>setShowtablehotel(true)}>Table Hotel</a>
  <a onClick={()=>setShowtablenatural(true)}>Table Natural</a>
  <a onClick={()=>setShowtabletemple(true)}>Table Temple</a>
  <a onClick={()=>setShowtableport(true)}>Table Port</a>
  <a onClick={()=>setShowtableairport(true)}>Table Airport</a>
  <a onClick={()=>setShowtablebus(true)}>Table Bus</a>
  </div>
</div>
         
         
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
          
          <button className="button nameuser" >
            Username : {currentUsername}
          </button>
  
          </>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            > Register
            </button>
            <button className="button-howto" 
            onClick={()=>setShowhowto(true)}>
            <WbIncandescentIcon style={{fontSize: 15 }}></WbIncandescentIcon>
            </button>

          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
       
       {showLogin && (<Login 
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}/>
        )}
        {showhowto && <Howto setShowhowto={setShowhowto}/>}
        {showtablepin && <Tablepin setShowtablepin={setShowtablepin}/>}
        {showtablehotel && <Tablehotel setShowtablehotel={setShowtablehotel}/>}
        {showtablenatural && <Tablenatural setShowtablenatural={setShowtablenatural}/>}
        {showtabletemple && <Tabletemple setShowtabletemple={setShowtabletemple}/>}
        {showtableport && <Tableport setShowtableport={setShowtableport}/>}
        {showtableairport && <Tableairport setShowtableairport={setShowtableairport}/>}
        {showtablebus && <Tablebus setShowtablebus={setShowtablebus}/>}
        {showControlPanel && <ControlPanel setShowControlPanel={setShowControlPanel}/>}
      </ReactMapGL>
    </div>

  );
}

export default MapGL;