/********************/
/*     Animación    */
/********************/

/********************/
/* Color del Navbar */
/********************/
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 40);
  });


/********************/
/*      FIREBASE    */
/********************/

var db = firebase.firestore();
  
var id = sessionStorage.getItem("id")
var  contador=0;
var id_afiliado="01";
var id_titular;
var idafili;
var idterci;
var id_terceros="01";
var idafiliadotiket;
var id_afiliadox;
var pretiketscantterce;
var precio = 10;
var cantidadtotal=0;



function cerrar(){
    sessionStorage.removeItem("id")
    window.location="index"
}

function validni(campo, longitudMaxima) {
    try {
        if (campo.value.length > (longitudMaxima - 1))
            return false;
        else
            return true;             
    } catch (e) {
        return false;
    }
}

function valicelular(campo, longitudMaxima) {
    try {
        if (campo.value.length > (longitudMaxima - 1))
            return false;
        else
            return true;             
    } catch (e) {
        return false;
    }
}

//Mostrar nombre
db.collection("usuarios").onSnapshot((querySnapshot) => {
    document.getElementById("nom").innerHTML=""
    querySnapshot.forEach((doc) => {
        if(doc.id === id){
            id_titular=doc.data().id_titular;
            document.getElementById("nom").innerHTML="<span>"+id_titular+" - "+doc.data().nombres+" "+doc.data().apellidos+"</span>"
        }

    });
});

db.collection("afiliados").onSnapshot((querySnapshot)=>{
    var  contador=1;
    querySnapshot.forEach((doc)=>{
        contador++
        if(contador > 9){
            id_afiliado = contador
        }else{
            id_afiliado ="0"+contador
        }

    })
})

db.collection("terceros").onSnapshot((querySnapshot)=>{
    var  contador=1;
    querySnapshot.forEach((doc)=>{
        contador++
        if(contador > 9){
            id_terceros = contador
        }else{
            id_terceros ="0"+contador
        }

    })
})

//Rergistrar afiliado
function registrar(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var celular = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;
    var dni = document.getElementById("dni").value;
    var pass = document.getElementById("pass").value;

    if(nombre == "" || apellido == "" || celular =="" || dni =="" ){
        alert("Complete los datos primero")
    }else{
        db.collection("afiliados").doc(id_afiliado).set({
            nombres: nombre,
            apellidos: apellido,
            celular: celular,
            correo:correo,
            dni:dni,
            pass:pass,
            pretikets:0,
            ventikets:0,
            precio:0,
            estado:0,
            id_afiliado:id_afiliado,
            idtitular:id
    
        })
        .then(function() {
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value= "";
            document.getElementById("celular").value= "";
            document.getElementById("correo").value= "";
            document.getElementById("dni").value= "";
            alert("Afiliado correctamente")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    
}




//mostrar afiliados correctos

db.collection("afiliados").orderBy("id_afiliado").onSnapshot((querySnapshot)=>{
    document.getElementById("tabla").innerHTML=""
  querySnapshot.forEach((doc)=>{
      if(id === doc.data().idtitular && doc.data().estado === 0){
        document.getElementById("tabla").innerHTML+=`
        <tr>
        <th scope="row">${doc.data().id_afiliado}</th>
        <td>${doc.data().nombres}</td>
        <td>${doc.data().apellidos}</td>
        <td>${doc.data().correo}</td>
        <td>${doc.data().celular}</td>
        <td>${doc.data().dni}</td>
        <td>${doc.data().pretikets}</td>
        <td>${doc.data().ventikets}</td>
        <td><center><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#afiliarterceros" onclick="afiliarTerce('${doc.id}')" style="box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);"><i class="fas fa-user-plus"></i></button></center></td>
        <td><center><button class="btn btn-success btn-sm" data-toggle="modal" data-target="#tiketterceros" onclick="tiketforterce('${doc.id}','${doc.data().id_afiliado}')" style="box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);"><i class="fas fa-ticket-alt"></i></button></center></td>
        </tr>
        `
      }
  })  
})

function afiliarTerce(ida){
    idafili = ida;
}

function tiketforterce(ida2,id_afiliadoxs){
    
    id_afiliadox = id_afiliadoxs;
    idafiliadotiket = ida2;
    //combo box
    db.collection("terceros").onSnapshot((query)=>{
        document.getElementById("combo2").innerHTML=""
        query.forEach((doc)=>{
            if(doc.data().idafiliado === idafiliadotiket && doc.data().estado === 0){
                document.getElementById("combo2").innerHTML+=`
                    <option value="${doc.data().id_terceros}">${doc.data().nombres} ${doc.data().apellidos}</option>
                
                `
            }
        })
    })
}

function generarTikettercero(){
    idterci = document.getElementById("combo2").value;
    if(idterci != ""){
        tiket = id_titular+" - "+id_afiliadox+" - "+idterci+" - "+numtiket;
        alert("Tiket: "+tiket)

        db.collection("tikets").doc(numtiket).set({
            idtiket:numtiket,
            numtiket: tiket,
            idtitular:id_titular,
            idsecundario:id_afiliadox,
            idtercero:idterci,
            estado:0
        })
        .then(function(docRef) {
            contador=0;
            
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

        db.collection("tikets").onSnapshot((query2)=>{
            pretiketscantterce=0
            query2.forEach((doc2)=>{
                if(doc2.data().idsecundario === id_afiliadox && doc2.data().idtercero === idterci){
                    pretiketscantterce++
                    db.collection("terceros").onSnapshot((query)=>{
                        query.forEach((doc)=>{
                            if(doc.data().id_terceros === idterci){
                
                                var washingtonRef = db.collection("terceros").doc(doc.id);
                                return washingtonRef.update({
                                    pretikets: pretiketscantterce
                                })
                                .then(function() {
                                    //console.log("Document successfully updated!");
                                    pretiketscantterce=0
                                })
                                .catch(function(error) {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });
                            }        
                        })
                    })
                }
            })
        })
    }else{
        alert("Aun no tiene afiliado para generar");
    }
}






//Rergistrar afiliadoTErcero
function RegisAfiliarTerce(){
    var nombre = document.getElementById("afnombre").value;
    var apellido = document.getElementById("afapellido").value;
    var celular = document.getElementById("afcelular").value;
    var correo = document.getElementById("afcorreo").value;
    var dni = document.getElementById("afdni").value;
    var pass = document.getElementById("afpass").value;

    if (nombre == "" || apellido == "" || celular =="" || dni =="" ){
        alert("Complete los datos primero");
    }else{
        db.collection("terceros").doc(id_terceros).set({
            nombres: nombre,
            apellidos: apellido,
            celular: celular,
            correo:correo,
            dni:dni,
            pass:pass,
            pretikets:0,
            ventikets:0,
            precio:0,
            estado:0,
            id_terceros:id_terceros,
            idafiliado:idafili
    
        })
        .then(function(docRef) {
            //console.log("Id de afiliado: ", docRef.id);
            document.getElementById("afnombre").value = "";
            document.getElementById("afapellido").value= "";
            document.getElementById("afcelular").value= "";
            document.getElementById("afcorreo").value= "";
            document.getElementById("afdni").value= "";
            document.getElementById("afpass").value= "";
            alert("Afiliado Correctamente")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    
}


//mostrar perfil

function perfilDatos(){

    db.collection("usuarios").onSnapshot((querySnapshot) => {
        document.getElementById("dperfil").innerHTML=""
        querySnapshot.forEach((doc) => {
        //console.log(`${doc2.id} => ${doc2.data()}`);
        var iddoc = doc.id

            if(iddoc === id){
            document.getElementById("dperfil").innerHTML+=`
            <label><i class="fas fa-key"></i> Contraseña</label>
            <input type="password" id="ppass" placeholder="Contraseña" class="form-control" autocomplete="off" value="${doc.data().pass}">
            `
            }
        });
    });
}

//actulizar pérfil

function acPerfil(){
    var pass = document.getElementById("ppass").value;
    var washingtonRef = db.collection("usuarios").doc(id);
    return washingtonRef.update({
        pass:pass
    })
    .then(function() {
        alert("Actulizado Correctamente")
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    
}
//combo box

db.collection("afiliados").onSnapshot((querySnapshot)=>{
    document.getElementById("combo").innerHTML="";
    querySnapshot.forEach((doc)=>{
        if(id === doc.data().idtitular && doc.data().estado === 0){
            document.getElementById("combo").innerHTML+=`
            <option id="opcion" value="${doc.data().id_afiliado}">${doc.data().nombres} ${doc.data().apellidos}</option>
            `
        }
        
    })
})


var contador =0;
var numtiket = "001";
var tiket;

db.collection("usuarios").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        db.collection("tikets").onSnapshot((query)=>{
            contador=1
            query.forEach((doc2)=>{
                if(doc.id === id){
                    contador++
                    if(contador > 99){
                        numtiket = contador
                    }else if(contador > 9){
                        numtiket = "0"+contador
                    }else{
                        numtiket ="00"+contador
                    }
                    
                }   
            })
        })
    });
});

var pretiketscant=0;

function generarTiket(){
    idafili = document.getElementById("combo").value;
    if(idafili === "a1"){
        tiket = id_titular+" - 00 - 00 - "+numtiket;
        alert("Tiket: "+tiket)
    }else{
        if(idafili != ""){
            tiket = id_titular+" - "+idafili+" - 00 - "+numtiket;
            alert("Tiket: "+tiket)

            db.collection("tikets").doc(numtiket).set({
                idtiket:numtiket,
                numtiket: tiket,
                idtitular:id_titular,
                idsecundario:idafili,
                idtercero:"00",
                idtitu:id,
                estado:0
            })
            .then(function(docRef) {
                contador=0;
                
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        
            db.collection("tikets").onSnapshot((query2)=>{
                console.log(idafili)
                pretiketscant=0
                query2.forEach((doc2)=>{
                    if(doc2.data().idsecundario === idafili && doc2.data().estado === 0 && doc2.data().idtercero === "00"){
                        pretiketscant++
                        db.collection("afiliados").onSnapshot((query)=>{
                            query.forEach((doc)=>{
                                if(doc.data().id_afiliado === idafili){
                    
                                    var washingtonRef = db.collection("afiliados").doc(doc.id);
                                    return washingtonRef.update({
                                        pretikets: pretiketscant
                                    })
                                    .then(function() {
                                        //console.log("Document successfully updated!");
                                    })
                                    .catch(function(error) {
                                        // The document probably doesn't exist.
                                        console.error("Error updating document: ", error);
                                    });
                                }        
                            })
                        })
                    }
                })
            })
        }else{
            alert("Aun no tienes afiliados para generar tiket");
        }
        
    }
    
        
}








function generarTiketMio(){
    
        tiket = id_titular+" - 00 - 00 - "+numtiket;
        alert("Tiket: "+tiket)
    
    db.collection("tikets").doc(numtiket).set({
        idtiket:numtiket,
        numtiket: tiket,
        idtitular:id_titular,
        idsecundario:"00",
        idtercero:"00",
        idtitu:id,
        estado:0
    })
    .then(function(docRef) {
        contador=0;
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}

//Mis tikets generados
var contiket =0;
var contiketv =0;
db.collection("tikets").onSnapshot((querySnapshot)=>{
    contiket = 0
    contiketv =0;
    querySnapshot.forEach((doc)=>{

        if(doc.data().idtitular === id_titular && doc.data().idsecundario === "00" && doc.data().idtercero === "00" && doc.data().estado === 0){
            contiket++
            document.getElementById("preventa").innerHTML=contiket 

            var washingtonRef = db.collection("usuarios").doc(id);
            return washingtonRef.update({
                pretikets: contiket
            })
            .then(function() {
            //console.log("Document successfully updated!");
            })
            .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            });
        }

        if(doc.data().idtitular === id_titular && doc.data().idsecundario === "00" && doc.data().idtercero === "00" && doc.data().estado === 1){
            
            contiketv++
            cantidadtotal = contiketv *  precio
            document.getElementById("ventatiket").innerHTML=contiketv
            document.getElementById("preventa").innerHTML=contiket

            if(contiketv != 0){
                var washingtonRef = db.collection("usuarios").doc(id);
                return washingtonRef.update({
                ventikets: contiketv,
                precio:cantidadtotal
                })
                .then(function() {
                //console.log("Document successfully updated!");
                if(contiket == 0){
                    var washingtonRef = db.collection("usuarios").doc(id);
                    return washingtonRef.update({
                        pretikets: 0
                    })
                    .then(function() {
                    //console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                     });
                }
                })
                .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                });
            }
            
            
        }
        
    })
})

function preVenta(){
    sessionStorage.setItem("idtiket",id_titular)
    window.location="tiket"
}

/*db.collection("usuarios").onSnapshot((querySnapshot) => {
    document.getElementById("tabla").innerHTML=""
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
       document.getElementById("tabla").innerHTML+=`
       ${doc.data().correo}<br>
       `;
    });
});*/
