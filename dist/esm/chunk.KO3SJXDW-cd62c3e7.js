import { m as __spreadProps, p as __spreadValues, q as o$1, r, c as component_styles_default, $, _ as __decorateClass, j as t, i as i2, e as e$1, n as n$1, s as s4, b as emit, o as o$2, l as l$1 } from './chunk.GP3HCHHG-7c73cbfd.js';

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = delay.toString().toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(el.getAnimations().map((animation) => {
    return new Promise((resolve) => {
      const handleAnimationEvent = requestAnimationFrame(resolve);
      animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
      animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
      animation.cancel();
    });
  }));
}

// src/utilities/animation-registry.ts
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var documentElementObserver = new MutationObserver(update);
var translations = /* @__PURE__ */ new Map();
var documentDirection = document.documentElement.dir || "ltr";
var documentLanguage = document.documentElement.lang || navigator.language;
var fallback;
documentElementObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["dir", "lang"]
});
function registerTranslation(...translation2) {
  translation2.map((t) => {
    const code = t.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t));
    } else {
      translations.set(code, t);
    }
    if (!fallback) {
      fallback = t;
    }
  });
  update();
}
function update() {
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  term(key, ...args) {
    const code = this.lang().toLowerCase().slice(0, 2);
    const regionCode = this.lang().length > 2 ? this.lang().toLowerCase() : "";
    const primary = translations.get(regionCode);
    const secondary = translations.get(code);
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return key;
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// src/utilities/localize.ts
var LocalizeController2 = class extends LocalizeController {
};

// src/translations/en.ts
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  clearEntry: "Clear entry",
  close: "Close",
  copy: "Copy",
  currentValue: "Current value",
  hidePassword: "Hide password",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);

// src/internal/focus-visible.ts
var hasFocusVisible = (() => {
  const style = document.createElement("style");
  let isSupported;
  try {
    document.head.appendChild(style);
    style.sheet.insertRule(":focus-visible { color: inherit }");
    isSupported = true;
  } catch (e) {
    isSupported = false;
  } finally {
    style.remove();
  }
  return isSupported;
})();
var focusVisibleSelector = o$1(hasFocusVisible ? ":focus-visible" : ":focus");

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

// node_modules/lit-html/static.js
var o = Symbol.for("");
var e = (t) => {
  var r, e2;
  if (((r = t) === null || r === void 0 ? void 0 : r.r) === o)
    return (e2 = t) === null || e2 === void 0 ? void 0 : e2._$litStatic$;
};
var l = (t, ...r) => ({ _$litStatic$: r.reduce((r2, o2, e2) => r2 + ((t2) => {
  if (t2._$litStatic$ !== void 0)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(o2) + t[e2 + 1], t[0]), r: o });
var a = /* @__PURE__ */ new Map();
var s = (t) => (r, ...o2) => {
  const i = o2.length;
  let l2, s2;
  const n2 = [], u2 = [];
  let c, v = 0, $2 = false;
  for (; v < i; ) {
    for (c = r[v]; v < i && (s2 = o2[v], l2 = e(s2)) !== void 0; )
      c += l2 + r[++v], $2 = true;
    u2.push(s2), n2.push(c), v++;
  }
  if (v === i && n2.push(r[i]), $2) {
    const t2 = n2.join("$$lit$$");
    (r = a.get(t2)) === void 0 && (n2.raw = n2, a.set(t2, r = n2)), o2 = u2;
  }
  return t(r, ...o2);
};
var n = s($);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

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
    return n`
      <${tag}
        part="base"
        class=${o$2({
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
  e$1()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  e$1()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  e$1({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass([
  n$1("sl-icon-button")
], SlIconButton);

export { LocalizeController2 as L, stopAnimations as a, animateTo as b, focusVisibleSelector as f, getAnimation as g, hasFocusVisible as h, l, n, parseDuration as p, setDefaultAnimation as s };
