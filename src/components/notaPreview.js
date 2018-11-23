import React, { Component } from 'react';
import '../css/notaPreview.css';
import { Fade } from 'react-reveal';
import { Redirect } from 'react-router-dom';

class Nota extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleClick() {
    this.setState({ redirect: true })
  }

  render() {
    return (
      <Fade bottom delay={this.props.delay * 200} duration={1000}>
        <div className="nota" onClick={() => this.handleClick()} >
          <h2 className="nota-titulo" >{this.props.titulo}</h2>
          <h6>{this.props.fecha}</h6>
          <p>{this.props.texto}</p>
          <h6 className="nota-categoria" >{this.props.categoria}</h6>
          {this.state.redirect ? <Redirect to={`/notas/id/${this.props._id}`} /> : null}
        </div>
      </Fade>
    )
  }
}

export default Nota;