const productsObj = {
    listStores:[],
    agents:[],
    configs:{},
}

//se pasa un estado por defecto para definicion de estructura
function Stores(state = productsObj, action){
    //console.log(action.data);
    var NewState = Object.assign({},state);
    if(action.type == "loadStores"){
        NewState.listStores = action.data;
    }
    if(action.type == "loadConfigs"){
       NewState.configs = action.data[0];
    }
    if(action.type == "updateStores"){
        if(NewState.listStores.length > 0){
            if(action.data._id != undefined) NewState.listStores.push(action.data);
            else{
                for(var i=0; i<NewState.listStores.length; i++){
                    if(NewState.listStores[i]._id == action.data.update._id){
                        NewState.listStores[i] = action.data.body;
                        break;
                    }
                }
            }
        }
    }
    if(action.type == "agents"){
        NewState.agents = action.data;
    }
    return NewState;
}
const DaoStores = {Stores}

export default DaoStores;