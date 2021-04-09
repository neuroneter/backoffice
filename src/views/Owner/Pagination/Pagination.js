import React, { Component } from 'react';
import { Card, Row, Col, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import CurrencyFormat from 'react-currency-format';

class ObjPag extends Component {

    constructor(props) {
        super(props);
        this.pagMax = 3;
    }

    callPagination(action, dato, objParent){
        var limitTmp = parseInt(objParent.info.limit);
        var pagNum = 1;

        if(action == "back"){ pagNum = parseInt(objParent.info.pag)-1; }

        if(action == "allback"){ pagNum = 1; }

        if(action == "forward"){ pagNum = parseInt(objParent.info.pag)+1; }

        if(action == "allforward"){ pagNum = parseInt(objParent.info.NumPages); }

        //Si el valor de registros visualizados por pagina cambia y se recupera la pagina en la que nos encontramos
        if(action == "cRegister"){
            limitTmp = parseInt(dato);
            pagNum = 1;
        }

        if(action == "nunPag"){ pagNum = parseInt(dato); }

        //Llamo a la funcion padre con la posición de paginacion
        objParent.pagLoad(pagNum,limitTmp);

    }

    paginationRender(objParent){

        const NumPages = parseInt(objParent.NumPages);
        const pag = parseInt(objParent.pag);
        var end = NumPages; 

        if((pag+this.pagMax) < NumPages) end = pag+this.pagMax;

        const tempPag = [];
        for (let i=pag; i<=end; i++) {
            if(i == pag){
                tempPag.push(
                    <PaginationItem key={"pag"+i} active>
                        <PaginationLink onClick={this.callPagination.bind(this, "nunPag", ""+i, this.props)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }else{
                tempPag.push(
                    <PaginationItem key={"pag"+i}>
                        <PaginationLink onClick={this.callPagination.bind(this, "nunPag", ""+i, this.props)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        }
        return tempPag;
    }

    pagRender(){

        const pagTemp = this.paginationRender(this.props.info);

        if(parseInt(this.props.info.NumPages) <= this.pagMax){
            return (
                <Pagination >
                    <PaginationItem disabled key="allback">
                        <PaginationLink onClick={this.callPagination.bind(this, "allback", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled key="back">
                        <PaginationLink onClick={this.callPagination.bind(this, "back", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    {pagTemp}
                    <PaginationItem disabled key="forward">
                        <PaginationLink onClick={this.callPagination.bind(this, "forward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleRight} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled key="allforward">
                        <PaginationLink onClick={this.callPagination.bind(this, "allforward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleRight} />
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            );
        }

        if(parseInt(this.props.info.pag) <= 1){
            return (
                <Pagination >
                    <PaginationItem disabled key="allback">
                        <PaginationLink onClick={this.callPagination.bind(this, "allback", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled key="back">
                        <PaginationLink onClick={this.callPagination.bind(this, "back", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    {pagTemp}
                    <PaginationItem  key="forward">
                        <PaginationLink onClick={this.callPagination.bind(this, "forward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleRight} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem  key="allforward">
                        <PaginationLink onClick={this.callPagination.bind(this, "allforward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleRight} />
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            );
        }
        
        if(parseInt(this.props.info.pag) >= (parseInt(this.props.info.NumPages))){
            return (
                <Pagination >
                    <PaginationItem  key="allback">
                        <PaginationLink onClick={this.callPagination.bind(this, "allback", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem  key="back">
                        <PaginationLink onClick={this.callPagination.bind(this, "back", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    {pagTemp}
                    <PaginationItem disabled key="forward">
                        <PaginationLink onClick={this.callPagination.bind(this, "forward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleRight} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled key="allforward">
                        <PaginationLink onClick={this.callPagination.bind(this, "allforward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleRight} />
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            );
        }
        else{
            return (
                <Pagination >
                    <PaginationItem  key="allback">
                        <PaginationLink onClick={this.callPagination.bind(this, "allback", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem  key="back">
                        <PaginationLink onClick={this.callPagination.bind(this, "back", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleLeft} />
                        </PaginationLink>
                    </PaginationItem>
                    {pagTemp}
                    <PaginationItem  key="forward">
                        <PaginationLink onClick={this.callPagination.bind(this, "forward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleRight} />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem  key="allforward">
                        <PaginationLink onClick={this.callPagination.bind(this, "allforward", null, this.props)}>
                            <FontAwesomeIcon  icon={faAngleDoubleRight} />
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            );
        }

    }

    option(){
        const temp = [];
        var selected = "";

        if(this.props.info.limit == 10000000) selected = "Todos";
        else  selected = this.props.info.limit;
        temp.push(<option key={"opt0"} value="3333">{selected}</option>);
        if(this.props.info.limit != 5 && 5 <= this.props.info.RegPerFind)temp.push(<option key="opt5" value="5">5</option>);
        if(this.props.info.limit != 10 && 10 <= this.props.info.RegPerFind)temp.push(<option key="opt10" value="10" >10</option>);
        if(this.props.info.limit != 20 && 20 <= this.props.info.RegPerFind)temp.push(<option key="opt20" value="20" >20</option>);
        if(this.props.info.limit != 50 && 50 <= this.props.info.RegPerFind)temp.push(<option key="opt50" value="50">50</option>);
        if(this.props.info.limit != 100 && 100 <= this.props.info.RegPerFind)temp.push(<option key="opt100" value="100" >100</option> );
        if(this.props.info.limit != this.props.info.RegPerFind)temp.push(<option key="opt10000000" value={this.props.info.RegPerFind} >Todos</option> );
        return temp;
    }

    render(){

        return (
            <Row>
                <Col xs="12" md="4">
                    <Row>
                        <Col xs="4" md="0"></Col>
                        <Col xs="8" md="12">
                            <Row>
                                <Col xs="4" md="4" style={{textAlign:"center", margin:"auto", border:"1px solid #dedede",padding:"6px"}} >
                                    <CurrencyFormat value={(this.props.info.RegPerFind != null)?this.props.info.RegPerFind:0} displayType={'text'} thousandSeparator={true} renderText={value => value} />
                                </Col>
                                <Col xs="8" md="8">
                                    <Input type="select" name="select" id="pagNum" onChange={ 
                                        (event) => {this.callPagination("cRegister", event.target.value, this.props);}
                                    }> 
                                        {this.option()}      
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" md="8">
                    {this.pagRender()}
                </Col>
            </Row>
           
        );
    }

}

export default ObjPag;