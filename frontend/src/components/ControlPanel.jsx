import * as React from 'react';
import './ControlPanel.css';
import BeachAccessRoundedIcon from '@material-ui/icons/BeachAccessRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import CommuteRoundedIcon from '@material-ui/icons/CommuteRounded';
import HotelIcon from '@material-ui/icons/Hotel';
import Room  from "@material-ui/icons/Room";
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import { Cancel } from "@material-ui/icons"
import FlagIcon from '@material-ui/icons/Flag';

function ControlPanel({setShowControlPanel}) {
  return (
    <div className="control-panel">
      <p style={{color:"Gray"}} ><b>คำอธิบายสัญลักษณ์แหล่งท่องเที่ยว (Legend)</b></p>
      <p><BeachAccessRoundedIcon  style={{color:"#3399FF"}}/> แหล่งท่องเที่ยวธรรมชาติ (Natural) </p>
      <p><AccountBalanceRoundedIcon style={{color:"#ffc107"}}/> วัด (Temple) </p>
      <p><HotelIcon style={{color:"#8bc34a"}}/> โรงแรม (Hotel) </p> 
      <p><CommuteRoundedIcon style={{color:"#777777"}}/> สถานีขนส่งทางบก (Bustation) </p>
      <p><DirectionsBoatIcon style={{color:"#777777"}}/> ท่าเรือ (Port) </p>
      <p><LocalAirportIcon style={{color:"#777777"}}/> สนามบิน (Airport) </p>
      <p><Room style={{color:"red"}}/> หมุดของคุณ (Your Pin)  </p>
      <p><Room style={{color:"slateblue"}}/> สถานที่แนะนำ(Recommended place) </p>
      <p><FlagIcon style={{color:"#0033FF"}}/> จุดที่เลือกค้นหาเส้นทาง </p>
      <Cancel className="tableCancel" onClick={()=>setShowControlPanel(false)}/>
      
    </div>
    
  );
}

export default React.memo(ControlPanel);