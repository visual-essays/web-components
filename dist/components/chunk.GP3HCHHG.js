// node_modules/@lit/reactive-element/css-tag.js
var t$2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e$2 = Symbol();
var n$1 = /* @__PURE__ */ new Map();
var s = class {
  constructor(t3, n5) {
    if (this._$cssResult$ = true, n5 !== e$2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e4 = n$1.get(this.cssText);
    return t$2 && e4 === void 0 && (n$1.set(this.cssText, e4 = new CSSStyleSheet()), e4.replaceSync(this.cssText)), e4;
  }
  toString() {
    return this.cssText;
  }
};
var o$2 = (t3) => new s(typeof t3 == "string" ? t3 : t3 + "", e$2);
var r = (t3, ...n5) => {
  const o5 = t3.length === 1 ? t3[0] : n5.reduce((e4, n6, s5) => e4 + ((t4) => {
    if (t4._$cssResult$ === true)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n6) + t3[s5 + 1], t3[0]);
  return new s(o5, e$2);
};
var i$2 = (e4, n5) => {
  t$2 ? e4.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((t3) => {
    const n6 = document.createElement("style"), s5 = window.litNonce;
    s5 !== void 0 && n6.setAttribute("nonce", s5), n6.textContent = t3.cssText, e4.appendChild(n6);
  });
};
var S = t$2 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const n5 of t4.cssRules)
    e4 += n5.cssText;
  return o$2(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window.trustedTypes;
var r2 = e2 ? e2.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o2$1 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? r2 : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = t3 !== null;
      break;
    case Number:
      s5 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var n2 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l$1 = { attribute: true, type: String, converter: o2$1, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i3;
    (i3 = this.l) !== null && i3 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e4 = this._$Eh(s5, i3);
      e4 !== void 0 && (this._$Eu.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i3 = l$1) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      e4 !== void 0 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$1;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4)
        s5.unshift(S(i4));
    } else
      i3 !== void 0 && s5.push(S(i3));
    return s5;
  }
  static _$Eh(t3, i3) {
    const s5 = i3.attribute;
    return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    ((i3 = this._$Eg) !== null && i3 !== void 0 ? i3 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    (i3 = this._$Eg) === null || i3 === void 0 || i3.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Et.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i3;
      return (i3 = t4.hostConnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i3;
      return (i3 = t4.hostDisconnected) === null || i3 === void 0 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$ES(t3, i3, s5 = l$1) {
    var e4, r4;
    const h3 = this.constructor._$Eh(t3, s5);
    if (h3 !== void 0 && s5.reflect === true) {
      const n5 = ((r4 = (e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== null && r4 !== void 0 ? r4 : o2$1.toAttribute)(i3, s5.type);
      this._$Ei = t3, n5 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n5), this._$Ei = null;
    }
  }
  _$AK(t3, i3) {
    var s5, e4, r4;
    const h3 = this.constructor, n5 = h3._$Eu.get(t3);
    if (n5 !== void 0 && this._$Ei !== n5) {
      const t4 = h3.getPropertyOptions(n5), l4 = t4.converter, a3 = (r4 = (e4 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e4 !== void 0 ? e4 : typeof l4 == "function" ? l4 : null) !== null && r4 !== void 0 ? r4 : o2$1.fromAttribute;
      this._$Ei = n5, this[n5] = a3(i3, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), s5.reflect === true && this._$Ei !== t3 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this._$Et && (this._$Et.forEach((t4, i4) => this[i4] = t4), this._$Et = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostUpdate) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$EU();
    } catch (t4) {
      throw i3 = false, this._$EU(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    (i3 = this._$Eg) === null || i3 === void 0 || i3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostUpdated) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$EC !== void 0 && (this._$EC.forEach((t4, i3) => this._$ES(i3, this[i3], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2$1 = globalThis.trustedTypes;
var s3 = i2$1 ? i2$1.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var e3$1 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + e3$1;
var n3 = `<${o3}>`;
var l2 = document;
var h2 = (t3 = "") => l2.createComment(t3);
var r3 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var d = Array.isArray;
var u = (t3) => {
  var i3;
  return d(t3) || typeof ((i3 = t3) === null || i3 === void 0 ? void 0 : i3[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a2 = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea|title)$/i;
var p = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var $ = p(1);
var b = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var T = /* @__PURE__ */ new WeakMap();
var x = (t3, i3, s5) => {
  var e4, o5;
  const n5 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (l4 === void 0) {
    const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
    n5._$litPart$ = l4 = new N(i3.insertBefore(h2(), t4), t4, void 0, s5 != null ? s5 : {});
  }
  return l4._$AI(t3), l4;
};
var A = l2.createTreeWalker(l2, 129, null, false);
var C = (t3, i3) => {
  const o5 = t3.length - 1, l4 = [];
  let h3, r4 = i3 === 2 ? "<svg>" : "", d2 = c;
  for (let i4 = 0; i4 < o5; i4++) {
    const s5 = t3[i4];
    let o6, u3, p2 = -1, $2 = 0;
    for (; $2 < s5.length && (d2.lastIndex = $2, u3 = d2.exec(s5), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a2 : u3[2] !== void 0 ? (g.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h3 != null ? h3 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o6 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s5 + n3 : p2 >= 0 ? (l4.push(o6), s5.slice(0, p2) + "$lit$" + s5.slice(p2) + e3$1 + y2) : s5 + e3$1 + (p2 === -2 ? (l4.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[o5] || "<?>") + (i3 === 2 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s3 !== void 0 ? s3.createHTML(u2) : u2, l4];
};
var E = class {
  constructor({ strings: t3, _$litType$: s5 }, n5) {
    let l4;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u2 = t3.length - 1, c2 = this.parts, [v2, a3] = C(t3, s5);
    if (this.el = E.createElement(v2, n5), A.currentNode = this.el.content, s5 === 2) {
      const t4 = this.el.content, i3 = t4.firstChild;
      i3.remove(), t4.append(...i3.childNodes);
    }
    for (; (l4 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l4.nodeType === 1) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i3 of l4.getAttributeNames())
            if (i3.endsWith("$lit$") || i3.startsWith(e3$1)) {
              const s6 = a3[d2++];
              if (t4.push(i3), s6 !== void 0) {
                const t5 = l4.getAttribute(s6.toLowerCase() + "$lit$").split(e3$1), i4 = /([.?@])?(.*)/.exec(s6);
                c2.push({ type: 1, index: r4, name: i4[2], strings: t5, ctor: i4[1] === "." ? M : i4[1] === "?" ? H : i4[1] === "@" ? I : S2 });
              } else
                c2.push({ type: 6, index: r4 });
            }
          for (const i3 of t4)
            l4.removeAttribute(i3);
        }
        if (g.test(l4.tagName)) {
          const t4 = l4.textContent.split(e3$1), s6 = t4.length - 1;
          if (s6 > 0) {
            l4.textContent = i2$1 ? i2$1.emptyScript : "";
            for (let i3 = 0; i3 < s6; i3++)
              l4.append(t4[i3], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
            l4.append(t4[s6], h2());
          }
        }
      } else if (l4.nodeType === 8)
        if (l4.data === o3)
          c2.push({ type: 2, index: r4 });
        else {
          let t4 = -1;
          for (; (t4 = l4.data.indexOf(e3$1, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r4 }), t4 += e3$1.length - 1;
        }
      r4++;
    }
  }
  static createElement(t3, i3) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === b)
    return i3;
  let d2 = e4 !== void 0 ? (o5 = s5._$Cl) === null || o5 === void 0 ? void 0 : o5[e4] : s5._$Cu;
  const u2 = r3(i3) ? void 0 : i3._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n5 = d2 == null ? void 0 : d2._$AO) === null || n5 === void 0 || n5.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t3), d2._$AT(t3, s5, e4)), e4 !== void 0 ? ((l4 = (h3 = s5)._$Cl) !== null && l4 !== void 0 ? l4 : h3._$Cl = [])[e4] = d2 : s5._$Cu = d2), d2 !== void 0 && (i3 = P(t3, d2._$AS(t3, i3.values), d2, e4)), i3;
}
var V = class {
  constructor(t3, i3) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = ((i3 = t3 == null ? void 0 : t3.creationScope) !== null && i3 !== void 0 ? i3 : l2).importNode(s5, true);
    A.currentNode = o5;
    let n5 = A.nextNode(), h3 = 0, r4 = 0, d2 = e4[0];
    for (; d2 !== void 0; ) {
      if (h3 === d2.index) {
        let i4;
        d2.type === 2 ? i4 = new N(n5, n5.nextSibling, this, t3) : d2.type === 1 ? i4 = new d2.ctor(n5, d2.name, d2.strings, this, t3) : d2.type === 6 && (i4 = new L(n5, this, t3)), this.v.push(i4), d2 = e4[++r4];
      }
      h3 !== (d2 == null ? void 0 : d2.index) && (n5 = A.nextNode(), h3++);
    }
    return o5;
  }
  m(t3) {
    let i3 = 0;
    for (const s5 of this.v)
      s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N = class {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cg = (o5 = e4 == null ? void 0 : e4.isConnected) === null || o5 === void 0 || o5;
  }
  get _$AU() {
    var t3, i3;
    return (i3 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i3 !== void 0 ? i3 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return i3 !== void 0 && t3.nodeType === 11 && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P(this, t3, i3), r3(t3) ? t3 === w || t3 == null || t3 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t3 !== this._$AH && t3 !== b && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.k(t3) : u(t3) ? this.S(t3) : this.$(t3);
  }
  M(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  k(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.M(t3));
  }
  $(t3) {
    this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.k(l2.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === void 0 && (e4.el = E.createElement(e4.h, this.options)), e4);
    if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o5)
      this._$AH.m(s5);
    else {
      const t4 = new V(o5, this), i4 = t4.p(this.options);
      t4.m(s5), this.k(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T.get(t3.strings);
    return i3 === void 0 && T.set(t3.strings, i3 = new E(t3)), i3;
  }
  S(t3) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i3.length ? i3.push(s5 = new N(this.M(h2()), this.M(h2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    this._$AM === void 0 && (this._$Cg = t3, (i3 = this._$AP) === null || i3 === void 0 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (o5 === void 0)
      t3 = P(this, t3, i3, 0), n5 = !r3(t3) || t3 !== this._$AH && t3 !== b, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P(this, e5[s5 + l4], i3, l4), h3 === b && (h3 = this._$AH[l4]), n5 || (n5 = !r3(h3) || h3 !== this._$AH[l4]), h3 === w ? t3 = w : t3 !== w && (t3 += (h3 != null ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.C(t3);
  }
  C(t3) {
    t3 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t3) {
    this.element[this.name] = t3 === w ? void 0 : t3;
  }
};
var k = i2$1 ? i2$1.emptyScript : "";
var H = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t3) {
    t3 && t3 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = (s5 = P(this, t3, i3, 0)) !== null && s5 !== void 0 ? s5 : w) === b)
      return;
    const e4 = this._$AH, o5 = t3 === w && e4 !== w || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== w && (e4 === w || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    typeof this._$AH == "function" ? this._$AH.call((s5 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var L = class {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P(this, t3);
  }
};
var z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t2 = globalThis.litHtmlVersions) !== null && t2 !== void 0 ? t2 : globalThis.litHtmlVersions = []).push("2.2.4");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = x(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b;
  }
};
s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
n4 == null || n4({ LitElement: s4 });
((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.2.0");
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

// src/styles/component.styles.ts
var component_styles_default = r`
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

// src/internal/slot.ts
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(event) {
    const slot = event.target;
    if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
      this.host.requestUpdate();
    }
  }
};
function getTextContent(slot) {
  if (!slot) {
    return "";
  }
  const nodes = slot.assignedNodes({ flatten: true });
  let text = "";
  [...nodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}

// node_modules/lit-html/directive.js
var t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
var i$1 = class {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directives/class-map.js
var o$1 = e$1(class extends i$1 {
  constructor(t2) {
    var i2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || t2.name !== "class" || ((i2 = t2.strings) === null || i2 === void 0 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s]) {
    var r, o2;
    if (this.et === void 0) {
      this.et = /* @__PURE__ */ new Set(), i2.strings !== void 0 && (this.st = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => t2 !== "")));
      for (const t2 in s)
        s[t2] && !((r = this.st) === null || r === void 0 ? void 0 : r.has(t2)) && this.et.add(t2);
      return this.render(s);
    }
    const e2 = i2.element.classList;
    this.et.forEach((t2) => {
      t2 in s || (e2.remove(t2), this.et.delete(t2));
    });
    for (const t2 in s) {
      const i3 = !!s[t2];
      i3 === this.et.has(t2) || ((o2 = this.st) === null || o2 === void 0 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.et.add(t2)) : (e2.remove(t2), this.et.delete(t2)));
    }
    return b;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n = (n3) => (e4) => typeof e4 == "function" ? ((n4, e5) => (window.customElements.define(n4, e5), e5))(n3, e4) : ((n4, e5) => {
  const { kind: t2, elements: i3 } = e5;
  return { kind: t2, elements: i3, finisher(e6) {
    window.customElements.define(n4, e6);
  } };
})(n3, e4);

// node_modules/@lit/reactive-element/decorators/property.js
var i = (i3, e4) => e4.kind === "method" && e4.descriptor && !("value" in e4.descriptor) ? __spreadProps(__spreadValues({}, e4), { finisher(n3) {
  n3.createProperty(e4.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e4.key, initializer() {
  typeof e4.initializer == "function" && (this[e4.key] = e4.initializer.call(this));
}, finisher(n3) {
  n3.createProperty(e4.key, i3);
} };
function e(e4) {
  return (n3, t2) => t2 !== void 0 ? ((i3, e5, n4) => {
    e5.constructor.createProperty(n4, i3);
  })(e4, n3, t2) : i(e4, n3);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o = ({ finisher: e4, descriptor: t2 }) => (o2, n3) => {
  var r;
  if (n3 === void 0) {
    const n4 = (r = o2.originalKey) !== null && r !== void 0 ? r : o2.key, i3 = t2 != null ? { kind: "method", placement: "prototype", key: n4, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n4 });
    return e4 != null && (i3.finisher = function(t3) {
      e4(t3, n4);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    t2 !== void 0 && Object.defineProperty(o2, n3, t2(n3)), e4 == null || e4(r2, n3);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i2(i3, n3) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n4;
      return (n4 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i3)) !== null && n4 !== void 0 ? n4 : null;
    }, enumerable: true, configurable: true };
    if (n3) {
      const n4 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return this[n4] === void 0 && (this[n4] = (t3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i3)) !== null && t3 !== void 0 ? t3 : null), this[n4];
      };
    }
    return t2;
  } });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath() {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s) => /shoelace(\.min)?\.js($|\?)/.test(s.src));
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "");
}

// src/components/icon/library.default.ts
var library = {
  name: "default",
  resolver: (name) => `${getBasePath()}/assets/icons/${name}.svg`
};
var library_default_default = library;

// src/components/icon/library.system.ts
var icons = {
  "check-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  x: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}

// src/components/include/request.ts
var includeFiles = /* @__PURE__ */ new Map();
function requestInclude(src, mode = "cors") {
  if (includeFiles.has(src)) {
    return includeFiles.get(src);
  }
  const fileDataPromise = fetch(src, { mode }).then(async (response) => {
    return {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}

// src/components/icon/request.ts
var iconFiles = /* @__PURE__ */ new Map();
async function requestIcon(url) {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  }
  const fileData = await requestInclude(url);
  const iconFileData = {
    ok: fileData.ok,
    status: fileData.status,
    svg: null
  };
  if (fileData.ok) {
    const div = document.createElement("div");
    div.innerHTML = fileData.html;
    const svg = div.firstElementChild;
    iconFileData.svg = (svg == null ? void 0 : svg.tagName.toLowerCase()) === "svg" ? svg.outerHTML : "";
  }
  iconFiles.set(url, iconFileData);
  return iconFileData;
}

// src/components/icon/icon.styles.ts
var icon_styles_default = r`
  ${component_styles_default}

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
`;

// node_modules/lit-html/directives/if-defined.js
var l = (l2) => l2 != null ? l2 : w;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/watch.ts
function watch(propName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update } = proto;
    if (propName in proto) {
      const propNameKey = propName;
      proto.update = function(changedProps) {
        if (changedProps.has(propNameKey)) {
          const oldValue = changedProps.get(propNameKey);
          const newValue = this[propNameKey];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
        update.call(this, changedProps);
      };
    }
  };
}

// src/internal/event.ts
function emit(el, name, options) {
  const event = new CustomEvent(name, __spreadValues({
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {}
  }, options));
  el.dispatchEvent(event);
  return event;
}
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// node_modules/lit-html/directives/unsafe-html.js
var e3 = class extends i$1 {
  constructor(i2) {
    if (super(i2), this.it = w, i2.type !== t$1.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === w || r == null)
      return this.ft = void 0, this.it = r;
    if (r === b)
      return r;
    if (typeof r != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it)
      return this.ft;
    this.it = r;
    const s2 = [r];
    return s2.raw = s2, this.ft = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
};
e3.directiveName = "unsafeHTML", e3.resultType = 1;

// node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e3 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o2 = e$1(t3);

// src/components/icon/icon.ts
var parser;
var SlIcon = class extends s4 {
  constructor() {
    super(...arguments);
    this.svg = "";
    this.label = "";
    this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }
  redraw() {
    this.setIcon();
  }
  async setIcon() {
    var _a;
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!parser) {
      parser = new DOMParser();
    }
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (svgEl !== null) {
            (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, svgEl);
            this.svg = svgEl.outerHTML;
            emit(this, "sl-load");
          } else {
            this.svg = "";
            emit(this, "sl-error");
          }
        } else {
          this.svg = "";
          emit(this, "sl-error");
        }
      } catch (e4) {
        emit(this, "sl-error");
      }
    } else if (this.svg.length > 0) {
      this.svg = "";
    }
  }
  handleChange() {
    this.setIcon();
  }
  render() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    return $` <div
      part="base"
      class="icon"
      role=${l(hasLabel ? "img" : void 0)}
      aria-label=${l(hasLabel ? this.label : void 0)}
      aria-hidden=${l(hasLabel ? void 0 : "true")}
    >
      ${o2(this.svg)}
    </div>`;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  t()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  e({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  e()
], SlIcon.prototype, "src", 2);
__decorateClass([
  e()
], SlIcon.prototype, "label", 2);
__decorateClass([
  e({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("name"),
  watch("src"),
  watch("library")
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass([
  n("sl-icon")
], SlIcon);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

export { $, HasSlotController as H, __decorateClass as _, setBasePath as a, waitForEvent as b, component_styles_default as c, emit as d, e, e$1 as f, i$1 as g, t$1 as h, i2 as i, b as j, w as k, l, __spreadProps as m, n, o$1 as o, __spreadValues as p, o$2 as q, r, s4 as s, t, __objRest as u, getTextContent as v, watch as w };
