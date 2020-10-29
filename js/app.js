/*$(document).ready(function(){
    $('.carousel').carousel({
      interval: 5000
    });
});*/

/********************/
/*     Animación    */
/********************/

/********************/
/* Color del Navbar */
/********************/
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 40);
  });

var db = firebase.firestore();

var cantidad=0;
db.collection("admin").onSnapshot((query)=>{
    var cont =0;
    query.forEach((doc)=>{
        cont++
        cantidad = cont; 
    })
})

function generaradmin(){
    if(cantidad == 0){
        db.collection("admin").add({
            pass: "admin",
            user: "admin"
        })
        .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
            location.reload();
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }else{
        console.log("Ya hay un admin");
    }
}


// Leer documentos
function login(){
    var dni = document.getElementById("dni").value;
    var pass = document.getElementById("pass").value;

    if(pass=="" && dni==""){
        alert("Ingrese Datos")
    }else{

        db.collection("admin").onSnapshot((query)=>{
            query.forEach((doc)=>{
                if(dni === doc.data().user && pass === doc.data().pass){
                    window.location=`admin/admin`

                    sessionStorage.setItem("id",doc.id)

                    document.getElementById("res").innerHTML=""
                }else{
                    document.getElementById("res").innerHTML="Datos Incorrectos"
                }
            })
        })

        db.collection("usuarios").onSnapshot((query)=>{
            query.forEach((doc)=>{
                if(dni === doc.data().dni && pass === doc.data().pass && doc.data().estado === 0){
                    window.location=`principal`
                    sessionStorage.setItem("id",doc.id)
                    document.getElementById("res").innerHTML=""
                }else{
                    document.getElementById("res").innerHTML="Datos Incorrectos"
                }
            })
        })

        db.collection("afiliados").onSnapshot((query)=>{
            query.forEach((doc)=>{
                if(dni === doc.data().dni && pass === doc.data().pass && doc.data().estado === 0){
                    window.location=`afiliados`
                    sessionStorage.setItem("id",doc.id)
                    document.getElementById("res").innerHTML=""
                }else{
                    document.getElementById("res").innerHTML="Datos Incorrectos"
                }
            })
        })

        db.collection("terceros").onSnapshot((query)=>{
            query.forEach((doc)=>{
                if(dni === doc.data().dni && pass === doc.data().pass && doc.data().estado === 0){
                    window.location=`terceros`
                    sessionStorage.setItem("id",doc.id)
                    document.getElementById("res").innerHTML=""
                }else{
                document.getElementById("res").innerHTML="Datos Incorrectos"
                }
            })
        })
    }
}






