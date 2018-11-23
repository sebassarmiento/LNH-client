import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './layout/home';
import Notas from './layout/notas';
import Nota from './layout/Nota';
import Contacto from './layout/contacto';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/notas/:categoria" exact component={Notas} />
          <Route path="/notas/id/:notaId" component={Nota} />
          <Route path="/contacto" component={Contacto} />
          <Route path="/mapa" component={Login} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
