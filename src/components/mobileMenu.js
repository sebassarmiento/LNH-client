import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MobileMenu extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="mobile-menu-container" >
                <div className="mobile-menu" >
                    <i onClick={() => this.props.close()} className="fas fa-times"></i>
                    <Link onClick={() => this.props.close()} to="/" >Nuevo</Link>
                    <Link onClick={() => this.props.close()} to="/notas/gastronomia" >Notas</Link>
                    <Link onClick={() => this.props.close()} to="/contacto" >Contacto</Link>
                </div>
            </div>
        )
    }
}

export default MobileMenu;