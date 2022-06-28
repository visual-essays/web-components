var t,i,s=Object.defineProperty,e=Object.defineProperties,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,a=(t,i,e)=>i in t?s(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e,c=(t,i)=>{for(var s in i||(i={}))l.call(i,s)&&a(t,s,i[s]);if(o)for(var s of o(i))h.call(i,s)&&a(t,s,i[s]);return t},u=(t,i)=>e(t,r(i)),d=(t,i)=>{var s={};for(var e in t)l.call(t,e)&&i.indexOf(e)<0&&(s[e]=t[e]);if(null!=t&&o)for(var e of o(t))i.indexOf(e)<0&&h.call(t,e)&&(s[e]=t[e]);return s},v=(t,i,e,r)=>{for(var o,l=r>1?void 0:r?n(i,e):i,h=t.length-1;h>=0;h--)(o=t[h])&&(l=(r?o(i,e,l):o(l))||l);return r&&l&&s(i,e,l),l},f={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},p=t=>(...i)=>({_$litDirective$:t,values:i}),w=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}},g=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,b=Symbol(),m=new Map,y=class{constructor(t,i){if(this._$cssResult$=!0,i!==b)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=m.get(this.cssText);return g&&void 0===t&&(m.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},x=t=>new y("string"==typeof t?t:t+"",b),$=(t,...i)=>{const s=1===t.length?t[0]:i.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new y(s,b)},C=g?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return x(i)})(t):t,S=window.trustedTypes,A=S?S.emptyScript:"",M=window.reactiveElementPolyfillSupport,z={toAttribute(t,i){switch(i){case Boolean:t=t?A:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,i)=>i!==t&&(i==i||t==t),E={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:_},L=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e))})),t}static createProperty(t,i=E){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const n=this[t];this[i]=e,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||E}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(C(t))}else void 0!==t&&i.push(C(t));return i}static _$Eh(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return s=i,e=this.constructor.elementStyles,g?s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const i=document.createElement("style"),e=window.litNonce;void 0!==e&&i.setAttribute("nonce",e),i.textContent=t.cssText,s.appendChild(i)})),i;var s,e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ES(t,i,s=E){var e,n;const r=this.constructor._$Eh(t,s);if(void 0!==r&&!0===s.reflect){const o=(null!==(n=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==n?n:z.toAttribute)(i,s.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,i){var s,e,n;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),l=t.converter,h=null!==(n=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==n?n:z.fromAttribute;this._$Ei=o,this[o]=h(i,t.type),this._$Ei=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}};L.finalized=!0,L.elementProperties=new Map,L.elementStyles=[],L.shadowRootOptions={mode:"open"},null==M||M({ReactiveElement:L}),(null!==(t=globalThis.reactiveElementVersions)&&void 0!==t?t:globalThis.reactiveElementVersions=[]).push("1.3.2");var T=globalThis.trustedTypes,k=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,U=`lit$${(Math.random()+"").slice(9)}$`,O="?"+U,j=`<${O}>`,B=document,R=(t="")=>B.createComment(t),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,V=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Z=/'/g,q=/"/g,J=/^(?:script|style|textarea|title)$/i,K=(t,...i)=>({_$litType$:1,strings:t,values:i}),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),W=new WeakMap,Y=B.createTreeWalker(B,129,null,!1),Q=class{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[h,a]=((t,i)=>{const s=t.length-1,e=[];let n,r=2===i?"<svg>":"",o=P;for(let i=0;i<s;i++){const s=t[i];let l,h,a=-1,c=0;for(;c<s.length&&(o.lastIndex=c,h=o.exec(s),null!==h);)c=o.lastIndex,o===P?"!--"===h[1]?o=H:void 0!==h[1]?o=V:void 0!==h[2]?(J.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=D):void 0!==h[3]&&(o=D):o===D?">"===h[0]?(o=null!=n?n:P,a=-1):void 0===h[1]?a=-2:(a=o.lastIndex-h[2].length,l=h[1],o=void 0===h[3]?D:'"'===h[3]?q:Z):o===q||o===Z?o=D:o===H||o===V?o=P:(o=D,n=void 0);const u=o===D&&t[i+1].startsWith("/>")?" ":"";r+=o===P?s+j:a>=0?(e.push(l),s.slice(0,a)+"$lit$"+s.slice(a)+U+u):s+U+(-2===a?(e.push(void 0),i):u)}const l=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==k?k.createHTML(l):l,e]})(t,i);if(this.el=Q.createElement(h,s),Y.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=Y.nextNode())&&l.length<o;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(U)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(U),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?nt:"?"===i[1]?ot:"@"===i[1]?lt:et})}else l.push({type:6,index:n})}for(const i of t)e.removeAttribute(i)}if(J.test(e.tagName)){const t=e.textContent.split(U),i=t.length-1;if(i>0){e.textContent=T?T.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],R()),Y.nextNode(),l.push({type:2,index:++n});e.append(t[i],R())}}}else if(8===e.nodeType)if(e.data===O)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(U,t+1));)l.push({type:7,index:n}),t+=U.length-1}n++}}static createElement(t,i){const s=B.createElement("template");return s.innerHTML=t,s}};function X(t,i,s=t,e){var n,r,o,l;if(i===F)return i;let h=void 0!==e?null===(n=s._$Cl)||void 0===n?void 0:n[e]:s._$Cu;const a=N(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,e)),void 0!==e?(null!==(o=(l=s)._$Cl)&&void 0!==o?o:l._$Cl=[])[e]=h:s._$Cu=h),void 0!==h&&(i=X(t,h._$AS(t,i.values),h,e)),i}var tt,it,st=class{constructor(t,i,s,e){var n;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(n=null==e?void 0:e.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=X(this,t,i),N(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var i;return I(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==G&&N(this._$AH)?this._$AA.nextSibling.data=t:this.k(B.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,n="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=Q.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.m(s);else{const t=new class{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:B).importNode(s,!0);Y.currentNode=n;let r=Y.nextNode(),o=0,l=0,h=e[0];for(;void 0!==h;){if(o===h.index){let i;2===h.type?i=new st(r,r.nextSibling,this,t):1===h.type?i=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(i=new ht(r,this,t)),this.v.push(i),h=e[++l]}o!==(null==h?void 0:h.index)&&(r=Y.nextNode(),o++)}return n}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}(n,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t}}_$AC(t){let i=W.get(t.strings);return void 0===i&&W.set(t.strings,i=new Q(t)),i}S(t){I(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new st(this.M(R()),this.M(R()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}},et=class{constructor(t,i,s,e,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,i,0),r=!N(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const e=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=X(this,e[s+o],i,o),l===F&&(l=this._$AH[o]),r||(r=!N(l)||l!==this._$AH[o]),l===G?t=G:t!==G&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!e&&this.C(t)}C(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},nt=class extends et{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===G?void 0:t}},rt=T?T.emptyScript:"",ot=class extends et{constructor(){super(...arguments),this.type=4}C(t){t&&t!==G?this.element.setAttribute(this.name,rt):this.element.removeAttribute(this.name)}},lt=class extends et{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=X(this,t,i,0))&&void 0!==s?s:G)===F)return;const e=this._$AH,n=t===G&&e!==G||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,r=t!==G&&(e===G||n);n&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}},ht=class{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}},at=window.litHtmlPolyfillSupport;null==at||at(Q,st),(null!==(i=globalThis.litHtmlVersions)&&void 0!==i?i:globalThis.litHtmlVersions=[]).push("2.2.4");var ct=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,s)=>{var e,n;const r=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new st(i.insertBefore(R(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return F}};ct.finalized=!0,ct._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:ct});var ut=globalThis.litElementPolyfillSupport;null==ut||ut({LitElement:ct}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var dt=p(class extends w{constructor(t){var i;if(super(t),t.type!==f.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(t,[i]){var s,e;if(void 0===this.et){this.et=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!(null===(s=this.st)||void 0===s?void 0:s.has(t))&&this.et.add(t);return this.render(i)}const n=t.element.classList;this.et.forEach((t=>{t in i||(n.remove(t),this.et.delete(t))}));for(const t in i){const s=!!i[t];s===this.et.has(t)||(null===(e=this.st)||void 0===e?void 0:e.has(t))||(s?(n.add(t),this.et.add(t)):(n.remove(t),this.et.delete(t)))}return F}}),vt=$`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t,i){const s=c({waitUntilFirstUpdate:!1},i);return(i,e)=>{const{update:n}=i;if(t in i){const r=t;i.update=function(t){if(t.has(r)){const i=t.get(r),n=this[r];i!==n&&(s.waitUntilFirstUpdate&&!this.hasUpdated||this[e](i,n))}n.call(this,t)}}}}function pt(t,i,s){const e=new CustomEvent(i,c({bubbles:!0,cancelable:!1,composed:!0,detail:{}},s));return t.dispatchEvent(e),e}function wt(t,i){return new Promise((s=>{t.addEventListener(i,(function e(n){n.target===t&&(t.removeEventListener(i,e),s())}))}))}var gt=t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(t,i),bt=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?u(c({},i),{finisher(s){s.createProperty(i.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};function mt(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):bt(t,i)}function yt(t){return mt(u(c({},t),{state:!0}))}function xt(t,i){return(({finisher:t,descriptor:i})=>(s,e)=>{var n;if(void 0===e){const e=null!==(n=s.originalKey)&&void 0!==n?n:s.key,r=null!=i?{kind:"method",placement:"prototype",key:e,descriptor:i(s.key)}:u(c({},s),{key:e});return null!=t&&(r.finisher=function(i){t(i,e)}),r}{const n=s.constructor;void 0!==i&&Object.defineProperty(s,e,i(e)),null==t||t(n,e)}})({descriptor:s=>{const e={get(){var i,s;return null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null},enumerable:!0,configurable:!0};if(i){const i="symbol"==typeof s?Symbol():"__"+s;e.get=function(){var s,e;return void 0===this[i]&&(this[i]=null!==(e=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(t))&&void 0!==e?e:null),this[i]}}return e}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t=t=>null!=t?t:G
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Ct="";function St(t){Ct=t}var At={"check-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">\n      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',x:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">\n      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},Mt=[{name:"default",resolver:t=>`${function(){if(!Ct){const t=[...document.getElementsByTagName("script")],i=t.find((t=>t.hasAttribute("data-shoelace")));if(i)St(i.getAttribute("data-shoelace"));else{const i=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)));let s="";i&&(s=i.getAttribute("src")),St(s.split("/").slice(0,-1).join("/"))}}return Ct.replace(/\/$/,"")}()}/assets/icons/${t}.svg`},{name:"system",resolver:t=>t in At?`data:image/svg+xml,${encodeURIComponent(At[t])}`:""}],zt=[];function _t(t){return Mt.find((i=>i.name===t))}var Et=new Map,Lt=new Map;var Tt=$`
  ${vt}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,kt=class extends w{constructor(t){if(super(t),this.it=G,t.type!==f.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===G||null==t)return this.ft=void 0,this.it=t;if(t===F)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const i=[t];return i.raw=i,this.ft={_$litType$:this.constructor.resultType,strings:i,values:[]}}};kt.directiveName="unsafeHTML",kt.resultType=1;var Ut=class extends kt{};Ut.directiveName="unsafeSVG",Ut.resultType=2;var Ot,jt=p(Ut),Bt=class extends ct{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){super.connectedCallback(),zt.push(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,zt=zt.filter((i=>i!==t))}getUrl(){const t=_t(this.library);return this.name&&t?t.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var t;const i=_t(this.library),s=this.getUrl();if(Ot||(Ot=new DOMParser),s)try{const e=await async function(t){if(Lt.has(t))return Lt.get(t);const i=await function(t,i="cors"){if(Et.has(t))return Et.get(t);const s=fetch(t,{mode:i}).then((async t=>({ok:t.ok,status:t.status,html:await t.text()})));return Et.set(t,s),s}(t),s={ok:i.ok,status:i.status,svg:null};if(i.ok){const t=document.createElement("div");t.innerHTML=i.html;const e=t.firstElementChild;s.svg="svg"===(null==e?void 0:e.tagName.toLowerCase())?e.outerHTML:""}return Lt.set(t,s),s}(s);if(s!==this.getUrl())return;if(e.ok){const s=Ot.parseFromString(e.svg,"text/html").body.querySelector("svg");null!==s?(null==(t=null==i?void 0:i.mutator)||t.call(i,s),this.svg=s.outerHTML,pt(this,"sl-load")):(this.svg="",pt(this,"sl-error"))}else this.svg="",pt(this,"sl-error")}catch(t){pt(this,"sl-error")}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){const t="string"==typeof this.label&&this.label.length>0;return K` <div
      part="base"
      class="icon"
      role=${$t(t?"img":void 0)}
      aria-label=${$t(t?this.label:void 0)}
      aria-hidden=${$t(t?void 0:"true")}
    >
      ${jt(this.svg)}
    </div>`}};Bt.styles=Tt,v([yt()],Bt.prototype,"svg",2),v([mt({reflect:!0})],Bt.prototype,"name",2),v([mt()],Bt.prototype,"src",2),v([mt()],Bt.prototype,"label",2),v([mt({reflect:!0})],Bt.prototype,"library",2),v([ft("name"),ft("src"),ft("library")],Bt.prototype,"setIcon",1),Bt=v([gt("sl-icon")],Bt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export{K as $,v as _,wt as a,pt as b,vt as c,p as d,mt as e,w as f,F as g,G as h,xt as i,yt as j,St as k,$t as l,u as m,gt as n,dt as o,c as p,x as q,$ as r,ct as s,f as t,d as u,ft as w}