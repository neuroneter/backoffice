import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { AppSwitch } from '@coreui/react'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';
import Pagination from '../Pagination/Pagination';
import CurrencyFormat from 'react-currency-format';
import { CommonLoading } from 'react-loadingg';
import { Image, Transformation } from 'cloudinary-react';
import { CloudinaryContext } from "cloudinary-react";

import moment from "moment"; 
import "moment/locale/es";
import { isInteger } from 'core-js/fn/number';

var flat = true;
 
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
      filters: {
        idSupplier:this.props.userdate.idSupplier,
        rol:this.props.userdate.rol,
        pag:"1",
        limit:"10",
        filFile:"",
        filValue:"",
        sorts:[
          {
            file:"cDate",
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
    this.findSupplierRol = this.findSupplierRol.bind(this);
    this.pagLoad = this.pagLoad.bind(this);
    //this.toggleDanger = this.toggleDanger.bind(this);
  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    if (flat) {
      flat = false;
      this.setState({loader:!this.state.loader});
      //Realizamos la primera carga de productos 
      this.props.loadReducer('loadProducts', "products/back/find",this.state.filters, this.closeLoader.bind(this));
      //Cargamos los filtos que seran mostrados
      this.props.loadReducer('loadFilters', "products/filters",this.state.filters);
    }
  }

  closeLoader(data){
    this.setState({loader:false, modal:false});
  }
 
  //Funcion que permite hacer la llamada al formulario para editar un nuevo registro 
  callEdit(row) {
    localStorage.clear();
    localStorage.setItem('row', JSON.stringify(row));
    localStorage.setItem('listCategories',JSON.stringify(this.props.obj.listCategories));
    localStorage.setItem('listBrands',JSON.stringify(this.props.obj.listBrands));
    localStorage.setItem('listSuppliers',JSON.stringify(this.props.obj.listSuppliers));
    localStorage.setItem('listTaxes',JSON.stringify(this.props.obj.listTaxes));
    localStorage.setItem('listStores',JSON.stringify(this.props.obj.listStores));
    var router = '/Products/Edit/'
    if(row._id != "NaN") router = '/Products/Edit/'+row.code+'/'+row.reference+"/"+row._id
    this.props.history.push({
      pathname: router,
      row:row
    })
  }

  createProduct(){
    var date = new Date();
    var idSupplier = this.props.userdate.idSupplier.substring(21,24);
    var idUser = this.props.userdate._id.substring(1,3);

    var idTmp = moment.unix(date)._i;
    idTmp = Math.random(this.props.obj.pagination.RegPerFind+idTmp)+"";
    idTmp = "BOB"+idUser+""+idTmp.substring(4,6)+""+idSupplier+idTmp.substring(8,10);
    idTmp = idTmp.toUpperCase();

    var row = {
      update:true,
      sku:idTmp,
      cDate:date+"",
      status:true,
      idBrand:"5f31926268ac81b2a0082879",
      idSupplier: this.props.userdate.idSupplier,
      reference:"",
      code:"",
      name:"",
      description:"",
      sDescription:"",
      specifications:"",
      dimensions: { heigth:0, width:0, deep:0, weight:0 },
      bDimensions: { heigth:0, width:0, deep:0, weight:0 },
      warranty: 1,
      dWarranty: "",
      cost:0,
      idTax:"5f23589b9c0dc3b1daee2885",
      pvp:0,
      total:0,
      dollar:0,
      margin:0,
      discount:[],
      freeShipping:false,
      stock:0,
      order:0,
      categories:[],
      tags:[],
      images:[],
      video:[],
      document:[],
      keyWords:[]
    }
   this.callEdit(row);
  }

  toogleClose(){
    this.setState({
      modal: !this.state.modal
    });
  }

  // Esta funcion escucha los eventos del componente Pagination
  pagLoad(pagNum,limit) {
      //Se realiza la solicitud nuevamente para recargar los registros 
      this.props.loadReducer('loadProducts', "products/back/find", {
        pag:pagNum,
        limit:limit,
        filFile:this.state.filters.filFile,
        filValue:this.state.filters.filValue,
        sorts:this.state.filters.sorts,
        idSupplier:this.props.userdate.idSupplier,
        rol:this.props.userdate.rol,
      });
      
      this.setState({
        orders:{
          pag:pagNum,
          limit:limit,
          filFile:this.state.filters.filFile,
          filValue:this.state.filters.filValue,
          sorts:this.state.filters.sorts
        }
      });
      
  }

  //resibe 
  renderPagination(){
    if(this.props.obj.pagination.NumPages != undefined)
    return <Pagination info={this.props.obj.pagination} pagLoad={this.pagLoad.bind()}/>
    return (<div>Pag...</div>);
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

  //Funcion que construye los botones de ediccion para cada registro listado en la tabla 
  editFormatter(cell, row) {
    return (
      <ButtonGroup>
        <Button onClick={this.callEdit.bind(this, row)} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
          <i className="icon-pencil"></i>
        </Button>
        <Button onClick={this.toggleOpen.bind(this, row)} size="sm" className="btn-reddit btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
          <i className="icon-trash"></i>
        </Button>
      </ButtonGroup>
    )
  }

  editCost(cell, row){return this.CurrencyFormat(row.cost);}
  editPvp(cell, row){return this.CurrencyFormat(row.pvp);}
  CurrencyFormat(value){
    return (
      <CurrencyFormat value={parseInt(value)} displayType={'text'} thousandSeparator={true} decimalSeparator={""}  prefix={'$'} renderText={value => value} />
    )
  }

  nameBrand(cell, row){
    var brands = this.props.obj.listBrands;
    for(var i=0; i<brands.length; i++){
      if(row.idBrand == brands[i]._id){
        return brands[i].name;
      }
    }
  }

  nameSuppliers(cell, row){
    var suppliers = this.props.obj.listSuppliers;
    for(var i=0; i<suppliers.length; i++){
      if(row.idSupplier == suppliers[i]._id){
        return suppliers[i].name;
      }
    }
  }

  nameTaxes(cell, row){
    var taxes = this.props.obj.listTaxes;
    for(var i=0; i<taxes.length; i++){
      if(row.idTax == taxes[i]._id){
        return taxes[i].value;
      }
    }
  }

  active(cell, row){
    if(row.status == '1'){
        return(
            <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked/>
        );
      }else{
        return(
           <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label  />
        );
      }
  }

  filters(filter){  
    const tmpData = this.props.obj.listFilters;
    const obj = [];
    Object.keys(tmpData).forEach(function(key){
      if(key == filter){
        for(var i=0; i<tmpData[key].length; i++){
          var keys = key+""+tmpData[key][i]._id;
          if(i==0) obj.push(<option key={keys} value="0">{tmpData[key][i].name}</option>)
          else obj.push(<option key={keys} value={tmpData[key][i]._id}>{tmpData[key][i].name}</option>)
        }
      }
    })
    return obj;
  }

  onClickForm(idInput){
    var infoTmp = document.getElementById(idInput).value;
    if(infoTmp == "0") infoTmp = "";

    //Se realiza la solicitud nuevamente para recargar los registros 
    this.props.loadReducer('loadProdFindFilter', "products/findFilter", {
      pag:1,
      rol:this.state.filters.rol,
      idSupplier:this.state.filters.idSupplier,
      limit:50,
      filFile:idInput,
      filValue:infoTmp,
      sorts:this.state.filters.sorts
    });
    
    //Actualizamos el esta con los valores de filtros seleccionados esto por si se utiliza la 
    //paginacion por lo que se requiere que el estado mantenga el filtro de campo 
    this.setState({
        filters:{
          pag:1,
          limit:50,
          filFile:idInput,
          filValue:infoTmp,
          sorts:this.state.filters.sorts
        }
      }
    );
  }

  imgProduct(cell, row){
    try{
      if(row.images.length > 0){
        return (
          <CloudinaryContext cloudName={this.props.userdate.cloudName} uploadPreset={this.props.userdate.uploadPreset}>
            <Image publicId={row.images[0].url} >
              <Transformation width="80" crop="scale" />
            </Image>
          </CloudinaryContext>
        )
    }
    }catch(e){}
  }

  formatSKU(cell, row){
    return row.sku.toUpperCase();
  }

  findSupplierRol(){
    if(this.props.userdate.rol < 4)
    return(
      <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="idSupplier" id="idSupplier" key="idSupplier">
                      {this.filters("suppliers")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"idSupplier")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
    )
  }

  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            Lista Productos
            <div className="card-header-actions">
              <Row>
                <Button size="sm" style={{fontSize:"medium"}} onClick={this.createProduct.bind(this)} className="float-right btn btn-success active">
                  + Crear Producto
                </Button>
                {/*<Col xs="12" md="12"><CSVLink data={this.props.obj.listProducts}>Descargar Busqueda</CSVLink></Col>*/}
              </Row>
            </div>
          </CardHeader>
          <CardBody>
            <Col xs="12" md="12">
              <Row>
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="idBrand" id="idBrand" key="idBrand">
                      {this.filters("brands")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"idBrand")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                {this.findSupplierRol()}
                <Col xs="12" md="3">
                  <InputGroup>
                    <Input type="select" name="idTax" id="idTax" key="idTax">
                      {this.filters("taxes")}
                    </Input>
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"idTax")} color="primary">Buscar</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col xs="12" md="3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa icon-layers"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="findFilterAll" name="findFilterAll" placeholder="Nombre, Cód, Refe, SKU" />
                    <InputGroupAddon addonType="append">
                      <Button type="button" onClick={this.onClickForm.bind(this,"findFilterAll")} color="primary">Buscar</Button>
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
              <BootstrapTable  data={this.props.obj.listProducts} striped hover options={this.options}  > 
              <TableHeaderColumn width={'6%'} dataFormat={this.imgProduct.bind(this)} >Imagen</TableHeaderColumn>
              <TableHeaderColumn width={'8%'} dataFormat={this.formatSKU.bind(this)} >SKU</TableHeaderColumn>
              <TableHeaderColumn width={'6%'} dataField='reference' >Referencia</TableHeaderColumn>
              <TableHeaderColumn width={'8%'} dataField='code' >Codigo</TableHeaderColumn>
              <TableHeaderColumn width={'16%'} dataField='name' >Nombre</TableHeaderColumn>
              <TableHeaderColumn width={'6%'} dataFormat={this.nameBrand.bind(this)} >Marca</TableHeaderColumn>
              <TableHeaderColumn width={'7%'} dataFormat={this.nameSuppliers.bind(this)} >Proveedor</TableHeaderColumn>
              <TableHeaderColumn width={'3%'} dataFormat={this.nameTaxes.bind(this)} >Tax</TableHeaderColumn>
              <TableHeaderColumn width={'6%'} dataFormat={this.editPvp.bind(this)} dataAlign='right'>Tiendas</TableHeaderColumn>
              <TableHeaderColumn width={'6%'} dataFormat={this.editCost.bind(this)} dataAlign='center'>Costo</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter.bind(this)} width={'5%'} dataAlign='center' >Accion</TableHeaderColumn>
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
    obj:state.DaoProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReducer: (type, colletion, body, callFunction,) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body, "POST" ,callFunction);
    },
    delete: (type, colletion, id, callFunction,) => {
      DbCrud.dbMLoad(dispatch, type, colletion, {_id:id}, "PUT" ,callFunction);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
