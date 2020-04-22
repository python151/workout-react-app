import React from 'react'

export default function(props) {
    let items = [
        "Home",
        "Login"
    ]
    let button = {
        val: "Sign up",
        to: "/Signup",
    }
    if (localStorage.getItem("logged-in")) {
        items = [
            "Dashboard",
            "My Workouts",
            "Logout"
        ]
        button = {
            val: "Home",
            to: "/Home"
        }
    }
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="#"></a>
                {items.map(item => (
                    <a className="p-2 text-dark" href={"/"+item}>{item}</a>
                ))}
            </nav>
            <a className="btn btn-outline-primary" href={button.to}>{button.val}</a>
        </div>
    )
}