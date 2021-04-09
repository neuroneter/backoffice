import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal, ButtonGroup, Button, FormGroup, Row, Label, InputGroupAddon, InputGroup, InputGroupText, Col,  Input, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DbCrud from '../../../Actions/DbCrud';
import { AppSwitch } from '@coreui/react';
import ReactQuill from 'react-quill';
import classnames from 'classnames';
import 'quill/dist/quill.snow.css';
import "./Products.css";
import CurrencyFormat from 'react-currency-format';
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../Utils/CloudinaryService";
import { Image, Transformation } from 'cloudinary-react';
import { CommonLoading } from 'react-loadingg';

// React DateRangePicker
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import moment from "moment"; 
import "moment/locale/es";

// React select
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { parseFloat } from 'core-js/fn/number';

//Alerts
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Compoenente que permite listar todos los paises que existen en la base de datos
*/
class Eidts extends Component {
//discbonus:0, margStore:false, costBob: 0,costBobD: 0,margTotalBob:0,
  constructor(props) {
    super(props);
    this.state = {
      margCatMin:0,
      margBruto:0,
      checkBonus:false,
      tax:0,
      loader:false, 
      endDate:null,
      selectStores:[],
      arrayStores:[],
      totalTax:0,
      activeTab: '1',
      discountTable:[],
      row : JSON.parse(localStorage.getItem("row"))
    }
    this.toggle = this.toggle.bind(this);
    this.categories = this.categories.bind(this)
    this.description = this.description.bind(this);
    this.sDescription = this.sDescription.bind(this);
    this.selects = this.selects.bind(this);
    this.selectRolSupplier = this.selectRolSupplier.bind(this);
    this.addDatePicker = this.addDatePicker.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.addStore = this.addStore.bind(this);
    this.setDiscountVal = this.setDiscountVal.bind(this);
    this.setDiscountCost = this.setDiscountCost.bind(this);

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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      localStorage.setItem('activeTab',tab);
      this.setState({activeTab: tab,});
    }
  }

  saveProduct(){
    if(this.checkProduct()){
      var objDiscount = JSON.parse(localStorage.getItem('objDiscounts'));
      var tmpRow = this.state.row;
      var objDiscountTmp = [];
      var calculate = Math.round(((this.state.row.pvp-this.state.row.cost)/this.state.row.pvp)*100, -1);
      console.log(calculate+" =-- "+this.state.margCatMin);
      if(calculate < this.state.margCatMin || !calculate){
        this.setState({activeTab:'2'},() => {
          document.getElementById("cost").focus();
          document.getElementById("cost").classList.add("is-invalid");
          localStorage.setItem('activeTab','2');
        });
        toast.error('El margen ofrecido de ('+calculate+'%), es inferior al minimo negociado ('+this.state.margCatMin+'%), corrija el PVP o el Costo.');
        
      }else{
        if(objDiscount != null && objDiscount.length > 0){
          objDiscount.forEach(val => {
            var storesArray = [];
            val.stores.forEach(idStore =>{
              storesArray.push(idStore.value);
            });
            objDiscountTmp.push({
              stores:storesArray,
              value:val.value,
              startDate:val.dates.startDate,
              endDate:val.dates.endDate,
              bonus:val.bonus
            })
          })
          tmpRow.discount = objDiscountTmp;
        }else tmpRow.discount = [];
        this.setState({row:tmpRow, loader:true});
        if(tmpRow.update){
          delete tmpRow.update;
          this.props.loadReducer('updateProducts', "products/add", tmpRow,this.setId.bind(this));
        }else
          this.props.loadReducer('updateProducts', "products/update", tmpRow,this.setId.bind(this));
      }
   }
  }

  setId(obj){
    var self = this; 
    var rowTmp = this.state.row;
    if(obj._id != undefined) rowTmp._id = obj._id;
    setTimeout(function(){ 
      self.setState({loader:false, row:rowTmp});
    }, 2000);
  }

  checkProduct(){
    //toast('Hello World!');
    //toast.error('Danger!');
    if(this.state.row.categories.length <= 0){ 
      toast.error('Favor selecciona minimo una categoría para continuar');
      return false; 
    }
    else if(this.state.row.code == ""){
      toast.error('Favor ingrese un código para continuar');
      return false;
    } 
    else if(this.state.row.reference == ""){
      toast.error('Favor ingrese una referencia de producto para continuar');
      return false;
    } 
    else if(this.state.row.name == ""){
      toast.error('Favor ingrese el nombre del producto para continuar');
      return false;
    } 
    else if(this.state.row.idBrand == ""){
      toast.error('Favor seleccione la marca del producto para continuar');
      return false;
    } 
    else if(this.state.row.idSupplier == ""){
      toast.error('Favor seleccione el proveerdor del producto para continuar');
      return false;
    } 
    else if(this.state.row.sDescription.length < 100){
      toast.error('Favor ingrese una descripción corta del producto para continuar, recuerde que esta tiene que tener minimo 100 caracteres');
      return false;
    }else if(this.state.row.sDescription.length >600){
      toast.error('Favor ingrese una descripción corta del producto para continuar, recuerde que esta tiene que tener maximo 600 caracteres');
      return false;
    }else if(this.state.row.dimensions.width <= 0 || this.state.row.dimensions.heigth <= 0 || this.state.row.dimensions.deep <= 0 || this.state.row.dimensions.weight <= 0){
      toast.error('Favor Ingrese los valores del producto Ancho x Alto x Profundo X Peso para poder continuar');
      return false;
    }else if(this.state.row.bDimensions.width <= 0 || this.state.row.bDimensions.heigth <= 0 || this.state.row.bDimensions.deep <= 0 || this.state.row.bDimensions.weight <= 0){
      toast.error('Favor Ingrese los valores del producto Ancho x Alto x Profundo X Peso para poder continuar');
      return false;
    }
    if(this.state.row.pvp <= 0){ 
      toast.error('Favor ingrese un precio correcto');
      return false; 
    }
    if(this.state.row.images.length <= 0){ 
      toast.error('Ingrese minimo una imagen para continuar');
      return false; 
    }
    return true;
  }

  /**Metodo que se ejecuta automaticamente cada vez que el componente es llamado */
  componentDidMount() {
    this.calculatePrices();
    var rowTmp = this.state.row;
    if(this.state.row.description == undefined) rowTmp.description = "";
    if(this.state.row.sDescription == undefined) rowTmp.sDescription = "";
    this.setInfo(rowTmp);
    this.setStores();
    this.setDatePicker();
    this.setDiscountTable();
    this.setImages();
    //this.addDiscountVal();
  }

  setImages(){
    var images = JSON.parse(localStorage.getItem('images'));
    var rowTmp = this.state.row;
    if(images != null) rowTmp.images = images;
    else localStorage.setItem('images', JSON.stringify(rowTmp.images));
    this.setState({row:rowTmp});
  }

  calculatePrices(){
    var idTax = this.state.row.idTax;
    var idSupplier = this.state.row.idSupplier;
    var pvp = this.state.row.pvp;
    var cost = this.state.row.cost;
    var listTaxes = JSON.parse(localStorage.getItem("listTaxes"));
    var listSuppliers = JSON.parse(localStorage.getItem("listSuppliers"));
    var i = 0;
    for(i = 0; i< listTaxes.length; i++)  if(listTaxes[i]._id == idTax) break;
    var taxValue = (listTaxes[i].value/100)+1;
    var tax = listTaxes[i].value;

    for(i = 0; i< listSuppliers.length; i++)  if(listSuppliers[i]._id == idSupplier) break;
    var margCatMin = listSuppliers[i].margCatalogue;

    var totalTax = Math.round((pvp-(pvp/taxValue)), -1);
    var marginValue = pvp-cost;
    var margin = Math.round((marginValue/pvp)*100, -1);

    //if(margTotalBob < 3000) margTotalBob = 3000;
    this.setState({
      totalTax,
      tax,
      margin,
      marginValue,
      margCatMin
    },() => {
      this.errorCosto();
    })

  }

  status(cell){
    if(this.state.row.status){
        return(
            <AppSwitch id="status" onChange={this.changeInputs.bind(this,"status")} className={'mx-1'} variant={'pill'} color={'success'} label checked/>
        );
      }else{
        return(
           <AppSwitch id="status" onChange={this.changeInputs.bind(this,"status")} className={'mx-1'} variant={'pill'} color={'success'} label  />
        );
      }
  } 

  description(value) {
    var rowTmp = this.state.row;
    rowTmp.description = value;
    this.setInfo(rowTmp);
  }

  sDescription(value) {
      var rowTmp = this.state.row;
      rowTmp.sDescription = value;
      this.setInfo(rowTmp);
  }

  clickCategories(id, name){
    var rowTmp = this.state.row;
    if(document.getElementById("cat_"+id).checked){
      //rowTmp.categories.push({id:id, name:name});
      rowTmp.categories.push(id);
    }
    else{
      var TempCate = [];
      rowTmp.categories.forEach((val) => {
        if(val != id) TempCate.push(val);
      })
      rowTmp.categories = TempCate;
    }
    this.setInfo(rowTmp);
  }

  categories(){
   const listCategories = JSON.parse(localStorage.getItem("listCategories"));
   const cateObj = this.state.row.categories;
   var obj = [];
   var flag = false;
   var key = "";
   try{
    listCategories.forEach(element => {
      cateObj.forEach((val) => { if(element._id == val)flag = true;})
      key = "catChec"+element._id;
      obj.push(
        <Col key={key} xs="3" sm="3" md="3">
          <FormGroup  check className="checkbox">
            <Input className="form-check-input" type="checkbox" id={"cat_"+element._id} name={element.name} value={element._id} onClick={this.clickCategories.bind(this,element._id,element.name)} defaultChecked={flag}/>
            <Label check className="form-check-label">
              {element.name}
            </Label>
          </FormGroup>
        </Col>
      );
      
      flag = false;
    });
   }catch(e){}
    return obj;
  }

  saveLocalStorage(rowTmp){
    localStorage.setItem('row', JSON.stringify(rowTmp));
  }

  setInfo(value,file){
    var tabAct = localStorage.getItem("activeTab");
    this.setState({activeTab:(tabAct)?tabAct:'1', row:value});
    this.saveLocalStorage(value);
    if(file == "tax" || file == "cost" || file == "pvp" || file == "dollar" ) this.calculatePrices();
  }

  errorCosto(){
    var self = this;
    setTimeout(function(){
      if(self.state.activeTab == '2'){
        var calculate = Math.round(((self.state.row.pvp-self.state.row.cost)/self.state.row.pvp)*100, -1);
        if(calculate < self.state.margCatMin){
          toast.error('El margen ofrecido de ('+calculate+'%), es inferior al minimo negociado ('+self.state.margCatMin+'%), corrija el PVP o el Costo.');
          document.getElementById("cost").classList.add("is-invalid");
        }else{
          document.getElementById("cost").classList.remove("is-invalid");
        }
      }
    }, 5000);
  }

  changeInputs(idInput){
    var rowTmp = this.state.row;
    var value = document.getElementById(idInput).value;
    if(idInput == "code") rowTmp.code = value;
    if(idInput == "reference") rowTmp.reference = value;
    if(idInput == "name") rowTmp.name = value;
    if(idInput == "supplier") rowTmp.idSupplier = value;
    if(idInput == "brand"){
      var brands = JSON.parse(localStorage.getItem("listBrands"));
      for(var i=0; i<=brands.length; i++){
        if(brands[i]._id == value){
          rowTmp.nBrand = brands[i].name;
          break;
        } 
      }
      rowTmp.idBrand = value;
    } 
    if(idInput == "status") rowTmp.status = document.getElementById(idInput).checked;
    if(idInput == "tax") rowTmp.idTax = value;
    if(idInput == "dollar") rowTmp.dollar = parseInt((value == "")?0:value);
    if(idInput == "stock") rowTmp.stock = parseInt((value == "")?0:value);
    if(idInput == "cost"){
      rowTmp.cost = parseFloat((value == "")?0:value);
      this.errorCosto();
    } 
    if(idInput == "pvp")rowTmp.pvp = parseFloat((value == "")?0:value );
    if(idInput == "widthP")rowTmp.dimensions.width = parseFloat((value == "")?0:value );
    if(idInput == "heigthP")rowTmp.dimensions.heigth = parseFloat((value == "")?0:value);
    if(idInput == "deepP")rowTmp.dimensions.deep = parseFloat((value == "")?0:value);
    if(idInput == "weightP")rowTmp.dimensions.weight = parseFloat((value == "")?0:value);
    if(idInput == "widthB") rowTmp.bDimensions.width =parseFloat((value == "")?0:value);
    if(idInput == "heigthB")rowTmp.bDimensions.heigth = parseFloat((value == "")?0:value);
    if(idInput == "deepB")rowTmp.bDimensions.deep = parseFloat((value == "")?0:value);
    if(idInput == "weightB")rowTmp.bDimensions.weight = parseFloat((value == "")?0:value);
    this.setInfo(rowTmp,idInput);
  }

  selects(name, objSelect, id){
    var listObj = JSON.parse(localStorage.getItem(objSelect));
    var opTmp = [];
    var key = "";
    
    listObj.forEach((val) => {
      key = name+"_"+val._id;
      if(id == val._id)
        opTmp.unshift(<option key={key} value={val._id}>{val.name}</option>)
      else
        opTmp.push(<option key={key} value={val._id}>{val.name}</option>)
     });
    
    return (
      <Input type="select" id={name} onChange={this.changeInputs.bind(this,name)} name={name} key={name}>
        {opTmp}
      </Input>
    );
  }
  
  selectRolSupplier(){
    if(this.props.userdate.rol == 1 || this.props.userdate.rol == 2){
      return this.selects("supplier","listSuppliers", this.state.row.idSupplier);
    }else{
      var listSuppliers = JSON.parse(localStorage.getItem("listSuppliers"));
      for(var i=0; i<listSuppliers.length; i++) if(listSuppliers[i]._id == this.props.userdate.idSupplier) break;
      return <Input type="text" id="supplier" required defaultValue={listSuppliers[i].name} disabled/>
    }
  }

  setStores(){
    var discount = JSON.parse(localStorage.getItem("discount"));
    if(discount == null){
      discount = {stores: [{value:"all", label:"Todas", disable:true}]};
      localStorage.setItem("discount",JSON.stringify(discount));
    }
    var arrayStores = [];
    var listStores = JSON.parse(localStorage.getItem("listStores"));
    
    listStores.forEach(val => {
      arrayStores.push({value:val._id,label:val.name,disable:true});
    });
    
    this.setState({arrayStores, selectStores:discount.stores});
  }

  setCheckBonus(){
    var discount = JSON.parse(localStorage.getItem("discount"));
    this.setState({
      checkBonus:discount.bonus
    })
  }

  addStore(info){
    var selectStores = [];
    var discount = JSON.parse(localStorage.getItem("discount"));
    if(info.length == 0) selectStores = [{value:"all", label:"Todas", disable:true}];
    else{
      info.forEach(val => {
        if(val.value != "all"){
          selectStores.push(val);
        }
      })
    }
    discount.stores = selectStores;
    localStorage.setItem("discount",JSON.stringify(discount));
    this.setState({selectStores});
  }

  setDatePicker(){
    var discount = JSON.parse(localStorage.getItem("discount"));
    if(discount != null && discount.dates != undefined){
      this.setState({
         startDate: (discount.dates.startDate == "Invalid date")? null: moment(discount.dates.startDate),
         endDate: (discount.dates.endDate == "Invalid date")? null: moment(discount.dates.endDate)
      })
    }
  }

  addDatePicker({startDate, endDate}) {
    this.setState({ startDate, endDate });
    startDate = moment(startDate).format('YYYY/MM/DD');
    endDate = moment(endDate).format('YYYY/MM/DD');
    var discount = JSON.parse(localStorage.getItem("discount"));
    if(discount == null) localStorage.setItem("discount",JSON.stringify({dates:{startDate,endDate}}));
    else{
      discount.dates = {startDate:startDate,endDate:endDate}
      localStorage.setItem("discount",JSON.stringify(discount));
    }
  }

  setDiscountVal(){
    var discount = JSON.parse(localStorage.getItem("discount"));
    if(discount != null && discount.value != undefined){
      return discount.value;
    }else{
      return 1000;
    } 
  }

  setDiscountCost(){return this.state.row.cost - this.setDiscountVal();}

  addDiscountCost(){
    var cost = this.state.row.cost;
    var costDiscount = document.getElementById("costDiscount").value;
    var costVal = cost - costDiscount;
    document.getElementById("valueD").value = costVal;
    this.addDiscountVal();
  }

  addDiscountVal(){
    var value = document.getElementById("valueD").value;
    var discount = JSON.parse(localStorage.getItem("discount"));
    discount.value = value;
    discount.cost = this.state.row.cost-value;
    discount.pvp = this.state.row.pvp - value;
    localStorage.setItem("discount",JSON.stringify(discount));
    document.getElementById("costDiscount").value = this.state.row.cost-value;
  }

  onFocusChange(focusedInput) {this.setState({ focusedInput });}

  setDiscountTable(){
    var objDiscounts = JSON.parse(localStorage.getItem("objDiscounts"));
    if(objDiscounts == null){
      var discount = this.state.row.discount;
      objDiscounts = [];
      var stores = JSON.parse(localStorage.getItem("listStores"));
      discount.forEach(val => {
        var storesTmp = [];
        if(val.stores[0]=="all") storesTmp = [{value:"all", label:"Todas", disable:true}];
        else{
          val.stores.forEach(val => {
            stores.forEach(stVal => {
              if(val == stVal._id)  storesTmp.push({value:val, label:stVal.name, disable:true});
            });
          });
        }
        objDiscounts.push({
          value:val.value,
          dates:{startDate:val.startDate, endDate:val.endDate},
          id:val._id,
          stores:storesTmp,
          bonus:val.bonus
        })
      });
      localStorage.setItem('objDiscounts', JSON.stringify(objDiscounts));
    }
    console.log(objDiscounts);
    this.setState({discountTable:objDiscounts});  
  }

  htmlDiscountTable(){
    try{
      return(
        <BootstrapTable  data={this.state.discountTable} striped hover options={this.options}  > 
          <TableHeaderColumn width={'30%'} dataFormat={this.editTableStores.bind(this)} >Tiendas</TableHeaderColumn>
          <TableHeaderColumn width={'35%'} dataFormat={this.editTableDates.bind(this)} >Fechas</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editTableOldPVP.bind(this)} dataAlign="right">Old PVP</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editTableValue.bind(this)} dataAlign="right">Descuento</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editTablePVP.bind(this)} dataAlign="right">PVP</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editTableCost.bind(this)} dataAlign="right">Costo+Iva</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editTableBonus.bind(this)}>Accion</TableHeaderColumn>
          <TableHeaderColumn width={'10%'} dataFormat={this.editFormatter.bind(this)} >Accion</TableHeaderColumn>
          <TableHeaderColumn isKey={true} dataField='id' hidden>Identifier ID</TableHeaderColumn>
        </BootstrapTable>
      )
    }catch(e){}
  }

  addDiscountTable(){
    var discount = JSON.parse(localStorage.getItem("discount"));
    var cost = this.state.row.cost;
    var pvp = this.state.row.pvp;
    var marginMin = Math.round(((pvp-(cost - discount.value))/pvp)*100, -1);
    if(marginMin > 85){
      toast.error('El descuento que intenta ingresar es muy alto, verifique el PVP y el Costo del producto');
    }else if(discount.dates == undefined){
      toast.error('Ingrese las fechas del descuento');
      document.getElementById("datePicker").classList.add("error");
    }else{
      var flag = false;
      var startTmp = "";
      var endTmp = "";
      var startDate = moment.unix(moment(discount.dates.startDate).unix());
      var endDate = moment.unix(moment(discount.dates.endDate).unix());
      discount.bonus = document.getElementById("bonus").checked;
      this.state.discountTable.forEach(val => {
          document.getElementById(val.id).parentElement.parentElement.classList.remove('sameDiscount');
          startTmp = moment.unix(moment(val.dates.startDate).unix());
          endTmp = moment.unix(moment(val.dates.endDate).unix());
          var valStart = startDate-startTmp;
          var valEnd = endDate-endTmp;
          if(valStart <= 0 || valEnd <= 0){
            discount.stores.forEach(storeVal_i => {
              val.stores.forEach(storeVal_j => {
                if(storeVal_i.value == storeVal_j.value){
                  if(val.id != discount.id){
                    document.getElementById(val.id).parentElement.parentElement.className = 'sameDiscount';
                    flag = true;
                  }
                }
              });
            });
          }
      });
      if(flag){
        toast.error('ERROR - Existe descuentos con fechas que se cruzan con la que intenta ingresar.');
      }else{
          document.getElementById("valueD").classList.remove("error");
          document.getElementById("datePicker").classList.remove("error");
          var discountTable = (this.state.discountTable == undefined)? [] : this.state.discountTable;
          if(discount.value == undefined || discount.value < 1000) discount.value = 1000;
          if(discount.id != undefined){
            discountTable.forEach((val, key) => {
              if(val.id == discount.id){
                discountTable[key] = discount;
              }
            });
          }else{
            discount.id = "rowDiscount_"+discountTable.length;
            discountTable.push(discount);
          }
          this.setState({
            checkBonus:false,
            discountTable:discountTable,
            selectStores:[{value:"all", label:"Todas", disable:true}],
            startDate:null, 
            endDate:null,
          });
          document.getElementById("valueD").value = 1000;
          localStorage.setItem("objDiscounts",JSON.stringify(discountTable));
          discount = {stores: [{value:"all", label:"Todas", disable:true}]};
          localStorage.setItem("discount",JSON.stringify(discount));
      }
    }
  }

  editTableStores(cell, row){
    var storesArra = row.stores;
    var nameStores = "";
    storesArra.forEach(val => {
      nameStores += " "+val.label+",";
    });
    nameStores +=",";
    nameStores = nameStores.replace(",,","");
    return (<div id={row.id}>{nameStores}</div>);
  }

  editTableDates(cell, row){
    var start = moment(row.dates.startDate).format("DD/MM/YYYY");
    var end = moment(row.dates.endDate).format("DD/MM/YYYY");
    var days = parseInt(moment.unix(moment(row.dates.endDate).unix() - moment(row.dates.startDate).unix()).format('DD'))+1;
    return <Row><Col>{start+" -> "+end}</Col><Col>{"Días: "+days}</Col></Row>;
    //.duration(start.diff(end)).asDays();
  }

  editTableValue(cell, row){
    return <CurrencyFormat value={parseInt(row.value)} displayType={'text'} thousandSeparator={true} decimalSeparator={""}  prefix={'$'} renderText={value => value} />
  }

  editTableOldPVP(cell, row){
    return <CurrencyFormat value={parseInt(this.state.row.pvp)} displayType={'text'} thousandSeparator={true} decimalSeparator={""}  prefix={'$'} renderText={value => value} />
  }

  editTablePVP(cell, row){
    return <CurrencyFormat value={parseInt(this.state.row.pvp-row.value)} displayType={'text'} thousandSeparator={true} decimalSeparator={""}  prefix={'$'} renderText={value => value} />
  }

  editTableCost(cell, row){
    return <CurrencyFormat value={parseInt(this.state.row.cost-row.value)} displayType={'text'} thousandSeparator={true} decimalSeparator={""}  prefix={'$'} renderText={value => value} />
  }

  editTableBonus(cell, row){
    if(row.bonus) return "Bono";
    return "Descuento";
  }

  editRow(row){
    this.state.discountTable.forEach(val => {
      document.getElementById(val.id).parentElement.parentElement.classList.remove('sameDiscount');
    });
    localStorage.setItem("discount",JSON.stringify(row));
    document.getElementById("valueD").value = row.value;
    this.setCheckBonus();
    this.setStores();
    this.setDatePicker();
    this.calculatePrices();
  }

  removeRow(row){
    var discountTable = this.state.discountTable;
    var tmpDiscountTable = [];
    discountTable.forEach((val, item) => {
      if(row.id != discountTable[item].id) tmpDiscountTable.push(discountTable[item]);
    });
    this.setState({discountTable:tmpDiscountTable});
    localStorage.setItem("objDiscounts",JSON.stringify(tmpDiscountTable));
  }

  //Funcion que construye los botones de ediccion para cada registro listado en la tabla 
  editFormatter(cell, row) {
    return (
      <ButtonGroup>
        <Button onClick={this.editRow.bind(this, row)} size="sm" className="btn-spotify btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
          <i className="icon-pencil"></i>
        </Button>
        <Button onClick={this.removeRow.bind(this, row)} size="sm" className="btn-reddit btn-brand icon mr-1 mb-1 btn btn-secondary btn-sm">
          <i className="icon-trash"></i>
        </Button>
      </ButtonGroup>
    )
  }

  beginUpload(tag){
    var date = new Date();
    var name = date.getSeconds()+""+(date.getMinutes()+date.getHours())+""+(date.getMonth()+date.getFullYear());
    name = this.state.row.name.replace(new RegExp(' ', 'gi'),"_")+"_"+this.state.row.code+"_"+name;
    const uploadOptions = {
      cloudName:'dotcom-group-sas',
      uploadPreset:'bobSeller',
      sources:['local','url'],
      cropping:true,
      showSkipCropButton:true,
      croppingShowDimensions:true,
      croppingShowBackButton:true,
      minImageWidth:600,
      minImageHeight:600,
      showPoweredBy:false,
      language:'es',
      folder:'product/'+this.state.row._id+"/",
      public_id:name
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if(photos.event === 'success'){
          var rowTmp = this.state.row;
          rowTmp.images.push({url:photos.info.public_id,title:"",alt:""});
          localStorage.setItem('images',JSON.stringify(rowTmp.images));
          this.setState({rowTmp});
        }
      } else {
        console.log(error);
      }
    })
  }

  removeImage(url){
    var row = this.state.row;
    var tmpImages = [];
    row.images.forEach(val => { 
      if(url != val.url) tmpImages.push(val); 
    });
    row.images = tmpImages;
    this.setState({row});
    localStorage.setItem('images',JSON.stringify(tmpImages));
  }

  topImage(url){
    var row = this.state.row;
    var tmpImages = [];
    row.images.forEach(val => { 
      if(url != val.url) tmpImages.push(val); 
      else tmpImages.unshift(val); 
    });
    row.images = tmpImages;
    this.setState({row});
    localStorage.setItem('images',JSON.stringify(tmpImages));
  }

  render() {
    return (
      <Row>
        <ToastContainer position="top-right" autoClose={9000} style={{zIndex:"1999"}}/>
        <Col xs="12" md="12">
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col xs="9" sm="9" md="9">Editar o Crear un nuevo producto</Col>
                    <Col xs="1" sm="1" md="1" className="float-right">
                      {this.status()}
                    </Col>
                    <Col xs="2" sm="2" md="2">
                      <Button size="sm" style={{fontSize:"medium"}} onClick={this.saveProduct.bind(this)} block className="float-right btn btn-success active">
                        Guardar Producto
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                        <i className="icon-note"></i> <span> Descripción</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '2' })}  onClick={() => { this.toggle('2'); }} >
                        <i className="icon-wallet"></i> <span> Precio </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }} >
                        <i className="icon-picture"></i> <span> Imagenes y Videos</span>
                      </NavLink>
                    </NavItem>
                    <Col className="float-right" style={{textAlign:"right"}}><span style={{fontWeight:"bold"}}>Margen Minimo:</span> {this.state.margCatMin}%</Col>
                    <Col className="float-right" style={{textAlign:"right"}}><span style={{fontWeight:"bold"}}>SKU Tienda:</span> {this.state.row.sku.toUpperCase()}</Col>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col>
                          <Label>Codigo (EAN, SKU, UPC): </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-barcode"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="code" placeholder="Ingrese el código" required defaultValue={this.state.row.code} onChange={this.changeInputs.bind(this,"code")}/>
                          </InputGroup>
                        </Col>
                        <Col>
                          <Label>Referencia</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-map-pin"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="reference" placeholder="Ingrese la referencia" defaultValue={this.state.row.reference} onChange={this.changeInputs.bind(this,"reference")}/>
                          </InputGroup>
                        </Col>
                        <Col className="pb-4">
                          <Row>
                            <Col xs="12" sm="12" md="12">
                              <Label>Inventario:</Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-map-pin"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="stock" placeholder="Ingrese el número de unidades" defaultValue={this.state.row.stock} onChange={this.changeInputs.bind(this,"stock")}/>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="pb-3">
                        <Col>
                          <Label>Nombre: </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-edit"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="name" placeholder="Ingrese el código" required defaultValue={this.state.row.name} onChange={this.changeInputs.bind(this,"name")}/>
                          </InputGroup>
                        </Col>
                        <Col>
                          <Label>Marca: </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-cubes"></i></InputGroupText>
                            </InputGroupAddon>
                            {this.selects("brand","listBrands", this.state.row.idBrand)}
                          </InputGroup>
                        </Col>
                        <Col>
                          <Label>Vendedor: </Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText><i className="fa fa-reddit-alien"></i></InputGroupText>
                            </InputGroupAddon>
                            {this.selectRolSupplier()}
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="8" sm="8" md="8">
                          <Label>Categorias: </Label>
                          <Card>
                            <Row style={{padding:"10px"}}>
                              {this.categories()}
                            </Row>
                          </Card>
                        </Col>
                        <Col xs="4" sm="4" md="4">
                          <Row className="pb-2"> 
                            <Col xs="12" sm="12" md="12"><Label>Tamaño Producto - (Ancho X Alto X Profundo X Peso)</Label></Col>
                            <Col>
                              <Input type="Number" id="widthP" placeholder="Ancho" defaultValue={this.state.row.dimensions.width} onChange={this.changeInputs.bind(this,"widthP")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="heigthP" placeholder="Alto" defaultValue={this.state.row.dimensions.heigth} onChange={this.changeInputs.bind(this,"heigthP")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="deepP" placeholder="Profundo" defaultValue={this.state.row.dimensions.deep} onChange={this.changeInputs.bind(this,"deepP")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="weightP" placeholder="Peso" defaultValue={this.state.row.dimensions.weight} onChange={this.changeInputs.bind(this,"weightP")}/>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" sm="12" md="12"><Label>Tamaño Empaque  -  (Ancho X Alto X Profundo X Peso)  </Label></Col>
                            <Col>
                              <Input type="Number" id="widthB" placeholder="Ancho" defaultValue={this.state.row.bDimensions.width} onChange={this.changeInputs.bind(this,"widthB")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="heigthB" placeholder="Alto" defaultValue={this.state.row.bDimensions.heigth} onChange={this.changeInputs.bind(this,"heigthB")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="deepB" placeholder="Profundo" defaultValue={this.state.row.bDimensions.deep} onChange={this.changeInputs.bind(this,"deepB")}/>
                            </Col>
                            <Col>
                              <Input type="Number" id="weightB" placeholder="Peso" defaultValue={this.state.row.bDimensions.weight} onChange={this.changeInputs.bind(this,"weightB")}/>
                            </Col>
                          </Row>
                        </Col>
                        {/*<Col>SEO</Col>*/}
                       </Row>
                      <Row className="pb-4">
                        <Col xs="6" sm="6" md="6">
                          <Label>Descripción Corta:</Label>
                          <ReactQuill value={this.state.row.sDescription} modules={this.editor}  onChange={this.sDescription}/>
                        </Col>
                        <Col xs="6" sm="6" md="6">
                          <Label>Descripción Larga:</Label>
                          <ReactQuill value={this.state.row.description} modules={this.editor} onChange={this.description} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="3" sm="3" md="3">
                          <Label>Dolar Referencia:</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                          </InputGroupAddon>
                            <Input type="text" id="dollar" placeholder="Ingrese la referencia" defaultValue={this.state.row.dollar} onChange={this.changeInputs.bind(this,"dollar")}/>
                          </InputGroup>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="2">
                      <Row>
                        <Col xs="9" sm="9" md="9">
                          <Row>
                          <Col xs="3" sm="3" md="3">
                              <Label>Impuesto: </Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-institution"></i></InputGroupText>
                                </InputGroupAddon>
                                {this.selects("tax","listTaxes", this.state.row.idTax)}
                              </InputGroup>
                            </Col>
                            <Col xs="3" sm="3" md="3" className="pb-4">
                              <Label>Precio de venta (PVP): </Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" id="pvp" placeholder="Ingrese el valor" required defaultValue={this.state.row.pvp} onChange={this.changeInputs.bind(this,"pvp")}/>
                              </InputGroup>
                            </Col>
                            <Col xs="3" sm="3" md="3" className="pb-4">
                              <Label>Costo + Iva: </Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" id="cost" placeholder="Ingrese el costo" required defaultValue={this.state.row.cost} onChange={this.changeInputs.bind(this,"cost")}/>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs="3" sm="3" md="3">
                          <Card className="p-2" style={{border:"2px solid #444d58", backgroundColor:"#eff3f8"}}>
                            <Col>
                              <Row>
                                <Col style={{fontWeight:"bold"}}>PVP:</Col>
                                <Col style={{textAlign:"right", fontWeight:"bold"}}><CurrencyFormat value={this.state.row.pvp} displayType={'text'} thousandSeparator={true} decimalSeparator={"."}  prefix={'$'} renderText={value => value} /></Col>
                              </Row> 
                            </Col>
                            <Col> 
                              <Row>
                                <Col style={{fontWeight:"bold"}}>Impuestos:</Col>
                                <Col style={{textAlign:"right"}}>( {this.state.tax}% ) <CurrencyFormat value={this.state.totalTax} displayType={'text'} thousandSeparator={true} decimalSeparator={"."}  prefix={'$'} renderText={value => value} /></Col>
                              </Row>
                            </Col>
                            <Col> 
                              <Row>
                                <Col style={{fontWeight:"bold"}}>Comisión:</Col>
                                <Col style={{textAlign:"right"}}>({this.state.margin}% ) <CurrencyFormat value={this.state.marginValue} displayType={'text'} thousandSeparator={true} decimalSeparator={"."}  prefix={'$'} renderText={value => value} /></Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col style={{fontWeight:"bold"}}>Pago+Iva:</Col>
                                <Col style={{textAlign:"right", fontWeight:"bold"}}><CurrencyFormat value={this.state.row.cost} displayType={'text'} thousandSeparator={true} decimalSeparator={"."}  prefix={'$'} renderText={value => value} /></Col>
                              </Row>
                            </Col>
                          </Card>
                        </Col>  
                      </Row>
                      <Row>
                        <Col xs="12" sm="12" md="12">
                          <Row>
                            <Col xs="12" sm="12" md="12" className="pb-2">
                              <Row>
                                <Col xs="12" sm="12" md="12" className="pb-2">
                                  <CardHeader>
                                    <b>Gestión de Descuentos por Producto</b>
                                  </CardHeader>
                                </Col>
                                <Col>Aplicar descuento a tiendas:</Col>
                              </Row>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-shopping-bag"></i></InputGroupText>
                                </InputGroupAddon>
                                <Select 
                                name="stores" 
                                value={this.state.selectStores} 
                                options={this.state.arrayStores} 
                                onChange={this.addStore} multi />
                              </InputGroup>
                            </Col>
                            <Col xs="6" sm="6" md="6">
                              <Label>Fecha Promoción: </Label>
                              <Card>
                                <InputGroup id="datePicker">
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <DateRangePicker
                                              startDate={this.state.startDate}
                                              endDate={this.state.endDate}
                                              startDateId="startDate"
                                              endDateId="endDate"
                                              onDatesChange={this.addDatePicker}
                                              focusedInput={this.state.focusedInput}
                                              onFocusChange={this.onFocusChange}
                                              orientation={this.state.orientation}
                                              openDirection={this.state.openDirection}
                                              startDatePlaceholderText="Fecha Inicial"
                                              endDatePlaceholderText="Fecha Final"
                                              small={true}
                                              regular={true}
                                              block={true}
                                              noBorder={true}
                                            />
                                          </InputGroup>
                              </Card>
                            </Col>
                            <Col xs="3" sm="3" md="3">
                              <Label>$ Descuento: </Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" key="valueD" id="valueD" placeholder="Ingrese el valor" required defaultValue={this.setDiscountVal()} onChange={this.addDiscountVal.bind(this)}/>
                              </InputGroup>
                            </Col>
                            <Col xs="3" sm="3" md="3">
                              <Label>Costo Descuento + Iva: </Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" key="costDiscount" id="costDiscount" placeholder="Ingrese el costo" defaultValue={this.setDiscountCost()} required onChange={this.addDiscountCost.bind(this)}/>
                              </InputGroup>
                            </Col>
                            <Col xs="2" sm="2" md="2" style={{display: "flex"}}>
                              <Label>Es Bono: </Label>
                              <AppSwitch id="bonus" className={'mx-1'} variant={'pill'} color={'success'} label checked={this.state.checkBonus} />
                            </Col>
                            <Col xs="3" sm="3" md="3" className="pb-3">
                              <Button active block color="success" aria-pressed="true" onClick={this.addDiscountTable.bind(this)}>+ Guardar Descuento</Button>
                            </Col>

                            <Col xs="12" sm="12" md="12">
                              {this.htmlDiscountTable()}
                            </Col>

                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>                     
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="3">
                      <CloudinaryContext cloudName={this.props.userdate.cloudName} uploadPreset={this.props.userdate.uploadPreset}>
                        <Button onClick={this.beginUpload.bind(this)} size="sm" className="btn btn-success active">
                          + Cargar Imagen
                        </Button>
                        <br/><br/>
                        <Card>
                          <Col>
                            <Row>
                              { this.state.row.images.map(i => 
                              <Col key={"img"+i.url} xs="2" sm="2" md="2">
                                <Image publicId={i.url} >
                                  <Transformation width="208" crop="scale" />
                                    </Image>
                                      <Button style={{position:"absolute", marginTop:"-30px"}} onClick={this.removeImage.bind(this, i.url)} size="sm" className="btn btn-danger active">
                                        Eliminar
                                      </Button>
                                      <Button size="sm" style={{position:"inherit", marginTop:"-30px"}} onClick={this.topImage.bind(this, i.url)} className="float-right btn btn-success active">
                                        Principal
                                      </Button>
                              </Col>
                              )}
                            </Row>
                          </Col>
                        </Card>
                        <Modal isOpen={this.state.loader} className={'modal-lg'}>
                          <div style={{position:"inherit",top:"300px"}}><CommonLoading size="large"/></div>
                        </Modal>
                      </CloudinaryContext>
                    </TabPane>
                  </TabContent>                              
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
    obj:state.DaoProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReducer: (type, colletion, body, callFunction) => {
      DbCrud.dbMLoad(dispatch, type, colletion, body, "PUT", callFunction);
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Eidts);
