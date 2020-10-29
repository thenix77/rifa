class Tarjetas extends React.Component {

    db = firebase.firestore()

    constructor(props) {
        super(props)

        this.state = {
            id:'',
            identificador: '',
            num:'',
            imagen: '',
            texto: '',
            tipo: ''
        }

        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

   componentDidUpdate(prevProps) {
  // Uso tipico (no olvides de comparar las props):
    if (this.props.id !== prevProps.id) {
       //     this.fetchData(this.props.id);
        this.setState({
            id:             this.props.id,
            identificador:  this.props.identificador,
            num:            this.props.num,
            tipo:           this.props.tipo,
            imagen:         this.props.imagen ,
            texto:          this.props.texto ,
            })
        }
       
    }

     handleOnchange({target}) {
        
        
         
        this.setState({
            [target.name]: target.value 
        })
     
    }

    async handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
   
        await this.db.collection('webconfig').doc(this.state.id)
            .update({
                ['data_' + this.state.num]: {
                                ["imagen"]: this.state.imagen ,
                                ["texto"]: this.state.texto || ''
                            }   
            })
        alert('actualizado')
    }

    render() {
        return (
            <React.Fragment>
                <div className='card'>
                    <div className="card-header bg-success text-light">
                        <i className="fas fa-home" ></i> {this.state.identificador.toUpperCase()}
                    </div>
                    <form onSubmit={(e)=> this.handleSubmit(e)}>
                    <div className='card-body'>
                        <div className="input-group mb-3 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                <i className="fas fa-icons" ></i>
                                </span>
                            </div>
                            <input  type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Imagen"
                                    name='imagen'
                                    onChange={this.handleOnchange}
                                    value={this.state.imagen}
                            />
                        </div>
                        {/** */}
                        <div className='w-100'>
                            <img    src={"../img/" + this.state.identificador + "/" + this.state.imagen}
                                    className='w-100 d-block'
                            />
                        </div>
                        <div className="input-group mb-3 mt-3">
                            <textarea 
                                    className="form-control form-control-sm"
                                    placeholder="Descripcion"
                                    name='texto'
                                    maxlength={50}
                                    rows={3}
                                    onChange={this.handleOnchange}
                                    value={this.state.texto}
                            ></textarea>
                        </div>
                        {/** */}
                    </div>
                    <div className='card-footer '>
                        <button type='submit' className="btn btn-outline-success btn-block btn-sm" >
                            <i className="fas fa-save"></i> actualizar 
                        </button>
                        <Link className="btn btn-outline-danger btn-block btn-sm" >
                            <i className="far fa-window-close"></i> cancelar 
                        </Link>         
                    </div>
                    </form>    
                </div>               
            </React.Fragment>
        )
    }
}

customElements.define('tarjetas-page', Tarjetas);