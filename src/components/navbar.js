import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar" >
                <h4 className="navbar-brand" >LE NOUVEL HEDONISME</h4>
                <div className="navbar-menu" >
                    <NavLink to="/" >Nuevo</NavLink>
                    <NavLink to="/notas" >Notas</NavLink>
                    <NavLink to="/contacto" >Contacto</NavLink>
                </div>
            </div>
        )
    }
}

export default Navbar;