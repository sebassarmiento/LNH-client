import React, { Component } from 'react';
import '../css/login.css';
import NewPost from '../components/newPost';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin(){
        if(this.state.invalidData){
            this.setState({invalidData: false})
        }
        if(this.state.username.length > 1 && this.state.password.length > 1){
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(d => d.json())
            .then(res => {
                console.log(res)
                if(res.message === 'Login failed'){
                    this.setState({invalidData: true})
                }
                if(res.message === 'Login successfull'){
                    this.setState({logged: true})
                }
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            this.setState({invalidData: true})
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            this.state.logged ? <NewPost username={this.state.username} password={this.state.password} /> :
            <div className="login-container" >
                <h1>Administrador</h1>
                <input onChange={(e) => this.handleChange(e)} name="username" value={this.state.username} placeholder="Usuario" type="text" />
                <input onChange={(e) => this.handleChange(e)} name="password" value={this.state.password} placeholder="Contrasenia" type="password" />
                <button onClick={() => this.handleLogin()} className="login-btn" >Entrar</button>
                {this.state.invalidData ? <h4 className="invalid-login" >Datos invalidos</h4> : null}
            </div>  
        )
    }
}

export default Login;