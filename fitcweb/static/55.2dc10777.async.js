webpackJsonp([55],{CWpe:function(e,t,n){"use strict";(function(t){var n="undefined"==typeof window?t:window,a=function(e,t,n){return function(a,i){var s=e(function(){t.call(this,s),a.apply(this,arguments)}.bind(this),i);return this[n]?this[n].push(s):this[n]=[s],s}},i=function(e,t){return function(n){if(this[t]){var a=this[t].indexOf(n);-1!==a&&this[t].splice(a,1)}e(n)}},s="TimerMixin_timeouts",l=i(n.clearTimeout,s),o=a(n.setTimeout,l,s),r="TimerMixin_intervals",c=i(n.clearInterval,r),m=a(n.setInterval,function(){},r),d="TimerMixin_immediates",p=i(n.clearImmediate,d),u=a(n.setImmediate,p,d),h="TimerMixin_rafs",v=i(n.cancelAnimationFrame,h),f=a(n.requestAnimationFrame,v,h),b={componentWillUnmount:function(){this[s]&&this[s].forEach(function(e){n.clearTimeout(e)}),this[s]=null,this[r]&&this[r].forEach(function(e){n.clearInterval(e)}),this[r]=null,this[d]&&this[d].forEach(function(e){n.clearImmediate(e)}),this[d]=null,this[h]&&this[h].forEach(function(e){n.cancelAnimationFrame(e)}),this[h]=null},setTimeout:o,clearTimeout:l,setInterval:m,clearInterval:c,setImmediate:u,clearImmediate:p,requestAnimationFrame:f,cancelAnimationFrame:v};e.exports=b}).call(t,n("DuR2"))},"O0+U":function(e,t,n){"use strict";var a=(n("a+FO"),n("nMGJ"),n("Pa3Q"));n.n(a)},Pa3Q:function(e,t){},YPht:function(e,t,n){"use strict";var a=n("Z60a"),i=n.n(a),s=n("j/rp"),l=n.n(s),o=n("C9uT"),r=n.n(o),c=n("T/v0"),m=n.n(c),d=n("tNLN"),p=n.n(d),u=n("GiK3"),h=n.n(u),v=n("KSGD"),f=n.n(v),b=n("in0d"),g=n("HvoK"),C=function(e){function t(){var e,n,a;i()(this,t);for(var s=arguments.length,l=new Array(s),o=0;o<s;o++)l[o]=arguments[o];return m()(a,(n=a=m()(this,(e=p()(t)).call.apply(e,[this].concat(l))),a.onHander=function(e){var t=a.props.handler;t&&t(Object(g.a)(e))},n))}return r()(t,[{key:"componentDidMount",value:function(){var e=this.props.event,t=this.context.socket.socket;if(!t)return void Object(b.b)("Socket IO connection has not been established.");t.on(e,this.onHander)}},{key:"componentWillUnmount",value:function(){var e=this.props.event,t=this.context.socket.socket;if(!t)return void Object(b.b)("Socket IO connection has not been established.");t.off(e,this.onHander)}},{key:"render",value:function(){return!1}}]),l()(t,e),t}(h.a.Component);C.defaultProps={event:"svevent"},C.contextTypes={socket:f.a.object.isRequired},t.a=C},cb8J:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Biqn"),i=n.n(a),s=(n("nMGJ"),n("3K9U")),l=(n("O0+U"),n("mSKx")),o=(n("ElY1"),n("4Lfk")),r=(n("P6TI"),n("cjsM")),c=n("fKPv"),m=n.n(c),d=(n("zpSp"),n("/0HH")),p=n("Z60a"),u=n.n(p),h=n("j/rp"),v=n.n(h),f=n("C9uT"),b=n.n(f),g=n("T/v0"),C=n.n(g),y=n("tNLN"),N=n.n(y),E=n("GiK3"),_=n.n(E),I=n("YPht"),k=n("KSGD"),x=n.n(k),S=n("qbDP"),T=n.n(S),w=n("S6G3"),O=(n.n(w),n("W7GU")),j=n("CWpe"),L=n.n(j),M=n("dICT"),P=n.n(M),R=_.a.createElement(s.a,{type:"left"}),K=function(e){function t(e){var n;return u()(this,t),n=C()(this,N()(t).call(this,e)),n.handleSendSMS=function(){var e=n.state.phone,t=n.props.dispatch,a=n.context.socket;e?t({type:"regist/sendSMS",payload:{socket:a,phone:e}}):d.a.info("\u8bf7\u8f93\u5165\u624b\u673a\u53f7",1,null,!1)},n.onInputChange=function(e){return function(t){n.setState(m()({},e,t.target.value))}},n.handleResponse=function(e){var t=n.props.dispatch,a=n.context.socket;switch(e.messageName){case O.i.SMS:t({type:"regist/gotSMS",payload:{response:e}});break;case O.i.REGIST:t({type:"regist/gotRegist",payload:{socket:a,response:e}});break;case O.i.LOGIN:console.log("\u81ea\u52a8\u767b\u5f55\u6210\u529f"),t({type:"login/sessionRes",payload:e})}},n.doRegist=function(){var e=n.state,t=e.name,a=e.phone,i=e.code,s=e.password,l=e.password2,o=n.props.dispatch,r=n.context.socket;return t?a?i?s?l!==s?void d.a.info("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4",1,null,!1):void o({type:"regist/reqRegist",payload:{socket:r,params:{name:t,phone:a,code:i,password:s}}}):void d.a.info("\u8bf7\u8f93\u5165\u5bc6\u7801",1,null,!1):void d.a.info("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",1,null,!1):void d.a.info("\u8bf7\u8f93\u5165\u624b\u673a\u53f7",1,null,!1):void d.a.info("\u8bf7\u8f93\u5165\u540d\u79f0",1,null,!1)},n.state={name:"",phone:"",code:"",password:"",password2:"",leftTime:10},n}return b()(t,[{key:"componentWillReceiveProps",value:function(e,t){var n=this;if(e.timing){var a=this.state.leftTime,i=a;this.timer=setInterval(function(){i>1?n.setState({leftTime:--i}):(e.dispatch({type:"regist/clearInterval"}),n.setState({leftTime:a},function(){return clearInterval(n.timer)}))},1e3)}else this.timer&&clearInterval(this.timer)}},{key:"componentWillUnmount",value:function(){this.timer&&clearInterval(this.timer)}},{key:"render",value:function(){var e=this.props.timing,t=this.state.leftTime;return _.a.createElement("div",{className:"page-container"},_.a.createElement(I.a,{event:"svevent",handler:this.handleResponse}),_.a.createElement(r.a,{icon:R,onLeftClick:function(){T.a.goBack()}},"\u6ce8\u518c"),_.a.createElement(o.a,{className:P.a.listWrapper},_.a.createElement("div",{className:"am-list-item am-list-item-middle "+P.a.listItem},_.a.createElement("div",{className:"am-list-line"},_.a.createElement("div",{className:P.a.listLabel},"\u4ea4\u6613\u5458\u540d\u79f0"),_.a.createElement("div",{className:P.a.listContent},_.a.createElement("input",{className:P.a.input,placeholder:"\u8bf7\u8f93\u5165\u60a8\u7684\u540d\u79f0",onChange:this.onInputChange("name")})))),_.a.createElement("div",{className:"am-list-item am-list-item-middle "+P.a.listItem},_.a.createElement("div",{className:"am-list-line"},_.a.createElement("div",{className:P.a.listLabel},"\u624b\u673a\u53f7"),_.a.createElement("div",{className:P.a.listContent},_.a.createElement("input",{className:P.a.input,placeholder:"\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7",type:"tel",maxLength:11,onChange:this.onInputChange("phone")})))),_.a.createElement("div",{className:"am-list-item am-list-item-middle "+P.a.listItem},_.a.createElement("div",{className:"am-list-line"},_.a.createElement("div",{className:P.a.listLabel},"\u9a8c\u8bc1\u7801"),_.a.createElement("div",{className:P.a.listContent},_.a.createElement("input",{className:P.a.input,placeholder:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",type:"tel",maxLength:6,onChange:this.onInputChange("code")})),_.a.createElement("span",{className:e?P.a.btnCodeDisabled:P.a.btnCode,onClick:e?void 0:this.handleSendSMS},e?"".concat(t,"(s)"):"\u53d1\u9001\u9a8c\u8bc1\u7801"))),_.a.createElement("div",{className:"am-list-item am-list-item-middle "+P.a.listItem},_.a.createElement("div",{className:"am-list-line"},_.a.createElement("div",{className:P.a.listLabel},"\u5bc6\u7801"),_.a.createElement("div",{className:P.a.listContent},_.a.createElement("input",{className:P.a.input,placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",type:"password",maxLength:16,onChange:this.onInputChange("password")})))),_.a.createElement("div",{className:"am-list-item am-list-item-middle "+P.a.listItem},_.a.createElement("div",{className:"am-list-line"},_.a.createElement("div",{className:P.a.listLabel},"\u786e\u8ba4\u5bc6\u7801"),_.a.createElement("div",{className:P.a.listContent},_.a.createElement("input",{className:P.a.input,placeholder:"\u518d\u6b21\u8f93\u5165\u5bc6\u7801",type:"password",maxLength:16,onChange:this.onInputChange("password2")}))))),_.a.createElement(l.a,{className:P.a.btnCommit,activeClassName:P.a.btnCommitActive,onClick:this.doRegist},"\u63d0\u4ea4"))}}]),v()(t,e),t}(_.a.Component);K.mixins=[L.a],K.contextTypes={socket:x.a.object.isRequired};var W=function(e){var t=e.regist;return i()({},t)};t.default=Object(w.connect)(W)(K)},dICT:function(e,t){e.exports={listWrapper:"listWrapper___RHppL",listItem:"listItem___K4TMZ",listLabel:"listLabel___2cNUF",listContent:"listContent___2JIhm",input:"input___2TgcH",btnCode:"btnCode___25H7B",btnCodeDisabled:"btnCodeDisabled___1xRA8 btnCode___25H7B",btnCommit:"btnCommit___2Ej1I",btnCommitActive:"btnCommitActive___1iqgw"}},mSKx:function(e,t,n){"use strict";function a(e){return"string"==typeof e}function i(e){return a(e.type)&&k(e.props.children)?g.a.cloneElement(e,{},e.props.children.split("").join(" ")):a(e)?(k(e)&&(e=e.split("").join(" ")),g.a.createElement("span",null,e)):e}var s=n("Dd8w"),l=n.n(s),o=n("bOdI"),r=n.n(o),c=n("Zrlr"),m=n.n(c),d=n("wxAW"),p=n.n(d),u=n("zwoO"),h=n.n(u),v=n("Pf15"),f=n.n(v),b=n("GiK3"),g=n.n(b),C=n("HW6M"),y=n.n(C),N=n("3K9U"),E=n("jLNa"),_=this&&this.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&(n[a[i]]=e[a[i]]);return n},I=/^[\u4e00-\u9fa5]{2}$/,k=I.test.bind(I),x=function(e){function t(){return m()(this,t),h()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return f()(t,e),p()(t,[{key:"render",value:function(){var e,t=this.props,n=t.children,a=t.className,s=t.prefixCls,o=t.type,c=t.size,m=t.inline,d=t.disabled,p=t.icon,u=t.loading,h=t.activeStyle,v=t.activeClassName,f=t.onClick,b=_(t,["children","className","prefixCls","type","size","inline","disabled","icon","loading","activeStyle","activeClassName","onClick"]),C=u?"loading":p,I=y()(s,a,(e={},r()(e,s+"-primary","primary"===o),r()(e,s+"-ghost","ghost"===o),r()(e,s+"-warning","warning"===o),r()(e,s+"-small","small"===c),r()(e,s+"-inline",m),r()(e,s+"-disabled",d),r()(e,s+"-loading",u),r()(e,s+"-icon",!!C),e)),k=g.a.Children.map(n,i),x=void 0;if("string"==typeof C)x=g.a.createElement(N.a,{"aria-hidden":"true",type:C,size:"small"===c?"xxs":"md",className:s+"-icon"});else if(C){var S=C.props&&C.props.className,T=y()("am-icon",s+"-icon","small"===c?"am-icon-xxs":"am-icon-md");x=g.a.cloneElement(C,{className:S?S+" "+T:T})}return g.a.createElement(E.a,{activeClassName:v||(h?s+"-active":void 0),disabled:d,activeStyle:h},g.a.createElement("a",l()({role:"button",className:I},b,{onClick:d?void 0:f,"aria-disabled":d}),x,k))}}]),t}(g.a.Component);x.defaultProps={prefixCls:"am-button",size:"large",inline:!1,disabled:!1,loading:!1,activeStyle:{}},t.a=x}});