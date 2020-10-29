class Evento extends React.Component {
    db = firebase.firestore()
    id = ''
    rublo ='evento'
    
    constructor(props) {
        super(props)

        this.state = {
            id :  '',
            identificador  :  '',
            data_1: [],
      
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
                </div>    
                
            </React.Fragment>
        )
    }
}

customElements.define('evento-page', Evento);