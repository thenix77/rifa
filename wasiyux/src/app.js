"use strict"

const Route = ReactRouterDOM.Route
const SwitchRoute = ReactRouterDOM.Switch

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            auth:false
        }

        sessionStorage.removeItem('validate')
        this.handleValidate = this.handleValidate.bind(this)
    }

    handleValidate(auth) {
        this.setState({
            auth:auth
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar {...this.props} auth={this.state.auth} />
                <div class="container">
                    <div className="row">
                        <div className='col-12 col-md-12'>
                           <SwitchRoute>
                                <Route path="/wasiyux" exact render={(props) => <Default {...props} auth={this.handleValidate} />} />
                                <RouteProtected path="/wasiyux/inicio"      exact component={ Inicio } />
                                <RouteProtected path="/wasiyux/agricultura" exact component={ Agricultura  } />
                                <RouteProtected path="/wasiyux/ganaderia"   exact component={ Ganaderia } />
                                <RouteProtected path="/wasiyux/mineria"     exact component={ Mineria } />
                                <RouteProtected path="/wasiyux/evento"      exact component={Evento} />
                                <Route path="/wasiyux/logout" exact render={(props) => <Salir   {...props}
                                                                                                auth={this.handleValidate} />} />
                                <Route path='*' component={Default} />
                            </SwitchRoute>
                        </div>    
                    </div>    
               </div>
            </React.Fragment>
        )
    }
}

customElements.define('app-component', App);
