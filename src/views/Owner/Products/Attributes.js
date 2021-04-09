import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BreadcrumbItem, Breadcrumb, Row, Label, InputGroupAddon, InputGroup, InputGroupText, Col, Button, Input, Card, CardHeader, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';
import { set } from 'core-js/fn/dict';
 
/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class Eidts extends Component {

  constructor(props) {
    super(props);
    this.state = {
       atributes:[{
           _id:"0",
           label:""
       }],
       auxType:"text",
       auxValue:"",
       auxValColor:"",
       auxValText:"",
    }

    this.options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 5,
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
      }

  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    this.props.loadReducer("loadCombinations", "combinations/", {});
  } 
 
  option(){
      var options = [];
      try{
        options.push(<option key="comb0" value="0">Combinaciones</option>)
        this.props.obj.totalcombinations.label.forEach((elemt, item) => {
           var key = "comb"+(item+1);
           options.push(<option key={key} value={elemt}>{elemt}</option>)
        });
      }catch(e){}
      return options;
  }

  formCombinations(val){
    var html = [];
    return(
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Label>Combinación: </Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="name" placeholder="Ingrese el nombre de la Combinación" required />
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
            <Col>
                Tabla
            </Col>
        </Row>
    )
  }

  typeAux(cell, row){
    var key = row._id;
    if(row.type == "color") return (
        <Input
            key={key}
            type="color"
            name="color"
            id="exampleColor"
            placeholder="color placeholder"
            defaultValue="#ff0000"
        />
    );
    if(row.type == "text") return <div>{row.aux}</div>;
   }

  dataForm(){
    var valOption = window.document.getElementById("combinacion").value;
    var combinations =  [];
    this.props.obj.listCombination.forEach((val, item) => {
        if(val.label == valOption) combinations.push(val);
    })
    if(this.props.obj.listCombination.length > 0){
        this.setState({
            atributes:combinations
        });
    }
  }

  chageType(){
     var valType = window.document.getElementById("typefeature").value;
     var valAux = window.document.getElementById("featureaux").value;
     this.setState({
        auxType:valType,
        auxValue:"ddd"
     })
  }

  render() {

    return (

      <Row>
        <Col xs="12" md="12">
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            Seleccione la Combinación
                        </CardHeader>
                        <CardBody>
                            <Col xs="5" md="5">
                                <Row>
                                    <Col xs="12" md="12">
                                        <Row>
                                            <Col xs="12" md="8">
                                                <Input type="select" name="combinacion" onChange={this.dataForm.bind(this)} id="combinacion" key="combinacion">
                                                    {this.option()}
                                                </Input>
                                            </Col>
                                            <Col xs="12" md="4"xl className="mb-2 mb-xl-0">
                                                <Button active block color="success" aria-pressed="true">+ Combinación</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>

        <Col xs="12" md="12">
            <Row>
                <Col xs="6" md="6">
                    <Card>
                        <CardHeader>
                            Gestion de Combinaciones
                        </CardHeader>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-sliders"></i>
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="combination" name="combination" placeholder="Nombre Combinación" defaultValue={this.state.atributes[0].label} />
                            </InputGroup>
                            <Breadcrumb>
                                <BreadcrumbItem active>Adicionar Caracteristicas</BreadcrumbItem>
                            </Breadcrumb>
                            <Row>
                                <Col xs="12" md="12">
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-plus-square"></i>
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" id="feature" name="feature" placeholder="Nombre Caracteristica" defaultValue={this.state.atributes[0].label} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="4">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-eye"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="select" name="typefeature" onChange={this.chageType.bind(this)} id="typefeature" key="typefeature">
                                            <option value="text">Texto</option>
                                            <option value="color">Color</option>
                                        </Input>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" md="4">
                                    <InputGroup>
                                    <InputGroup>
                                        <Input type={this.state.auxType} id="featureaux" name="featureaux" placeholder="Nombre Auxiliar" defaultValue={this.state.auxValue} />
                                    </InputGroup>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" md="4">
                                    <InputGroup>
                                        Boton Agregar
                                    </InputGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="6" md="6">
                    <Card>
                        <CardHeader>
                            Atributos para la Combinación <b>{this.state.atributes[0].label}</b>
                        </CardHeader>
                        <CardBody>
                            <BootstrapTable data={this.state.atributes} key="caracteristicas" striped hover options={this.options} > 
                                <TableHeaderColumn width={'25%'} dataField='label' >Combinación</TableHeaderColumn>
                                <TableHeaderColumn width={'30%'} dataField='name' >Atributo</TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataFormat={this.typeAux.bind(this)}>Atributo</TableHeaderColumn>
                                <TableHeaderColumn isKey={true} dataField='_id' hidden>Identifier ID</TableHeaderColumn>
                            </BootstrapTable>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Col>
      </Row>
       
    );
  }
}

const mapStateToProps = (state) => {
  return{
    obj:state.DaoCombinations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReducer: (type, colletion, body) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body);
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Eidts);
