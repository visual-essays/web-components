import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-e29ebc89.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.15.2 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-7cd9cf71.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["ve-header",[[1,"ve-header",{"label":[1],"background":[1],"subtitle":[1],"options":[1],"height":[2],"sticky":[4],"position":[1],"contact":[1],"searchDomain":[1,"search-domain"],"searchFilters":[1,"search-filters"],"searchCx":[1,"search-cx"],"imageOptions":[32],"navItems":[32],"_manifest":[32],"_imageInfo":[32],"_imgUrl":[32]}]]],["ve-footer",[[0,"ve-footer",{"sticky":[4],"contact":[1]}]]],["ve-image",[[1,"ve-image",{"src":[1],"seq":[2],"options":[1],"fit":[1],"alt":[1537],"entities":[1],"user":[1537],"path":[1537],"compare":[1537],"width":[1],"height":[1],"align":[1],"authToken":[1,"auth-token"],"annoBase":[1,"anno-base"],"shoelace":[4],"sticky":[4],"_viewer":[32],"_viewportBounds":[32],"_entities":[32],"_annotator":[32],"_showAnnotations":[32],"_showMenu":[32],"_annoTarget":[32],"_infoPanelIsOpen":[32],"_annotatorWindow":[32],"_zoomedIn":[32],"_tileSources":[32],"_images":[32],"_selectedIdx":[32],"_current":[32],"_annotations":[32]}]]],["ve-anno",[[1,"ve-anno"]]],["ve-card",[[1,"ve-card",{"entities":[1],"manifest":[1],"label":[1],"_manifest":[32],"description":[32]}]]],["ve-entities",[[1,"ve-entities",{"entities":[1]}]]],["ve-image-grid",[[1,"ve-image-grid",{"manifests":[32]}]]],["ve-meta",[[0,"ve-meta",{"title":[1],"description":[1]}]]],["ve-style",[[0,"ve-style",{"layout":[1],"theme":[1]}]]],["ve-manifest",[[1,"ve-manifest",{"src":[1],"images":[1537],"depicts":[1040],"condensed":[4],"_images":[32]}]]],["ve-search",[[1,"ve-search",{"cx":[1],"filters":[1],"icon":[4],"tooltip":[1],"animationLength":[1,"animation-length"],"parentComponent":[1,"parent-component"],"API":[32],"DOMAIN":[32],"SEARCH_QUOTA_EXCEEDED_MESSAGE":[32],"NO_RESULTS_MESSAGE":[32],"RESULTS_PER_PAGE":[32],"TAG_NAME":[32],"query":[32],"items":[32],"error":[32],"search":[32],"previousStart":[32],"activeFilter":[32],"showSearchBarWidth":[32],"filtersObject":[32]},[[8,"click","handleClick"]]]]],["ve-wikidata-search",[[1,"ve-wikidata-search",{"language":[1],"wdResults":[32],"autocompleteResults":[32],"autocompleteDropdownArrow":[32],"autocompleteContainer":[32],"autocompleteInput":[32],"isSearching":[32],"searchContinue":[32],"searchFor":[32],"debounce":[32],"dropdownIsOpen":[32]}]]],["ve-depicts",[[1,"ve-depicts",{"manifest":[1],"depicted":[1040],"format":[1],"editable":[4],"_manifest":[32],"entityData":[32],"entityDataInSync":[32],"imageHash":[32],"refresh":[64],"edit":[64]}]]],["ve-depicts-dialog",[[1,"ve-depicts-dialog",{"show":[1540],"depicted":[1040],"label":[1],"summary":[1],"thumbnail":[1],"imageHash":[1,"image-hash"],"source":[1],"sourceId":[1,"source-id"],"dialog":[32],"_depicted":[32]},[[0,"entitySelected","onEntitySelected"],[0,"prominentToggled","onProminentToggled"],[0,"droToggled","onDroToggled"],[0,"entityRemoved","onEntityRemoved"]]]]],["ve-contact",[[1,"ve-contact",{"contact":[1],"show":[1540],"contactDialog":[32],"from":[32],"emailAlert":[32],"message":[32],"noMessageAlert":[32]}]]]], options);
});
