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
var id_terceros="01";
var cantidadtotal=0;
var precio =10;

//Mostrar nombre
db.collection("afiliados").onSnapshot((querySnapshot) => {
    document.getElementById("nom").innerHTML=""
    querySnapshot.forEach((doc) => {
        if(doc.id === id){
            document.getElementById("nom").innerHTML="<span>"+doc.data().id_afiliado+" - "+doc.data().nombres+" "+doc.data().apellidos+"</span>"
        }

    });
});




//mostrar afiliados correctos

db.collection("terceros").orderBy("id_terceros").onSnapshot((querySnapshot)=>{
    document.getElementById("tabla").innerHTML=""
  querySnapshot.forEach((doc)=>{
      if(id === doc.data().idafiliado && doc.data().estado === 0){
        document.getElementById("tabla").innerHTML+=`
        <tr>
        <th scope="row">${doc.data().id_terceros}</th>
        <td>${doc.data().nombres}</td>
        <td>${doc.data().apellidos}</td>
        <td>${doc.data().correo}</td>
        <td>${doc.data().celular}</td>
        <td>${doc.data().dni}</td>
        <td>${doc.data().pretikets}</td>
        <td>${doc.data().ventikets}</td>
        </tr>
        `
      }
  })  
})


//mostrar perfil

function perfilDatos(){

    db.collection("afiliados").onSnapshot((querySnapshot) => {
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
    var washingtonRef = db.collection("afiliados").doc(id);
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


//Mis tikets generados
var contiket =0;
var contiketv =0;
db.collection("tikets").onSnapshot((querySnapshot)=>{
    contiket = 0
    contiketv =0;
    querySnapshot.forEach((doc)=>{

        if( doc.data().idsecundario === id && doc.data().idtercero === "00" && doc.data().estado === 0){
            contiket++
            document.getElementById("preventa").innerHTML=contiket 

            var washingtonRef = db.collection("afiliados").doc(id);
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

        if( doc.data().idsecundario === id && doc.data().idtercero === "00" && doc.data().estado === 1){
            
            contiketv++
            cantidadtotal = contiketv * precio;
            document.getElementById("ventatiket").innerHTML=contiketv
            document.getElementById("preventa").innerHTML=contiket

            if(contiketv != 0){
                var washingtonRef = db.collection("afiliados").doc(id);
                return washingtonRef.update({
                ventikets: contiketv,
                precio:cantidadtotal
                })
                .then(function() {
                //console.log("Document successfully updated!");
                if(contiket == 0){
                    var washingtonRef = db.collection("afiliados").doc(id);
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

/*db.collection("usuarios").onSnapshot((querySnapshot) => {
    document.getElementById("tabla").innerHTML=""
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
       document.getElementById("tabla").innerHTML+=`
       ${doc.data().correo}<br>
       `;
    });
});*/
