'use strict';

const chunk_GP3HCHHG = require('./chunk.GP3HCHHG-fdad49b5.js');
const chunk_KO3SJXDW = require('./chunk.KO3SJXDW-0d70a765.js');

// src/components/tooltip/tooltip.styles.ts
var tooltip_styles_default = chunk_GP3HCHHG.r`
  ${chunk_GP3HCHHG.component_styles_default}

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
`;

// node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t(t2) {
  return t2.split("-")[0];
}
function e(t2) {
  return t2.split("-")[1];
}
function n(e2) {
  return ["top", "bottom"].includes(t(e2)) ? "x" : "y";
}
function r(t2) {
  return t2 === "y" ? "height" : "width";
}
function i(i3, o3, a3) {
  let { reference: l3, floating: s3 } = i3;
  const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u3 = n(o3), m3 = r(u3), g3 = l3[m3] / 2 - s3[m3] / 2, d3 = u3 === "x";
  let p3;
  switch (t(o3)) {
    case "top":
      p3 = { x: c3, y: l3.y - s3.height };
      break;
    case "bottom":
      p3 = { x: c3, y: l3.y + l3.height };
      break;
    case "right":
      p3 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p3 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p3 = { x: l3.x, y: l3.y };
  }
  switch (e(o3)) {
    case "start":
      p3[u3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p3[u3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p3;
}
var o = async (t2, e2, n3) => {
  const { placement: r3 = "bottom", strategy: o3 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = await (l3.isRTL == null ? void 0 : l3.isRTL(e2));
  let c3 = await l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }), { x: f3, y: u3 } = i(c3, r3, s3), m3 = r3, g3 = {};
  for (let n4 = 0; n4 < a3.length; n4++) {
    const { name: d3, fn: p3 } = a3[n4], { x: h3, y: y3, data: x3, reset: w3 } = await p3({ x: f3, y: u3, initialPlacement: r3, placement: m3, strategy: o3, middlewareData: g3, rects: c3, platform: l3, elements: { reference: t2, floating: e2 } });
    f3 = h3 != null ? h3 : f3, u3 = y3 != null ? y3 : u3, g3 = chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, g3), { [d3]: chunk_GP3HCHHG.__spreadValues(chunk_GP3HCHHG.__spreadValues({}, g3[d3]), x3) }), w3 && (typeof w3 == "object" && (w3.placement && (m3 = w3.placement), w3.rects && (c3 = w3.rects === true ? await l3.getElementRects({ reference: t2, floating: e2, strategy: o3 }) : w3.rects), { x: f3, y: u3 } = i(c3, m3, s3)), n4 = -1);
  }
  return { x: f3, y: u3, placement: m3, strategy: o3, middlewareData: g3 };
};
function a(t2) {
  return typeof t2 != "number" ? function(t3) {
    return chunk_GP3HCHHG.__spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l(t2) {
  return chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
async function s(t2, e2) {
  var n3;
  e2 === void 0 && (e2 = {});
  const { x: r3, y: i3, platform: o3, rects: s3, elements: c3, strategy: f3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d3 = false, padding: p3 = 0 } = e2, h3 = a(p3), y3 = c3[d3 ? g3 === "floating" ? "reference" : "floating" : g3], x3 = l(await o3.getClippingRect({ element: (n3 = await (o3.isElement == null ? void 0 : o3.isElement(y3))) == null || n3 ? y3 : y3.contextElement || await (o3.getDocumentElement == null ? void 0 : o3.getDocumentElement(c3.floating)), boundary: u3, rootBoundary: m3, strategy: f3 })), w3 = l(o3.convertOffsetParentRelativeRectToViewportRelativeRect ? await o3.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: g3 === "floating" ? chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, s3.floating), { x: r3, y: i3 }) : s3.reference, offsetParent: await (o3.getOffsetParent == null ? void 0 : o3.getOffsetParent(c3.floating)), strategy: f3 }) : s3[g3]);
  return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
}
var c = Math.min;
var f = Math.max;
function u(t2, e2, n3) {
  return f(t2, c(e2, n3));
}
var m = (t2) => ({ name: "arrow", options: t2, async fn(i3) {
  const { element: o3, padding: l3 = 0 } = t2 != null ? t2 : {}, { x: s3, y: c3, placement: f3, rects: m3, platform: g3 } = i3;
  if (o3 == null)
    return {};
  const d3 = a(l3), p3 = { x: s3, y: c3 }, h3 = n(f3), y3 = e(f3), x3 = r(h3), w3 = await g3.getDimensions(o3), v3 = h3 === "y" ? "top" : "left", b3 = h3 === "y" ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A = p3[h3] - m3.reference[h3], P2 = await (g3.getOffsetParent == null ? void 0 : g3.getOffsetParent(o3));
  let T3 = P2 ? h3 === "y" ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
  T3 === 0 && (T3 = m3.floating[x3]);
  const O2 = R2 / 2 - A / 2, D3 = d3[v3], L3 = T3 - w3[x3] - d3[b3], k2 = T3 / 2 - w3[x3] / 2 + O2, E3 = u(D3, k2, L3), C2 = (y3 === "start" ? d3[v3] : d3[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
  return { [h3]: p3[h3] - (C2 ? k2 < D3 ? D3 - k2 : L3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
} });
var g = { left: "right", right: "left", bottom: "top", top: "bottom" };
function d(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => g[t3]);
}
function p(t2, i3, o3) {
  o3 === void 0 && (o3 = false);
  const a3 = e(t2), l3 = n(t2), s3 = r(l3);
  let c3 = l3 === "x" ? a3 === (o3 ? "end" : "start") ? "right" : "left" : a3 === "start" ? "bottom" : "top";
  return i3.reference[s3] > i3.floating[s3] && (c3 = d(c3)), { main: c3, cross: d(c3) };
}
var h = { start: "end", end: "start" };
function y(t2) {
  return t2.replace(/start|end/g, (t3) => h[t3]);
}
var x = ["top", "right", "bottom", "left"];
x.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
var b = function(e2) {
  return e2 === void 0 && (e2 = {}), { name: "flip", options: e2, async fn(n3) {
    var r3;
    const { placement: i3, middlewareData: o3, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n3, _a = e2, { mainAxis: u3 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true } = _a, w3 = chunk_GP3HCHHG.__objRest(_a, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v3 = t(i3), b3 = g3 || (v3 === l3 || !x3 ? [d(l3)] : function(t2) {
      const e3 = d(t2);
      return [y(t2), e3, y(e3)];
    }(l3)), R2 = [l3, ...b3], A = await s(n3, w3), P2 = [];
    let T3 = ((r3 = o3.flip) == null ? void 0 : r3.overflows) || [];
    if (u3 && P2.push(A[v3]), m3) {
      const { main: t2, cross: e3 } = p(i3, a3, await (c3.isRTL == null ? void 0 : c3.isRTL(f3.floating)));
      P2.push(A[t2], A[e3]);
    }
    if (T3 = [...T3, { placement: i3, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
      var O2, D3;
      const t2 = ((O2 = (D3 = o3.flip) == null ? void 0 : D3.index) != null ? O2 : 0) + 1, e3 = R2[t2];
      if (e3)
        return { data: { index: t2, overflows: T3 }, reset: { placement: e3 } };
      let n4 = "bottom";
      switch (h3) {
        case "bestFit": {
          var L3;
          const t3 = (L3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) == null ? void 0 : L3[0].placement;
          t3 && (n4 = t3);
          break;
        }
        case "initialPlacement":
          n4 = l3;
      }
      if (i3 !== n4)
        return { reset: { placement: n4 } };
    }
    return {};
  } };
};
var T = function(r3) {
  return r3 === void 0 && (r3 = 0), { name: "offset", options: r3, async fn(i3) {
    const { x: o3, y: a3 } = i3, l3 = await async function(r4, i4) {
      const { placement: o4, platform: a4, elements: l4 } = r4, s3 = await (a4.isRTL == null ? void 0 : a4.isRTL(l4.floating)), c3 = t(o4), f3 = e(o4), u3 = n(o4) === "x", m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s3 && u3 ? -1 : 1, d3 = typeof i4 == "function" ? i4(r4) : i4;
      let { mainAxis: p3, crossAxis: h3, alignmentAxis: y3 } = typeof d3 == "number" ? { mainAxis: d3, crossAxis: 0, alignmentAxis: null } : chunk_GP3HCHHG.__spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d3);
      return f3 && typeof y3 == "number" && (h3 = f3 === "end" ? -1 * y3 : y3), u3 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
    }(i3, r3);
    return { x: o3 + l3.x, y: a3 + l3.y, data: l3 };
  } };
};
function O(t2) {
  return t2 === "x" ? "y" : "x";
}
var D = function(e2) {
  return e2 === void 0 && (e2 = {}), { name: "shift", options: e2, async fn(r3) {
    const { x: i3, y: o3, placement: a3 } = r3, _a = e2, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
      let { x: e3, y: n3 } = t2;
      return { x: e3, y: n3 };
    } } } = _a, m3 = chunk_GP3HCHHG.__objRest(_a, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i3, y: o3 }, d3 = await s(r3, m3), p3 = n(t(a3)), h3 = O(p3);
    let y3 = g3[p3], x3 = g3[h3];
    if (l3) {
      const t2 = p3 === "y" ? "bottom" : "right";
      y3 = u(y3 + d3[p3 === "y" ? "top" : "left"], y3, y3 - d3[t2]);
    }
    if (c3) {
      const t2 = h3 === "y" ? "bottom" : "right";
      x3 = u(x3 + d3[h3 === "y" ? "top" : "left"], x3, x3 - d3[t2]);
    }
    const w3 = f3.fn(chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, r3), { [p3]: y3, [h3]: x3 }));
    return chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, w3), { data: { x: w3.x - i3, y: w3.y - o3 } });
  } };
};
var k = function(n3) {
  return n3 === void 0 && (n3 = {}), { name: "size", options: n3, async fn(r3) {
    const { placement: i3, rects: o3, platform: a3, elements: l3 } = r3, _a = n3, { apply: c3 } = _a, u3 = chunk_GP3HCHHG.__objRest(_a, ["apply"]), m3 = await s(r3, u3), g3 = t(i3), d3 = e(i3);
    let p3, h3;
    g3 === "top" || g3 === "bottom" ? (p3 = g3, h3 = d3 === (await (a3.isRTL == null ? void 0 : a3.isRTL(l3.floating)) ? "start" : "end") ? "left" : "right") : (h3 = g3, p3 = d3 === "end" ? "top" : "bottom");
    const y3 = f(m3.left, 0), x3 = f(m3.right, 0), w3 = f(m3.top, 0), v3 = f(m3.bottom, 0), b3 = { availableHeight: o3.floating.height - (["left", "right"].includes(i3) ? 2 * (w3 !== 0 || v3 !== 0 ? w3 + v3 : f(m3.top, m3.bottom)) : m3[p3]), availableWidth: o3.floating.width - (["top", "bottom"].includes(i3) ? 2 * (y3 !== 0 || x3 !== 0 ? y3 + x3 : f(m3.left, m3.right)) : m3[h3]) }, R2 = await a3.getDimensions(l3.floating);
    c3 == null || c3(chunk_GP3HCHHG.__spreadValues(chunk_GP3HCHHG.__spreadValues({}, r3), b3));
    const A = await a3.getDimensions(l3.floating);
    return R2.width !== A.width || R2.height !== A.height ? { reset: { rects: true } } : {};
  } };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n2(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o2(t2) {
  if (t2 == null)
    return window;
  if (!n2(t2)) {
    const e2 = t2.ownerDocument;
    return e2 && e2.defaultView || window;
  }
  return t2;
}
function i2(t2) {
  return o2(t2).getComputedStyle(t2);
}
function r2(t2) {
  return n2(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l2() {
  const t2 = navigator.userAgentData;
  return t2 != null && t2.brands ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
}
function c2(t2) {
  return t2 instanceof o2(t2).HTMLElement;
}
function f2(t2) {
  return t2 instanceof o2(t2).Element;
}
function s2(t2) {
  if (typeof ShadowRoot == "undefined")
    return false;
  return t2 instanceof o2(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u2(t2) {
  const { overflow: e2, overflowX: n3, overflowY: o3 } = i2(t2);
  return /auto|scroll|overlay|hidden/.test(e2 + o3 + n3);
}
function d2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function h2(t2) {
  const e2 = /firefox/i.test(l2()), n3 = i2(t2);
  return n3.transform !== "none" || n3.perspective !== "none" || n3.contain === "paint" || ["transform", "perspective"].includes(n3.willChange) || e2 && n3.willChange === "filter" || e2 && !!n3.filter && n3.filter !== "none";
}
function a2() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
var g2 = Math.min;
var p2 = Math.max;
var m2 = Math.round;
function w2(t2, e2, n3) {
  var i3, r3, l3, s3;
  e2 === void 0 && (e2 = false), n3 === void 0 && (n3 = false);
  const u3 = t2.getBoundingClientRect();
  let d3 = 1, h3 = 1;
  e2 && c2(t2) && (d3 = t2.offsetWidth > 0 && m2(u3.width) / t2.offsetWidth || 1, h3 = t2.offsetHeight > 0 && m2(u3.height) / t2.offsetHeight || 1);
  const g3 = f2(t2) ? o2(t2) : window, p3 = !a2() && n3, w3 = (u3.left + (p3 && (i3 = (r3 = g3.visualViewport) == null ? void 0 : r3.offsetLeft) != null ? i3 : 0)) / d3, v3 = (u3.top + (p3 && (l3 = (s3 = g3.visualViewport) == null ? void 0 : s3.offsetTop) != null ? l3 : 0)) / h3, y3 = u3.width / d3, x3 = u3.height / h3;
  return { width: y3, height: x3, top: v3, right: w3 + y3, bottom: v3 + x3, left: w3, x: w3, y: v3 };
}
function v2(t2) {
  return (e2 = t2, (e2 instanceof o2(e2).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e2;
}
function y2(t2) {
  return f2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function x2(t2) {
  return w2(v2(t2)).left + y2(t2).scrollLeft;
}
function b2(t2, e2, n3) {
  const o3 = c2(e2), i3 = v2(e2), l3 = w2(t2, o3 && function(t3) {
    const e3 = w2(t3);
    return m2(e3.width) !== t3.offsetWidth || m2(e3.height) !== t3.offsetHeight;
  }(e2), n3 === "fixed");
  let f3 = { scrollLeft: 0, scrollTop: 0 };
  const s3 = { x: 0, y: 0 };
  if (o3 || !o3 && n3 !== "fixed")
    if ((r2(e2) !== "body" || u2(i3)) && (f3 = y2(e2)), c2(e2)) {
      const t3 = w2(e2, true);
      s3.x = t3.x + e2.clientLeft, s3.y = t3.y + e2.clientTop;
    } else
      i3 && (s3.x = x2(i3));
  return { x: l3.left + f3.scrollLeft - s3.x, y: l3.top + f3.scrollTop - s3.y, width: l3.width, height: l3.height };
}
function L2(t2) {
  return r2(t2) === "html" ? t2 : t2.assignedSlot || t2.parentNode || (s2(t2) ? t2.host : null) || v2(t2);
}
function R(t2) {
  return c2(t2) && getComputedStyle(t2).position !== "fixed" ? t2.offsetParent : null;
}
function T2(t2) {
  const e2 = o2(t2);
  let n3 = R(t2);
  for (; n3 && d2(n3) && getComputedStyle(n3).position === "static"; )
    n3 = R(n3);
  return n3 && (r2(n3) === "html" || r2(n3) === "body" && getComputedStyle(n3).position === "static" && !h2(n3)) ? e2 : n3 || function(t3) {
    let e3 = L2(t3);
    for (s2(e3) && (e3 = e3.host); c2(e3) && !["html", "body"].includes(r2(e3)); ) {
      if (h2(e3))
        return e3;
      e3 = e3.parentNode;
    }
    return null;
  }(t2) || e2;
}
function W(t2) {
  if (c2(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e2 = w2(t2);
  return { width: e2.width, height: e2.height };
}
function E2(t2) {
  const e2 = L2(t2);
  return ["html", "body", "#document"].includes(r2(e2)) ? t2.ownerDocument.body : c2(e2) && u2(e2) ? e2 : E2(e2);
}
function H(t2, e2) {
  var n3;
  e2 === void 0 && (e2 = []);
  const i3 = E2(t2), r3 = i3 === ((n3 = t2.ownerDocument) == null ? void 0 : n3.body), l3 = o2(i3), c3 = r3 ? [l3].concat(l3.visualViewport || [], u2(i3) ? i3 : []) : i3, f3 = e2.concat(c3);
  return r3 ? f3 : f3.concat(H(c3));
}
function C(e2, n3, r3) {
  return n3 === "viewport" ? l(function(t2, e3) {
    const n4 = o2(t2), i3 = v2(t2), r4 = n4.visualViewport;
    let l3 = i3.clientWidth, c3 = i3.clientHeight, f3 = 0, s3 = 0;
    if (r4) {
      l3 = r4.width, c3 = r4.height;
      const t3 = a2();
      (t3 || !t3 && e3 === "fixed") && (f3 = r4.offsetLeft, s3 = r4.offsetTop);
    }
    return { width: l3, height: c3, x: f3, y: s3 };
  }(e2, r3)) : f2(n3) ? function(t2, e3) {
    const n4 = w2(t2, false, e3 === "fixed"), o3 = n4.top + t2.clientTop, i3 = n4.left + t2.clientLeft;
    return { top: o3, left: i3, x: i3, y: o3, right: i3 + t2.clientWidth, bottom: o3 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n3, r3) : l(function(t2) {
    var e3;
    const n4 = v2(t2), o3 = y2(t2), r4 = (e3 = t2.ownerDocument) == null ? void 0 : e3.body, l3 = p2(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let f3 = -o3.scrollLeft + x2(t2);
    const s3 = -o3.scrollTop;
    return i2(r4 || n4).direction === "rtl" && (f3 += p2(n4.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: f3, y: s3 };
  }(v2(e2)));
}
function S(t2) {
  const e2 = H(t2), n3 = ["absolute", "fixed"].includes(i2(t2).position) && c2(t2) ? T2(t2) : t2;
  return f2(n3) ? e2.filter((t3) => f2(t3) && function(t4, e3) {
    const n4 = e3.getRootNode == null ? void 0 : e3.getRootNode();
    if (t4.contains(e3))
      return true;
    if (n4 && s2(n4)) {
      let n5 = e3;
      do {
        if (n5 && t4 === n5)
          return true;
        n5 = n5.parentNode || n5.host;
      } while (n5);
    }
    return false;
  }(t3, n3) && r2(t3) !== "body") : [];
}
var D2 = { getClippingRect: function(t2) {
  let { element: e2, boundary: n3, rootBoundary: o3, strategy: i3 } = t2;
  const r3 = [...n3 === "clippingAncestors" ? S(e2) : [].concat(n3), o3], l3 = r3[0], c3 = r3.reduce((t3, n4) => {
    const o4 = C(e2, n4, i3);
    return t3.top = p2(o4.top, t3.top), t3.right = g2(o4.right, t3.right), t3.bottom = g2(o4.bottom, t3.bottom), t3.left = p2(o4.left, t3.left), t3;
  }, C(e2, l3, i3));
  return { width: c3.right - c3.left, height: c3.bottom - c3.top, x: c3.left, y: c3.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n3, strategy: o3 } = t2;
  const i3 = c2(n3), l3 = v2(n3);
  if (n3 === l3)
    return e2;
  let f3 = { scrollLeft: 0, scrollTop: 0 };
  const s3 = { x: 0, y: 0 };
  if ((i3 || !i3 && o3 !== "fixed") && ((r2(n3) !== "body" || u2(l3)) && (f3 = y2(n3)), c2(n3))) {
    const t3 = w2(n3, true);
    s3.x = t3.x + n3.clientLeft, s3.y = t3.y + n3.clientTop;
  }
  return chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, e2), { x: e2.x - f3.scrollLeft + s3.x, y: e2.y - f3.scrollTop + s3.y });
}, isElement: f2, getDimensions: W, getOffsetParent: T2, getDocumentElement: v2, getElementRects: (t2) => {
  let { reference: e2, floating: n3, strategy: o3 } = t2;
  return { reference: b2(e2, T2(n3), o3), floating: chunk_GP3HCHHG.__spreadProps(chunk_GP3HCHHG.__spreadValues({}, W(n3)), { x: 0, y: 0 }) };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => i2(t2).direction === "rtl" };
function N(t2, e2, n3, o3) {
  o3 === void 0 && (o3 = {});
  const { ancestorScroll: i3 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o3, s3 = i3 && !c3, u3 = r3 && !c3, d3 = s3 || u3 ? [...f2(t2) ? H(t2) : [], ...H(e2)] : [];
  d3.forEach((t3) => {
    s3 && t3.addEventListener("scroll", n3, { passive: true }), u3 && t3.addEventListener("resize", n3);
  });
  let h3, a3 = null;
  l3 && (a3 = new ResizeObserver(n3), f2(t2) && !c3 && a3.observe(t2), a3.observe(e2));
  let g3 = c3 ? w2(t2) : null;
  return c3 && function e3() {
    const o4 = w2(t2);
    !g3 || o4.x === g3.x && o4.y === g3.y && o4.width === g3.width && o4.height === g3.height || n3();
    g3 = o4, h3 = requestAnimationFrame(e3);
  }(), l3 || n3(), () => {
    var t3;
    d3.forEach((t4) => {
      s3 && t4.removeEventListener("scroll", n3), u3 && t4.removeEventListener("resize", n3);
    }), (t3 = a3) == null || t3.disconnect(), a3 = null, c3 && cancelAnimationFrame(h3);
  };
}
var z = (t2, n3, o3) => o(t2, n3, chunk_GP3HCHHG.__spreadValues({ platform: D2 }, o3));

// src/components/tooltip/tooltip.ts
var SlTooltip = class extends chunk_GP3HCHHG.s4 {
  constructor() {
    super(...arguments);
    this.localize = new chunk_KO3SJXDW.LocalizeController2(this);
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 10;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateComplete.then(() => {
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
      this.target = this.getTarget();
    });
  }
  async firstUpdated() {
    this.tooltip.hidden = !this.open;
    if (this.open) {
      await this.updateComplete;
      this.updatePositioner();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("blur", this.handleBlur, true);
    this.removeEventListener("focus", this.handleFocus, true);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseout", this.handleMouseOut);
    this.stopPositioner();
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return chunk_GP3HCHHG.waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return chunk_GP3HCHHG.waitForEvent(this, "sl-after-hide");
  }
  getTarget() {
    const target = [...this.children].find((el) => el.tagName.toLowerCase() !== "style" && el.getAttribute("slot") !== "content");
    if (!target) {
      throw new Error("Invalid tooltip target: no child element was found.");
    }
    return target;
  }
  handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }
  handleClick() {
    if (this.hasTrigger("click")) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  }
  handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }
  handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = chunk_KO3SJXDW.parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => void this.show(), delay);
    }
  }
  handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = chunk_KO3SJXDW.parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => void this.hide(), delay);
    }
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      chunk_GP3HCHHG.emit(this, "sl-show");
      await chunk_KO3SJXDW.stopAnimations(this.tooltip);
      this.startPositioner();
      this.tooltip.hidden = false;
      const { keyframes, options } = chunk_KO3SJXDW.getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
      await chunk_KO3SJXDW.animateTo(this.tooltip, keyframes, options);
      chunk_GP3HCHHG.emit(this, "sl-after-show");
    } else {
      chunk_GP3HCHHG.emit(this, "sl-hide");
      await chunk_KO3SJXDW.stopAnimations(this.tooltip);
      const { keyframes, options } = chunk_KO3SJXDW.getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
      await chunk_KO3SJXDW.animateTo(this.tooltip, keyframes, options);
      this.tooltip.hidden = true;
      this.stopPositioner();
      chunk_GP3HCHHG.emit(this, "sl-after-hide");
    }
  }
  handleOptionsChange() {
    this.updatePositioner();
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  startPositioner() {
    this.stopPositioner();
    this.updatePositioner();
    this.positionerCleanup = N(this.target, this.positioner, this.updatePositioner.bind(this));
  }
  updatePositioner() {
    if (!this.open || !this.target || !this.positioner) {
      return;
    }
    z(this.target, this.positioner, {
      placement: this.placement,
      middleware: [
        T({ mainAxis: this.distance, crossAxis: this.skidding }),
        b(),
        D(),
        m({
          element: this.arrow,
          padding: 10
        })
      ],
      strategy: this.hoist ? "fixed" : "absolute"
    }).then(({ x, y, middlewareData, placement }) => {
      const arrowX = middlewareData.arrow.x;
      const arrowY = middlewareData.arrow.y;
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.positioner.setAttribute("data-placement", placement);
      Object.assign(this.positioner.style, {
        position: this.hoist ? "fixed" : "absolute",
        left: `${x}px`,
        top: `${y}px`
      });
      Object.assign(this.arrow.style, {
        left: typeof arrowX === "number" ? `${arrowX}px` : "",
        top: typeof arrowY === "number" ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "calc(var(--sl-tooltip-arrow-size) * -1)"
      });
    });
  }
  stopPositioner() {
    if (this.positionerCleanup) {
      this.positionerCleanup();
      this.positionerCleanup = void 0;
      this.positioner.removeAttribute("data-placement");
    }
  }
  render() {
    return chunk_GP3HCHHG.$`
      <div class="tooltip-target" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${chunk_GP3HCHHG.o({
      tooltip: true,
      "tooltip--open": this.open
    })}
          role="tooltip"
          aria-hidden=${this.open ? "false" : "true"}
        >
          <div class="tooltip__arrow"></div>
          <div class="tooltip__content" aria-live=${this.open ? "polite" : "off"}>
            <slot name="content"> ${this.content} </slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.i2(".tooltip-positioner")
], SlTooltip.prototype, "positioner", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.i2(".tooltip")
], SlTooltip.prototype, "tooltip", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.i2(".tooltip__arrow")
], SlTooltip.prototype, "arrow", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e()
], SlTooltip.prototype, "content", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e()
], SlTooltip.prototype, "placement", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e({ type: Number })
], SlTooltip.prototype, "distance", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e({ type: Number })
], SlTooltip.prototype, "skidding", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e()
], SlTooltip.prototype, "trigger", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.e({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.watch("content"),
  chunk_GP3HCHHG.watch("distance"),
  chunk_GP3HCHHG.watch("hoist"),
  chunk_GP3HCHHG.watch("placement"),
  chunk_GP3HCHHG.watch("skidding")
], SlTooltip.prototype, "handleOptionsChange", 1);
chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
SlTooltip = chunk_GP3HCHHG.__decorateClass([
  chunk_GP3HCHHG.n("sl-tooltip")
], SlTooltip);
chunk_KO3SJXDW.setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 150, easing: "ease" }
});
chunk_KO3SJXDW.setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 150, easing: "ease" }
});

exports.D = D;
exports.N = N;
exports.T = T;
exports.b = b;
exports.k = k;
exports.z = z;
