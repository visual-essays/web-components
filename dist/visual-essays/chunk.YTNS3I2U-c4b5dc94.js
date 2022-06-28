import { j as o$1, $, y } from './chunk.GP3HCHHG-12935597.js';

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
var u = s(y);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

export { focusVisibleSelector as f, hasFocusVisible as h, l, n };
