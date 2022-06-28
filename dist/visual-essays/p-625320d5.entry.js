import{r,h as a,g as d}from"./p-f5d08bd3.js";import{g as o,t as e,d as s}from"./p-c262ddd9.js";import{r as i,c as t,_ as c,s as l,$ as n,o as h,n as p,k as m}from"./p-7059461a.js";import{H as v}from"./p-32764e44.js";import"./p-7a9c1438.js";var b=i`
  ${t}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,g=class extends l{constructor(){super(...arguments),this.hasSlotController=new v(this,"footer","header","image")}render(){return n`
      <div
        part="base"
        class=${h({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};g.styles=b,g=c([p("sl-card")],g),m("3333"===location.port?"":"https://visual-essays.github.io/web-components/dist/collection");const _=class{constructor(a){r(this,a)}async connectedCallback(){this.description=this.el.innerHTML.trim(),this._manifest=await o(this.manifest)}render(){return[a("sl-card",{class:"card-overview"},a("img",{slot:"image",src:e(this._manifest),alt:s(this._manifest)}),a("div",{class:"label",innerHTML:this.label}),a("sl-icon",{name:"envelope"}),this.description&&a("div",{class:"description",innerHTML:this.description}))]}get el(){return d(this)}};_.style=":host{font-family:Roboto, sans-serif}.card-overview{max-width:200px}.label{font-size:1em;line-height:1.1em;font-weight:bold;padding-bottom:12px}.description{font-size:.8em;line-height:1.1em}";export{_ as ve_card}