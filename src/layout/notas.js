import React, { Component } from 'react';
import Loader2 from '../utils/loader2';
import Nota from '../components/notaPreview';
import '../css/notas.css';
import { Link } from 'react-router-dom';

class Notas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: 'gastronomia'
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    sessionStorage.setItem('location', this.props.location.pathname)
    this.getData(this.props.location.pathname)
  }

  getData(url){
    this.setState({loadingData: true})
    console.log(url)
    fetch(`http://localhost:3000${url}`)
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ data: res, loadingData: false})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleClick(e) {
    let name = e.target.getAttribute('name')
    this.setState({
      gastronomia: false,
      vinos: false,
      cultura: false,
      [name]: true
    })
    sessionStorage.setItem('location', `/notas/${[name]}`)
    this.getData(`/notas/${[name]}`)
  }

  render() {
    return (
      <div className="notas-container">
        <div className="notas-categoria-columna" >
          <h1>Categorias:</h1>
          <Link name="gastronomia" onClick={e => this.handleClick(e)} to="../notas/gastronomia" >Gastronomia</Link>
          <Link name="turismo" onClick={e => this.handleClick(e)} to="../notas/turismo" >Turismo</Link>
          <Link name="cultura" onClick={e => this.handleClick(e)} to="../notas/cultura" >Cultura</Link>
          <Link name="vinos" onClick={e => this.handleClick(e)} to="../notas/vinos" >Vinos</Link>
          <Link name="otros" onClick={e => this.handleClick(e)} to="../notas/otros" >Otros</Link>
        </div>
        <div className="notas-container-notas" >
          {
            this.state.data ? this.state.data.map(nota => 
              <Nota _id={nota._id}
                categoria={nota.categoria}
                key={nota._id}
                titulo={nota.titulo}
                texto={nota.texto}
                fecha={nota.fecha}
              />
            ) : null
          }
          {
            this.state.loadingData ? <Loader2 /> : null
          }
        </div>
      </div>
    )
  }
}

export default Notas;