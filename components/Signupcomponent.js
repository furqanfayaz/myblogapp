import { Component } from "react";
import Router from 'next/router';
import { signup } from "../apis/Authapis";

class Sign extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
        }
    };

    handleClick = async () => {
        const { email, password, name } = this.state;
        const body = { email, password, name };
        try {
            const res = await signup(body);
            if (res.data.success) {
                Router.push("/");
            }

        } catch (err) {
            console.log(err);
        }
        }

    render () {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1> Signup </h1>
                <div>
                    <label for="name">Name:</label> 
                    <input 
                        onChange={(e) => {this.setState({name: e.target.value})}} 
                        value={this.state.name} 
                        type="text" 
                        id="name"
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
                <div>
                    <label for="email">Email:</label>    
                    <input
                        onChange={(e) => {this.setState({email: e.target.value})}} 
                        value={this.state.email} 
                        type="text" id="password"
                    />
                </div>
                <button
                    onClick={this.handleClick}
                >
                    Signup
                </button>
                
            </div>

        )
    }
    

};
export default Sign;

