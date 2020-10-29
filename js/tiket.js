

var db = firebase.firestore();
var tiket;



var id=sessionStorage.getItem("idtiket")

db.collection("tikets").orderBy("idsecundario").onSnapshot((query=>{
    document.getElementById("combo").innerHTML+=""
    query.forEach((doc)=>{
        if(doc.data().idtitular === id && doc.data().estado === 0){
            document.getElementById("combo").innerHTML+=`
                <option value="${doc.data().numtiket}">${doc.data().numtiket}</option>
            `
        }
    })
}))

function tikets(){
    tiket = document.getElementById("combo").value;
    //console.log(tiket)
    document.getElementById("numtiket").innerHTML="&nbsp;&nbsp;N° "+tiket
    document.getElementById("barra").innerHTML=tiket

}

