(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1314:function(e,t,r){"use strict";r.r(t);var o=r(7),n=r(8),a=r(11),i=r(9),u=r(10),f=r(40),c=r(1),d=r.n(c),m=r(320),s=r(2),l=(r(706),function(e){function t(e){var r;return Object(o.a)(this,t),r=Object(a.a)(this,Object(i.a)(t).call(this,e)),void 0==e.location.documentId&&(r.documentId=r.props.match.params.documentId),e.location.documentId?console.log(r.props.obj):r.props.history.push("/Geo/CountriesList"),r}return Object(u.a)(t,e),Object(n.a)(t,[{key:"callList",value:function(){this.props.history.push("/Geo/CountriesList")}},{key:"callSave",value:function(e){e.preventDefault(),this.state.documentId?(this.props.update("updateGeo","geo","CountriesList",this,this.state.documentId),this.props.history.push("/Geo/CountriesList")):(this.props.create("addGeo","geo","CountriesList",this),this.props.history.push("/Geo/CountriesList"))}},{key:"render",value:function(){return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement(s.ib,null,"dfg"))}}]),t}(c.Component));t.default=Object(f.b)(function(e){return{email:e.login.email,password:e.login.password,obj:e.MyAccount}},function(e){return{create:function(t,r,o,n){m.a.dbCreate(e,t,r,o,n)},update:function(t,r,o,n,a){m.a.dbUpdate(e,t,r,o,n,a)}}})(l)},320:function(e,t,r){"use strict";var o=r(31),n=r(325),a=o.a.firestore(),i="https://us-central1-serverless-278902.cloudfunctions.net/serverless";function u(e){var t=e.refs,r={},n=0,a=0,i="";for(var u in t)i=document.getElementById(u).value,"latitude"==t[u].props.format?n=parseFloat(i):"longitude"==t[u].props.format?a=parseFloat(i):r[u]=i;return 0!=n&&0!=a&&(r.geopoint=new o.a.firestore.GeoPoint(n,a)),r}var f={dbMLoad:function(e,t,r,o){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"POST",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(){},u=i+"/"+r,f={};"GET"!==n&&(f={method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),console.log(u),console.log(f),fetch(u,f).then(function(e){return e.json()}).then(function(r){r.body=o,e({type:t,data:r}),a(r)}).catch(function(e){console.log("Error cargando datos "+e)})},dbFindRegister:function(e,t,r,o,n){a.collection(r).where(o,"==",n).get().then(function(r){r.forEach(function(r){e({type:t,data:r.data()})})}).catch(function(e){console.log("Error getting documents: "+e)})},dbFindColletion:function(e,t,r){a.collection(r).get().then(function(r){e({type:t,data:r})}).catch(function(e){console.log("Error getting documents: "+e)})},dbCreate:function(e,t,r,o,i){var f=u(i);a.collection(r).add(f).then(function(r){f.documentId=r.id,e(Object(n.a)(o)),e({type:t,data:f})}).catch(function(e){console.error("Error al crear documento ",e)})},dbDelete:function(e,t,r,o,i){a.collection(r).doc(i).delete().then(function(){e(Object(n.a)(o)),e({type:t,data:i})}).catch(function(e){console.error("Error removing document: ",e)})},dbUpdate:function(e,t,r,o,i,f){var c=u(i);c.documentId=f,a.collection(r).doc(f).update(c).then(function(){e(Object(n.a)(o)),e({type:t,data:c})})},dbEditFile:function(e,t,r,o,i,u,f){var c={};c[u]=f,a.collection(r).doc(i).update(c).then(function(){e(Object(n.a)(o)),e({type:t,data:c})})}};t.a=f},325:function(e,t,r){"use strict";var o=r(364),n=r.n(o),a="@@redux-form/",i=a+"BLUR",u=a+"CHANGE",f=a+"FOCUS",c=a+"RESET",d=a+"SUBMIT",m=a+"TOUCH",s={arrayInsert:function(e,t,r,o){return{type:"@@redux-form/ARRAY_INSERT",meta:{form:e,field:t,index:r},payload:o}},arrayMove:function(e,t,r,o){return{type:"@@redux-form/ARRAY_MOVE",meta:{form:e,field:t,from:r,to:o}}},arrayPop:function(e,t){return{type:"@@redux-form/ARRAY_POP",meta:{form:e,field:t}}},arrayPush:function(e,t,r){return{type:"@@redux-form/ARRAY_PUSH",meta:{form:e,field:t},payload:r}},arrayRemove:function(e,t,r){return{type:"@@redux-form/ARRAY_REMOVE",meta:{form:e,field:t,index:r}}},arrayRemoveAll:function(e,t){return{type:"@@redux-form/ARRAY_REMOVE_ALL",meta:{form:e,field:t}}},arrayShift:function(e,t){return{type:"@@redux-form/ARRAY_SHIFT",meta:{form:e,field:t}}},arraySplice:function(e,t,r,o,n){var a={type:"@@redux-form/ARRAY_SPLICE",meta:{form:e,field:t,index:r,removeNum:o}};return void 0!==n&&(a.payload=n),a},arraySwap:function(e,t,r,o){if(r===o)throw new Error("Swap indices cannot be equal");if(r<0||o<0)throw new Error("Swap indices cannot be negative");return{type:"@@redux-form/ARRAY_SWAP",meta:{form:e,field:t,indexA:r,indexB:o}}},arrayUnshift:function(e,t,r){return{type:"@@redux-form/ARRAY_UNSHIFT",meta:{form:e,field:t},payload:r}},autofill:function(e,t,r){return{type:"@@redux-form/AUTOFILL",meta:{form:e,field:t},payload:r}},blur:function(e,t,r,o){return{type:i,meta:{form:e,field:t,touch:o},payload:r}},change:function(e,t,r,o,n){return{type:u,meta:{form:e,field:t,touch:o,persistentSubmitErrors:n},payload:r}},clearFields:function(e,t,r){for(var o=arguments.length,n=new Array(o>3?o-3:0),a=3;a<o;a++)n[a-3]=arguments[a];return{type:"@@redux-form/CLEAR_FIELDS",meta:{form:e,keepTouched:t,persistentSubmitErrors:r,fields:n}}},clearSubmit:function(e){return{type:"@@redux-form/CLEAR_SUBMIT",meta:{form:e}}},clearSubmitErrors:function(e){return{type:"@@redux-form/CLEAR_SUBMIT_ERRORS",meta:{form:e}}},clearAsyncError:function(e,t){return{type:"@@redux-form/CLEAR_ASYNC_ERROR",meta:{form:e,field:t}}},destroy:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return{type:"@@redux-form/DESTROY",meta:{form:t}}},focus:function(e,t){return{type:f,meta:{form:e,field:t}}},initialize:function(e,t,r,o){return void 0===o&&(o={}),r instanceof Object&&(o=r,r=!1),{type:"@@redux-form/INITIALIZE",meta:n()({form:e,keepDirty:r},o),payload:t}},registerField:function(e,t,r){return{type:"@@redux-form/REGISTER_FIELD",meta:{form:e},payload:{name:t,type:r}}},reset:function(e){return{type:c,meta:{form:e}}},resetSection:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return{type:"@@redux-form/RESET_SECTION",meta:{form:e,sections:r}}},startAsyncValidation:function(e,t){return{type:"@@redux-form/START_ASYNC_VALIDATION",meta:{form:e,field:t}}},startSubmit:function(e){return{type:"@@redux-form/START_SUBMIT",meta:{form:e}}},stopAsyncValidation:function(e,t){return{type:"@@redux-form/STOP_ASYNC_VALIDATION",meta:{form:e},payload:t,error:!(!t||!Object.keys(t).length)}},stopSubmit:function(e,t){return{type:"@@redux-form/STOP_SUBMIT",meta:{form:e},payload:t,error:!(!t||!Object.keys(t).length)}},submit:function(e){return{type:d,meta:{form:e}}},setSubmitFailed:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return{type:"@@redux-form/SET_SUBMIT_FAILED",meta:{form:e,fields:r},error:!0}},setSubmitSucceeded:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return{type:"@@redux-form/SET_SUBMIT_SUCCEEDED",meta:{form:e,fields:r},error:!1}},touch:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return{type:m,meta:{form:e,fields:r}}},unregisterField:function(e,t,r){return void 0===r&&(r=!0),{type:"@@redux-form/UNREGISTER_FIELD",meta:{form:e},payload:{name:t,destroyOnUnmount:r}}},untouch:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return{type:"@@redux-form/UNTOUCH",meta:{form:e,fields:r}}},updateSyncErrors:function(e,t,r){return void 0===t&&(t={}),{type:"@@redux-form/UPDATE_SYNC_ERRORS",meta:{form:e},payload:{syncErrors:t,error:r}}},updateSyncWarnings:function(e,t,r){return void 0===t&&(t={}),{type:"@@redux-form/UPDATE_SYNC_WARNINGS",meta:{form:e},payload:{syncWarnings:t,warning:r}}}};r.d(t,"a",function(){return l});var l=s.reset},364:function(e,t){function r(){return e.exports=r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},r.apply(this,arguments)}e.exports=r}}]);
//# sourceMappingURL=32.221f50bf.chunk.js.map