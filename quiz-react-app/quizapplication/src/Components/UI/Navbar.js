import React from 'react'
import 
  {
     NavLink
  } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home Page</NavLink>
                       </li>
                       <li className="nav-item">
                            <NavLink className="nav-link" to="/quiz">Crud Quiz</NavLink>
                       </li>
                     </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar