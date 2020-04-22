import React from 'react';
import '../static/login.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }

    handleLoginResponse = (response) => {
        if (response.success) {
            localStorage.setItem("session-key", response.sessionKey)
            localStorage.setItem("logged-in", true)
            window.location = "/Dashboard";
        }
        alert(response.success)
    }

    login = () => {
        let username = document.getElementById("inputUsername").value;
        let password = document.getElementById("inputPassword").value;

        let values = `?username=${username}&password=${password}`

        fetch("https://workoutapi.pythonanyehere.com/login/"+values)
        .then(response => response.json())
        .then(response => this.handleLoginResponse(response))
    }

    render() {
        return (
            <div className="text-center">
                <div className="form-signin">
                    <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    
                    <label for="inputUsername" className="sr-only">Username</label>
                    <input type=" text" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
                    
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    
                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.login}>Sign in</button>
                    
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                </div>
            </div>
        )
    }
}