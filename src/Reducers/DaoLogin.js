import firebase from '../Actions/Firebase.js';

const user = {email:"email", password:"password", uid:"uid"}

//se pasa un estado por defecto para definicion de estructura
const reducerLogin = (state = user, action) => {
    // console.log("Llamada Dispacth reducerLogin ");
    var NewState = Object.assign({},state);

    if(action.type == "loadUser"){
        NewState.email = action.stateUser.email;
        NewState.uid = action.stateUser.uid;
        return NewState;
    }
    if(action.type == "lInput"){
        if(action.idInput == "email") NewState.email = action.value;
        if(action.idInput == "password") NewState.password = action.value;
        return NewState;
    }
    if(action.type == "login"){
        firebase.auth().signInWithEmailAndPassword(NewState.email, NewState.password)
        .then(
            function(){window.location = "/"}
        )
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Usuario y/o Contraseña incorrecta "+errorCode+" - "+errorMessage);
        });
    }
    if(action.type == "logout"){
        firebase.auth().signOut().then(function() {
            window.location = "#/login";
        }).catch(function(error) {
            console.log("Se ha precentado un erro al salir de la aplicación "+error)
        });
    }
    return state;
} 

const DaoLogin = {reducerLogin}

export default DaoLogin;