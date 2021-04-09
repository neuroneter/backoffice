import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';

class Login extends Component {

  handleChange(e){
    this.props.dispatch("lInput",e.target.id, e.target.value);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch("login",e.target.id, e.target.value);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit.bind(this)} >
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Correo" autoComplete="username"  onChange={this.handleChange.bind(this)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Contraseña" autoComplete="current-password" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">INGRESAR</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Recordar Contraseña?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Requieres una contraseña</h2>
                      <p>Solicita una Contraseña para ingresar al Seller Center.</p>
                      <Button color="primary" className="mt-3" active>Registrate!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    email: state.login.email,
    password: state.login.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    dispatch: (type, idInput, value) => {
      dispatch({type:type, idInput:idInput, value:value})  
    }
  }
}

//con la clase connect de redux damos acceso al store de los estados y el dispatch 
//de la misma manera permite comunicación para enviar datos desde el componente actual al store 
//para eso definimos dos funciones mapStateToProps: encargada recuperar del estado los valores que necesitamos
// y mapDispatchToProps: encargada de definir al dispatch los valores que seran transferidos a si como el type que es usado para identificar que metodo del dispatch tiene 
//que tratar estos valores. 
export default connect(mapStateToProps, mapDispatchToProps)(Login);
