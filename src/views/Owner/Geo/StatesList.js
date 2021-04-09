import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';

var flat = true;

/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class CountriesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tmpRow : '',
      danger: false
    }
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


    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    if (flat) {
      flat = false;
      this.props.loadReducer('loadGeo', "geo");
    }
  }

  //Cambia el valor a visible del mensaje de alerta 
  //guarda el identificador de la fila que sera afectada 
  toggleDanger(row) {
    this.setState({
      danger: !this.state.danger,
      tmpRow: row.documentId
    });
  }
  
  //Funcion que elimina el resgistro o documento seleccionado de la base de datos 
  trashButton() {
    //Llamada a eliminar el registro
    this.props.deleteReducer('deleteGeo', "geo", "CountriesList", this.state.tmpRow);
    //Desactivar la pantalla de aviso que fue ejecutada para eliminar el registro 
    this.setState({
      danger: !this.state.danger,
      tmpRow: ''
    });
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

  //Funcion que permite hacer la llamada a un hijo de country 
  callChild(row) {
    this.props.history.push({
      pathname: '/Geo/StatesList/'+row.documentId
    })
  }

  //Funcion que permite hacer la llamada al formulario para crear un nuevo registro 
  callAdd() { this.props.history.push('/Geo/CountriesAdd'); }

  //Funcion que permite hacer la llamada al formulario para editar un nuevo registro 
  callEdit(row) {
    this.props.history.push({
      pathname: '/Geo/CountriesAdd',
      row: row
    })
  }

  //Editar un campo en este caso si esta activo  
  callEditActive(row) {
    (row.active == 1)? row.active = 0 : row.active = 1;
    this.props.editFileReducer('editFileGeo', "geo", "CountriesList", row.documentId, "active", row.active);
  }

  //Funcion que construye el boton que permite llamar la funcion callChild para redireccionar a los hijos de Country 
  loadStates(cell, row) {
    return (
      <Button size="sm" onClick={() => this.callChild(row)} className="btn-dropbox btn-brand text mr-1 mb-1 btn btn-secondary btn-lg">
        Ver Estados
      </Button>
    )
  }

  //Funcion que construye el campo GEO para ser mostrado de una forma mas facil 
  geopoint(cell, row) {
    return (
      <div>
        Lat: {row.geopoint.latitude} Lon:{row.geopoint.longitude}
      </div>
    );
  }

  //Funcion que permite crear el control de estado activo o no del resgistro 
  active(cell, row) {
    if (row.active == '1') {
      return (
        <AppSwitch onClick={this.callEditActive.bind(this,row)} className={'mx-1'} variant={'pill'} color={'success'} label checked />
      );
    } else {
      return (
        <AppSwitch onClick={this.callEditActive.bind(this,row)} className={'mx-1'} variant={'pill'} color={'success'} label />
      );
    }
  }

  render() {

    return (
      <div className="animated">

        <Card>
          <CardHeader>
            Lista de Paises
            <div className="card-header-actions">
              <a href="https://github.com/AllenFang/react-bootstrap-table" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">Aprende</small>
              </a>
            </div>
          </CardHeader>

          <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
            className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDanger}>Modal title</ModalHeader>
            <ModalBody>Esta seguro que desea eliminar el Pais, al hacerlo se eliminaran todos los Estados y ciudades Asociados</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.trashButton.bind(this)}>Eliminar</Button>{' '}
              <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
            </ModalFooter>
          </Modal>


          <CardBody>
            <Button color="primary" onClick={this.callAdd.bind(this)} ><i className="fa icon-plus"></i>&nbsp;Crear Pais</Button>
            <BootstrapTable data={this.props.obj} striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField='countryName' dataSort>Pais</TableHeaderColumn>
              <TableHeaderColumn dataField='isoCode' >Iso Code</TableHeaderColumn>
              <TableHeaderColumn isKey={true} dataField='documentId' hidden>Identifier ID</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.geopoint} >Geo Punto</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.active.bind(this)} dataAlign='center' >Activo</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.loadStates.bind(this)} dataAlign='right' >Estados</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter.bind(this)} dataAlign='right' >Action</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }

}

const mapStateToProps = (state) => { return { obj: state.DaoGeo } }

const mapDispatchToProps = (dispatch) => {
  return {
    //type: se utiliza para identificar la accion en el store 
    //colletion: la collection de la base de datos
    //component: componente a resetear para que el cambio se vea automaticamente 
    //documentId: Identificador del registro a modificar 
    loadReducer: (type, colletion) => { 
      DbCrud.dbFindColletion(dispatch, type, colletion); 
    },
    deleteReducer: (type, colletion, component, documentId) => { 
      DbCrud.dbDelete(dispatch, type, colletion, component, documentId); 
    },
    editFileReducer: (type, colletion, component, documentId, fileEdit, newFileEdit) => { 
      DbCrud.dbEditFile(dispatch, type, colletion, component, documentId, fileEdit, newFileEdit); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);
