import { f as focusVisibleSelector, l, n as n$1, c as getTabbableBoundary } from './chunk.H262HIXG.js';
import { r, c as component_styles_default, _ as __decorateClass, k as t, i as i2, e, n, s as s4, d as emit, o, l as l$1 } from './chunk.GP3HCHHG.js';

// src/components/icon-button/icon-button.styles.ts
var icon_button_styles_default = r`
  ${component_styles_default}

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

  .icon-button${focusVisibleSelector} {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// src/components/icon-button/icon-button.ts
var SlIconButton = class extends s4 {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? l`a` : l`button`;
    return n$1`
      <${tag}
        part="base"
        class=${o({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${l$1(isLink ? void 0 : this.disabled)}
        type=${l$1(isLink ? void 0 : "button")}
        href=${l$1(isLink ? this.href : void 0)}
        target=${l$1(isLink ? this.target : void 0)}
        download=${l$1(isLink ? this.download : void 0)}
        rel=${l$1(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$1(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${l$1(this.name)}
          library=${l$1(this.library)}
          src=${l$1(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = icon_button_styles_default;
__decorateClass([
  t()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  i2(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  e()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass([
  n("sl-icon-button")
], SlIconButton);

// src/internal/modal.ts
var activeModals = [];
var Modal = class {
  constructor(element) {
    this.tabDirection = "forward";
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  activate() {
    activeModals.push(this.element);
    document.addEventListener("focusin", this.handleFocusIn);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  deactivate() {
    activeModals = activeModals.filter((modal) => modal !== this.element);
    document.removeEventListener("focusin", this.handleFocusIn);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  isActive() {
    return activeModals[activeModals.length - 1] === this.element;
  }
  checkFocus() {
    if (this.isActive()) {
      if (!this.element.matches(":focus-within")) {
        const { start, end } = getTabbableBoundary(this.element);
        const target = this.tabDirection === "forward" ? start : end;
        if (typeof (target == null ? void 0 : target.focus) === "function") {
          target.focus({ preventScroll: true });
        }
      }
    }
  }
  handleFocusIn() {
    this.checkFocus();
  }
  handleKeyDown(event) {
    if (event.key === "Tab" && event.shiftKey) {
      this.tabDirection = "backward";
    }
    requestAnimationFrame(() => this.checkFocus());
  }
  handleKeyUp() {
    this.tabDirection = "forward";
  }
};

export { Modal as M };
