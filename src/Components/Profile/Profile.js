import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar';
import PlayerStats from '../StatsIcons/PlayerStats';

class Profile extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            player: {},
            userName: '',
            loginemail: '',
            loginpassword: '',
            regemail: '',
            regpassword: '',
            loggingIn: false,
            registering: false
          }
      }
  
    
    read_cookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
      }

    componentDidMount = () => {
        let player={};
        let legit = false;
        if (this.read_cookie("player")) {
        player = this.read_cookie("player");
        console.log("player",player)
        legit=true
        this.setState({
            player: player
        })
        }
      }

    render(){
        return(
            <div>
                <Avatar name={this.props.match.params.playerName} size={200} />
                {this.state.player.playerName && 
                <div>
                      <PlayerStats player={this.state.player} style={{width:'50%'}}/>
                </div>
                }
            </div>
        )
    }
}

export default Profile

