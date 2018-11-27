import React, { Component } from 'react';
import Loader from '../utils/loader';
import '../css/notaIndividual.css';
import { Redirect } from 'react-router-dom';

class Nota extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log(this.props.location)
    fetch(`https://lnhbackend.herokuapp.com${this.props.location.pathname}`)
    .then(d => d.json())
    .then(res => {
      console.log(res)
      this.setState({data: res})
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleBack(){
    let path = sessionStorage.getItem('location')
    this.setState({redirect: path ? path : '/'})
  }

  render() {
    return (
    <div className="nota-individual" >
    <button className="nota-individual-volver-btn" onClick={() => this.handleBack()} ><i className="fas fa-arrow-left"></i> Volver</button>
      {this.state.data ? 
      <div className="nota-individual-data">
      <h1>{this.state.data.titulo}</h1>
      <h5>{this.state.data.fecha}</h5>
      {this.state.data.imagen ? <img src={`http://localhost:3000/${this.state.data.imagen}`} alt="img" /> : null}
      <p>{this.state.data.texto}</p>
      <h5>{this.state.data.categoria}</h5>
      </div>
    : <Loader />
    }
    {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
    </div>
    )
  }
}

export default Nota;