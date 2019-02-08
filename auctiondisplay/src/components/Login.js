import React, { Component } from 'react';
import axios from "axios";
import './Login.css';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("Inside submit");
        axios({
            method: 'post',
            url: '/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(response => {
			console.log(response);
		});
    }

    render(){
        return(
            <div className="container-fluid" onSubmit={this.handleSubmit}>
                <form className="offset-3 col-sm-6 form">
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input type="text" className="form-control" id="userName" aria-describedby="emailHelp"  name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;