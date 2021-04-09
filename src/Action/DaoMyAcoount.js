import firebase from './Firebase.js.js.js';
let db = firebase.firestore();

// Estructura de DB para Usuario
const company = {
    email       :   undefined,
    companyName :   undefined,
    tradeName   :   undefined,
    nit :   undefined,
    logo : undefined,
    addresses    :   {
        0   :  {
            address :   undefined,
            neighborhood    :   undefined,
            phone   :   undefined,
            mobile  :   undefined,
            email   :   undefined,
            notificationId  :   undefined,
            postalcode  :   undefined,
            country :   undefined,
            state   :   undefined,
            city    :   undefined,
            info    :   undefined
        },
        1   :  {
            address :   undefined,
            neighborhood    :   undefined,
            phone   :   undefined,
            mobile  :   undefined,
            email   :   undefined,
            notificationId  :   undefined,
            postalcode  :   undefined,
            country :   undefined,
            state   :   undefined,
            city    :   undefined,
            info    :   undefined
        }
    },
    banks   :   {
        0   :   {
            bankId    :   undefined,
            number      :   undefined,
            type        :   undefined,
            title       :   undefined
        }
    }
}

function DUser(){

    

    // Cargamos el registro de la empresa a la que corresponde 

    // 1. Obtenemos el registro de información basica de la empresa
/*
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });


    db.collection("Company").where("email", "==", "ohernandez83@hotmail.com").onSnapshot(function(snapshot) {
        console.log("Current users born before 1815:");
        snapshot.forEach(function (userSnapshot) {
            console.log(userSnapshot.data())
        });
    });

    // db.collection("user").doc("company").onSnapshot(function(doc) {
        //  console.log("Current data: ", doc.data());
    // });

*/
}

//se pasa un estado por defecto para definicion de estructura
function MyAccount(state = company, action){
    // console.log("Llamada Dispacth userAdd  "+action.type);
    var NewState = Object.assign({},state);
    if(action.type == "loadCompany"){
        NewState = action.data;
        return NewState;
    }else return NewState;
    
}

const DaoMyAccount = {MyAccount}

export default DaoMyAccount;