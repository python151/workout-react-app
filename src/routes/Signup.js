import React from 'react';
import '../static/signup.css'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSignupResponse = (response) => {
        if (response.success) {
            localStorage.setItem("session-key", response.sessionKey)
            localStorage.setItem("logged-in", true)
            window.location = '/Dashboard'
        }
    }

    signup = () => {
        let firstName = document.getElementById("firstName").value
        let lastName = document.getElementById("lastName").value

        let username = document.getElementById("username").value
        let email = document.getElementById("email").value

        let password = document.getElementById("password").value

        fetch("https://workoutapi.pythonanywhere.com/signup/", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
            })
        })
        .then(response => response.json())
        .then(response => this.handleSignupResponse(response))
    }

    render() {
        return (
            <div className="text-center">
                <div className="row text-center">
                    <div className="col-md-8 order-md-1 text-center">
                        <div className="needs-validation form" novalidate>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName"  required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                            </div>

                            <div className="mb-3">
                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="password123" />
                            </div>

                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="button" onClick={this.signup}>Signup</button>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}