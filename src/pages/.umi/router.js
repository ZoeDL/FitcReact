import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


const routes = [
  {
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/wxlogin",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/wxlogin' })
      },
      {
        "path": "/user_manual",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/user_manual' })
      },
      {
        "path": "/userinfo_modify_phone",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/userinfo_modify_phone' })
      },
      {
        "path": "/userinfo_modify_name",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/userinfo_modify_name' })
      },
      {
        "path": "/userinfo",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/userinfo' })
      },
      {
        "path": "/transfer_notes",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/transfer_notes' })
      },
      {
        "path": "/transfer",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/transfer' })
      },
      {
        "path": "/trade_party_select",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/trade_party_select' })
      },
      {
        "path": "/trade_party_search",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/trade_party_search' })
      },
      {
        "path": "/trade_party_add",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/trade_party_add' })
      },
      {
        "path": "/trade_history",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/trade_history' })
      },
      {
        "path": "/ticket_record",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/ticket_record' })
      },
      {
        "path": "/ticket_entering",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/ticket_entering' })
      },
      {
        "path": "/ticket_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/ticket_details' })
      },
      {
        "path": "/setting",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/setting' })
      },
      {
        "path": "/select_notes",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/select_notes' })
      },
      {
        "path": "/search_company",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/search_company' })
      },
      {
        "path": "/search_bank",
        "exact": true,
        "component": require('../search_bank/page.js').default
      },
      {
        "path": "/report",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/report' })
      },
      {
        "path": "/regist",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/regist' })
      },
      {
        "path": "/position_ticket",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/position_ticket' })
      },
      {
        "path": "/position_tab",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/position_tab' })
      },
      {
        "path": "/position",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/position' })
      },
      {
        "path": "/personal",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/personal' })
      },
      {
        "path": "/pdf",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/pdf' })
      },
      {
        "path": "/move_to_history",
        "exact": true,
        "component": require('../move_to_history/page.js').default
      },
      {
        "path": "/message_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/message_details' })
      },
      {
        "path": "/message",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/message' })
      },
      {
        "path": "/logistics",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/logistics' })
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login/page.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/history_ticket",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/history_ticket' })
      },
      {
        "path": "/history_tab",
        "exact": true,
        "component": require('../history_tab/page.js').default
      },
      {
        "path": "/history",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/history' })
      },
      {
        "path": "/funds_out",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds_out' })
      },
      {
        "path": "/funds_in",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds_in' })
      },
      {
        "path": "/funds_history",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds_history' })
      },
      {
        "path": "/funds_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds_details' })
      },
      {
        "path": "/funds_bank_selection",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds_bank_selection' })
      },
      {
        "path": "/funds",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/funds' })
      },
      {
        "path": "/forgotpwd",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/forgotpwd' })
      },
      {
        "path": "/evaluate",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/evaluate' })
      },
      {
        "path": "/entering",
        "exact": true,
        "component": require('../entering/page.js').default
      },
      {
        "path": "/endorse_info",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/endorse_info' })
      },
      {
        "path": "/editing",
        "exact": true,
        "component": require('../editing/page.js').default
      },
      {
        "path": "/delivery_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/delivery_details' })
      },
      {
        "path": "/deal_select",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/deal_select' })
      },
      {
        "path": "/deal_details_out",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/deal_details_out' })
      },
      {
        "path": "/deal_details_in",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/deal_details_in' })
      },
      {
        "path": "/deal_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/deal_details' })
      },
      {
        "path": "/deal_closed",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/deal_closed' })
      },
      {
        "path": "/company_auth",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/company_auth' })
      },
      {
        "path": "/company",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/company' })
      },
      {
        "path": "/charts_shibor",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/charts_shibor' })
      },
      {
        "path": "/charts",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/charts' })
      },
      {
        "path": "/buy_notes",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/buy_notes' })
      },
      {
        "path": "/bargain_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bargain_details' })
      },
      {
        "path": "/bargain_add_notes",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bargain_add_notes' })
      },
      {
        "path": "/bank_type_select",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bank_type_select' })
      },
      {
        "path": "/bank_account_details_update",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bank_account_details_update' })
      },
      {
        "path": "/bank_account_details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bank_account_details' })
      },
      {
        "path": "/bank_account_add",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bank_account_add' })
      },
      {
        "path": "/bank_account",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/bank_account' })
      },
      {
        "path": "/addReceipt",
        "exact": true,
        "component": require('../addReceipt/page.js').default
      },
      {
        "path": "/about",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/about' })
      },
      {
        "path": "/404",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/404' })
      },
      {
        "path": "/components/BottomMenu",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/components/BottomMenu' })
      },
      {
        "path": "/details/",
        "exact": true,
        "component": require('../details/index.js').default
      },
      {
        "path": "/details/components/upload",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/components/upload' })
      },
      {
        "path": "/details/components/note",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/components/note' })
      },
      {
        "path": "/details/components/item",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/components/item' })
      },
      {
        "path": "/details/components/header",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/components/header' })
      },
      {
        "path": "/details/components/carousel",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/components/carousel' })
      },
      {
        "path": "/details/models/details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/models/details' })
      },
      {
        "path": "/details/services/details",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/details/services/details' })
      },
      {
        "path": "/dynamic/",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/' })
      },
      {
        "path": "/dynamic/components/TradeDynamic",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/components/TradeDynamic' })
      },
      {
        "path": "/dynamic/components/TabBar",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/components/TabBar' })
      },
      {
        "path": "/dynamic/components/ItemDynamic",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/components/ItemDynamic' })
      },
      {
        "path": "/dynamic/models/dynamic",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/models/dynamic' })
      },
      {
        "path": "/dynamic/services/dynamic",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/dynamic/services/dynamic' })
      },
      {
        "path": "/mine/",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/mine/' })
      },
      {
        "path": "/mine/models/mine",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/mine/models/mine' })
      },
      {
        "path": "/mine/services/mine",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/mine/services/mine' })
      },
      {
        "path": "/quotation/",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/' })
      },
      {
        "path": "/quotation/components/TopItem",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/components/TopItem' })
      },
      {
        "path": "/quotation/components/ListItem",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/components/ListItem' })
      },
      {
        "path": "/quotation/components/HistroryListItem",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/components/HistroryListItem' })
      },
      {
        "path": "/quotation/components/Filter",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/components/Filter' })
      },
      {
        "path": "/quotation/entity/quotation",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/entity/quotation' })
      },
      {
        "path": "/quotation/models/quotation",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/models/quotation' })
      },
      {
        "path": "/quotation/services/quotation",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/quotation/services/quotation' })
      },
      {
        "path": "/test/",
        "exact": true,
        "component": () => React.createElement(require('E:/FitcReact/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/test/' })
      }
    ]
  }
];

export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
