import firebase from '../Actions/Firebase.js';
let db = firebase.firestore();

// Estructura de DB para Usuario
const geo = [
    {
        active : undefined,
        countryName :   undefined,
        geopoint : [undefined,undefined],
        isoCode:   undefined,
        states:{
            0   :  {
                cities   :   {
                    code:  undefined,
                    geopoint    :  [undefined,undefined],
                    nameCity: undefined
                },
                code :   undefined,
                geopoint    :  [undefined,undefined],
                isoCode   :   undefined,
                stateName  :   undefined
            }
        }
    }
]

//se pasa un estado por defecto para definicion de estructura
function Geo(state = [], action){
    var NewState = Object.assign([],state);
    if(action.type == "loadGeo"){
        action.data.forEach(function (doc) {
            var newObj = Object.assign({"documentId":doc.id}, doc.data());
            NewState.push(newObj);
        });
        return NewState;
    }else if(action.type == "addGeo"){
        NewState.push(action.data);
        return NewState;
    }else if(action.type == "deleteGeo"){
        var tempState = [];
        NewState.forEach(function (doc){ if(doc.documentId != action.data) tempState.push(doc); });
        return tempState;
    }else if(action.type == "updateGeo"){
        var conta = 0;
        NewState.forEach(function (doc){ 
            if(doc.documentId == action.data.documentId) NewState[conta] = action.data;
            conta = conta+1;
        });
        return NewState;
    }
    else return NewState;
}

const DaoGeo = {Geo}

export default DaoGeo;