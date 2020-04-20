import React from 'react'

export default function(props) {
    return (
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <img className="mb-2" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24" />
            <small className="d-block mb-3 text-muted">&copy; 2017-2019</small>
          </div>
          <div className="col-6 col-md">
            <h5>API</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="#">Admin Login</a></li>
              <li><a className="text-muted" href="#">Documentation</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Other</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="/Admin">Admin</a></li>
            </ul>
          </div>
        </div>
      </footer>
    )
}