
  var db = firebase.firestore();

//combo box tikes

var array=[];
var cantidad;
var x=0;
var a=0;
var tik;
var idcom;

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

db.collection("tikets").onSnapshot((query)=>{
    document.getElementById("tiket").innerHTML=""
    query.forEach((doc)=>{
        if(doc.data().estado === 0){    
            document.getElementById("tiket").innerHTML+=`
            <option value="${doc.id}">${doc.data().numtiket}</option>
            `
        }
    })
})



db.collection("compradores").orderBy("fechaven","desc").onSnapshot((query)=>{
    a=0;
    document.getElementById("tabla").innerHTML="";
    query.forEach((doc)=>{

        a++
        if(doc.data().estado === 0){
            document.getElementById("tabla").innerHTML+=`
            <tr>
            <th scope="row">${a}</th>
            <td>${doc.data().nombres}</td>
            <td>${doc.data().apellidos}</td>
            <td>${doc.data().celular}</td>
            <td>${doc.data().dni}</td>
            <td>${doc.data().tikcompra}</td>
            <td>${doc.data().fechaven}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}','${doc.data().tikcompra}')"><i class="fas fa-trash-alt"></i></button>
            </td>
            </tr>
            `
        }
       
        

    })
})

function Buscar(){
    buscar = document.getElementById("buscar").value

    db.collection("compradores").onSnapshot((querySnapshot) => {
        a=0;
        document.getElementById("tabla").innerHTML=""
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);

            if(doc.data().estado === 0 && doc.data().tikcompra === buscar){
                a++
                document.getElementById("tabla").innerHTML+=`
                <tr>
                <th scope="row">${a}</th>
                <td>${doc.data().nombres}</td>
                <td>${doc.data().apellidos}</td>
                <td>${doc.data().celular}</td>
                <td>${doc.data().dni}</td>
                <td>${doc.data().tikcompra}</td>
                <td>${doc.data().fechaven}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}','${doc.data().tikcompra}')"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
                `
            }else if(doc.data().estado === 0 && buscar === ""){
                a++
                document.getElementById("tabla").innerHTML+=`
                <tr>
                <th scope="row">${a}</th>
                <td>${doc.data().nombres}</td>
                <td>${doc.data().apellidos}</td>
                <td>${doc.data().celular}</td>
                <td>${doc.data().dni}</td>
                <td>${doc.data().tikcompra}</td>
                <td>${doc.data().fechaven}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}','${doc.data().tikcompra}')"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
                `
                }
        });
    });
}

function editar(id){
    idcom=id;
    db.collection("compradores").onSnapshot((query)=>{
        query.forEach((doc)=>{
            if(doc.id === id){
                document.getElementById("enombre").value = doc.data().nombres
                document.getElementById("eapellido").value = doc.data().apellidos
                document.getElementById("ecelular").value = doc.data().celular
                document.getElementById("edni").value = doc.data().dni
                document.getElementById("efecha").value = doc.data().fechaven
            }
        })
    })
}

function actualizar(){
    var nombre = document.getElementById("enombre").value
    var apellido = document.getElementById("eapellido").value
    var celular = document.getElementById("ecelular").value
    var dni = document.getElementById("edni").value

    var washingtonRef = db.collection("compradores").doc(idcom);
            return washingtonRef.update({
                nombres: nombre,
                apellidos: apellido,
                celular: celular,
                dni:dni
            })
            .then(function() {
            console.log("Document successfully updated!");
            alert("Actualizado correctamente")
            })
            .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            })
}

function eliminar(id,idtiket){
    var opcion = confirm("¿Estas seguro de eliminar?")
    if(opcion == true){

        db.collection("compradores").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");

            var washingtonRef = db.collection("tikets").doc(idtiket);
            return washingtonRef.update({
                estado: 0
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        
    }
    
}




function reconocer(){
    var dni = document.getElementById("dni").value;
    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("celular").value = ""

    db.collection("usuarios").onSnapshot((query)=>{
        query.forEach((doc)=>{
    
            if(doc.data().dni === dni){
                document.getElementById("nombre").value = doc.data().nombres
                document.getElementById("apellido").value = doc.data().apellidos
                document.getElementById("celular").value = doc.data().celular
            }
    
        })
    })

    db.collection("afiliados").onSnapshot((query)=>{
        query.forEach((doc)=>{
    
            if(doc.data().dni === dni){
                document.getElementById("nombre").value = doc.data().nombres
                document.getElementById("apellido").value = doc.data().apellidos
                document.getElementById("celular").value = doc.data().celular
            }
    
        })
    })

    db.collection("terceros").onSnapshot((query)=>{
        query.forEach((doc)=>{
    
            if(doc.data().dni === dni){
                document.getElementById("nombre").value = doc.data().nombres
                document.getElementById("apellido").value = doc.data().apellidos
                document.getElementById("celular").value = doc.data().celular
            }
    
        })
    })

    db.collection("compradores").onSnapshot((query)=>{
        query.forEach((doc)=>{
    
            if(doc.data().dni === dni){
                document.getElementById("nombre").value = doc.data().nombres
                document.getElementById("apellido").value = doc.data().apellidos
                document.getElementById("celular").value = doc.data().celular
            }
    
        })
    })
}




function verfecha(){
    var hoy = new Date();
    var fecha = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear();
    console.log(fecha)
    document.getElementById("fecha").value = fecha
}
    
    

function registrar(){

    var nombre = document.getElementById("nombre").value
    var apellido = document.getElementById("apellido").value
    var celular = document.getElementById("celular").value
    var dni = document.getElementById("dni").value
    var tiket = document.getElementById("tiket").value
    var fechav = document.getElementById("fecha").value;

    if(nombre != "" && apellido !="" && celular !="" && dni !="" && tiket !=""){
        db.collection("compradores").add({
            nombres: nombre,
            apellidos: apellido,
            celular: celular,
            dni:dni,
            fechaven:fechav,
            tikcompra:tiket,
            estado:0
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("celular").value = "";
            x=0;
            alert("Registrado Correctamente")
            
            var washingtonRef = db.collection("tikets").doc(tiket);
            return washingtonRef.update({
            estado: 1
            })
            .then(function() {
            console.log("Document successfully updated!");
            })
            .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }else{
        alert("Complete los campos primero")
    }
        
    
}




