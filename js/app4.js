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
var precio=10;
var cantidadtotal = 0;

//Mostrar nombre
db.collection("terceros").onSnapshot((querySnapshot) => {
    document.getElementById("nom").innerHTML=""
    querySnapshot.forEach((doc) => {
        if(doc.id === id){
            document.getElementById("nom").innerHTML="<span>"+doc.data().id_terceros+" - "+doc.data().nombres+" "+doc.data().apellidos+"</span>"
        }

    });
});

//Mis tikets generados
var contiket =0;
var contiketv =0;
db.collection("tikets").onSnapshot((querySnapshot)=>{
    contiket = 0
    contiketv =0;
    querySnapshot.forEach((doc)=>{

        if(  doc.data().idtercero === id && doc.data().estado === 0){
            contiket++
            document.getElementById("preventa").innerHTML=contiket 

            var washingtonRef = db.collection("terceros").doc(id);
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

        if( doc.data().idtercero === id && doc.data().estado === 1){
            
            contiketv++
            cantidadtotal = contiketv * precio;
            document.getElementById("ventatiket").innerHTML=contiketv
            document.getElementById("preventa").innerHTML=contiket

            if(contiketv != 0){
                var washingtonRef = db.collection("terceros").doc(id);
                return washingtonRef.update({
                ventikets: contiketv,
                precio:cantidadtotal
                })
                .then(function() {
                //console.log("Document successfully updated!");
                if(contiket == 0){
                    var washingtonRef = db.collection("terceros").doc(id);
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

//Rergistrar afiliado

//mostrar afiliados correctos


//mostrar perfil

function perfilDatos(){

    db.collection("terceros").onSnapshot((querySnapshot) => {
        document.getElementById("dperfil").innerHTML=""
        querySnapshot.forEach((doc) => {
        //console.log(`${doc2.id} => ${doc2.data()}`);
        var iddoc = doc.id

            if(iddoc === id){
            document.getElementById("dperfil").innerHTML+=`
            <label>Contraseña</label>
            <input type="password" id="ppass" placeholder="Contraseña" class="form-control my-3" autocomplete="off" value="${doc.data().pass}">
            `
            }
        });
    });
}

//actulizar pérfil

function acPerfil(){
    var pass = document.getElementById("ppass").value;
    var washingtonRef = db.collection("terceros").doc(id);
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

/*db.collection("usuarios").onSnapshot((querySnapshot) => {
    document.getElementById("tabla").innerHTML=""
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
       document.getElementById("tabla").innerHTML+=`
       ${doc.data().correo}<br>
       `;
    });
});*/
