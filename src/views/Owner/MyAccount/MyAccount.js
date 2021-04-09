import { connect } from 'react-redux';
import React, { Component } from 'react';
import DbCrud from '../../../Actions/DbCrud';
import {
  Badge, Button, ButtonDropdown, Card, CardBody, CardFooter,
  CardHeader, Col, Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback,
  Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row,
} from 'reactstrap';

import { TextMask, InputAdapter } from 'react-text-mask-hoc';

var flat = true;

class MyAccount extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }
  
  componentDidMount(){this.props.dispReducer('loadCompany',"company", "email",this.props.email);}

  componentDidUpdate(){
    if(flat){
      flat=false;
      this.props.dispReducer('loadCompany', "company", "email",this.props.email);
    }
  }


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
       
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Compañia</strong>
              </CardHeader>
              
              <CardBody>
                <FormGroup>
                  <Label htmlFor="email">Correo</Label>
                  <Input type="text" id="company" placeholder="Email" defaultValue={this.props.email} disabled/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="company">Nombre Empresa</Label>
                  <Input type="text" id="company" placeholder="Nombre Fiscal de Empresa" defaultValue={this.props.obj.companyName}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="tradeName">Nombre Empresa</Label>
                  <Input type="text" id="tradeName" placeholder="Nombre Comercial"  defaultValue={this.props.obj.tradeName}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="nit">NIT</Label>
                  <Input type="text" id="nit" placeholder="98765233-2" defaultValue={this.props.obj.nit}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="logo">Logo</Label>
                  <Input type="text" id="logo" placeholder="Url Logo Imagen Compañía" defaultValue={this.props.obj.logo}/>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Banco</strong>
              </CardHeader>
              <CardBody>
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="bankName">Nombre del Banco</Label>
                        <Input type="select" id="bankName" name="ccmonth" id="ccmonth" >
                            <option value="0">A continuación seleccione su banco</option>
                            <option value="1040" selected={ this.props.obj.banks[0].bankId == "1040"  ? "selected" : ""}>BANCO AGRARIO</option>
                            <option value="1052" selected={ this.props.obj.banks[0].bankId == "1052"  ? "selected" : ""}>BANCO AV VILLAS</option>
                            <option value="1013" selected={ this.props.obj.banks[0].bankId == "1013"  ? "selected" : ""}>BANCO BBVA COLOMBIA S.A.</option>
                            <option value="1032" selected={ this.props.obj.banks[0].bankId == "1032"  ? "selected" : ""}>BANCO CAJA SOCIAL</option>
                            <option value="1019" selected={ this.props.obj.banks[0].bankId == "1019"  ? "selected" : ""}>BANCO COLPATRIA</option>
                            <option value="1066" selected={ this.props.obj.banks[0].bankId == "1066"  ? "selected" : ""}>BANCO COOPERATIVO COOPCENTRAL</option>
                            <option value="1051" selected={ this.props.obj.banks[0].bankId == "1051"  ? "selected" : ""}>BANCO DAVIVIENDA</option>
                            <option value="1001" selected={ this.props.obj.banks[0].bankId == "1001"  ? "selected" : ""}>BANCO DE BOGOTA</option>
                            <option value="1023" selected={ this.props.obj.banks[0].bankId == "1023"  ? "selected" : ""}>BANCO DE OCCIDENTE</option>
                            <option value="1062" selected={ this.props.obj.banks[0].bankId == "1062"  ? "selected" : ""}>BANCO FALABELLA </option>
                            <option value="1012" selected={ this.props.obj.banks[0].bankId == "1012"  ? "selected" : ""}>BANCO GNB SUDAMERIS</option>
                            <option value="1060" selected={ this.props.obj.banks[0].bankId == "1060"  ? "selected" : ""}>BANCO PICHINCHA S.A.</option>
                            <option value="1002" selected={ this.props.obj.banks[0].bankId == "1002"  ? "selected" : ""}>BANCO POPULAR</option>
                            <option value="1058" selected={ this.props.obj.banks[0].bankId == "1058"  ? "selected" : ""}>BANCO PROCREDIT</option>
                            <option value="1065" selected={ this.props.obj.banks[0].bankId == "1065"  ? "selected" : ""}>BANCO SANTANDER COLOMBIA</option>
                            <option value="1007" selected={ this.props.obj.banks[0].bankId == "1007"  ? "selected" : ""}>BANCOLOMBIA</option>
                            <option value="1061" selected={ this.props.obj.banks[0].bankId == "1061"  ? "selected" : ""}>BANCOOMEVA S.A.</option>
                            <option value="1009" selected={ this.props.obj.banks[0].bankId == "1009"  ? "selected" : ""}>CITIBANK </option>
                            <option value="1292" selected={ this.props.obj.banks[0].bankId == "1292"  ? "selected" : ""}>CONFIAR COOPERATIVA FINANCIERA</option>
                            <option value="1551" selected={ this.props.obj.banks[0].bankId == "1551"  ? "selected" : ""}>DAVIPLATA</option>
                            <option value="1006" selected={ this.props.obj.banks[0].bankId == "1006"  ? "selected" : ""}>ITAU</option>
                            <option value="1507" selected={ this.props.obj.banks[0].bankId == "1507"  ? "selected" : ""}>NEQUI</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="type">Tipo Cuenta</Label>
                        <Input type="select" name="type" id="number" required>
                          <option value="1" selected={ this.props.obj.banks[0].bankId == "1"  ? "selected" : ""}>Ahorros</option>
                          <option value="2" selected={ this.props.obj.banks[0].type == "2"  ? "selected" : ""}>Corriente</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="banktitleName">Titular de la Cuenta</Label>
                        <Input type="text" id="banktitleName" placeholder="Numero de la cuenta" defaultValue={this.props.obj.banks[0].title} />
                      </FormGroup>
                    </Col>
                    <Col xs="6"> 
                      <FormGroup>
                        <Label htmlFor="numberBank">Numero de Cuenta</Label>
                        <Input type="number" id="numberBank" placeholder="Nombre del titular" defaultValue={this.props.obj.banks[0].number} />
                      </FormGroup>
                    </Col>
                  </FormGroup>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
      <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Dirección</strong>
                <small> Oficina</small>
              </CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="address">Dirección</Label>
                      <Input type="text" id="address-0" placeholder="Ingrese la dirección de forma clara" defaultValue={this.props.obj.addresses[0].address} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="neighborhood">Barrio</Label>
                      <Input type="text" id="neighborhood-0" placeholder="Ingrese nombre de Barrio o Zona" defaultValue={this.props.obj.addresses[0].neighborhood}/>
                    </FormGroup>
                  </Col>
                  
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="country">Pais</Label>
                      <Input type="text" id="country-0" placeholder="Nombre del Pais" value="Colombia" disabled defaultValue={this.props.obj.addresses[0].country}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="state">Departamento</Label>
                      <Input type="select" name="state" id="state-0">
                        <option value="1" selected={ this.props.obj.addresses[0].state == "1"  ? "selected" : ""}>Bogota</option>
                        <option value="2" selected={ this.props.obj.addresses[0].state == "2"  ? "selected" : ""}>Cundinamarca</option>
                        <option value="3" selected={ this.props.obj.addresses[0].state == "3"  ? "selected" : ""}>Arauca</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
  
                <FormGroup  row className="my-0">
  
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input type="select" name="city" id="city-0" placeholder="Nombre de la Ciudad">
                          <option value="1" selected={ this.props.obj.addresses[0].city == "1"  ? "selected" : ""}>Bogota</option>
                          <option value="2" selected={ this.props.obj.addresses[0].city == "2"  ? "selected" : ""}>Cucuta</option>
                          <option value="3" selected={ this.props.obj.addresses[0].city == "3"  ? "selected" : ""}>Bucaramanga</option>
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="postalcode">Codigo Postal</Label>
                        <Input type="text" id="postalcode-0" placeholder="Codigo Postal" defaultValue={this.props.obj.addresses[0].postalcode}/>
                      </FormGroup>
                    </Col>
  
                </FormGroup>
  
                <FormGroup row className="my-0">
  
                  <Col xs="6">
                    <Label>Telfono</Label>
                    <InputGroup >
                      <TextMask id="phone-0"
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        Component={InputAdapter}
                        className="form-control" value={(this.props.obj.addresses[0].phone == '')?"571":this.props.obj.addresses[0].phone}
                      />
                    </InputGroup>
                    <FormText color="muted">
                      ex. (571) 999-9999
                    </FormText>
                  </Col>
                  
                  <Col xs="6">
                    <Label>Celular</Label>
                    <InputGroup >
                      <TextMask id="mobile-0"
                        mask={[/[3]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        Component={InputAdapter}
                        className="form-control" value={(this.props.obj.addresses[0].mobile == '')? "3" :this.props.obj.addresses[0].mobile}
                      />
                    </InputGroup>
                    <FormText color="muted">
                      ex. (999) 999-9999
                    </FormText>
                  </Col>
  
                </FormGroup>
  
                <FormGroup>
                    <Label htmlFor="info">Información adicional</Label>
                    <Input type="textarea" name="info" id="info-0" rows="3" placeholder="Contenido..."  defaultValue={this.props.obj.addresses[0].info}/>
                </FormGroup>
  
              </CardBody>
          </Card>

      </Col>

      <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Dirección</strong>
                <small> Bodega</small>
              </CardHeader>
              <CardBody>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="address">Dirección</Label>
                      <Input type="text" id="address-1" placeholder="Ingrese la dirección de forma clara" defaultValue={this.props.obj.addresses[1].address}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="neighborhood">Barrio</Label>
                      <Input type="text" id="neighborhood-1" placeholder="Ingrese nombre de Barrio o Zona" defaultValue={this.props.obj.addresses[1].neighborhood}/>
                    </FormGroup>
                  </Col>
                  
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="country">Pais</Label>
                      <Input type="text" id="country-1" placeholder="Nombre del Pais" disabled defaultValue={this.props.obj.addresses[1].country}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="state">Departamento</Label>
                      <Input type="select" name="state" id="state-1">
                        <option value="1" selected={ this.props.obj.addresses[1].state == "1"  ? "selected" : ""}>Bogota</option>
                        <option value="2" selected={ this.props.obj.addresses[1].state == "2"  ? "selected" : ""}>Cundinamarca</option>
                        <option value="3" selected={ this.props.obj.addresses[1].state == "3"  ? "selected" : ""}>Arauca</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </FormGroup>
  
                <FormGroup  row className="my-0">
  
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input type="select" name="city" id="city-1" placeholder="Nombre de la Ciudad">
                          <option value="1" selected={ this.props.obj.addresses[1].city == "1"  ? "selected" : ""}>Bogota</option>
                          <option value="2" selected={ this.props.obj.addresses[1].city == "2"  ? "selected" : ""}>Cucuta</option>
                          <option value="3" selected={ this.props.obj.addresses[1].city == "3"  ? "selected" : ""}>Bucaramanga</option>
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="postal-code">Codigo Postal</Label>
                        <Input type="text" id="postal-code-1" placeholder="Codigo Postal" defaultValue={this.props.obj.addresses[0].postalcode}/>
                      </FormGroup>
                    </Col>
  
                </FormGroup>
  
                <FormGroup row className="my-0">
                
                  <Col xs="6">
                    <Label>Telfono</Label>
                    <InputGroup >
                      <TextMask id="phone-1"
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        Component={InputAdapter}
                        className="form-control" value={(this.props.obj.addresses[1].phone == '')?"571":this.props.obj.addresses[1].phone}
                      />
                    </InputGroup>
                    <FormText color="muted">
                      ex. (571) 999-9999
                    </FormText>
                  </Col>
                  
                  <Col xs="6">
                    <Label>Celular</Label>
                    <InputGroup >
                      <TextMask id="celmobilelphone-1"
                        mask={[/[3]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        Component={InputAdapter}
                        className="form-control" value={(this.props.obj.addresses[1].mobile == '')? "3" :this.props.obj.addresses[1].mobile}
                      />
                    </InputGroup>
                    <FormText color="muted">
                      ex. (999) 999-9999
                    </FormText>
                  </Col>
  
                </FormGroup>
  
                <FormGroup>
                    <Label htmlFor="info">Información adicional</Label>
                    <Input type="textarea" name="info" id="info-1" rows="3" placeholder="Contenido" defaultValue={this.props.obj.addresses[1].info}/>
                </FormGroup>
  
              </CardBody>
          </Card>
      </Col>
      </Row>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
      email: state.login.email,
      password: state.login.password,
      obj: state.MyAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return{ 
      dispReducer: (type, colletion, file, value) => { 
        DbCrud.dbFindRegister(dispatch, type, colletion, file, value);
      } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);