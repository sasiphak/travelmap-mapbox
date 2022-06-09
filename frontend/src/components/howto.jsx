
import { Cancel } from "@material-ui/icons"
import "./howto.css"
import ReactPlayer from 'react-player'

export default function Howto({setShowhowto}){
      
    return(
        <div className="howtoContainer">
        <div className="logo"><p> ▶▶▶ How to use ◀◀◀  </p></div>
        <div className="video">
            <ReactPlayer url='https://youtu.be/ERCWnmth0g0'   />
        </div>
            <Cancel className="howtoCancel" onClick={()=>setShowhowto(false)}/>
            </div>
    )
}
//https://youtu.be/UQPrDyfdthk
