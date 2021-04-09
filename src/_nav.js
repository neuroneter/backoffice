export default {
  items: [
    {
      name: 'Tablero',
      url: '/dashboard',
      icon: 'icon-speedometer',
      rol: [1],
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Ordenes',
      url: '/owner',
      icon: 'icon-puzzle',
      rol: [1,2,3,4,5],
      children: [
        {
          name: 'Listado',
          url: '/Orders/List',
          icon: 'icon-layers',
          rol: [1,2,3]
        },
        {
          name: 'Asignadas',
          url: '/Orders/Assigned',
          icon: 'icon-basket-loaded',
          rol: [1,2,3]
        },{
          name: 'Logistica',
          url: '/Orders/Logistic',
          icon: 'icon-plane',
          rol: [1,2,3]
        }
      ],
    },
    {
      name: 'Productos',
      url: '/owner',
      icon: 'icon-present',
      rol: [1,2,4],
      children: [
        {
          name: 'Listado',
          url: '/Products/List',
          icon: 'icon-layers',
          rol: [1,2,4]
        },
        {
          name: 'Combinaciones',
          url: '/Products/Attributes',
          icon: 'icon-list',
          rol: [1,2]
        }
      ],
    },
    {
      name: 'Tiendas',
      url: '/owner',
      icon: 'icon-briefcase',
      rol: [1,2,3],
      children: [
        {
          name: 'Global',
          url: '/Global',
          icon: 'icon-settings',
          rol: [1,2,3],
        },
        {
          name: 'Listado',
          url: '/Stores/List',
          icon: 'icon-briefcase',
          rol: [1,2,3],
        }

      ]
    },
    {
      name: 'Geo',
      url: '/owner',
      icon: 'icon-puzzle',
      rol: [1],
      children: [
        {
          name: 'GEO',
          url: '/Geo/CountriesList',
          icon: 'icon-location-pin',
        },
        {
          name: 'Compañias',
          url: '/base/cards',
          icon: 'icon-briefcase',
        },
      ],
    },
    {
      title: true,
      name: 'Theme',
      rol: [1],
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
      rol: [1]
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
      rol: [1]
    },
    {
      title: true,
      name: 'Components',
      rol: [1],
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      rol: [1],
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Carousel',
          url: '/base/carousels',
          icon: 'icon-puzzle',
          rol: [1]
        },
        {
          name: 'Collapse',
          url: '/base/collapses',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'List group',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
          rol: [1],
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
          rol: [1],
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      rol: [1],
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
          rol: [1],
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
          rol: [1],
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
          rol: [1],
        },
        { 
          name: 'Dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
          rol: [1],
        },
        {
          name: 'Loading Buttons',
          url: '/buttons/loading-buttons',
          icon: 'icon-cursor',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO',
          },
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
      rol: [1]
    },
    {
      name: 'Editors',
      url: '/editors',
      icon: 'fa fa-code',
      rol: [1],
      children: [
        {
          name: 'Code Editors',
          url: '/editors/code-editors',
          icon: 'fa fa-code',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO',
          },
        },
        {
          name: 'Text Editors',
          url: '/editors/text-editors',
          icon: 'icon-note',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO',
          },
        }
      ]
    },
    {
      name: 'Forms',
      url: '/forms',
      icon: 'icon-note',
      rol: [1],
      children: [
        {
          name: 'Basic Forms',
          url: '/forms/basic-forms',
          icon: 'icon-note',
          rol: [1],
        },
        {
          name: 'Advanced Forms',
          url: '/forms/advanced-forms',
          icon: 'icon-note',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Validation',
          url: '/forms/validation-forms',
          icon: 'icon-note',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
    },
    {
      name: 'Google Maps',
      url: '/google-maps',
      icon: 'icon-map',
      rol: [1],
      badge: {
        variant: 'danger',
        text: 'PRO'
      }
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      rol: [1],
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          rol: [1],
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
          rol: [1],
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          rol: [1],
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
          rol: [1],
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      rol: [1],
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
          rol: [1],
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
          rol: [1],
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
          rol: [1],
        },
        {
          name: 'Toastr',
          url: '/notifications/toastr',
          icon: 'icon-bell',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
    },
    {
      name: 'Plugins',
      url: '/plugins',
      icon: 'icon-energy',
      rol: [1],
      children: [
        {
          name: 'Calendar',
          url: '/plugins/calendar',
          icon: 'icon-calendar',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Draggable',
          url: '/plugins/draggable',
          icon: 'icon-cursor-move',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Spinners',
          url: '/plugins/spinners',
          icon: 'fa fa-spinner',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
        },
    {
      name: 'Tables',
      url: '/tables',
      icon: 'icon-list',
      rol: [1],
      children: [
        {
          name: 'Data Table',
          url: '/tables/data-table',
          icon: 'icon-list',
          rol: [1],
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Tables',
          url: '/tables/tables',
          icon: 'icon-list',
          rol: [1],
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      rol: [1],
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
      rol: [1]
    },
    {
      title: true,
      name: 'Extras',
      rol: [1],
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      rol: [1],
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
          rol: [1],
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
          rol: [1],
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
          rol: [1],
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
          rol: [1],
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      rol: [1],
      badge: {
        variant: 'secondary',
        text: 'NEW',
      },
      attributes: { disabled: true },
    },
    {
      name: 'Apps',
      url: '/apps',
      icon: 'icon-layers',
      rol: [1],
      children: [
        {
          name: 'Invoicing',
          url: '/apps/invoicing',
          icon: 'icon-speech',
          rol: [1],
          children: [
            {
              name: 'Invoice',
              url: '/apps/invoicing/invoice',
              icon: 'icon-speech',
              rol: [1],
              badge: {
                variant: 'danger',
                text: 'PRO'
              }
            }
          ]
        },
        {
          name: 'Email',
          url: '/apps/email',
          icon: 'icon-speech',
          children: [
            {
              name: 'Inbox',
              url: '/apps/email/inbox',
              icon: 'icon-speech',
              rol: [1],
              badge: {
                variant: 'danger',
                text: 'PRO',
              },
            },
            {
              name: 'Message',
              url: '/apps/email/message',
              icon: 'icon-speech',
              rol: [1],
              badge: {
                variant: 'danger',
                text: 'PRO',
              },
            },
            {
              name: 'Compose',
              url: '/apps/email/compose',
              icon: 'icon-speech',
              rol: [1],
              badge: {
                variant: 'danger',
                text: 'PRO',
              },
            },
          ],
        },
      ]
    },
    {
      divider: true,
      class: 'm-2',
      rol: [1]
    },
    {
      title: true,
      name: 'Labels',
      rol: [1]
    },
    {
      name: 'Label danger',
      url: '',
      icon: 'fa fa-circle',
      rol: [1],
      label: {
        variant: 'danger'
      },
    },
    {
      name: 'Label info',
      url: '',
      icon: 'fa fa-circle',
      rol: [1],
      label: {
        variant: 'info'
      }
    },
    {
      name: 'Label warning',
      url: '',
      icon: 'fa fa-circle',
      rol: [1],
      label: {
        variant: 'warning'
      }
    },
  ]
};
