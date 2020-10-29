class Default extends React.Component {

    db = firebase.firestore()
    rublo = 'web'

    constructor(props) {
        super(props)
        
        this.state = {
            dni: '',
            pswd:''
        }

        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

   
    handleOnchange({target}) {
        
        this.setState({
            [target.name]: target.value 
        })
     
    }

    async handleSubmit(e) {
        e.preventDefault()

        

        const { docs } = await this.db.collection("admin")
                                    .where("role", "==", this.rublo)
                                    .where("user",'==', this.state.dni)
                                    .get()
        
        if (!docs) {
            this.setState({
                dni: '',
                pswd:''
            })
        }
        let pswd 

        for (let doc of docs) {
            pswd = doc.data()['pass']
        }

        if (Login(pswd, this.state.pswd)) {
           
            this.props.auth(true)
            this.props.history.push('/wasiyux/inicio')
        }

        this.setState({
            dni: '',
            pswd:''
        })
    }




    render() {
        return (
            <React.Fragment>
            <div className="row mt-4 justify-content-md-center">
                <div className="col-md-5">
                    <div className='card'>
                        <div className='card-head bg-success text-white p-3'>
                            <h3 className='card-title'><i className="fas fa-users-cog"></i> Acceso</h3>
                        </div> 
                        <div className='card-body'>
                            <form onSubmit={(e)=> this.handleSubmit(e)} >
                                <div className="input-group mb-3 mt-3 bg-success">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-users-cog"></i>
                                        </span>
                                    </div>
                                    <input  type="text"
                                            className="form-control form-control-sm"
                                            placeholder="usuario"
                                            name='dni'
                                            maxlength={8}
                                            onChange={this.handleOnchange}
                                            value={this.state.dni}
                                    />
                                </div> 
                                <div className="input-group mb-3 mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                        <i className="fas fa-unlock-alt"></i>
                                        </span>
                                    </div>
                                    <input  type="password"
                                            className="form-control form-control-sm"
                                            placeholder="contraseña"
                                            name='pswd'
                                            onChange={this.handleOnchange}
                                            value={this.state.pswd}
                                    />
                                </div>
                                <div className="input-group mb-3 mt-3 ">
                                <button type='submit' class="btn btn-outline-success btn-block">
                                            validar <i className="fas fa-book-reader"></i>
                                    </button>
                                </div> 
                            </form>            
                        </div>    
                   </div>
                </div>     
            </div>
            </React.Fragment>
            
        )
    }
}

customElements.define('default-page', Default);