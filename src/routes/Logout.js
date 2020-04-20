import React from 'react'

export default function() {
    localStorage.clear()
    window.location = "/Home"
    return (
        <h1 className="display-4">Redirecting...</h1>
    )
}