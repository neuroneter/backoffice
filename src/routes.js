import React from 'react';
import Loadable from 'react-loadable'

import CodeEditors from './views/Editors/CodeEditors'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Compose = Loadable({
  loader: () => import('./views/Apps/Email/Compose'),
  loading: Loading,
});

const ProductsList = Loadable({
  loader: () => import('./views/Owner/Products/List'),
  loading: Loading,
});

const GlobalEdit = Loadable({
  loader: () => import('./views/Owner/Stores/Admin/Edit'),
  loading: Loading,
});


const StoresList = Loadable({
  loader: () => import('./views/Owner/Stores/List'),
  loading: Loading,
});

const StoresEdit = Loadable({
  loader: () => import('./views/Owner/Stores/Edit'),
  loading: Loading,
});

const ProductsAttributes = Loadable({
  loader: () => import('./views/Owner/Products/Attributes'),
  loading: Loading,
});

const ProductsEdit = Loadable({
  loader: () => import('./views/Owner/Products/Edit'),
  loading: Loading,
});

const OrdersList = Loadable({
  loader: () => import('./views/Owner/Orders/List'),
  loading: Loading,
});

const OrdersAssigned = Loadable({
  loader: () => import('./views/Owner/Orders/Assigned'),
  loading: Loading,
});

const OrdersLogistic = Loadable({
  loader: () => import('./views/Owner/Orders/Logistic'),
  loading: Loading,
});

const OrdersEdit = Loadable({
  loader: () => import('./views/Owner/Orders/Edit'),
  loading: Loading,
});

const CountriesList = Loadable({
  loader: () => import('./views/Owner/Geo/CountriesList'),
  loading: Loading,
});

const CountriesAdd = Loadable({
  loader: () => import('./views/Owner/Geo/CountriesAdd'),
  loading: Loading,
});

const StatesAdd = Loadable({
  loader: () => import('./views/Owner/Geo/StatesAdd'),
  loading: Loading,
});

const StatesList = Loadable({
  loader: () => import('./views/Owner/Geo/StatesList'),
  loading: Loading,
});

const CitiesList = Loadable({
  loader: () => import('./views/Owner/Geo/CitiesList'),
  loading: Loading,
});

const Inbox = Loadable({
  loader: () => import('./views/Apps/Email/Inbox'),
  loading: Loading,
});

const Message = Loadable({
  loader: () => import('./views/Apps/Email/Message'),
  loading: Loading,
});

const Invoice = Loadable({
  loader: () => import('./views/Apps/Invoicing/Invoice'),
  loading: Loading,
});

const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import('./views/Base/Cards'),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import('./views/Base/Carousels'),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import('./views/Base/Collapses'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import('./views/Base/Jumbotrons'),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import('./views/Base/ListGroups'),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import('./views/Base/Navbars'),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import('./views/Base/Navs'),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import('./views/Base/Paginations'),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import('./views/Base/Popovers'),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import('./views/Base/ProgressBar'),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import('./views/Base/Switches'),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import('./views/Base/Tabs'),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import('./views/Base/Tooltips'),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import('./views/Buttons/BrandButtons'),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import('./views/Buttons/ButtonDropdowns'),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import('./views/Buttons/ButtonGroups'),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import('./views/Buttons/Buttons'),
  loading: Loading,
});

const LoadingButtons = Loadable({
  loader: () => import('./views/Buttons/LoadingButtons'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const MyAccount = Loadable({
  loader: () => import('./views/Owner/MyAccount'),
  loading: Loading,
});

// issue with mispalced position of cm value for acync load
// const CodeEditors = Loadable({
//   loader: () => import('./views/Editors/CodeEditors'),
//   loading: Loading,
// });

const TextEditors = Loadable({
  loader: () => import('./views/Editors/TextEditors'),
  loading: Loading,
});

const AdvancedForms = Loadable({
  loader: () => import('./views/Forms/AdvancedForms'),
  loading: Loading,
});

const BasicForms = Loadable({
  loader: () => import('./views/Forms/BasicForms'),
  loading: Loading,
});

const ValidationForms = Loadable({
  loader: () => import('./views/Forms/ValidationForms'),
  loading: Loading,
});

const GoogleMaps = Loadable({
  loader: () => import('./views/GoogleMaps'),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import('./views/Icons/CoreUIIcons'),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import('./views/Icons/Flags'),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import('./views/Icons/FontAwesome'),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import('./views/Icons/SimpleLineIcons'),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import('./views/Notifications/Alerts'),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import('./views/Notifications/Badges'),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Toastr = Loadable({
  loader: () => import('./views/Notifications/Toastr'),
  loading: Loading,
});

const Calendar = Loadable({
  loader: () => import('./views/Plugins/Calendar'),
  loading: Loading,
});

const Draggable = Loadable({
  loader: () => import('./views/Plugins/Draggable'),
  loading: Loading,
});

const Spinners = Loadable({
  loader: () => import('./views/Plugins/Spinners'),
  loading: Loading,
});

const DataTable = Loadable({
  loader: () => import('./views/Tables/DataTable'),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import('./views/Tables/Tables'),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import('./views/Theme/Colors'),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
}); 

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [ 
  { path: '/Global',  name: 'Configuración Global', component: GlobalEdit, rol:[1,2,3]},
  { path: '/Stores/List',  name: 'Tiendas', component: StoresList, rol:[1,2,3]},
  { path: '/Stores/Edit/:Id',  name: 'Tiendas > Editar', component: StoresEdit, rol:[1,2,3]},
  { path: '/Products/List',  name: 'Logistica', component: ProductsList, rol:[1,2,3,4]},
  { path: '/Products/Attributes',  name: 'Logistica', component: ProductsAttributes, rol:[1,2]},
  { path: '/Products/Edit/',  name: 'Producto', component: ProductsEdit, rol:[1,2,3,4]},
  { path: '/Products/Edit/:Code/:Reference/:Id',  name: 'Producto', component: ProductsEdit, rol:[1,2,4]},
  { path: '/Orders/Logistic',  name: 'Logistica', component: OrdersLogistic, rol:[1,2]},
  { path: '/Orders/Edit/:Order/:Reference',  name: 'Ordenes', component: OrdersEdit, rol:[1,2]},
  { path: '/Orders/List', name: 'Lista', component: OrdersList, rol:[1,2] },
  { path: '/Orders/Assigned', name: 'Asignados', component: OrdersAssigned, rol:[1,2] },
  { path: '/Geo/CountriesList', name: 'Pais', component: CountriesList,rol:[1] },
  { path: '/Geo/CountriesAdd', name: 'Crear Pais', component: CountriesAdd, rol:[1] },
  { path: '/Geo/StatesList/:documentId', name: 'Pais > Estados', component: StatesList, rol:[1] },
  { path: '/Geo/StatesAdd/:documentId', name: 'Crear Estado', component: StatesAdd, rol:[1] },
  { path: '/Geo/CitiesList/:documentId/:Code', name: 'Pais > Estados > Ciudades', component: CitiesList, rol:[1] },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, rol:[1] },
  { path: '/theme', name: 'Theme', component: Colors, exact: true, rol:[1] },
  { path: '/theme/colors', name: 'Colors', component: Colors, rol:[1] },
  { path: '/theme/typography', name: 'Typography', component: Typography, rol:[1] },
  { path: '/base', name: 'Base', component: Cards, exact: true, rol:[1] },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs, rol:[1] },
  { path: '/base/cards', name: 'Cards', component: Cards, rol:[1] },
  { path: '/base/carousels', name: 'Carousel', component: Carousels, rol:[1] },
  { path: '/base/collapses', name: 'Collapse', component: Collapses , rol:[1] },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns,  rol:[1] },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons, rol:[1] },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups, rol:[1] },
  { path: '/base/navbars', name: 'Navbars', component: Navbars, rol:[1] },
  { path: '/base/navs', name: 'Navs', component: Navs, rol:[1] },
  { path: '/base/paginations', name: 'Paginations', component: Paginations, rol:[1] },
  { path: '/base/popovers', name: 'Popovers', component: Popovers, rol:[1] },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar, rol:[1] },
  { path: '/base/switches', name: 'Switches', component: Switches, rol:[1]},
  { path: '/base/tabs', name: 'Tabs', component: Tabs, rol:[1] },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips, rol:[1] },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true, rol:[1] },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons, rol:[1] },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns, rol:[1] },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups, rol:[1] },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons, rol:[1] },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', component: LoadingButtons, rol:[1] },
  { path: '/charts', name: 'Charts', component: Charts, rol:[1] },
  { path: '/editors', name: 'Editors', component: CodeEditors, exact: true, rol:[1] },
  { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors, rol:[1] },
  { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors, rol:[1] },
  { path: '/forms', name: 'Forms', component: BasicForms, exact: true, rol:[1] },
  { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms, rol:[1] },
  { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms, rol:[1] },
  { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms, rol:[1] },
  { path: '/google-maps', name: 'Google Maps', component: GoogleMaps, rol:[1] },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons, rol:[1] },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons, rol:[1] },
  { path: '/icons/flags', name: 'Flags', component: Flags, rol:[1] },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome, rol:[1] },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons, rol:[1] },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true, rol:[1]},
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts, rol:[1] },
  { path: '/notifications/badges', name: 'Badges', component: Badges, rol:[1] },
  { path: '/notifications/modals', name: 'Modals', component: Modals, rol:[1] },
  { path: '/notifications/toastr', name: 'Toastr', component: Toastr, rol:[1] },
  { path: '/plugins', name: 'Plugins', component: Calendar, exact: true, rol:[1] },
  { path: '/plugins/calendar', name: 'Calendar', component: Calendar,rol:[1] },
  { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable, rol:[1] },
  { path: '/plugins/spinners', name: 'Spinners', component: Spinners, rol:[1] },
  { path: '/tables', name: 'Tables', component: Tables, exact: true, rol:[1] },
  { path: '/tables/data-table', name: 'Data Table', component: DataTable, rol:[1] },
  { path: '/tables/tables', name: 'Tables', component: Tables, rol:[1] },
  { path: '/widgets', name: 'Widgets', component: Widgets, rol:[1] },
  { path: '/apps', name: 'Apps', component: Compose, exact: true, rol:[1] },
  { path: '/apps/email', name: 'Email', component: Compose, exact: true, rol:[1] },
  { path: '/apps/email/compose', name: 'Compose', component: Compose, rol:[1] },
  { path: '/apps/email/inbox', name: 'Inbox', component: Inbox, rol:[1] },
  { path: '/apps/email/message', name: 'Message', component: Message, rol:[1]},
  { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true, rol:[1]},
  { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice, rol:[1]},
  { path: '/users', exact: true,  name: 'Users', component: Users, rol:[1] },
  { path: '/users/:id', exact: true, name: 'User Details', component: User, rol:[1] }
];

export default routes;
