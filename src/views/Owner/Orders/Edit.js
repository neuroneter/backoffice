import { connect } from 'react-redux';
import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import { Row, Form, FormGroup, NavLink,Button,Input,Collapse, CardHeader, Col, CardBody, Card } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import CurrencyFormat from 'react-currency-format';
import DbCrud from '../../../Actions/DbCrud';
import Moment from 'react-moment';
import { node } from 'prop-types';


class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: {
        pag:"1",
        limit:"20",
        filFile:"order",
        filValue: ""+this.props.match.params.Order,
        sorts:[
          {
            file:"oderDate",
            value:1
          }
        ],
        rol:this.props.userdate.rol
        
      },
      collapse: false,
      accordion: [true, false, false, false, false, false, false, false, false, false, false, false, false],
    }

  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    this.props.loadReducer('loadOrdersEdit', "orders/find/edit",this.state.orders);
  }

  callList() { 
    this.props.history.push('/Orders/List'); 
  }

  callSave(e) {
    e.preventDefault();
    //this.props.update('updateGeo', "geo", "CountriesList", this, this.state.documentId);
    this.props.history.push('/Orders/List');
  }

  selects(select, nodo){
    const formOrders = [];
    const programer = this.programer.bind(this);
    var idStatus = "status_"+nodo._id;
    var idUnit = "unit_"+nodo._id;

    if(
      select == "units" && 
      this.props.obj.listOrdersEditUnits.length > 0 &&
      (nodo.status != "Entregado" || this.props.userdate.rol == 1)
    ){
      var units = this.props.obj.listOrdersEditUnits; 
      Object.keys(units).forEach(function(key){
        var keys = select+""+key;
        var text = units[key]["name"]+"-"+units[key]["supplier"];
        if(nodo.unit == units[key]["name"])
           formOrders.unshift(<option key={keys} value={units[key]["name"]}>{text}</option>);
        else
          formOrders.push(<option key={keys} value={units[key]["name"]}>{text}</option>);
      })

      return (
        <Input type="select" onChange={programer.bind(this,"unit",idUnit)} name={nodo._id} id={idUnit} key={nodo.reference}>
          {formOrders}
        </Input>
      );

    }

    if(
      select == "status" && 
      this.props.obj.listOrdersEditUnits.length > 0 && 
      (nodo.status != "Entregado" || this.props.userdate.rol == 1)){

      var status = this.props.obj.listOrdersEditStatus;
      Object.keys(status).forEach(function(key){
        var keys = select+""+key;
        var text = status[key]["name"];
        if(nodo.status == status[key]["name"])
          formOrders.unshift(<option key={keys} value={status[key]["name"]}>{text}</option>);
        else
          formOrders.push(<option key={keys} value={status[key]["name"]}>{text}</option>);
      });

      return (
        <Input type="select" onChange={programer.bind(this,"status",idStatus)} name={nodo._id} id={idStatus} key={nodo.reference}>
          {formOrders}
        </Input>
      );

    }
    

    return formOrders;

  }

  programer(valSeleted, idStatus){
    var values = document.getElementById(idStatus);
    this.props.loadReducer('loadOrdersUpdate', "orders/edit/update",{_id:values.name,file:valSeleted,value:values.value});
  }

  dateExpress(date){
    try{
      date = date.split("T");
      date = date[0];
      date = date.replace(/-/gi, "/");
      date =  Date.parse(date);
      date = Intl.DateTimeFormat('es-CO',{ year: 'numeric', month: 'short', day: 'numeric' }).format(date);
      return date;
    }catch(e){
      return 0;
    }
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
  }

  htmlOrdBody(nodo, post, key){
    const selects = this.selects.bind(this);
    var keyname = "order_"+nodo.order+"_"+nodo.reference+"_"+key+"_"+post;
    const reference = this.props.match.params.Reference;
    var color = (reference == nodo.reference)? "#a9a9a347":"";
    var dispatch = this.dateExpress(nodo.dispatch);
    var urlTrasn = (nodo.carrier == "Deprisa")? nodo.trakingUrl+"/Tracking/?track="+nodo.guide:nodo.trakingUrl;
    const colorForShipping = (nodo.status != "Entregado" && nodo.status != "Cancelacion de pedido")? "5px solid rgb(210, 13, 13)" : "5px solid rgb(17, 158, 8)" ;

    return(
      <div key={keyname}>
      <Collapse  isOpen={this.state.accordion[post]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
        <CardBody  style={{
        borderBottom:"1px solid rgb(193, 193, 193)",
        borderLeft:colorForShipping,
        borderTop:"1px solid rgb(193, 193, 193)", 
        padding:"10px 10px 10px 10px",
        backgroundColor:color
        }}>
          <Row>
            <Col xs="2" md="2">
              <Row>
                <Col xs="12" md="12">
                  {selects("status",nodo)}
                </Col>
                <Col>&nbsp;</Col>
                <Col xs="12" md="12">
                  {selects("units",nodo)}
                </Col>
              </Row>
            </Col>
            <Col xs="1" md="1" style={{textAlign:"center"}}>
              <img src="https://solutionssap.com/wp-content/uploads/2016/05/Dummy.png" alt="Img Prod" style={{maxWidth:"60px", maxHeight:"60px"}} />
            </Col>
            <Col xs="9" md="9">
              <Row>
                <Col xs="4" md="4">
                  <Row><strong>Entregado: </strong> {dispatch}</Row>
                  <Row><strong>Estado:</strong>{nodo.status}</Row>
                  <Row><strong>{nodo.skuName}</strong></Row>
                  <Row><strong>Ref:</strong>{nodo.reference}&nbsp;-&nbsp;<strong>Cod:</strong>{nodo.code}</Row>
                </Col>
                <Col xs="2" md="2">
                  <Row><strong>Cantidad:</strong>({nodo.lot})</Row>
                  <Row>
                    <strong>Valor:</strong>&nbsp; 
                    <CurrencyFormat value={(nodo.value != null)?nodo.value:0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Descuento:</strong>&nbsp;
                    <CurrencyFormat value={(nodo.discount != null)?nodo.discount:0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Supplier:</strong>&nbsp;{nodo.supplier}
                  </Row>
                </Col>
                <Col xs="2" md="2">
                  <Row>
                    <strong>Puntos:</strong>&nbsp; 
                    <CurrencyFormat value={(nodo.points != null)?nodo.points:0} displayType={'text'} thousandSeparator={true} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Precio:</strong>&nbsp; 
                    <CurrencyFormat value={(nodo.price != null)?nodo.price:0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Envio:</strong>&nbsp;
                    <CurrencyFormat value={(nodo.shipping != null)?nodo.shipping:0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Unidad:</strong>&nbsp;{nodo.unit}
                  </Row>
                </Col>
                <Col xs="2" md="2">
                  <Row>
                    <strong>Total:</strong>&nbsp; 
                    <CurrencyFormat value={(nodo.totalPay != null)?nodo.totalPay:0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => value} />
                  </Row>
                  <Row>
                    <strong>Trans:</strong>&nbsp;<a href={urlTrasn} target="_blank">{nodo.carrier}</a>
                  </Row>
                  <Row>
                    <strong>Guia:</strong>&nbsp;{nodo.guide}
                  </Row>
                </Col >
                <Col xs="2" md="2">
                  <Row><strong>Factura:</strong>&nbsp;<a href={nodo.invoiceUrl} target="_blank">{nodo.invoice}</a></Row>
                  <Row><strong>Marca:</strong>&nbsp;{nodo.brand}</Row>
                  <Row><strong>Tienda:</strong>&nbsp;{nodo.store}</Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Collapse>
      </div>
    )

  }

  htmlOrdHead(nodo,post,key,forshipping){
    const formattedDate = this.dateExpress(nodo.date);
    const estimatedShippingDate = this.dateExpress(nodo.estimatedShippingDate);
    const oderDate = this.dateExpress(nodo.oderDate);
    var colorForShipping = (forshipping)?"red":"green";
  
    if(this.state.accordion[post]){
      var colorVal = "black";
      var icon = "fa fa-eye";
      var text = "Ocultar";
    }
    else{
      var icon = "fa fa-eye-slash";
      var colorVal = "currentcolor";
      var text = "Ver";
    }

    const nameKey = "headOrder"+nodo.order;
    return (
      <div key={nameKey}>
        <CardHeader id="headingOne" style={{backgroundColor:"rgba(19, 190, 197, 0.45)"}} onClick={() => this.toggleAccordion(post)}>
          <Row>
            <Col xs="2" md="2" >
              <Row>
                <Col xs="2" md="2">
                  <div className="fa fa-circle" style={{color:colorForShipping}}>&nbsp;</div>
                </Col>
                <Col xs="10" md="10">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(post)} aria-expanded={this.state.accordion[post]} aria-controls="collapseOne">
                    <div className={icon} style={{color:colorVal}}>&nbsp;&nbsp;<u>{text}</u></div>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs="2" md="2"><strong>Orden:</strong> {nodo.order}</Col>
            <Col xs="2" md="2"><strong>Compra:</strong> {formattedDate}</Col>
            <Col xs="3" md="3"><strong>Registro:</strong> {oderDate}</Col>
            <Col xs="3" md="3"><strong>Estimado Entrega:</strong> {estimatedShippingDate}</Col>
          </Row>
        </CardHeader>
        <Collapse isOpen={this.state.accordion[post]}  key="headOrder" data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
        <CardBody>
        <Row>
          <Col xs="3" md="3">
            <Row>
              <Col xs="12" md="12"><strong>Celular:</strong> {nodo.phone}</Col>
              <Col xs="12" md="12"><strong>Entregar:</strong> {nodo.deliveryOnName}</Col>
            </Row>
          </Col>
          <Col xs="3" md="3">
            <Row>
                <Col xs="12" md="12"><strong>Departamento:</strong> {nodo.state}</Col>
                <Col xs="12" md="12"><strong>Ciudad:</strong> {nodo.city}</Col>
            </Row>
          </Col>
          <Col xs="6" md="6">
            <Row>
              <Col xs="12" md="12"><strong>Dirección:</strong> {nodo.address} {nodo.addAddress}</Col>
              <Col xs="12" md="12"><strong>Barrio:</strong> {nodo.neighborhood}</Col>
            </Row>
          </Col>
        </Row>
        </CardBody>
      </Collapse>
      </div>
    );
  }

  formOrders(){
    const htmlOrdBody = this.htmlOrdBody.bind(this);
    const htmlOrdHead = this.htmlOrdHead.bind(this);
    const orders = this.props.obj.listOrdersEdit;
    const history = this.props.obj.listOrdersEditHistory;
    const formOrders = [];
    var keypost = 0;
    var forshipping = false;

    Object.keys(orders).forEach(function(key){
      
      if(!forshipping) forshipping = (orders[key].status != "Entregado" && orders[key].status != "Cancelacion de pedido")? true : false;

      //Realizamos el encabezado 
      if((parseInt(key)+1) == orders.length){

        formOrders.unshift(htmlOrdHead(orders[key],keypost,key,forshipping));
        
        formOrders.unshift(
          <div key="headOrders" >
            <CardHeader style={{
            borderBottom:"1px solid rgb(193, 193, 193)",
            borderTop:"1px solid rgb(193, 193, 193)", 
            padding:"10px 10px 10px 10px",
            backgroundColor:"#444e57",
            color:"white",
            fontSize:"initial"
            }}>
              <Row>
                <Col><strong>Cliente: </strong>{orders[key].customer}</Col>
                <Col><strong>DNI:</strong> {orders[key].dni}</Col>
                <Col>
                    <div className="card-header-actions">
                      <CSVLink data={orders}>Descargar Busqueda</CSVLink>
                    </div>
                </Col>
              </Row>
            </CardHeader>
          </div>
        );
      }
      formOrders.push(htmlOrdBody(orders[key],keypost,key));
    })

    if(history.length != 0 || history.length != undefined){
      forshipping = false;
      
      Object.keys(history).forEach(function(key){
        var historyBody = [];
        keypost++;
        
        history[key].forEach((val, key) => {
          if(!forshipping) forshipping = (val.status != "Entregado" && val.status != "Cancelacion de pedido")? true : false;
          historyBody.push(htmlOrdBody(val,keypost,key));
        })

        historyBody.unshift(htmlOrdHead(history[key][0],keypost,key,forshipping));
        formOrders.push(historyBody);
      })
    }

    return formOrders;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          {this.formOrders()}
        </Card>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  //Registra el objeto la funcion que cargara el objeto en el estado
  return{
    obj:state.DaoOrders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReducer: (type, colletion, body) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);