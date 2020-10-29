class Ganaderia extends React.Component {
    db = firebase.firestore()
    id = ''
    rublo ='ganaderia'
    
    constructor(props) {
        super(props)

        this.state = {
            id :  '',
            identificador  :  '',
            data_1: [],
            data_2: [],
            data_3: []
        }
    
    }

    async componentDidMount() {
        
        await this.tablaWebConfig()

        const { docs } = await this.db.collection("webconfig")
                                    .where("identificador", "==", this.rublo)
                                    .get()
        
        
        try {
            for (const doc of docs) {
                //console.log(doc.data()['mineria']['imagen1'])
                console.log(doc.data())
        
                 this.setState({
                    id: doc.id,
                    identificador: doc.data()['identificador'],
                    
                    data_1: { 
                            imagen: doc.data()['data_1'].imagen,
                            texto:  doc.data()['data_1'].texto,
                     },
                    data_2: { 
                            imagen: doc.data()['data_2'].imagen,
                            texto:  doc.data()['data_2'].texto,
                     },
                    data_3: { 
                            imagen: doc.data()['data_3'].imagen,
                            texto:  doc.data()['data_3'].texto,
                            }
                    
                })
            }
            
        } catch (error) {
            alert('error de conexion')
        }  

    } 
 

    async tablaWebConfig() {

        const { docs ,error} = await this.db.collection("webconfig")
                                                .where("identificador", "==", this.rublo)
                                                .get()
            
        if (docs.length == 0) {
            await this.db.collection('webconfig').doc().set({
                identificador: this.rublo,
                data_1: {
                                    imagen: this.rublo + '-imagen1.jpeg',
                                    texto:  '',
                                                                        
                },
                data_2: {
                                    imagen: this.rublo +'-imagen2.jpeg',
                                    texto: '',
                                                                        
                },
                data_3: {
                                    imagen: this.rublo +'-imagen3.jpeg',
                                    texto: '',
                                                                        
                },
               
            })
            return true
        }

        return false
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                    las fotos deben ser de alta calidad, en un formato 800x600, para editar el 
                    tamaño de la foto, pueden usar  &nbsp;
                    <a href='https://www.editorfotos.com/' target='_black'>Editar Imagen</a>
                    </div>
                </div>
                <div className="row ">{/*justify-content-md-center*/}
                    <div className="col-md-4">
                        <Tarjetas   id={this.state.id}
                                    num='1'
                                    identificador={this.state.identificador}
                                    imagen={this.state.data_1.imagen}
                                    texto={this.state.data_1.texto}
                        />
                    </div>
                    <div className="col-md-4">
                        <Tarjetas   id={this.state.id}
                                    num='2'
                                    identificador={this.state.identificador}
                                    imagen={this.state.data_2.imagen}
                                    texto={this.state.data_2.texto}
                        />
                    </div>
                        
                    <div className="col-md-4">
                        <Tarjetas   id={this.state.id}
                                    num='3'
                                    identificador={this.state.identificador}
                                    tipo = {this.rublo}
                                    imagen={this.state.data_3.imagen}
                                    texto={this.state.data_3.texto}
                        />      
                    </div>
                </div>    
                
            </React.Fragment>
        )
    }
}

customElements.define('ganaderia-page', Ganaderia);
/**    identificador = {this.state.identificador}
                                    imagen = {this.state.agricultura.imagen1}
                                    texto = {this.state.agricultura.texto1}*/