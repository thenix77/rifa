
  
var db = firebase.firestore();

var eid =""
var id_afiliado="01"
var buscar = document.getElementById("buscar").value


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

//combo box de usuarios

db.collection("usuarios").orderBy("id_titular").onSnapshot((query)=>{
    document.getElementById("combouser").innerHTML=""
    query.forEach((doc)=>{

        document.getElementById("combouser").innerHTML+=`
        <option value="${doc.id}">${doc.data().nombres} ${doc.data().apellidos}</option>
        `

    })
})

function mostrar(){
    db.collection("afiliados").orderBy("id_afiliado").onSnapshot((querySnapshot) => {
        document.getElementById("tabla").innerHTML=""
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
    
            if(doc.data().estado === 0 && doc.data().idtitular === document.getElementById("combouser").value){
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
                <td>S/. ${doc.data().precio}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
                `;
            }
        });
    });
}



function Buscar(){
    buscar = document.getElementById("buscar").value

    db.collection("afiliados").orderBy("id_afiliado").onSnapshot((querySnapshot) => {
        document.getElementById("tabla").innerHTML=""
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);

            if(doc.data().estado === 0 && doc.data().dni === buscar){
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
                <td>S/. ${doc.data().precio}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
                `;
            }else if(doc.data().estado === 0 && buscar === ""){
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
                <td>S/. ${doc.data().precio}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-target="#editar" data-toggle="modal" onclick="editar('${doc.id}')"><i class="far fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>
                `;
            }
        });
    });
}


  

function eliminar(id){
    var opcion = confirm("¿Estas seguro de eliminar?")
    if(opcion == true){
        var washingtonRef = db.collection("afiliados").doc(id);
        return washingtonRef.update({
            estado: 1
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    
}

function editar(id){
    db.collection("afiliados").onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            if(doc.id === id){
                document.getElementById("enombre").value = doc.data().nombres;
                document.getElementById("eapellido").value = doc.data().apellidos;
                document.getElementById("ecelular").value = doc.data().celular;
                document.getElementById("ecorreo").value = doc.data().correo;
                document.getElementById("edni").value = doc.data().dni;
                document.getElementById("epass").value = doc.data().pass;
                eid = doc.id;
            }
        })
    })
}

function actulizar(){
        nombre = document.getElementById("enombre").value 
        apellido = document.getElementById("eapellido").value 
        celular = document.getElementById("ecelular").value 
        correo = document.getElementById("ecorreo").value 
        dni = document.getElementById("edni").value 
        pass =document.getElementById("epass").value

    var washingtonRef = db.collection("afiliados").doc(eid);
    return washingtonRef.update({
        nombres: nombre,
        apellidos: apellido,
        celular: celular,
        correo:correo,
        dni:dni,
        pass:pass,
    })
    .then(function() {
        console.log("Document successfully updated!");
        alert("Actulizado Correctamente")
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}



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

//Rergistrar afiliado
function registrar(){
    var idtitu = document.getElementById("combouser").value
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var celular = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;
    var dni = document.getElementById("dni").value;
    var pass = document.getElementById("pass").value;

    if(nombre == "" && apellido == "" && celular =="" && dni =="" ){
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
            estado:0,
            precio:0,
            id_afiliado:id_afiliado,
            idtitular:idtitu
    
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