import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

const app = dva({
  history: window.g_history,
});
window.g_app = app;
app.use(createLoading());

app.model({ ...(require('../../models/example.js').default) });
app.model({ ...(require('../../models/MVC.js').default) });
app.model({ ...(require('../../models/tabbar.js').default) });
app.model({ ...(require('../../pages/addReceipt/models/addReceipt.js').default) });
app.model({ ...(require('../../pages/bank_account_add/models/addBankAccount.js').default) });
app.model({ ...(require('../../pages/bank_account_details_update/models/updateDetails.js').default) });
app.model({ ...(require('../../pages/bank_account_details/models/BankAccountDetails.js').default) });
app.model({ ...(require('../../pages/bank_account/models/bankAccount.js').default) });
app.model({ ...(require('../../pages/bank_type_select/models/bankTypes.js').default) });
app.model({ ...(require('../../pages/bargain_add_notes/models/index.js').default) });
app.model({ ...(require('../../pages/bargain_details/models/index.js').default) });
app.model({ ...(require('../../pages/charts_shibor/models/shibor.js').default) });
app.model({ ...(require('../../pages/charts/models/chart.js').default) });
app.model({ ...(require('../../pages/company_auth/models/companyAuth.js').default) });
app.model({ ...(require('../../pages/company/models/company.js').default) });
app.model({ ...(require('../../pages/deal_details/models/index.js').default) });
app.model({ ...(require('../../pages/deal_select/models/dealSelect.js').default) });
app.model({ ...(require('../../pages/delivery_details/models/index.js').default) });
app.model({ ...(require('../../pages/details/models/details.js').default) });
app.model({ ...(require('../../pages/dynamic/models/dynamic.js').default) });
app.model({ ...(require('../../pages/editing/models/editing.js').default) });
app.model({ ...(require('../../pages/endorse_info/models/index.js').default) });
app.model({ ...(require('../../pages/entering/models/entering.js').default) });
app.model({ ...(require('../../pages/forgotpwd/models/forgotPassword.js').default) });
app.model({ ...(require('../../pages/funds_history/models/FundsHistory.js').default) });
app.model({ ...(require('../../pages/funds_in/models/fundsIn.js').default) });
app.model({ ...(require('../../pages/funds_out/models/fundsOut.js').default) });
app.model({ ...(require('../../pages/funds/models/funds.js').default) });
app.model({ ...(require('../../pages/history_ticket/models/histTicket.js').default) });
app.model({ ...(require('../../pages/history/models/history.js').default) });
app.model({ ...(require('../../pages/login/models/login.js').default) });
app.model({ ...(require('../../pages/message/models/message.js').default) });
app.model({ ...(require('../../pages/mine/models/mine.js').default) });
app.model({ ...(require('../../pages/position_ticket/models/ticket.js').default) });
app.model({ ...(require('../../pages/position/models/position.js').default) });
app.model({ ...(require('../../pages/quotation/models/quotation.js').default) });
app.model({ ...(require('../../pages/regist/models/regist.js').default) });
app.model({ ...(require('../../pages/report/models/index.js').default) });
app.model({ ...(require('../../pages/search_bank/models/searchBank.js').default) });
app.model({ ...(require('../../pages/search_company/models/searchCompany.js').default) });
app.model({ ...(require('../../pages/select_notes/models/index.js').default) });
app.model({ ...(require('../../pages/ticket_details/models/ticketDetails.js').default) });
app.model({ ...(require('../../pages/ticket_entering/models/enterTicket.js').default) });
app.model({ ...(require('../../pages/ticket_record/models/ticketlist.js').default) });
app.model({ ...(require('../../pages/trade_history/models/tradeHistory.js').default) });
app.model({ ...(require('../../pages/trade_party_add/models/tradePartyAdd.js').default) });
app.model({ ...(require('../../pages/trade_party_search/models/index.js').default) });
app.model({ ...(require('../../pages/trade_party_select/models/tradePartySelect.js').default) });
app.model({ ...(require('../../pages/transfer/models/transfer.js').default) });
app.model({ ...(require('../../pages/userinfo_modify_name/models/modifyName.js').default) });
app.model({ ...(require('../../pages/userinfo_modify_phone/models/modifyPhone.js').default) });
app.model({ ...(require('../../pages/userinfo/models/userInfo.js').default) });
app.model({ ...(require('../../pages/wxlogin/models/wechat.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
