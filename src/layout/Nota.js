import React, { Component } from 'react';
import Loader from '../utils/loader';
import '../css/notaIndividual.css';
import { browserHistory } from 'react-router-dom';

class Nota extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    console.log(this.props.location)
    fetch(`http://localhost:3000${this.props.location.pathname}`)
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
    console.log(this.props.history)
    this.props.history.goBack()
  }

  render() {
    return (
    <div className="nota-individual" >
    <button className="nota-individual-volver-btn" onClick={() => this.handleBack()} ><i class="fas fa-arrow-left"></i> Volver</button>
      {this.state.data ? 
      <div className="nota-individual-data">
      <h1>{this.state.data.titulo}</h1>
      <h5>{this.state.data.fecha}</h5>
      <img src="http://3.bp.blogspot.com/-QfL7-quSRkY/UGIEzrjXbRI/AAAAAAAAAEc/qRTzR8WYYkc/s1600/264041_414845998568658_437602555_n.jpg" alt="img" />
      <p>{this.state.data.texto}</p>
      <h5>{this.state.data.categoria}</h5>
      </div>
    : <Loader />
    }
    </div>
    )
  }
}

export default Nota;