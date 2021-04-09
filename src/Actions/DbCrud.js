import firebase from './Firebase.js';
import { reset } from 'redux-form';
let db = firebase.firestore();

var UrlServerless = "https://us-central1-serverless-278902.cloudfunctions.net/serverless";
//var UrlLocal = "http://localhost:5555";


function dbMLoad(dispatch, type, route, body, method = 'POST', callFuntion = () => {}){
    
    //console.log("llego la solicitud DbCrud dbMload")
    var queryUrl = UrlServerless+"/"+route;
    var requestOptions = {};
    if(method !== "GET"){
        requestOptions = {
            method: method,
            headers: { 
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        };
    }
    console.log(queryUrl);
    console.log(requestOptions);
    // Where we're fetching data from
    fetch(queryUrl,requestOptions)
    .then(data => data.json())
    .then(data => {
        data.body = body;
        dispatch({ type: type, data: data });
        callFuntion(data);
    })
    // Catch any errors we hit and update the app
    .catch(function (error) {
        console.log("Error cargando datos " + error);
    });      
}



//Busca un registro puntual utilizando una llave o value fijo para en un campo o file 
function dbFindRegister(dispatch, type, colletion, file, value) {
    db.collection(colletion)
        .where(file, "==", value).get()
        .then(function (snapshot) {
            snapshot.forEach(function (doc) {
                dispatch({ type: type, data: doc.data() })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: " + error);
        });
}

//Recupera todos los valores de una Collection de datos 
function dbFindColletion(dispatch, type, colletion) {
    //Hacemos la llamada a la bd para buscar todos los datos de una collection
    db.collection(colletion)
        .get()
        .then(function (snapshot) {
            dispatch({ type: type, data: snapshot });
        })
        .catch(function (error) {
            console.log("Error getting documents: " + error);
        });
}

function objDb(e){
     //Recuperamos todos los objetos que tienen una etiqueta refs
     const dateRef = e.refs;
     const formData = {};
     var latitude = 0;
     var longitude = 0;
     var valorTmp = '';
     //Recorremos el array con todas las etiquetas refs
     for (const field in dateRef) {
         //Recuperamos el valor que tiene el objeto del formulario 
         valorTmp = document.getElementById(field).value;
         //Como los tipos Geopoint se component de dos datos tenemos un if que nos permite identificarlos para posteriormente construir el array que correponde a la cordenada
         if (dateRef[field].props.format == 'latitude') latitude = parseFloat(valorTmp);
         else if (dateRef[field].props.format == 'longitude') longitude = parseFloat(valorTmp);
         else formData[field] = valorTmp;
         //Al utilizar maskaras en input utilizamos el caracter * que rechena valores blancos por lo que antes de almacenar 
         //en la bd tenemos que retirar estos caracteres
     }
 
     if (latitude != 0 && longitude != 0) formData["geopoint"] = new firebase.firestore.GeoPoint(latitude, longitude);
     return formData;
}

//Crea un nuevo registro en la base de datos 
function dbCreate(dispatch, type, colletion, component, e) {
    const formData = objDb(e);
    //Procedemos ha ingresar el valor en la collection, utilizando como documento id un valor autogenerado 
    //dejamos que Firebase sea quien lo genere 
    db.collection(colletion).add(formData)
        .then(function (docRef) {
            //agregamos al objeto nuevo el valor retornado de identificación 
            formData["documentId"] = docRef.id;
            //Para tener los listados actualizados reseteamos el componente listado
            dispatch(reset(component));
            //Ahora procedemos a llamar la funcion dispatcher quien se encargara de adicionar al state el nuevo objeto 
            //sin tener que realizar una consulta a la bd para recargar los datos.
            dispatch({ type: type, data: formData });
        })
        .catch(function (error) { console.error("Error al crear documento ", error); });
}

//Eliminar un registro o documento en una collection
function dbDelete(dispatch, type, colletion, component, documentId) {
    db.collection(colletion).doc(documentId).delete().then(function () {
        dispatch(reset(component));
        dispatch({ type: type, data: documentId });
    }).catch(function (error) { console.error("Error removing document: ", error); });
}

//Actualizar un registro
function dbUpdate(dispatch, type, colletion, component, e, documentId) {
    const formData = objDb(e);
    formData["documentId"] = documentId;
    // To update age and favorite color:
    db.collection(colletion).doc(documentId).update(formData)
    .then(function () {
        dispatch(reset(component));
        dispatch({ type: type, data: formData });
    });

}

//Actualizar el campo de un registro 
function dbEditFile(dispatch, type, colletion, component, documentId, fileEdit, newFileEdit){
    const formData = {};
    formData[fileEdit] = newFileEdit;
    var coll = db.collection(colletion).doc(documentId)
    .update(formData)
    .then(function () {
        dispatch(reset(component));
        dispatch({ type: type, data: formData });
    });
}

const DbCrud = { dbMLoad, dbFindRegister, dbFindColletion, dbCreate, dbDelete, dbUpdate, dbEditFile }

export default DbCrud;