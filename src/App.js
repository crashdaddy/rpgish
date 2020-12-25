import React, {Component} from 'react';
import Axios from 'axios';

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
    
  }
}

 monsterURL = "https://www.dnd5eapi.co/api/monsters/";


 // far left sources
getMonsters = () => {
  var self=this;
 Axios.get(this.monsterURL, {
   "Content-Type": "application/xml; charset=utf-8"
 })
   .then((responseText) => {
        console.log(responseText)
        self.setState({monsters:responseText.data.results})
   })
   .catch((e) => {
   //  this.setState({ error: e.toJSON() })
     console.log(e);
   });
}


componentDidMount() {
this.getMonsters()
}

    render() {
     const monsters = this.state.monsters
     console.log(monsters)
    return (
      
          <div style={{width:"90%",marginRight:'auto',marginLeft:'auto',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap'}}>
            {monsters && monsters.map(monster => 
            <div style={{display:'inline-block',margin:'5px'}}>
              {monster.name}
            </div> 
            )

            }
             </div>
    
    )
    }
}

export default App

