import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';
import { CommonLoading } from 'react-loadingg';
 
/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      modal:false,
      IdDelete:null,
      nameDelete:null,
    }

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 5,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.editFormatter = this.editFormatter.bind(this);
  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    this.props.load('loadStores', "stores/back/find",{});
  }

  toogleClose(){
    this.setState({
      modal: !this.state.modal
    });
  }

  //Cambia el valor a visible del mensaje de alerta 
  //guarda el identificador de la fila que sera afectada 
  toggleOpen(row) {
    this.setState({
      modal: !this.state.modal,
      IdDelete: row._id,
      nameDelete: row.name
    });
  }

  deleteProduct(row){
    this.setState({loader:!this.state.loader});
    this.props.delete('deleteProducts', "products/delete",this.state.IdDelete,this.closeLoader.bind(this));
  }

  //Funcion que permite hacer la llamada al formulario para editar un nuevo registro 
  callEdit(row) {
    var router = '/Stores/Edit/'
    localStorage.clear();
    localStorage.setItem('row', JSON.stringify(row));
    if(row._id != "NaN") router = router+row._id
    this.props.history.push({
      pathname: router,
      row:row
    })
  }

  createProduct(){
    var row = {
      update:true,
      name:"",
      invitation:"",
      fee:0,
      discount:0,
      bins:0,
      pse:0,
      description:"",
      catalogue:false,
      penalty:false,
      viewPrice:true,
      typeStore:1,
      idUser:0,
      url:""
    }
    this.callEdit(row);
  }

  //Funcion que construye los botones de ediccion para cada registro listado en la tabla 
  editFormatter(cell, row) {
    return (
      <ButtonGroup>
        <Button onClick={this.callEdit.bind(this, row)} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
          <i className="icon-pencil"></i>
        </Button>
      </ButtonGroup>
    )
  }

  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            Lista de Tiendas
            <div className="card-header-actions">
              <Row>
                <Button size="sm" style={{fontSize:"medium"}} onClick={this.createProduct.bind(this)} className="float-right btn btn-success active">
                  + Crear Tienda
                </Button>
              </Row>
            </div>
          </CardHeader>
          <CardBody>
              <BootstrapTable  data={this.props.obj.listStores} striped hover options={this.options}> 
              <TableHeaderColumn width={'20%'} dataField='name' >Nombre</TableHeaderColumn>
              <TableHeaderColumn width={'20%'} dataField='invitation' >Invitation</TableHeaderColumn>
              <TableHeaderColumn width={'10%'} dataField='fee' >Fee</TableHeaderColumn>
              <TableHeaderColumn width={'10%'} dataField='discount'>Descuento</TableHeaderColumn>
              <TableHeaderColumn width={'10%'} dataField='catalogue'>Catalogo</TableHeaderColumn>
              <TableHeaderColumn width={'10%'} dataField='penalty'>Penalidad</TableHeaderColumn>
              <TableHeaderColumn width={'10%'} dataField='viewPrice'>Mostroar $$</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter.bind(this)} width={'10%'} dataAlign='center'>Accion</TableHeaderColumn>
              <TableHeaderColumn isKey={true} dataField='_id' hidden>Identifier ID</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.modal} toggle={this.toogleClose.bind(this)} className={'modal-danger '}>
          <ModalHeader toggle={this.toogleClose.bind(this)}>Alerta</ModalHeader>
          <ModalBody>Esta seguro que desea eliminar el producto {this.state.nameDelete}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteProduct.bind(this)} >Eliminar</Button>{' '}
            <Button color="secondary" onClick={this.toogleClose.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.loader} className={'modal-lg'}>
          <div style={{position:"inherit",top:"300px"}}><CommonLoading size="large"/></div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //Registra el objeto la funcion que cargara el objeto en el estado
  return{
    obj:state.DaoStores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: (type, colletion, body) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body, "POST");
    },
    delete: (type, colletion, id) => {
      DbCrud.dbMLoad(dispatch, type, colletion,{_id:id}, "PUT");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
