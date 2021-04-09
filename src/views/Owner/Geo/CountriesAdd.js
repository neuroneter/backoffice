import { connect } from 'react-redux';
import React, { Component } from 'react';
import DbCrud from '../../../Actions/DbCrud';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, Label, Row} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

class CountriesAdd extends Component {

  constructor(props) {
    super(props);
    if(this.props.location.row){
      this.state = this.props.location.row;
    }else{
      this.state = {
        countryName: '',
        isoCode: '',
        active: '',
        geopoint: {latitude:'',longitude:''},
      }
    }
  }

  callList() { this.props.history.push('/Geo/CountriesList'); }

  callSave(e) {
    e.preventDefault();
    if(this.state.documentId){
      this.props.update('updateGeo', "geo", "CountriesList", this, this.state.documentId);
      this.props.history.push('/Geo/CountriesList');
    }else{
      this.props.create('addGeo', "geo", "CountriesList", this);
      this.props.history.push('/Geo/CountriesList');
    }
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Crear nuevo País</strong>
                <Button color="secondary" onClick={this.callList.bind(this)} className="float-right"><i className="fa icon-arrow-left-circle"></i>&nbsp;Regresar</Button>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal" onSubmit={this.callSave.bind(this)}>
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="countryName">Nombre Pais</Label>
                        <InputGroup >
                          <TextMask ref="countryName" id="countryName" format="string" required autoComplete="off"
                            mask={[/[A-Z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/,
                              /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/,
                              /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/,
                              /[\sa-z]/, /[\sa-z]/, /[\sa-z]/, /[\sa-z]/]}
                            Component={InputAdapter}
                            guide={false}
                            value={this.state.countryName}
                            className="form-control" placeholder="Colombia" 
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="isoCode">Codigo ISO</Label>
                        <InputGroup >
                          <TextMask ref="isoCode" id="isoCode" format="string" required autoComplete="off"
                            mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/]}
                            Component={InputAdapter}
                            guide={false}
                            value={this.state.isoCode}
                            className="form-control" placeholder="COL"
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="type">Estado</Label>
                        <Input type="select" defaultValue={this.state.active} id="active" format="string" ref="active" required >
                          <option value="1" >Activo</option>
                          <option value="0" >Inactivo</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="Latitud">Geo Latitud</Label>
                        <Input type="number" ref="latitude" id="latitude" 
                          format="latitude" required autoComplete="off" min="-90" max="90"
                          className="form-control" placeholder="Valor entre (-90 y 90.000000)"
                          defaultValue={this.state.geopoint.latitude}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="Longitud">Geo Longitud</Label>
                        <Input type="number" ref="longitude" id="longitude" 
                          required format="longitude" autoComplete="off" min="-180" max="180"
                          className="form-control" placeholder="Valor entre (-180.000000 y 180.000000)"
                          defaultValue={this.state.geopoint.longitude}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <div className="form-actions">
                    <Button color="primary" type="submit" value="Submit">Guardar</Button>&nbsp;&nbsp;
                        <Button color="secondary" onClick={this.callList.bind(this)}>Cancel</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    obj: state.MyAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (type, colletion, component, e) => {
      DbCrud.dbCreate(dispatch, type, colletion, component, e);
    },
    update: (type, colletion, component, e, documentId) => {
      DbCrud.dbUpdate(dispatch, type, colletion, component, e, documentId);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesAdd);