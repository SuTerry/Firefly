/*! For license information please see src_views_Home_index_tsx.6daf4f5f.js.LICENSE.txt */
(self.webpackChunksourcedao_pc_dapp=self.webpackChunksourcedao_pc_dapp||[]).push([["src_views_Home_index_tsx"],{42265:(t,e,r)=>{"use strict";r.d(e,{Z:()=>w});var n=r(93244),o=r(53669),i=r(44441),a=r(9795),c=r(28383),u=r(18157),l=r(40113),s=r(76120),f=r(3055),p=r(48908),h=r(96420);function d(t){return(0,h.Z)("MuiTypography",t)}(0,p.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var v=r(17774);const y=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],m=(0,l.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.variant&&e[r.variant],"inherit"!==r.align&&e[`align${(0,f.Z)(r.align)}`],r.noWrap&&e.noWrap,r.gutterBottom&&e.gutterBottom,r.paragraph&&e.paragraph]}})((({theme:t,ownerState:e})=>(0,o.Z)({margin:0},e.variant&&t.typography[e.variant],"inherit"!==e.align&&{textAlign:e.align},e.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},e.gutterBottom&&{marginBottom:"0.35em"},e.paragraph&&{marginBottom:16}))),g={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},b={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=i.forwardRef((function(t,e){const r=(0,s.Z)({props:t,name:"MuiTypography"}),i=(t=>b[t]||t)(r.color),l=(0,c.Z)((0,o.Z)({},r,{color:i})),{align:p="inherit",className:h,component:w,gutterBottom:x=!1,noWrap:E=!1,paragraph:S=!1,variant:j="body1",variantMapping:O=g}=l,L=(0,n.Z)(l,y),P=(0,o.Z)({},l,{align:p,color:i,className:h,component:w,gutterBottom:x,noWrap:E,paragraph:S,variant:j,variantMapping:O}),k=w||(S?"p":O[j]||g[j])||"span",A=(t=>{const{align:e,gutterBottom:r,noWrap:n,paragraph:o,variant:i,classes:a}=t,c={root:["root",i,"inherit"!==t.align&&`align${(0,f.Z)(e)}`,r&&"gutterBottom",n&&"noWrap",o&&"paragraph"]};return(0,u.Z)(c,d,a)})(P);return(0,v.jsx)(m,(0,o.Z)({as:k,ref:e,ownerState:P,className:(0,a.Z)(A.root,h)},L))}))},96342:(t,e,r)=>{"use strict";var n=r(53641),o=r(32175),i=TypeError,a=Object.getOwnPropertyDescriptor,c=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=c?function(t,e){if(o(t)&&!a(t,"length").writable)throw i("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},21025:(t,e,r)=>{"use strict";var n=r(36456),o=TypeError;t.exports=function(t,e){if(!delete t[e])throw o("Cannot delete property "+n(e)+" of "+n(t))}},51006:(t,e,r)=>{var n=r(86189),o=r(41015),i=r(29122),a=r(30831),c=RegExp.prototype;t.exports=function(t){var e=t.flags;return void 0!==e||"flags"in c||o(t,"flags")||!i(c,t)?e:n(a,t)}},79957:(t,e,r)=>{var n=r(41333),o=r(39345),i=r(58068),a=r(79291),c=r(20774),u=r(74486),l=/MSIE .\./.test(a),s=n.Function,f=function(t){return l?function(e,r){var n=u(arguments.length,1)>2,a=i(e)?e:s(e),l=n?c(arguments,2):void 0;return t(n?function(){o(a,this,l)}:a,r)}:t};t.exports={setTimeout:f(n.setTimeout),setInterval:f(n.setInterval)}},24038:(t,e,r)=>{"use strict";var n=r(9429),o=r(37580).findIndex,i=r(46215),a="findIndex",c=!0;a in[]&&Array(1)[a]((function(){c=!1})),n({target:"Array",proto:!0,forced:c},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i(a)},80074:(t,e,r)=>{"use strict";var n=r(9429),o=r(37580).find,i=r(46215),a="find",c=!0;a in[]&&Array(1)[a]((function(){c=!1})),n({target:"Array",proto:!0,forced:c},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i(a)},59942:(t,e,r)=>{"use strict";var n=r(9429),o=r(37580).map;n({target:"Array",proto:!0,forced:!r(87798)("map")},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},98290:(t,e,r)=>{"use strict";var n=r(9429),o=r(84033),i=r(58657),a=r(48749),c=r(20078),u=r(96342),l=r(1949),s=r(21992),f=r(52853),p=r(21025),h=r(87798)("splice"),d=Math.max,v=Math.min;n({target:"Array",proto:!0,forced:!h},{splice:function(t,e){var r,n,h,y,m,g,b=o(this),w=c(b),x=i(t,w),E=arguments.length;for(0===E?r=n=0:1===E?(r=0,n=w-x):(r=E-2,n=v(d(a(e),0),w-x)),l(w+r-n),h=s(b,n),y=0;y<n;y++)(m=x+y)in b&&f(h,y,b[m]);if(h.length=n,r<n){for(y=x;y<w-n;y++)g=y+r,(m=y+n)in b?b[g]=b[m]:p(b,g);for(y=w;y>w-n+r;y--)p(b,y-1)}else if(r>n)for(y=w-n;y>x;y--)g=y+r-1,(m=y+n-1)in b?b[g]=b[m]:p(b,g);for(y=0;y<r;y++)b[y+x]=arguments[y+2];return u(b,w-n+r),h}})},23803:(t,e,r)=>{"use strict";var n=r(85863).PROPER,o=r(94678),i=r(48127),a=r(48303),c=r(91073),u=r(51006),l="toString",s=RegExp.prototype[l],f=c((function(){return"/a/b"!=s.call({source:"a",flags:"b"})})),p=n&&s.name!=l;(f||p)&&o(RegExp.prototype,l,(function(){var t=i(this);return"/"+a(t.source)+"/"+a(u(t))}),{unsafe:!0})},22624:(t,e,r)=>{var n=r(9429),o=r(41333),i=r(79957).setInterval;n({global:!0,bind:!0,forced:o.setInterval!==i},{setInterval:i})},44070:(t,e,r)=>{var n=r(9429),o=r(41333),i=r(79957).setTimeout;n({global:!0,bind:!0,forced:o.setTimeout!==i},{setTimeout:i})},64530:(t,e,r)=>{r(22624),r(44070)},68064:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>ht}),r(59942);var n=r(44441),o=(r(25221),r(54137),r(42700),r(84211),r(2300),r(75243),r(79457),r(89163),r(23521),r(23803),r(80074),r(73176),r(64530),r(24038),r(98290),r(85901),r(5029),r(62337),r(93253),r(44704),r(72750),r(70851),r(7790),r(72089),r(92608),r(36292),r(24454),r(42022),r(52230),r(40999),r(78636),r(67586),r(26629)),i=r(53376),a=r(50973),c=r(34908),u=r(12315),l=r(82784);function s(){s=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof d?e:d,a=Object.create(i.prototype),c=new P(o||[]);return n(a,"_invoke",{value:S(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h={};function d(){}function v(){}function y(){}var m={};u(m,i,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(k([])));b&&b!==e&&r.call(b,i)&&(m=b);var w=y.prototype=d.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function o(n,i,a,c){var u=p(t[n],t,i);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==f(s)&&r.call(s,"__await")?e.resolve(s.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(s).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=j(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=p(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function j(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=p(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:A}}function A(){return{value:void 0,done:!0}}return v.prototype=y,n(w,"constructor",{value:y,configurable:!0}),n(y,"constructor",{value:v,configurable:!0}),v.displayName=u(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(E.prototype),u(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),u(w,c,"Generator"),u(w,i,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function p(t){return function(t){if(Array.isArray(t))return h(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==f(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===f(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function m(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){m(i,n,o,a,c,"next",t)}function c(t){m(i,n,o,a,c,"throw",t)}a(void 0)}))}}function b(t){var e,r,n,o=2;for("undefined"!=typeof Symbol&&(r=Symbol.asyncIterator,n=Symbol.iterator);o--;){if(r&&null!=(e=t[r]))return e.call(t);if(n&&null!=(e=t[n]))return new w(e.call(t));r="@@asyncIterator",n="@@iterator"}throw new TypeError("Object is not async iterable")}function w(t){function e(t){if(Object(t)!==t)return Promise.reject(new TypeError(t+" is not an object."));var e=t.done;return Promise.resolve(t.value).then((function(t){return{value:t,done:e}}))}return w=function(t){this.s=t,this.n=t.next},w.prototype={s:null,n:null,next:function(){return e(this.n.apply(this.s,arguments))},return:function(t){var r=this.s.return;return void 0===r?Promise.resolve({value:t,done:!0}):e(r.apply(this.s,arguments))},throw:function(t){var r=this.s.return;return void 0===r?Promise.reject(t):e(r.apply(this.s,arguments))}},new w(t)}var x={},E=r(25194),S=r(82784);function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function O(){O=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),c=new P(o||[]);return n(a,"_invoke",{value:x(t,r,c)}),a}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f={};function p(){}function h(){}function d(){}var v={};u(v,i,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(k([])));m&&m!==e&&r.call(m,i)&&(v=m);var g=d.prototype=p.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(n,i,a,c){var u=s(t[n],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==j(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function x(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=E(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:A}}function A(){return{value:void 0,done:!0}}return h.prototype=d,n(g,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:h,configurable:!0}),h.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(w.prototype),u(w.prototype,a,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(g),u(g,c,"Generator"),u(g,i,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function L(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function P(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?L(Object(r),!0).forEach((function(e){k(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function k(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==j(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===j(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function A(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var I="";var Z=r(91069),T=r(93244),_=r(53669),N=r(9795),C=r(18157),G=r(82813),M=r(40113),R=r(76120),B=r(38180),D=r(17774);const $=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],W=(0,M.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.absolute&&e.absolute,e[r.variant],r.light&&e.light,"vertical"===r.orientation&&e.vertical,r.flexItem&&e.flexItem,r.children&&e.withChildren,r.children&&"vertical"===r.orientation&&e.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&e.textAlignLeft]}})((({theme:t,ownerState:e})=>(0,_.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,G.Fq)(t.palette.divider,.08)},"inset"===e.variant&&{marginLeft:72},"middle"===e.variant&&"horizontal"===e.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===e.variant&&"vertical"===e.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===e.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"})),(({theme:t,ownerState:e})=>(0,_.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`,top:"50%",content:'""',transform:"translateY(50%)"}})),(({theme:t,ownerState:e})=>(0,_.Z)({},e.children&&"vertical"===e.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:`thin solid ${(t.vars||t).palette.divider}`,transform:"translateX(0%)"}})),(({ownerState:t})=>(0,_.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}}))),F=(0,M.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.wrapper,"vertical"===r.orientation&&e.wrapperVertical]}})((({theme:t,ownerState:e})=>(0,_.Z)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===e.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`}))),V=n.forwardRef((function(t,e){const r=(0,R.Z)({props:t,name:"MuiDivider"}),{absolute:n=!1,children:o,className:i,component:a=(o?"div":"hr"),flexItem:c=!1,light:u=!1,orientation:l="horizontal",role:s=("hr"!==a?"separator":void 0),textAlign:f="center",variant:p="fullWidth"}=r,h=(0,T.Z)(r,$),d=(0,_.Z)({},r,{absolute:n,component:a,flexItem:c,light:u,orientation:l,role:s,textAlign:f,variant:p}),v=(t=>{const{absolute:e,children:r,classes:n,flexItem:o,light:i,orientation:a,textAlign:c,variant:u}=t,l={root:["root",e&&"absolute",u,i&&"light","vertical"===a&&"vertical",o&&"flexItem",r&&"withChildren",r&&"vertical"===a&&"withChildrenVertical","right"===c&&"vertical"!==a&&"textAlignRight","left"===c&&"vertical"!==a&&"textAlignLeft"],wrapper:["wrapper","vertical"===a&&"wrapperVertical"]};return(0,C.Z)(l,B.V,n)})(d);return(0,D.jsx)(W,(0,_.Z)({as:a,className:(0,N.Z)(v.root,i),role:s,ref:e,ownerState:d},h,{children:o?(0,D.jsx)(F,{className:v.wrapper,ownerState:d,children:o}):null}))}));var z=r(6210),Y=r(78671),H=r(28383),J=r(49482);const U=["component","direction","spacing","divider","children"];function X(t,e){const r=n.Children.toArray(t).filter(Boolean);return r.reduce(((t,o,i)=>(t.push(o),i<r.length-1&&t.push(n.cloneElement(e,{key:`separator-${i}`})),t)),[])}const q=(0,M.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>[e.root]})((({ownerState:t,theme:e})=>{let r=(0,_.Z)({display:"flex",flexDirection:"column"},(0,z.k9)({theme:e},(0,z.P$)({values:t.direction,breakpoints:e.breakpoints.values}),(t=>({flexDirection:t}))));if(t.spacing){const n=(0,Y.hB)(e),o=Object.keys(e.breakpoints.values).reduce(((e,r)=>(("object"==typeof t.spacing&&null!=t.spacing[r]||"object"==typeof t.direction&&null!=t.direction[r])&&(e[r]=!0),e)),{}),i=(0,z.P$)({values:t.direction,base:o}),a=(0,z.P$)({values:t.spacing,base:o});"object"==typeof i&&Object.keys(i).forEach(((t,e,r)=>{if(!i[t]){const n=e>0?i[r[e-1]]:"column";i[t]=n}}));const c=(e,r)=>{return{"& > :not(style) + :not(style)":{margin:0,[`margin${o=r?i[r]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o]}`]:(0,Y.NA)(n,e)}};var o};r=(0,J.Z)(r,(0,z.k9)({theme:e},a,c))}return r=(0,z.dt)(e.breakpoints,r),r})),K=n.forwardRef((function(t,e){const r=(0,R.Z)({props:t,name:"MuiStack"}),n=(0,H.Z)(r),{component:o="div",direction:i="column",spacing:a=0,divider:c,children:u}=n,l=(0,T.Z)(n,U),s={direction:i,spacing:a};return(0,D.jsx)(q,(0,_.Z)({as:o,ownerState:s,ref:e},l,{children:c?X(u,c):u}))})),Q=K;var tt=r(66526),et=r(42265),rt=r(15222),nt=r(86187),ot=r(5622);const it=(0,ot.Z)((0,D.jsx)("path",{d:"M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM21 6h-3V3h-2v3h-3v2h3v3h2V8h3z"}),"AddIcCall"),at=(0,ot.Z)((0,D.jsx)("path",{d:"M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"}),"Videocam");function ct(t){return function(t){if(Array.isArray(t))return lt(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||ut(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ut(t,e){if(t){if("string"==typeof t)return lt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?lt(t,e):void 0}}function lt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function st(t,e){if(t){if("string"==typeof t)return ft(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ft(t,e):void 0}}function ft(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}const pt=function(t){var e,r,o=t.friend,i=t.send,a=(0,c.CG)((function(t){return t.friends})).remotes,l=(0,c.TL)(),s=(0,rt.Z)(),f=function(){var t,e,r=(t=(0,n.useState)([]),e=2,function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(t,e)||ut(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];return{self:function(t){var e=ct(o);e.push({type:"self",text:t}),i(e)},remote:function(t){var e=ct(o);e.push({type:"remote",text:t}),i(e)},Talk:function(){return n.createElement(Z.Z,{sx:{flexGrow:1,overflowY:"auto",pt:1}},o.map((function(t,e){return n.createElement(Z.Z,{key:e,sx:{display:"flex",ml:1,mr:1,mb:2,justifyContent:"self"===t.type?"end":"start"}},n.createElement(et.Z,{sx:{p:1,backgroundColor:"self"===t.type?"#fff":"#1AAD19"}},t.text))})))}}}(),p=f.Talk,h=f.self,d=f.remote,v=(e=(0,n.useState)(""),r=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(e,r)||st(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),y=v[0],m=v[1];return(0,n.useEffect)((function(){if(a.length>0){var t=function(t){return function(t){if(Array.isArray(t))return ft(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||st(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(a),e=t.findIndex((function(t){return t.hash===o.hash})),r=t[e];d(r.text),t.splice(e,1),l((0,u.UH)(t))}}),[a]),n.createElement(Z.Z,{sx:{height:"calc(100vh - 64px)",display:"flex",flexDirection:"column"}},n.createElement(p,null),o.peerId?n.createElement(Z.Z,{sx:{height:240}},n.createElement(V,null),n.createElement(Q,{sx:{pr:2,mb:1},direction:"row",justifyContent:"flex-end",spacing:2},n.createElement(tt.Z,null,n.createElement(it,null)),n.createElement(tt.Z,null,n.createElement(at,null))),n.createElement("textarea",{className:"textarea",value:y,onChange:function(t){return m(t.target.value)},onKeyDown:function(t){13===t.which&&(i(y,o),h(y),m(""))}})):n.createElement(Z.Z,{sx:{height:240}},n.createElement(V,null),n.createElement(et.Z,{sx:{lineHeight:"239px",textAlign:"center"}},s(nt.xY.e)+o.name)))},ht=function(){var t=function(){var t=(0,c.CG)((function(t){return t.friends})),e=t.friends,r=t.remotes,h=(0,c.CG)((function(t){return t.user})).libp2p,d=(0,c.TL)(),y=(0,n.useRef)([]),m=function(){var t=g(s().mark((function t(n){var i,c,h;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i=n.connection,c=n.stream,h=i.remotePeer.toString(),(0,o.zG)(c,function(){var t=g(s().mark((function t(n){var o,c,y,m,g,w,E;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=!1,c=!1,t.prev=2,m=b(n);case 4:return t.next=6,m.next();case 6:if(!(o=!(g=t.sent).done)){t.next=14;break}if(w=g.value,"object"!==f(E=function(){var t=(0,a.B)(w.subarray()),n=JSON.parse(t);l.log("handle-friends",e);var o=e.find((function(t){return t.hash===n.hash}));switch(n.type){case"greet":if(!o)return{v:void 0};if(x.hasOwnProperty(h)&&x[h].peerId)return{v:void 0};x[h]=v({},o),x[h].peerId=i.remotePeer,P(x[h]);break;case"information":if(!o)return{v:void 0};var c=p(r);c.push({hash:o.hash,text:n.text}),d((0,u.UH)(c))}}())){t.next=11;break}return t.abrupt("return",E.v);case 11:o=!1,t.next=4;break;case 14:t.next=20;break;case 16:t.prev=16,t.t0=t.catch(2),c=!0,y=t.t0;case 20:if(t.prev=20,t.prev=21,!o||null==m.return){t.next=25;break}return t.next=25,m.return();case 25:if(t.prev=25,!c){t.next=28;break}throw y;case 28:return t.finish(25);case 29:return t.finish(20);case 30:case"end":return t.stop()}}),t,null,[[2,16,20,30],[21,,25,29]])})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),w=function(){var t=g(s().mark((function t(e){var r,n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h){t.next=2;break}return t.abrupt("return");case 2:if(r=e.detail.id.toString(),n=y.current.find((function(t){return t.hash===r}))){t.next=6;break}return t.abrupt("return");case 6:if(!x.hasOwnProperty(r)||!x[r].peerId){t.next=8;break}return t.abrupt("return");case 8:x[r]=v({},n),h.dial(e.detail.id).catch((function(t){return t}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),E=function(){var t=g(s().mark((function t(e){var r,n,o,i;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h){t.next=2;break}return t.abrupt("return");case 2:if(r=e.detail,n=e.detail.remotePeer.toString(),o=x[n]){t.next=7;break}return t.abrupt("return");case 7:if(!o.peerId){t.next=9;break}return t.abrupt("return");case 9:l.log("connect:".concat(o.name)),o.peerId=r.remotePeer,i=JSON.stringify({type:"greet",hash:o.hash}),L(r.remotePeer,o.topic,i);case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),S=function(){var t=g(s().mark((function t(e){var r,n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.detail.remotePeer.toString(),x.hasOwnProperty(r)){t.next=3;break}return t.abrupt("return");case 3:n=v({},x[r]),delete x[r],n.peerId=void 0,P(n);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),j=function(){var t=g(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h){t.next=2;break}return t.abrupt("return");case 2:h.removeEventListener("peer:discovery",w),h.connectionManager.removeEventListener("peer:connect",E),h.connectionManager.removeEventListener("peer:disconnect",S),h.addEventListener("peer:discovery",w),h.connectionManager.addEventListener("peer:connect",E),h.connectionManager.addEventListener("peer:disconnect",S);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),O=function(){var t=g(s().mark((function t(e,r){var n,a,c,u;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.peerId,a=r.topic,t.next=3,h.dialProtocol(n,a);case 3:c=t.sent,u=JSON.stringify({type:"information",hash:h.peerId.toString(),text:e}),(0,o.zG)([(0,i.m)(u)],c);case 6:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),L=function(){var t=g(s().mark((function t(e,r,n){var a,c;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.dialProtocol(e,[r]);case 3:return a=t.sent,t.next=6,(0,o.zG)([(0,i.m)(n)],a);case 6:c=e.toString(),P(x[c]),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),l.log("fail: ".concat(e)),setTimeout((function(){L(e,r,n)}),6e4);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e,r,n){return t.apply(this,arguments)}}(),P=function(t){var e=p(y.current),r=y.current.findIndex((function(e){return e.hash===t.hash}));e.splice(r,1,t),d((0,u.Xj)(e))};return(0,n.useEffect)((function(){l.log("libp2pPeerId:".concat(h.peerId.toString())),j()}),[]),(0,n.useEffect)((function(){y.current=e})),(0,n.useEffect)((function(){var t=e.map((function(t){return t.topic}));h.unhandle(t),h.handle(t,m)}),[e]),{send:O}}(),e=t.send;!function(){var t=(0,c.CG)((function(t){return t.friends})).friends,e=(0,c.CG)((function(t){return t.wallet})).accountAddress,r=(0,c.TL)(),o=(0,n.useRef)([]),i=function(){var t,n=(t=O().mark((function t(){var n,i,a;return O().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E.B.get_friend_list(e);case 2:if(n=t.sent,(i=JSON.stringify(n))!==I){t.next=6;break}return t.abrupt("return");case 6:I=i,a=n.map((function(t,e){var r;return P(P({},t),{},{peerId:null===(r=o.current[e])||void 0===r?void 0:r.peerId})})),S.log("friens:",a),r((0,u.Xj)(a));case 10:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){A(i,n,o,a,c,"next",t)}function c(t){A(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(){return n.apply(this,arguments)}}();(0,n.useEffect)((function(){o.current=t})),(0,n.useEffect)((function(){return i(),function(){return clearInterval(void 0)}}),[])}();var r=(0,c.CG)((function(t){return t.friends})),h=r.friends,d=r.currentFriendIndex;return n.createElement(n.Fragment,null,h.map((function(t,r){return n.createElement("div",{role:"tabpanel",hidden:d!==r,id:"vertical-tabpanel-".concat(r),"aria-labelledby":"vertical-tab-".concat(r),key:t.hash,style:{visibility:d===r?"visible":"hidden"}},n.createElement(pt,{friend:t,send:e}))})))}}}]);
//# sourceMappingURL=src_views_Home_index_tsx.6daf4f5f.js.map