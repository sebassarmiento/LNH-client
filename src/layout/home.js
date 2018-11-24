import React, { Component } from 'react';
import Nota from '../components/notaPreview';
import '../css/home.css';
import Loader2 from '../utils/loader2';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.delay = 1
  }

  componentDidMount() {
    sessionStorage.setItem('location', this.props.location.pathname)
    fetch('http://localhost:3000/notas')
      .then(d => d.json())
      .then(res => {
        console.log(res)
        this.setState({ data: res })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="home-container" >
        <div className="home-presentation" >
        </div>
        <div className="home-presentation-text" >
            <h2>REVISTA DIGITAL DE SEXO, DINERO, VIEJOS, CHINITAS Y MUCHOS AMORES.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, temporibus ipsum sapiente impedit fugit nostrum labore enim inventore quidem dolorum ex? Optio repellat nemo quod tempore tenetur soluta dicta autem.</p>
          </div>
        <h1 className="home-reciente" >RECIENTE</h1>
        <div className="home-notas-container" >
          {
            this.state.data ? this.state.data.map(nota => {
              if(this.delay <= 3){this.delay++}else{this.delay = 1}
              return (<Nota
                _id={nota._id}
                delay={this.delay}
                categoria={nota.categoria}
                key={nota._id}
                titulo={nota.titulo}
                texto={nota.texto}
                fecha={nota.fecha} />)
            }) : null
          }
        </div>
        {this.state.data ? null : <Loader2 />}
      </div>
    )
  }
}

export default Home;