import React, {Component} from 'react';
import Axios from 'axios';

class StatsIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: {},
      url: this.props.url        
  }
}

baseURL = "https://www.dnd5eapi.co"
 
getMonsterDetails = () => {
  var self=this;
  let monsterURL = this.baseURL + this.props.url
 Axios.get(monsterURL, {
   "Content-Type": "application/xml; charset=utf-8"
 })
   .then((responseText) => {
        self.setState({monster:responseText.data})
   })
   .catch((e) => {
     console.log(e);
   });
}



componentDidMount() {
    this.getMonsterDetails();
}

componentDidUpdate() {
  this.getMonsterDetails();
}

    render() {
        const monsterData = this.state.monster
        
    return (
      
          <div style={{marginTop:'10px',fontWeight:'bold',marginLeft:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',flexWrap:'wrap',float:'left'}}>
              <div>
              AC: {monsterData && monsterData.armor_class}<br/>
             </div>
             <div>str: {monsterData && monsterData.strength}</div>
             <div>dex: {monsterData && monsterData.dexterity}</div>
             <div>con: {monsterData && monsterData.constitution}</div>
             <div> int: {monsterData && monsterData.intelligence}</div>
             <div>wis: {monsterData && monsterData.wisdom}</div>
             <div> cha:  {monsterData && monsterData.charisma}</div>
             <div style={{marginTop:'10px',fontWeight:'bold'}}>
              HP: {monsterData && monsterData.hit_points}<br/>
              XP: {monsterData && Math.floor(monsterData.xp/4)}
             </div>
           </div>

    )
    }
}

export default StatsIcons

