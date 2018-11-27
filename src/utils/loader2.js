import React, { Component } from 'react';
import '../css/loader.css';

class Loader2 extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
        <div className={`lds-ellipsis ${this.props.hide ? 'hidden' : null}`}><div></div><div></div><div></div><div></div></div>
    )
  }
}

export default Loader2;