import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardBody, Button, ButtonGroup, Row} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import DbCrud from '../../../Actions/DbCrud';

class List extends Component { 

  constructor(props) {
    super(props);
    this.options = {
        sortIndicator: true,
        hideSizePerPage: true,
        paginationSize: 3,
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
      }
    this.state = {
        documentId: this.props.match.params.idDocument,
        countryObj:"",
        statesObj:"",
        citiesObj:""
    };

    if(this.props.obj.length == 0){
     this.props.history.push('/Geo/CountriesList');
    }else{
        this.props.obj.forEach(function(country) {
            if(country.documentId == this.props.match.params.idDocument){
                country.states.forEach(function(states) {
                    if(states.code == this.props.match.params.Code){
                        this.state = {
                            documentId: this.props.match.params.idDocument,
                            countryObj:country,
                            statesObj:states,
                            citiesObj:states.cities
                        };

                    }
                }.bind(this));
            }
        }.bind(this));
    }
  }

  componentDidCatch (error, errorInfo) { 
    console.log("Cat")
   } 

  loadStates(){
    console.log("id");
  }

 editFormatter(cell, row) {
    return(
        <ButtonGroup>
            <Button size="sm"  className="btn-spotify btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
              <i className="icon-pencil"></i>
            </Button>
            <Button size="sm" className="btn-reddit btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
              <i className="icon-trash"></i>
            </Button>
        </ButtonGroup>
    )
}

editObject(row) {
  this.props.history.push('/Geo/StatesList/'+row.id);
}

loadStates(cell,row){
  return(
    <Button size="sm"  onClick={()=>this.editObject(row)} className="btn-dropbox btn-brand text mr-1 mb-1 btn btn-secondary btn-lg">
        Ver Estados
    </Button>
  ) 
}

geopoint(cell, row){
 return(
    <div>
      Lat: {row.geopoint.latitude} Lon:{row.geopoint.longitude} 
    </div>
  );
}
active(cell, row){
  if(row.active == '1'){
      return(
          <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked/>
      );
    }else{
      return(
         <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label  />
      );
    }
}

callBackCountry(){this.props.history.push('/Geo/CountriesList');}
callBackState(){this.props.history.push('/Geo/StatesList/'+this.state.documentId);}

render() {

  return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i onClick={this.callBackCountry.bind(this)} className="btn btn-link">Pais: {this.state.countryObj.countryName}</i>
            <i onClick={this.callBackState.bind(this)} className="btn btn-link">Estado: {this.state.statesObj.stateName}</i>
            <div className="card-header-actions">
              <a href="https://github.com/AllenFang/react-bootstrap-table" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">Aprende</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
              
            <Button color="primary" ><i className="fa icon-plus"></i>&nbsp;Crear Ciudad</Button>
            <Button color="secondary" onClick={this.callBackState.bind(this)} className="float-right"><i className="fa icon-arrow-left-circle"></i>&nbsp;Regresar</Button>
            <Row>&nbsp;</Row>
            <BootstrapTable data={this.state.citiesObj} striped hover pagination search options={this.options} >
              <TableHeaderColumn dataField='cityName' dataSort>Estado</TableHeaderColumn>
              <TableHeaderColumn isKey dataField='code' >Codigo General</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.geopoint.bind(this)} >Geo Punto</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.active.bind(this)} dataAlign='center' >Activo</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.editFormatter} dataAlign='right' >Action</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    obj: state.DaoGeo
  }
}

const mapDispatchToProps = (dispatch) => {
  return{ 
    dispReducer: (type, colletion) => {
        //   DbCrud.dbFindColletion(dispatch, type, colletion);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
