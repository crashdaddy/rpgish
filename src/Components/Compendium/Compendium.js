import React, {Component} from 'react';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import StatsIcons from '../StatsIcons/StatsIcons'

class Compendium extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      challenge_rating: 1
  }
}

 baseURL = "https://www.dnd5eapi.co/api/monsters/";


 // far left sources
getMonsters = () => {
  var self=this;
  let monsterURL = this.baseURL
  if (this.state.challenge_rating !== '') {
    monsterURL += "?challenge_rating=" + this.state.challenge_rating
  }
 Axios.get(monsterURL, {
   "Content-Type": "application/xml; charset=utf-8"
 })
   .then((responseText) => {
        self.setState({monsters:responseText.data.results})
   })
   .catch((e) => {
   //  this.setState({ error: e.toJSON() })
     console.log(e);
   });
}


changeLevel = () => {
  let oldLevel = this.state.challenge_rating;
  let newLevel = oldLevel + 1;
  if (newLevel > 20) {newLevel=1}
  
  this.setState({
    challenge_rating: newLevel
  },this.getMonsters);
}

componentDidMount() {
this.getMonsters()
}

    render() {
     const monsters = this.state.monsters
     console.log(this.state.challenge_rating)
    return (
      
          <div style={{marginTop:'60px',width:"90%",marginRight:'auto',marginLeft:'auto',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
            {monsters && monsters.map(monster => {
              if (monster.name==="Succubus/Incubus") {monster.name="Succubus (Incubus)"}
              return(
            <Paper elevation={3} style={{margin:'20px',fontSize:'large',verticalAlign:'top',padding:'10px'}}>
             <a href={`https://www.dnd5eapi.co${monster.url}`} target="blank">{monster.name}</a>
             <br/> <img src={`../Tokens/${monster.name}.png`} alt={monster.name} style={{marginTop:'10px',width:'200px',float:'left'}} />
             <StatsIcons url={monster.url}  />
            </Paper> 
            
            )}  )   
            }
            <p/>
            <button onClick={this.changeLevel} style={{marginLeft:'auto',marginRight:'auto',clear:'both',width:'50%',height:'60px',marginTop:'40px',backgroundColor:'blue',color:'yellow'}}>{this.state.challenge_rating || "All"}</button>
             </div>

    )
    }
}

export default Compendium