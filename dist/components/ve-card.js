import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getManifest, t as thumbnail, l as label } from './utils.js';
import { r, c as component_styles_default, _ as __decorateClass, s as s4, H as HasSlotController, $, o, n, a as setBasePath } from './chunk.GP3HCHHG.js';

// src/components/card/card.styles.ts
var card_styles_default = r`
  ${component_styles_default}

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
`;

// src/components/card/card.ts
var SlCard = class extends s4 {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      card: true,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
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
    `;
  }
};
SlCard.styles = card_styles_default;
SlCard = __decorateClass([
  n("sl-card")
], SlCard);

const veCardCss = ":host{font-family:Roboto, sans-serif}.card-overview{max-width:200px}.label{font-size:1em;line-height:1.1em;font-weight:bold;padding-bottom:12px}.description{font-size:.8em;line-height:1.1em}";

setBasePath(location.port === '3333' ? '' : 'https://visual-essays.github.io/web-components/dist/collection');
const Card = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  async connectedCallback() {
    this.description = this.el.innerHTML.trim();
    this._manifest = await getManifest(this.manifest);
  }
  render() {
    return [
      h("sl-card", { class: "card-overview" }, h("img", { slot: "image", src: thumbnail(this._manifest), alt: label(this._manifest) }), h("div", { class: "label", innerHTML: this.label }), h("sl-icon", { name: "envelope" }), this.description && h("div", { class: "description", innerHTML: this.description }))
    ];
  }
  get el() { return this; }
  static get style() { return veCardCss; }
}, [1, "ve-card", {
    "entities": [1],
    "manifest": [1],
    "label": [1],
    "_manifest": [32],
    "description": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-card"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Card);
      }
      break;
  } });
}

const VeCard = Card;
const defineCustomElement = defineCustomElement$1;

export { VeCard, defineCustomElement };
