import { iterator } from "core-js/fn/symbol";


const Obj = {totalcombinations:[], listCombination:[]}

//se pasa un estado por defecto para definicion de estructura
function Combinations(state = Obj, action){
    //console.log(action.data);
    var NewState = Object.assign({},state);
    if(action.type == "loadCombinations"){
        NewState.totalcombinations = action.data;
        NewState.listCombination = action.data.Combinations;
    }
    return NewState;
}
const DaoCombinations = {Combinations}

export default DaoCombinations;