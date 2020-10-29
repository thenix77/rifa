class Inicio extends React.Component {

    db = firebase.firestore()

    constructor(props) {
        super(props)
        
        this.state = {
            id: '',
            identificador: '',
            imagen1: '',
            imagen2: '',
            imagen3: '',
            temp:[]
        }

        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    async componentDidMount() {


        await this.tablaWebConfig()

        const { docs } = await this.db.collection("webconfig")
                                    .where("identificador", "==", "inicio")
                                    .get()
        try {
             for (const doc of docs) {

                 this.setState({
                    id: doc.id,
                    identificador: doc.data()['identificador'],
                    imagen1: doc.data()['imagen1'],
                    imagen2: doc.data()['imagen2'],
                    imagen3: doc.data()['imagen3'],
                    temp: { 
                            id: doc.id,
                            identificador: doc.data()['identificador'],
                            imagen1: doc.data()['imagen1'],
                            imagen2: doc.data()['imagen2'],
                            imagen3: doc.data()['imagen3'],
                            }
                })
            }
            
        } catch (error) {
            alert('error de conexion')
        }  
    } 
    
    async tablaWebConfig() {

        const { docs ,error} = await this.db.collection("webconfig")
                                                .where("identificador", "==", "inicio")
                                                .get()
            
        if (docs.length == 0) {
            //insert
            await this.db.collection('webconfig').doc().set({
                identificador: 'inicio',
                imagen1: 'inicio-imagen1.jpg',
                imagen2: 'inicio-imagen2.jpg',
                imagen3: 'inicio-imagen3.jpg'
            })
            return true
        }

        return false
    }

    handleOnchange({ target }) {
        
        this.setState({
            [target.name]: target.value 
        })
     
    }

    async handleSubmit(e) {
        e.preventDefault()

        try {
            await this.db.collection('webconfig').doc(this.state.id)
            .update({
                imagen1: this.state.imagen1,
                imagen2: this.state.imagen2,
                imagen3: this.state.imagen3
            })

            this.setState({
                temp: { 
                        imagen1: this.state.imagen1,
                        imagen2: this.state.imagen2,
                        imagen3: this.state.imagen3,
                        }
            })
            
            

            alert('actualizado')
        } catch (error) {
            alert('error de conexion')
        }

    }

    handleCancel() {
        this.setState({
            imagen1: this.state.temp.imagen1,
            imagen2: this.state.temp.imagen2,
            imagen3: this.state.temp.imagen3
        })

        alert('cancel')
    }
    


    render() {
        return (
            <React.Fragment>
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    las fotos deben ser de alta calidad, en un formato 1600x707, para editar el 
                    tamaño de la foto, pueden usar 
                    <a href='https://www.editorfotos.com/' target='_black'>Editar Imagen</a>
                </div>
            </div>
            <div className="row ">{/*justify-content-md-center*/}
                <div className="col-5 col-md-10">
                    <div className="card">
                        <div className="card-header bg-success text-light">
                            <i className="fas fa-home" ></i> {this.state.identificador}
                        </div>    
                        <form onSubmit={(e)=> this.handleSubmit(e)}>
                        <div className="card-body">
                            <div className="row justify-content-md-center">
                                <div className="col-md-10">
                                    <div className="input-group mb-3 mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i class="fas fa-icons"></i>
                                            </span>
                                        </div>
                                        <input  type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Imagen 1"
                                                name='imagen1'
                                                onChange={this.handleOnchange}
                                                value={this.state.imagen1}
                                            />
                                    </div>
                                   <div className="input-group mb-3 mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                            <i className="fas fa-icons" ></i>
                                            </span>
                                        </div>
                                        <input  type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Imagen 2"
                                                name='imagen2'
                                                onChange={this.handleOnchange}
                                                value={this.state.imagen2}
                                            />
                                    </div>
                                    <div className="input-group mb-3 mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                            <i className="fas fa-icons" ></i>
                                            </span>
                                        </div>
                                        <input  type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Imagen 3"
                                                name='imagen3'
                                                onChange={this.handleOnchange}
                                                value={this.state.imagen3}
                                            />
                                    </div>
                                </div>    
                            </div>
                                    
                        </div>
                        <div className='card-footer '>
                            <button type='submit' className="btn btn-outline-success btn-block btn-sm" >
                                <i className="fas fa-save"></i> actualizar 
                            </button>
                            <Link className="btn btn-outline-danger btn-block btn-sm" onClick={this.handleCancel}>
                                <i className="far fa-window-close"></i> cancelar 
                            </Link>         
                        </div>
                        </form>    
                    </div>
                </div>
                {/** */}
                <div className='col-7 col-md-10'>
                    <div className='row justify-content-md-center mb-2'>
                        <div className='col-md-6'>
                            <div className='w-100'>
                                <img    src= { "../img/inicio/" + this.state.imagen1}
                                        className='w-100 d-block'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-md-center mb-2'>
                        <div className='col-md-6'>
                            <div className='w-100'>
                                <img    src={"../img/inicio/" + this.state.imagen2}
                                        className='w-100 d-block'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-6'>
                            <div className='w-100'>
                                <img    src={"../img/inicio/" + this.state.imagen3}
                                        className='w-100 d-block'
                                />
                            </div>
                        </div>
                    </div>     
                </div>

                {/** */}    
            </div>

            </React.Fragment>
            
        )
    }
}

customElements.define('inicio-page', Inicio);