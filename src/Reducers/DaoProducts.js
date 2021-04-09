const productsObj = {
    newId:"",
    listFilters:[],
    listProducts:[],
    pagination:[], 
    listCategories:[],
    listBrands:[],
    listSuppliers:[],
    listTaxes:[],
    listStores:[]
}

//se pasa un estado por defecto para definicion de estructura
function Products(state = productsObj, action){
    //console.log(action.data);
    var NewState = Object.assign({},state);
    if(action.type == "loadProducts"){
        NewState.pagination = action.data.info;
        NewState.listProducts = action.data.data;
        NewState.listCategories = action.data.categories;
        NewState.listBrands = action.data.brands;
        NewState.listSuppliers = action.data.suppliers;
        NewState.listTaxes = action.data.taxes;
        NewState.listStores = action.data.stores;
    }
    if(action.type == "loadProdFindFilter"){
        NewState.pagination = action.data.info;
        NewState.listProducts = action.data.data;
    }
    if(action.type == "updateProducts"){
        if(NewState.listProducts.length > 0){
           if(action.data._id != undefined) NewState.listProducts.push(action.data);
           else{
               for(var i=0; i<NewState.listProducts.length; i++){
                    if(NewState.listProducts[i]._id == action.data.update._id){
                        NewState.listProducts[i] = action.data.body;
                        break;
                    }
               }
           }
        }
    }
    if(action.type == "deleteProducts"){
        if(NewState.listProducts.length > 0){
            var listProductTmp = [];
            for(var i=0; i<NewState.listProducts.length; i++){
                if(NewState.listProducts[i]._id != action.data.update._id){
                    listProductTmp.push(NewState.listProducts[i]);
                }
           }
           NewState.listProducts = listProductTmp;
        }
    }
    if(action.type == "loadFilters"){
        console.log(action.data);
        NewState.listFilters = action.data;
    }
    return NewState;
}

const DaoProducts = {Products}

export default DaoProducts;