import{r as t,h as n,g as e}from"./p-f5d08bd3.js";import{s as r,L as i,a as o,g as a,b as s,h as l,f as u}from"./p-0cf2cd84.js";import{H as c,g as h}from"./p-32764e44.js";import{r as d,c as f,_ as p,w as v,i as g,e as m,n as b,s as w,a as x,b as y,$ as _,o as k,d as $,f as z,t as C,g as j,h as A,j as S,l as T,k as M}from"./p-7059461a.js";import{F as O,s as I,g as E,M as U,l as D,u as H}from"./p-090b1ff3.js";import{N as R,z as B,T as L,b as P,D as F,k as N}from"./p-ab5a67a8.js";import{i as V,a as q,p as Z,g as W,s as X,b as K,c as J,l as Y}from"./p-c262ddd9.js";import{c as G,o as Q,g as tt,a as nt}from"./p-7a9c1438.js";import{o as et}from"./p-425ec3ee.js";var rt=d`
  ${f}

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
`,it=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),ot=class extends w{constructor(){super(...arguments),this.hasSlotController=new c(this,"icon","suffix"),this.localize=new i(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}async show(){if(!this.open)return this.open=!0,x(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,x(this,"sl-after-hide")}async toast(){return new Promise((t=>{null===it.parentElement&&document.body.append(it),it.appendChild(this),requestAnimationFrame((()=>{this.show()})),this.addEventListener("sl-after-hide",(()=>{it.removeChild(this),t(),null===it.querySelector("sl-alert")&&it.remove()}),{once:!0})}))}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){y(this,"sl-show"),this.duration<1/0&&this.restartAutoHide(),await o(this.base),this.base.hidden=!1;const{keyframes:t,options:n}=a(this,"alert.show",{dir:this.localize.dir()});await s(this.base,t,n),y(this,"sl-after-show")}else{y(this,"sl-hide"),clearTimeout(this.autoHideTimeout),await o(this.base);const{keyframes:t,options:n}=a(this,"alert.hide",{dir:this.localize.dir()});await s(this.base,t,n),this.base.hidden=!0,y(this,"sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}render(){return _`
      <div
        part="base"
        class=${k({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
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

        ${this.closable?_`
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
    `}};ot.styles=rt,p([g('[part="base"]')],ot.prototype,"base",2),p([m({type:Boolean,reflect:!0})],ot.prototype,"open",2),p([m({type:Boolean,reflect:!0})],ot.prototype,"closable",2),p([m({reflect:!0})],ot.prototype,"variant",2),p([m({type:Number})],ot.prototype,"duration",2),p([v("open",{waitUntilFirstUpdate:!0})],ot.prototype,"handleOpenChange",1),p([v("duration")],ot.prototype,"handleDurationChange",1),ot=p([b("sl-alert")],ot),r("alert.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:250,easing:"ease"}}),r("alert.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:250,easing:"ease"}});var at=d`
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
`,st=d`
  ${f}
  ${at}

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
`,lt={},ut=$(class extends z{constructor(t){if(super(t),t.type!==C.PROPERTY&&t.type!==C.ATTRIBUTE&&t.type!==C.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[n]){if(n===j||n===A)return n;const e=t.element,r=t.name;if(t.type===C.PROPERTY){if(n===e[r])return j}else if(t.type===C.BOOLEAN_ATTRIBUTE){if(!!n===e.hasAttribute(r))return j}else if(t.type===C.ATTRIBUTE&&e.getAttribute(r)===n+"")return j;return((t,n=lt)=>{t._$AH=n})(t),n}}),ct=class extends w{constructor(){super(...arguments),this.formSubmitController=new O(this),this.hasSlotController=new c(this,"help-text","label"),this.localize=new i(this),this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){var t,n;return null!=(n=null==(t=this.input)?void 0:t.valueAsDate)?n:null}set valueAsDate(t){this.input.valueAsDate=t,this.value=this.input.value}get valueAsNumber(){var t,n;return null!=(n=null==(t=this.input)?void 0:t.valueAsNumber)?n:parseFloat(this.value)}set valueAsNumber(t){this.input.valueAsNumber=t,this.value=this.input.value}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,n,e="none"){this.input.setSelectionRange(t,n,e)}setRangeText(t,n,e,r="preserve"){this.input.setRangeText(t,n,e,r),this.value!==this.input.value&&(this.value=this.input.value,y(this,"sl-input"),y(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,y(this,"sl-blur")}handleChange(){this.value=this.input.value,y(this,"sl-change")}handleClearClick(t){this.value="",y(this,"sl-clear"),y(this,"sl-input"),y(this,"sl-change"),this.input.focus(),t.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,y(this,"sl-focus")}handleInput(){this.value=this.input.value,y(this,"sl-input")}handleInvalid(){this.invalid=!0}handleKeyDown(t){"Enter"!==t.key||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||setTimeout((()=>{t.defaultPrevented||this.formSubmitController.submit()}))}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){const t=this.hasSlotController.test("label"),n=this.hasSlotController.test("help-text"),e=!!this.label||!!t,r=!!this.helpText||!!n,i=this.clearable&&!this.disabled&&!this.readonly&&this.value.length>0;return _`
      <div
        part="form-control"
        class=${k({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${k({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--invalid":this.invalid})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.isPasswordVisible?"text":this.type}
              name=${T(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${T(this.placeholder)}
              minlength=${T(this.minlength)}
              maxlength=${T(this.maxlength)}
              min=${T(this.min)}
              max=${T(this.max)}
              step=${T(this.step)}
              .value=${ut(this.value)}
              autocapitalize=${T(this.autocapitalize)}
              autocomplete=${T(this.autocomplete)}
              autocorrect=${T(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${T(this.spellcheck)}
              pattern=${T(this.pattern)}
              enterkeyhint=${T(this.enterkeyhint)}
              inputmode=${T(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid?"true":"false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?_`
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
            ${this.togglePassword&&!this.disabled?_`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.isPasswordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.isPasswordVisible?_`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:_`
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ct.styles=st,p([g(".input__control")],ct.prototype,"input",2),p([S()],ct.prototype,"hasFocus",2),p([S()],ct.prototype,"isPasswordVisible",2),p([m({reflect:!0})],ct.prototype,"type",2),p([m({reflect:!0})],ct.prototype,"size",2),p([m()],ct.prototype,"name",2),p([m()],ct.prototype,"value",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"filled",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"pill",2),p([m()],ct.prototype,"label",2),p([m({attribute:"help-text"})],ct.prototype,"helpText",2),p([m({type:Boolean})],ct.prototype,"clearable",2),p([m({attribute:"toggle-password",type:Boolean})],ct.prototype,"togglePassword",2),p([m()],ct.prototype,"placeholder",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"disabled",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"readonly",2),p([m({type:Number})],ct.prototype,"minlength",2),p([m({type:Number})],ct.prototype,"maxlength",2),p([m()],ct.prototype,"min",2),p([m()],ct.prototype,"max",2),p([m({type:Number})],ct.prototype,"step",2),p([m()],ct.prototype,"pattern",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"required",2),p([m({type:Boolean,reflect:!0})],ct.prototype,"invalid",2),p([m()],ct.prototype,"autocapitalize",2),p([m()],ct.prototype,"autocorrect",2),p([m()],ct.prototype,"autocomplete",2),p([m({type:Boolean})],ct.prototype,"autofocus",2),p([m()],ct.prototype,"enterkeyhint",2),p([m({type:Boolean})],ct.prototype,"spellcheck",2),p([m()],ct.prototype,"inputmode",2),p([v("disabled",{waitUntilFirstUpdate:!0})],ct.prototype,"handleDisabledChange",1),p([v("value",{waitUntilFirstUpdate:!0})],ct.prototype,"handleValueChange",1),ct=p([b("sl-input")],ct);var ht=d`
  ${f}
  ${at}

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
`,dt=class extends w{constructor(){super(...arguments),this.formSubmitController=new O(this),this.hasSlotController=new c(this,"help-text","label"),this.hasFocus=!1,this.size="medium",this.value="",this.filled=!1,this.label="",this.helpText="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.setTextareaHeight())),this.updateComplete.then((()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)}))}firstUpdated(){this.invalid=!this.input.checkValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){return t?("number"==typeof t.top&&(this.input.scrollTop=t.top),void("number"==typeof t.left&&(this.input.scrollLeft=t.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,n,e="none"){this.input.setSelectionRange(t,n,e)}setRangeText(t,n,e,r="preserve"){this.input.setRangeText(t,n,e,r),this.value!==this.input.value&&(this.value=this.input.value,y(this,"sl-input")),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight(),y(this,"sl-input"),y(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,y(this,"sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),y(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,y(this,"sl-focus")}handleInput(){this.value=this.input.value,this.setTextareaHeight(),y(this,"sl-input")}handleRowsChange(){this.setTextareaHeight()}handleValueChange(){this.invalid=!this.input.checkValidity()}setTextareaHeight(){"auto"===this.resize?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}render(){const t=this.hasSlotController.test("label"),n=this.hasSlotController.test("help-text"),e=!!this.label||!!t,r=!!this.helpText||!!n;return _`
      <div
        part="form-control"
        class=${k({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":e,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${e?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${k({textarea:!0,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--invalid":this.invalid,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              name=${T(this.name)}
              .value=${ut(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${T(this.placeholder)}
              rows=${T(this.rows)}
              minlength=${T(this.minlength)}
              maxlength=${T(this.maxlength)}
              autocapitalize=${T(this.autocapitalize)}
              autocorrect=${T(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${T(this.spellcheck)}
              enterkeyhint=${T(this.enterkeyhint)}
              inputmode=${T(this.inputmode)}
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
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};dt.styles=ht,p([g(".textarea__control")],dt.prototype,"input",2),p([S()],dt.prototype,"hasFocus",2),p([m({reflect:!0})],dt.prototype,"size",2),p([m()],dt.prototype,"name",2),p([m()],dt.prototype,"value",2),p([m({type:Boolean,reflect:!0})],dt.prototype,"filled",2),p([m()],dt.prototype,"label",2),p([m({attribute:"help-text"})],dt.prototype,"helpText",2),p([m()],dt.prototype,"placeholder",2),p([m({type:Number})],dt.prototype,"rows",2),p([m()],dt.prototype,"resize",2),p([m({type:Boolean,reflect:!0})],dt.prototype,"disabled",2),p([m({type:Boolean,reflect:!0})],dt.prototype,"readonly",2),p([m({type:Number})],dt.prototype,"minlength",2),p([m({type:Number})],dt.prototype,"maxlength",2),p([m({type:Boolean,reflect:!0})],dt.prototype,"required",2),p([m({type:Boolean,reflect:!0})],dt.prototype,"invalid",2),p([m()],dt.prototype,"autocapitalize",2),p([m()],dt.prototype,"autocorrect",2),p([m()],dt.prototype,"autocomplete",2),p([m({type:Boolean})],dt.prototype,"autofocus",2),p([m()],dt.prototype,"enterkeyhint",2),p([m({type:Boolean})],dt.prototype,"spellcheck",2),p([m()],dt.prototype,"inputmode",2),p([v("disabled",{waitUntilFirstUpdate:!0})],dt.prototype,"handleDisabledChange",1),p([v("rows",{waitUntilFirstUpdate:!0})],dt.prototype,"handleRowsChange",1),p([v("value",{waitUntilFirstUpdate:!0})],dt.prototype,"handleValueChange",1),dt=p([b("sl-textarea")],dt),M("3333"===location.port?"":"/web-components/");const ft=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,pt=class{constructor(n){t(this,n),this.show=!1}showChanged(){console.log(`show=${this.show}`),this.show?this.showContactForm():this.hideContactForm()}componentDidLoad(){this.contactDialog=this.el.shadowRoot.querySelector(".contact-dialog"),this.from=this.el.shadowRoot.getElementById("from"),this.message=this.el.shadowRoot.getElementById("message"),this.emailAlert=this.el.shadowRoot.getElementById("bad-email-alert"),this.noMessageAlert=this.el.shadowRoot.getElementById("no-message-alert"),this.contactDialog.addEventListener("sl-hide",(()=>this.show=!1)),this.show&&this.showContactForm()}hideContactForm(){this.contactDialog.hide(),this.from.value="",this.message.value="",this.emailAlert.hide(),this.noMessageAlert.hide()}showContactForm(){console.log("showContactForm"),this.contactDialog.show()}async sendmail(){let t=ft.test(this.from.value);t?this.emailAlert.hide():this.emailAlert.show();let n=this.message.value.trim().length>0;if(n?this.noMessageAlert.hide():this.noMessageAlert.show(),t&&n){let t={to:this.contact,from:this.from.value,subject:"Contact Us",message:this.message.value};this.hideContactForm();let n=await fetch("https://api.visual-essays.net/sendmail/",{method:"POST",body:JSON.stringify(t)});n.ok&&console.log(await n.json())}}render(){return[n("sl-dialog",{label:"Contact Us",class:"contact-dialog"},n("sl-input",{id:"from",autofocus:!0,type:"email",label:"Email address"}),n("sl-alert",{id:"bad-email-alert",variant:"danger"},n("sl-icon",{slot:"icon",name:"exclamation-octagon"}),n("strong",null,"Invalid email address"),n("br",null),"Please fix and resubmit"),n("sl-textarea",{id:"message",label:"Message"}),n("sl-alert",{id:"no-message-alert",variant:"danger"},n("sl-icon",{slot:"icon",name:"exclamation-octagon"}),n("strong",null,"No message entered"),n("br",null)),n("sl-button",{id:"cancel",slot:"footer",onClick:this.hideContactForm.bind(this)},"Cancel"),n("sl-button",{slot:"footer",variant:"primary",onClick:this.sendmail.bind(this)},"Submit"))]}get el(){return e(this)}static get watchers(){return{show:["showChanged"]}}};pt.style=":host{z-index:2}#message{margin-top:24px}",M("3333"===location.port?"":"/web-components/");const vt=class{constructor(n){t(this,n)}componentWillLoad(){this.sticky&&(this.el.style.position="fixed",this.el.style.bottom="0",this.el.style.width=`${this.el.parentElement.clientWidth}px`)}showContactForm(){let t=this.el.querySelector("ve-contact");t.show=!t.show}render(){return[n("section",{class:"container"},n("a",{href:"https://visual-essays.net",target:"_blank"},n("img",{class:"logo",src:"https://visual-essays.github.io/content/static/images/favicon.svg",alt:"Logo"})),n("a",{href:"https://visual-essays.net",target:"_blank"},"visual-essays.net"),n("div",{class:"contact push",onClick:this.showContactForm.bind(this)},n("sl-tooltip",{content:"Contact us"},n("sl-icon",{name:"envelope",label:"Contact us"})))),n("ve-contact",{contact:this.contact})]}get el(){return e(this)}};vt.style="*{box-sizing:border-box}:host{font-family:Roboto, sans-serif;z-index:100}.container{clear:both;display:flex;padding:3px 12px;align-items:center;gap:12px;width:100%;background-color:inherit;}.container a{text-decoration:none}.logo{height:20px}.contact{display:flex;align-items:center;gap:6px;cursor:pointer}.push{margin-left:auto}.contact-dialog::part(body){display:flex;flex-direction:column;padding:24px;gap:16px}";var gt=d`
  ${f}

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
`,mt=class extends w{constructor(){super(...arguments),this.localize=new i(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}async firstUpdated(){this.panel.hidden=!this.open,this.open&&(await this.updateComplete,this.addOpenListeners(),this.startPositioner())}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide(),this.stopPositioner()}focusOnTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleDocumentKeyDown(t){var n;if("Escape"===t.key)return this.hide(),void this.focusOnTrigger();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(n=document.activeElement)?void 0:n.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,n,e;const r=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(e=null==(n=document.activeElement)?void 0:n.shadowRoot)?void 0:e.activeElement:document.activeElement;this.containingElement&&(null==r?void 0:r.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(t){const n=t.composedPath();this.containingElement&&!n.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){I(t.target,this.panel)}handlePanelSelect(t){this.stayOpenOnSelect||"sl-menu"!==t.target.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){this.updatePositioner()}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){if("Escape"===t.key)return this.focusOnTrigger(),void this.hide();if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const n=this.getMenu();if(n){const e=n.defaultSlot.assignedElements({flatten:!0}),r=e[0],i=e[e.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),e.length>0&&requestAnimationFrame((()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(n.setCurrentItem(r),r.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(n.setCurrentItem(i),i.focus())})));const o=["Tab","Shift","Meta","Ctrl","Alt"];this.open&&!o.includes(t.key)&&n.typeToSelect(t)}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find((t=>E(t).start));let n;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":n=t.button;break;default:n=t}n.setAttribute("aria-haspopup","true"),n.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,x(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,x(this,"sl-after-hide")}reposition(){this.updatePositioner()}addOpenListeners(){this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){y(this,"sl-show"),this.addOpenListeners(),await o(this),this.startPositioner(),this.panel.hidden=!1;const{keyframes:t,options:n}=a(this,"dropdown.show",{dir:this.localize.dir()});await s(this.panel,t,n),y(this,"sl-after-show")}else{y(this,"sl-hide"),this.removeOpenListeners(),await o(this);const{keyframes:t,options:n}=a(this,"dropdown.hide",{dir:this.localize.dir()});await s(this.panel,t,n),this.panel.hidden=!0,this.stopPositioner(),y(this,"sl-after-hide")}}startPositioner(){this.stopPositioner(),this.updatePositioner(),this.positionerCleanup=R(this.trigger,this.positioner,this.updatePositioner.bind(this))}updatePositioner(){this.open&&this.trigger&&this.positioner&&B(this.trigger,this.positioner,{placement:this.placement,middleware:[L({mainAxis:this.distance,crossAxis:this.skidding}),P(),F(),N({apply:({availableWidth:t,availableHeight:n})=>{Object.assign(this.panel.style,{maxWidth:`${t}px`,maxHeight:`${n}px`})}})],strategy:this.hoist?"fixed":"absolute"}).then((({x:t,y:n,placement:e})=>{this.positioner.setAttribute("data-placement",e),Object.assign(this.positioner.style,{position:this.hoist?"fixed":"absolute",left:`${t}px`,top:`${n}px`})}))}stopPositioner(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=void 0,this.positioner.removeAttribute("data-placement"))}render(){return _`
      <div
        part="base"
        id="dropdown"
        class=${k({dropdown:!0,"dropdown--open":this.open})}
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
    `}};mt.styles=gt,p([g(".dropdown__trigger")],mt.prototype,"trigger",2),p([g(".dropdown__panel")],mt.prototype,"panel",2),p([g(".dropdown__positioner")],mt.prototype,"positioner",2),p([m({type:Boolean,reflect:!0})],mt.prototype,"open",2),p([m({reflect:!0})],mt.prototype,"placement",2),p([m({type:Boolean,reflect:!0})],mt.prototype,"disabled",2),p([m({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],mt.prototype,"stayOpenOnSelect",2),p([m({attribute:!1})],mt.prototype,"containingElement",2),p([m({type:Number})],mt.prototype,"distance",2),p([m({type:Number})],mt.prototype,"skidding",2),p([m({type:Boolean})],mt.prototype,"hoist",2),p([v("distance"),v("hoist"),v("placement"),v("skidding")],mt.prototype,"handlePopoverOptionsChange",1),p([v("open",{waitUntilFirstUpdate:!0})],mt.prototype,"handleOpenChange",1),mt=p([b("sl-dropdown")],mt),r("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}}),r("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});var bt=d`
  ${f}

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
`,wt=class extends w{constructor(){super(...arguments),this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(t={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((n=>"menuitem"===n.getAttribute("role")&&!(!t.includeDisabled&&n.disabled)))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find((t=>"0"===t.getAttribute("tabindex")))}setCurrentItem(t){const n=this.getAllItems({includeDisabled:!1}),e=t.disabled?n[0]:t;n.forEach((t=>{t.setAttribute("tabindex",t===e?"0":"-1")}))}typeToSelect(t){var n;const e=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout((()=>this.typeToSelectString=""),1e3),"Backspace"===t.key?this.typeToSelectString=t.metaKey||t.ctrlKey?"":this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase(),l||e.forEach((t=>t.classList.remove("sl-focus-invisible")));for(const t of e){const e=null==(n=t.shadowRoot)?void 0:n.querySelector("slot:not([name])");if(h(e).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(t),t.focus();break}}}handleClick(t){const n=t.target.closest("sl-menu-item");!1===(null==n?void 0:n.disabled)&&y(this,"sl-select",{detail:{item:n}})}handleKeyUp(){l||this.getAllItems().forEach((t=>{t.classList.remove("sl-focus-invisible")}))}handleKeyDown(t){if("Enter"===t.key){const n=this.getCurrentItem();t.preventDefault(),null==n||n.click()}if(" "===t.key&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const n=this.getAllItems({includeDisabled:!1}),e=this.getCurrentItem();let r=e?n.indexOf(e):0;if(n.length>0)return t.preventDefault(),"ArrowDown"===t.key?r++:"ArrowUp"===t.key?r--:"Home"===t.key?r=0:"End"===t.key&&(r=n.length-1),r<0&&(r=n.length-1),r>n.length-1&&(r=0),this.setCurrentItem(n[r]),void n[r].focus()}this.typeToSelect(t)}handleMouseDown(t){const n=t.target;"menuitem"===n.getAttribute("role")&&(this.setCurrentItem(n),l||n.classList.add("sl-focus-invisible"))}handleSlotChange(){const t=this.getAllItems({includeDisabled:!1});t.length>0&&this.setCurrentItem(t[0])}render(){return _`
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
    `}};wt.styles=bt,p([g(".menu")],wt.prototype,"menu",2),p([g("slot")],wt.prototype,"defaultSlot",2),wt=p([b("sl-menu")],wt),M("3333"===location.port?"":"/web-components/");const xt={home:"house-fill",about:"info-circle-fill",contact:"envelope-fill"},yt=class{constructor(n){t(this,n),this.height=300,this.position="center",this.navItems=[]}_manifestChanged(t,n){t!==n&&(this._imageInfo=V(this._manifest))}async _imageInfoChanged(t,n){t!==n&&(this._imgUrl=t.service?this._iiifUrl(t.service[0].id||t.service[0]["@id"],this.imageOptions):await q(t.id,this.imageOptions.region,{width:this.el.clientWidth,height:this.height}))}async _imgUrlChanged(t){this.el.style.backgroundImage=`url('${t}')`,this.el.style.backgroundPosition=this.position}_iiifUrl(t,n){return`${t.replace(/\/info.json$/,"")}/${n.region}/${n.size}/${n.rotation}/${n.quality}.${n.format}`}connectedCallback(){if(this.label){let t=document.querySelector("title");t||(t=document.createElement("title"),t.innerText=this.label,document.head.appendChild(t))}for(this.imageOptions=Z(this.options),this.navItems=Array.from(this.el.querySelectorAll("li")).map((t=>"A"===t.firstChild.nodeName?{label:t.firstChild.textContent,href:t.firstChild.href}:{label:t.firstChild.textContent}));this.el.firstChild;)this.el.removeChild(this.el.firstChild)}componentDidLoad(){this.el.style.height=`${this.height}px`,this.sticky&&(this.el.classList.add("sticky"),document.querySelector("main").classList.add("sticky-header")),W(this.background).then((t=>this._manifest=t))}htmlToElem(t){return(new DOMParser).parseFromString(t,"text/html").children[0].children[1]}_showInfoPopup(){let t=this.el.shadowRoot.querySelector("#image-info-popup"),n=encodeURIComponent(JSON.stringify([{manifest:this._manifest}]));t.innerHTML=`<ve-manifest images="${n}" condensed></ve-manifest>`,t.style.display="block"===t.style.display?"none":"block"}menuItemSelected(t){if(console.log("menuItemSelected",t),0===t.label.toLowerCase().indexOf("contact")&&this.contact){let t=this.el.shadowRoot.querySelector("ve-contact");t.show=!t.show}else t.href&&(location.href=t.href)}navIcon(t){let n="",e=t.label.toLowerCase();return Object.keys(xt).forEach((t=>{e.indexOf(t)>=0&&(n=xt[t])})),n}render(){return[n("section",{class:"ve-header"},n("div",{class:"title-panel"},this.navItems.length>0&&n("nav",null,n("sl-dropdown",null,n("sl-button",{id:"menu-toggle",slot:"trigger",variant:"default",size:"medium",circle:!0},n("sl-icon",{name:"three-dots-vertical",label:"Navigation Meno"})),n("sl-menu",null,this.navItems.map((t=>n("sl-menu-item",{onClick:this.menuItemSelected.bind(this,t)},n("sl-icon",{slot:"prefix",name:this.navIcon(t),label:t.label}),t.label)))))),n("a",{href:"/"},n("div",{class:"title"},this.label)),n("div",{class:"subtitle"},this.subtitle),n("div",{id:"image-info-popup"}),n("div",{class:"title-buttons"},n("ve-search",{cx:"0a5115e988de8e8a9",filters:"16c:16c,17c:17c,18c:18c,19c:19c,20c:20c,21c:21c,austen:Jane Austen,canterbury:Canterbury,churches:Churches,dickens:Dickens",icon:!0,tooltip:"Click to search the site"}),n("sl-button",{id:"info-button",onClick:this._showInfoPopup.bind(this),title:"Image info"},n("sl-icon",{name:"info"}))))),n("ve-contact",{contact:this.contact})]}get el(){return e(this)}static get watchers(){return{_manifest:["_manifestChanged"],_imageInfo:["_imageInfoChanged"],_imgUrl:["_imgUrlChanged"]}}};yt.style=":host{font-family:Roboto, sans-serif;display:block;font-size:1rem;width:100%;background-repeat:no-repeat;background-size:cover;background-position:center;position:relative;margin:0;z-index:3;margin-top:-1rem;color:#444;max-height:220px}:host ul{display:none}:host(.sticky){position:sticky;position:-webkit-sticky;top:-114px}.title-panel{display:flex;flex-direction:column;justify-content:center;gap:4px;font-family:Roboto, sans-serif;position:absolute;height:90px;background:rgba(0, 0, 0, 0.3);border-radius:3px;box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;color:white;padding:.5rem 3.2rem .5rem .5rem;font-weight:bold;left:0;bottom:0;right:0}.title-buttons{display:flex;flex-direction:row;position:absolute;right:20px}#info-button::part(base){background-color:white}#info-button{margin-left:10px}#info-button:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-search-button::part(base){background-color:white}.title,.subtitle{line-height:3rem}.title-panel a{text-decoration:none}.title,.subtitle{color:white}.title{font-size:1.6rem;line-height:1.8rem;padding-top:0}.subtitle{font-size:1.4rem;line-height:1.4rem}.ve-header{position:relative;height:100%}nav{display:inline-block;position:absolute;top:20px;right:12px;z-index:1;-webkit-user-select:none;user-select:none}sl-button::part(base){background-color:rgba(0, 0, 0, 0.2)}nav sl-icon{color:white;font-size:24px;font-weight:bold;cursor:pointer;padding-top:7px}nav sl-menu-item sl-icon{color:inherit;padding:0 6px 0 0;font-size:20px}nav sl-menu-item:hover sl-icon{color:inherit}#info-icon{position:absolute;font-family:serif;z-index:1;bottom:12px;right:19px;width:22px;height:22px;border-radius:50%;background-color:rgba(0, 0, 0, 0.3);color:white;text-align:center;line-height:1.4em;letter-spacing:-1px;font-weight:bold;cursor:pointer;border:2px solid rgba(255, 255, 255, 0.5)}#info-icon:hover{color:black;background-color:rgba(255, 255, 255, 0.7)}#image-info-popup{position:absolute;display:none;width:75%;max-width:300px;height:auto;max-height:500px;background:#fff;right:72px;top:8px;padding:6px;border:1px solid #444;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;overflow-y:scroll;z-index:10}:host #info-icon{visibility:hidden}:host(:hover) #info-icon{visibility:visible}@media (min-width: 481px){:host{max-height:300px}:host(.sticky){top:-158px}.title-panel{height:132px}.title-panel{height:120px;padding:1rem 5rem .5rem 2rem}nav{top:36px;right:24px}#info-icon{bottom:20px;right:31px}.title{font-size:2.5rem;line-height:2.6rem}.subtitle{font-size:2rem;line-height:2rem;min-height:1em}#menuToggle{top:28px}}";const _t=tt(G((function(t){
/*! @openseadragon-imaging/openseadragon-viewerinputhook 2.2.1 ab9b394 (clean)  @license MIT */
window,t.exports=function(t){return function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(n){return t[n]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=1)}([function(n){n.exports=t},function(t,n,e){e.r(n);var r=e(0),i=e.n(r);n.default=function(t,n){if(!t.version||1>t.version.major)throw new Error("OpenSeadragonViewerInputHook requires OpenSeadragon version 1.0.0+");return t.Viewer.prototype.addViewerInputHook=function(t){return(t=t||{}).viewer=this,new n.ViewerInputHook(t)},n.ViewerInputHook=function(t){var n,e;for((t=t||{}).hooks=t.hooks||[],this.viewer=t.viewer||null,this.viewerTrackers={},this.hooks=[],this.viewer&&(this.viewerTrackers.viewer=this.viewer.innerTracker,this.viewerTrackers.viewer_outer=this.viewer.outerTracker),n=0;n<t.hooks.length;n++){if("string"==typeof t.hooks[n].tracker){if(!this.viewer)throw new Error("A viewer must be specified.");if(void 0===(e=this.viewerTrackers[t.hooks[n].tracker]))throw new Error("Unknown tracker specified: "+t.hooks[n].tracker)}else e=t.hooks[n].tracker;this.hooks.push({tracker:e,handlerName:t.hooks[n].handler,origHandler:e[t.hooks[n].handler],hookHandler:t.hooks[n].hookHandler}),function(t,n,e,r){var i=n[e];n[e]=function(n){return t._callHandlers(r,i,n)}}(this,e,t.hooks[n].handler,t.hooks[n].hookHandler)}},n.ViewerInputHook.version={versionStr:"2.2.1",major:2,minor:2,revision:1},n.ViewerInputHook.prototype._callHandlers=function(t,n,e){var r=t(e);return n&&!e.stopHandlers&&(r=n(e)),!e.stopBubbling&&r},n.ViewerInputHook.prototype.destroy=function(){for(;0<this.hooks.length;){var t=this.hooks.pop();t.tracker[t.handlerName]=t.origHandler}this.viewer&&(delete this.viewerTrackers.viewer,delete this.viewerTrackers.viewer_outer,this.viewer=null)},n.ViewerInputHook}(i.a||window.OpenSeadragon,window.OpenSeadragonImaging=window.OpenSeadragonImaging||{})}]).default}(Q)})));function kt(t){this.message=t}(kt.prototype=new Error).name="InvalidCharacterError";var $t="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(t){var n=String(t).replace(/=+$/,"");if(n.length%4==1)throw new kt("'atob' failed: The string to be decoded is not correctly encoded.");for(var e,r,i=0,o=0,a="";r=n.charAt(o++);~r&&(e=i%4?64*e+r:r,i++%4)?a+=String.fromCharCode(255&e>>(-2*i&6)):0)r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);return a};function zt(t){var n=t.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw"Illegal base64url string!"}try{return function(t){return decodeURIComponent($t(t).replace(/(.)/g,(function(t,n){var e=n.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e})))}(n)}catch(t){return $t(n)}}function Ct(t){this.message=t}function jt(t,n){if("string"!=typeof t)throw new Ct("Invalid token specified");var e=!0===(n=n||{}).header?0:1;try{return JSON.parse(zt(t.split(".")[e]))}catch(t){throw new Ct("Invalid token specified: "+t.message)}}(Ct.prototype=new Error).name="InvalidTokenError",function(){window.console=window.console||{},window.console.assert=window.console.assert||function(){},window.console.error=window.console.error||function(){};var t=function(t){var n=this;this.images=t.images,this.startingZoom=t.zoom,this.startingPan=t.pan,this.isMobile=void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile"),this.isMobile?(this.clipFactorX=.5,this.clipFactorY=.5):(this.clipFactorX=0,this.clipFactorY=0),Q.EventSource.call(this);var e=t.osdOptions;e.element=t.container,this.viewer=Q(e),this.viewer.canvas.style.outline="none",this.tracker=new Q.MouseTracker({element:this.viewer.canvas,moveHandler:function(t){n.isMobile||n.dragClip(t.position,!0,!0)},pressHandler:function(t){if(n.isMobile){var e=n.getShownImages();if(!(e.length<=1)){var r=new Q.Point(n.viewer.container.clientWidth*n.clipFactorX,n.viewer.container.clientHeight*n.clipFactorY);2===e.length?Math.abs(r.x-t.position.x)<20&&(n.isDraggingClipX=!0):3===e.length&&(Math.abs(r.x-t.position.x)<20&&t.position.y<r.y+20&&(n.isDraggingClipX=!0),Math.abs(r.y-t.position.y)<20&&(n.isDraggingClipY=!0))}}},releaseHandler:function(){n.isDraggingClipX=!1,n.isDraggingClipY=!1}}),this.viewer.addHandler("viewport-change",(function(){n.updateClip(),n.raiseEvent("change:viewport")})),this.viewer.addHandler("add-item-failed",(function(t){n.raiseEvent("add-item-failed",t)})),this.viewer.addHandler("canvas-drag",(function(t){(n.isDraggingClipX||n.isDraggingClipY)&&(t.preventDefaultAction=!0,n.dragClip(t.position,n.isDraggingClipX,n.isDraggingClipY))})),this.images.forEach((function(t,e){t.curtain={},n.viewer.addTiledImage({tileSource:t.tileSource,opacity:t.shown,success:function(r){t.curtain.tiledImage=r.item,t.curtain.tiledImage.setOpacity(t.shown?1:0),0===e&&(n.startingZoom&&n.viewer.viewport.zoomTo(n.startingZoom,null,!0),n.startingPan&&n.viewer.viewport.panTo(n.startingPan,!0)),n.updateClip()}})}))};t.prototype=Q.extend({destroy:function(){this.images.forEach((function(t){delete t.curtain})),this.tracker.destroy(),this.viewer.destroy()},getZoom:function(){return this.viewer.viewport.getZoom()},setZoom:function(t){this.viewer.viewport.zoomTo(t,null,!0),this.startingZoom=t},getPan:function(){return this.viewer.viewport.getCenter()},setPan:function(t){this.viewer.viewport.panTo(t,!0),this.startingPan=t},zoomIn:function(){this.viewer.viewport.zoomBy(this.viewer.zoomPerClick),this.viewer.viewport.applyConstraints()},zoomOut:function(){this.viewer.viewport.zoomBy(1/this.viewer.zoomPerClick),this.viewer.viewport.applyConstraints()},updateImageShown:function(t){t.curtain.tiledImage&&t.curtain.tiledImage.setOpacity(t.shown?1:0)},updateClip:function(){var t,n,e,r,i=new Q.Point(this.viewer.container.clientWidth*this.clipFactorX,this.viewer.container.clientHeight*this.clipFactorY),o=this.viewer.viewport.pointFromPixel(i,!0),a=this.getShownImages();if(a.length>1&&(t=a[1].curtain.tiledImage)){n=t.getContentSize(),e=t.viewportToImageCoordinates(o);var s=Math.min(n.x,Math.max(0,e.x));r=new Q.Rect(s,0,n.x,n.y),t.setClip(r)}if(a.length>2&&(t=a[2].curtain.tiledImage)){n=t.getContentSize(),e=t.viewportToImageCoordinates(o);var l=Math.min(n.y,Math.max(0,e.y));r=new Q.Rect(0,l,n.x,n.y),t.setClip(r)}},dragClip:function(t,n,e){n&&(this.clipFactorX=t.x/this.viewer.container.clientWidth),e&&(this.clipFactorY=t.y/this.viewer.container.clientHeight),this.updateClip()},getShownImages:function(){return this.images.filter((function(t){return t.shown}))}},Q.EventSource.prototype);var n=function(t){var n=this;this.images=t.images,this.startingZoom=t.zoom,this.startingPan=t.pan,this.leadingImage=null,Q.EventSource.call(this),this.innerContainer=document.createElement("div"),this.innerContainer.style.display="flex",this.innerContainer.style.height="100%",t.container.appendChild(this.innerContainer),this.images.forEach((function(e,r){e.sync={},e.sync.container=document.createElement("div"),e.sync.container.style.flexGrow=1,n.innerContainer.appendChild(e.sync.container),e.shown||(e.sync.container.style.display="none");var i=t.osdOptions;i.element=e.sync.container,i.tileSources=e.tileSource,e.sync.viewer=Q(i),e.sync.viewer.canvas.style.outline="none",e.sync.viewer.addHandler("open",(function(){if(n.startingZoom&&e.sync.viewer.viewport.zoomTo(n.startingZoom,null,!0),n.startingPan)e.sync.viewer.viewport.panTo(n.startingPan,!0);else{var t=e.sync.viewer.world.getHomeBounds(),r=new Q.Point(t.x+t.width/2,t.y+t.height/2);e.sync.viewer.viewport.panTo(r,!0)}})),e.sync.viewer.addHandler("add-item-failed",(function(t){n.raiseEvent("add-item-failed",t)}));var o=function(){n.leadingImage&&n.leadingImage!==e||(n.leadingImage=e,n.images.forEach((function(t){t!==e&&(t.sync.viewer.viewport.zoomTo(e.sync.viewer.viewport.getZoom()),t.sync.viewer.viewport.panTo(e.sync.viewer.viewport.getCenter()))})),n.leadingImage=null)};e.sync.viewer.addHandler("zoom",(function(){o()})),e.sync.viewer.addHandler("pan",(function(){o()})),0===r&&e.sync.viewer.addHandler("viewport-change",(function(){n.raiseEvent("change:viewport")}))}))};n.prototype=Q.extend({destroy:function(){this.images.forEach((function(t){t.sync.container.parentNode.removeChild(t.sync.container),t.sync.viewer.destroy(),delete t.sync})),this.innerContainer.parentNode.removeChild(this.innerContainer)},getZoom:function(){return this.images[0].sync.viewer.viewport.getZoom()},setZoom:function(t){this.images[0].sync.viewer.viewport.zoomTo(t,null,!0),this.startingZoom=t},getPan:function(){return this.images[0].sync.viewer.viewport.getCenter()},setPan:function(t){this.images[0].sync.viewer.viewport.panTo(t,!0),this.startingPan=t},zoomIn:function(){var t=this.images[0].sync.viewer;t.viewport.zoomBy(t.zoomPerClick),t.viewport.applyConstraints()},zoomOut:function(){var t=this.images[0].sync.viewer;t.viewport.zoomBy(1/t.zoomPerClick),t.viewport.applyConstraints()},updateImageShown:function(t){t.sync.container.style.display=t.shown?"block":"none"}},Q.EventSource.prototype),window.CurtainSyncViewer=function(t){var n=this;console.assert(t,"[CurtainSyncViewer] args is required"),console.assert(t.container,"[CurtainSyncViewer] args.container is required"),console.assert(t.images,"[CurtainSyncViewer] args.images is required"),console.assert(t.images.length>0,"[CurtainSyncViewer] args.images must have at least 1 image"),Q.EventSource.call(this),this.container=t.container,this.viewportEventThrottle=t.viewportEventThrottle||250,this.lastViewportEventTime=0,this.images=[],this.osdOptions=t.osdOptions||{},this.osdOptions.showNavigationControl=!1,"static"===getComputedStyle(this.container).position&&(this.container.style.position="relative"),t.images.forEach((function(t,e){console.assert(t.key,"[CurtainSyncViewer] args.images["+e+"].key is required"),console.assert(t.tileSource,"[CurtainSyncViewer] args.images["+e+"].tileSource is required"),n.images.push({key:t.key,tileSource:t.tileSource,shown:!!t.shown})})),this.setMode(t.mode||"curtain")},window.CurtainSyncViewer.prototype=Q.extend({getMode:function(){return this.modeKey},setMode:function(e){var r=this;if(console.assert("curtain"===e||"sync"===e,"[CurtainSyncViewer.setMode] Must have valid key."),e!==this.modeKey){this.mode&&this.mode.destroy(),this.modeKey=e;var i={container:this.container,images:this.images,zoom:this.zoom,pan:this.pan,osdOptions:Q.extend({},this.osdOptions)};this.mode="curtain"===e?new t(i):new n(i),this.mode.addHandler("change:viewport",(function(){r.handleViewportChange()})),this.mode.addHandler("add-item-failed",(function(t){r.raiseEvent("open-failed",{message:t.message||"",tileSource:t.options?t.options.tileSource:void 0})})),this.raiseEvent("change:mode")}},getZoom:function(){return this.mode.getZoom()},setZoom:function(t){console.assert("number"==typeof t&&t>0&&t<1/0,"[CurtainSyncViewer.setZoom] zoom must be a positive number"),this.mode.setZoom(t),this.handleViewportChange()},zoomIn:function(){this.mode.zoomIn(),this.handleViewportChange()},zoomOut:function(){this.mode.zoomOut(),this.handleViewportChange()},getPan:function(){return this.mode.getPan()},setPan:function(t){console.assert("object"==typeof t&&"number"==typeof t.x&&"number"==typeof t.y,"[CurtainSyncViewer.setPan] pan must be an object with an x and a y"),this.mode.setPan(new Q.Point(t.x,t.y)),this.handleViewportChange()},getImageShown:function(t){var n=!1;return this.images.forEach((function(e){e.key===t&&e.shown&&(n=!0)})),n},setImageShown:function(t,n){var e=this;n=!!n;var r=!1;this.images.forEach((function(i){i.key===t&&i.shown!==n&&(r=!0,i.shown=n,e.mode.updateImageShown(i))})),r&&this.raiseEvent("change:imageShown",{key:t})},handleViewportChange:function(){var t=this,n=this.getZoom(),e=this.getPan();if(!(this.zoom===n&&this.pan&&this.pan.x===e.x&&this.pan.y===e.y||this.viewportEventTimeout)){var r=Date.now(),i=r-this.lastViewportEventTime;i<this.viewportEventThrottle?this.viewportEventTimeout=setTimeout((function(){t.viewportEventTimeout=null,t.raiseEvent("change:viewport"),t.lastViewportEventTime=Date.now()}),this.viewportEventThrottle-i):(this.raiseEvent("change:viewport"),this.lastViewportEventTime=r)}this.zoom=n,this.pan=e}},Q.EventSource.prototype)}();var At=/^\s+|\s+$/g,St=/^[-+]0x[0-9a-f]+$/i,Tt=/^0b[01]+$/i,Mt=/^0o[0-7]+$/i,Ot=parseInt,It="object"==typeof self&&self&&self.Object===Object&&self,Et="object"==typeof nt&&nt&&nt.Object===Object&&nt||It||Function("return this")(),Ut=Object.prototype.toString,Dt=Math.max,Ht=Math.min,Rt=function(){return Et.Date.now()};function Bt(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function Lt(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==Ut.call(t)}(t))return NaN;if(Bt(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=Bt(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(At,"");var e=Tt.test(t);return e||Mt.test(t)?Ot(t.slice(2),e?2:8):St.test(t)?NaN:+t}const Pt=tt(G((function(t){window,t.exports=function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}([function(t,n,e){(n=e(2)(!1)).push([t.i,".a9s-toolbar-btn {\n  margin:4px 4px 4px 0;\n  outline:0;\n  border:none;\n  cursor:pointer;\n  background-color:transparent;\n  border-radius:4px;\n  padding:8px;\n  width:45px;\n  height:45px;\n}\n\n.a9s-toolbar-btn:hover {\n  background-color:rgba(0,0,0,0.05);\n}\n\n.a9s-toolbar-btn-inner {\n  display:flex;\n}\n\n.a9s-toolbar-btn svg {\n  overflow:visible;\n  width:100%;\n  height:100%;\n}\n\n.a9s-toolbar-btn svg * {\n  stroke-width:5px;\n  fill:none;\n  stroke:rgba(0,0,0,0.5);\n}\n\n.a9s-toolbar-btn g.handles circle {\n  stroke-width:4px;\n  fill:#fff;\n  stroke:#000;\n}\n\n.a9s-toolbar-btn.active {\n  background-color:rgba(0,0,0,0.3);\n}\n\n.a9s-toolbar-btn.active svg * {\n  stroke:rgba(255,255,255,0.6);\n}\n\n.a9s-toolbar-btn.active g.handles circle {\n  stroke:#fff;\n  fill:rgba(0,0,0,0.2);\n}\n",""]),t.exports=n},function(t,n,e){var r,i=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),o=[];function a(t){for(var n=-1,e=0;e<o.length;e++)if(o[e].identifier===t){n=e;break}return n}function s(t,n){for(var e={},r=[],i=0;i<t.length;i++){var s=t[i],l=n.base?s[0]+n.base:s[0],u=e[l]||0,c="".concat(l," ").concat(u);e[l]=u+1;var h=a(c),d={css:s[1],media:s[2],sourceMap:s[3]};-1!==h?(o[h].references++,o[h].updater(d)):o.push({identifier:c,updater:v(d,n),references:1}),r.push(c)}return r}function l(t){var n=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var o=e.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(t){n.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(n);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var u,c=(u=[],function(t,n){return u[t]=n,u.filter(Boolean).join("\n")});function h(t,n,e,r){var i=e?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=c(n,i);else{var o=document.createTextNode(i),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(o,a[n]):t.appendChild(o)}}function d(t,n,e){var r=e.css,i=e.media,o=e.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var f=null,p=0;function v(t,n){var e,r,i;if(n.singleton){var o=p++;e=f||(f=l(n)),r=h.bind(null,e,o,!1),i=h.bind(null,e,o,!0)}else e=l(n),r=d.bind(null,e,n),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else i()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var e=s(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<e.length;r++){var i=a(e[r]);o[i].references--}for(var l=s(t,n),u=0;u<e.length;u++){var c=a(e[u]);0===o[c].references&&(o[c].updater(),o.splice(c,1))}e=l}}}},function(t){t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e,r,i=t[1]||"",o=t[3];if(!o)return i;if(n&&"function"==typeof btoa){var a=(e=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e),"/*# ".concat(r," */")),s=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[i].concat(s).concat([a]).join("\n")}return[i].join("\n")}(n,t);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,r){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var s=0;s<t.length;s++){var l=[].concat(t[s]);r&&i[l[0]]||(e&&(l[2]=l[2]?"".concat(e," and ").concat(l[2]):e),n.push(l))}},n}},function(t,n,e){e.r(n);var r,i=e(1),o=e.n(i),a=e(0),s=e.n(a),l=(o()(s.a,{insert:"head",singleton:!1}),{rect:(r=document.createElementNS("http://www.w3.org/2000/svg","svg"),r.setAttribute("viewBox","0 0 70 50"),r.innerHTML='\n    <g>\n      <rect x="12" y="10" width="46" height="30" />\n      <g class="handles">\n        <circle cx="12"  cy="10"  r="5" />\n        <circle cx="58" cy="10"  r="5" />\n        <circle cx="12"  cy="40" r="5" />\n        <circle cx="58" cy="40" r="5" />\n      </g>\n    </g>\n  ',r),polygon:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <path d=\'M 5,14 60,5 55,45 18,38 Z\' />\n      <g class="handles">\n        <circle cx="5"  cy="14"  r="5" />\n        <circle cx="60" cy="5"  r="5" />\n        <circle cx="55"  cy="45" r="5" />\n        <circle cx="18" cy="38" r="5" />\n      </g>\n    </g>\n  ',t}(),circle:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <circle cx="35" cy="25" r="23" />\n      <g class="handles">\n        <circle cx="35" cy="2"  r="5" />\n        <circle cx="12" cy="25" r="5" />\n        <circle cx="58" cy="25" r="5" />\n        <circle cx="35" cy="48" r="5" />\n      </g>\n    </g>\n  ',t}(),ellipse:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <ellipse cx="35" cy="25" rx="30" ry="19" />\n      <g class="handles">\n        <circle cx="35" cy="6"  r="5" />\n        <circle cx="5" cy="25" r="5" />\n        <circle cx="65" cy="25" r="5" />\n        <circle cx="35" cy="44" r="5" />\n      </g>\n    </g>\n  ',t}(),freehand:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <path d="m 34.427966,2.7542372 c 0,0 -22.245763,20.7627118 -16.737288,27.7542378 5.508475,6.991525 27.648305,-15.36017 34.639831,-9.11017 6.991525,6.25 -11.440678,13.665255 -13.983051,25.423729" />\n      <g class="handles">\n        <circle cx="34.427966" cy="2.7542372"  r="5" />\n        <circle cx="38.347458" cy="46.822033" r="5" />\n      </g>\n    </g>\n  ',t}(),point:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <circle cx="36" cy="24" r="11" />\n      <g class="handles"><circle cx="36" cy="24" r="4" /></g>\n      <line x1="36" y1="3" x2="36" y2="13" />\n      <line x1="36" y1="35" x2="36" y2="45" />\n      <line x1="15" y1="24" x2="25" y2="24" />\n      <line x1="47" y1="24" x2="57" y2="24" />\n    </g>\n  ',t}(),"annotorious-tilted-box":function(){var t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 70 50"),t.innerHTML='\n    <g>\n      <path d="M 45.14,2.37 60.67,20.76 25.33,50.32 9.9,31.94 Z"/>\n      <g class="handles">\n        <circle cx="45.14" cy="2.37"  r="5" />\n        <circle cx="60.67" cy="20.76"  r="5" />\n        <circle cx="25.33" cy="50.32" r="5" />\n        <circle cx="9.9"   cy="31.94" r="5" />\n      </g>\n    </g>\n  ',t}()});n.default=function(t,n){var e=!!t.fitBounds,r=document.createElement("div");r.className="a9s-toolbar";var i=function(){var t,n,e=r.querySelector(".a9s-toolbar-btn.active");e&&("active",n=(t=e).getAttribute("class").split(" ").filter((function(t){return"active"!==t})),t.setAttribute("class",n.join(" ")))},o=function(t){var n,e;i(),n=t,(e=new Set(n.getAttribute("class").split(" "))).add("active"),n.setAttribute("class",Array.from(e).join(" "))};t.listDrawingTools().forEach((function(n,i){!function(n,i){var a=l[n];if(a){var s=document.createElement("button");s.className=i?"a9s-toolbar-btn ".concat(n," active"):"a9s-toolbar-btn ".concat(n);var u=document.createElement("span");u.className="a9s-toolbar-btn-inner",u.appendChild(a),s.addEventListener("click",(function(){o(s),t.setDrawingTool(n),e&&t.setDrawingEnabled(!0)})),s.appendChild(u),r.appendChild(s)}}(n,!e&&0===i)})),e&&t.on("createSelection",i),n.appendChild(r)}}]).default}))),Ft="https://api.visual-essays.net";class Nt{constructor(t,n,e){this._annotorious=et(t,{readOnly:!e}),this._token=e,n&&Pt(this._annotorious,n),this._annotorious.on("createAnnotation",(async t=>this._createAnnotation(t))),this._annotorious.on("updateAnnotation",(async t=>this._updateAnnotation(t))),this._annotorious.on("deleteAnnotation",(async t=>this._deleteAnnotation(t)))}setAuthToken(t){this._token=t}destroy(){this._annotorious.destroy()}selectAnnotation(t){this._annotorious.selectAnnotation(t)}async loadAnnotations(t){this._path=t;let n=[],e=await fetch(`${Ft}/annotations/${this._path}/`,{headers:{Accept:'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld'}});return e.ok&&(e=await e.json(),this._target=e.target,n=e.annotations,this._annotorious.setAnnotations(e.annotations)),n}getAnnotations(){return this._annotorious?this._annotorious.getAnnotations():[]}async getAnnotation(t){let n=await fetch(`${Ft}/annotation/${this._path}/${t}/`);if(n.ok)return await n.json()}async _createAnnotation(t){t.id=X(t.id).slice(0,8),t.target.id=this.sourceHash;let n=await fetch(`${Ft}/annotation/`,{method:"POST",headers:{"Content-Type":'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',Accept:'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',Authorization:`Bearer: ${this._token}`},body:JSON.stringify({annotation:t,path:this._path})});n.ok&&201===n.status?this._annotorious.setAnnotations(this._annotorious.getAnnotations()):console.log(`createAnnotation: unexpected resp_code=${n.status}`)}async _updateAnnotation(t){t.target.id=this._target;let n=await fetch(`${Ft}/annotation/${this._path}/${t.id.split("/").pop()}/`,{method:"PUT",headers:{"Content-Type":'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',Accept:'application/ld+json;profile="http://www.w3.org/ns/anno.jsonld',Authorization:`Bearer: ${this._token}`},body:JSON.stringify(t)});202!==n.status&&console.log(`updateAnnotation: unexpected resp_code=${n.status}`)}async _deleteAnnotation(t){let n=await fetch(`${Ft}/annotation/${this._path}/${t.id.split("/").pop()}/`,{method:"DELETE",headers:{Authorization:`Bearer: ${this._token}`}});204!==n.status&&console.log(`deleteAnnotation: unexpected resp_code=${n.status}`)}}var Vt=G((function(t,n){(function(){var e,r="Expected a function",i="__lodash_hash_undefined__",o="__lodash_placeholder__",a=32,s=128,l=1/0,u=9007199254740991,c=NaN,h=4294967295,d=[["ary",s],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",a],["partialRight",64],["rearg",256]],f="[object Arguments]",p="[object Array]",v="[object Boolean]",g="[object Date]",m="[object Error]",b="[object Function]",w="[object GeneratorFunction]",x="[object Map]",y="[object Number]",_="[object Object]",k="[object Promise]",$="[object RegExp]",z="[object Set]",C="[object String]",j="[object Symbol]",A="[object WeakMap]",S="[object ArrayBuffer]",T="[object DataView]",M="[object Float32Array]",O="[object Float64Array]",I="[object Int8Array]",E="[object Int16Array]",U="[object Int32Array]",D="[object Uint8Array]",H="[object Uint8ClampedArray]",R="[object Uint16Array]",B="[object Uint32Array]",L=/\b__p \+= '';/g,P=/\b(__p \+=) '' \+/g,F=/(__e\(.*?\)|\b__t\)) \+\n'';/g,N=/&(?:amp|lt|gt|quot|#39);/g,V=/[&<>"']/g,q=RegExp(N.source),Z=RegExp(V.source),W=/<%-([\s\S]+?)%>/g,X=/<%([\s\S]+?)%>/g,K=/<%=([\s\S]+?)%>/g,J=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Y=/^\w*$/,G=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Q=/[\\^$.*+?()[\]{}|]/g,tt=RegExp(Q.source),et=/^\s+/,rt=/\s/,it=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,ot=/\{\n\/\* \[wrapped with (.+)\] \*/,at=/,? & /,st=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,lt=/[()=,{}\[\]\/\s]/,ut=/\\(\\)?/g,ct=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,ht=/\w*$/,dt=/^[-+]0x[0-9a-f]+$/i,ft=/^0b[01]+$/i,pt=/^\[object .+?Constructor\]$/,vt=/^0o[0-7]+$/i,gt=/^(?:0|[1-9]\d*)$/,mt=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,bt=/($^)/,wt=/['\n\r\u2028\u2029\\]/g,xt="\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",yt="a-z\\xdf-\\xf6\\xf8-\\xff",_t="A-Z\\xc0-\\xd6\\xd8-\\xde",kt="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",$t="["+kt+"]",zt="["+xt+"]",Ct="\\d+",jt="["+yt+"]",At="[^\\ud800-\\udfff"+kt+Ct+"\\u2700-\\u27bf"+yt+_t+"]",St="\\ud83c[\\udffb-\\udfff]",Tt="[^\\ud800-\\udfff]",Mt="(?:\\ud83c[\\udde6-\\uddff]){2}",Ot="[\\ud800-\\udbff][\\udc00-\\udfff]",It="["+_t+"]",Et="(?:"+jt+"|"+At+")",Ut="(?:"+It+"|"+At+")",Dt="(?:['’](?:d|ll|m|re|s|t|ve))?",Ht="(?:['’](?:D|LL|M|RE|S|T|VE))?",Rt="(?:"+zt+"|"+St+")?",Bt="[\\ufe0e\\ufe0f]?",Lt=Bt+Rt+"(?:\\u200d(?:"+[Tt,Mt,Ot].join("|")+")"+Bt+Rt+")*",Pt="(?:"+["[\\u2700-\\u27bf]",Mt,Ot].join("|")+")"+Lt,Ft="(?:"+[Tt+zt+"?",zt,Mt,Ot,"[\\ud800-\\udfff]"].join("|")+")",Nt=RegExp("['’]","g"),Vt=RegExp(zt,"g"),qt=RegExp(St+"(?="+St+")|"+Ft+Lt,"g"),Zt=RegExp([It+"?"+jt+"+"+Dt+"(?="+[$t,It,"$"].join("|")+")",Ut+"+"+Ht+"(?="+[$t,It+Et,"$"].join("|")+")",It+"?"+Et+"+"+Dt,It+"+"+Ht,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Ct,Pt].join("|"),"g"),Wt=RegExp("[\\u200d\\ud800-\\udfff"+xt+"\\ufe0e\\ufe0f]"),Xt=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Kt=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Jt=-1,Yt={};Yt[M]=Yt[O]=Yt[I]=Yt[E]=Yt[U]=Yt[D]=Yt[H]=Yt[R]=Yt[B]=!0,Yt[f]=Yt[p]=Yt[S]=Yt[v]=Yt[T]=Yt[g]=Yt[m]=Yt[b]=Yt[x]=Yt[y]=Yt[_]=Yt[$]=Yt[z]=Yt[C]=Yt[A]=!1;var Gt={};Gt[f]=Gt[p]=Gt[S]=Gt[T]=Gt[v]=Gt[g]=Gt[M]=Gt[O]=Gt[I]=Gt[E]=Gt[U]=Gt[x]=Gt[y]=Gt[_]=Gt[$]=Gt[z]=Gt[C]=Gt[j]=Gt[D]=Gt[H]=Gt[R]=Gt[B]=!0,Gt[m]=Gt[b]=Gt[A]=!1;var Qt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},tn=parseFloat,nn=parseInt,en="object"==typeof nt&&nt&&nt.Object===Object&&nt,rn="object"==typeof self&&self&&self.Object===Object&&self,on=en||rn||Function("return this")(),an=n&&!n.nodeType&&n,sn=an&&t&&!t.nodeType&&t,ln=sn&&sn.exports===an,un=ln&&en.process,cn=function(){try{return sn&&sn.require&&sn.require("util").types||un&&un.binding&&un.binding("util")}catch(t){}}(),hn=cn&&cn.isArrayBuffer,dn=cn&&cn.isDate,fn=cn&&cn.isMap,pn=cn&&cn.isRegExp,vn=cn&&cn.isSet,gn=cn&&cn.isTypedArray;function mn(t,n,e){switch(e.length){case 0:return t.call(n);case 1:return t.call(n,e[0]);case 2:return t.call(n,e[0],e[1]);case 3:return t.call(n,e[0],e[1],e[2])}return t.apply(n,e)}function bn(t,n,e,r){for(var i=-1,o=null==t?0:t.length;++i<o;){var a=t[i];n(r,a,e(a),t)}return r}function wn(t,n){for(var e=-1,r=null==t?0:t.length;++e<r&&!1!==n(t[e],e,t););return t}function xn(t,n){for(var e=null==t?0:t.length;e--&&!1!==n(t[e],e,t););return t}function yn(t,n){for(var e=-1,r=null==t?0:t.length;++e<r;)if(!n(t[e],e,t))return!1;return!0}function _n(t,n){for(var e=-1,r=null==t?0:t.length,i=0,o=[];++e<r;){var a=t[e];n(a,e,t)&&(o[i++]=a)}return o}function kn(t,n){return!(null==t||!t.length)&&In(t,n,0)>-1}function $n(t,n,e){for(var r=-1,i=null==t?0:t.length;++r<i;)if(e(n,t[r]))return!0;return!1}function zn(t,n){for(var e=-1,r=null==t?0:t.length,i=Array(r);++e<r;)i[e]=n(t[e],e,t);return i}function Cn(t,n){for(var e=-1,r=n.length,i=t.length;++e<r;)t[i+e]=n[e];return t}function jn(t,n,e,r){var i=-1,o=null==t?0:t.length;for(r&&o&&(e=t[++i]);++i<o;)e=n(e,t[i],i,t);return e}function An(t,n,e,r){var i=null==t?0:t.length;for(r&&i&&(e=t[--i]);i--;)e=n(e,t[i],i,t);return e}function Sn(t,n){for(var e=-1,r=null==t?0:t.length;++e<r;)if(n(t[e],e,t))return!0;return!1}var Tn=Hn("length");function Mn(t,n,e){var r;return e(t,(function(t,e,i){if(n(t,e,i))return r=e,!1})),r}function On(t,n,e,r){for(var i=t.length,o=e+(r?1:-1);r?o--:++o<i;)if(n(t[o],o,t))return o;return-1}function In(t,n,e){return n==n?function(t,n,e){for(var r=e-1,i=t.length;++r<i;)if(t[r]===n)return r;return-1}(t,n,e):On(t,Un,e)}function En(t,n,e,r){for(var i=e-1,o=t.length;++i<o;)if(r(t[i],n))return i;return-1}function Un(t){return t!=t}function Dn(t,n){var e=null==t?0:t.length;return e?Ln(t,n)/e:c}function Hn(t){return function(n){return null==n?e:n[t]}}function Rn(t){return function(n){return null==t?e:t[n]}}function Bn(t,n,e,r,i){return i(t,(function(t,i,o){e=r?(r=!1,t):n(e,t,i,o)})),e}function Ln(t,n){for(var r,i=-1,o=t.length;++i<o;){var a=n(t[i]);a!==e&&(r=r===e?a:r+a)}return r}function Pn(t,n){for(var e=-1,r=Array(t);++e<t;)r[e]=n(e);return r}function Fn(t){return t?t.slice(0,ae(t)+1).replace(et,""):t}function Nn(t){return function(n){return t(n)}}function Vn(t,n){return zn(n,(function(n){return t[n]}))}function qn(t,n){return t.has(n)}function Zn(t,n){for(var e=-1,r=t.length;++e<r&&In(n,t[e],0)>-1;);return e}function Wn(t,n){for(var e=t.length;e--&&In(n,t[e],0)>-1;);return e}function Xn(t,n){for(var e=t.length,r=0;e--;)t[e]===n&&++r;return r}var Kn=Rn({À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"}),Jn=Rn({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});function Yn(t){return"\\"+Qt[t]}function Gn(t){return Wt.test(t)}function Qn(t){var n=-1,e=Array(t.size);return t.forEach((function(t,r){e[++n]=[r,t]})),e}function te(t,n){return function(e){return t(n(e))}}function ne(t,n){for(var e=-1,r=t.length,i=0,a=[];++e<r;){var s=t[e];s!==n&&s!==o||(t[e]=o,a[i++]=e)}return a}function ee(t){var n=-1,e=Array(t.size);return t.forEach((function(t){e[++n]=t})),e}function re(t){var n=-1,e=Array(t.size);return t.forEach((function(t){e[++n]=[t,t]})),e}function ie(t){return Gn(t)?function(t){for(var n=qt.lastIndex=0;qt.test(t);)++n;return n}(t):Tn(t)}function oe(t){return Gn(t)?function(t){return t.match(qt)||[]}(t):function(t){return t.split("")}(t)}function ae(t){for(var n=t.length;n--&&rt.test(t.charAt(n)););return n}var se=Rn({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),le=function t(n){var nt,rt=(n=null==n?on:le.defaults(on.Object(),n,le.pick(on,Kt))).Array,xt=n.Date,yt=n.Error,_t=n.Function,kt=n.Math,$t=n.Object,zt=n.RegExp,Ct=n.String,jt=n.TypeError,At=rt.prototype,St=$t.prototype,Tt=n["__core-js_shared__"],Mt=_t.prototype.toString,Ot=St.hasOwnProperty,It=0,Et=(nt=/[^.]+$/.exec(Tt&&Tt.keys&&Tt.keys.IE_PROTO||""))?"Symbol(src)_1."+nt:"",Ut=St.toString,Dt=Mt.call($t),Ht=on._,Rt=zt("^"+Mt.call(Ot).replace(Q,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Bt=ln?n.Buffer:e,Lt=n.Symbol,Pt=n.Uint8Array,Ft=Bt?Bt.allocUnsafe:e,qt=te($t.getPrototypeOf,$t),Wt=$t.create,Qt=St.propertyIsEnumerable,en=At.splice,rn=Lt?Lt.isConcatSpreadable:e,an=Lt?Lt.iterator:e,sn=Lt?Lt.toStringTag:e,un=function(){try{var t=lo($t,"defineProperty");return t({},"",{}),t}catch(t){}}(),cn=n.clearTimeout!==on.clearTimeout&&n.clearTimeout,Tn=xt&&xt.now!==on.Date.now&&xt.now,Rn=n.setTimeout!==on.setTimeout&&n.setTimeout,ue=kt.ceil,ce=kt.floor,he=$t.getOwnPropertySymbols,de=Bt?Bt.isBuffer:e,fe=n.isFinite,pe=At.join,ve=te($t.keys,$t),ge=kt.max,me=kt.min,be=xt.now,we=n.parseInt,xe=kt.random,ye=At.reverse,_e=lo(n,"DataView"),ke=lo(n,"Map"),$e=lo(n,"Promise"),ze=lo(n,"Set"),Ce=lo(n,"WeakMap"),je=lo($t,"create"),Ae=Ce&&new Ce,Se={},Te=Ro(_e),Me=Ro(ke),Oe=Ro($e),Ie=Ro(ze),Ee=Ro(Ce),Ue=Lt?Lt.prototype:e,De=Ue?Ue.valueOf:e,He=Ue?Ue.toString:e;function Re(t){if(ns(t)&&!Va(t)&&!(t instanceof Fe)){if(t instanceof Pe)return t;if(Ot.call(t,"__wrapped__"))return Bo(t)}return new Pe(t)}var Be=function(){function t(){}return function(n){if(!ts(n))return{};if(Wt)return Wt(n);t.prototype=n;var r=new t;return t.prototype=e,r}}();function Le(){}function Pe(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=e}function Fe(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=h,this.__views__=[]}function Ne(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function Ve(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function qe(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function Ze(t){var n=-1,e=null==t?0:t.length;for(this.__data__=new qe;++n<e;)this.add(t[n])}function We(t){var n=this.__data__=new Ve(t);this.size=n.size}function Xe(t,n){var e=Va(t),r=!e&&Na(t),i=!e&&!r&&Xa(t),o=!e&&!r&&!i&&us(t),a=e||r||i||o,s=a?Pn(t.length,Ct):[],l=s.length;for(var u in t)!n&&!Ot.call(t,u)||a&&("length"==u||i&&("offset"==u||"parent"==u)||o&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||go(u,l))||s.push(u);return s}function Ke(t){var n=t.length;return n?t[qr(0,n-1)]:e}function Je(t,n){return Io(Ci(t),or(n,0,t.length))}function Ye(t){return Io(Ci(t))}function Ge(t,n,r){(r!==e&&!La(t[n],r)||r===e&&!(n in t))&&rr(t,n,r)}function Qe(t,n,r){var i=t[n];Ot.call(t,n)&&La(i,r)&&(r!==e||n in t)||rr(t,n,r)}function tr(t,n){for(var e=t.length;e--;)if(La(t[e][0],n))return e;return-1}function nr(t,n,e,r){return cr(t,(function(t,i,o){n(r,t,e(t),o)})),r}function er(t,n){return t&&ji(n,Ms(n),t)}function rr(t,n,e){"__proto__"==n&&un?un(t,n,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[n]=e}function ir(t,n){for(var r=-1,i=n.length,o=rt(i),a=null==t;++r<i;)o[r]=a?e:Cs(t,n[r]);return o}function or(t,n,r){return t==t&&(r!==e&&(t=t<=r?t:r),n!==e&&(t=t>=n?t:n)),t}function ar(t,n,r,i,o,a){var s,l=1&n,u=2&n,c=4&n;if(r&&(s=o?r(t,i,o,a):r(t)),s!==e)return s;if(!ts(t))return t;var h=Va(t);if(h){if(s=function(t){var n=t.length,e=new t.constructor(n);return n&&"string"==typeof t[0]&&Ot.call(t,"index")&&(e.index=t.index,e.input=t.input),e}(t),!l)return Ci(t,s)}else{var d=ho(t),p=d==b||d==w;if(Xa(t))return xi(t,l);if(d==_||d==f||p&&!o){if(s=u||p?{}:po(t),!l)return u?function(t,n){return ji(t,co(t),n)}(t,function(t,n){return t&&ji(n,Os(n),t)}(s,t)):function(t,n){return ji(t,uo(t),n)}(t,er(s,t))}else{if(!Gt[d])return o?t:{};s=function(t,n,e){var r=t.constructor;switch(n){case S:return yi(t);case v:case g:return new r(+t);case T:return function(t,n){var e=n?yi(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}(t,e);case M:case O:case I:case E:case U:case D:case H:case R:case B:return _i(t,e);case x:return new r;case y:case C:return new r(t);case $:return function(t){var n=new t.constructor(t.source,ht.exec(t));return n.lastIndex=t.lastIndex,n}(t);case z:return new r;case j:return De?$t(De.call(t)):{}}}(t,d,l)}}a||(a=new We);var m=a.get(t);if(m)return m;a.set(t,s),as(t)?t.forEach((function(e){s.add(ar(e,n,r,e,t,a))})):es(t)&&t.forEach((function(e,i){s.set(i,ar(e,n,r,i,t,a))}));var k=h?e:(c?u?no:to:u?Os:Ms)(t);return wn(k||t,(function(e,i){k&&(e=t[i=e]),Qe(s,i,ar(e,n,r,i,t,a))})),s}function sr(t,n,r){var i=r.length;if(null==t)return!i;for(t=$t(t);i--;){var o=r[i],a=t[o];if(a===e&&!(o in t)||!(0,n[o])(a))return!1}return!0}function lr(t,n,i){if("function"!=typeof t)throw new jt(r);return So((function(){t.apply(e,i)}),n)}function ur(t,n,e,r){var i=-1,o=kn,a=!0,s=t.length,l=[],u=n.length;if(!s)return l;e&&(n=zn(n,Nn(e))),r?(o=$n,a=!1):n.length>=200&&(o=qn,a=!1,n=new Ze(n));t:for(;++i<s;){var c=t[i],h=null==e?c:e(c);if(c=r||0!==c?c:0,a&&h==h){for(var d=u;d--;)if(n[d]===h)continue t;l.push(c)}else o(n,h,r)||l.push(c)}return l}Re.templateSettings={escape:W,evaluate:X,interpolate:K,variable:"",imports:{_:Re}},(Re.prototype=Le.prototype).constructor=Re,(Pe.prototype=Be(Le.prototype)).constructor=Pe,(Fe.prototype=Be(Le.prototype)).constructor=Fe,Ne.prototype.clear=function(){this.__data__=je?je(null):{},this.size=0},Ne.prototype.delete=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n},Ne.prototype.get=function(t){var n=this.__data__;if(je){var r=n[t];return r===i?e:r}return Ot.call(n,t)?n[t]:e},Ne.prototype.has=function(t){var n=this.__data__;return je?n[t]!==e:Ot.call(n,t)},Ne.prototype.set=function(t,n){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=je&&n===e?i:n,this},Ve.prototype.clear=function(){this.__data__=[],this.size=0},Ve.prototype.delete=function(t){var n=this.__data__,e=tr(n,t);return!(e<0||(e==n.length-1?n.pop():en.call(n,e,1),--this.size,0))},Ve.prototype.get=function(t){var n=this.__data__,r=tr(n,t);return r<0?e:n[r][1]},Ve.prototype.has=function(t){return tr(this.__data__,t)>-1},Ve.prototype.set=function(t,n){var e=this.__data__,r=tr(e,t);return r<0?(++this.size,e.push([t,n])):e[r][1]=n,this},qe.prototype.clear=function(){this.size=0,this.__data__={hash:new Ne,map:new(ke||Ve),string:new Ne}},qe.prototype.delete=function(t){var n=ao(this,t).delete(t);return this.size-=n?1:0,n},qe.prototype.get=function(t){return ao(this,t).get(t)},qe.prototype.has=function(t){return ao(this,t).has(t)},qe.prototype.set=function(t,n){var e=ao(this,t),r=e.size;return e.set(t,n),this.size+=e.size==r?0:1,this},Ze.prototype.add=Ze.prototype.push=function(t){return this.__data__.set(t,i),this},Ze.prototype.has=function(t){return this.__data__.has(t)},We.prototype.clear=function(){this.__data__=new Ve,this.size=0},We.prototype.delete=function(t){var n=this.__data__,e=n.delete(t);return this.size=n.size,e},We.prototype.get=function(t){return this.__data__.get(t)},We.prototype.has=function(t){return this.__data__.has(t)},We.prototype.set=function(t,n){var e=this.__data__;if(e instanceof Ve){var r=e.__data__;if(!ke||r.length<199)return r.push([t,n]),this.size=++e.size,this;e=this.__data__=new qe(r)}return e.set(t,n),this.size=e.size,this};var cr=Ti(br),hr=Ti(wr,!0);function dr(t,n){var e=!0;return cr(t,(function(t,r,i){return e=!!n(t,r,i)})),e}function fr(t,n,r){for(var i=-1,o=t.length;++i<o;){var a=t[i],s=n(a);if(null!=s&&(l===e?s==s&&!ls(s):r(s,l)))var l=s,u=a}return u}function pr(t,n){var e=[];return cr(t,(function(t,r,i){n(t,r,i)&&e.push(t)})),e}function vr(t,n,e,r,i){var o=-1,a=t.length;for(e||(e=vo),i||(i=[]);++o<a;){var s=t[o];n>0&&e(s)?n>1?vr(s,n-1,e,r,i):Cn(i,s):r||(i[i.length]=s)}return i}var gr=Mi(),mr=Mi(!0);function br(t,n){return t&&gr(t,n,Ms)}function wr(t,n){return t&&mr(t,n,Ms)}function xr(t,n){return _n(n,(function(n){return Ya(t[n])}))}function yr(t,n){for(var r=0,i=(n=gi(n,t)).length;null!=t&&r<i;)t=t[Ho(n[r++])];return r&&r==i?t:e}function _r(t,n,e){var r=n(t);return Va(t)?r:Cn(r,e(t))}function kr(t){return null==t?t===e?"[object Undefined]":"[object Null]":sn&&sn in $t(t)?function(t){var n=Ot.call(t,sn),r=t[sn];try{t[sn]=e;var i=!0}catch(t){}var o=Ut.call(t);return i&&(n?t[sn]=r:delete t[sn]),o}(t):function(t){return Ut.call(t)}(t)}function $r(t,n){return t>n}function zr(t,n){return null!=t&&Ot.call(t,n)}function Cr(t,n){return null!=t&&n in $t(t)}function jr(t,n,r){for(var i=r?$n:kn,o=t[0].length,a=t.length,s=a,l=rt(a),u=1/0,c=[];s--;){var h=t[s];s&&n&&(h=zn(h,Nn(n))),u=me(h.length,u),l[s]=!r&&(n||o>=120&&h.length>=120)?new Ze(s&&h):e}h=t[0];var d=-1,f=l[0];t:for(;++d<o&&c.length<u;){var p=h[d],v=n?n(p):p;if(p=r||0!==p?p:0,!(f?qn(f,v):i(c,v,r))){for(s=a;--s;){var g=l[s];if(!(g?qn(g,v):i(t[s],v,r)))continue t}f&&f.push(v),c.push(p)}}return c}function Ar(t,n,r){var i=null==(t=zo(t,n=gi(n,t)))?t:t[Ho(Jo(n))];return null==i?e:mn(i,t,r)}function Sr(t){return ns(t)&&kr(t)==f}function Tr(t,n,r,i,o){return t===n||(null==t||null==n||!ns(t)&&!ns(n)?t!=t&&n!=n:function(t,n,r,i,o,a){var s=Va(t),l=Va(n),u=s?p:ho(t),c=l?p:ho(n),h=(u=u==f?_:u)==_,d=(c=c==f?_:c)==_,b=u==c;if(b&&Xa(t)){if(!Xa(n))return!1;s=!0,h=!1}if(b&&!h)return a||(a=new We),s||us(t)?Gi(t,n,r,i,o,a):function(t,n,e,r,i,o,a){switch(e){case T:if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)return!1;t=t.buffer,n=n.buffer;case S:return!(t.byteLength!=n.byteLength||!o(new Pt(t),new Pt(n)));case v:case g:case y:return La(+t,+n);case m:return t.name==n.name&&t.message==n.message;case $:case C:return t==n+"";case x:var s=Qn;case z:if(s||(s=ee),t.size!=n.size&&!(1&r))return!1;var l=a.get(t);if(l)return l==n;r|=2,a.set(t,n);var u=Gi(s(t),s(n),r,i,o,a);return a.delete(t),u;case j:if(De)return De.call(t)==De.call(n)}return!1}(t,n,u,r,i,o,a);if(!(1&r)){var w=h&&Ot.call(t,"__wrapped__"),k=d&&Ot.call(n,"__wrapped__");if(w||k){var A=w?t.value():t,M=k?n.value():n;return a||(a=new We),o(A,M,r,i,a)}}return!!b&&(a||(a=new We),function(t,n,r,i,o,a){var s=1&r,l=to(t),u=l.length;if(u!=to(n).length&&!s)return!1;for(var c=u;c--;){var h=l[c];if(!(s?h in n:Ot.call(n,h)))return!1}var d=a.get(t),f=a.get(n);if(d&&f)return d==n&&f==t;var p=!0;a.set(t,n),a.set(n,t);for(var v=s;++c<u;){var g=t[h=l[c]],m=n[h];if(i)var b=s?i(m,g,h,n,t,a):i(g,m,h,t,n,a);if(!(b===e?g===m||o(g,m,r,i,a):b)){p=!1;break}v||(v="constructor"==h)}if(p&&!v){var w=t.constructor,x=n.constructor;w==x||!("constructor"in t)||!("constructor"in n)||"function"==typeof w&&w instanceof w&&"function"==typeof x&&x instanceof x||(p=!1)}return a.delete(t),a.delete(n),p}(t,n,r,i,o,a))}(t,n,r,i,Tr,o))}function Mr(t,n,r,i){var o=r.length,a=o,s=!i;if(null==t)return!a;for(t=$t(t);o--;){var l=r[o];if(s&&l[2]?l[1]!==t[l[0]]:!(l[0]in t))return!1}for(;++o<a;){var u=(l=r[o])[0],c=t[u],h=l[1];if(s&&l[2]){if(c===e&&!(u in t))return!1}else{var d=new We;if(i)var f=i(c,h,u,t,n,d);if(!(f===e?Tr(h,c,3,i,d):f))return!1}}return!0}function Or(t){return!(!ts(t)||(n=t,Et&&Et in n))&&(Ya(t)?Rt:pt).test(Ro(t));var n}function Ir(t){return"function"==typeof t?t:null==t?rl:"object"==typeof t?Va(t)?Rr(t[0],t[1]):Hr(t):dl(t)}function Er(t){if(!yo(t))return ve(t);var n=[];for(var e in $t(t))Ot.call(t,e)&&"constructor"!=e&&n.push(e);return n}function Ur(t,n){return t<n}function Dr(t,n){var e=-1,r=Za(t)?rt(t.length):[];return cr(t,(function(t,i,o){r[++e]=n(t,i,o)})),r}function Hr(t){var n=so(t);return 1==n.length&&n[0][2]?ko(n[0][0],n[0][1]):function(e){return e===t||Mr(e,t,n)}}function Rr(t,n){return bo(t)&&_o(n)?ko(Ho(t),n):function(r){var i=Cs(r,t);return i===e&&i===n?js(r,t):Tr(n,i,3)}}function Br(t,n,r,i,o){t!==n&&gr(n,(function(a,s){if(o||(o=new We),ts(a))!function(t,n,r,i,o,a,s){var l=jo(t,r),u=jo(n,r),c=s.get(u);if(c)Ge(t,r,c);else{var h=a?a(l,u,r+"",t,n,s):e,d=h===e;if(d){var f=Va(u),p=!f&&Xa(u),v=!f&&!p&&us(u);h=u,f||p||v?Va(l)?h=l:Wa(l)?h=Ci(l):p?(d=!1,h=xi(u,!0)):v?(d=!1,h=_i(u,!0)):h=[]:is(u)||Na(u)?(h=l,Na(l)?h=ms(l):ts(l)&&!Ya(l)||(h=po(u))):d=!1}d&&(s.set(u,h),o(h,u,i,a,s),s.delete(u)),Ge(t,r,h)}}(t,n,s,r,Br,i,o);else{var l=i?i(jo(t,s),a,s+"",t,n,o):e;l===e&&(l=a),Ge(t,s,l)}}),Os)}function Lr(t,n){var r=t.length;if(r)return go(n+=n<0?r:0,r)?t[n]:e}function Pr(t,n,e){n=n.length?zn(n,(function(t){return Va(t)?function(n){return yr(n,1===t.length?t[0]:t)}:t})):[rl];var r=-1;return n=zn(n,Nn(oo())),function(t){var n=t.length;for(t.sort((function(t,n){return function(t,n,e){for(var r=-1,i=t.criteria,o=n.criteria,a=i.length,s=e.length;++r<a;){var l=ki(i[r],o[r]);if(l)return r>=s?l:l*("desc"==e[r]?-1:1)}return t.index-n.index}(t,n,e)}));n--;)t[n]=t[n].value;return t}(Dr(t,(function(t){return{criteria:zn(n,(function(n){return n(t)})),index:++r,value:t}})))}function Fr(t,n,e){for(var r=-1,i=n.length,o={};++r<i;){var a=n[r],s=yr(t,a);e(s,a)&&Jr(o,gi(a,t),s)}return o}function Nr(t,n,e,r){var i=r?En:In,o=-1,a=n.length,s=t;for(t===n&&(n=Ci(n)),e&&(s=zn(t,Nn(e)));++o<a;)for(var l=0,u=n[o],c=e?e(u):u;(l=i(s,c,l,r))>-1;)s!==t&&en.call(s,l,1),en.call(t,l,1);return t}function Vr(t,n){for(var e=t?n.length:0,r=e-1;e--;){var i=n[e];if(e==r||i!==o){var o=i;go(i)?en.call(t,i,1):li(t,i)}}return t}function qr(t,n){return t+ce(xe()*(n-t+1))}function Zr(t,n){var e="";if(!t||n<1||n>u)return e;do{n%2&&(e+=t),(n=ce(n/2))&&(t+=t)}while(n);return e}function Wr(t,n){return To($o(t,n,rl),t+"")}function Xr(t){return Ke(Ls(t))}function Kr(t,n){var e=Ls(t);return Io(e,or(n,0,e.length))}function Jr(t,n,r,i){if(!ts(t))return t;for(var o=-1,a=(n=gi(n,t)).length,s=a-1,l=t;null!=l&&++o<a;){var u=Ho(n[o]),c=r;if("__proto__"===u||"constructor"===u||"prototype"===u)return t;if(o!=s){var h=l[u];(c=i?i(h,u,l):e)===e&&(c=ts(h)?h:go(n[o+1])?[]:{})}Qe(l,u,c),l=l[u]}return t}var Yr=Ae?function(t,n){return Ae.set(t,n),t}:rl,Gr=un?function(t,n){return un(t,"toString",{configurable:!0,enumerable:!1,value:tl(n),writable:!0})}:rl;function Qr(t){return Io(Ls(t))}function ti(t,n,e){var r=-1,i=t.length;n<0&&(n=-n>i?0:i+n),(e=e>i?i:e)<0&&(e+=i),i=n>e?0:e-n>>>0,n>>>=0;for(var o=rt(i);++r<i;)o[r]=t[r+n];return o}function ni(t,n){var e;return cr(t,(function(t,r,i){return!(e=n(t,r,i))})),!!e}function ei(t,n,e){var r=0,i=null==t?r:t.length;if("number"==typeof n&&n==n&&i<=2147483647){for(;r<i;){var o=r+i>>>1,a=t[o];null!==a&&!ls(a)&&(e?a<=n:a<n)?r=o+1:i=o}return i}return ri(t,n,rl,e)}function ri(t,n,r,i){var o=0,a=null==t?0:t.length;if(0===a)return 0;for(var s=(n=r(n))!=n,l=null===n,u=ls(n),c=n===e;o<a;){var h=ce((o+a)/2),d=r(t[h]),f=d!==e,p=null===d,v=d==d,g=ls(d);if(s)var m=i||v;else m=c?v&&(i||f):l?v&&f&&(i||!p):u?v&&f&&!p&&(i||!g):!p&&!g&&(i?d<=n:d<n);m?o=h+1:a=h}return me(a,4294967294)}function ii(t,n){for(var e=-1,r=t.length,i=0,o=[];++e<r;){var a=t[e],s=n?n(a):a;if(!e||!La(s,l)){var l=s;o[i++]=0===a?0:a}}return o}function oi(t){return"number"==typeof t?t:ls(t)?c:+t}function ai(t){if("string"==typeof t)return t;if(Va(t))return zn(t,ai)+"";if(ls(t))return He?He.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}function si(t,n,e){var r=-1,i=kn,o=t.length,a=!0,s=[],l=s;if(e)a=!1,i=$n;else if(o>=200){var u=n?null:Zi(t);if(u)return ee(u);a=!1,i=qn,l=new Ze}else l=n?[]:s;t:for(;++r<o;){var c=t[r],h=n?n(c):c;if(c=e||0!==c?c:0,a&&h==h){for(var d=l.length;d--;)if(l[d]===h)continue t;n&&l.push(h),s.push(c)}else i(l,h,e)||(l!==s&&l.push(h),s.push(c))}return s}function li(t,n){return null==(t=zo(t,n=gi(n,t)))||delete t[Ho(Jo(n))]}function ui(t,n,e,r){return Jr(t,n,e(yr(t,n)),r)}function ci(t,n,e,r){for(var i=t.length,o=r?i:-1;(r?o--:++o<i)&&n(t[o],o,t););return e?ti(t,r?0:o,r?o+1:i):ti(t,r?o+1:0,r?i:o)}function hi(t,n){var e=t;return e instanceof Fe&&(e=e.value()),jn(n,(function(t,n){return n.func.apply(n.thisArg,Cn([t],n.args))}),e)}function di(t,n,e){var r=t.length;if(r<2)return r?si(t[0]):[];for(var i=-1,o=rt(r);++i<r;)for(var a=t[i],s=-1;++s<r;)s!=i&&(o[i]=ur(o[i]||a,t[s],n,e));return si(vr(o,1),n,e)}function fi(t,n,r){for(var i=-1,o=t.length,a=n.length,s={};++i<o;)r(s,t[i],i<a?n[i]:e);return s}function pi(t){return Wa(t)?t:[]}function vi(t){return"function"==typeof t?t:rl}function gi(t,n){return Va(t)?t:bo(t,n)?[t]:Do(bs(t))}var mi=Wr;function bi(t,n,r){var i=t.length;return r=r===e?i:r,!n&&r>=i?t:ti(t,n,r)}var wi=cn||function(t){return on.clearTimeout(t)};function xi(t,n){if(n)return t.slice();var e=t.length,r=Ft?Ft(e):new t.constructor(e);return t.copy(r),r}function yi(t){var n=new t.constructor(t.byteLength);return new Pt(n).set(new Pt(t)),n}function _i(t,n){var e=n?yi(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}function ki(t,n){if(t!==n){var r=t!==e,i=null===t,o=t==t,a=ls(t),s=n!==e,l=null===n,u=n==n,c=ls(n);if(!l&&!c&&!a&&t>n||a&&s&&u&&!l&&!c||i&&s&&u||!r&&u||!o)return 1;if(!i&&!a&&!c&&t<n||c&&r&&o&&!i&&!a||l&&r&&o||!s&&o||!u)return-1}return 0}function $i(t,n,e,r){for(var i=-1,o=t.length,a=e.length,s=-1,l=n.length,u=ge(o-a,0),c=rt(l+u),h=!r;++s<l;)c[s]=n[s];for(;++i<a;)(h||i<o)&&(c[e[i]]=t[i]);for(;u--;)c[s++]=t[i++];return c}function zi(t,n,e,r){for(var i=-1,o=t.length,a=-1,s=e.length,l=-1,u=n.length,c=ge(o-s,0),h=rt(c+u),d=!r;++i<c;)h[i]=t[i];for(var f=i;++l<u;)h[f+l]=n[l];for(;++a<s;)(d||i<o)&&(h[f+e[a]]=t[i++]);return h}function Ci(t,n){var e=-1,r=t.length;for(n||(n=rt(r));++e<r;)n[e]=t[e];return n}function ji(t,n,r,i){var o=!r;r||(r={});for(var a=-1,s=n.length;++a<s;){var l=n[a],u=i?i(r[l],t[l],l,r,t):e;u===e&&(u=t[l]),o?rr(r,l,u):Qe(r,l,u)}return r}function Ai(t,n){return function(e,r){var i=Va(e)?bn:nr,o=n?n():{};return i(e,t,oo(r,2),o)}}function Si(t){return Wr((function(n,r){var i=-1,o=r.length,a=o>1?r[o-1]:e,s=o>2?r[2]:e;for(a=t.length>3&&"function"==typeof a?(o--,a):e,s&&mo(r[0],r[1],s)&&(a=o<3?e:a,o=1),n=$t(n);++i<o;){var l=r[i];l&&t(n,l,i,a)}return n}))}function Ti(t,n){return function(e,r){if(null==e)return e;if(!Za(e))return t(e,r);for(var i=e.length,o=n?i:-1,a=$t(e);(n?o--:++o<i)&&!1!==r(a[o],o,a););return e}}function Mi(t){return function(n,e,r){for(var i=-1,o=$t(n),a=r(n),s=a.length;s--;){var l=a[t?s:++i];if(!1===e(o[l],l,o))break}return n}}function Oi(t){return function(n){var r=Gn(n=bs(n))?oe(n):e,i=r?r[0]:n.charAt(0),o=r?bi(r,1).join(""):n.slice(1);return i[t]()+o}}function Ii(t){return function(n){return jn(Ys(Ns(n).replace(Nt,"")),t,"")}}function Ei(t){return function(){var n=arguments;switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var e=Be(t.prototype),r=t.apply(e,n);return ts(r)?r:e}}function Ui(t){return function(n,r,i){var o=$t(n);if(!Za(n)){var a=oo(r,3);n=Ms(n),r=function(t){return a(o[t],t,o)}}var s=t(n,r,i);return s>-1?o[a?n[s]:s]:e}}function Di(t){return Qi((function(n){var i=n.length,o=i,a=Pe.prototype.thru;for(t&&n.reverse();o--;){var s=n[o];if("function"!=typeof s)throw new jt(r);if(a&&!l&&"wrapper"==ro(s))var l=new Pe([],!0)}for(o=l?o:i;++o<i;){var u=ro(s=n[o]),c="wrapper"==u?eo(s):e;l=c&&wo(c[0])&&424==c[1]&&!c[4].length&&1==c[9]?l[ro(c[0])].apply(l,c[3]):1==s.length&&wo(s)?l[u]():l.thru(s)}return function(){var t=arguments,e=t[0];if(l&&1==t.length&&Va(e))return l.plant(e).value();for(var r=0,o=i?n[r].apply(this,t):e;++r<i;)o=n[r].call(this,o);return o}}))}function Hi(t,n,r,i,o,a,l,u,c,h){var d=n&s,f=1&n,p=2&n,v=24&n,g=512&n,m=p?e:Ei(t);return function e(){for(var s=arguments.length,b=rt(s),w=s;w--;)b[w]=arguments[w];if(v)var x=io(e),y=Xn(b,x);if(i&&(b=$i(b,i,o,v)),a&&(b=zi(b,a,l,v)),s-=y,v&&s<h){var _=ne(b,x);return Vi(t,n,Hi,e.placeholder,r,b,_,u,c,h-s)}var k=f?r:this,$=p?k[t]:t;return s=b.length,u?b=Co(b,u):g&&s>1&&b.reverse(),d&&c<s&&(b.length=c),this&&this!==on&&this instanceof e&&($=m||Ei($)),$.apply(k,b)}}function Ri(t,n){return function(e,r){return function(t,n,e,r){return br(t,(function(t,i,o){n(r,e(t),i,o)})),r}(e,t,n(r),{})}}function Bi(t,n){return function(r,i){var o;if(r===e&&i===e)return n;if(r!==e&&(o=r),i!==e){if(o===e)return i;"string"==typeof r||"string"==typeof i?(r=ai(r),i=ai(i)):(r=oi(r),i=oi(i)),o=t(r,i)}return o}}function Li(t){return Qi((function(n){return n=zn(n,Nn(oo())),Wr((function(e){var r=this;return t(n,(function(t){return mn(t,r,e)}))}))}))}function Pi(t,n){var r=(n=n===e?" ":ai(n)).length;if(r<2)return r?Zr(n,t):n;var i=Zr(n,ue(t/ie(n)));return Gn(n)?bi(oe(i),0,t).join(""):i.slice(0,t)}function Fi(t){return function(n,r,i){return i&&"number"!=typeof i&&mo(n,r,i)&&(r=i=e),n=fs(n),r===e?(r=n,n=0):r=fs(r),function(t,n,e,r){for(var i=-1,o=ge(ue((n-t)/(e||1)),0),a=rt(o);o--;)a[r?o:++i]=t,t+=e;return a}(n,r,i=i===e?n<r?1:-1:fs(i),t)}}function Ni(t){return function(n,e){return"string"==typeof n&&"string"==typeof e||(n=gs(n),e=gs(e)),t(n,e)}}function Vi(t,n,r,i,o,s,l,u,c,h){var d=8&n;n|=d?a:64,4&(n&=~(d?64:a))||(n&=-4);var f=[t,n,o,d?s:e,d?l:e,d?e:s,d?e:l,u,c,h],p=r.apply(e,f);return wo(t)&&Ao(p,f),p.placeholder=i,Mo(p,t,n)}function qi(t){var n=kt[t];return function(t,e){if(t=gs(t),(e=null==e?0:me(ps(e),292))&&fe(t)){var r=(bs(t)+"e").split("e");return+((r=(bs(n(r[0]+"e"+(+r[1]+e)))+"e").split("e"))[0]+"e"+(+r[1]-e))}return n(t)}}var Zi=ze&&1/ee(new ze([,-0]))[1]==l?function(t){return new ze(t)}:ll;function Wi(t){return function(n){var e=ho(n);return e==x?Qn(n):e==z?re(n):function(t,n){return zn(n,(function(n){return[n,t[n]]}))}(n,t(n))}}function Xi(t,n,i,l,u,c,h,d){var f=2&n;if(!f&&"function"!=typeof t)throw new jt(r);var p=l?l.length:0;if(p||(n&=-97,l=u=e),h=h===e?h:ge(ps(h),0),d=d===e?d:ps(d),p-=u?u.length:0,64&n){var v=l,g=u;l=u=e}var m=f?e:eo(t),b=[t,n,i,l,u,v,g,c,h,d];if(m&&function(t,n){var e=t[1],r=n[1],i=e|r;if(!(i<131||(r==s&&8==e||r==s&&256==e&&t[7].length<=n[8]||384==r&&n[7].length<=n[8]&&8==e)))return t;1&r&&(t[2]=n[2],i|=1&e?0:4);var a=n[3];if(a){var l=t[3];t[3]=l?$i(l,a,n[4]):a,t[4]=l?ne(t[3],o):n[4]}(a=n[5])&&(t[5]=(l=t[5])?zi(l,a,n[6]):a,t[6]=l?ne(t[5],o):n[6]),(a=n[7])&&(t[7]=a),r&s&&(t[8]=null==t[8]?n[8]:me(t[8],n[8])),null==t[9]&&(t[9]=n[9]),t[0]=n[0],t[1]=i}(b,m),t=b[0],n=b[1],i=b[2],l=b[3],u=b[4],!(d=b[9]=b[9]===e?f?0:t.length:ge(b[9]-p,0))&&24&n&&(n&=-25),n&&1!=n)w=8==n||16==n?function(t,n,r){var i=Ei(t);return function o(){for(var a=arguments.length,s=rt(a),l=a,u=io(o);l--;)s[l]=arguments[l];var c=a<3&&s[0]!==u&&s[a-1]!==u?[]:ne(s,u);return(a-=c.length)<r?Vi(t,n,Hi,o.placeholder,e,s,c,e,e,r-a):mn(this&&this!==on&&this instanceof o?i:t,this,s)}}(t,n,d):n!=a&&33!=n||u.length?Hi.apply(e,b):function(t,n,e,r){var i=1&n,o=Ei(t);return function n(){for(var a=-1,s=arguments.length,l=-1,u=r.length,c=rt(u+s),h=this&&this!==on&&this instanceof n?o:t;++l<u;)c[l]=r[l];for(;s--;)c[l++]=arguments[++a];return mn(h,i?e:this,c)}}(t,n,i,l);else var w=function(t,n,e){var r=1&n,i=Ei(t);return function n(){return(this&&this!==on&&this instanceof n?i:t).apply(r?e:this,arguments)}}(t,n,i);return Mo((m?Yr:Ao)(w,b),t,n)}function Ki(t,n,r,i){return t===e||La(t,St[r])&&!Ot.call(i,r)?n:t}function Ji(t,n,r,i,o,a){return ts(t)&&ts(n)&&(a.set(n,t),Br(t,n,e,Ji,a),a.delete(n)),t}function Yi(t){return is(t)?e:t}function Gi(t,n,r,i,o,a){var s=1&r,l=t.length,u=n.length;if(l!=u&&!(s&&u>l))return!1;var c=a.get(t),h=a.get(n);if(c&&h)return c==n&&h==t;var d=-1,f=!0,p=2&r?new Ze:e;for(a.set(t,n),a.set(n,t);++d<l;){var v=t[d],g=n[d];if(i)var m=s?i(g,v,d,n,t,a):i(v,g,d,t,n,a);if(m!==e){if(m)continue;f=!1;break}if(p){if(!Sn(n,(function(t,n){if(!qn(p,n)&&(v===t||o(v,t,r,i,a)))return p.push(n)}))){f=!1;break}}else if(v!==g&&!o(v,g,r,i,a)){f=!1;break}}return a.delete(t),a.delete(n),f}function Qi(t){return To($o(t,e,qo),t+"")}function to(t){return _r(t,Ms,uo)}function no(t){return _r(t,Os,co)}var eo=Ae?function(t){return Ae.get(t)}:ll;function ro(t){for(var n=t.name+"",e=Se[n],r=Ot.call(Se,n)?e.length:0;r--;){var i=e[r],o=i.func;if(null==o||o==t)return i.name}return n}function io(t){return(Ot.call(Re,"placeholder")?Re:t).placeholder}function oo(){var t=Re.iteratee||il;return t=t===il?Ir:t,arguments.length?t(arguments[0],arguments[1]):t}function ao(t,n){var e,r,i=t.__data__;return("string"==(r=typeof(e=n))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==e:null===e)?i["string"==typeof n?"string":"hash"]:i.map}function so(t){for(var n=Ms(t),e=n.length;e--;){var r=n[e],i=t[r];n[e]=[r,i,_o(i)]}return n}function lo(t,n){var r=function(t,n){return null==t?e:t[n]}(t,n);return Or(r)?r:e}var uo=he?function(t){return null==t?[]:(t=$t(t),_n(he(t),(function(n){return Qt.call(t,n)})))}:vl,co=he?function(t){for(var n=[];t;)Cn(n,uo(t)),t=qt(t);return n}:vl,ho=kr;function fo(t,n,e){for(var r=-1,i=(n=gi(n,t)).length,o=!1;++r<i;){var a=Ho(n[r]);if(!(o=null!=t&&e(t,a)))break;t=t[a]}return o||++r!=i?o:!!(i=null==t?0:t.length)&&Qa(i)&&go(a,i)&&(Va(t)||Na(t))}function po(t){return"function"!=typeof t.constructor||yo(t)?{}:Be(qt(t))}function vo(t){return Va(t)||Na(t)||!!(rn&&t&&t[rn])}function go(t,n){var e=typeof t;return!!(n=null==n?u:n)&&("number"==e||"symbol"!=e&&gt.test(t))&&t>-1&&t%1==0&&t<n}function mo(t,n,e){if(!ts(e))return!1;var r=typeof n;return!!("number"==r?Za(e)&&go(n,e.length):"string"==r&&n in e)&&La(e[n],t)}function bo(t,n){if(Va(t))return!1;var e=typeof t;return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!ls(t))||Y.test(t)||!J.test(t)||null!=n&&t in $t(n)}function wo(t){var n=ro(t),e=Re[n];if("function"!=typeof e||!(n in Fe.prototype))return!1;if(t===e)return!0;var r=eo(e);return!!r&&t===r[0]}(_e&&ho(new _e(new ArrayBuffer(1)))!=T||ke&&ho(new ke)!=x||$e&&ho($e.resolve())!=k||ze&&ho(new ze)!=z||Ce&&ho(new Ce)!=A)&&(ho=function(t){var n=kr(t),r=n==_?t.constructor:e,i=r?Ro(r):"";if(i)switch(i){case Te:return T;case Me:return x;case Oe:return k;case Ie:return z;case Ee:return A}return n});var xo=Tt?Ya:gl;function yo(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||St)}function _o(t){return t==t&&!ts(t)}function ko(t,n){return function(r){return null!=r&&r[t]===n&&(n!==e||t in $t(r))}}function $o(t,n,r){return n=ge(n===e?t.length-1:n,0),function(){for(var e=arguments,i=-1,o=ge(e.length-n,0),a=rt(o);++i<o;)a[i]=e[n+i];i=-1;for(var s=rt(n+1);++i<n;)s[i]=e[i];return s[n]=r(a),mn(t,this,s)}}function zo(t,n){return n.length<2?t:yr(t,ti(n,0,-1))}function Co(t,n){for(var r=t.length,i=me(n.length,r),o=Ci(t);i--;){var a=n[i];t[i]=go(a,r)?o[a]:e}return t}function jo(t,n){if(("constructor"!==n||"function"!=typeof t[n])&&"__proto__"!=n)return t[n]}var Ao=Oo(Yr),So=Rn||function(t,n){return on.setTimeout(t,n)},To=Oo(Gr);function Mo(t,n,e){var r=n+"";return To(t,function(t,n){var e=n.length;if(!e)return t;var r=e-1;return n[r]=(e>1?"& ":"")+n[r],n=n.join(e>2?", ":" "),t.replace(it,"{\n/* [wrapped with "+n+"] */\n")}(r,function(t,n){return wn(d,(function(e){var r="_."+e[0];n&e[1]&&!kn(t,r)&&t.push(r)})),t.sort()}(function(t){var n=t.match(ot);return n?n[1].split(at):[]}(r),e)))}function Oo(t){var n=0,r=0;return function(){var i=be(),o=16-(i-r);if(r=i,o>0){if(++n>=800)return arguments[0]}else n=0;return t.apply(e,arguments)}}function Io(t,n){var r=-1,i=t.length,o=i-1;for(n=n===e?i:n;++r<n;){var a=qr(r,o),s=t[a];t[a]=t[r],t[r]=s}return t.length=n,t}var Eo,Uo,Do=(Eo=Ea((function(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(G,(function(t,e,r,i){n.push(r?i.replace(ut,"$1"):e||t)})),n}),(function(t){return 500===Uo.size&&Uo.clear(),t})),Uo=Eo.cache,Eo);function Ho(t){if("string"==typeof t||ls(t))return t;var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}function Ro(t){if(null!=t){try{return Mt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Bo(t){if(t instanceof Fe)return t.clone();var n=new Pe(t.__wrapped__,t.__chain__);return n.__actions__=Ci(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}var Lo=Wr((function(t,n){return Wa(t)?ur(t,vr(n,1,Wa,!0)):[]})),Po=Wr((function(t,n){var r=Jo(n);return Wa(r)&&(r=e),Wa(t)?ur(t,vr(n,1,Wa,!0),oo(r,2)):[]})),Fo=Wr((function(t,n){var r=Jo(n);return Wa(r)&&(r=e),Wa(t)?ur(t,vr(n,1,Wa,!0),e,r):[]}));function No(t,n,e){var r=null==t?0:t.length;if(!r)return-1;var i=null==e?0:ps(e);return i<0&&(i=ge(r+i,0)),On(t,oo(n,3),i)}function Vo(t,n,r){var i=null==t?0:t.length;if(!i)return-1;var o=i-1;return r!==e&&(o=ps(r),o=r<0?ge(i+o,0):me(o,i-1)),On(t,oo(n,3),o,!0)}function qo(t){return null!=t&&t.length?vr(t,1):[]}function Zo(t){return t&&t.length?t[0]:e}var Wo=Wr((function(t){var n=zn(t,pi);return n.length&&n[0]===t[0]?jr(n):[]})),Xo=Wr((function(t){var n=Jo(t),r=zn(t,pi);return n===Jo(r)?n=e:r.pop(),r.length&&r[0]===t[0]?jr(r,oo(n,2)):[]})),Ko=Wr((function(t){var n=Jo(t),r=zn(t,pi);return(n="function"==typeof n?n:e)&&r.pop(),r.length&&r[0]===t[0]?jr(r,e,n):[]}));function Jo(t){var n=null==t?0:t.length;return n?t[n-1]:e}var Yo=Wr(Go);function Go(t,n){return t&&t.length&&n&&n.length?Nr(t,n):t}var Qo=Qi((function(t,n){var e=null==t?0:t.length,r=ir(t,n);return Vr(t,zn(n,(function(t){return go(t,e)?+t:t})).sort(ki)),r}));function ta(t){return null==t?t:ye.call(t)}var na=Wr((function(t){return si(vr(t,1,Wa,!0))})),ea=Wr((function(t){var n=Jo(t);return Wa(n)&&(n=e),si(vr(t,1,Wa,!0),oo(n,2))})),ra=Wr((function(t){var n=Jo(t);return n="function"==typeof n?n:e,si(vr(t,1,Wa,!0),e,n)}));function ia(t){if(!t||!t.length)return[];var n=0;return t=_n(t,(function(t){if(Wa(t))return n=ge(t.length,n),!0})),Pn(n,(function(n){return zn(t,Hn(n))}))}function oa(t,n){if(!t||!t.length)return[];var r=ia(t);return null==n?r:zn(r,(function(t){return mn(n,e,t)}))}var aa=Wr((function(t,n){return Wa(t)?ur(t,n):[]})),sa=Wr((function(t){return di(_n(t,Wa))})),la=Wr((function(t){var n=Jo(t);return Wa(n)&&(n=e),di(_n(t,Wa),oo(n,2))})),ua=Wr((function(t){var n=Jo(t);return n="function"==typeof n?n:e,di(_n(t,Wa),e,n)})),ca=Wr(ia),ha=Wr((function(t){var n=t.length,r=n>1?t[n-1]:e;return r="function"==typeof r?(t.pop(),r):e,oa(t,r)}));function da(t){var n=Re(t);return n.__chain__=!0,n}function fa(t,n){return n(t)}var pa=Qi((function(t){var n=t.length,r=n?t[0]:0,i=this.__wrapped__,o=function(n){return ir(n,t)};return!(n>1||this.__actions__.length)&&i instanceof Fe&&go(r)?((i=i.slice(r,+r+(n?1:0))).__actions__.push({func:fa,args:[o],thisArg:e}),new Pe(i,this.__chain__).thru((function(t){return n&&!t.length&&t.push(e),t}))):this.thru(o)})),va=Ai((function(t,n,e){Ot.call(t,e)?++t[e]:rr(t,e,1)})),ga=Ui(No),ma=Ui(Vo);function ba(t,n){return(Va(t)?wn:cr)(t,oo(n,3))}function wa(t,n){return(Va(t)?xn:hr)(t,oo(n,3))}var xa=Ai((function(t,n,e){Ot.call(t,e)?t[e].push(n):rr(t,e,[n])})),ya=Wr((function(t,n,e){var r=-1,i="function"==typeof n,o=Za(t)?rt(t.length):[];return cr(t,(function(t){o[++r]=i?mn(n,t,e):Ar(t,n,e)})),o})),_a=Ai((function(t,n,e){rr(t,e,n)}));function ka(t,n){return(Va(t)?zn:Dr)(t,oo(n,3))}var $a=Ai((function(t,n,e){t[e?0:1].push(n)}),(function(){return[[],[]]})),za=Wr((function(t,n){if(null==t)return[];var e=n.length;return e>1&&mo(t,n[0],n[1])?n=[]:e>2&&mo(n[0],n[1],n[2])&&(n=[n[0]]),Pr(t,vr(n,1),[])})),Ca=Tn||function(){return on.Date.now()};function ja(t,n,r){return n=r?e:n,Xi(t,s,e,e,e,e,n=t&&null==n?t.length:n)}function Aa(t,n){var i;if("function"!=typeof n)throw new jt(r);return t=ps(t),function(){return--t>0&&(i=n.apply(this,arguments)),t<=1&&(n=e),i}}var Sa=Wr((function(t,n,e){var r=1;if(e.length){var i=ne(e,io(Sa));r|=a}return Xi(t,r,n,e,i)})),Ta=Wr((function(t,n,e){var r=3;if(e.length){var i=ne(e,io(Ta));r|=a}return Xi(n,r,t,e,i)}));function Ma(t,n,i){var o,a,s,l,u,c,h=0,d=!1,f=!1,p=!0;if("function"!=typeof t)throw new jt(r);function v(n){var r=o,i=a;return o=a=e,h=n,l=t.apply(i,r)}function g(t){return h=t,u=So(b,n),d?v(t):l}function m(t){var r=t-c;return c===e||r>=n||r<0||f&&t-h>=s}function b(){var t=Ca();if(m(t))return w(t);u=So(b,function(t){var e=n-(t-c);return f?me(e,s-(t-h)):e}(t))}function w(t){return u=e,p&&o?v(t):(o=a=e,l)}function x(){var t=Ca(),r=m(t);if(o=arguments,a=this,c=t,r){if(u===e)return g(c);if(f)return wi(u),u=So(b,n),v(c)}return u===e&&(u=So(b,n)),l}return n=gs(n)||0,ts(i)&&(d=!!i.leading,s=(f="maxWait"in i)?ge(gs(i.maxWait)||0,n):s,p="trailing"in i?!!i.trailing:p),x.cancel=function(){u!==e&&wi(u),h=0,o=c=a=u=e},x.flush=function(){return u===e?l:w(Ca())},x}var Oa=Wr((function(t,n){return lr(t,1,n)})),Ia=Wr((function(t,n,e){return lr(t,gs(n)||0,e)}));function Ea(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new jt(r);var e=function(){var r=arguments,i=n?n.apply(this,r):r[0],o=e.cache;if(o.has(i))return o.get(i);var a=t.apply(this,r);return e.cache=o.set(i,a)||o,a};return e.cache=new(Ea.Cache||qe),e}function Ua(t){if("function"!=typeof t)throw new jt(r);return function(){var n=arguments;switch(n.length){case 0:return!t.call(this);case 1:return!t.call(this,n[0]);case 2:return!t.call(this,n[0],n[1]);case 3:return!t.call(this,n[0],n[1],n[2])}return!t.apply(this,n)}}Ea.Cache=qe;var Da=mi((function(t,n){var e=(n=1==n.length&&Va(n[0])?zn(n[0],Nn(oo())):zn(vr(n,1),Nn(oo()))).length;return Wr((function(r){for(var i=-1,o=me(r.length,e);++i<o;)r[i]=n[i].call(this,r[i]);return mn(t,this,r)}))})),Ha=Wr((function(t,n){var r=ne(n,io(Ha));return Xi(t,a,e,n,r)})),Ra=Wr((function(t,n){var r=ne(n,io(Ra));return Xi(t,64,e,n,r)})),Ba=Qi((function(t,n){return Xi(t,256,e,e,e,n)}));function La(t,n){return t===n||t!=t&&n!=n}var Pa=Ni($r),Fa=Ni((function(t,n){return t>=n})),Na=Sr(function(){return arguments}())?Sr:function(t){return ns(t)&&Ot.call(t,"callee")&&!Qt.call(t,"callee")},Va=rt.isArray,qa=hn?Nn(hn):function(t){return ns(t)&&kr(t)==S};function Za(t){return null!=t&&Qa(t.length)&&!Ya(t)}function Wa(t){return ns(t)&&Za(t)}var Xa=de||gl,Ka=dn?Nn(dn):function(t){return ns(t)&&kr(t)==g};function Ja(t){if(!ns(t))return!1;var n=kr(t);return n==m||"[object DOMException]"==n||"string"==typeof t.message&&"string"==typeof t.name&&!is(t)}function Ya(t){if(!ts(t))return!1;var n=kr(t);return n==b||n==w||"[object AsyncFunction]"==n||"[object Proxy]"==n}function Ga(t){return"number"==typeof t&&t==ps(t)}function Qa(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=u}function ts(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}function ns(t){return null!=t&&"object"==typeof t}var es=fn?Nn(fn):function(t){return ns(t)&&ho(t)==x};function rs(t){return"number"==typeof t||ns(t)&&kr(t)==y}function is(t){if(!ns(t)||kr(t)!=_)return!1;var n=qt(t);if(null===n)return!0;var e=Ot.call(n,"constructor")&&n.constructor;return"function"==typeof e&&e instanceof e&&Mt.call(e)==Dt}var os=pn?Nn(pn):function(t){return ns(t)&&kr(t)==$},as=vn?Nn(vn):function(t){return ns(t)&&ho(t)==z};function ss(t){return"string"==typeof t||!Va(t)&&ns(t)&&kr(t)==C}function ls(t){return"symbol"==typeof t||ns(t)&&kr(t)==j}var us=gn?Nn(gn):function(t){return ns(t)&&Qa(t.length)&&!!Yt[kr(t)]},cs=Ni(Ur),hs=Ni((function(t,n){return t<=n}));function ds(t){if(!t)return[];if(Za(t))return ss(t)?oe(t):Ci(t);if(an&&t[an])return function(t){for(var n,e=[];!(n=t.next()).done;)e.push(n.value);return e}(t[an]());var n=ho(t);return(n==x?Qn:n==z?ee:Ls)(t)}function fs(t){return t?(t=gs(t))===l||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}function ps(t){var n=fs(t),e=n%1;return n==n?e?n-e:n:0}function vs(t){return t?or(ps(t),0,h):0}function gs(t){if("number"==typeof t)return t;if(ls(t))return c;if(ts(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=ts(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=Fn(t);var e=ft.test(t);return e||vt.test(t)?nn(t.slice(2),e?2:8):dt.test(t)?c:+t}function ms(t){return ji(t,Os(t))}function bs(t){return null==t?"":ai(t)}var ws=Si((function(t,n){if(yo(n)||Za(n))ji(n,Ms(n),t);else for(var e in n)Ot.call(n,e)&&Qe(t,e,n[e])})),xs=Si((function(t,n){ji(n,Os(n),t)})),ys=Si((function(t,n,e,r){ji(n,Os(n),t,r)})),_s=Si((function(t,n,e,r){ji(n,Ms(n),t,r)})),ks=Qi(ir),$s=Wr((function(t,n){t=$t(t);var r=-1,i=n.length,o=i>2?n[2]:e;for(o&&mo(n[0],n[1],o)&&(i=1);++r<i;)for(var a=n[r],s=Os(a),l=-1,u=s.length;++l<u;){var c=s[l],h=t[c];(h===e||La(h,St[c])&&!Ot.call(t,c))&&(t[c]=a[c])}return t})),zs=Wr((function(t){return t.push(e,Ji),mn(Es,e,t)}));function Cs(t,n,r){var i=null==t?e:yr(t,n);return i===e?r:i}function js(t,n){return null!=t&&fo(t,n,Cr)}var As=Ri((function(t,n,e){null!=n&&"function"!=typeof n.toString&&(n=Ut.call(n)),t[n]=e}),tl(rl)),Ss=Ri((function(t,n,e){null!=n&&"function"!=typeof n.toString&&(n=Ut.call(n)),Ot.call(t,n)?t[n].push(e):t[n]=[e]}),oo),Ts=Wr(Ar);function Ms(t){return Za(t)?Xe(t):Er(t)}function Os(t){return Za(t)?Xe(t,!0):function(t){if(!ts(t))return function(t){var n=[];if(null!=t)for(var e in $t(t))n.push(e);return n}(t);var n=yo(t),e=[];for(var r in t)("constructor"!=r||!n&&Ot.call(t,r))&&e.push(r);return e}(t)}var Is=Si((function(t,n,e){Br(t,n,e)})),Es=Si((function(t,n,e,r){Br(t,n,e,r)})),Us=Qi((function(t,n){var e={};if(null==t)return e;var r=!1;n=zn(n,(function(n){return n=gi(n,t),r||(r=n.length>1),n})),ji(t,no(t),e),r&&(e=ar(e,7,Yi));for(var i=n.length;i--;)li(e,n[i]);return e})),Ds=Qi((function(t,n){return null==t?{}:function(t,n){return Fr(t,n,(function(n,e){return js(t,e)}))}(t,n)}));function Hs(t,n){if(null==t)return{};var e=zn(no(t),(function(t){return[t]}));return n=oo(n),Fr(t,e,(function(t,e){return n(t,e[0])}))}var Rs=Wi(Ms),Bs=Wi(Os);function Ls(t){return null==t?[]:Vn(t,Ms(t))}var Ps=Ii((function(t,n,e){return n=n.toLowerCase(),t+(e?Fs(n):n)}));function Fs(t){return Js(bs(t).toLowerCase())}function Ns(t){return(t=bs(t))&&t.replace(mt,Kn).replace(Vt,"")}var Vs=Ii((function(t,n,e){return t+(e?"-":"")+n.toLowerCase()})),qs=Ii((function(t,n,e){return t+(e?" ":"")+n.toLowerCase()})),Zs=Oi("toLowerCase"),Ws=Ii((function(t,n,e){return t+(e?"_":"")+n.toLowerCase()})),Xs=Ii((function(t,n,e){return t+(e?" ":"")+Js(n)})),Ks=Ii((function(t,n,e){return t+(e?" ":"")+n.toUpperCase()})),Js=Oi("toUpperCase");function Ys(t,n,r){return t=bs(t),(n=r?e:n)===e?function(t){return Xt.test(t)}(t)?function(t){return t.match(Zt)||[]}(t):function(t){return t.match(st)||[]}(t):t.match(n)||[]}var Gs=Wr((function(t,n){try{return mn(t,e,n)}catch(t){return Ja(t)?t:new yt(t)}})),Qs=Qi((function(t,n){return wn(n,(function(n){n=Ho(n),rr(t,n,Sa(t[n],t))})),t}));function tl(t){return function(){return t}}var nl=Di(),el=Di(!0);function rl(t){return t}function il(t){return Ir("function"==typeof t?t:ar(t,1))}var ol=Wr((function(t,n){return function(e){return Ar(e,t,n)}})),al=Wr((function(t,n){return function(e){return Ar(t,e,n)}}));function sl(t,n,e){var r=Ms(n),i=xr(n,r);null!=e||ts(n)&&(i.length||!r.length)||(e=n,n=t,t=this,i=xr(n,Ms(n)));var o=!(ts(e)&&"chain"in e&&!e.chain),a=Ya(t);return wn(i,(function(e){var r=n[e];t[e]=r,a&&(t.prototype[e]=function(){var n=this.__chain__;if(o||n){var e=t(this.__wrapped__),i=e.__actions__=Ci(this.__actions__);return i.push({func:r,args:arguments,thisArg:t}),e.__chain__=n,e}return r.apply(t,Cn([this.value()],arguments))})})),t}function ll(){}var ul=Li(zn),cl=Li(yn),hl=Li(Sn);function dl(t){return bo(t)?Hn(Ho(t)):function(t){return function(n){return yr(n,t)}}(t)}var fl=Fi(),pl=Fi(!0);function vl(){return[]}function gl(){return!1}var ml,bl=Bi((function(t,n){return t+n}),0),wl=qi("ceil"),xl=Bi((function(t,n){return t/n}),1),yl=qi("floor"),_l=Bi((function(t,n){return t*n}),1),kl=qi("round"),$l=Bi((function(t,n){return t-n}),0);return Re.after=function(t,n){if("function"!=typeof n)throw new jt(r);return t=ps(t),function(){if(--t<1)return n.apply(this,arguments)}},Re.ary=ja,Re.assign=ws,Re.assignIn=xs,Re.assignInWith=ys,Re.assignWith=_s,Re.at=ks,Re.before=Aa,Re.bind=Sa,Re.bindAll=Qs,Re.bindKey=Ta,Re.castArray=function(){if(!arguments.length)return[];var t=arguments[0];return Va(t)?t:[t]},Re.chain=da,Re.chunk=function(t,n,r){n=(r?mo(t,n,r):n===e)?1:ge(ps(n),0);var i=null==t?0:t.length;if(!i||n<1)return[];for(var o=0,a=0,s=rt(ue(i/n));o<i;)s[a++]=ti(t,o,o+=n);return s},Re.compact=function(t){for(var n=-1,e=null==t?0:t.length,r=0,i=[];++n<e;){var o=t[n];o&&(i[r++]=o)}return i},Re.concat=function(){var t=arguments.length;if(!t)return[];for(var n=rt(t-1),e=arguments[0],r=t;r--;)n[r-1]=arguments[r];return Cn(Va(e)?Ci(e):[e],vr(n,1))},Re.cond=function(t){var n=null==t?0:t.length,e=oo();return t=n?zn(t,(function(t){if("function"!=typeof t[1])throw new jt(r);return[e(t[0]),t[1]]})):[],Wr((function(e){for(var r=-1;++r<n;){var i=t[r];if(mn(i[0],this,e))return mn(i[1],this,e)}}))},Re.conforms=function(t){return function(t){var n=Ms(t);return function(e){return sr(e,t,n)}}(ar(t,1))},Re.constant=tl,Re.countBy=va,Re.create=function(t,n){var e=Be(t);return null==n?e:er(e,n)},Re.curry=function t(n,r,i){var o=Xi(n,8,e,e,e,e,e,r=i?e:r);return o.placeholder=t.placeholder,o},Re.curryRight=function t(n,r,i){var o=Xi(n,16,e,e,e,e,e,r=i?e:r);return o.placeholder=t.placeholder,o},Re.debounce=Ma,Re.defaults=$s,Re.defaultsDeep=zs,Re.defer=Oa,Re.delay=Ia,Re.difference=Lo,Re.differenceBy=Po,Re.differenceWith=Fo,Re.drop=function(t,n,r){var i=null==t?0:t.length;return i?ti(t,(n=r||n===e?1:ps(n))<0?0:n,i):[]},Re.dropRight=function(t,n,r){var i=null==t?0:t.length;return i?ti(t,0,(n=i-(n=r||n===e?1:ps(n)))<0?0:n):[]},Re.dropRightWhile=function(t,n){return t&&t.length?ci(t,oo(n,3),!0,!0):[]},Re.dropWhile=function(t,n){return t&&t.length?ci(t,oo(n,3),!0):[]},Re.fill=function(t,n,r,i){var o=null==t?0:t.length;return o?(r&&"number"!=typeof r&&mo(t,n,r)&&(r=0,i=o),function(t,n,r,i){var o=t.length;for((r=ps(r))<0&&(r=-r>o?0:o+r),(i=i===e||i>o?o:ps(i))<0&&(i+=o),i=r>i?0:vs(i);r<i;)t[r++]=n;return t}(t,n,r,i)):[]},Re.filter=function(t,n){return(Va(t)?_n:pr)(t,oo(n,3))},Re.flatMap=function(t,n){return vr(ka(t,n),1)},Re.flatMapDeep=function(t,n){return vr(ka(t,n),l)},Re.flatMapDepth=function(t,n,r){return r=r===e?1:ps(r),vr(ka(t,n),r)},Re.flatten=qo,Re.flattenDeep=function(t){return null!=t&&t.length?vr(t,l):[]},Re.flattenDepth=function(t,n){return null!=t&&t.length?vr(t,n=n===e?1:ps(n)):[]},Re.flip=function(t){return Xi(t,512)},Re.flow=nl,Re.flowRight=el,Re.fromPairs=function(t){for(var n=-1,e=null==t?0:t.length,r={};++n<e;){var i=t[n];r[i[0]]=i[1]}return r},Re.functions=function(t){return null==t?[]:xr(t,Ms(t))},Re.functionsIn=function(t){return null==t?[]:xr(t,Os(t))},Re.groupBy=xa,Re.initial=function(t){return null!=t&&t.length?ti(t,0,-1):[]},Re.intersection=Wo,Re.intersectionBy=Xo,Re.intersectionWith=Ko,Re.invert=As,Re.invertBy=Ss,Re.invokeMap=ya,Re.iteratee=il,Re.keyBy=_a,Re.keys=Ms,Re.keysIn=Os,Re.map=ka,Re.mapKeys=function(t,n){var e={};return n=oo(n,3),br(t,(function(t,r,i){rr(e,n(t,r,i),t)})),e},Re.mapValues=function(t,n){var e={};return n=oo(n,3),br(t,(function(t,r,i){rr(e,r,n(t,r,i))})),e},Re.matches=function(t){return Hr(ar(t,1))},Re.matchesProperty=function(t,n){return Rr(t,ar(n,1))},Re.memoize=Ea,Re.merge=Is,Re.mergeWith=Es,Re.method=ol,Re.methodOf=al,Re.mixin=sl,Re.negate=Ua,Re.nthArg=function(t){return t=ps(t),Wr((function(n){return Lr(n,t)}))},Re.omit=Us,Re.omitBy=function(t,n){return Hs(t,Ua(oo(n)))},Re.once=function(t){return Aa(2,t)},Re.orderBy=function(t,n,r,i){return null==t?[]:(Va(n)||(n=null==n?[]:[n]),Va(r=i?e:r)||(r=null==r?[]:[r]),Pr(t,n,r))},Re.over=ul,Re.overArgs=Da,Re.overEvery=cl,Re.overSome=hl,Re.partial=Ha,Re.partialRight=Ra,Re.partition=$a,Re.pick=Ds,Re.pickBy=Hs,Re.property=dl,Re.propertyOf=function(t){return function(n){return null==t?e:yr(t,n)}},Re.pull=Yo,Re.pullAll=Go,Re.pullAllBy=function(t,n,e){return t&&t.length&&n&&n.length?Nr(t,n,oo(e,2)):t},Re.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?Nr(t,n,e,r):t},Re.pullAt=Qo,Re.range=fl,Re.rangeRight=pl,Re.rearg=Ba,Re.reject=function(t,n){return(Va(t)?_n:pr)(t,Ua(oo(n,3)))},Re.remove=function(t,n){var e=[];if(!t||!t.length)return e;var r=-1,i=[],o=t.length;for(n=oo(n,3);++r<o;){var a=t[r];n(a,r,t)&&(e.push(a),i.push(r))}return Vr(t,i),e},Re.rest=function(t,n){if("function"!=typeof t)throw new jt(r);return Wr(t,n=n===e?n:ps(n))},Re.reverse=ta,Re.sampleSize=function(t,n,r){return n=(r?mo(t,n,r):n===e)?1:ps(n),(Va(t)?Je:Kr)(t,n)},Re.set=function(t,n,e){return null==t?t:Jr(t,n,e)},Re.setWith=function(t,n,r,i){return i="function"==typeof i?i:e,null==t?t:Jr(t,n,r,i)},Re.shuffle=function(t){return(Va(t)?Ye:Qr)(t)},Re.slice=function(t,n,r){var i=null==t?0:t.length;return i?(r&&"number"!=typeof r&&mo(t,n,r)?(n=0,r=i):(n=null==n?0:ps(n),r=r===e?i:ps(r)),ti(t,n,r)):[]},Re.sortBy=za,Re.sortedUniq=function(t){return t&&t.length?ii(t):[]},Re.sortedUniqBy=function(t,n){return t&&t.length?ii(t,oo(n,2)):[]},Re.split=function(t,n,r){return r&&"number"!=typeof r&&mo(t,n,r)&&(n=r=e),(r=r===e?h:r>>>0)?(t=bs(t))&&("string"==typeof n||null!=n&&!os(n))&&!(n=ai(n))&&Gn(t)?bi(oe(t),0,r):t.split(n,r):[]},Re.spread=function(t,n){if("function"!=typeof t)throw new jt(r);return n=null==n?0:ge(ps(n),0),Wr((function(e){var r=e[n],i=bi(e,0,n);return r&&Cn(i,r),mn(t,this,i)}))},Re.tail=function(t){var n=null==t?0:t.length;return n?ti(t,1,n):[]},Re.take=function(t,n,r){return t&&t.length?ti(t,0,(n=r||n===e?1:ps(n))<0?0:n):[]},Re.takeRight=function(t,n,r){var i=null==t?0:t.length;return i?ti(t,(n=i-(n=r||n===e?1:ps(n)))<0?0:n,i):[]},Re.takeRightWhile=function(t,n){return t&&t.length?ci(t,oo(n,3),!1,!0):[]},Re.takeWhile=function(t,n){return t&&t.length?ci(t,oo(n,3)):[]},Re.tap=function(t,n){return n(t),t},Re.throttle=function(t,n,e){var i=!0,o=!0;if("function"!=typeof t)throw new jt(r);return ts(e)&&(i="leading"in e?!!e.leading:i,o="trailing"in e?!!e.trailing:o),Ma(t,n,{leading:i,maxWait:n,trailing:o})},Re.thru=fa,Re.toArray=ds,Re.toPairs=Rs,Re.toPairsIn=Bs,Re.toPath=function(t){return Va(t)?zn(t,Ho):ls(t)?[t]:Ci(Do(bs(t)))},Re.toPlainObject=ms,Re.transform=function(t,n,e){var r=Va(t),i=r||Xa(t)||us(t);if(n=oo(n,4),null==e){var o=t&&t.constructor;e=i?r?new o:[]:ts(t)&&Ya(o)?Be(qt(t)):{}}return(i?wn:br)(t,(function(t,r,i){return n(e,t,r,i)})),e},Re.unary=function(t){return ja(t,1)},Re.union=na,Re.unionBy=ea,Re.unionWith=ra,Re.uniq=function(t){return t&&t.length?si(t):[]},Re.uniqBy=function(t,n){return t&&t.length?si(t,oo(n,2)):[]},Re.uniqWith=function(t,n){return n="function"==typeof n?n:e,t&&t.length?si(t,e,n):[]},Re.unset=function(t,n){return null==t||li(t,n)},Re.unzip=ia,Re.unzipWith=oa,Re.update=function(t,n,e){return null==t?t:ui(t,n,vi(e))},Re.updateWith=function(t,n,r,i){return i="function"==typeof i?i:e,null==t?t:ui(t,n,vi(r),i)},Re.values=Ls,Re.valuesIn=function(t){return null==t?[]:Vn(t,Os(t))},Re.without=aa,Re.words=Ys,Re.wrap=function(t,n){return Ha(vi(n),t)},Re.xor=sa,Re.xorBy=la,Re.xorWith=ua,Re.zip=ca,Re.zipObject=function(t,n){return fi(t||[],n||[],Qe)},Re.zipObjectDeep=function(t,n){return fi(t||[],n||[],Jr)},Re.zipWith=ha,Re.entries=Rs,Re.entriesIn=Bs,Re.extend=xs,Re.extendWith=ys,sl(Re,Re),Re.add=bl,Re.attempt=Gs,Re.camelCase=Ps,Re.capitalize=Fs,Re.ceil=wl,Re.clamp=function(t,n,r){return r===e&&(r=n,n=e),r!==e&&(r=(r=gs(r))==r?r:0),n!==e&&(n=(n=gs(n))==n?n:0),or(gs(t),n,r)},Re.clone=function(t){return ar(t,4)},Re.cloneDeep=function(t){return ar(t,5)},Re.cloneDeepWith=function(t,n){return ar(t,5,n="function"==typeof n?n:e)},Re.cloneWith=function(t,n){return ar(t,4,n="function"==typeof n?n:e)},Re.conformsTo=function(t,n){return null==n||sr(t,n,Ms(n))},Re.deburr=Ns,Re.defaultTo=function(t,n){return null==t||t!=t?n:t},Re.divide=xl,Re.endsWith=function(t,n,r){t=bs(t),n=ai(n);var i=t.length,o=r=r===e?i:or(ps(r),0,i);return(r-=n.length)>=0&&t.slice(r,o)==n},Re.eq=La,Re.escape=function(t){return(t=bs(t))&&Z.test(t)?t.replace(V,Jn):t},Re.escapeRegExp=function(t){return(t=bs(t))&&tt.test(t)?t.replace(Q,"\\$&"):t},Re.every=function(t,n,r){var i=Va(t)?yn:dr;return r&&mo(t,n,r)&&(n=e),i(t,oo(n,3))},Re.find=ga,Re.findIndex=No,Re.findKey=function(t,n){return Mn(t,oo(n,3),br)},Re.findLast=ma,Re.findLastIndex=Vo,Re.findLastKey=function(t,n){return Mn(t,oo(n,3),wr)},Re.floor=yl,Re.forEach=ba,Re.forEachRight=wa,Re.forIn=function(t,n){return null==t?t:gr(t,oo(n,3),Os)},Re.forInRight=function(t,n){return null==t?t:mr(t,oo(n,3),Os)},Re.forOwn=function(t,n){return t&&br(t,oo(n,3))},Re.forOwnRight=function(t,n){return t&&wr(t,oo(n,3))},Re.get=Cs,Re.gt=Pa,Re.gte=Fa,Re.has=function(t,n){return null!=t&&fo(t,n,zr)},Re.hasIn=js,Re.head=Zo,Re.identity=rl,Re.includes=function(t,n,e,r){t=Za(t)?t:Ls(t),e=e&&!r?ps(e):0;var i=t.length;return e<0&&(e=ge(i+e,0)),ss(t)?e<=i&&t.indexOf(n,e)>-1:!!i&&In(t,n,e)>-1},Re.indexOf=function(t,n,e){var r=null==t?0:t.length;if(!r)return-1;var i=null==e?0:ps(e);return i<0&&(i=ge(r+i,0)),In(t,n,i)},Re.inRange=function(t,n,r){return n=fs(n),r===e?(r=n,n=0):r=fs(r),function(t,n,e){return t>=me(n,e)&&t<ge(n,e)}(t=gs(t),n,r)},Re.invoke=Ts,Re.isArguments=Na,Re.isArray=Va,Re.isArrayBuffer=qa,Re.isArrayLike=Za,Re.isArrayLikeObject=Wa,Re.isBoolean=function(t){return!0===t||!1===t||ns(t)&&kr(t)==v},Re.isBuffer=Xa,Re.isDate=Ka,Re.isElement=function(t){return ns(t)&&1===t.nodeType&&!is(t)},Re.isEmpty=function(t){if(null==t)return!0;if(Za(t)&&(Va(t)||"string"==typeof t||"function"==typeof t.splice||Xa(t)||us(t)||Na(t)))return!t.length;var n=ho(t);if(n==x||n==z)return!t.size;if(yo(t))return!Er(t).length;for(var e in t)if(Ot.call(t,e))return!1;return!0},Re.isEqual=function(t,n){return Tr(t,n)},Re.isEqualWith=function(t,n,r){var i=(r="function"==typeof r?r:e)?r(t,n):e;return i===e?Tr(t,n,e,r):!!i},Re.isError=Ja,Re.isFinite=function(t){return"number"==typeof t&&fe(t)},Re.isFunction=Ya,Re.isInteger=Ga,Re.isLength=Qa,Re.isMap=es,Re.isMatch=function(t,n){return t===n||Mr(t,n,so(n))},Re.isMatchWith=function(t,n,r){return r="function"==typeof r?r:e,Mr(t,n,so(n),r)},Re.isNaN=function(t){return rs(t)&&t!=+t},Re.isNative=function(t){if(xo(t))throw new yt("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");return Or(t)},Re.isNil=function(t){return null==t},Re.isNull=function(t){return null===t},Re.isNumber=rs,Re.isObject=ts,Re.isObjectLike=ns,Re.isPlainObject=is,Re.isRegExp=os,Re.isSafeInteger=function(t){return Ga(t)&&t>=-9007199254740991&&t<=u},Re.isSet=as,Re.isString=ss,Re.isSymbol=ls,Re.isTypedArray=us,Re.isUndefined=function(t){return t===e},Re.isWeakMap=function(t){return ns(t)&&ho(t)==A},Re.isWeakSet=function(t){return ns(t)&&"[object WeakSet]"==kr(t)},Re.join=function(t,n){return null==t?"":pe.call(t,n)},Re.kebabCase=Vs,Re.last=Jo,Re.lastIndexOf=function(t,n,r){var i=null==t?0:t.length;if(!i)return-1;var o=i;return r!==e&&(o=(o=ps(r))<0?ge(i+o,0):me(o,i-1)),n==n?function(t,n,e){for(var r=e+1;r--;)if(t[r]===n)return r;return r}(t,n,o):On(t,Un,o,!0)},Re.lowerCase=qs,Re.lowerFirst=Zs,Re.lt=cs,Re.lte=hs,Re.max=function(t){return t&&t.length?fr(t,rl,$r):e},Re.maxBy=function(t,n){return t&&t.length?fr(t,oo(n,2),$r):e},Re.mean=function(t){return Dn(t,rl)},Re.meanBy=function(t,n){return Dn(t,oo(n,2))},Re.min=function(t){return t&&t.length?fr(t,rl,Ur):e},Re.minBy=function(t,n){return t&&t.length?fr(t,oo(n,2),Ur):e},Re.stubArray=vl,Re.stubFalse=gl,Re.stubObject=function(){return{}},Re.stubString=function(){return""},Re.stubTrue=function(){return!0},Re.multiply=_l,Re.nth=function(t,n){return t&&t.length?Lr(t,ps(n)):e},Re.noConflict=function(){return on._===this&&(on._=Ht),this},Re.noop=ll,Re.now=Ca,Re.pad=function(t,n,e){t=bs(t);var r=(n=ps(n))?ie(t):0;if(!n||r>=n)return t;var i=(n-r)/2;return Pi(ce(i),e)+t+Pi(ue(i),e)},Re.padEnd=function(t,n,e){t=bs(t);var r=(n=ps(n))?ie(t):0;return n&&r<n?t+Pi(n-r,e):t},Re.padStart=function(t,n,e){t=bs(t);var r=(n=ps(n))?ie(t):0;return n&&r<n?Pi(n-r,e)+t:t},Re.parseInt=function(t,n,e){return e||null==n?n=0:n&&(n=+n),we(bs(t).replace(et,""),n||0)},Re.random=function(t,n,r){if(r&&"boolean"!=typeof r&&mo(t,n,r)&&(n=r=e),r===e&&("boolean"==typeof n?(r=n,n=e):"boolean"==typeof t&&(r=t,t=e)),t===e&&n===e?(t=0,n=1):(t=fs(t),n===e?(n=t,t=0):n=fs(n)),t>n){var i=t;t=n,n=i}if(r||t%1||n%1){var o=xe();return me(t+o*(n-t+tn("1e-"+((o+"").length-1))),n)}return qr(t,n)},Re.reduce=function(t,n,e){var r=Va(t)?jn:Bn,i=arguments.length<3;return r(t,oo(n,4),e,i,cr)},Re.reduceRight=function(t,n,e){var r=Va(t)?An:Bn,i=arguments.length<3;return r(t,oo(n,4),e,i,hr)},Re.repeat=function(t,n,r){return n=(r?mo(t,n,r):n===e)?1:ps(n),Zr(bs(t),n)},Re.replace=function(){var t=arguments,n=bs(t[0]);return t.length<3?n:n.replace(t[1],t[2])},Re.result=function(t,n,r){var i=-1,o=(n=gi(n,t)).length;for(o||(o=1,t=e);++i<o;){var a=null==t?e:t[Ho(n[i])];a===e&&(i=o,a=r),t=Ya(a)?a.call(t):a}return t},Re.round=kl,Re.runInContext=t,Re.sample=function(t){return(Va(t)?Ke:Xr)(t)},Re.size=function(t){if(null==t)return 0;if(Za(t))return ss(t)?ie(t):t.length;var n=ho(t);return n==x||n==z?t.size:Er(t).length},Re.snakeCase=Ws,Re.some=function(t,n,r){var i=Va(t)?Sn:ni;return r&&mo(t,n,r)&&(n=e),i(t,oo(n,3))},Re.sortedIndex=function(t,n){return ei(t,n)},Re.sortedIndexBy=function(t,n,e){return ri(t,n,oo(e,2))},Re.sortedIndexOf=function(t,n){var e=null==t?0:t.length;if(e){var r=ei(t,n);if(r<e&&La(t[r],n))return r}return-1},Re.sortedLastIndex=function(t,n){return ei(t,n,!0)},Re.sortedLastIndexBy=function(t,n,e){return ri(t,n,oo(e,2),!0)},Re.sortedLastIndexOf=function(t,n){if(null!=t&&t.length){var e=ei(t,n,!0)-1;if(La(t[e],n))return e}return-1},Re.startCase=Xs,Re.startsWith=function(t,n,e){return t=bs(t),e=null==e?0:or(ps(e),0,t.length),n=ai(n),t.slice(e,e+n.length)==n},Re.subtract=$l,Re.sum=function(t){return t&&t.length?Ln(t,rl):0},Re.sumBy=function(t,n){return t&&t.length?Ln(t,oo(n,2)):0},Re.template=function(t,n,r){var i=Re.templateSettings;r&&mo(t,n,r)&&(n=e),t=bs(t),n=ys({},n,i,Ki);var o,a,s=ys({},n.imports,i.imports,Ki),l=Ms(s),u=Vn(s,l),c=0,h=n.interpolate||bt,d="__p += '",f=zt((n.escape||bt).source+"|"+h.source+"|"+(h===K?ct:bt).source+"|"+(n.evaluate||bt).source+"|$","g"),p="//# sourceURL="+(Ot.call(n,"sourceURL")?(n.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Jt+"]")+"\n";t.replace(f,(function(n,e,r,i,s,l){return r||(r=i),d+=t.slice(c,l).replace(wt,Yn),e&&(o=!0,d+="' +\n__e("+e+") +\n'"),s&&(a=!0,d+="';\n"+s+";\n__p += '"),r&&(d+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=l+n.length,n})),d+="';\n";var v=Ot.call(n,"variable")&&n.variable;if(v){if(lt.test(v))throw new yt("Invalid `variable` option passed into `_.template`")}else d="with (obj) {\n"+d+"\n}\n";d=(a?d.replace(L,""):d).replace(P,"$1").replace(F,"$1;"),d="function("+(v||"obj")+") {\n"+(v?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(o?", __e = _.escape":"")+(a?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+d+"return __p\n}";var g=Gs((function(){return _t(l,p+"return "+d).apply(e,u)}));if(g.source=d,Ja(g))throw g;return g},Re.times=function(t,n){if((t=ps(t))<1||t>u)return[];var e=h,r=me(t,h);n=oo(n),t-=h;for(var i=Pn(r,n);++e<t;)n(e);return i},Re.toFinite=fs,Re.toInteger=ps,Re.toLength=vs,Re.toLower=function(t){return bs(t).toLowerCase()},Re.toNumber=gs,Re.toSafeInteger=function(t){return t?or(ps(t),-9007199254740991,u):0===t?t:0},Re.toString=bs,Re.toUpper=function(t){return bs(t).toUpperCase()},Re.trim=function(t,n,r){if((t=bs(t))&&(r||n===e))return Fn(t);if(!t||!(n=ai(n)))return t;var i=oe(t),o=oe(n);return bi(i,Zn(i,o),Wn(i,o)+1).join("")},Re.trimEnd=function(t,n,r){if((t=bs(t))&&(r||n===e))return t.slice(0,ae(t)+1);if(!t||!(n=ai(n)))return t;var i=oe(t);return bi(i,0,Wn(i,oe(n))+1).join("")},Re.trimStart=function(t,n,r){if((t=bs(t))&&(r||n===e))return t.replace(et,"");if(!t||!(n=ai(n)))return t;var i=oe(t);return bi(i,Zn(i,oe(n))).join("")},Re.truncate=function(t,n){var r=30,i="...";if(ts(n)){var o="separator"in n?n.separator:o;r="length"in n?ps(n.length):r,i="omission"in n?ai(n.omission):i}var a=(t=bs(t)).length;if(Gn(t)){var s=oe(t);a=s.length}if(r>=a)return t;var l=r-ie(i);if(l<1)return i;var u=s?bi(s,0,l).join(""):t.slice(0,l);if(o===e)return u+i;if(s&&(l+=u.length-l),os(o)){if(t.slice(l).search(o)){var c,h=u;for(o.global||(o=zt(o.source,bs(ht.exec(o))+"g")),o.lastIndex=0;c=o.exec(h);)var d=c.index;u=u.slice(0,d===e?l:d)}}else if(t.indexOf(ai(o),l)!=l){var f=u.lastIndexOf(o);f>-1&&(u=u.slice(0,f))}return u+i},Re.unescape=function(t){return(t=bs(t))&&q.test(t)?t.replace(N,se):t},Re.uniqueId=function(t){var n=++It;return bs(t)+n},Re.upperCase=Ks,Re.upperFirst=Js,Re.each=ba,Re.eachRight=wa,Re.first=Zo,sl(Re,(ml={},br(Re,(function(t,n){Ot.call(Re.prototype,n)||(ml[n]=t)})),ml),{chain:!1}),Re.VERSION="4.17.21",wn(["bind","bindKey","curry","curryRight","partial","partialRight"],(function(t){Re[t].placeholder=Re})),wn(["drop","take"],(function(t,n){Fe.prototype[t]=function(r){r=r===e?1:ge(ps(r),0);var i=this.__filtered__&&!n?new Fe(this):this.clone();return i.__filtered__?i.__takeCount__=me(r,i.__takeCount__):i.__views__.push({size:me(r,h),type:t+(i.__dir__<0?"Right":"")}),i},Fe.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}})),wn(["filter","map","takeWhile"],(function(t,n){var e=n+1,r=1==e||3==e;Fe.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({iteratee:oo(t,3),type:e}),n.__filtered__=n.__filtered__||r,n}})),wn(["head","last"],(function(t,n){var e="take"+(n?"Right":"");Fe.prototype[t]=function(){return this[e](1).value()[0]}})),wn(["initial","tail"],(function(t,n){var e="drop"+(n?"":"Right");Fe.prototype[t]=function(){return this.__filtered__?new Fe(this):this[e](1)}})),Fe.prototype.compact=function(){return this.filter(rl)},Fe.prototype.find=function(t){return this.filter(t).head()},Fe.prototype.findLast=function(t){return this.reverse().find(t)},Fe.prototype.invokeMap=Wr((function(t,n){return"function"==typeof t?new Fe(this):this.map((function(e){return Ar(e,t,n)}))})),Fe.prototype.reject=function(t){return this.filter(Ua(oo(t)))},Fe.prototype.slice=function(t,n){t=ps(t);var r=this;return r.__filtered__&&(t>0||n<0)?new Fe(r):(t<0?r=r.takeRight(-t):t&&(r=r.drop(t)),n!==e&&(r=(n=ps(n))<0?r.dropRight(-n):r.take(n-t)),r)},Fe.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Fe.prototype.toArray=function(){return this.take(h)},br(Fe.prototype,(function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),i=/^(?:head|last)$/.test(n),o=Re[i?"take"+("last"==n?"Right":""):n],a=i||/^find/.test(n);o&&(Re.prototype[n]=function(){var n=this.__wrapped__,s=i?[1]:arguments,l=n instanceof Fe,u=s[0],c=l||Va(n),h=function(t){var n=o.apply(Re,Cn([t],s));return i&&d?n[0]:n};c&&r&&"function"==typeof u&&1!=u.length&&(l=c=!1);var d=this.__chain__,f=!!this.__actions__.length,p=a&&!d,v=l&&!f;if(!a&&c){n=v?n:new Fe(this);var g=t.apply(n,s);return g.__actions__.push({func:fa,args:[h],thisArg:e}),new Pe(g,d)}return p&&v?t.apply(this,s):(g=this.thru(h),p?i?g.value()[0]:g.value():g)})})),wn(["pop","push","shift","sort","splice","unshift"],(function(t){var n=At[t],e=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",r=/^(?:pop|shift)$/.test(t);Re.prototype[t]=function(){var t=arguments;if(r&&!this.__chain__){var i=this.value();return n.apply(Va(i)?i:[],t)}return this[e]((function(e){return n.apply(Va(e)?e:[],t)}))}})),br(Fe.prototype,(function(t,n){var e=Re[n];if(e){var r=e.name+"";Ot.call(Se,r)||(Se[r]=[]),Se[r].push({name:n,func:e})}})),Se[Hi(e,2).name]=[{name:"wrapper",func:e}],Fe.prototype.clone=function(){var t=new Fe(this.__wrapped__);return t.__actions__=Ci(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=Ci(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=Ci(this.__views__),t},Fe.prototype.reverse=function(){if(this.__filtered__){var t=new Fe(this);t.__dir__=-1,t.__filtered__=!0}else(t=this.clone()).__dir__*=-1;return t},Fe.prototype.value=function(){var t=this.__wrapped__.value(),n=this.__dir__,e=Va(t),r=n<0,i=e?t.length:0,o=function(t,n,e){for(var r=-1,i=e.length;++r<i;){var o=e[r],a=o.size;switch(o.type){case"drop":t+=a;break;case"dropRight":n-=a;break;case"take":n=me(n,t+a);break;case"takeRight":t=ge(t,n-a)}}return{start:t,end:n}}(0,i,this.__views__),a=o.start,s=o.end,l=s-a,u=r?s:a-1,c=this.__iteratees__,h=c.length,d=0,f=me(l,this.__takeCount__);if(!e||!r&&i==l&&f==l)return hi(t,this.__actions__);var p=[];t:for(;l--&&d<f;){for(var v=-1,g=t[u+=n];++v<h;){var m=c[v],b=m.type,w=(0,m.iteratee)(g);if(2==b)g=w;else if(!w){if(1==b)continue t;break t}}p[d++]=g}return p},Re.prototype.at=pa,Re.prototype.chain=function(){return da(this)},Re.prototype.commit=function(){return new Pe(this.value(),this.__chain__)},Re.prototype.next=function(){this.__values__===e&&(this.__values__=ds(this.value()));var t=this.__index__>=this.__values__.length;return{done:t,value:t?e:this.__values__[this.__index__++]}},Re.prototype.plant=function(t){for(var n,r=this;r instanceof Le;){var i=Bo(r);i.__index__=0,i.__values__=e,n?o.__wrapped__=i:n=i;var o=i;r=r.__wrapped__}return o.__wrapped__=t,n},Re.prototype.reverse=function(){var t=this.__wrapped__;if(t instanceof Fe){var n=t;return this.__actions__.length&&(n=new Fe(this)),(n=n.reverse()).__actions__.push({func:fa,args:[ta],thisArg:e}),new Pe(n,this.__chain__)}return this.thru(ta)},Re.prototype.toJSON=Re.prototype.valueOf=Re.prototype.value=function(){return hi(this.__wrapped__,this.__actions__)},Re.prototype.first=Re.prototype.head,an&&(Re.prototype[an]=function(){return this}),Re}();sn?((sn.exports=le)._=le,an._=le):on._=le}).call(nt)})),qt=d`
  ${f}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-x-small);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 3px 6px;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Zt=class extends w{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return _`
      <span
        part="base"
        class=${k({badge:!0,"badge--primary":"primary"===this.variant,"badge--success":"success"===this.variant,"badge--neutral":"neutral"===this.variant,"badge--warning":"warning"===this.variant,"badge--danger":"danger"===this.variant,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Zt.styles=qt,p([m({reflect:!0})],Zt.prototype,"variant",2),p([m({type:Boolean,reflect:!0})],Zt.prototype,"pill",2),p([m({type:Boolean,reflect:!0})],Zt.prototype,"pulse",2),Zt=p([b("sl-badge")],Zt);var Wt=d`
  ${f}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    transition: var(--sl-transition-medium) transform;
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-x-large);
    padding: 0 var(--header-spacing);
  }

  .drawer__body {
    flex: 1 1 auto;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    position: absolute;
  }
`;function Xt(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Kt=class extends w{constructor(){super(...arguments),this.hasSlotController=new c(this,"footer"),this.localize=new i(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.modal=new U(this)}firstUpdated(){this.drawer.hidden=!this.open,this.open&&!this.contained&&(this.modal.activate(),D(this))}disconnectedCallback(){super.disconnectedCallback(),H(this)}async show(){if(!this.open)return this.open=!0,x(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,x(this,"sl-after-hide")}requestClose(t){if(y(this,"sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=a(this,"drawer.denyClose",{dir:this.localize.dir()});s(this.panel,t.keyframes,t.options)}else this.hide()}handleKeyDown(t){"Escape"===t.key&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){y(this,"sl-show"),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),D(this));const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([o(this.drawer),o(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame((()=>{y(this,"sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const n=a(this,`drawer.show${Xt(this.placement)}`,{dir:this.localize.dir()}),e=a(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([s(this.panel,n.keyframes,n.options),s(this.overlay,e.keyframes,e.options)]),y(this,"sl-after-show")}else{y(this,"sl-hide"),this.modal.deactivate(),H(this),await Promise.all([o(this.drawer),o(this.overlay)]);const t=a(this,`drawer.hide${Xt(this.placement)}`,{dir:this.localize.dir()}),n=a(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([s(this.panel,t.keyframes,t.options),s(this.overlay,n.keyframes,n.options)]),this.drawer.hidden=!0;const e=this.originalTrigger;"function"==typeof(null==e?void 0:e.focus)&&setTimeout((()=>e.focus())),y(this,"sl-after-hide")}}render(){return _`
      <div
        part="base"
        class=${k({drawer:!0,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":"rtl"===this.localize.dir(),"drawer--has-footer":this.hasSlotController.test("footer")})}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${T(this.noHeader?this.label:void 0)}
          aria-labelledby=${T(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":_`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <sl-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="drawer__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click=${()=>this.requestClose("close-button")}
                  ></sl-icon-button>
                </header>
              `}

          <div part="body" class="drawer__body">
            <slot></slot>
          </div>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Kt.styles=Wt,p([g(".drawer")],Kt.prototype,"drawer",2),p([g(".drawer__panel")],Kt.prototype,"panel",2),p([g(".drawer__overlay")],Kt.prototype,"overlay",2),p([m({type:Boolean,reflect:!0})],Kt.prototype,"open",2),p([m({reflect:!0})],Kt.prototype,"label",2),p([m({reflect:!0})],Kt.prototype,"placement",2),p([m({type:Boolean,reflect:!0})],Kt.prototype,"contained",2),p([m({attribute:"no-header",type:Boolean,reflect:!0})],Kt.prototype,"noHeader",2),p([v("open",{waitUntilFirstUpdate:!0})],Kt.prototype,"handleOpenChange",1),Kt=p([b("sl-drawer")],Kt),r("drawer.showTop",{keyframes:[{opacity:0,transform:"translateY(-100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}}),r("drawer.hideTop",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-100%)"}],options:{duration:250,easing:"ease"}}),r("drawer.showEnd",{keyframes:[{opacity:0,transform:"translateX(100%)"},{opacity:1,transform:"translateX(0)"}],rtlKeyframes:[{opacity:0,transform:"translateX(-100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}}),r("drawer.hideEnd",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(100%)"}],rtlKeyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(-100%)"}],options:{duration:250,easing:"ease"}}),r("drawer.showBottom",{keyframes:[{opacity:0,transform:"translateY(100%)"},{opacity:1,transform:"translateY(0)"}],options:{duration:250,easing:"ease"}}),r("drawer.hideBottom",{keyframes:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(100%)"}],options:{duration:250,easing:"ease"}}),r("drawer.showStart",{keyframes:[{opacity:0,transform:"translateX(-100%)"},{opacity:1,transform:"translateX(0)"}],rtlKeyframes:[{opacity:0,transform:"translateX(100%)"},{opacity:1,transform:"translateX(0)"}],options:{duration:250,easing:"ease"}}),r("drawer.hideStart",{keyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(-100%)"}],rtlKeyframes:[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(100%)"}],options:{duration:250,easing:"ease"}}),r("drawer.denyClose",{keyframes:[{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}],options:{duration:250}}),r("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),r("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});var Jt=d`
  ${f}

  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    pointer-events: none;
  }

  .image-comparer__before ::slotted(img),
  .image-comparer__after ::slotted(img),
  .image-comparer__before ::slotted(svg),
  .image-comparer__after ::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    transform: translateX(calc(var(--divider-width) / -2));
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-600);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle${u} {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`;function Yt(t,n,e){return t<n?n:t>e?e:t}var Gt=$(class extends z{constructor(t){var n;if(super(t),t.type!==C.ATTRIBUTE||"style"!==t.name||(null===(n=t.strings)||void 0===n?void 0:n.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((n,e)=>{const r=t[e];return null==r?n:n+`${e=e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(t,[n]){const{style:e}=t.element;if(void 0===this.ct){this.ct=new Set;for(const t in n)this.ct.add(t);return this.render(n)}this.ct.forEach((t=>{null==n[t]&&(this.ct.delete(t),t.includes("-")?e.removeProperty(t):e[t]="")}));for(const t in n){const r=n[t];null!=r&&(this.ct.add(t),t.includes("-")?e.setProperty(t,r):e[t]=r)}return j}}),Qt=class extends w{constructor(){super(...arguments),this.position=50}handleDrag(t){const{width:n}=this.base.getBoundingClientRect();t.preventDefault(),function(t,n){function e(e){const r=t.getBoundingClientRect(),i=t.ownerDocument.defaultView;(null==n?void 0:n.onMove)&&n.onMove(e.pageX-(r.left+i.pageXOffset),e.pageY-(r.top+i.pageYOffset))}document.addEventListener("pointermove",e,{passive:!0}),document.addEventListener("pointerup",(function t(){document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t),(null==n?void 0:n.onStop)&&n.onStop()})),(null==n?void 0:n.initialEvent)&&e(n.initialEvent)}(this.base,{onMove:t=>{this.position=parseFloat(Yt(t/n*100,0,100).toFixed(2))},initialEvent:t})}handleKeyDown(t){if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){const n=t.shiftKey?10:1;let e=this.position;t.preventDefault(),"ArrowLeft"===t.key&&(e-=n),"ArrowRight"===t.key&&(e+=n),"Home"===t.key&&(e=0),"End"===t.key&&(e=100),e=Yt(e,0,100),this.position=e}}handlePositionChange(){y(this,"sl-change")}render(){return _`
      <div part="base" id="image-comparer" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${Gt({clipPath:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${Gt({left:`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor" fill-rule="nonzero">
                  <path
                    d="m21.14 12.55-5.482 4.796c-.646.566-1.658.106-1.658-.753V7a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506h.001ZM2.341 12.55l5.482 4.796c.646.566 1.658.106 1.658-.753V7a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506h-.001Z"
                  />
                </g>
              </svg>
            </slot>
          </div>
        </div>
      </div>
    `}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Qt.styles=Jt,p([g(".image-comparer")],Qt.prototype,"base",2),p([g(".image-comparer__handle")],Qt.prototype,"handle",2),p([m({type:Number,reflect:!0})],Qt.prototype,"position",2),p([v("position",{waitUntilFirstUpdate:!0})],Qt.prototype,"handlePositionChange",1),Qt=p([b("sl-image-comparer")],Qt),M("3333"===location.port?"":"/web-components/");const tn=class{constructor(n){t(this,n),this.user=null,this.authToken=null,this.shoelace=!1,this._entities=[],this._showAnnotations=!1,this._showMenu=!1,this._infoPanelIsOpen=!1,this._annotatorWindow=null,this._zoomedIn={},this._tileSources=[],this._images=[],this._selectedIdx=0,this._current=null,this._annotations=[]}srcChanged(){this.buildImagesList()}compareModeChanged(){this._compareViewerInit()}authTokenChanged(){this._annotator&&this._annotator.setAuthToken(this.authToken),this.showAnnotationsToolbar(this.canAnnotate()),this.showAnnotations(this.canAnnotate()),this.setAnnoTarget()}annoBaseChanged(){this.setAnnoTarget()}_annoTargetChanged(){this._annotator&&this._annotator.loadAnnotations(this._annoTarget).then((t=>this._annotations=t))}userChanged(){this.showAnnotations(null!==this.user&&null!==this.authToken),this.setAnnoTarget(),this._annotator&&this._annotator.loadAnnotations(this._annoTarget).then((t=>this._annotations=t))}async _imagesChanged(){this._selectedIdx=0,this._current=this._images.length>0?this._images[0]:null,this._current&&(this._setHostDimensions(V(this._current.manifest)),this._viewer?this.compare||this._viewer.open(await this._loadTileSources()):this.compare?this._compareViewerInit():this._osdInit())}_selectedIdxChanged(t){this._current=this._images.length>t?this._images[t]:null}_currentChanged(){this.alt=this._value(this._current.manifest.label).toString(),this.setAnnoTarget(),this._annotator&&this._annotator.loadAnnotations(this._annoTarget).then((t=>this._annotations=t))}_annotationsChanged(){}serializedManifests(){return encodeURIComponent(JSON.stringify(this.compare?this._images:[this._images[this._selectedIdx]]))}annoTarget(t){let n=this.editorIsParent()?location.hash.length>1?location.hash.slice(1).split("/").filter((t=>t)).join("/"):"":location.pathname.split("/").filter((t=>t)).join("/"),e=X(V(t).id).slice(0,8);return this.annoBase?`${this.annoBase}/${e}`:this.authToken?this.editorIsParent()?[n.split("/")[0],e].join("/"):[X(jt(this.authToken).email.toLowerCase()).slice(0,8),e].join("/"):this.user?n?`${this.user}/${n}/${e}`:`${this.user}/${e}`:n?`${n}/${e}`:e}setAnnoTarget(){this._current&&(this._annoTarget=this.annoTarget(this._current.manifest))}zoomIn(){let t=1.5*this._viewer.viewport.getZoom();this._viewer.viewport.zoomTo(t)}zoomOut(){let t=this._viewer.viewport.getZoom()/1.5;this._viewer.viewport.zoomTo(t)}showInfo(){this._showInfoPopup()}toggleShowAnnotations(){this._showAnnotations=!this._showAnnotations,this.showAnnotations(this._showAnnotations)}setRegion(t,n=!1){this._viewer.viewport.fitBounds(K(t,this._viewer),n)}parseImageStr(t){let n=t.split(/\s/),e={manifest:n[0]};return n.slice(1).forEach((t=>{J(t)?e.seq=Vt.parseInt(t):t.indexOf(",")>0?e.options=Z(t):"cover"!==t&&"contain"!==t||(e.fit=t)})),e.options||(e.options=Z("")),e}async zoomto(t){const n=null==t?void 0:t.match(/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/);if(!n)return;let e,r=n[1]?Vt.parseInt(n[1].replace(/:$/,""))-1:0;if(new RegExp("[0-9a-f]{8}").test(n[3])){let t=`https://api.visual-essays.net/annotation/${this.annoTarget(this._images[r].manifest)}/${n[3]}/`,i=await fetch(t);if(i.ok){let t=await i.json();t&&t&&(e=t.target.selector.value.split("=")[1])}}else e=n[2]?`${n[2]}${n[3]}`:n[3];r&&this._viewer.goToPage(r),e&&setTimeout((()=>{this.setRegion(e,!1)}),100)}buildImagesList(){let t=[];if(this.src){let n={manifest:this.src,options:Z(this.options)};this.fit&&(n.fit=this.fit),t.push(n)}Array.from(this.el.querySelectorAll("li, span")).forEach((n=>t.push(this.parseImageStr(n.innerHTML)))),0===t.length&&this._entities.length>0&&t.push({manifest:`wd:${this._entities[0]}`,options:Z("")}),Y(t.map((t=>t.manifest))).then((n=>{n.forEach(((n,e)=>{t[e].manifest=n,t[e].manifestId=(t[e].manifest.id||t[e].manifest["@id"]).split("/").slice(-2)[0]})),this._images=t}))}listenForSlotChanges(){let t=document.querySelector("ve-image > ul, ve-image > span");t&&new MutationObserver((t=>{for(let n of t)"childList"!==n.type&&"characterData"!==n.type||this.buildImagesList()})).observe(t,{childList:!0,subtree:!0,characterData:!0})}connectedCallback(){this._entities=this.entities?this.entities.split(/\s+/).filter((t=>t)):[]}async componentWillLoad(){this.buildImagesList()}findVeImage(t){let n=t.previousSibling;for(;n;){if("VE-IMAGE"===n.nodeName)return n===this.el?n:null;n=n.previousSibling}for(;t.parentElement&&"MAIN"!==t.tagName;){let n=(t=t.parentElement).querySelector(":scope > ve-image");if(n)return n===this.el?n:null}}addMutationObserver(t){let n=t.classList.contains("active");new MutationObserver((e=>{e.forEach((e=>{var r,i;if("class"==e.attributeName){let o=e.target.classList.contains("active");n!==o&&(n=o,this.zoomto(o?null===(r=t.attributes.getNamedItem("enter"))||void 0===r?void 0:r.value:null===(i=t.attributes.getNamedItem("exit"))||void 0===i?void 0:i.value))}}))})).observe(t,{attributes:!0})}componentDidLoad(){this.sticky&&this.el.classList.add("sticky"),this._images.length>0&&this._setHostDimensions(),this.listenForSlotChanges(),Array.from(document.querySelectorAll("[enter],[exit]")).forEach((t=>{this.findVeImage(t)&&this.addMutationObserver(t)})),Array.from(document.querySelectorAll("mark")).forEach((t=>{for(let n=0;n<t.attributes.length;n++){let e=t.attributes.item(n);if(/^(\d+:|\d+$)?(pct:)?(\d+,\d+,\d+,\d+|[a-f0-9]{8})$/.test(e.value)){this.findVeImage(t.parentElement)&&(this._zoomedIn[e.value]=!1,t.addEventListener("click",(()=>setTimeout((()=>{this._zoomedIn[e.value]=!this._zoomedIn[e.value],this._zoomedIn[e.value]?this.zoomto(e.value):this.goHome(!1)}),200))));break}}}))}_setHostDimensions(t=null){console.dir(this.el);let n,e,r=this.el.shadowRoot.getElementById("wrapper"),i=this.el.shadowRoot.getElementById("caption"),o=i?i.clientHeight:32,a=this.el.shadowRoot.getElementById("osd"),s=this.el.clientWidth||this.el.parentElement.clientWidth,l=this.el.clientHeight,u=this.el.offsetTop-this.el.parentElement.offsetTop,c=this.width?this.width.indexOf("px")>0?Vt.parseInt(this.width.slice(0,-2)):Math.round(s*(parseFloat(this.width.slice(0,-1))/100)):null,h=this.height?this.height.indexOf("px")>0?Vt.parseInt(this.height.slice(0,-2)):Math.round((l-u)*parseFloat(this.height.slice(0,-1))/100):null,d=t?t.width:null,f=t?t.height:null;console.log(`ve-image.setHostDimensions: elWidth=${s} elHeight=${l} parentOffset=${u} requestedWidth=${c} requestedHeight=${h} imageWidth=${d} imageHeight=${f}`),c?(n=c,e=h||(t?Math.round(f/d*c)+o:c)):h?(e=h,n=Math.min(s,t?Math.round(d/f*(h-o)):c)):l?(e=l,n=Math.min(s,t?Math.round(d/f*(h-o)):c)):(n=s,e=Math.round(f/d*s+o)),console.log(`ve-image.setHostDimensions: width=${n} height=${e} caption=${o}`),r.style.width=this.compare?"100%":`${n}px`,r.style.height=this.compare?"100%":`${e}px`,a.style.width="100%",a.style.height=e-o+"px",this.align&&("center"===this.align?this.el.style.margin="auto":this.el.style.float=this.align)}async _tileSource(t,n){if(t.indexOf("/info.json")>0)return this.compare?{url:`${t.slice(0,-10)}/${n.region}/${n.size}/${n.rotation}/${n.quality}.${n.format}`,type:"image",buildPyramid:!0}:(console.log(t),t);{const e=this.el.shadowRoot.querySelector("#osd");if("full"!==n.region&&this.compare){let[r,i,o,a]=n.region.replace(/pct:/,"").split(",").map((t=>""!==t?parseFloat(t):void 0));const s={x:r,y:i,w:o,h:a},l={width:e.clientWidth,height:e.clientHeight};return{url:await q(t,s,l),type:"image",buildPyramid:!0}}return{url:t,type:"image",buildPyramid:!0}}}async _loadTileSources(){let t=this._images.map((t=>{let n=V(t.manifest,t.seq);return n.service?`${(n.service[0].id||n.service[0]["@id"]).replace(/\/info\.json$/,"")}/info.json`:n.id}));return await Promise.all(t.map(((t,n)=>this._tileSource(t,this._images[n].options))))}_copyTextToClipboard(t){navigator.clipboard&&navigator.clipboard.writeText(t)}_getViewportBounds(){const t=this._viewer.viewport.getBounds(),n=this._viewer.world.getItemAt(0);if(n){const e=n.viewportToImageRectangle(t);return`${Math.ceil(e.x)},${Math.ceil(e.y)},${Math.ceil(e.width)},${Math.ceil(e.height)}`}}_value(t,n="en"){return"object"==typeof t?t[n]||t.none||t[Object.keys(t).sort()[0]]:t}annotatorIsParent(){return location.hostname.indexOf("annotator")>=0||"4444"===location.port}editorIsParent(){return location.hostname.indexOf("editor")>=0||"5555"===location.port}canAnnotate(){return this.annotatorIsParent()&&null!==this.authToken}isTouchEnabled(){return"ontouchstart"in window||navigator.maxTouchPoints>0||(navigator.msMaxTouchPoints||0)>0}_showInfoPopup(){let t=this.el.shadowRoot.querySelector("#image-info-popup");t.innerHTML=`<ve-manifest images="${this.serializedManifests()}" condensed></ve-manifest>`,t.style.display="block"===t.style.display?"none":"block"}configureScrollBehavior(){let t=this.el.shadowRoot.getElementById("instructions");this.el.shadowRoot.querySelector(".openseadragon-canvas").style.touchAction="pan-y",new _t({viewer:this._viewer,hooks:[{tracker:"viewer",handler:"scrollHandler",hookHandler:n=>(this._viewer.isFullPage()||n.originalEvent.ctrlKey?"visible"==t.className&&(t.className="hidden"):(n.preventDefaultAction=!0,n.stopHandlers=!0,"hidden"==t.className&&(t.className="visible",setTimeout((()=>t.className="hidden"),1e3))),!0)}]}),new _t({viewer:this._viewer,hooks:[{tracker:"viewer",handler:"dragHandler",hookHandler:n=>(!this._viewer.isFullPage()&&this.isTouchEnabled()?(n.preventDefaultAction=!0,n.stopHandlers=!0,"hidden"==t.className&&(t.className="visible",setTimeout((()=>t.className="hidden"),1e3))):"visible"==t.className&&(t.className="hidden"),!0)}]}),new _t({viewer:this._viewer,hooks:[{tracker:"viewer",handler:"dragEndHandler",hookHandler:t=>{t.preventDefaultAction=!0,t.stopHandlers=!0}}]})}async _compareViewerInit(){if(this._tileSources=await this._loadTileSources(),!this.shoelace){let t=this.el.shadowRoot.querySelector(".osd-wrapper"),n=t.clientHeight,e=this.el.shadowRoot.getElementById("osd");e&&t.removeChild(e),e=document.createElement("div"),e.id="osd",e.style.height=`${n}px`,t.appendChild(e),this._viewer=new window.CurtainSyncViewer({mode:this.compare,container:e,images:this._tileSources.map(((t,n)=>({key:`item-${n}`,tileSource:t,shown:!0}))),osdOptions:{autoHideControls:!1,showHomeControl:!0,showZoomControl:!0,homeFillsViewer:!0,prefixUrl:"https://openseadragon.github.io/openseadragon/images/",zoomPerClick:2,visibilityRatio:1,wrapHorizontal:!1,constrainDuringPan:!0,minZoomImageRatio:1.35,maxZoomPixelRatio:3,viewportMargins:{left:0,top:0,bottom:0,right:0}}})}}async _osdInit(){let t=await this._loadTileSources(),n=this.el.shadowRoot.querySelector("#osd");this._viewer=Q({element:n,tileSources:t,prefixUrl:"https://openseadragon.github.io/openseadragon/images/",showNavigationControl:!0,minZoomImageRatio:.2,maxZoomPixelRatio:5,showHomeControl:!0,showZoomControl:!0,showFullPageControl:!0,showNavigator:!1,sequenceMode:!0,showReferenceStrip:!0,springStiffness:2}),location.hostname.indexOf("iiif")<0&&this.configureScrollBehavior(),this._annotator=new Nt(this._viewer,this.el.shadowRoot.querySelector("#toolbar"),this.authToken),this._annoTarget&&this._annotator.loadAnnotations(this._annoTarget).then((t=>this._annotations=t)),this.showAnnotationsToolbar(this.canAnnotate()),this.showAnnotations(this.canAnnotate()),this._viewer.addHandler("home",(t=>this.positionImage(t.immediately))),this._viewer.addHandler("page",(t=>this._selectedIdx=t.page)),this._viewer.addHandler("resize",(()=>setTimeout((()=>this._viewer.viewport.goHome(!0)),10))),this._viewer.world.addHandler("add-item",(()=>this.positionImage(!0))),this._viewer.addHandler("viewport-change",function(t,n,e){var r,i,o,a,s,l,u=0,c=!1,h=!1,d=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function f(n){var e=r,o=i;return r=i=void 0,u=n,a=t.apply(o,e)}function p(t){return u=t,s=setTimeout(g,n),c?f(t):a}function v(t){var e=t-l;return void 0===l||e>=n||e<0||h&&t-u>=o}function g(){var t=Rt();if(v(t))return m(t);s=setTimeout(g,function(t){var e=n-(t-l);return h?Ht(e,o-(t-u)):e}(t))}function m(t){return s=void 0,d&&r?f(t):(r=i=void 0,a)}function b(){var t=Rt(),e=v(t);if(r=arguments,i=this,l=t,e){if(void 0===s)return p(l);if(h)return s=setTimeout(g,n),f(l)}return void 0===s&&(s=setTimeout(g,n)),a}return n=Lt(n)||0,Bt(e)&&(c=!!e.leading,o=(h="maxWait"in e)?Dt(Lt(e.maxWait)||0,n):o,d="trailing"in e?!!e.trailing:d),b.cancel=function(){void 0!==s&&clearTimeout(s),u=0,r=l=i=s=void 0},b.flush=function(){return void 0===s?a:m(Rt())},b}((()=>{this._viewportBounds=this._getViewportBounds()}),100)),this._viewer.addHandler("open-failed",(t=>{if("Unable to load TileSource"===t.message&&t.source.indexOf("/info.json")>0){let t=V(this._current.manifest,this._current.seq);console.log(`Error: Unable to load IIIF TileSource, retrying with source image - ${decodeURIComponent(t.id)}`),this._viewer.open({url:t.id,type:"image",buildPyramid:!0})}}))}positionImage(t=!1){setTimeout((()=>{if("full"!==this._current.options.region)this.setRegion(this._current.options.region,t);else{let n=V(this._current.manifest),e=this.el.shadowRoot.getElementById("osd");const r=e.clientHeight/n.height,i=e.clientWidth/n.width;"horizontal"==("cover"===this._current.fit?i/r>1?"horizontal":"vertical":i/r>1?"vertical":"horizontal")?this._viewer.viewport.fitHorizontally(t):this._viewer.viewport.fitVertically(t)}}),1)}goHome(t=!1){this._viewer&&this._viewer.viewport.goHome(t)}showAnnotationsToolbar(t){Array.from(this.el.shadowRoot.querySelectorAll(".a9s-toolbar")).forEach((n=>{n.style.display=t?"unset":"none"}))}showAnnotations(t){this._showAnnotations=t,Array.from(this.el.shadowRoot.querySelectorAll(".a9s-annotationlayer")).forEach((n=>n.style.display=t?"unset":"none"))}toggleMenu(){let t=this.el.shadowRoot.querySelector(".drawer-contained");t&&(this._infoPanelIsOpen=!this._infoPanelIsOpen,t.open=this._infoPanelIsOpen)}toggleAnnotations(){this.showAnnotations(!this._showAnnotations)}openAnnotator(){let t,n,e=V(this._current.manifest),r=e.width/e.height;r<0?(t=800,n=t*r):(n=800,t=n*r);let i="https://annotator.visual-essays.net/";i+=`?manifest=${this._current.manifest.id||this._current.manifest["@id"]}`,this.annoBase&&(i+=`&anno-base=${this.annoBase}`),i+=`&auth-token=${this.authToken}`,this.openWindow(i,`toolbar=yes,location=yes,left=0,top=0,width=${t+300},height=${n+200},scrollbars=yes,status=yes`)}openWindow(t,n){this._annotatorWindow&&this._annotatorWindow.close(),void 0===n&&(n="toolbar=yes,location=yes,left=0,top=0,width=1000,height=1200,scrollbars=yes,status=yes"),this._annotatorWindow=window.open(t,"_blank",n)}render(){return this._images.length>0?[n("div",{id:"toolbar"}),n("div",{id:"wrapper"},n("div",{class:"osd-wrapper"},this.compare&&this.shoelace?n("sl-image-comparer",{position:"0"},this._tileSources.map(((t,e)=>n("img",{slot:0===e?"before":"after",src:t.url,alt:this._value(this._images[e].manifest.label).toString()})))):n("div",{id:"osd"}),n("div",{id:"instructions",class:"hidden"},"use ctrl + scroll or 2 fingers to zoom image."),n("sl-drawer",{label:"",contained:!0,class:"drawer-contained",placement:"start",style:{"--size":"40%"}},n("ve-manifest",{images:this.serializedManifests(),condensed:!0}),n("div",{class:"annotations-heading"},this.editorIsParent()||this._annotations.length>0?n("span",null,"Annotations"):null,this.editorIsParent()?n("sl-tooltip",{content:"Annotate image"},n("div",{class:"annotator-link",onClick:this.openAnnotator.bind(this)},n("sl-icon",{name:"pencil-square"}))):null),this._annotations.length>0?n("div",null,this._annotations.map((t=>n("div",{class:"anno"},n("sl-tooltip",{content:"Copy annotation ID"},n("sl-icon-button",{class:"anno-copy",onClick:this._copyTextToClipboard.bind(this,t.id.split("/").pop()),name:"clipboard",label:"Copy annotation ID"})),n("span",{class:"anno-link",onClick:this.setRegion.bind(this,t.target.selector.value.split("=").pop(),!1)},t.body[0].value))))):null)),!this.compare&&n("span",{id:"coords",class:"viewport-coords",onClick:this._copyTextToClipboard.bind(this,this._viewportBounds)},this._viewportBounds),n("div",{id:"caption"},n("sl-tooltip",{content:(this._infoPanelIsOpen?"Close":"Open")+" image info panel",disabled:this.isTouchEnabled()},n("sl-icon-button",{onClick:this.toggleMenu.bind(this),id:"menu-icon",name:"three-dots-vertical",label:"Open image info panel"})),!this.compare&&this._annotations.length>0?n("sl-tooltip",{content:(this._showAnnotations?"Hide":"Show")+" annotations",disabled:this.isTouchEnabled()},n("div",{class:"button-icon-with-badge",onClick:this.toggleAnnotations.bind(this)},n("sl-icon-button",{id:"annotations-icon",name:"chat-square-text",label:"Show annotations"}),n("sl-badge",{variant:"danger",pill:!0},this._annotations.length))):null,n("div",null,this.compare?"Compare viewer: move cursor over image to change view":this.alt)),n("div",{id:"image-info-popup"}))]:[n("div",{id:"toolbar"}),n("div",{id:"wrapper"},n("div",{class:"osd-wrapper"},n("div",{id:"osd"}),n("div",{id:"instructions",class:"hidden"},"use ctrl + scroll or 2 fingers to zoom image.")))]}get el(){return e(this)}static get watchers(){return{src:["srcChanged"],compare:["compareModeChanged"],authToken:["authTokenChanged"],annoBase:["annoBaseChanged"],_annoTarget:["_annoTargetChanged"],user:["userChanged"],_images:["_imagesChanged"],_selectedIdx:["_selectedIdxChanged"],_current:["_currentChanged"],_annotations:["_annotationsChanged"]}}};tn.style=':host{position:relative}.osd-wrapper{position:relative}#instructions{font-family:Roboto,sans-serif;pointer-events:none;position:absolute;z-index:3;left:0;right:0;top:0;bottom:0;background-color:rgba(0, 0, 0, 0.4);font-size:16px;color:white;display:flex;justify-content:center;align-items:center}.hidden{visibility:hidden}.visible{visibility:visible}sl-image-comparer{display:unset}sl-image-comparer img{width:100%}:host,ve-image{box-sizing:border-box;max-width:100%;display:flex;flex-direction:column;}*{box-sizing:border-box}ve-image-toolbar{position:absolute;top:10px;right:10px;transition:all 1s ease-out}:host(:hover) ve-image-toolbar{visibility:visible;opacity:1;transition:all 0.3s ease-in}#menu-icon,#annotations-icon{position:relative;cursor:pointer}.drawer-contained::part(panel){z-index:3;padding:3px;background-color:white;border-top:1px solid #ccc;border-left:1px solid #ccc;box-shadow:5px 0 10px -5px rgba(115,115,115,0.75)}.drawer-contained::part(overlay){background:none}.drawer-contained::part(body){padding:0}.drawer-contained::part(title){padding:0}.drawer-contained::part(close-button){padding:0}#menu-icon::part(base),#annotations-icon::part(base){color:white;font-size:1.2rem;padding:3px}h3{margin:12px 0 9px 0}#caption div.button-icon-with-badge{display:inline-block;position:relative;width:50px}.button-icon-with-badge sl-badge{position:absolute;left:40%;top:0;cursor:pointer}.button-icon-with-badge sl-badge::part(base){font-size:.6rem;background-color:yellow;color:black;font-weight:bold;padding:4px 5px 1px 5px;border:unset}.anno{font-family:Roboto,sans-serif;color:#0000EE;cursor:pointer;padding:4px;margin-bottom:6px;border:0.5px solid #ccc;font-size:0.8em}.anno-link{color:#0000EE}.anno-copy::part(base){padding:0 4px 0 0}.anno-link:hover{text-decoration:underline}#osd{width:100%;height:100%;z-index:3}.a9s-toolbar,.a9s-annotationlayer{display:none}.viewport-coords{position:absolute;font-family:sans-serif;bottom:0;right:0;width:130px;height:32px;padding:3px 6px;font-size:0.8rem;background-color:rgba(255, 255, 255, 0.5);color:black;z-index:2;opacity:0;text-align:right}.viewport-coords:hover{visibility:visible;opacity:1;transition:all 0.3s ease-in;cursor:copy}:host #info-icon{visibility:hidden}:host(:hover) #info-icon{visibility:visible}#info-icon{position:absolute;top:10px;right:10px;width:22px;height:22px;border:2px solid rgba(255, 255, 255, 0.8);border-radius:50%;background-color:white}#info-icon svg{fill:rgba(0, 0, 0, 0.6)}#info-icon:hover{cursor:pointer}#info-icon:hover svg{fill:black}.annotations-heading{display:flex;align-items:center;gap:9px;font-weight:bold;padding:4px}.annotations-heading sl-icon{color:#444;font-size:20px}.annotations-heading sl-icon:hover{color:black}.annotations-heading sl-icon::part(base){cursor:pointer}#image-info-popup{position:absolute;display:none;width:75%;max-width:300px;height:auto;max-height:500px;background:#fff;right:50px;top:10px;padding:6px;border:1px solid #444;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border-radius:3px;overflow-y:scroll}#caption{display:flex;align-items:center;font-family:sans-serif;width:100%;background:rgba(0, 0, 0, 0.7);color:white;padding:4px 6px;bottom:0;height:32px}#caption div{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:1rem}.a9s-toolbar-btn{margin:4px 4px 4px 0;outline:0;border:none;cursor:pointer;background-color:transparent;border-radius:4px;padding:8px;width:45px;height:45px}.a9s-toolbar-btn:hover{background-color:rgba(0,0,0,0.05)}.a9s-toolbar-btn-inner{display:flex}.a9s-toolbar-btn svg{overflow:visible;width:100%;height:100%}.a9s-toolbar-btn svg *{stroke-width:5px;fill:none;stroke:rgba(0,0,0,0.5)}.a9s-toolbar-btn g.handles circle{stroke-width:4px;fill:#fff;stroke:#000}.a9s-toolbar-btn.active{background-color:rgba(0,0,0,0.3)}.a9s-toolbar-btn.active svg *{stroke:rgba(255,255,255,0.6)}.a9s-toolbar-btn.active g.handles circle{stroke:#fff;fill:rgba(0,0,0,0.2)}svg.a9s-annotationlayer .a9s-selection .a9s-inner,svg.a9s-annotationlayer .a9s-annotation .a9s-inner{stroke-width:3;stroke:rgba(255,255,0,1.0);}svg.a9s-annotationlayer .a9s-selection-mask{fill:rgba(0, 0, 0, 0.3)}.r6o-editor{top:0;left:0;margin-left:-19px}.a9s-annotationlayer{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.a9s-annotationlayer.no-cursor,.a9s-annotationlayer.no-cursor *{cursor:none!important}.a9s-crosshair line{stroke-width:1px;stroke:#00000080;pointer-events:none;vector-effect:non-scaling-stroke;shape-rendering:crispEdges}.a9s-selection-mask{stroke:none;fill:transparent;pointer-events:none}.a9s-annotation rect,.a9s-annotation circle,.a9s-annotation ellipse,.a9s-annotation path,.a9s-annotation polygon,.a9s-selection rect,.a9s-selection circle,.a9s-selection ellipse,.a9s-selection path,.a9s-selection polygon{fill:transparent;cursor:pointer;vector-effect:non-scaling-stroke}.a9s-annotation .a9s-inner,.a9s-selection .a9s-inner{stroke:#fff;stroke-width:1px;fill:transparent}.a9s-annotation .a9s-inner:hover,.a9s-selection .a9s-inner:hover{stroke:#fff000}.a9s-annotation .a9s-outer,.a9s-selection .a9s-outer{stroke:#000000b3;stroke-width:3px;fill:none}.a9s-annotation .a9s-formatter-el,.a9s-selection .a9s-formatter-el{overflow:visible}.a9s-annotation.a9s-point .a9s-inner{display:none}.a9s-annotation.a9s-point .a9s-outer{stroke:#5a5a5a;stroke-width:1.5px;fill:#ffffff80}.a9s-annotation.a9s-point .a9s-outer:hover{fill:#fff000}.a9s-annotation.selected .a9s-inner,.a9s-selection .a9s-inner{stroke:#fff000}.a9s-annotation.editable .a9s-inner{stroke:#fff000;cursor:move!important}.a9s-annotation.editable .a9s-inner:hover{fill:#fff0001a}.a9s-handle{cursor:move}.a9s-handle .a9s-handle-inner{stroke:#fff000;fill:#000}.a9s-handle .a9s-handle-outer{stroke:#000;fill:#fff}.a9s-handle:hover .a9s-handle-inner{fill:#fff000}.r6o-btn{background-color:#4483c4;border:1px solid #4483c4;box-sizing:border-box;color:#fff;cursor:pointer;display:inline-block;font-size:14px;margin:0;outline:none;text-decoration:none;white-space:nowrap;padding:6px 18px;min-width:70px;vertical-align:middle;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px}.r6o-btn *{vertical-align:middle;cursor:pointer}.r6o-btn .r6o-icon{margin-right:4px}.r6o-btn:disabled{border-color:#a3c2e2!important;background-color:#a3c2e2!important}.r6o-btn:hover{background-color:#4f92d7;border-color:#4f92d7}.r6o-btn.outline{border:1px solid #4483c4;color:#4483c4;background-color:transparent;text-shadow:none}.r6o-autocomplete{display:inline;position:relative}.r6o-autocomplete div[role=combobox]{display:inline}.r6o-autocomplete input{outline:none;border:none;width:80px;height:100%;line-height:14px;white-space:pre;box-sizing:border-box;background-color:transparent;font-size:14px;color:#3f3f3f}.r6o-autocomplete ul{position:absolute;margin:0;padding:0;list-style-type:none;background-color:#fff;border-radius:3px;border:1px solid #d6d7d9;box-sizing:border-box;box-shadow:0 0 20px #00000040}.r6o-autocomplete ul:empty{display:none}.r6o-autocomplete li{box-sizing:border-box;padding:2px 12px;width:100%;cursor:pointer}.r6o-editable-text{max-height:120px;overflow:auto;outline:none;min-height:2em;font-size:14px;font-family:Lato,sans-serif}.r6o-editable-text:empty:not(:focus):before{content:attr(data-placeholder);color:#c2c2c2}.r6o-widget.comment{font-size:14px;min-height:3em;background-color:#fff;position:relative}.r6o-widget.comment .r6o-editable-text,.r6o-widget.comment .r6o-readonly-comment{padding:10px;width:100%;box-sizing:border-box;outline:none;border:none;background-color:transparent;resize:none}.r6o-widget.comment .r6o-readonly-comment{white-space:pre-line}.r6o-widget.comment .r6o-editable-text::-webkit-input-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text::-moz-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text:-moz-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text:-ms-input-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-lastmodified{border:1px solid #e5e5e5;display:inline-block;border-radius:2px;margin:0 10px 8px;padding:4px 5px;line-height:100%;font-size:12px}.r6o-widget.comment .r6o-lastmodified .r6o-lastmodified-at{color:#757575;padding-left:3px}.r6o-widget.comment .r6o-arrow-down{position:absolute;height:20px;width:20px;top:9px;right:9px;line-height:22px;background-color:#fff;text-align:center;-webkit-font-smoothing:antialiased;border:1px solid #e5e5e5;cursor:pointer;-webkit-border-radius:1px;-khtml-border-radius:1px;-moz-border-radius:1px;border-radius:1px}.r6o-widget.comment .r6o-arrow-down.r6o-menu-open{border-color:#4483c4}.r6o-widget.comment .r6o-comment-dropdown-menu{position:absolute;top:32px;right:8px;background-color:#fff;border:1px solid #e5e5e5;list-style-type:none;margin:0;padding:5px 0;z-index:9999;-webkit-box-shadow:0 2px 4px rgba(0,0,0,.2);-moz-box-shadow:0 2px 4px rgba(0,0,0,.2);box-shadow:0 2px 4px #0003}.r6o-widget.comment .r6o-comment-dropdown-menu li{padding:0 15px;cursor:pointer}.r6o-widget.comment .r6o-comment-dropdown-menu li:hover{background-color:#ecf0f1}.r6o-widget.comment .r6o-purposedropdown{position:relative;z-index:2}.r6o-widget.comment.editable{background-color:#ecf0f1}.r6o-widget.r6o-tag:empty{display:none}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.r6o-widget.tag .r6o-taglist li{height:27px}.r6o-widget.tag .r6o-taglist li .r6o-delete-wrapper .r6o-delete{position:relative;top:-4px}}.r6o-widget.r6o-tag{background-color:#ecf0f1;border-bottom:1px solid #e5e5e5;padding:1px 3px;display:flex}.r6o-widget.r6o-tag ul{margin:0;padding:0;list-style-type:none;z-index:1}.r6o-widget.r6o-tag ul.r6o-taglist{flex:0;white-space:nowrap}.r6o-widget.r6o-tag ul.r6o-taglist li{display:inline-block;margin:1px 1px 1px 0;padding:0;vertical-align:middle;overflow:hidden;font-size:12px;background-color:#fff;border:1px solid #d6d7d9;cursor:pointer;position:relative;line-height:180%;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-webkit-box-shadow:0 0 4px rgba(0,0,0,.1);-moz-box-shadow:0 0 4px rgba(0,0,0,.1);box-shadow:0 0 4px #0000001a}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-label{padding:2px 8px;display:inline-block}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper{display:inline-block;padding:2px 0;color:#fff;width:0;height:100%;background-color:#4483c4;-webkit-border-top-right-radius:2px;-webkit-border-bottom-right-radius:2px;-khtml-border-radius-topright:2px;-khtml-border-radius-bottomright:2px;-moz-border-radius-topright:2px;-moz-border-radius-bottomright:2px;border-top-right-radius:2px;border-bottom-right-radius:2px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper .r6o-delete{padding:2px 6px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper svg{vertical-align:text-top}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-enter-active{width:24px;transition:width .2s}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-enter-done,.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-exit{width:24px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-exit-active{width:0;transition:width .2s}.r6o-widget.r6o-tag .r6o-autocomplete{flex:1;position:relative}.r6o-widget.r6o-tag .r6o-autocomplete li{font-size:14px}.r6o-widget.r6o-tag input{width:100%;padding:0 3px;min-width:80px;outline:none;border:none;line-height:170%;background-color:transparent;color:#3f3f3f}.r6o-widget.r6o-tag input::-webkit-input-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input::-moz-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input:-moz-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input:-ms-input-placeholder{color:#c2c2c2}.r6o-editor{position:absolute;z-index:99999;width:400px;color:#3f3f3f;opacity:0;font-family:Lato,sans-serif;font-size:17px;line-height:27px;-webkit-transition:opacity .2s ease-in;-moz-transition:opacity .2s ease-in;transition:opacity .2s ease-in}.r6o-editor .r6o-arrow{position:absolute;overflow:hidden;top:-12px;left:12px;width:28px;height:12px;display:none}.r6o-editor .r6o-arrow:after{content:"";position:absolute;top:5px;left:5px;width:18px;height:18px;background-color:#fff;-webkit-backface-visibility:hidden;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.r6o-editor .r6o-editor-inner{background-color:#fff;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-webkit-box-shadow:2px 2px 42px rgba(0,0,0,.4);-moz-box-shadow:2px 2px 42px rgba(0,0,0,.4);box-shadow:2px 2px 42px #0006}.r6o-editor .r6o-editor-inner .r6o-widget:first-child{-webkit-border-top-left-radius:2px;-webkit-border-top-right-radius:2px;-khtml-border-radius-topleft:2px;-khtml-border-radius-topright:2px;-moz-border-radius-topleft:2px;-moz-border-radius-topright:2px;border-top-left-radius:2px;border-top-right-radius:2px}.r6o-editor .r6o-editor-inner .r6o-widget{border-bottom:1px solid #e5e5e5}.r6o-editor .r6o-footer{position:relative;text-align:right;padding:8px 0}.r6o-editor .r6o-footer .r6o-btn{margin-right:8px}.r6o-editor .r6o-footer .r6o-btn.delete-annotation{position:absolute;top:7px;left:7px;background-color:transparent;border:none;color:#4483c4;width:32px;height:32px;min-width:0;border-radius:100%;padding:0;display:flex;justify-content:center;align-items:center;-webkit-transition:all .1s ease-in;-moz-transition:all .1s ease-in;-o-transition:all .1s ease-in;transition:all .1s ease-in}.r6o-editor .r6o-footer .r6o-btn.delete-annotation:hover{color:#fff;background-color:#ef352c}@media (max-width: 640px){.r6o-editor{width:260px}}.r6o-editor.r6o-arrow-top .r6o-arrow{display:block}.r6o-editor.r6o-arrow-right{margin-left:8px}.r6o-editor.r6o-arrow-right .r6o-arrow{left:auto;right:12px}.r6o-editor.r6o-arrow-bottom .r6o-arrow{display:block;top:auto;bottom:-12px}.r6o-editor.r6o-arrow-bottom .r6o-arrow:after{top:-11px;box-shadow:none}.r6o-editor.pushed .r6o-arrow,.r6o-editor.dragged .r6o-arrow{display:none}.r6o-editor .r6o-draggable{cursor:move}.r6o-purposedropdown{width:150px;display:inline-block}.r6o-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.a9s-annotation.hover .a9s-inner{stroke:#fff000}.a9s-annotation:not(.hover):hover .a9s-inner{stroke:#fff}';const nn=class{constructor(n){t(this,n),this.condensed=!1,this._images=[]}srcChanged(t){t&&W(this.src).then((t=>this._images=[{manifest:t}]))}imagesChanged(){this._images=JSON.parse(decodeURIComponent(this.images))}parseManifest(t){let n=t.manifest,e={};if(e.id=this._value(n.id),e.label=this._value(n.label),n.summary&&(e.summary=this._value(n.summary)),n.rights&&(e.rights=n.rights),n.thumbnail&&(e.thumbnail=n.thumbnail[0].id),n.metadata){e.metadata=n.metadata.map((t=>({label:this._value(t.label)[0],value:this._value(t.value)})));let t=e.metadata.find((t=>"source_url"==t.label));e.sourceUrl=t?t.value[0]:null;let r=e.metadata.find((t=>"depicts"===t.label));r&&(e.depicts=r.value)}if(n.provider&&(e.provider=n.provider.map((t=>{let n={label:this._value(t.label),href:t.id};return t.logo&&(n.logo={src:t.logo[0].id}),n}))),n.logo&&(e.logo=n.logo.map((t=>{let n={src:"object"==typeof t?t.id||t["@id"]:t};return"object"==typeof t&&(t.width&&(n.width=t.width),t.height&&(n.height=t.height)),n}))),e.imageData=V(n),e.service=e.imageData.service&&`${(e.imageData.service[0].id||e.imageData.service[0]["@id"]).replace(/\/info\.json$/,"")}/info.json`,n.requiredStatement){let t=n.requiredStatement;e.requiredStatement={label:this._value(t.label),value:this._value(t.value)}}return n.homepage&&(e.homepage={label:n.homepage.label?this._value(n.homepage.label):n.homepage.id,href:n.homepage.id}),n.seeAlso&&(e.seeAlso=n.seeAlso.map((t=>({label:t.label?this._value(t.label):t.id,href:t.id})))),e}componentWillLoad(){this.images?this._images=JSON.parse(decodeURIComponent(this.images)):this.src&&W(this.src).then((t=>this._images=[{manifest:t}]))}_value(t,n="en"){return"object"!=typeof t||Array.isArray(t)?t:t[n]||t.none||t[Object.keys(t).sort()[0]]}onManifestIconDrag(t){var n;let e=t.target.parentElement.href;null===(n=t.dataTransfer)||void 0===n||n.setData("text/uri-list",`${e}?manifest=${e}`)}licenseBadge(t){let n={badgeWidth:88,badgeHeight:31,badgeTemplate:'https://licensebuttons.net/l/${this.rightsCode}${this.rightsCode === "publicdomain" ? "" : "/"+this.version}/${this.badgeWidth}x${this.badgeHeight}.png'},e={badgeTemplate:"https://rightsstatements.org/files/buttons/${this.rightsCode}.white.svg",backgroundColor:"318ac7"};const r=function(t,n){return new Function("return `"+t+"`;").call(n)};let i,o=t.rights,[a,s,l,u]=o.split("/").slice(2);return"creativecommons.org"===a?(l="zero"===l?"publicdomain":l,i=`<img src="${r(n.badgeTemplate,Object.assign(Object.assign({},n),{rightsCode:l,version:u}))}"/>`):"rightsstatements.org"===a&&(i=`<div style="display:inline-block;height:25px;padding:3px;background-color:#${e.backgroundColor};"><img style="height:100%;" src="${r(e.badgeTemplate,Object.assign(Object.assign({},e),{rightsCode:l}))}"/></div>`),i}render_condensed(){return this._images.map((t=>this.parseManifest(t))).map((t=>n("div",{class:"manifest condensed"},t.thumbnail?n("img",{class:"thumbnail",src:t.thumbnail}):null,n("div",{class:"lbl",style:{marginBottom:"12px;"}},t.sourceUrl?n("a",{href:t.sourceUrl,innerHTML:t.label}):t.label),t.summary?n("div",{class:"summary"},n("span",{class:"value"},t.summary)):null,t.requiredStatement?n("div",null,n("span",{class:"value",innerHTML:t.requiredStatement.value})):null,t.rights?n("div",{class:"rights"},n("a",{class:"value",href:t.rights,innerHTML:this.licenseBadge(t)})):null,t.provider?n("div",{class:"provider"},1==t.provider.length?n("div",{style:{display:"flex",alignItems:"center"}},t.provider[0].logo?n("img",{class:"logo",src:t.provider[0].logo.src,height:20}):null,n("a",{class:"value",href:t.provider[0].href,innerHTML:t.provider[0].label})):n("ul",null,t.provider.map((t=>n("li",null,t.logo?n("img",{class:"logo",src:t.logo.src,height:20}):null,n("a",{class:"value",href:t.href,innerHTML:t.label})))))):null,t.imageData.width?n("div",null,n("span",{class:"label"},"Dimensions")," ",n("span",{innerHTML:t.imageData.width.toLocaleString()})," x ",n("span",{innerHTML:t.imageData.height.toLocaleString()})):null,t.depicts?n("div",null,n("span",{class:"label"},"Depicts"),n("ul",null,t.depicts.map((t=>n("li",{innerHTML:t}))))):null,n("a",{draggable:!0,onDragStart:this.onManifestIconDrag.bind(this),href:t.id},n("img",{src:"https://avatars.githubusercontent.com/u/5812589?v=3&s=24",alt:"IIIF Manifest"})))))}render_full(){return this._images.map((t=>this.parseManifest(t))).map((t=>n("div",{class:"manifest"},n("div",{class:"manifest-id"},n("span",{class:"label"},"id"),n("a",{class:"value",href:t.id,innerHTML:t.id})),n("div",{class:"manifest-label"},n("span",{class:"label"},"label"),n("span",{class:"value"},t.label)),t.summary?n("div",{class:"summary"},n("span",{class:"label"},"summary"),n("span",{class:"value"},t.summary)):null,t.metadata?n("div",{class:"metadata"},n("span",{class:"label"},"metadata"),n("ul",null,t.metadata.map((t=>n("li",null,n("span",{class:"label"},t.label),1==t.value.length?n("span",{class:"value",innerHTML:t.value[0]}):n("ul",null,t.value.map((t=>n("li",{class:"value",innerHTML:t}))))))))):null,t.navDate?n("div",{class:"navDate"},n("span",{class:"label"},"navDate"),n("span",{class:"value"},t.navDate)):null,t.provider?n("div",{class:"provider"},n("span",{class:"label"},"provider"),1==t.provider.length?n("div",{style:{display:"flex",alignItems:"center"}},t.provider[0].logo?n("img",{class:"logo",src:t.provider[0].logo.src,height:20}):null,n("a",{class:"value",href:t.provider[0].href,innerHTML:t.provider[0].label})):n("ul",null,t.provider.map((t=>n("li",null,t.logo?n("img",{class:"logo",src:t.logo.src,height:20}):null,n("a",{class:"value",href:t.href,innerHTML:t.label})))))):null,t.homepage?n("div",{class:"homepage"},n("span",{class:"label"},"homepage"),n("a",{class:"value",href:t.homepage.href,innerHTML:t.homepage.label})):null,t.seeAlso?n("div",{class:"seeAlso"},n("span",{class:"label"},"seeAlso"),n("a",{class:"value",href:t.seeAlso[0].href,innerHTML:t.seeAlso[0].label})):null,t.logo?n("div",{class:"logo"},n("span",{class:"label"},"logo"),n("a",{class:"value",href:t.logo[0].src,innerHTML:t.logo[0].src})):null,t.rights?n("div",{class:"rights"},n("span",{class:"label"},"rights"),n("a",{class:"value",href:t.rights,innerHTML:t.rights})):null,t.requiredStatement?n("div",{class:"requiredStatement"},n("span",{class:"label"},"requiredStatement"),n("ul",null,n("li",null,t.requiredStatement.label&&t.requiredStatement.label[0]?n("span",{class:"label",innerHTML:t.requiredStatement.label}):null,n("span",{class:"value",innerHTML:t.requiredStatement.value})))):null,n("div",{class:"imageData"},n("div",null,n("span",{class:"label"},"image"),n("a",{class:"value",href:t.imageData.id,innerHTML:t.imageData.id})),n("div",null,n("span",{class:"label"},"format"),n("span",{class:"value",innerHTML:t.imageData.format})),n("div",null,n("span",{class:"label"},"width"),n("span",{class:"value",innerHTML:t.imageData.width})),n("div",null,n("span",{class:"label"},"height"),n("span",{class:"value",innerHTML:t.imageData.height}))),",",t.thumbnail?n("div",{class:"thumbnail"},n("span",{class:"label"},"thumbnail"),n("a",{class:"value",href:t.thumbnail,innerHTML:t.thumbnail})):null,t.service?n("div",{class:"service"},n("span",{class:"label"},"service"),n("a",{class:"value",href:t.service,innerHTML:t.service})):null)))}render(){return this._images?this.condensed?this.render_condensed():this.render_full():null}get el(){return e(this)}static get watchers(){return{src:["srcChanged"],images:["imagesChanged"]}}};nn.style='.manifest{font-family:Roboto, sans-serif;padding:6px;z-index:100}.manifest.condensed{border:1px solid #ccc;font-size:0.9rem;color:#444}.manifest.condensed:not(:first-of-type){margin-top:1.5em}.manifest.condensed .thumbnail{max-height:60px;max-width:60px;position:relative;float:left;margin:0 9px 6px 0}.manifest>div{margin-bottom:12px}.lbl,.lbl a,.summary{font-weight:bold;line-height:1.2em;color:#444}.summary,.rights{clear:both}.summary .value{line-height:1.1em}ul{list-style:none;margin:0}.label,.value{display:inline-flex}.value{display:inline;line-height:1.2rem;overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;color:#444}.manifest>div .label{font-weight:bold;min-width:80px;margin-right:6px}.label::after{content:":"}.logo{padding-right:6px}.manifest-id,.manifest-label,.summary,.provider,.rights,.service,.imageData div,.thumbnail{display:flex;align-items:center}.metadata>ul,.requiredStatement ul{padding-left:24px}.metadata ul li,.requiredStatement ul li{display:flex}.metadata ul ul{padding-left:0}a:link,a:visited{color:#0000EE}';var en=d`
  ${f}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,rn=["sl-button","sl-radio-button"],on=class extends w{constructor(){super(...arguments),this.label=""}handleFocus(t){const n=an(t.target);null==n||n.classList.add("sl-button-group__button--focus")}handleBlur(t){const n=an(t.target);null==n||n.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){const n=an(t.target);null==n||n.classList.add("sl-button-group__button--hover")}handleMouseOut(t){const n=an(t.target);null==n||n.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((n=>{const e=t.indexOf(n),r=an(n);null!==r&&(r.classList.add("sl-button-group__button"),r.classList.toggle("sl-button-group__button--first",0===e),r.classList.toggle("sl-button-group__button--inner",e>0&&e<t.length-1),r.classList.toggle("sl-button-group__button--last",e===t.length-1))}))}render(){return _`
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
    `}};function an(t){return rn.includes(t.tagName.toLowerCase())?t:t.querySelector(rn.join(","))}on.styles=en,p([g("slot")],on.prototype,"defaultSlot",2),p([m()],on.prototype,"label",2),on=p([b("sl-button-group")],on);var sn=d`
  ${f}

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
  :host(${u}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
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
`,ln=class extends w{constructor(){super(...arguments),this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}getTextLabel(){return h(this.defaultSlot)}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,y(this,"sl-label-change")):this.cachedTextLabel=t}render(){return _`
      <div
        part="base"
        class=${k({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
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
    `}};ln.styles=sn,p([g("slot:not([name])")],ln.prototype,"defaultSlot",2),p([g(".menu-item")],ln.prototype,"menuItem",2),p([m({type:Boolean,reflect:!0})],ln.prototype,"checked",2),p([m()],ln.prototype,"value",2),p([m({type:Boolean,reflect:!0})],ln.prototype,"disabled",2),p([v("checked")],ln.prototype,"handleCheckedChange",1),p([v("disabled")],ln.prototype,"handleDisabledChange",1),ln=p([b("sl-menu-item")],ln),M("3333"===location.port?"":"/web-components/");const un=class{constructor(n){t(this,n),this.filters="",this.icon=!1,this.tooltip="",this.API="AIzaSyCEoD17BDJpQxSeNpm-_vy9bJ-dHweFwEs",this.DOMAIN="https://kent-maps.online/",this.SEARCH_QUOTA_EXCEEDED_MESSAGE="Total site search quota exceeded for the day",this.NO_RESULTS_MESSAGE="No results",this.RESULTS_PER_PAGE=10,this.items=[],this.error="",this.search=!1,this.previousStart=0,this.activeFilter="all",this.filtersObject=new Object}fillFilters(){this.filtersObject.all="All";for(var t=this.filters.split(","),n=0;n<t.length;n++){var e=t[n].split(":");e[0]=e[0].replace(" ",""),this.filtersObject[e[0]]=e[1]}}doSearch(t){var n=this.el.shadowRoot.getElementById("ve-search-input").value;n=n.replace(" ","+"),this.error="",this.search=!0,null!=this.items&&0!=t||(this.items=[]),fetch(`https://www.googleapis.com/customsearch/v1?key=${this.API}&cx=${this.cx}&q=${n}&start=${t}`).then((t=>t.json())).then((t=>{this.items=this.items.concat(this.applyFilters(t.items)),null==t.queries.nextPage?(this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display="none",this.el.shadowRoot.getElementById("ve-search-show-more").style.display="none"):(this.el.shadowRoot.getElementById("ve-search-end-of-output").style.display="block",this.el.shadowRoot.getElementById("ve-search-show-more").style.display="block")})).catch((()=>{this.error="searchQuotaExceeded"})).catch((t=>{console.log(t)})),this.previousStart=t,this.el.shadowRoot.getElementById("ve-search-hide-output").style.display="inline-block",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="block"}searchInputKeyPress(t){"Enter"===t.key&&this.doSearch(0)}applyFilters(t){var n=[];if("all"==this.activeFilter)return t;for(let r=0;r<t.length;r++){var e=t[r];e.link.replace(this.DOMAIN,"").startsWith(this.activeFilter)&&n.push(e)}return n}invertOutput(){"block"==this.el.shadowRoot.getElementById("ve-search-dropdown").style.display?this.hideOutput():this.showOutput()}hideOutput(){this.el.shadowRoot.getElementById("ve-search-hide-output").innerText="▼",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="none"}showOutput(){this.el.shadowRoot.getElementById("ve-search-hide-output").innerText="▲",this.el.shadowRoot.getElementById("ve-search-dropdown").style.display="block"}updateFilter(t){this.activeFilter=t,this.el.shadowRoot.getElementById("ve-search-filter-item-"+t).setAttribute("checked","true")}showSearchBar(){this.el.shadowRoot.getElementById("ve-search-bar").style.display="block",this.el.shadowRoot.getElementById("ve-search-bar-show-button").style.display="none"}displayFilters(){var t,e=[];if(this.filters.length>0)for(t in this.filtersObject)e=e.concat([n("sl-menu-item",{id:"ve-search-filter-item-"+t,value:t,onClick:this.updateFilter.bind(this,t)},this.filtersObject[t])]);else e=[n("style",{type:"text/css",innerHTML:"\n            #ve-search-input-container {\n                border-left: 1px rgb(212, 212, 216) solid;\n                border-top-left-radius: 3px;\n                border-bottom-left-radius: 3px;\n            }\n            #ve-search-filter-dropdown {\n                display: none;\n            }"})];return e}displayOutput(){var t="";if(this.search)if(0==this.items.length)t=`<p>${this.NO_RESULTS_MESSAGE}</p>`;else if("searchQuotaExceeded"==this.error)t=`<p>${this.SEARCH_QUOTA_EXCEEDED_MESSAGE}</p>`;else for(let e=0;e<this.items.length;e++){var n=this.items[e];t+=`<p id = 've-search-output-title'><a href = '${n.link}'>"${n.title}</a></p>`,t+=`<p id = 've-search-output-link'>${n.link}"</p>`}return t}displayTooltip(){var t=[n("style",{type:"text/css",id:"search-bar-style",innerHTML:"\n            #ve-search-bar {\n                display: none;\n            }"})],e=[n("sl-button",{id:"ve-search-bar-show-button",onclick:()=>this.showSearchBar()},n("sl-icon",{name:"search",label:"Search"}))];return this.tooltip.length>0?[n("sl-tooltip",{content:this.tooltip},t,e)]:[n("sl-tooltip",{content:this.tooltip,disabled:!0},t,e)]}render(){var t=[];return this.fillFilters(),t=t.concat([n("div",{id:"search-container"},n("sl-button-group",{id:"ve-search-bar"},n("sl-dropdown",{id:"ve-search-filter-dropdown"},n("sl-button",{id:"ve-search-active-filter",slot:"trigger",caret:!0},this.filtersObject[this.activeFilter]),n("sl-menu",{id:"ve-search-filter-menu"},this.displayFilters())),n("div",{id:"ve-search-input-container"},n("input",{id:"ve-search-input",type:"text",placeholder:"Search the site...",onKeyPress:this.searchInputKeyPress.bind(this)}),n("button",{id:"ve-search-hide-output",onClick:this.invertOutput.bind(this)},"▲")),n("sl-button",{id:"ve-search-search-button",onclick:this.doSearch.bind(this,0)},n("sl-icon",{name:"search",label:"Search"}))),n("div",{id:"ve-search-dropdown"},n("div",{id:"ve-search-output",innerHTML:this.displayOutput()}),n("hr",{id:"ve-search-end-of-output"}),n("button",{id:"ve-search-show-more",onClick:this.doSearch.bind(this,this.previousStart+this.RESULTS_PER_PAGE)},"Show more...")))]),this.icon&&(t=t.concat([n("div",null,this.displayTooltip())])),t}get el(){return e(this)}};un.style="#ve-search-input-container{outline:none;border:1px rgb(212, 212, 216) solid;background:white;border-left:none;border-right:none;border-radius:0px}#ve-search-input{outline:none;border:none;margin-top:5%;padding-left:10px}#ve-search-bar-show-button::part(base),#ve-search-search-button::part(base),#ve-search-filter-dropdown>sl-button::part(base){background-color:white}#ve-search-bar{width:max-content}#ve-search-bar:hover{box-shadow:0 0 10px rgb(146, 209, 248)}#ve-search-hide-output{background:none;border:none;display:none;padding-right:10px;cursor:pointer}#ve-search-dropdown{width:70%;display:none;border:1px rgb(212, 212, 216) solid;background-color:white;border-radius:3px;padding:7px;margin-top:0;position:absolute;z-index:2}#ve-search-output{margin-left:10px}#ve-search-output>*{font-family:Roboto, sans-serif}#ve-search-output-title{margin-bottom:0}#ve-search-output-title>a{text-decoration:none;color:rgb(147 179 243)}#ve-search-output-link{font-style:italic;font-size:0.8em;color:rgb(60, 131, 40);margin-top:0%}#ve-search-output-title>a:visited{color:rgb(188 140 242)}#ve-search-end-of-output{height:1px;width:99%;background-color:rgb(212, 212, 216);border:none}#ve-search-show-more{border:none;background:none;margin-left:9px;cursor:pointer}";export{pt as ve_contact,vt as ve_footer,yt as ve_header,tn as ve_image,nn as ve_manifest,un as ve_search}