

const orders = {
    listOrders:[], 
    listFilters:[], 
    pagination:[], 
    listOrdersEdit:[],
    listOrdersEditHistory:[],
    listOrdersEditStatus:[],
    listOrdersEditUnits:[]
}

//se pasa un estado por defecto para definicion de estructura
function Orders(state = orders, action){
    //console.log(action.data);
    var NewState = Object.assign({},state);
    if(action.type == "loadOrders"){
        NewState.pagination = action.data.info;
        NewState.listOrders = action.data.data;
    }
    if(action.type == "loadFilters"){
        //action.data.data.unshift({_id:0,code:0,name:"Todas los Proveedores"});
        //console.log(action.data.status);
        NewState.listFilters = action.data;
    }
    if(action.type == "loadOrdersEdit"){
        NewState.listOrdersEditStatus = action.data.status;
        NewState.listOrdersEditUnits = action.data.units;
        NewState.listOrdersEdit = action.data.order;
        NewState.listOrdersEditHistory = action.data.history;
    }
    if(action.type == "loadOrdersUpdate"){
        /*
        console.log(action.data);
        console.log(NewState.listOrdersEdit);
        if(action.data.nModified == "1"){
            NewState.listOrdersEdit.forEach((val, item) => {
                if(val._id == action.data._id){
                    if(action.data.file == "status") NewState.listOrdersEdit.status = action.data.value;
                    if(action.data.file == "unit") NewState.listOrdersEdit.unit = action.data.value;
                }
            })
        }*/
        
    }
    return NewState;
}

const DaoOrders = {Orders}

export default DaoOrders;