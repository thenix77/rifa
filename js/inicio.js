  $( document ).ready(function() {
      
      //  new WOW().init();
      
      const datosWebConfig = async ()=>{
        const db = firebase.firestore()
        
        const { docs } = await db.collection("webconfig")
                                      .where("identificador", "==", "inicio")
                                      .get()
        let  inicio_imagen1 
        let  inicio_imagen2 
        let  inicio_imagen3 
        

        for(const doc of docs){
            inicio_imagen1 = doc.data()['imagen1']
            inicio_imagen2 = doc.data()['imagen2']
            inicio_imagen3 = doc.data()['imagen3']
        
         }


            
        $("#inicio-imagen1").attr("src", "./img/inicio/" + inicio_imagen1);
        $("#inicio-imagen2").attr("src", "./img/inicio/" + inicio_imagen2);
        $("#inicio-imagen3").attr("src", "./img/inicio/" + inicio_imagen3);
    }
    
    const dataActivadesAgricultura = async ()=> {
      const db = firebase.firestore()

      

      const { docs } = await db.collection("webconfig")
                                      .where("identificador", "==", "agricultura")
                                      .get()
      html = ''
      
      for (let j = 1; j < 4; j++) {
        for (const doc of docs) {
        
          html += ` <div class="col-sm-4">
                      <div class="card mb-2">
                        <img class="card-img-top"
                            src="./img/agricultura/${doc.data()[`data_${j}`].imagen}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">${doc.data()[`identificador`]}</h4>
                            <p class="card-text">${doc.data()[`data_${j}`].texto}</p>
                        </div>
                        </div>
                    </div>`
            
        }
     }
    
      $('#agricultura').html(html)
    }

    const dataActivadesGanaderia = async ()=> {
      const db = firebase.firestore()

      const { docs } = await db.collection("webconfig")
                                      .where("identificador", "==", "ganaderia")
                                      .get()
      html = ''
      
      for (let j = 1; j < 4; j++) {
        for (const doc of docs) {
          
          html += ` <div class="col-sm-4">
                      <div class="card mb-2">
                        <img class="card-img-top"
                            src="./img/ganaderia/${doc.data()[`data_${j}`].imagen}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">${doc.data()[`identificador`]}</h4>
                            <p class="card-text">${doc.data()[`data_${j}`].texto}</p>
                        </div>
                        </div>
                    </div>`
            
        }
     }
    
      $('#ganaderia').html(html)
    }

    const dataActivadesMineria = async ()=> {
      const db = firebase.firestore()

      const { docs } = await db.collection("webconfig")
                                      .where("identificador", "==", "mineria")
                                      .get()
      html = ''
      
      for (let j = 1; j < 4; j++) {
        for (const doc of docs) {
         
          html += ` <div class="col-sm-4">
                      <div class="card mb-2">
                        <img class="card-img-top"
                            src="./img/mineria/${doc.data()[`data_${j}`].imagen}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">${doc.data()[`identificador`]}</h4>
                            <p class="card-text">${doc.data()[`data_${j}`].texto}</p>
                        </div>
                      </div>
                    </div>`
            
        }
     }
    
      $('#mineria').html(html)
    }

  const dataActivadesEventos = async ()=> {
      const db = firebase.firestore()

      const { docs } = await db.collection("webconfig")
                                      .where("identificador", "==", "evento")
                                      .get()
      html = ''
      ruta =''
      for (let j = 1; j < 2; j++) {
        for (const doc of docs) {
        
          html += `<a class="dropdown-item" href="#rifa">${doc.data()['data_1'].texto}</a>`
          ruta = doc.data()['data_1'].imagen
        }
     }
 
    $('#rifa-publicidad').attr("src", "./img/evento/" + ruta);
    $('#link-evento').html(html)
    

    }
    
      
      

    datosWebConfig()
    dataActivadesAgricultura()
    dataActivadesMineria()
    dataActivadesGanaderia()
    dataActivadesEventos ()
  });