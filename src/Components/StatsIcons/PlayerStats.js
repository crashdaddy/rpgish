import { Height } from '@material-ui/icons';
import React from 'react';

const styleObj = {
    border:'1px solid black',
    borderRadius:'10px',
    fontSize:'xx-large',
    padding:'20px',
    margin:'10px'
}

export default function PlayerStats(props) {

    return(
        <div style={{marginLeft:'auto',marginRight:'auto',width:'50%',display:'inline',display:'flex',flexDirection:'row',justifyContent:'space-around',alignContent:'center'}}>
        <div style={styleObj}>
          HP:<br/>
          {props.player.playerHP}   
        </div>
        <div style={styleObj}>
        Int:<br/>
          {props.player.int}   
        </div>
        <div style={styleObj}>
        Wis:<br/>
          {props.player.wis}   
        </div>
        <div style={styleObj}>
        Dex:<br/>
          {props.player.dex}   
        </div>
        <div style={styleObj}>
            Str:<br/>
          {props.player.str}   
        </div>
        <div style={styleObj}>
        Cha:<br/>
          {props.player.cha}   
        </div>
        <div style={styleObj}>
        Con:<br/>
          {props.player.con}   
        </div>

        </div>
    )

}