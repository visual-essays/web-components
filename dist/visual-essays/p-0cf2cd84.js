import{m as t,p as o,q as e,r as n,c as r,$ as s,_ as i,j as a,i as l,e as c,n as u,s as d,b as h,o as f,l as b}from"./p-7059461a.js";function m(e,n,r){return new Promise((s=>{if((null==r?void 0:r.duration)===1/0)throw new Error("Promise-based animations must be finite.");const i=e.animate(n,t(o({},r),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:r.duration}));i.addEventListener("cancel",s,{once:!0}),i.addEventListener("finish",s,{once:!0})}))}function p(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function v(t){return Promise.all(t.getAnimations().map((t=>new Promise((o=>{const e=requestAnimationFrame(o);t.addEventListener("cancel",(()=>e),{once:!0}),t.addEventListener("finish",(()=>e),{once:!0}),t.cancel()})))))}var $=new Map,w=new WeakMap;function y(t,o){return"rtl"===o.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function g(t,o){$.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(o))}function k(t,o,e){const n=w.get(t);if(null==n?void 0:n[o])return y(n[o],e.dir);const r=$.get(o);return r?y(r,e.dir):{keyframes:[],options:{duration:0}}}var S,F=new Set,C=new MutationObserver(E),x=new Map,P=document.documentElement.dir||"ltr",_=document.documentElement.lang||navigator.language;function E(){P=document.documentElement.dir||"ltr",_=document.documentElement.lang||navigator.language,[...F.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}C.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});var M=class extends class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){F.add(this.host)}hostDisconnected(){F.delete(this.host)}dir(){return`${this.host.dir||P}`.toLowerCase()}lang(){return`${this.host.lang||_}`.toLowerCase()}term(t,...o){const e=this.lang().toLowerCase().slice(0,2),n=this.lang().length>2?this.lang().toLowerCase():"",r=x.get(n),s=x.get(e);let i;if(r&&r[t])i=r[t];else if(s&&s[t])i=s[t];else{if(!S||!S[t])return console.error(`No translation found for: ${String(t)}`),t;i=S[t]}return"function"==typeof i?i(...o):i}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,e){return new Intl.RelativeTimeFormat(this.lang(),e).format(t,o)}}{};[{$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",currentValue:"Current value",hidePassword:"Hide password",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"}].map((t=>{const o=t.$code.toLowerCase();x.has(o)?x.set(o,Object.assign(Object.assign({},x.get(o)),t)):x.set(o,t),S||(S=t)})),E();var T=(()=>{const t=document.createElement("style");let o;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),o=!0}catch(t){o=!1}finally{t.remove()}return o})(),j=e(T?":focus-visible":":focus"),N=n`
  ${r}

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

  .icon-button${j} {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,z=Symbol.for(""),I=t=>{var o,e;if((null===(o=t)||void 0===o?void 0:o.r)===z)return null===(e=t)||void 0===e?void 0:e._$litStatic$},O=(t,...o)=>({_$litStatic$:o.reduce(((o,e,n)=>o+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(e)+t[n+1]),t[0]),r:z}),q=new Map,A=(t=>(o,...e)=>{const n=e.length;let r,s;const i=[],a=[];let l,c=0,u=!1;for(;c<n;){for(l=o[c];c<n&&void 0!==(s=e[c],r=I(s));)l+=r+o[++c],u=!0;a.push(s),i.push(l),c++}if(c===n&&i.push(o[n]),u){const t=i.join("$$lit$$");void 0===(o=q.get(t))&&(i.raw=i,q.set(t,o=i)),e=a}return t(o,...e)})(s),B=class extends d{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,h(this,"sl-blur")}handleFocus(){this.hasFocus=!0,h(this,"sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}render(){const t=!!this.href,o=t?O`a`:O`button`;return A`
      <${o}
        part="base"
        class=${f({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${b(t?void 0:this.disabled)}
        type=${b(t?void 0:"button")}
        href=${b(t?this.href:void 0)}
        target=${b(t?this.target:void 0)}
        download=${b(t?this.download:void 0)}
        rel=${b(t&&this.target?"noreferrer noopener":void 0)}
        role=${b(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${b(this.name)}
          library=${b(this.library)}
          src=${b(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${o}>
    `}};B.styles=N,i([a()],B.prototype,"hasFocus",2),i([l(".icon-button")],B.prototype,"button",2),i([c()],B.prototype,"name",2),i([c()],B.prototype,"library",2),i([c()],B.prototype,"src",2),i([c()],B.prototype,"href",2),i([c()],B.prototype,"target",2),i([c()],B.prototype,"download",2),i([c()],B.prototype,"label",2),i([c({type:Boolean,reflect:!0})],B.prototype,"disabled",2),B=i([u("sl-icon-button")],B);export{M as L,v as a,m as b,j as f,k as g,T as h,O as l,A as n,p,g as s}