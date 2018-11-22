import React, { Component } from 'react';
import '../css/footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <a href=""><i className="fab fa-facebook"></i></a>
          <a href=""><i className="fab fa-twitter"></i></a>
          <p>Le Nouvel Hedonisme ©. Pagina web por <span>Sebastian Sarmiento</span>.</p>
        </div>
      </footer>
    )
  }
}

export default Footer;