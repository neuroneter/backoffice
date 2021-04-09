import { connect } from 'react-redux';
import React, { Component } from 'react';
import DbCrud from '../../../Actions/DbCrud';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, Label, Row} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

//Objeto que describe el nodo en la base de datos de los estados que hacen parte de un pais
//lo usamos para reconocer la estructura no tiene funcionalidad dentro del codigo 
const states =  [
  {
      cities   :   {
        code:  undefined,
        geopoint    :  [undefined,undefined],
        nameCity: undefined,
        neighborhoods:{
          code:  undefined,
          geopoint    :  [undefined,undefined],
          nameNeighbordhood: undefined
        }
      },
      code :   undefined,
      geopoint    :  [undefined,undefined],
      isoCode   :   undefined,
      stateName  :   undefined
  }
];


class StatesAdd extends Component {

  constructor(props) {
    super(props);
    if(props.location.documentId == undefined) 
    this.documentId = this.props.match.params.documentId;
    //Si no se envia la información para actualizar un registro se carga en blanco los campos ya que se esta 
    //creando uno nuevo
    //console.log("llegando");

    if(!props.location.documentId){
      this.props.history.push('/Geo/CountriesList');
    }else{
         //Procedemos a buscar en el objeto el estado cargado de geo cual es el nodo donde se requiere adicionar la información
         console.log(this.props.obj);
         /*this.props.obj.forEach(function(country) {
             //Dentro del objeto identificamos si el nodo en donde me encuentro parado es el que estoy editando 
             if(country.documentId == this.documentId){
                 //una vez encontramos el objeto verificamos si este ya tiene un nodo detipo state creado 
                 //ya que si el pais fue creado pero nunca se le ha adicionado un estado no tendra este nodo 
                 if(country.states == undefined){
                   //Creamos un objeto de tipo Array donde podemos almacenar los datos de este nodo 
                   country.states = [
                    {
                      countryName: '',
                      isoCode: '',
                      active: '',
                      geopoint: {latitude:'',longitude:''}
                    }
                   ];
                 }
                
                 //Creamos el state que almacenara localmente la información que llega al componente
                 this.state = {
                     //Identificador del documento al que tenemos que afectar 
                     documentId: props.location.documentId,
                     //Objeto completo de pais
                     rootObj:country,
                     //Objeto completo de estados, si no existe este objeto se creo previamente un array vacio
                     statesObj:country.states
                 };
                
                 //Eliminamos del objeto su identificador para poder utilizarlo para poder adicionar un nuevo registro hijo 
                 //Esto lo hacemos ya que el objeto que se enviara a la base de datos no tiene dentro del hijo el id del documento 
                 delete this.state.rootObj["documentId"];
             }
         }.bind(this)); */
    }
    
    
    //if(this.props.location.row){
     // this.state = this.props.location.row;
    //}else{
    //  this.state = {
     //   countryName: '',
     //   isoCode: '',
      //  active: '',
     //   geopoint: {latitude:'',longitude:''}
     // }
    //}
  }

  callList() { this.props.history.push('/Geo/CountriesList'); }

  callSave(e) {
    e.preventDefault();
    if(this.state.documentId){
      this.props.update('updateGeo', "geo", "CountriesList", this, this.state.documentId);
      this.props.history.push('/Geo/CountriesList');
    }else{
      this.props.create('addGeo', "geo", "CountriesList", this);
      this.props.history.push('/Geo/CountriesList');
    }
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          dfg
        </Row>
      
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    obj: state.MyAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (type, colletion, component, e) => {
      DbCrud.dbCreate(dispatch, type, colletion, component, e);
    },
    update: (type, colletion, component, e, documentId) => {
      DbCrud.dbUpdate(dispatch, type, colletion, component, e, documentId);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatesAdd);