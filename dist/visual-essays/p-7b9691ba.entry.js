import{r as t,h as e,g as o}from"./p-f5d08bd3.js";import{_ as i,a as s,r,c as n,b as a,w as l,i as c,e as d,n as u,s as h,H as p,d as b,f,$ as m,o as g,g as v,t as w,l as x,h as y,j as _,k,m as $,p as z,q as C,u as A,v as S}from"./p-128f154d.js";import{i as D,a as B,p as F,g as T}from"./p-a12c2e8f.js";import"./p-7a9c1438.js";function P(t,e,o){return new Promise((r=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const n=t.animate(e,i(s({},o),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:o.duration}));n.addEventListener("cancel",r,{once:!0}),n.addEventListener("finish",r,{once:!0})}))}function O(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function U(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{const o=requestAnimationFrame(e);t.addEventListener("cancel",(()=>o),{once:!0}),t.addEventListener("finish",(()=>o),{once:!0}),t.cancel()})))))}var E=new Map,M=new WeakMap;function R(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function N(t,e){E.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function I(t,e,o){const i=M.get(t);if(null==i?void 0:i[e])return R(i[e],o.dir);const s=E.get(e);return s?R(s,o.dir):{keyframes:[],options:{duration:0}}}var j,H=new Set,L=new MutationObserver(W),q=new Map,V=document.documentElement.dir||"ltr",K=document.documentElement.lang||navigator.language;function W(){V=document.documentElement.dir||"ltr",K=document.documentElement.lang||navigator.language,[...H.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}L.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});var J=class extends class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){H.add(this.host)}hostDisconnected(){H.delete(this.host)}dir(){return`${this.host.dir||V}`.toLowerCase()}lang(){return`${this.host.lang||K}`.toLowerCase()}term(t,...e){const o=this.lang().toLowerCase().slice(0,2),i=this.lang().length>2?this.lang().toLowerCase():"",s=q.get(i),r=q.get(o);let n;if(s&&s[t])n=s[t];else if(r&&r[t])n=r[t];else{if(!j||!j[t])return console.error(`No translation found for: ${String(t)}`),t;n=j[t]}return"function"==typeof n?n(...e):n}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}}{};[{$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",currentValue:"Current value",hidePassword:"Hide password",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"}].map((t=>{const e=t.$code.toLowerCase();q.has(e)?q.set(e,Object.assign(Object.assign({},q.get(e)),t)):q.set(e,t),j||(j=t)})),W();var X=r`
  ${n}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--box-shadow);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-end: var(--sl-spacing-medium);
  }
`,Q=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Y=class extends h{constructor(){super(...arguments),this.hasSlotController=new p(this,"icon","suffix"),this.localize=new J(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}async show(){if(!this.open)return this.open=!0,b(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,b(this,"sl-after-hide")}async toast(){return new Promise((t=>{null===Q.parentElement&&document.body.append(Q),Q.appendChild(this),requestAnimationFrame((()=>{this.show()})),this.addEventListener("sl-after-hide",(()=>{Q.removeChild(this),t(),null===Q.querySelector("sl-alert")&&Q.remove()}),{once:!0})}))}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){f(this,"sl-show"),this.duration<1/0&&this.restartAutoHide(),await U(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=I(this,"alert.show",{dir:this.localize.dir()});await P(this.base,t,e),f(this,"sl-after-show")}else{f(this,"sl-hide"),clearTimeout(this.autoHideTimeout),await U(this.base);const{keyframes:t,options:e}=I(this,"alert.hide",{dir:this.localize.dir()});await P(this.base,t,e),this.base.hidden=!0,f(this,"sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}render(){return m`
      <div
        part="base"
        class=${g({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable?m`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x"
                library="system"
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};Y.styles=X,a([c('[part="base"]')],Y.prototype,"base",2),a([d({type:Boolean,reflect:!0})],Y.prototype,"open",2),a([d({type:Boolean,reflect:!0})],Y.prototype,"closable",2),a([d({reflect:!0})],Y.prototype,"variant",2),a([d({type:Number})],Y.prototype,"duration",2),a([l("open",{waitUntilFirstUpdate:!0})],Y.prototype,"handleOpenChange",1),a([l("duration")],Y.prototype,"handleDurationChange",1),Y=a([u("sl-alert")],Y),N("alert.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}}),N("alert.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});var Z=(()=>{const t=document.createElement("style");let e;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),e=!0}catch(t){e=!1}finally{t.remove()}return e})(),G=v(Z?":focus-visible":":focus"),tt=r`
  ${n}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${G} {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,et=Symbol.for(""),ot=t=>{var e,o;if((null===(e=t)||void 0===e?void 0:e.r)===et)return null===(o=t)||void 0===o?void 0:o._$litStatic$},it=(t,...e)=>({_$litStatic$:e.reduce(((e,o,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[i+1]),t[0]),r:et}),st=new Map,rt=(t=>(e,...o)=>{const i=o.length;let s,r;const n=[],a=[];let l,c=0,d=!1;for(;c<i;){for(l=e[c];c<i&&void 0!==(r=o[c],s=ot(r));)l+=s+e[++c],d=!0;a.push(r),n.push(l),c++}if(c===i&&n.push(e[i]),d){const t=n.join("$$lit$$");void 0===(e=st.get(t))&&(n.raw=n,st.set(t,e=n)),o=a}return t(e,...o)})(m),nt=class extends h{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,f(this,"sl-blur")}handleFocus(){this.hasFocus=!0,f(this,"sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}render(){const t=!!this.href,e=t?it`a`:it`button`;return rt`
      <${e}
        part="base"
        class=${g({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${x(t?void 0:this.disabled)}
        type=${x(t?void 0:"button")}
        href=${x(t?this.href:void 0)}
        target=${x(t?this.target:void 0)}
        download=${x(t?this.download:void 0)}
        rel=${x(t&&this.target?"noreferrer noopener":void 0)}
        role=${x(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${x(this.name)}
          library=${x(this.library)}
          src=${x(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};nt.styles=tt,a([w()],nt.prototype,"hasFocus",2),a([c(".icon-button")],nt.prototype,"button",2),a([d()],nt.prototype,"name",2),a([d()],nt.prototype,"library",2),a([d()],nt.prototype,"src",2),a([d()],nt.prototype,"href",2),a([d()],nt.prototype,"target",2),a([d()],nt.prototype,"download",2),a([d()],nt.prototype,"label",2),a([d({type:Boolean,reflect:!0})],nt.prototype,"disabled",2),nt=a([u("sl-icon-button")],nt);var at=r`
  ${n}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button${G} {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label ::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text${G}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    transform: translateY(-50%) translateX(-50%);
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,lt=class extends Event{constructor(t){super("formdata"),this.formData=t}},ct=class extends FormData{constructor(t){var e=(...t)=>{super(...t)};t?(e(t),this.form=t,t.dispatchEvent(new lt(this))):e()}append(t,e){if(!this.form)return super.append(t,e);let o=this.form.elements[t];if(o||(o=document.createElement("input"),o.type="hidden",o.name=t,this.form.appendChild(o)),this.has(t)){const i=this.getAll(t),s=i.indexOf(o.value);-1!==s&&i.splice(s,1),i.push(e),this.set(t,i)}else super.append(t,e);o.value=e}};function dt(){window.FormData&&!function(){const t=document.createElement("form");let e=!1;return document.body.append(t),t.addEventListener("submit",(t=>{new FormData(t.target),t.preventDefault()})),t.addEventListener("formdata",(()=>e=!0)),t.dispatchEvent(new Event("submit",{cancelable:!0})),t.remove(),e}()&&(window.FormData=ct,window.addEventListener("submit",(t=>{t.defaultPrevented||new FormData(t.target)})))}"complete"===document.readyState?dt():window.addEventListener("DOMContentLoaded",(()=>dt()));var ut=new WeakMap,ht=class{constructor(t,e){(this.host=t).addController(this),this.options=s({form:t=>t.closest("form"),name:t=>t.name,value:t=>t.value,disabled:t=>t.disabled,reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity()},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this)}hostConnected(){this.form=this.options.form(this.host),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),ut.has(this.form)||(ut.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),ut.has(this.form)&&(this.form.reportValidity=ut.get(this.form),ut.delete(this.form)),this.form=void 0)}handleFormData(t){const e=this.options.disabled(this.host),o=this.options.name(this.host),i=this.options.value(this.host);e||"string"!=typeof o||void 0===i||(Array.isArray(i)?i.forEach((e=>{t.formData.append(o,e.toString())})):t.formData.append(o,i.toString()))}handleFormSubmit(t){const e=this.options.disabled(this.host);!this.form||this.form.noValidate||e||(0,this.options.reportValidity)(this.host)||(t.preventDefault(),t.stopImmediatePropagation())}reportFormValidity(){if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0}submit(t){if(this.form){const e=document.createElement("button");e.type="submit",e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.clipPath="inset(50%)",e.style.overflow="hidden",e.style.whiteSpace="nowrap",t&&["formaction","formmethod","formnovalidate","formtarget"].forEach((o=>{t.hasAttribute(o)&&e.setAttribute(o,t.getAttribute(o))})),this.form.append(e),e.click(),e.remove()}}},pt=class extends h{constructor(){super(...arguments),this.formSubmitController=new ht(this,{form:t=>{if(t.hasAttribute("form")){const e=t.getRootNode(),o=t.getAttribute("form");return e.getElementById(o)}return t.closest("form")}}),this.hasSlotController=new p(this,"[default]","prefix","suffix"),this.localize=new J(this),this.hasFocus=!1,this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button"}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,f(this,"sl-blur")}handleFocus(){this.hasFocus=!0,f(this,"sl-focus")}handleClick(t){if(this.disabled||this.loading)return t.preventDefault(),void t.stopPropagation();"submit"===this.type&&this.formSubmitController.submit(this)}render(){const t=!!this.href,e=t?it`a`:it`button`;return rt`
      <${e}
        part="base"
        class=${g({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${x(t?void 0:this.disabled)}
        type=${x(t?void 0:this.type)}
        name=${x(t?void 0:this.name)}
        value=${x(t?void 0:this.value)}
        href=${x(t?this.href:void 0)}
        target=${x(t?this.target:void 0)}
        download=${x(t?this.download:void 0)}
        rel=${x(t&&this.target?"noreferrer noopener":void 0)}
        role=${x(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${this.caret?rt`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `:""}
        ${this.loading?rt`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};pt.styles=at,a([c(".button")],pt.prototype,"button",2),a([w()],pt.prototype,"hasFocus",2),a([d({reflect:!0})],pt.prototype,"variant",2),a([d({reflect:!0})],pt.prototype,"size",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"caret",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"disabled",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"loading",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"outline",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"pill",2),a([d({type:Boolean,reflect:!0})],pt.prototype,"circle",2),a([d()],pt.prototype,"type",2),a([d()],pt.prototype,"name",2),a([d()],pt.prototype,"value",2),a([d()],pt.prototype,"href",2),a([d()],pt.prototype,"target",2),a([d()],pt.prototype,"download",2),a([d()],pt.prototype,"form",2),a([d({attribute:"formaction"})],pt.prototype,"formAction",2),a([d({attribute:"formmethod"})],pt.prototype,"formMethod",2),a([d({attribute:"formnovalidate",type:Boolean})],pt.prototype,"formNoValidate",2),a([d({attribute:"formtarget"})],pt.prototype,"formTarget",2),pt=a([u("sl-button")],pt);var bt=r`
  ${n}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,ft=class extends h{render(){return m`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};function mt(t){const e=t.tagName.toLowerCase();return"-1"!==t.getAttribute("tabindex")&&!t.hasAttribute("disabled")&&(!t.hasAttribute("aria-disabled")||"false"===t.getAttribute("aria-disabled"))&&!("input"===e&&"radio"===t.getAttribute("type")&&!t.hasAttribute("checked"))&&null!==t.offsetParent&&"hidden"!==window.getComputedStyle(t).visibility&&(!("audio"!==e&&"video"!==e||!t.hasAttribute("controls"))||!!t.hasAttribute("tabindex")||!(!t.hasAttribute("contenteditable")||"false"===t.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(e))}function gt(t){var e,o;const i=[];return function t(e){e instanceof HTMLElement&&(i.push(e),null!==e.shadowRoot&&"open"===e.shadowRoot.mode&&t(e.shadowRoot)),[...e.querySelectorAll("*")].forEach((e=>t(e)))}(t),{start:null!=(e=i.find((t=>mt(t))))?e:null,end:null!=(o=i.reverse().find((t=>mt(t))))?o:null}}ft.styles=bt,ft=a([u("sl-spinner")],ft);var vt=[],wt=new Set;function xt(t){wt.add(t),document.body.classList.add("sl-scroll-lock")}function yt(t){wt.delete(t),0===wt.size&&document.body.classList.remove("sl-scroll-lock")}var _t=r`
  ${n}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
    transform: none;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .dialog__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }
`,kt=class extends h{constructor(){super(...arguments),this.hasSlotController=new p(this,"footer"),this.localize=new J(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new class{constructor(t){this.tabDirection="forward",this.element=t,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){vt.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){vt=vt.filter((t=>t!==this.element)),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return vt[vt.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){const{start:t,end:e}=gt(this.element),o="forward"===this.tabDirection?t:e;"function"==typeof(null==o?void 0:o.focus)&&o.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(t){"Tab"===t.key&&t.shiftKey&&(this.tabDirection="backward"),requestAnimationFrame((()=>this.checkFocus()))}handleKeyUp(){this.tabDirection="forward"}}(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.modal.activate(),xt(this))}disconnectedCallback(){super.disconnectedCallback(),yt(this)}async show(){if(!this.open)return this.open=!0,b(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,b(this,"sl-after-hide")}requestClose(t){if(f(this,"sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=I(this,"dialog.denyClose",{dir:this.localize.dir()});P(this.panel,t.keyframes,t.options)}else this.hide()}handleKeyDown(t){"Escape"===t.key&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){f(this,"sl-show"),this.originalTrigger=document.activeElement,this.modal.activate(),xt(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([U(this.dialog),U(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame((()=>{f(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const e=I(this,"dialog.show",{dir:this.localize.dir()}),o=I(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([P(this.panel,e.keyframes,e.options),P(this.overlay,o.keyframes,o.options)]),f(this,"sl-after-show")}else{f(this,"sl-hide"),this.modal.deactivate(),await Promise.all([U(this.dialog),U(this.overlay)]);const t=I(this,"dialog.hide",{dir:this.localize.dir()}),e=I(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([P(this.panel,t.keyframes,t.options),P(this.overlay,e.keyframes,e.options)]),this.dialog.hidden=!0,yt(this);const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout((()=>o.focus())),f(this,"sl-after-hide")}}render(){return m`
      <div
        part="base"
        class=${g({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${x(this.noHeader?this.label:void 0)}
          aria-labelledby=${x(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":m`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${()=>this.requestClose("close-button")}"
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};kt.styles=_t,a([c(".dialog")],kt.prototype,"dialog",2),a([c(".dialog__panel")],kt.prototype,"panel",2),a([c(".dialog__overlay")],kt.prototype,"overlay",2),a([d({type:Boolean,reflect:!0})],kt.prototype,"open",2),a([d({reflect:!0})],kt.prototype,"label",2),a([d({attribute:"no-header",type:Boolean,reflect:!0})],kt.prototype,"noHeader",2),a([l("open",{waitUntilFirstUpdate:!0})],kt.prototype,"handleOpenChange",1),kt=a([u("sl-dialog")],kt),N("dialog.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}}),N("dialog.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}}),N("dialog.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.02)"},{transform:"scale(1)"}],options:{duration:250}}),N("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),N("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var $t=r`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }
`,zt=r`
  ${n}
  ${$t}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    padding-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    padding-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    padding-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }
`,Ct={},At=y(class extends _{constructor(t){if(super(t),t.type!==k.PROPERTY&&t.type!==k.ATTRIBUTE&&t.type!==k.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===$||e===z)return e;const o=t.element,i=t.name;if(t.type===k.PROPERTY){if(e===o[i])return $}else if(t.type===k.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(i))return $}else if(t.type===k.ATTRIBUTE&&o.getAttribute(i)===e+"")return $;return((t,e=Ct)=>{t._$AH=e})(t),e}}),St=class extends h{constructor(){super(...arguments),this.formSubmitController=new ht(this),this.hasSlotController=new p(this,"help-text","label"),this.localize=new J(this),this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsDate)?e:null}set valueAsDate(t){this.input.valueAsDate=t,this.value=this.input.value}get valueAsNumber(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsNumber)?e:parseFloat(this.value)}set valueAsNumber(t){this.input.valueAsNumber=t,this.value=this.input.value}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,i="preserve"){this.input.setRangeText(t,e,o,i),this.value!==this.input.value&&(this.value=this.input.value,f(this,"sl-input"),f(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,f(this,"sl-blur")}handleChange(){this.value=this.input.value,f(this,"sl-change")}handleClearClick(t){this.value="",f(this,"sl-clear"),f(this,"sl-input"),f(this,"sl-change"),this.input.focus(),t.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,f(this,"sl-focus")}handleInput(){this.value=this.input.value,f(this,"sl-input")}handleInvalid(){this.invalid=!0}handleKeyDown(t){"Enter"!==t.key||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||setTimeout((()=>{t.defaultPrevented||this.formSubmitController.submit()}))}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=this.clearable&&!this.disabled&&!this.readonly&&this.value.length>0;return m`
      <div
        part="form-control"
        class=${g({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${g({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--invalid":this.invalid})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.isPasswordVisible?"text":this.type}
              name=${x(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${x(this.placeholder)}
              minlength=${x(this.minlength)}
              maxlength=${x(this.maxlength)}
              min=${x(this.min)}
              max=${x(this.max)}
              step=${x(this.step)}
              .value=${At(this.value)}
              autocapitalize=${x(this.autocapitalize)}
              autocomplete=${x(this.autocomplete)}
              autocorrect=${x(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${x(this.spellcheck)}
              pattern=${x(this.pattern)}
              enterkeyhint=${x(this.enterkeyhint)}
              inputmode=${x(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid?"true":"false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?m`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.togglePassword&&!this.disabled?m`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.isPasswordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.isPasswordVisible?m`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:m`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};St.styles=zt,a([c(".input__control")],St.prototype,"input",2),a([w()],St.prototype,"hasFocus",2),a([w()],St.prototype,"isPasswordVisible",2),a([d({reflect:!0})],St.prototype,"type",2),a([d({reflect:!0})],St.prototype,"size",2),a([d()],St.prototype,"name",2),a([d()],St.prototype,"value",2),a([d({type:Boolean,reflect:!0})],St.prototype,"filled",2),a([d({type:Boolean,reflect:!0})],St.prototype,"pill",2),a([d()],St.prototype,"label",2),a([d({attribute:"help-text"})],St.prototype,"helpText",2),a([d({type:Boolean})],St.prototype,"clearable",2),a([d({attribute:"toggle-password",type:Boolean})],St.prototype,"togglePassword",2),a([d()],St.prototype,"placeholder",2),a([d({type:Boolean,reflect:!0})],St.prototype,"disabled",2),a([d({type:Boolean,reflect:!0})],St.prototype,"readonly",2),a([d({type:Number})],St.prototype,"minlength",2),a([d({type:Number})],St.prototype,"maxlength",2),a([d()],St.prototype,"min",2),a([d()],St.prototype,"max",2),a([d({type:Number})],St.prototype,"step",2),a([d()],St.prototype,"pattern",2),a([d({type:Boolean,reflect:!0})],St.prototype,"required",2),a([d({type:Boolean,reflect:!0})],St.prototype,"invalid",2),a([d()],St.prototype,"autocapitalize",2),a([d()],St.prototype,"autocorrect",2),a([d()],St.prototype,"autocomplete",2),a([d({type:Boolean})],St.prototype,"autofocus",2),a([d()],St.prototype,"enterkeyhint",2),a([d({type:Boolean})],St.prototype,"spellcheck",2),a([d()],St.prototype,"inputmode",2),a([l("disabled",{waitUntilFirstUpdate:!0})],St.prototype,"handleDisabledChange",1),a([l("value",{waitUntilFirstUpdate:!0})],St.prototype,"handleValueChange",1),St=a([u("sl-input")],St);var Dt=r`
  ${n}
  ${$t}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }
`,Bt=class extends h{constructor(){super(...arguments),this.formSubmitController=new ht(this),this.hasSlotController=new p(this,"help-text","label"),this.hasFocus=!1,this.size="medium",this.value="",this.filled=!1,this.label="",this.helpText="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.setTextareaHeight())),this.updateComplete.then((()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)}))}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){return t?("number"==typeof t.top&&(this.input.scrollTop=t.top),void("number"==typeof t.left&&(this.input.scrollLeft=t.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,i="preserve"){this.input.setRangeText(t,e,o,i),this.value!==this.input.value&&(this.value=this.input.value,f(this,"sl-input")),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight(),f(this,"sl-input"),f(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,f(this,"sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),f(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,f(this,"sl-focus")}handleInput(){this.value=this.input.value,this.setTextareaHeight(),f(this,"sl-input")}handleRowsChange(){this.setTextareaHeight()}handleValueChange(){this.invalid=!this.input.checkValidity()}setTextareaHeight(){"auto"===this.resize?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e;return m`
      <div
        part="form-control"
        class=${g({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${g({textarea:!0,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--invalid":this.invalid,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${x(this.name)}
              .value=${At(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${x(this.placeholder)}
              rows=${x(this.rows)}
              minlength=${x(this.minlength)}
              maxlength=${x(this.maxlength)}
              autocapitalize=${x(this.autocapitalize)}
              autocorrect=${x(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${x(this.spellcheck)}
              enterkeyhint=${x(this.enterkeyhint)}
              inputmode=${x(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Bt.styles=Dt,a([c(".textarea__control")],Bt.prototype,"input",2),a([w()],Bt.prototype,"hasFocus",2),a([d({reflect:!0})],Bt.prototype,"size",2),a([d()],Bt.prototype,"name",2),a([d()],Bt.prototype,"value",2),a([d({type:Boolean,reflect:!0})],Bt.prototype,"filled",2),a([d()],Bt.prototype,"label",2),a([d({attribute:"help-text"})],Bt.prototype,"helpText",2),a([d()],Bt.prototype,"placeholder",2),a([d({type:Number})],Bt.prototype,"rows",2),a([d()],Bt.prototype,"resize",2),a([d({type:Boolean,reflect:!0})],Bt.prototype,"disabled",2),a([d({type:Boolean,reflect:!0})],Bt.prototype,"readonly",2),a([d({type:Number})],Bt.prototype,"minlength",2),a([d({type:Number})],Bt.prototype,"maxlength",2),a([d({type:Boolean,reflect:!0})],Bt.prototype,"required",2),a([d({type:Boolean,reflect:!0})],Bt.prototype,"invalid",2),a([d()],Bt.prototype,"autocapitalize",2),a([d()],Bt.prototype,"autocorrect",2),a([d()],Bt.prototype,"autocomplete",2),a([d({type:Boolean})],Bt.prototype,"autofocus",2),a([d()],Bt.prototype,"enterkeyhint",2),a([d({type:Boolean})],Bt.prototype,"spellcheck",2),a([d()],Bt.prototype,"inputmode",2),a([l("disabled",{waitUntilFirstUpdate:!0})],Bt.prototype,"handleDisabledChange",1),a([l("rows",{waitUntilFirstUpdate:!0})],Bt.prototype,"handleRowsChange",1),a([l("value",{waitUntilFirstUpdate:!0})],Bt.prototype,"handleValueChange",1),Bt=a([u("sl-textarea")],Bt);const Ft=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,Tt=class{constructor(e){t(this,e),this.show=!1}showChanged(){console.log(`show=${this.show}`),this.show?this.showContactForm():this.hideContactForm()}componentDidLoad(){this.contactDialog=this.el.shadowRoot.querySelector(".contact-dialog"),this.from=this.el.shadowRoot.getElementById("from"),this.message=this.el.shadowRoot.getElementById("message"),this.emailAlert=this.el.shadowRoot.getElementById("bad-email-alert"),this.noMessageAlert=this.el.shadowRoot.getElementById("no-message-alert"),this.contactDialog.addEventListener("sl-hide",(()=>this.show=!1)),this.show&&this.showContactForm()}hideContactForm(){this.contactDialog.hide(),this.from.value="",this.message.value="",this.emailAlert.hide(),this.noMessageAlert.hide()}showContactForm(){console.log("showContactForm"),this.contactDialog.show()}async sendmail(){let t=Ft.test(this.from.value);t?this.emailAlert.hide():this.emailAlert.show();let e=this.message.value.trim().length>0;if(e?this.noMessageAlert.hide():this.noMessageAlert.show(),t&&e){let t={to:this.contact,from:this.from.value,subject:"Contact Us",message:this.message.value};this.hideContactForm();let e=await fetch("https://api.visual-essays.net/sendmail/",{method:"POST",body:JSON.stringify(t)});e.ok&&console.log(await e.json())}}render(){return[e("sl-dialog",{label:"Contact Us",class:"contact-dialog"},e("sl-input",{id:"from",autofocus:!0,type:"email",label:"Email address"}),e("sl-alert",{id:"bad-email-alert",variant:"danger"},e("sl-icon",{slot:"icon",name:"exclamation-octagon"}),e("strong",null,"Invalid email address"),e("br",null),"Please fix and resubmit"),e("sl-textarea",{id:"message",label:"Message"}),e("sl-alert",{id:"no-message-alert",variant:"danger"},e("sl-icon",{slot:"icon",name:"exclamation-octagon"}),e("strong",null,"No message entered"),e("br",null)),e("sl-button",{id:"cancel",slot:"footer",onClick:this.hideContactForm.bind(this)},"Cancel"),e("sl-button",{slot:"footer",variant:"primary",onClick:this.sendmail.bind(this)},"Submit"))]}get el(){return o(this)}static get watchers(){return{show:["showChanged"]}}};function Pt(t){return t.split("-")[0]}function Ot(t){return t.split("-")[1]}function Ut(t){return["top","bottom"].includes(Pt(t))?"x":"y"}function Et(t){return"y"===t?"height":"width"}function Mt(t,e,o){let{reference:i,floating:s}=t;const r=i.x+i.width/2-s.width/2,n=i.y+i.height/2-s.height/2,a=Ut(e),l=Et(a),c=i[l]/2-s[l]/2,d="x"===a;let u;switch(Pt(e)){case"top":u={x:r,y:i.y-s.height};break;case"bottom":u={x:r,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:n};break;case"left":u={x:i.x-s.width,y:n};break;default:u={x:i.x,y:i.y}}switch(Ot(e)){case"start":u[a]-=c*(o&&d?-1:1);break;case"end":u[a]+=c*(o&&d?-1:1)}return u}function Rt(t){return"number"!=typeof t?s({top:0,right:0,bottom:0,left:0},t):{top:t,right:t,bottom:t,left:t}}function Nt(t){return i(s({},t),{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}async function It(t,e){var o;void 0===e&&(e={});const{x:r,y:n,platform:a,rects:l,elements:c,strategy:d}=t,{boundary:u="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:b=!1,padding:f=0}=e,m=Rt(f),g=c[b?"floating"===p?"reference":"floating":p],v=Nt(await a.getClippingRect({element:null==(o=await(null==a.isElement?void 0:a.isElement(g)))||o?g:g.contextElement||await(null==a.getDocumentElement?void 0:a.getDocumentElement(c.floating)),boundary:u,rootBoundary:h,strategy:d})),w=Nt(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({rect:"floating"===p?i(s({},l.floating),{x:r,y:n}):l.reference,offsetParent:await(null==a.getOffsetParent?void 0:a.getOffsetParent(c.floating)),strategy:d}):l[p]);return{top:v.top-w.top+m.top,bottom:w.bottom-v.bottom+m.bottom,left:v.left-w.left+m.left,right:w.right-v.right+m.right}}Tt.style=":host{z-index:2}#message{margin-top:24px}";var jt=Math.min,Ht=Math.max;function Lt(t,e,o){return Ht(t,jt(e,o))}var qt={left:"right",right:"left",bottom:"top",top:"bottom"};function Vt(t){return t.replace(/left|right|bottom|top/g,(t=>qt[t]))}var Kt={start:"end",end:"start"};function Wt(t){return t.replace(/start|end/g,(t=>Kt[t]))}["top","right","bottom","left"].reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]);var Jt=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:i,middlewareData:s,rects:r,initialPlacement:n,platform:a,elements:l}=e,c=t,{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:h,fallbackStrategy:p="bestFit",flipAlignment:b=!0}=c,f=C(c,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","flipAlignment"]),m=Pt(i),g=[n,...h||(m!==n&&b?function(t){const e=Vt(t);return[Wt(t),e,Wt(e)]}(n):[Vt(n)])],v=await It(e,f),w=[];let x=(null==(o=s.flip)?void 0:o.overflows)||[];if(d&&w.push(v[m]),u){const{main:t,cross:e}=function(t,e,o){void 0===o&&(o=!1);const i=Ot(t),s=Ut(t),r=Et(s);let n="x"===s?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[r]>e.floating[r]&&(n=Vt(n)),{main:n,cross:Vt(n)}}(i,r,await(null==a.isRTL?void 0:a.isRTL(l.floating)));w.push(v[t],v[e])}if(x=[...x,{placement:i,overflows:w}],!w.every((t=>t<=0))){var y,_;const t=(null!=(y=null==(_=s.flip)?void 0:_.index)?y:0)+1,e=g[t];if(e)return{data:{index:t,overflows:x},reset:{placement:e}};let o="bottom";switch(p){case"bestFit":{var k;const t=null==(k=x.map((t=>[t,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:k[0].placement;t&&(o=t);break}case"initialPlacement":o=n}if(i!==o)return{reset:{placement:o}}}return{}}}},Xt=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:i}=e,r=await async function(t,e){const{placement:o,platform:i,elements:r}=t,n=await(null==i.isRTL?void 0:i.isRTL(r.floating)),a=Pt(o),l=Ot(o),c="x"===Ut(o),d=["left","top"].includes(a)?-1:1,u=n&&c?-1:1,h="function"==typeof e?e(t):e;let{mainAxis:p,crossAxis:b,alignmentAxis:f}="number"==typeof h?{mainAxis:h,crossAxis:0,alignmentAxis:null}:s({mainAxis:0,crossAxis:0,alignmentAxis:null},h);return l&&"number"==typeof f&&(b="end"===l?-1*f:f),c?{x:b*u,y:p*d}:{x:p*d,y:b*u}}(e,t);return{x:o+r.x,y:i+r.y,data:r}}}},Qt=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:n}=e,a=t,{mainAxis:l=!0,crossAxis:c=!1,limiter:d={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}}}=a,u=C(a,["mainAxis","crossAxis","limiter"]),h={x:o,y:r},p=await It(e,u),b=Ut(Pt(n)),f="x"===b?"y":"x";let m=h[b],g=h[f];l&&(m=Lt(m+p["y"===b?"top":"left"],m,m-p["y"===b?"bottom":"right"])),c&&(g=Lt(g+p["y"===f?"top":"left"],g,g-p["y"===f?"bottom":"right"]));const v=d.fn(i(s({},e),{[b]:m,[f]:g}));return i(s({},v),{data:{x:v.x-o,y:v.y-r}})}}};function Yt(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function Zt(t){if(null==t)return window;if(!Yt(t)){const e=t.ownerDocument;return e&&e.defaultView||window}return t}function Gt(t){return Zt(t).getComputedStyle(t)}function te(t){return Yt(t)?"":t?(t.nodeName||"").toLowerCase():""}function ee(){const t=navigator.userAgentData;return null!=t&&t.brands?t.brands.map((t=>t.brand+"/"+t.version)).join(" "):navigator.userAgent}function oe(t){return t instanceof Zt(t).HTMLElement}function ie(t){return t instanceof Zt(t).Element}function se(t){return"undefined"!=typeof ShadowRoot&&(t instanceof Zt(t).ShadowRoot||t instanceof ShadowRoot)}function re(t){const{overflow:e,overflowX:o,overflowY:i}=Gt(t);return/auto|scroll|overlay|hidden/.test(e+i+o)}function ne(t){return["table","td","th"].includes(te(t))}function ae(t){const e=/firefox/i.test(ee()),o=Gt(t);return"none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||["transform","perspective"].includes(o.willChange)||e&&"filter"===o.willChange||e&&!!o.filter&&"none"!==o.filter}function le(){return!/^((?!chrome|android).)*safari/i.test(ee())}var ce=Math.min,de=Math.max,ue=Math.round;function he(t,e,o){var i,s,r,n;void 0===e&&(e=!1),void 0===o&&(o=!1);const a=t.getBoundingClientRect();let l=1,c=1;e&&oe(t)&&(l=t.offsetWidth>0&&ue(a.width)/t.offsetWidth||1,c=t.offsetHeight>0&&ue(a.height)/t.offsetHeight||1);const d=ie(t)?Zt(t):window,u=!le()&&o,h=(a.left+(u&&null!=(i=null==(s=d.visualViewport)?void 0:s.offsetLeft)?i:0))/l,p=(a.top+(u&&null!=(r=null==(n=d.visualViewport)?void 0:n.offsetTop)?r:0))/c,b=a.width/l,f=a.height/c;return{width:b,height:f,top:p,right:h+b,bottom:p+f,left:h,x:h,y:p}}function pe(t){return(e=t,(e instanceof Zt(e).Node?t.ownerDocument:t.document)||window.document).documentElement;var e}function be(t){return ie(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function fe(t){return he(pe(t)).left+be(t).scrollLeft}function me(t,e,o){const i=oe(e),s=pe(e),r=he(t,i&&function(t){const e=he(t);return ue(e.width)!==t.offsetWidth||ue(e.height)!==t.offsetHeight}(e),"fixed"===o);let n={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if(i||!i&&"fixed"!==o)if(("body"!==te(e)||re(s))&&(n=be(e)),oe(e)){const t=he(e,!0);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else s&&(a.x=fe(s));return{x:r.left+n.scrollLeft-a.x,y:r.top+n.scrollTop-a.y,width:r.width,height:r.height}}function ge(t){return"html"===te(t)?t:t.assignedSlot||t.parentNode||(se(t)?t.host:null)||pe(t)}function ve(t){return oe(t)&&"fixed"!==getComputedStyle(t).position?t.offsetParent:null}function we(t){const e=Zt(t);let o=ve(t);for(;o&&ne(o)&&"static"===getComputedStyle(o).position;)o=ve(o);return o&&("html"===te(o)||"body"===te(o)&&"static"===getComputedStyle(o).position&&!ae(o))?e:o||function(t){let e=ge(t);for(se(e)&&(e=e.host);oe(e)&&!["html","body"].includes(te(e));){if(ae(e))return e;e=e.parentNode}return null}(t)||e}function xe(t){if(oe(t))return{width:t.offsetWidth,height:t.offsetHeight};const e=he(t);return{width:e.width,height:e.height}}function ye(t){const e=ge(t);return["html","body","#document"].includes(te(e))?t.ownerDocument.body:oe(e)&&re(e)?e:ye(e)}function _e(t,e){var o;void 0===e&&(e=[]);const i=ye(t),s=i===(null==(o=t.ownerDocument)?void 0:o.body),r=Zt(i),n=s?[r].concat(r.visualViewport||[],re(i)?i:[]):i,a=e.concat(n);return s?a:a.concat(_e(n))}function ke(t,e,o){return"viewport"===e?Nt(function(t,e){const o=Zt(t),i=pe(t),s=o.visualViewport;let r=i.clientWidth,n=i.clientHeight,a=0,l=0;if(s){r=s.width,n=s.height;const t=le();(t||!t&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}return{width:r,height:n,x:a,y:l}}(t,o)):ie(e)?function(t,e){const o=he(t,!1,"fixed"===e),i=o.top+t.clientTop,s=o.left+t.clientLeft;return{top:i,left:s,x:s,y:i,right:s+t.clientWidth,bottom:i+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}(e,o):Nt(function(t){var e;const o=pe(t),i=be(t),s=null==(e=t.ownerDocument)?void 0:e.body,r=de(o.scrollWidth,o.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),n=de(o.scrollHeight,o.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0);let a=-i.scrollLeft+fe(t);const l=-i.scrollTop;return"rtl"===Gt(s||o).direction&&(a+=de(o.clientWidth,s?s.clientWidth:0)-r),{width:r,height:n,x:a,y:l}}(pe(t)))}function $e(t){const e=_e(t),o=["absolute","fixed"].includes(Gt(t).position)&&oe(t)?we(t):t;return ie(o)?e.filter((t=>ie(t)&&function(t,e){const o=null==e.getRootNode?void 0:e.getRootNode();if(t.contains(e))return!0;if(o&&se(o)){let o=e;do{if(o&&t===o)return!0;o=o.parentNode||o.host}while(o)}return!1}(t,o)&&"body"!==te(t))):[]}var ze={getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:i,strategy:s}=t;const r=[..."clippingAncestors"===o?$e(e):[].concat(o),i],n=r.reduce(((t,o)=>{const i=ke(e,o,s);return t.top=de(i.top,t.top),t.right=ce(i.right,t.right),t.bottom=ce(i.bottom,t.bottom),t.left=de(i.left,t.left),t}),ke(e,r[0],s));return{width:n.right-n.left,height:n.bottom-n.top,x:n.left,y:n.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:r}=t;const n=oe(o),a=pe(o);if(o===a)return e;let l={scrollLeft:0,scrollTop:0};const c={x:0,y:0};if((n||!n&&"fixed"!==r)&&(("body"!==te(o)||re(a))&&(l=be(o)),oe(o))){const t=he(o,!0);c.x=t.x+o.clientLeft,c.y=t.y+o.clientTop}return i(s({},e),{x:e.x-l.scrollLeft+c.x,y:e.y-l.scrollTop+c.y})},isElement:ie,getDimensions:xe,getOffsetParent:we,getDocumentElement:pe,getElementRects:t=>{let{reference:e,floating:o,strategy:r}=t;return{reference:me(e,we(o),r),floating:i(s({},xe(o)),{x:0,y:0})}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===Gt(t).direction};function Ce(t,e,o,i){void 0===i&&(i={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n=!0,animationFrame:a=!1}=i,l=s&&!a,c=r&&!a,d=l||c?[...ie(t)?_e(t):[],..._e(e)]:[];d.forEach((t=>{l&&t.addEventListener("scroll",o,{passive:!0}),c&&t.addEventListener("resize",o)}));let u,h=null;n&&(h=new ResizeObserver(o),ie(t)&&!a&&h.observe(t),h.observe(e));let p=a?he(t):null;return a&&function e(){const i=he(t);!p||i.x===p.x&&i.y===p.y&&i.width===p.width&&i.height===p.height||o(),p=i,u=requestAnimationFrame(e)}(),n||o(),()=>{var t;d.forEach((t=>{l&&t.removeEventListener("scroll",o),c&&t.removeEventListener("resize",o)})),null==(t=h)||t.disconnect(),h=null,a&&cancelAnimationFrame(u)}}var Ae=(t,e,o)=>(async(t,e,o)=>{const{placement:r="bottom",strategy:n="absolute",middleware:a=[],platform:l}=o,c=await(null==l.isRTL?void 0:l.isRTL(e));let d=await l.getElementRects({reference:t,floating:e,strategy:n}),{x:u,y:h}=Mt(d,r,c),p=r,b={};for(let o=0;o<a.length;o++){const{name:f,fn:m}=a[o],{x:g,y:v,data:w,reset:x}=await m({x:u,y:h,initialPlacement:r,placement:p,strategy:n,middlewareData:b,rects:d,platform:l,elements:{reference:t,floating:e}});u=null!=g?g:u,h=null!=v?v:h,b=i(s({},b),{[f]:s(s({},b[f]),w)}),x&&("object"==typeof x&&(x.placement&&(p=x.placement),x.rects&&(d=!0===x.rects?await l.getElementRects({reference:t,floating:e,strategy:n}):x.rects),({x:u,y:h}=Mt(d,p,c))),o=-1)}return{x:u,y:h,placement:p,strategy:n,middlewareData:b}})(t,e,s({platform:ze},o)),Se=r`
  ${n}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`,De=class extends h{constructor(){super(...arguments),this.localize=new J(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}async firstUpdated(){this.panel.hidden=!this.open,this.open&&(await this.updateComplete,this.addOpenListeners(),this.startPositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide(),this.stopPositioner()}focusOnTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleDocumentKeyDown(t){var e;if("Escape"===t.key)return this.hide(),void this.focusOnTrigger();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,e,o;const i=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(o=null==(e=document.activeElement)?void 0:e.shadowRoot)?void 0:o.activeElement:document.activeElement;this.containingElement&&(null==i?void 0:i.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(t){const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){!function(t,e,o="vertical",i="smooth"){const s=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),r=s.top+e.scrollTop,n=s.left+e.scrollLeft,a=e.scrollLeft+e.offsetWidth,l=e.scrollTop,c=e.scrollTop+e.offsetHeight;"horizontal"!==o&&"both"!==o||(n<e.scrollLeft?e.scrollTo({left:n,behavior:i}):n+t.clientWidth>a&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:i})),"vertical"!==o&&"both"!==o||(r<l?e.scrollTo({top:r,behavior:i}):r+t.clientHeight>c&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:i}))}(t.target,this.panel)}handlePanelSelect(t){this.stayOpenOnSelect||"sl-menu"!==t.target.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){this.updatePositioner()}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){if("Escape"===t.key)return this.focusOnTrigger(),void this.hide();if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const o=e.defaultSlot.assignedElements({flatten:!0}),i=o[0],s=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),o.length>0&&requestAnimationFrame((()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(i),i.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(s),s.focus())})));const r=["Tab","Shift","Meta","Ctrl","Alt"];this.open&&!r.includes(t.key)&&e.typeToSelect(t)}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find((t=>gt(t).start));let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,b(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,b(this,"sl-after-hide")}reposition(){this.updatePositioner()}addOpenListeners(){this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){f(this,"sl-show"),this.addOpenListeners(),await U(this),this.startPositioner(),this.panel.hidden=!1;const{keyframes:t,options:e}=I(this,"dropdown.show",{dir:this.localize.dir()});await P(this.panel,t,e),f(this,"sl-after-show")}else{f(this,"sl-hide"),this.removeOpenListeners(),await U(this);const{keyframes:t,options:e}=I(this,"dropdown.hide",{dir:this.localize.dir()});await P(this.panel,t,e),this.panel.hidden=!0,this.stopPositioner(),f(this,"sl-after-hide")}}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Ce(this.trigger,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){var t;this.open&&this.trigger&&this.positioner&&Ae(this.trigger,this.positioner,{placement:this.placement,middleware:[Xt({mainAxis:this.distance,crossAxis:this.skidding}),Jt(),Qt(),(t={apply:({availableWidth:t,availableHeight:e})=>{Object.assign(this.panel.style,{maxWidth:`${t}px`,maxHeight:`${e}px`})}},void 0===t&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:i,platform:r,elements:n}=e,a=t,{apply:l}=a,c=C(a,["apply"]),d=await It(e,c),u=Pt(o),h=Ot(o);let p,b;"top"===u||"bottom"===u?(p=u,b=h===(await(null==r.isRTL?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(b=u,p="end"===h?"top":"bottom");const f=Ht(d.left,0),m=Ht(d.right,0),g=Ht(d.top,0),v=Ht(d.bottom,0),w={availableHeight:i.floating.height-(["left","right"].includes(o)?2*(0!==g||0!==v?g+v:Ht(d.top,d.bottom)):d[p]),availableWidth:i.floating.width-(["top","bottom"].includes(o)?2*(0!==f||0!==m?f+m:Ht(d.left,d.right)):d[b])},x=await r.getDimensions(n.floating);null==l||l(s(s({},e),w));const y=await r.getDimensions(n.floating);return x.width!==y.width||x.height!==y.height?{reset:{rects:!0}}:{}}})],strategy:this.hoist?"fixed":"absolute"}).then((({x:t,y:e,placement:o})=>{this.positioner.setAttribute("data-placement",o),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${e}px`})}))}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return m`
      <div
        part="base"
        id="dropdown"
        class=${g({dropdown:!0,"dropdown--open":this.open})}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open?"false":"true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `}};De.styles=Se,a([c(".dropdown__trigger")],De.prototype,"trigger",2),a([c(".dropdown__panel")],De.prototype,"panel",2),a([c(".dropdown__positioner")],De.prototype,"positioner",2),a([d({type:Boolean,reflect:!0})],De.prototype,"open",2),a([d({reflect:!0})],De.prototype,"placement",2),a([d({type:Boolean,reflect:!0})],De.prototype,"disabled",2),a([d({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],De.prototype,"stayOpenOnSelect",2),a([d({attribute:!1})],De.prototype,"containingElement",2),a([d({type:Number})],De.prototype,"distance",2),a([d({type:Number})],De.prototype,"skidding",2),a([d({type:Boolean})],De.prototype,"hoist",2),a([l("distance"),l("hoist"),l("placement"),l("skidding")],De.prototype,"handlePopoverOptionsChange",1),a([l("open",{waitUntilFirstUpdate:!0})],De.prototype,"handleOpenChange",1),De=a([u("sl-dropdown")],De),N("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}}),N("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});var Be=r`
  ${n}

  :host {
    display: block;
  }

  .menu {
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    background: var(--sl-panel-background-color);
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Fe=class extends h{constructor(){super(...arguments),this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(t={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((e=>"menuitem"===e.getAttribute("role")&&!(!t.includeDisabled&&e.disabled)))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find((t=>"0"===t.getAttribute("tabindex")))}setCurrentItem(t){const e=this.getAllItems({includeDisabled:!1}),o=t.disabled?e[0]:t;e.forEach((t=>{t.setAttribute("tabindex",t===o?"0":"-1")}))}typeToSelect(t){var e;const o=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout((()=>this.typeToSelectString=""),1e3),"Backspace"===t.key?this.typeToSelectString=t.metaKey||t.ctrlKey?"":this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase(),Z||o.forEach((t=>t.classList.remove("sl-focus-invisible")));for(const t of o){const o=null==(e=t.shadowRoot)?void 0:e.querySelector("slot:not([name])");if(A(o).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(t),t.focus();break}}}handleClick(t){const e=t.target.closest("sl-menu-item");!1===(null==e?void 0:e.disabled)&&f(this,"sl-select",{detail:{item:e}})}handleKeyUp(){Z||this.getAllItems().forEach((t=>{t.classList.remove("sl-focus-invisible")}))}handleKeyDown(t){if("Enter"===t.key){const e=this.getCurrentItem();t.preventDefault(),null==e||e.click()}if(" "===t.key&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems({includeDisabled:!1}),o=this.getCurrentItem();let i=o?e.indexOf(o):0;if(e.length>0)return t.preventDefault(),"ArrowDown"===t.key?i++:"ArrowUp"===t.key?i--:"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),void e[i].focus()}this.typeToSelect(t)}handleMouseDown(t){const e=t.target;"menuitem"===e.getAttribute("role")&&(this.setCurrentItem(e),Z||e.classList.add("sl-focus-invisible"))}handleSlotChange(){const t=this.getAllItems({includeDisabled:!1});t.length>0&&this.setCurrentItem(t[0])}render(){return m`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Fe.styles=Be,a([c(".menu")],Fe.prototype,"menu",2),a([c("slot")],Fe.prototype,"defaultSlot",2),Fe=a([u("sl-menu")],Fe),S("/web-components");const Te={home:"house-fill",about:"info-circle-fill",contact:"envelope-fill"},Pe=class{constructor(e){t(this,e),this.height=300,this.position="center",this.navItems=[]}_manifestChanged(t,e){t!==e&&(this._imageInfo=D(this._manifest))}async _imageInfoChanged(t,e){t!==e&&(this._imgUrl=t.service?this._iiifUrl(t.service[0].id||t.service[0]["@id"],this.imageOptions):await B(t.id,this.imageOptions.region,{width:this.el.clientWidth,height:this.height}))}async _imgUrlChanged(t){this.el.style.backgroundImage=`url('${t}')`,this.el.style.backgroundPosition=this.position}_iiifUrl(t,e){return`${t.replace(/\/info.json$/,"")}/${e.region}/${e.size}/${e.rotation}/${e.quality}.${e.format}`}connectedCallback(){if(this.label){let t=document.querySelector("title");t||(t=document.createElement("title"),t.innerText=this.label,document.head.appendChild(t))}for(this.imageOptions=F(this.options),this.navItems=Array.from(this.el.querySelectorAll("li")).map((t=>"A"===t.firstChild.nodeName?{label:t.firstChild.textContent,href:t.firstChild.href}:{label:t.firstChild.textContent}));this.el.firstChild;)this.el.removeChild(this.el.firstChild)}componentDidLoad(){this.el.style.height=`${this.height}px`,this.sticky&&(this.el.classList.add("sticky"),document.querySelector("main").classList.add("sticky-header")),T(this.background).then((t=>this._manifest=t))}htmlToElem(t){return(new DOMParser).parseFromString(t,"text/html").children[0].children[1]}_showInfoPopup(){let t=this.el.shadowRoot.querySelector("#image-info-popup"),e=encodeURIComponent(JSON.stringify([{manifest:this._manifest}]));t.innerHTML=`<ve-manifest images="${e}" condensed></ve-manifest>`,t.style.display="block"===t.style.display?"none":"block"}menuItemSelected(t){if(console.log("menuItemSelected",t),0===t.label.toLowerCase().indexOf("contact")&&this.contact){let t=this.el.shadowRoot.querySelector("ve-contact");t.show=!t.show}else t.href&&(location.href=t.href)}navIcon(t){let e="",o=t.label.toLowerCase();return Object.keys(Te).forEach((t=>{o.indexOf(t)>=0&&(e=Te[t])})),e}render(){return[e("section",{class:"ve-header"},e("div",{class:"title-panel"},this.navItems.length>0&&e("nav",null,e("sl-dropdown",null,e("sl-button",{id:"menu-toggle",slot:"trigger",variant:"default",size:"medium",circle:!0},e("sl-icon",{name:"three-dots-vertical",label:"Navigation Meno"})),e("sl-menu",null,this.navItems.map((t=>e("sl-menu-item",{onClick:this.menuItemSelected.bind(this,t)},e("sl-icon",{slot:"prefix",name:this.navIcon(t),label:t.label}),t.label)))))),e("a",{href:"/"},e("div",{class:"title"},this.label)),e("div",{class:"subtitle"},this.subtitle),e("div",{id:"image-info-popup"}),e("div",{class:"title-buttons"},e("ve-search",{cx:"0a5115e988de8e8a9",filters:"16c:16c,17c:17c,18c:18c,19c:19c,20c:20c,21c:21c,austen:Jane Austen,canterbury:Canterbury,churches:Churches,dickens:Dickens",icon:!0,tooltip:"Click to search the site"}),e("sl-button",{id:"info-button",onClick:this._showInfoPopup.bind(this),title:"Image info"},e("sl-icon",{name:"info"}))))),e("ve-contact",{contact:this.contact})]}get el(){return o(this)}static get watchers(){return{_manifest:["_manifestChanged"],_imageInfo:["_imageInfoChanged"],_imgUrl:["_imgUrlChanged"]}}};Pe.style=":host{font-family:Roboto, sans-serif;display:block;font-size:1rem;width:100%;background-repeat:no-repeat;background-size:cover;background-position:center;position:relative;margin:0;z-index:3;margin-top:-1rem;color:#444;max-height:220px}:host ul{display:none}:host(.sticky){position:sticky;position:-webkit-sticky;top:-114px}.title-panel{display:flex;flex-direction:column;justify-content:center;gap:4px;font-family:Roboto, sans-serif;position:absolute;height:90px;background:rgba(0, 0, 0, 0.3);border-radius:3px;box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;color:white;padding:.5rem 3.2rem .5rem .5rem;font-weight:bold;left:0;bottom:0;right:0}.title-buttons{display:flex;flex-direction:row;position:absolute;right:20px}#info-button::part(base){background-color:white}#info-button{margin-left:10px}#info-button:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-search-button::part(base){background-color:white}.title,.subtitle{line-height:3rem}.title-panel a{text-decoration:none}.title,.subtitle{color:white}.title{font-size:1.6rem;line-height:1.8rem;padding-top:0}.subtitle{font-size:1.4rem;line-height:1.4rem}.ve-header{position:relative;height:100%}nav{display:inline-block;position:absolute;top:20px;right:12px;z-index:1;-webkit-user-select:none;user-select:none}sl-button::part(base){background-color:rgba(0, 0, 0, 0.2)}nav sl-icon{color:white;font-size:24px;font-weight:bold;cursor:pointer;padding-top:7px}nav sl-menu-item sl-icon{color:inherit;padding:0 6px 0 0;font-size:20px}nav sl-menu-item:hover sl-icon{color:inherit}#info-icon{position:absolute;font-family:serif;z-index:1;bottom:12px;right:19px;width:22px;height:22px;border-radius:50%;background-color:rgba(0, 0, 0, 0.3);color:white;text-align:center;line-height:1.4em;letter-spacing:-1px;font-weight:bold;cursor:pointer;border:2px solid rgba(255, 255, 255, 0.5)}#info-icon:hover{color:black;background-color:rgba(255, 255, 255, 0.7)}#image-info-popup{position:absolute;display:none;width:75%;max-width:300px;height:auto;max-height:500px;background:#fff;right:72px;top:8px;padding:6px;border:1px solid #444;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;overflow-y:scroll;z-index:10}:host #info-icon{visibility:hidden}:host(:hover) #info-icon{visibility:visible}@media (min-width: 481px){:host{max-height:300px}:host(.sticky){top:-158px}.title-panel{height:132px}.title-panel{height:120px;padding:1rem 5rem .5rem 2rem}nav{top:36px;right:24px}#info-icon{bottom:20px;right:31px}.title{font-size:2.5rem;line-height:2.6rem}.subtitle{font-size:2rem;line-height:2rem;min-height:1em}#menuToggle{top:28px}}";var Oe=r`
  ${n}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Ue=["sl-button","sl-radio-button"],Ee=class extends h{constructor(){super(...arguments),this.label=""}handleFocus(t){const e=Me(t.target);null==e||e.classList.add("sl-button-group__button--focus")}handleBlur(t){const e=Me(t.target);null==e||e.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){const e=Me(t.target);null==e||e.classList.add("sl-button-group__button--hover")}handleMouseOut(t){const e=Me(t.target);null==e||e.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const o=t.indexOf(e),i=Me(e);null!==i&&(i.classList.add("sl-button-group__button"),i.classList.toggle("sl-button-group__button--first",0===o),i.classList.toggle("sl-button-group__button--inner",o>0&&o<t.length-1),i.classList.toggle("sl-button-group__button--last",o===t.length-1))}))}render(){return m`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function Me(t){return Ue.includes(t.tagName.toLowerCase())?t:t.querySelector(Ue.join(","))}Ee.styles=Oe,a([c("slot")],Ee.prototype,"defaultSlot",2),a([d()],Ee.prototype,"label",2),Ee=a([u("sl-button-group")],Ee);var Re=r`
  ${n}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-target {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip-positioner[data-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-placement^='right'] .tooltip {
    transform-origin: left;
  }

  .tooltip__content {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }

  .tooltip__arrow {
    position: absolute;
    background: var(--sl-tooltip-background-color);
    width: calc(var(--sl-tooltip-arrow-size) * 2);
    height: calc(var(--sl-tooltip-arrow-size) * 2);
    transform: rotate(45deg);
    z-index: -1;
  }
`,Ne=class extends h{constructor(){super(...arguments),this.localize=new J(this),this.content="",this.placement="top",this.disabled=!1,this.distance=10,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then((()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),this.target=this.getTarget()}))}async firstUpdated(){this.tooltip.hidden=!this.open,this.open&&(await this.updateComplete,this.updatePositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),this.stopPositioner()}async show(){if(!this.open)return this.open=!0,b(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,b(this,"sl-after-hide")}getTarget(){const t=[...this.children].find((t=>"style"!==t.tagName.toLowerCase()&&"content"!==t.getAttribute("slot")));if(!t)throw new Error("Invalid tooltip target: no child element was found.");return t}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){const t=O(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>{this.show()}),t)}}handleMouseOut(){if(this.hasTrigger("hover")){const t=O(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>{this.hide()}),t)}}async handleOpenChange(){if(this.open){if(this.disabled)return;f(this,"sl-show"),await U(this.tooltip),this.startPositioner(),this.tooltip.hidden=!1;const{keyframes:t,options:e}=I(this,"tooltip.show",{dir:this.localize.dir()});await P(this.tooltip,t,e),f(this,"sl-after-show")}else{f(this,"sl-hide"),await U(this.tooltip);const{keyframes:t,options:e}=I(this,"tooltip.hide",{dir:this.localize.dir()});await P(this.tooltip,t,e),this.tooltip.hidden=!0,this.stopPositioner(),f(this,"sl-after-hide")}}handleOptionsChange(){this.updatePositioner()}handleDisabledChange(){this.disabled&&this.open&&this.hide()}hasTrigger(t){return this.trigger.split(" ").includes(t)}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=Ce(this.target,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){var t;this.open&&this.target&&this.positioner&&Ae(this.target,this.positioner,{placement:this.placement,middleware:[Xt({mainAxis:this.distance,crossAxis:this.skidding}),Jt(),Qt(),(t={element:this.arrow,padding:10},{name:"arrow",options:t,async fn(e){const{element:o,padding:i=0}=null!=t?t:{},{x:s,y:r,placement:n,rects:a,platform:l}=e;if(null==o)return{};const c=Rt(i),d={x:s,y:r},u=Ut(n),h=Ot(n),p=Et(u),b=await l.getDimensions(o),f="y"===u?"top":"left",m="y"===u?"bottom":"right",g=a.reference[p]+a.reference[u]-d[u]-a.floating[p],v=d[u]-a.reference[u],w=await(null==l.getOffsetParent?void 0:l.getOffsetParent(o));let x=w?"y"===u?w.clientHeight||0:w.clientWidth||0:0;0===x&&(x=a.floating[p]);const y=c[f],_=x-b[p]-c[m],k=x/2-b[p]/2+(g/2-v/2),$=Lt(y,k,_);return{[u]:d[u]-(("start"===h?c[f]:c[m])>0&&k!==$&&a.reference[p]<=a.floating[p]?k<y?y-k:_-k:0),data:{[u]:$,centerOffset:k-$}}}})],strategy:this.hoist?"fixed":"absolute"}).then((({x:t,y:e,middlewareData:o,placement:i})=>{const s=o.arrow.x,r=o.arrow.y,n={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];this.positioner.setAttribute("data-placement",i),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${e}px`}),Object.assign(this.arrow.style,{left:"number"==typeof s?`${s}px`:"",top:"number"==typeof r?`${r}px`:"",right:"",bottom:"",[n]:"calc(var(--sl-tooltip-arrow-size) * -1)"})}))}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return m`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${g({tooltip:!0,"tooltip--open":this.open})}
          role="tooltip"
          aria-hidden=${this.open?"false":"true"}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content" aria-live=${this.open?"polite":"off"}>
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `}};Ne.styles=Re,a([c(".tooltip-positioner")],Ne.prototype,"positioner",2),a([c(".tooltip")],Ne.prototype,"tooltip",2),a([c(".tooltip__arrow")],Ne.prototype,"arrow",2),a([d()],Ne.prototype,"content",2),a([d()],Ne.prototype,"placement",2),a([d({type:Boolean,reflect:!0})],Ne.prototype,"disabled",2),a([d({type:Number})],Ne.prototype,"distance",2),a([d({type:Boolean,reflect:!0})],Ne.prototype,"open",2),a([d({type:Number})],Ne.prototype,"skidding",2),a([d()],Ne.prototype,"trigger",2),a([d({type:Boolean})],Ne.prototype,"hoist",2),a([l("open",{waitUntilFirstUpdate:!0})],Ne.prototype,"handleOpenChange",1),a([l("content"),l("distance"),l("hoist"),l("placement"),l("skidding")],Ne.prototype,"handleOptionsChange",1),a([l("disabled")],Ne.prototype,"handleDisabledChange",1),Ne=a([u("sl-tooltip")],Ne),N("tooltip.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:150,easing:"ease"}}),N("tooltip.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:150,easing:"ease"}});var Ie=r`
  ${n}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${G}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }
`,je=class extends h{constructor(){super(...arguments),this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}getTextLabel(){return A(this.defaultSlot)}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,f(this,"sl-label-change")):this.cachedTextLabel=t}render(){return m`
      <div
        part="base"
        class=${g({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
      >
        <span class="menu-item__check">
          <sl-icon name="check-lg" library="system" aria-hidden="true"></sl-icon>
        </span>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `}};je.styles=Ie,a([c("slot:not([name])")],je.prototype,"defaultSlot",2),a([c(".menu-item")],je.prototype,"menuItem",2),a([d({type:Boolean,reflect:!0})],je.prototype,"checked",2),a([d()],je.prototype,"value",2),a([d({type:Boolean,reflect:!0})],je.prototype,"disabled",2),a([l("checked")],je.prototype,"handleCheckedChange",1),a([l("disabled")],je.prototype,"handleDisabledChange",1),je=a([u("sl-menu-item")],je);const He=class{constructor(e){t(this,e),this.filters="",this.icon=!1,this.tooltip="",this.API="AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs",this.DOMAIN="https://kent-maps.online/",this.SEARCH_QUOTA_EXCEEDED_MESSAGE="Total site search quota exceeded for the day",this.NO_RESULTS_MESSAGE="No results",this.RESULTS_PER_PAGE=10,this.items=[],this.error="",this.search=!1,this.previousStart=0,this.activeFilter="all",this.filtersObject=new Object}fillFilters(){this.filtersObject.all="All";for(var t=this.filters.split(","),e=0;e<t.length;e++){var o=t[e].split(":");o[0]=o[0].replace(" ",""),this.filtersObject[o[0]]=o[1]}}doSearch(t){var e=this.el.shadowRoot.getElementById("ve-search-input").value;e=e.replace(" ","+"),this.error="",this.search=!0,null!=this.items&&0!=t||(this.items=[]),fetch(`https://www.googleapis.com/customsearch/v1?key=${this.API}&cx=${this.cx}&q=${e}&start=${t}`).then((t=>t.json())).then((t=>{this.items=this.items.concat(this.applyFilters(t.items)),null==t.queries.nextPage?(this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display="none",this.el.shadowRoot.getElementById("ve-search-show-more").style.display="none"):(this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display="block",this.el.shadowRoot.getElementById("ve-search-show-more").style.display="block")})).catch((()=>{this.error="searchQuotaExceeded"})).catch((t=>{console.log(t)})),this.previousStart=t,this.el.shadowRoot.getElementById("ve-search-hide-output").style.display="inline-block",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="block"}searchInputKeyPress(t){"Enter"===t.key&&this.doSearch(0)}applyFilters(t){var e=[];if("all"==this.activeFilter)return t;for(let i=0;i<t.length;i++){var o=t[i];o.link.replace(this.DOMAIN,"").startsWith(this.activeFilter)&&e.push(o)}return e}invertOutput(){"block"==this.el.shadowRoot.getElementById("ve-search-dropdown").style.display?this.hideOutput():this.showOutput()}hideOutput(){this.el.shadowRoot.getElementById("ve-search-hide-output").innerText="▼",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="none"}showOutput(){this.el.shadowRoot.getElementById("ve-search-hide-output").innerText="▲",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="block"}updateFilter(t){this.activeFilter=t,this.el.shadowRoot.getElementById("ve-search-filter-item-"+t).setAttribute("checked","true")}showSearchBar(){this.el.shadowRoot.getElementById("ve-search-bar").style.display="block",this.el.shadowRoot.getElementById("ve-search-bar-show-button").style.display="none"}displayFilters(){var t,o=[];if(this.filters.length>0)for(t in this.filtersObject)o=o.concat([e("sl-menu-item",{id:"ve-search-filter-item-"+t,value:t,onClick:this.updateFilter.bind(this,t)},this.filtersObject[t])]);else o=[e("style",{type:"text/css",innerHTML:"\n            #ve-search-input-container {\n                border-left: 1px rgb(212, 212, 216) solid;\n                border-top-left-radius: 3px;\n                border-bottom-left-radius: 3px;\n            }\n            #ve-search-filter-dropdown {\n                display: none;\n            }"})];return o}displayOutput(){var t="";if(this.search)if(0==this.items.length)t=`<p>${this.NO_RESULTS_MESSAGE}</p>`;else if("searchQuotaExceeded"==this.error)t=`<p>${this.SEARCH_QUOTA_EXCEEDED_MESSAGE}</p>`;else for(let o=0;o<this.items.length;o++){var e=this.items[o];t+=`<p id = 've-search-output-title'><a href = '${e.link}'>"${e.title}</a></p>`,t+=`<p id = 've-search-output-link'>${e.link}"</p>`}return t}displayTooltip(){var t=[e("style",{type:"text/css",id:"search-bar-style",innerHTML:"\n            #ve-search-bar {\n                display: none;\n            }"})],o=[e("sl-button",{id:"ve-search-bar-show-button",onclick:()=>this.showSearchBar()},e("sl-icon",{name:"search",label:"Search"}))];return this.tooltip.length>0?[e("sl-tooltip",{content:this.tooltip},t,o)]:[e("sl-tooltip",{content:this.tooltip,disabled:!0},t,o)]}render(){var t=[];return this.fillFilters(),t=t.concat([e("div",{id:"search-container"},e("sl-button-group",{id:"ve-search-bar"},e("sl-dropdown",{id:"ve-search-filter-dropdown"},e("sl-button",{id:"ve-search-active-filter",slot:"trigger",caret:!0},this.filtersObject[this.activeFilter]),e("sl-menu",{id:"ve-search-filter-menu"},this.displayFilters())),e("div",{id:"ve-search-input-container"},e("input",{id:"ve-search-input",type:"text",placeholder:"Search the site...",onKeyPress:this.searchInputKeyPress.bind(this)}),e("button",{id:"ve-search-hide-output",onClick:this.invertOutput.bind(this)},"▲")),e("sl-button",{id:"ve-search-search-button",onclick:this.doSearch.bind(this,0)},e("sl-icon",{name:"search",label:"Search"}))),e("div",{id:"ve-search-dropdown"},e("div",{id:"ve-search-output",innerHTML:this.displayOutput()}),e("hr",{id:"ve-search-end-of-output"}),e("button",{id:"ve-search-show-more",onClick:this.doSearch.bind(this,this.previousStart+this.RESULTS_PER_PAGE)},"Show more...")))]),this.icon&&(t=t.concat([e("div",null,this.displayTooltip())])),t}get el(){return o(this)}};He.style="#ve-search-input-container{outline:none;border:1px rgb(212, 212, 216) solid;background:white;border-left:none;border-right:none;border-radius:0px}#ve-search-input{outline:none;border:none;margin-top:5%;padding-left:10px}#ve-search-bar-show-button::part(base),#ve-search-search-button::part(base),#ve-search-filter-dropdown>sl-button::part(base){background-color:white}#ve-search-bar{width:max-content}#ve-search-bar:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-hide-output{background:none;border:none;display:none;padding-right:10px;cursor:pointer}#ve-search-dropdown{width:70%;display:none;border:1px rgb(212, 212, 216) solid;background-color:white;border-radius:3px;padding:7px;margin-top:0;position:absolute;z-index:2}#ve-search-output{margin-left:10px}#ve-search-output>*{font-family:Roboto, sans-serif}#ve-search-output-title{margin-bottom:0}#ve-search-output-title>a{text-decoration:none;color:rgb(147 179 243)}#ve-search-output-link{font-style:italic;font-size:0.8em;color:rgb(60, 131, 40);margin-top:0%}#ve-search-output-title>a:visited{color:rgb(188 140 242)}#ve-search-end-of-output{height:1px;width:99%;background-color:rgb(212, 212, 216);border:none}#ve-search-show-more{border:none;background:none;margin-left:9px;cursor:pointer}";export{Tt as ve_contact,Pe as ve_header,He as ve_search}