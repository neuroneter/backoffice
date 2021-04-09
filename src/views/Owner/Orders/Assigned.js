import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";
import { Row,InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Input, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';
import Pagination from '../Pagination/Pagination';


var flat = true;
 
/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class Assigned extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: {
        pag:"1",
        limit:"5",
        filFile:"",
        filValue: "",
        sorts:[
          {
            file:"oderDate",
            value:1
          }
        ]
      }
    }

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 5,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

    this.pagLoad = this.pagLoad.bind(this);
    //this.toggleDanger = this.toggleDanger.bind(this);
  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    //console.log(this.props);
    //console.log(this.store);
    if (flat) {
      flat = false;
      //Typo: para ser asignado los valores al tener una respuesta del servidor 
      //EndPoint: al que tenemos que llamar para recupuerar datos
      //Obj Filtro: el objeto que permite realizar una filto en la busqueda
      this.props.loadReducer('loadOrders', "orders/find",this.state.orders);
      this.props.loadReducer('loadFilters', "orders/filters",{});
    }
  } 
 
  //Funcion que permite hacer la llamada al formulario para editar un nuevo registro 
  callEdit(row) {
    this.props.history.push({
      pathname: '/Orders/Edit/'+row.order+'/'+row.reference
    })
  }

  //Cambia el valor a visible del mensaje de alerta 
  //guarda el identificador de la fila que sera afectada 
  toggleDanger(row) {
    this.setState({
      danger: !this.state.danger,
      tmpRow: row.order
    });
  }

  // Esta funcion escucha los eventos del componente Pagination
  pagLoad(pagNum,limit) {
      //Se realiza la solicitud nuevamente para recargar los registros 
      this.props.loadReducer('loadOrders', "orders/find", {
        pag:pagNum,
        limit:limit,
        filFile:this.state.orders.filFile,
        filValue:this.state.orders.filValue,
        sorts:this.state.orders.sorts
      });
      
      this.setState({
        orders:{
          pag:pagNum,
          limit:limit,
          filFile:this.state.orders.filFile,
          filValue:this.state.orders.filValue,
          sorts:this.state.orders.sorts
        }
      });
      
  }

  onClickForm(idInput){
    var infoTmp = document.getElementById(idInput).value;
    if(infoTmp == "0") infoTmp = "";

    //Se realiza la solicitud nuevamente para recargar los registros 
    this.props.loadReducer('loadOrders', "orders/find", {
      pag:1,
      limit:5,
      filFile:idInput,
      filValue:infoTmp,
      sorts:this.state.orders.sorts
    });
    
    //Actualizamos el esta con los valores de filtros seleccionados esto por si se utiliza la 
    //paginacion por lo que se requiere que el estado mantenga el filtro de campo 
    this.setState({
        orders:{
          pag:1,
          limit:5,
          filFile:idInput,
          filValue:infoTmp,
          sorts:this.state.orders.sorts
        }
      }
    );
  }

  //resibe 
  renderPagination(){
    if(this.props.obj.pagination.NumPages != undefined)
    return <Pagination info={this.props.obj.pagination} pagLoad={this.pagLoad.bind()}/>
    return (<div>Pag...</div>);
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

  filters(filter){
    const tmpData = this.props.obj.listFilters;
    const obj = [];

    Object.keys(tmpData).forEach(function(key){
      if(key == filter){
        for(var i=0; i<tmpData[key].length; i++){
          var keys = key+""+i;
          if(i==0) obj.push(<option key={keys} value="0">{tmpData[key][i]}</option>)
          else obj.push(<option key={keys} value={tmpData[key][i]}>{tmpData[key][i]}</option>)
        }
      }
    })
    return obj;
  }

  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            Lista Ordenes
            <div className="card-header-actions">
              <CSVLink data={this.props.obj.listOrders}>Descargar Busqueda</CSVLink>
            </div>
          </CardHeader>
          <CardBody>
            <Col xs="12" md="12">
              <Row>
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="status" id="status" key="status">
                        {this.filters("status")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"status")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                  
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="store" id="store" key="store">
                        {this.filters("store")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"store")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="brand" id="brand" key="brand">
                      {this.filters("brand")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"brand")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="supplier" id="supplier" key="supplier">
                      {this.filters("supplier")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"supplier")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <br/><br/>
                <Col xs="12" md="3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa icon-layers"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="order" name="order" placeholder="# Orden" />
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"order")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-address-book-o"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="dni" name="dni" placeholder="# Documento" />
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"dni")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-address-book-o"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="customer" name="customer" placeholder="Nombre Cliente" />
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"customer")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </CardBody>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <div className="pull-right">{this.renderPagination()}</div>
              </Col>
            </Row>
          </CardBody>

          <CardBody>
              <BootstrapTable  data={this.props.obj.listOrders} striped hover options={this.options} search multiColumnSearch strictSearch > 
              <TableHeaderColumn width={'10%'} dataField='status' dataSort>Estado</TableHeaderColumn>
              <TableHeaderColumn width={'15%'} dataField='order' >Orden</TableHeaderColumn>
              <TableHeaderColumn width={'25%'} dataField='customer' >Cliente</TableHeaderColumn>
              <TableHeaderColumn width={'25%'} dataField='skuName' >Producto</TableHeaderColumn>
              <TableHeaderColumn dataField='city'width={'10%'} className="hidden-xs">Ciudad</TableHeaderColumn>
              <TableHeaderColumn dataField='invoice' width={'10%'} >Factura</TableHeaderColumn>
              <TableHeaderColumn dataField='unit' width={'10%'}>Procesado</TableHeaderColumn>
              <TableHeaderColumn dataField='store'>Tienda</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter.bind(this)} width={'10%'} dataAlign='right' >Accion</TableHeaderColumn>
              <TableHeaderColumn isKey={true} dataField='_id' hidden>Identifier ID</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>

          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <div className="pull-right">{this.renderPagination()}</div>
              </Col>
            </Row>
          </CardBody>
          
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //Registra el objeto la funcion que cargara el objeto en el estado
  return{
    obj:state.DaoOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //type: se utiliza para identificar la accion en el store 
    //colletion: la collection de la base de datos
    //component: componente a resetear para que el cambio se vea automaticamente 
    //documentId: Identificador del registro a modificar 
    loadReducer: (type, colletion, body) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body);
    },

    editFileReducer: (type, colletion, component, documentId, fileEdit, newFileEdit) => { 
      //DbCrud.dbEditFile(dispatch, type, colletion, component, documentId, fileEdit, newFileEdit); 
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assigned);
