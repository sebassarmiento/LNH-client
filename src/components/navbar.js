import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';
import MobileMenu from '../components/mobileMenu';

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="navbar" >
                <h4 className="navbar-brand" >LE NOUVEL HEDONISME</h4>
                <i onClick={() => this.setState({mobileMenu: true})} class="fas fa-bars navbar-hamburger"></i>
                <div className="navbar-menu" >
                    <NavLink to="/" >Nuevo</NavLink>
                    <NavLink to="/notas/gastronomia" >Notas</NavLink>
                    <NavLink to="/contacto" >Contacto</NavLink>
                </div>
                {this.state.mobileMenu ? <MobileMenu close={() => this.setState({mobileMenu: false})} /> : null}
            </div>
        )
    }
}

export default Navbar;