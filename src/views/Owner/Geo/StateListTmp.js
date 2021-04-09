import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardBody, Button, ButtonGroup, Row} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';
var flat = true;

class StateList extends Component {

constructor(props) {
    super(props);
    this.options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
    };
    this.state = {
        //Cargamos en el estado el identificador del documento en el que menencuentro 
        documentId: this.props.match.params.documentId,
        //Creamos un objeto donde almacenaremos toda la información de este nodo
        rootObj:"",
        //Creamos un objeto donde almacenaremos la informacion de los estados de este nodo 
        statesObj:""
    }; 

    //Si la url es llamada sin enviar el identificador del documento se retorna a el listado de las paises
    if(!this.props.match.params.documentId){
     this.props.history.push('/Geo/CountriesList');
    }else{
        console.log("Valores");
        console.log(this.props.obj);
        //Recorremos todo el objeto de paises para identificar cual es el pais al que le estamos listando los estados 
        this.props.obj.forEach(function(country) {
            //Identificamos si el nodo que estamos visitando es el nodo equivalente al pais seleccionado
            if(country.documentId == this.props.match.params.documentId){
                //Si no existen estados creados ya que el pais es nuevo se crea un array vacio
                if(country.states == undefined){
                  country.states = new Array();
                }
                //se construye el objeto de estado y se le cargan los siguientes datos 
                this.state = {
                    //Identificador del documento que estamos trabajando
                    documentId: this.props.match.params.documentId,
                    //Objeto completo del pais que estamos trabajando
                    rootObj:country,
                    //Objeto completo de todos los estados que hacen parte de est pais 
                    statesObj:country.states
                };
                //Eliminamos del objeto su identificador para poder utilizarlo para poder adicionar un nuevo registro hijo 
                delete this.state.rootObj["documentId"];
            }
        }.bind(this));
    }
}

//Funcion que construye los botones de ediccion para cada registro listado en la tabla 
editFormatter(cell, row) {
  return (
    <ButtonGroup>
      <Button onClick={this.callEdit.bind(this, row)} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
        <i className="icon-pencil"></i>
      </Button>
      <Button onClick={this.toggleDanger.bind(this, row)} size="sm" className="btn-reddit btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
        <i className="icon-trash"></i>
      </Button>
    </ButtonGroup>
  )
}

editObject(row) {
  this.props.history.push('/Geo/CitiesList/'+this.state.documentId+'/'+row.code);
}

loadStates(cell,row){
  return(
    <Button size="sm"  onClick={()=>this.editObject(row)} className="btn-dropbox btn-brand text mr-1 mb-1 btn btn-secondary btn-lg">
        Ver Ciudades
    </Button>
  ) 
}

geopoint(cell, row){
 return(
    <div>
      Lat: {row.geopoint.latitude} Lon:{row.geopoint.longitude} 
    </div>
  );
}

active(cell, row){
  if(row.active == '1'){
      return(
          <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked/>
      );
    }else{
      return(
         <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label  />
      );
    }
}

//Boton que permite retornar a el listado de paises
callBackCountry(){this.props.history.push('/Geo/CountriesList');}

//Funcion que permite hacer la llamada al formulario para crear un nuevo registro 
callAdd() { 
  this.props.history.push({
  pathname: '/Geo/StatesAdd/'+this.state.documentId,
    rootObj:this.state.rootObj
  }); 
}

//Funcion que permite hacer la llamada al formulario para editar un nuevo registro 
callEdit(row) {
  console.log("editando el registro");
  //this.props.history.push({
    //pathname: '/Geo/CountriesAdd',
    //row: row
  //})
}

//Cambia el valor a visible del mensaje de alerta 
//guarda el identificador de la fila que sera afectada 
toggleDanger(row) {
  this.setState({
    danger: !this.state.danger,
    tmpRow: row.documentId
  });
}

componentDidMount() {
  if (flat) {
    console.log("llamando a loadGeo");
    //console.log(documentId);
    //flat = false;
    //this.props.loadReducer('loadGeo', "geo");
  }
}

render() {

  return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i onClick={this.callBackCountry.bind(this)} className="btn btn-link">Pais: {this.state.rootObj.countryName}</i>
            <div className="card-header-actions">
              <a href="https://github.com/AllenFang/react-bootstrap-table" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">Aprende</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Button color="primary" onClick={this.callAdd.bind(this)} ><i className="fa icon-plus"></i>&nbsp;Crear Estado</Button>
            <Button className="float-right" color="secondary" onClick={this.callBackCountry.bind(this)} className="float-right"><i className="fa icon-arrow-left-circle"></i>&nbsp;Regresar</Button>
            <Row>&nbsp;</Row>
            <BootstrapTable data={this.state.statesObj} striped hover pagination search options={this.options}> 
              <TableHeaderColumn dataField='stateName' dataSort>Estado</TableHeaderColumn>
              <TableHeaderColumn dataField='isoCode'>Codigo Iso</TableHeaderColumn>
              <TableHeaderColumn isKey dataField='code'>Codigo General</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.geopoint.bind(this)}>Geo Punto</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.active.bind(this)} dataAlign='center'>Activo</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.loadStates.bind(this)} dataAlign='right'>Ciudades</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter.bind(this)} dataAlign='right'>Action</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    obj: state.DaoGeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //type: se utiliza para identificar la accion en el store 
    //colletion: la collection de la base de datos
    //component: componente a resetear para que el cambio se vea automaticamente 
    //documentId: Identificador del registro a modificar 
    loadReducer: (type, colletion) => { 
      DbCrud.dbFindColletion(dispatch, type, colletion); 
    }//,
    //deleteReducer: (type, colletion, component, documentId) => { 
    //  DbCrud.dbDelete(dispatch, type, colletion, component, documentId); 
    //},
    //editFileReducer: (type, colletion, component, documentId, fileEdit, newFileEdit) => { 
    //  DbCrud.dbEditFile(dispatch, type, colletion, component, documentId, fileEdit, newFileEdit); 
    //}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateList);
