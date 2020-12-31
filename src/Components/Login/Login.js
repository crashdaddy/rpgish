import React, { Component } from 'react'
import './loginRegCSS.css';
import loading from './ajax-loader.gif';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

import {
  TextField,
  Button,
  Container
} from '@material-ui/core'

class Login extends Component {
  state = {
    player: {},
    userName: '',
    loginemail: '',
    loginpassword: '',
    regemail: '',
    regpassword: '',
    loggingIn: false,
    registering: false
  }

  handleTextChange = (e) => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  loginAPI = () => {

    const postData = { playerName: this.state.loginemail, password: this.state.loginpassword };
    const loginUrl = "https://rpgishapi.herokuapp.com/login";

    fetch(loginUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "200") {
         // this.props.sendMessage(`You are logged in as ${data.userName}`)
          this.bake_cookie("player", data.data)
          
        //  this.props.addUser(data)
          this.setState({
            player: data.data,
            loggingIn: false,
            registering: false
          })
        }        
          else {
            //this.props.sendMessage("I'm not finding it")
            console.log("error code", data.code);
          }
      })
      .catch((error) => {
        console.log('Error: ', error);
     //   this.props.sendMessage("Yikes. Check the logs");
      })
  }

  registerUser = () => {

    const postData = { 
      playerName: this.state.userName, 
      playerEmail: this.state.regemail, 
      password: this.state.regpassword, 
      hp: 22,
      con: 19,
      wis: 17,
      dex: 12,
      str: 18,
      int: 19,
      cha: 18,
      xp: 0,
      level: 1,
      gold: 0,
      armor: '',
      armorBonus: 0,
      sword: '',
      swordBonus: 0,
      proficiencyBonus: 2
    };
    const registerUrl = "https://rpgishapi.herokuapp.com/player";
    fetch(registerUrl, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        
        if (data) {
         // this.props.sendMessage(`You are registered as ${this.state.userName}. You can login now!`)
          this.setState({
            loggingIn: false,
            registering: false,
            player: data
          })
        } else {
        if (data.message) {
          console.log(data.message);
        }
      }
      })
      .catch((error) => {
        console.log('Error: ', error);
 
      })
  }

  bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
  }

  login = (e) => {
    e.preventDefault()
    this.setState({
      loggingIn: true
    })

    this.loginAPI();
  }

  register = (e) => {
    e.preventDefault()
    this.setState({
      registering: true
    })

    this.registerUser();
  }

  render() {
    return (
      <div className="loginDiv">

        {this.state.player.playerName ?
          <div style={{ textAlign: 'center' }}>
            <div style={{ textAlign: 'center', fontSize: 'xx-large', marginBottom: '20px' }}>Welcome back, {this.state.player.playerName}<br />
            You've got {this.state.player.playerHP} HitPoints. Let's go adventuring!<br />
            </div>
             <Link to={`/profile/${this.state.player.playerName}`} ><Avatar name={this.state.player.playerName} size={200} /></Link> 
          </div>
          :
          <div style={{width:'80%', display: 'inline-flex', flexDirection: 'row', justifyItems: 'space-around',alignItems:'center' }}>
            <Container maxWidth="sm">
              <form className="login-form" onSubmit={this.login}>
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.email}
                  name="loginemail"
                  label="Email"
                  type="text" />
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.password}
                  name="loginpassword"
                  label="Password"
                  type="password" />
                {this.state.loggingIn ?
                  <img src={loading} alt='' style={{ width: '24px' }} />
                  :
                  ''
                }
                <Button
                  type="submit"
                  className="login-button"
                  variant="contained"
                  color="primary">Login</Button>
              </form>
            </Container>
            <div style={{fontSize:'80px',fontWeight:'bold'}}>
              Or..
            </div>
            <Container maxWidth="sm">
              <form className="reg-form" onSubmit={this.register}>

                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.userName}
                  name="userName"
                  label="Username"
                  type="text" />

                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.email}
                  name="regemail"
                  label="Email"
                  type="email" />
                <TextField
                  required
                  onChange={this.handleTextChange}
                  value={this.state.password}
                  name="regpassword"
                  label="Password"
                  type="password" />
                {this.state.registering ?
                  <img src={loading} alt='' style={{ width: '24px' }} />
                  :
                  ''
                }
                <Button
                  type="submit"
                  className="reg-button"
                  variant="contained"
                  color="primary">Generate Player</Button>
              </form>
            </Container>
          </div>
        }
      </div>
    );
  }
}

export default Login;