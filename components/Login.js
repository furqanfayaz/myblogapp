import { Component } from "react";
import Link from 'next/link';
import Router from 'next/router';
import "../styles/styles.css";
import { login } from "../apis/Authapis";
import cookie from "js-cookie";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
        }
    }
    handleClick = async () => {
        const { email, password } = this.state;
        const body = { email, password };
        try {
            const res = await login(body);
            if (res.data.success) {
                Router.push("/bloglist");
            } 
            const token = res.data.token;
            cookie.set('token', token);

        } catch (err) {
            console.log(err);
        }
        }
        
    

    render () {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1> Login </h1>
                <div>
                    <label for="email">Email:</label> 
                    <input 
                        onChange={(e) => {this.setState({email: e.target.value})}} 
                        value={this.state.email} 
                        type="text" 
                        id="email"
                    />
                </div>
                <div>
                    <label for="password">Password:</label>    
                    <input
                        onChange={(e) => {this.setState({password: e.target.value})}} 
                        value={this.state.password} 
                        type="password" id="password"
                    />
                </div>
                <button
                    onClick={this.handleClick}
                >
                    Login
                </button>
                <Link href="/signup">
                    <a>Signup here</a>
                </Link>
                
            </div>

        )
    }
};


export default Login;