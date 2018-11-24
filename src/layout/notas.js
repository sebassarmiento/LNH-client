import React, { Component } from 'react';
import Loader2 from '../utils/loader2';
import Nota from '../components/notaPreview';
import '../css/notas.css';
import { Link } from 'react-router-dom';

class Notas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gastronomia: 'current-categoria',
      showCategorias: false
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    sessionStorage.setItem('location', this.props.location.pathname)
    this.getData(this.props.location.pathname)
  }

  getData(url) {
    this.setState({ loadingData: true })
    console.log(url)
    fetch(`http://localhost:3000${url}`)
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ data: res, loadingData: false })
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
      turismo: false,
      otro: false,
      [name]: 'current-categoria'
    })
    sessionStorage.setItem('location', `/notas/${[name]}`)
    this.getData(`/notas/${[name]}`)
  }

  render() {
    return (
      <div className="notas-container">
        <div className="notas-categoria-columna" >
          <h3>Categorias <i onClick={() => this.setState({showCategorias: !this.state.showCategorias})} className="fas fa-plus"></i></h3>
          <div className={this.state.showCategorias ? 'notas-categorias-mobile' : 'notas-categorias'} >
            <Link className={this.state.gastronomia} name="gastronomia" onClick={e => this.handleClick(e)} to="../notas/gastronomia" >Gastronomia</Link>
            <Link className={this.state.turismo} name="turismo" onClick={e => this.handleClick(e)} to="../notas/turismo" >Turismo</Link>
            <Link className={this.state.cultura} name="cultura" onClick={e => this.handleClick(e)} to="../notas/cultura" >Cultura</Link>
            <Link className={this.state.vinos} name="vinos" onClick={e => this.handleClick(e)} to="../notas/vinos" >Vinos</Link>
            <Link className={this.state.otro} name="otro" onClick={e => this.handleClick(e)} to="../notas/otro" >Otros</Link>
          </div>
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