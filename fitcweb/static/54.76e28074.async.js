webpackJsonp([54],{"6kEf":function(e,t){e.exports={rightContent:"rightContent___3tOZa",List:"List___2uCAA",inputItem:"inputItem___2GpZw"}},BOZx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={confirmLabel:"\u786e\u5b9a"}},GXEb:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n("nMGJ"),n("3K9U")),a=(n("ElY1"),n("4Lfk")),o=(n("S8ix"),n("sLrp")),l=(n("P6TI"),n("cjsM")),i=n("Z60a"),u=n.n(i),s=n("j/rp"),c=n.n(s),p=n("C9uT"),d=n.n(p),f=n("T/v0"),m=n.n(f),h=n("tNLN"),b=n.n(h),v=n("GiK3"),y=n.n(v),C=n("qbDP"),k=n.n(C),g=n("6kEf"),x=n.n(g),E=n("S6G3"),I=(n.n(E),y.a.createElement(r.a,{type:"left"})),O=function(e){function t(){var e,n,r;u()(this,t);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return m()(r,(n=r=m()(this,(e=b()(t)).call.apply(e,[this].concat(o))),r.state={name:""},r.goBack=function(){k.a.goBack()},r.onInputChange=function(e){r.setState({name:e})},r.onSave=function(){var e=r.props,t=e.dispatch,n=e.login,a=r.state.name,o=n.user,l=n.token,i=o.phoneNumber,u=o.phoneNumber2,s=o.avatar;t({type:"modifyName/modifyTradeName",payload:{userId:o.userId,token:l,name:a,phoneNumber:i,phoneNumber2:u,avatar:s}})},n))}return d()(t,[{key:"render",value:function(){var e=y.a.createElement("div",{className:x.a.rightContent,onClick:this.onSave},"\u4fdd\u5b58");return y.a.createElement("div",{className:"page-container"},y.a.createElement(l.a,{icon:I,onLeftClick:this.goBack,rightContent:e},"\u4fee\u6539\u4ea4\u6613\u79f0\u8c13"),y.a.createElement(a.a,{className:x.a.List},y.a.createElement(o.a,{className:"row-cell ".concat(x.a.inputItem),placeholder:"\u8bf7\u8f93\u5165\u65b0\u7684\u4ea4\u6613\u79f0\u8c13",clear:!0,onChange:this.onInputChange})))}}]),c()(t,e),t}(y.a.Component),N=function(e){return{login:e.login,modifyName:e.modifyName}};t.default=Object(E.connect)(N)(O)},S8ix:function(e,t,n){"use strict";var r=(n("a+FO"),n("ElY1"),n("Zbu9"));n.n(r)},Zbu9:function(e,t){},hozN:function(e,t,n){"use strict";function r(e,t,n,r){var a={};if(t&&t.antLocale&&t.antLocale[n])a=t.antLocale[n];else{var l=r();a=l.default||l}var i=o()({},a);return e.locale&&(i=o()({},i,e.locale),e.locale.lang&&(i.lang=o()({},a.lang,e.locale.lang))),i}t.a=r;var a=n("Dd8w"),o=n.n(a)},sLrp:function(e,t,n){"use strict";function r(e,t){return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function a(e,t){e.classList?e.classList.add(t):r(e,t)||(e.className=e.className+" "+t)}function o(e,t){if(e.classList)e.classList.remove(t);else if(r(e,t)){var n=e.className;e.className=(" "+n+" ").replace(" "+t+" ","")}}function l(){}function i(e){return void 0===e||null===e?"":e}var u=n("Dd8w"),s=n.n(u),c=n("bOdI"),p=n.n(c),d=n("Zrlr"),f=n.n(d),m=n("wxAW"),h=n.n(m),b=n("zwoO"),v=n.n(b),y=n("Pf15"),C=n.n(y),k=n("GiK3"),g=n.n(k),x=n("KSGD"),E=n.n(x),I=n("HW6M"),O=n.n(I),N=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},P=function(e){function t(){f()(this,t);var e=v()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onInputBlur=function(t){var n=t.target.value;e.props.onBlur&&e.props.onBlur(n)},e.onInputFocus=function(t){var n=t.target.value;e.props.onFocus&&e.props.onFocus(n)},e.focus=function(){e.inputRef.focus()},e}return C()(t,e),h()(t,[{key:"render",value:function(){var e=this,t=this.props,n=(t.onBlur,t.onFocus,N(t,["onBlur","onFocus"]));return g.a.createElement("input",s()({ref:function(t){return e.inputRef=t},onBlur:this.onInputBlur,onFocus:this.onInputFocus},n))}}]),t}(g.a.Component),_=P,L=n("O27J"),B=n.n(L),K=n("jLNa"),S=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},w=function(e){function t(){return f()(this,t),v()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return C()(t,e),h()(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.onClick,r=e.className,a=(e.disabled,e.children),o=e.tdRef,l=S(e,["prefixCls","onClick","className","disabled","children","tdRef"]),i=a;"keyboard-delete"===r?i="delete":"keyboard-hide"===r?i="hide":"keyboard-confirm"===r&&(i="confirm");var u=O()(t+"-item",r);return g.a.createElement(K.a,{activeClassName:t+"-item-active"},g.a.createElement("td",s()({ref:o,onClick:function(e){n(e,i)},className:u},l),a))}}]),t}(g.a.Component);w.defaultProps={prefixCls:"am-number-keyboard",onClick:function(){},disabled:!1};var j=function(e){function t(){f()(this,t);var e=v()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onKeyboardClick=function(t,n){if(t.nativeEvent.stopImmediatePropagation(),"confirm"===n&&e.confirmDisabled)return null;e.linkedInput&&e.linkedInput.onKeyboardClick(n)},e.renderKeyboardItem=function(t,n){return g.a.createElement(w,{onClick:e.onKeyboardClick,key:"item-"+t+"-"+n},t)},e}return C()(t,e),h()(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.prefixCls,r=t.confirmLabel,a=O()(n+"-wrapper",n+"-wrapper-hide");return g.a.createElement("div",{className:a,ref:function(t){return e.antmKeyboard=t}},g.a.createElement("table",null,g.a.createElement("tbody",null,g.a.createElement("tr",null,["1","2","3"].map(function(t,n){return e.renderKeyboardItem(t,n)}),g.a.createElement(w,{className:"keyboard-delete",rowSpan:2,onClick:this.onKeyboardClick})),g.a.createElement("tr",null,["4","5","6"].map(function(t,n){return e.renderKeyboardItem(t,n)})),g.a.createElement("tr",null,["7","8","9"].map(function(t,n){return e.renderKeyboardItem(t,n)}),g.a.createElement(w,{className:"keyboard-confirm",rowSpan:2,onClick:this.onKeyboardClick,tdRef:function(t){return e.confirmKeyboardItem=t}},r)),g.a.createElement("tr",null,[".","0"].map(function(t,n){return e.renderKeyboardItem(t,n)}),g.a.createElement(w,{className:"keyboard-hide",onClick:this.onKeyboardClick})))))}}]),t}(g.a.Component);j.defaultProps={prefixCls:"am-number-keyboard"};var F=j,R=B.a.createPortal,T=function(e){function t(e){f()(this,t);var n=v()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n._container=n.props.getContainer(),n}return C()(t,e),h()(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return this.props.children?R(this.props.children,this._container):null}}]),t}(g.a.Component),D=T,A=!!B.a.createPortal,Z=null,G=function(e){function t(e){f()(this,t);var n=v()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=function(e){"value"in n.props||n.setState({value:e.target.value}),n.props.onChange(e)},n.addBlurListener=function(){document.addEventListener("click",n.doBlur,!1)},n.removeBlurListener=function(){document.removeEventListener("click",n.doBlur,!1)},n.saveRef=function(e){A&&(Z=e)},n.doBlur=function(e){var t=n.state.value;e.target!==n.inputRef&&n.onInputBlur(t)},n.unLinkInput=function(){Z&&Z.linkedInput&&Z.linkedInput===n&&(Z.linkedInput=null,a(Z.antmKeyboard,n.props.keyboardPrefixCls+"-wrapper-hide")),n.removeBlurListener()},n.onInputBlur=function(e){n.state.focus&&(n.setState({focus:!1}),n.props.onBlur(e),setTimeout(function(){n.unLinkInput()},50))},n.onInputFocus=function(){var e=n.state.value;n.props.onFocus(e),n.setState({focus:!0},function(){Z.linkedInput=n,o(Z.antmKeyboard,n.props.keyboardPrefixCls+"-wrapper-hide"),Z.confirmDisabled=""===e,""===e?a(Z.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled"):o(Z.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled")})},n.onKeyboardClick=function(e){var t=n.props.maxLength,r=n.state.value,l=n.onChange,i=void 0;"delete"===e?(i=r.substring(0,r.length-1),l({target:{value:i}})):"confirm"===e?(i=r,l({target:{value:i}}),n.onInputBlur(r)):"hide"===e?(i=r,n.onInputBlur(i)):void 0!==t&&+t>=0&&(r+e).length>t?(i=(r+e).substr(0,t),l({target:{value:i}})):(i=r+e,l({target:{value:i}})),Z.confirmDisabled=""===i,""===i?a(Z.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled"):o(Z.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled")},n.onFakeInputClick=function(){n.focus()},n.focus=function(){n.removeBlurListener(),n.state.focus||n.onInputFocus(),setTimeout(function(){n.addBlurListener()},50)},n.state={focus:!1,value:e.value||""},n}return C()(t,e),h()(t,[{key:"componentWillReceiveProps",value:function(e){"value"in e&&this.setState({value:e.value})}},{key:"componentDidMount",value:function(){this.renderCustomKeyboard()}},{key:"componentWillUnmount",value:function(){this.state.focus&&this.props.onBlur(this.state.value),this.unLinkInput()}},{key:"getComponent",value:function(){var e=this.props,t=e.keyboardPrefixCls,n=e.confirmLabel;return g.a.createElement(F,{ref:this.saveRef,onClick:this.onKeyboardClick,preixCls:t,confirmLabel:n})}},{key:"getContainer",value:function(){var e=document.querySelector("#"+this.props.keyboardPrefixCls+"-container");return e||(e=document.createElement("div"),e.setAttribute("id",this.props.keyboardPrefixCls+"-container"),document.body.appendChild(e)),this.container=e,e}},{key:"renderCustomKeyboard",value:function(){A||Z||(Z=B.a.unstable_renderSubtreeIntoContainer(this,this.getComponent(),this.getContainer()))}},{key:"renderPortal",value:function(){var e=this;return A?g.a.createElement(D,{getContainer:function(){return e.getContainer()}},this.getComponent()):null}},{key:"render",value:function(){var e=this,t=this.props,n=t.placeholder,r=t.disabled,a=t.editable,o=t.moneyKeyboardAlign,l=this.state,i=l.focus,u=l.value,s=r||!a,c=O()("fake-input",{focus:i,"fake-input-disabled":r}),p=O()("fake-input-container",{"fake-input-container-left":"left"===o});return g.a.createElement("div",{className:p},""===u&&g.a.createElement("div",{className:"fake-input-placeholder"},n),g.a.createElement("div",{className:c,ref:function(t){return e.inputRef=t},onClick:s?function(){}:this.onFakeInputClick},u),this.renderPortal())}}]),t}(g.a.Component);G.defaultProps={onChange:function(){},onFocus:function(){},onBlur:function(){},placeholder:"",disabled:!1,editable:!0,prefixCls:"am-input",keyboardPrefixCls:"am-number-keyboard"};var M=G,W=n("hozN"),U=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},V=function(e){function t(e){f()(this,t);var n=v()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onInputChange=function(e){var t=e.target.value,r=n.props,a=r.onChange;switch(r.type){case"text":break;case"bankCard":t=t.replace(/\D/g,"").replace(/(....)(?=.)/g,"$1 ");break;case"phone":t=t.replace(/\D/g,"").substring(0,11);var o=t.length;o>3&&o<8?t=t.substr(0,3)+" "+t.substr(3):o>=8&&(t=t.substr(0,3)+" "+t.substr(3,4)+" "+t.substr(7));break;case"number":t=t.replace(/\D/g,"")}"value"in n.props?n.setState({value:n.props.value}):n.setState({value:t}),a&&a(t)},n.onInputFocus=function(e){n.debounceTimeout&&(clearTimeout(n.debounceTimeout),n.debounceTimeout=null),n.setState({focus:!0}),n.props.onFocus&&n.props.onFocus(e)},n.onInputBlur=function(e){n.inputRef&&(n.debounceTimeout=setTimeout(function(){document.activeElement!==n.inputRef.inputRef&&n.setState({focus:!1})},200)),n.props.onBlur&&n.props.onBlur(e)},n.onExtraClick=function(e){n.props.onExtraClick&&n.props.onExtraClick(e)},n.onErrorClick=function(e){n.props.onErrorClick&&n.props.onErrorClick(e)},n.clearInput=function(){"password"!==n.props.type&&n.props.updatePlaceholder&&n.setState({placeholder:n.props.value}),n.setState({value:""}),n.props.onChange&&n.props.onChange(""),n.focus()},n.focus=function(){n.inputRef.focus()},n.state={placeholder:e.placeholder,value:e.value||e.defaultValue||""},n}return C()(t,e),h()(t,[{key:"componentWillReceiveProps",value:function(e){"placeholder"in e&&!e.updatePlaceholder&&this.setState({placeholder:e.placeholder}),"value"in e&&this.setState({value:e.value})}},{key:"componentWillUnmount",value:function(){this.debounceTimeout&&(clearTimeout(this.debounceTimeout),this.debounceTimeout=null)}},{key:"render",value:function(){var e,t,r=this,a=this.props,o=a.prefixCls,l=a.prefixListCls,u=a.editable,c=a.style,d=a.clear,f=a.children,m=a.error,h=a.className,b=a.extra,v=a.labelNumber,y=(a.onExtraClick,a.onErrorClick,a.updatePlaceholder,a.type),C=(a.locale,a.moneyKeyboardAlign),k=U(a,["prefixCls","prefixListCls","editable","style","clear","children","error","className","extra","labelNumber","onExtraClick","onErrorClick","updatePlaceholder","type","locale","moneyKeyboardAlign"]),x=k.defaultValue,E=k.name,I=k.disabled,N=k.maxLength,P=this.state.value,L=Object(W.a)(this.props,this.context,"InputItem",function(){return n("BOZx")}),B=L.confirmLabel,S=this.state,w=S.placeholder,j=S.focus,F=O()(l+"-item",o+"-item",l+"-item-middle",h,(e={},p()(e,o+"-disabled",I),p()(e,o+"-error",m),p()(e,o+"-focus",j),p()(e,o+"-android",j),e)),R=O()(o+"-label",(t={},p()(t,o+"-label-2",2===v),p()(t,o+"-label-3",3===v),p()(t,o+"-label-4",4===v),p()(t,o+"-label-5",5===v),p()(t,o+"-label-6",6===v),p()(t,o+"-label-7",7===v),t)),T=o+"-control",D="text";"bankCard"===y||"phone"===y?D="tel":"password"===y?D="password":"digit"===y?D="number":"text"!==y&&"number"!==y&&(D=y);var A=void 0;"number"===y&&(A={pattern:"[0-9]*"});var Z=void 0;return"digit"===y&&(Z={className:"h5numInput"}),g.a.createElement("div",{className:F},g.a.createElement("div",{className:l+"-line"},f?g.a.createElement("div",{className:R},f):null,g.a.createElement("div",{className:T},"money"===y?g.a.createElement(M,{value:i(P),defaultValue:x,type:y,ref:function(e){return r.inputRef=e},maxLength:N,placeholder:w,onChange:this.onInputChange,onFocus:this.onInputFocus,onBlur:this.onInputBlur,disabled:I,editable:u,prefixCls:o,style:c,confirmLabel:B,moneyKeyboardAlign:C}):g.a.createElement(_,s()({},A,k,Z,{value:i(P),defaultValue:x,ref:function(e){return r.inputRef=e},style:c,type:D,maxLength:N,name:E,placeholder:w,onChange:this.onInputChange,onFocus:this.onInputFocus,onBlur:this.onInputBlur,readOnly:!u,disabled:I}))),d&&u&&!I&&P&&(""+P).length>0?g.a.createElement(K.a,{activeClassName:o+"-clear-active"},g.a.createElement("div",{className:o+"-clear",onClick:this.clearInput})):null,m?g.a.createElement("div",{className:o+"-error-extra",onClick:this.onErrorClick}):null,""!==b?g.a.createElement("div",{className:o+"-extra",onClick:this.onExtraClick},b):null))}}]),t}(g.a.Component);V.defaultProps={prefixCls:"am-input",prefixListCls:"am-list",type:"text",editable:!0,disabled:!1,placeholder:"",clear:!1,onChange:l,onBlur:l,onFocus:l,extra:"",onExtraClick:l,error:!1,onErrorClick:l,labelNumber:5,updatePlaceholder:!1,moneyKeyboardAlign:"right"},V.contextTypes={antLocale:E.a.object};t.a=V}});