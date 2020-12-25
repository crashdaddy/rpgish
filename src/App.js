import React, {Component} from 'react';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import StatsIcons from './Components/StatsIcons/StatsIcons'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      challenge_rating: '?challenge_rating=1'
    
  }
}

 baseURL = "https://www.dnd5eapi.co/api/monsters/";


 // far left sources
getMonsters = () => {
  var self=this;
  let monsterURL = this.baseURL
  if (this.state.challenge_rating !== '') {
    monsterURL += this.state.challenge_rating
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
  let newLevel = getRandomInt(1,20)
  let levelText = "?challenge_rating=" + newLevel;
  this.setState({
    challenge_rating: levelText
  },this.getMonsters);
}

componentDidMount() {
this.getMonsters()
}

    render() {
     const monsters = this.state.monsters
    return (
      
          <div style={{width:"90%",marginRight:'auto',marginLeft:'auto',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
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

export default App

