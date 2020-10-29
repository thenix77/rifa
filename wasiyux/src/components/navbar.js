"use strict";
const Link = ReactRouterDOM.Link;

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <a className="navbar-brand" href="/">
          <img
            src={"./src/images/logo.png"}
            width="30"
            height="30"
            class="d-inline-block align-top"
          />
          &nbsp;Configuracion Web
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse container" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {(this.props.auth) ? 
             <React.Fragment> 
            <li className="nav-item active">
              <Link className="nav-link" to="/wasiyux/inicio">
                <i class="fa fa-home" aria-hidden="true"></i> Inicio
              </Link>
            </li>
            <li className="nav-item dropdown active">
              <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="far fa-newspaper"></i> Actividades
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/wasiyux/agricultura">Agricultura</Link>
                <Link className="dropdown-item" to="/wasiyux/ganaderia">Ganaderia</Link>
                <Link className="dropdown-item" to="/wasiyux/mineria">Mineria</Link>
              </div>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/wasiyux/evento">
                <i className="fas fa-democrat"></i> Evento
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/wasiyux/logout">
                <i className="fas fa-sign-out-alt"></i> Salir
              </Link>
            </li>
            </React.Fragment> :
            <React.Fragment></React.Fragment>  
            }
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i className="fas fa-file-code"></i> Pagina Principal
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

customElements.define("navbar-component", Navbar);
