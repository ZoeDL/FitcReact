webpackJsonp([63],{"4KkE":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Z60a"),n=a.n(r),o=a("j/rp"),s=a.n(o),i=a("C9uT"),c=a.n(i),d=a("T/v0"),l=a.n(d),u=a("tNLN"),p=a.n(u),y=a("GiK3"),m=a.n(y),_=a("QRO1"),b=a.n(_),g=a("x5rs"),S=function(e){function t(){return n()(this,t),l()(this,p()(t).apply(this,arguments))}return c()(t,[{key:"render",value:function(){var e=this.props,t=e.item,a=e.onClick;return m.a.createElement("div",{className:b.a.itemWrapper,onClick:a},m.a.createElement("div",{className:b.a.name},g.a.shiborConvert(t.bankType),g.a.tradeTypeConvert(t.tradeType)),m.a.createElement("div",{className:this.displayPriceStyle(t.updown,t.updownRate)},t.price.toFixed(2)),m.a.createElement("div",{className:this.displayBottomStyle(t.updown,t.updownRate)},m.a.createElement("span",{className:"num-small"},t.updown,"BP"),m.a.createElement("span",{className:"num-small"},"-",t.updownRate.toFixed(2),"%")))}},{key:"displayPriceStyle",value:function(e,t){return 0===e||0===t?b.a.grayBig:e<0||t<0?b.a.greenBig:b.a.redBig}},{key:"displayBottomStyle",value:function(e,t){return 0===e||0===t?b.a.grayBottom:e<0||t<0?b.a.greenBottom:b.a.redBottom}}]),s()(t,e),t}(m.a.PureComponent);t.default=S},QRO1:function(e,t){e.exports={itemWrapper:"itemWrapper___3YZRS",name:"name___2hBco",grayBig:"grayBig___1yJHx",greenBig:"greenBig___flWN_",redBig:"redBig___2Z6BV",grayBottom:"grayBottom___yjqs0",greenBottom:"greenBottom___wHs31",redBottom:"redBottom____62Uq"}},YTBw:function(e,t){e.exports={tradingStatus:"tradingStatus___2KD3J",tradeTransferingStatus:"tradeTransferingStatus___2ZcHT",tradeErrorStatus:"tradeErrorStatus___Xx92x",tradeSuccessStatus:"tradeSuccessStatus___3FcsT",tradeCompsell:"tradeCompsell___1fPd4",tadeCompbuy:"tadeCompbuy___al13s"}},x5rs:function(e,t,a){"use strict";function r(){}t.a=r;var n=a("qO4g"),o=a.n(n),s=a("YTBw"),i=a.n(s);r.shiborConvert=function(e){var t="\u56fd\u80a1";switch(e){case"GG":t="\u56fd\u80a1";break;case"CS":t="\u57ce\u5546";break;case"SN":t="\u4e09\u519c";break;case"00":t="Shibor-"}return t},r.tradeTypeConvert=function(e){var t="";switch(e){case"00":t="3M";break;case"01":t="\u76f4\u8d34";break;case"03":t="\u8f6c\u8ba9"}return t},r.getTradeStatusColor=function(e){var t=i.a.tradingStatus;switch(e){case"1":t=i.a.tradingStatus;break;case"2":t=i.a.tradeTransferingStatus;break;case"3":t=i.a.tradeErrorStatus;break;case"4":t=i.a.tradeSuccessStatus}return t},r.tradeMode={CompSell:{label:"\u8f6c\u8ba9",code:"20"},CompBuy:{label:"\u4e70\u5165",code:"21"}},r.tradeModeConvert=function(e){for(var t=o()(this.tradeMode),a=0;a<t.length;a++){var r=t[a];if(this.tradeMode[r].label===e)return this.tradeMode[r].code;if(this.tradeMode[r].code===e)return this.tradeMode[r].label}return"NA"},r.getTradeModeClass=function(e){switch(e){case"20":return i.a.tradeCompsell;case"21":return i.a.tadeCompbuy}},r.ticketTypeConvert=function(e){var t="\u7535\u94f6";switch(e){case"ETICKET":t="\u7535\u94f6";break;case"TETICKET":t="\u7535\u5546"}return t},r.paymentType={ALL:{label:"\u5168\u90e8",code:"QB",type:0},GUOGU:{label:"\u56fd\u80a1",code:"GG",type:1},DACHENGSHANG:{label:"\u5927\u57ce\u5546",code:"DC",type:2},XIAOCHENGSHANG:{label:"\u5c0f\u57ce\u5546",code:"XC",type:3},NONGXING:{label:"\u519c\u4fe1",code:"NX",type:4},NONGHE:{label:"\u519c\u5408",code:"NH",type:5},NONGSHANG:{label:"\u519c\u5546",code:"NS",type:6},CUNZHEN:{label:"\u6751\u9547",code:"CZ",type:7},CWGS:{label:"\u5176\u4ed6",code:"QT",type:8},SP:{label:"\u5546\u7968",code:"SP",type:9}},r.paymentTypeConvert=function(e){for(var t=o()(this.paymentType),a=0;a<t.length;a++){var r=t[a];if(this.paymentType[r].label===e)return this.paymentType[r].code;if(this.paymentType[r].code===e)return this.paymentType[r].label}return"NA"}}});