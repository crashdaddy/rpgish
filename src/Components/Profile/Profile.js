import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar';


class Profile extends Component {

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
       
        }
      }

    render(){
        return(
            <div>
                <Avatar name={this.props.match.params.playerName} size={200} />
            </div>
        )
    }
}

export default Profile

