'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f005592.js');
const utils = require('./utils-37a145e2.js');
const chunk_GP3HCHHG = require('./chunk.GP3HCHHG-3254b6af.js');
require('./openseadragon-d6a5fb09.js');

// src/components/card/card.styles.ts
var card_styles_default = chunk_GP3HCHHG.r`
  ${chunk_GP3HCHHG.component_styles_default}

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
var SlCard = class extends chunk_GP3HCHHG.s4 {
  constructor() {
    super(...arguments);
    this.hasSlotController = new chunk_GP3HCHHG.HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return chunk_GP3HCHHG.$`
      <div
        part="base"
        class=${chunk_GP3HCHHG.o({
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
SlCard = chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.n("sl-card")
], SlCard);

const veCardCss = ":host{font-family:Roboto, sans-serif}.card-overview{max-width:200px}.label{font-size:1em;line-height:1.1em;font-weight:bold;padding-bottom:12px}.description{font-size:.8em;line-height:1.1em}";

chunk_GP3HCHHG.setBasePath('https://visual-essays.github.io/web-components/www');
const Card = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async connectedCallback() {
    this.description = this.el.innerHTML.trim();
    this._manifest = await utils.getManifest(this.manifest);
  }
  render() {
    return [
      index.h("sl-card", { class: "card-overview" }, index.h("img", { slot: "image", src: utils.thumbnail(this._manifest), alt: utils.label(this._manifest) }), index.h("div", { class: "label", innerHTML: this.label }), index.h("sl-icon", { name: "envelope" }), this.description && index.h("div", { class: "description", innerHTML: this.description }))
    ];
  }
  get el() { return index.getElement(this); }
};
Card.style = veCardCss;

exports.ve_card = Card;
