import React, { Component } from 'react';
import {Button, Row, Col, Card, CardHeader, CardBody, Label, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import { connect } from 'react-redux';
import DbCrud from '../../../../Actions/DbCrud';

class Edit extends Component{

    constructor(props){
        super(props);
        this.state = {
            val:"dios",
            row: {}
        };
        this.admin = this.admin.bind(this);
    }

    componentDidMount(){
        this.props.findConfigs("loadConfigs", "stores/configs/find",this.callFuntion.bind(this));
    }

    saveProduct(){
        this.props.updateConfigs("loadUpdate", "stores/configs/update", this.state.row);
    }

    callFuntion(obj){this.setState({row:obj[0]})}

    changeInputs(idInput){
        var rowTmp = this.state.row;
        var value = document.getElementById(idInput).value;
        if(idInput == "maxMargin") rowTmp.maxMargin = parseInt(value);
        if(idInput == "protection") rowTmp.protection = parseInt(value);
        if(idInput == "incentive") rowTmp.incentive = parseInt(value);
        this.setState({row:rowTmp})
    }

    admin(){
        return(
            <Row>
                <Col>
                    <Label>Margen Max Protegido</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-shield"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="Number" id="maxMargin" defaultValue={this.state.row.maxMargin} onChange={this.changeInputs.bind(this,"maxMargin")} placeholder="Ingrese el margen a proteger" />
                    </InputGroup>
                </Col>
                <Col>
                    <Label>Protección Margen Residuo</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-shield"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="Number" id="protection" defaultValue={this.state.row.protection} onChange={this.changeInputs.bind(this,"protection")} placeholder="Ingrese el margen a proteger" />
                    </InputGroup>
                </Col>
                <Col>
                    <Label>Margen Incentivo</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-heart"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="Number" id="incentive" defaultValue={this.state.row.incentive} onChange={this.changeInputs.bind(this,"incentive")} placeholder="Ingrese el margen a proteger" />
                    </InputGroup>
                </Col>
            </Row>
        )
    }

    render(){
        return(
            <Row>
                <Col xs="12" md="12">
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col xs="10" sm="10" md="10">Editar o Crear una nueva tienda</Col>
                                        <Col xs="2" sm="2" md="2">
                                            <Button size="sm" style={{fontSize:"medium"}} onClick={this.saveProduct.bind(this)} block className="float-right btn btn-success active">
                                                Guardar
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.admin()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
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
      findConfigs: (type, colletion, fun) => {
        DbCrud.dbMLoad(dispatch, type, colletion, {}, "POST",fun);
      },
      updateConfigs: (type, colletion, body) => {
        DbCrud.dbMLoad(dispatch, type, colletion, body, "PUT");
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Edit);