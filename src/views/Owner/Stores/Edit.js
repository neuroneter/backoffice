import React, { Component } from 'react';
import { connect } from 'react-redux';
import DbCrud from '../../../Actions/DbCrud';

import {Modal, Button, Row, Label, InputGroupAddon, InputGroup, InputGroupText, Col,  Input, Card, CardHeader, CardBody} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { CommonLoading } from 'react-loadingg';

//Alerts
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class Eidts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader:false,
            selPse:[{value:"all", label:"Todas", disable:true}],
            row:JSON.parse(localStorage.getItem("row")),
        }

        this.penalty = this.penalty.bind(this);
        this.description = this.description.bind(this);
        this.optionPse = this.optionPse.bind(this);
        this.optionStore = this.optionStore.bind(this);
        this.price = this.price.bind(this);
        this.selectUsers = this.selectUsers.bind(this);
        this.editor = {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'image': 1 }],
              [{ 'align': [] }],
              ['clean']                                         // remove formatting button
            ]
        }  
    }

    componentDidMount() {
        this.props.findAdviser();
    }

    description(value) {
        var rowTmp = this.state.row;
        rowTmp.description = value;
        localStorage.setItem('row', JSON.stringify(rowTmp));
    }

    saveProduct(){
        var tmpRow = this.state.row;
        if(tmpRow.name == '') toast.error('El nombre de la tienda no puede ser nula.');
        else if(tmpRow.invitation == ''){
            if(!tmpRow.catalogue) toast.error('La invitación solo puede ser nula para un catalogo.');
        }
        else if(tmpRow.bins == '') toast.error('Si no hya bins dejar el valor en 0.');
        this.setState({loader:true});

        if(tmpRow.update){
            delete tmpRow.update;
            this.props.loadReducer('updateProducts', "stores/add", tmpRow,this.setId.bind(this));
          }else
            this.props.loadReducer('updateProducts', "stores/update", tmpRow,this.setId.bind(this));
    }

    setId(obj){
        var self = this; 
        var rowTmp = this.state.row;
        if(obj._id != undefined) rowTmp._id = obj._id;
        setTimeout(function(){ 
          self.setState({loader:false, row:rowTmp});
        }, 2000);
      }

    changeInputs(idInput){
        var rowTmp = this.state.row;
        var value = document.getElementById(idInput).value;
        if(idInput == "name") rowTmp.name = value;
        if(idInput == "invitation") rowTmp.invitation = value;
        if(idInput == "fee") rowTmp.fee = value;
        if(idInput == "discount") rowTmp.discount = value;
        if(idInput == "bins") rowTmp.bins = value;
        if(idInput == "catalogue") rowTmp.catalogue = document.getElementById(idInput).checked;
        if(idInput == "viewPrice") rowTmp.viewPrice = document.getElementById(idInput).checked;
        if(idInput == "pse") rowTmp.pse = value;
        if(idInput == "typeStore") rowTmp.typeStore = value;
        if(idInput == "Users") rowTmp.idUser = value;
        if(idInput == "url") rowTmp.url = value;
        if(idInput == "penalty") rowTmp.penalty = document.getElementById(idInput).checked;
        localStorage.setItem('row', JSON.stringify(rowTmp));
        this.setState({row:rowTmp});
    }

    catalogue(cell){
        if(this.state.row.catalogue){
            return(
                <AppSwitch id="catalogue" onChange={this.changeInputs.bind(this,"catalogue")} className={'mx-1'} variant={'pill'} color={'success'} label checked/>
            );
        }else{
            return(
               <AppSwitch id="catalogue" onChange={this.changeInputs.bind(this,"catalogue")} className={'mx-1'} variant={'pill'} color={'success'} label  />
            );
        }
    }

    price(cell){
        if(this.state.row.viewPrice){
            return(
                <AppSwitch id="viewPrice" onChange={this.changeInputs.bind(this,"viewPrice")} className={'mx-1'} variant={'pill'} color={'success'} label checked/>
            );
        }else{
            return(
               <AppSwitch id="viewPrice" onChange={this.changeInputs.bind(this,"viewPrice")} className={'mx-1'} variant={'pill'} color={'success'} label  />
            );
        }
    }

    penalty(cell){
        if(this.state.row.penalty){
            return(
                <AppSwitch id="penalty" onChange={this.changeInputs.bind(this,"penalty")} className={'mx-1'} variant={'pill'} color={'success'} label checked/>
            );
        }else{
            return(
               <AppSwitch id="penalty" onChange={this.changeInputs.bind(this,"penalty")} className={'mx-1'} variant={'pill'} color={'success'} label  />
            );
        }
    }

    optionStore(){
        var option = [];
        if(this.state.row.typeStore == '1') option.unshift(<option key='Store_1' value='1'>Banco</option>);
        else option.push(<option key='Store_1' value='1'>Banco</option>);

        if(this.state.row.typeStore == '2') option.unshift(<option key='Store_2' value='2'>Fondos/Cooperativas</option>);
        else option.push(<option key='Store_2' value='2'>Fondos/Cooperativas</option>);

        if(this.state.row.typeStore == '3') option.unshift(<option key='Store_3' value='3'>Empresa</option>);
        else option.push(<option key='Store_3' value='3'>Empresa</option>);

        if(this.state.row.typeStore == '4') option.unshift(<option key='Store_4' value='4'>Proveedor</option>);
        else option.push(<option key='Store_4' value='4'>Proveedor</option>);

        return(
            <Input type="select" id='typeStore' name='typeStore' key='typeStore' onChange={this.changeInputs.bind(this,'typeStore')} >
                {option}
            </Input>
        )
    }

    optionPse(){
        var option = [];
        if(this.state.row.pse == '0') option.unshift(<option key='pse_0' value='0'>TODOS</option>);
        else option.push(<option key='pse_0' value='0'>TODOS</option>);

        if(this.state.row.pse == '1') option.unshift(<option key='pse_1' value='1'>BANCO AGRARIO</option>);
        else option.push(<option key='pse_1' value='1'>BANCO AGRARIO</option>);

        if(this.state.row.pse == '2')  option.unshift(<option key='pse_2' value='2'>BANCO AV VILLAS</option>);
        else option.push(<option key='pse_2' value='2'>BANCO AV VILLAS</option>);

        if(this.state.row.pse == '3') option.unshift(<option key='pse_3' value='3'>BANCO CAJA SOCIAL</option>);
        else option.push(<option key='pse_3' value='3'>BANCO CAJA SOCIAL</option>);

        if(this.state.row.pse == '4') option.unshift(<option key='pse_4' value='4'>BANCO COLPATRIA</option>);
        else option.push(<option key='pse_4' value='4'>BANCO COLPATRIA</option>);

        if(this.state.row.pse == '5') option.unshift(<option key='pse_5' value='5'>BANCO DAVIVIENDA</option>);
        else option.push(<option key='Bv_5' value='5'>BANCO DAVIVIENDA</option>);

        if(this.state.row.pse == '6') option.unshift(<option key='pse_6' value='6'>BANCO DE BOGOTA</option>);
        else option.push(<option key='pse_6' value='6'>BANCO DE BOGOTA</option>);

        if(this.state.row.pse == '7') option.unshift(<option key='pse_7' value='7'>BANCO DE OCCIDENTE</option>);
        else option.push(<option key='pse_7' value='7'>BANCO DE OCCIDENTE</option>);

        if(this.state.row.pse == '8') option.unshift(<option key='pse_8' value='8'>BANCO GNB SUDAMERIS</option>);
        else option.push(<option key='pse_8' value='8'>BANCO GNB SUDAMERIS</option>);

        if(this.state.row.pse == '9') option.unshift(<option key='pse_9' value='9'>BANCO PICHINCHA</option>);
        else option.push(<option key='pse_9' value='9'>BANCO PICHINCHA</option>);

        if(this.state.row.pse == '10') option.unshift(<option key='pse_10' value='10'>BANCO POPULAR</option>);
        else option.push(<option key='pse_10' value='10'>BANCO POPULAR</option>);

        if(this.state.row.pse == '11') option.unshift(<option key='pse_11' value='11'>BANCO PROCREDIT</option>);
        else option.push(<option key='pse_11' value='11'>BANCO PROCREDIT</option>);

        if(this.state.row.pse == '12') option.unshift(<option key='pse_12' value='12'>BANCOLOMBIA</option>);
        else option.push(<option key='pse_12' value='12'>BANCOLOMBIA</option>);

        if(this.state.row.pse == '13') option.unshift(<option key='pse_13' value='13'>BANCOOMEVA</option>);
        else option.push(<option key='pse_13' value='13'>BANCOOMEVA</option>);

        if(this.state.row.pse == '14') option.unshift(<option key='pse_14' value='14'>BBVA COLOMBIA</option>);
        else option.push(<option key='pse_14' value='14'>BBVA COLOMBIA</option>);

        if(this.state.row.pse == '15') option.unshift(<option key='pse_15' value='15'>CITIBANK</option>);
        else option.push(<option key='pse_15' value='15'>CITIBANK</option>);

        if(this.state.row.pse == '16') option.unshift(<option key='pse_16' value='16'>ITAÚ</option>);
        else option.push(<option key='pse_16' value='16'>ITAÚ</option>);

        if(this.state.row.pse == '17') option.push(<option key='pse_17' value='17'>BANCO FALABELLA</option>);
        else  option.push(<option key='pse_17' value='17'>BANCO FALABELLA</option>);

        return(
            <Input type="select" id='pse' name='pse' key='pse' onChange={this.changeInputs.bind(this,'pse')} >
                {option}
            </Input>
        )
    }

    selectUsers(obj){
        console.log(this.state.row);
        var option = [];
        obj.forEach(val => {
            if(this.state.row.idUser === val._id){
                option.unshift(<option key={val._id} value={val._id}>{val.name}</option>);
            } 
            else option.push(<option key={val._id} value={val._id}>{val.name}</option>);
        });

        return(
            <Input type="select" id='Users' name='Users' key='Users' onChange={this.changeInputs.bind(this,'Users')} >
                {option}
            </Input>
        )
    }

    render(){

        return(
            <Row>
                <ToastContainer position="top-right" autoClose={9000} style={{zIndex:"1999"}}/>
                <Col xs="12" md="12">
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col xs="10" sm="10" md="10">Editar o Crear una nueva tienda</Col>
                                        <Col xs="2" sm="2" md="2">
                                            <Button size="sm" style={{fontSize:"medium"}} onClick={this.saveProduct.bind(this)} block className="float-right btn btn-success active">
                                                Guardar Tienda
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    <Row className="pb-3">
                                        <Col xs="4" sm="4" md="4">
                                            <Label>Nombre</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-user-circle"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="name" placeholder="Ingrese el nombre" defaultValue={this.state.row.name} onChange={this.changeInputs.bind(this,"name")}/>
                                            </InputGroup>
                                        </Col>
                                        <Col xs="4" sm="4" md="4">
                                            <Label>Invitacion</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText><i className="fa fa-envelope-open"></i></InputGroupText>
                                                    </InputGroupAddon>
                                                <Input type="text" id="invitation" placeholder="Ingrese la invitacion" defaultValue={this.state.row.invitation} onChange={this.changeInputs.bind(this,"invitation")}/>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <Label>Fee %</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="number" id="fee" placeholder="Ingrese el fee" defaultValue={this.state.row.fee} onChange={this.changeInputs.bind(this,"fee")}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pb-3">
                                        <Col>
                                            <Label>Descuento %</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-cart-arrow-down"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="number" id="discount" placeholder="Ingrese el descuento" defaultValue={this.state.row.discount} onChange={this.changeInputs.bind(this,"discount")}/>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <Label>Bins</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-barcode"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" id="bins" placeholder="Ingrese los bins" defaultValue={this.state.row.bins} onChange={this.changeInputs.bind(this,"bins")}/>
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <Label>PSE</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-bank"></i></InputGroupText>
                                                </InputGroupAddon>
                                                {this.optionPse()}
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="pb-3">
                                        <Col xs="1" sm="1" md="1">
                                            <Label>Es Catalogue</Label><br/>
                                            {this.catalogue()}
                                        </Col>
                                        <Col xs="1" sm="1" md="1">
                                            <Label>Mostrar $$</Label><br/>
                                            {this.price()}
                                        </Col>
                                        <Col xs="2" sm="2" md="2">
                                            <Label>Penalidad</Label><br/>
                                            {this.penalty()}
                                        </Col>
                                        <Col xs="4" sm="4" md="4">
                                            <Label>Tipo Tienda</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-cubes"></i></InputGroupText>
                                                </InputGroupAddon>
                                                {this.optionStore()}
                                            </InputGroup>
                                        </Col>
                                        <Col xs="4" sm="4" md="4">
                                            <Label>Agente</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="fa fa-handshake-o"></i></InputGroupText>
                                                </InputGroupAddon>
                                                {this.selectUsers(this.props.obj.agents)}
                                            </InputGroup>
                                        </Col>
                                        
                                    </Row>
                                    <Row className="pb-5">
                                        <Col xs="9" sm="9" md="9" className="pb-3">           
                                            <Label>URL</Label>
                                            <Input type="text" id="url" placeholder="Ingrese los bins" defaultValue={this.state.row.url} onChange={this.changeInputs.bind(this,"url")}/>
                                        </Col>
                                        <Col xs="10" sm="10" md="10">           
                                            <Label>Descripción</Label>
                                            <InputGroup>
                                                <ReactQuill value={this.state.row.description || ''} modules={this.editor} onChange={this.description()} />
                                            </InputGroup>
                                        </Col>
                                        
                                    </Row>
                                
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Modal isOpen={this.state.loader} className={'modal-lg'}>
                    <div style={{position:"inherit",top:"300px"}}><CommonLoading size="large"/></div>
                </Modal>
            </Row>

        )
    }
}

const mapStateToProps = (state) => {
  return{
    obj:state.DaoStores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReducer: (type, colletion, body, callFunction) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body, "PUT", callFunction);
    },
    findAdviser:() => {
        DbCrud.dbMLoad(dispatch, "agents", "users/find/agent", {}, "GET");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Eidts);