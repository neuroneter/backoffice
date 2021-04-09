import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware";
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from '../views/Pages/Login/Login';
import DaoLogin from './DaoLogin';
import DaoMyAccount from './DaoMyAcoount';
import DaoGeo from './DaoGeo';
import DaoOrders from './DaoOrders';
import DaoProducts from './DaoProducts';
import DaoStores from './DaoStores';
import DaoCombinations from './DaoCombinations';
import firebase from '../Actions/Firebase.js';
import 'firebase/firestore';

import {AppAside, AppBreadcrumb, AppFooter, AppHeader, AppSidebar, AppSidebarFooter,
  AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppSidebarNav,} from '@coreui/react';

// sidebar nav config
import navigation from '../_nav';
// routes config
import routes from '../routes';

import DefaultAside from '../containers/DefaultLayout/DefaultAside';
import DefaultFooter from '../containers/DefaultLayout/DefaultFooter';
import DefaultHeader from '../containers/DefaultLayout/DefaultHeader';

//Utilizamos el combineReducers con el fin de administrar los estados, de esta manera cada estado tiene asociado  
//una funcion que se encargara de su adminsitración 
const reducer = combineReducers({
    login: DaoLogin.reducerLogin,
    MyAccount: DaoMyAccount.MyAccount,
    DaoGeo: DaoGeo.Geo,
    DaoCombinations: DaoCombinations.Combinations,
    DaoOrders: DaoGeo.Geo,
    DaoOrders: DaoOrders.Orders,
    DaoProducts: DaoProducts.Products,
    DaoStores: DaoStores.Stores,
});

//Donde almacenamos nuestro estado
const store = createStore(reducer, applyMiddleware(thunk, promise));

function DaoIni(props) {
    const userdate= props.userdate;
    var TmpItems = [];
    navigation["items"].forEach((val, inav) => {
        val.rol.forEach((valrol, irol) => {
            if(valrol == props.userdate.rol){
                try{
                    var TmpCild = [];
                    val.children.forEach((childVal, iChild) => {
                        childVal.rol.forEach((childRol, iRol) => {
                            if(childRol == props.userdate.rol){
                                TmpCild.push(childVal);
                            }
                        });
                    });

                }catch(e){}
                val.children = TmpCild;
                TmpItems.push(val);
            } 
        })
    })
    TmpItems = {items:TmpItems}

    return (
        <div className="app">
             <AppHeader fixed>
                <DefaultHeader />
             </AppHeader>
                 <div className="app-body">
             <AppSidebar fixed display="lg">
                 <AppSidebarHeader />
                 <AppSidebarForm />
                 <AppSidebarNav navConfig={TmpItems} {...props} userdate={userdate} />
                 
                 <AppSidebarFooter />
                 <AppSidebarMinimizer />
             </AppSidebar>
             <main className="main">
                 <AppBreadcrumb appRoutes={routes}/>
                 <Container fluid>
                 <Switch>
                     {routes.map(
                       (route, idx) => {
                        var flag = false;
                        route.rol.forEach((valrol, i) => {
                            if(valrol == props.userdate.rol) flag = true;
                        });

                        return (route.component && flag) ? (
                            <Route 
                                key={idx} 
                                path={route.path} 
                                exact={route.exact} 
                                name={route.name}
                                render={props => (<route.component {...props} userdate={userdate} />)} 
                        />)
                        : (null);
                     },
                     )}
                 </Switch>
                 </Container>
             </main>
             <AppAside fixed>
                 <DefaultAside />
             </AppAside>
             </div>
                 <AppFooter>
             <DefaultFooter />
             </AppFooter>
        </div>
    )
}

class Dao extends Component {

  constructor(props){
        super(props);
        this.state = {
            _id:"",
            name:"",
            unit:[],
            email:"",
            phone:"",
            idSupplier:"",
            cloudName:'dotcom-group-sas',
            uploadPreset:'bobSeller',
            urlImgProduct:'https://res.cloudinary.com/dotcom-group-sas/image/upload/',
            rol:0
        }
  }

  componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if(window.location.hash ==  "#/login" || window.location.hash ==  "#/" ) window.location = "#/dashboard";
                document.getElementById('root').style.visibility = 'visible';
                const emailUser = {
                    email:user.email
                };
                //user.email
                var UrlServerless = "https://us-central1-serverless-278902.cloudfunctions.net/serverless/users/find";
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(emailUser)
                };
                fetch(UrlServerless,requestOptions)
                .then(data => data.json())
                .then(data => {
                    this.setState(
                        {
                            _id:data[0]._id,
                            name:data[0].name,
                            unit:data[0].unit,
                            uid:user.uid,
                            email:user.email,
                            phone:data[0].phone,
                            idSupplier:data[0].idSupplier,
                            rol:data[0].rol
                        }
                    )
                })
                .catch(function (error) {console.log("Error cargando datos " + error);}); 
            } else {
                if(window.location.hash !=  "#/login" || window.location.hash ==  "#/") window.location = "#/login";
                document.getElementById('root').style.visibility = 'visible';
            }
        });
  }

  render() {
    if(window.location.hash == "#/login"){
        if(this.state.email == ""){
            return(
                <Provider store={store}>
                    <Switch>
                        <Route name="Login Page" component={Login} />
                    </Switch>
                </Provider>
            )
        }else{
            window.location = "#/dashboard";
        }
    }else{
        if(this.state.email == ""){
            return (<div>Cargando...</div>)
        }else{
            var userdate = this.state;
            
            return (
                <Provider store={store} >
                    <DaoIni {...this.props} userdate={userdate} />
                </Provider>
            )
        }
    }
  }
}

export default Dao;