import React, { Component } from 'react';
import Loader2 from '../utils/loader2';
import Nota from '../components/notaPreview';
import '../css/notas.css';

class Notas extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/notas')
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ data: res , gastronomia: true})
      })
      .catch(err => {
        console.log(err)
      })
  }

  show(arr) {
    return arr.map(nota =>
      <Nota _id={nota._id}
        categoria={nota.categoria}
        key={nota._id}
        titulo={nota.titulo}
        texto={nota.texto}
        fecha={nota.fecha}
      />)
  }

  handleClick(e){
    let name = e.target.getAttribute('name')
    this.setState({
      gastronomia: false,
      vinos: false,
      cultura: false,
      [name]: true
    })
  }

  render() {

    let gastronomia = this.state.data ? this.state.data.filter(n => n.categoria === 'Gastronomia') : null
    let vinos = this.state.data ? this.state.data.filter(n => n.categoria === 'Vinos') : null
    let cultura = this.state.data ? this.state.data.filter(n => n.categoria === 'Cultura') : null

    return (
      <div className="notas-container">
        <div className="notas-categoria-columna" >
          <h1>Categorias:</h1>
          <h3 name="gastronomia" onClick={(e) => this.handleClick(e)} >Gastronomia</h3>
          <h3 name="turismo" onClick={(e) => this.handleClick(e)} >Turismo</h3>
          <h3 name="cultura" onClick={(e) => this.handleClick(e)} >Cultura</h3>
          <h3 name="vinos" onClick={(e) => this.handleClick(e)} >Vinos</h3>
          <h3 name="otros" onClick={(e) => this.handleClick(e)} >Otros</h3>
        </div>
        <div className="notas-container-notas" >
          {
            this.state.gastronomia ? this.show(gastronomia) : this.state.vinos ? this.show(vinos) : this.state.cultura ? this.show(cultura) : null
          }
        </div>
      </div>
    )
  }
}

export default Notas;