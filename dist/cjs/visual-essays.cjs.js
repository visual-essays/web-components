'use strict';

const index = require('./index-5f005592.js');

/*
 Stencil Client Patch Browser v2.15.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('visual-essays.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["ve-footer.cjs",[[0,"ve-footer",{"sticky":[4],"contact":[1]}]]],["ve-image.cjs",[[1,"ve-image",{"src":[1],"seq":[2],"options":[1],"fit":[1],"alt":[1537],"entities":[1],"user":[1537],"path":[1537],"compare":[1537],"width":[1],"height":[1],"align":[1],"authToken":[1,"auth-token"],"annoBase":[1,"anno-base"],"shoelace":[4],"sticky":[4],"_viewer":[32],"_viewportBounds":[32],"_entities":[32],"_annotator":[32],"_showAnnotations":[32],"_showMenu":[32],"_annoTarget":[32],"_infoPanelIsOpen":[32],"_annotatorWindow":[32],"_zoomedIn":[32],"_tileSources":[32],"_images":[32],"_selectedIdx":[32],"_current":[32],"_annotations":[32]}]]],["ve-anno.cjs",[[1,"ve-anno"]]],["ve-card.cjs",[[1,"ve-card",{"entities":[1],"manifest":[1],"label":[1],"_manifest":[32],"description":[32]}]]],["ve-entities.cjs",[[1,"ve-entities",{"entities":[1]}]]],["ve-image-grid.cjs",[[1,"ve-image-grid",{"manifests":[32]}]]],["ve-meta.cjs",[[0,"ve-meta",{"title":[1],"description":[1]}]]],["ve-style.cjs",[[0,"ve-style",{"layout":[1],"theme":[1]}]]],["ve-manifest.cjs",[[1,"ve-manifest",{"src":[1],"images":[1537],"depicts":[1040],"condensed":[4],"_images":[32]}]]],["ve-wikidata-search.cjs",[[1,"ve-wikidata-search",{"language":[1],"wdResults":[32],"autocompleteResults":[32],"autocompleteDropdownArrow":[32],"autocompleteContainer":[32],"autocompleteInput":[32],"isSearching":[32],"searchContinue":[32],"searchFor":[32],"debounce":[32],"dropdownIsOpen":[32]}]]],["ve-depicts.cjs",[[1,"ve-depicts",{"manifest":[1],"depicted":[1040],"format":[1],"editable":[4],"_manifest":[32],"entityData":[32],"entityDataInSync":[32],"imageHash":[32],"refresh":[64],"edit":[64]}]]],["ve-depicts-dialog.cjs",[[1,"ve-depicts-dialog",{"show":[1540],"depicted":[1040],"label":[1],"summary":[1],"thumbnail":[1],"imageHash":[1,"image-hash"],"source":[1],"sourceId":[1,"source-id"],"dialog":[32],"_depicted":[32]},[[0,"entitySelected","onEntitySelected"],[0,"prominentToggled","onProminentToggled"],[0,"droToggled","onDroToggled"],[0,"entityRemoved","onEntityRemoved"]]]]],["ve-contact_3.cjs",[[1,"ve-header",{"label":[1],"background":[1],"subtitle":[1],"options":[1],"height":[2],"sticky":[4],"position":[1],"contact":[1],"imageOptions":[32],"navItems":[32],"_manifest":[32],"_imageInfo":[32],"_imgUrl":[32]}],[1,"ve-search",{"cx":[1],"filters":[1],"icon":[4],"tooltip":[1],"API":[32],"DOMAIN":[32],"SEARCH_QUOTA_EXCEEDED_MESSAGE":[32],"NO_RESULTS_MESSAGE":[32],"RESULTS_PER_PAGE":[32],"query":[32],"items":[32],"error":[32],"search":[32],"previousStart":[32],"activeFilter":[32],"filtersObject":[32]}],[1,"ve-contact",{"contact":[1],"show":[1540],"contactDialog":[32],"from":[32],"emailAlert":[32],"message":[32],"noMessageAlert":[32]}]]]], options);
});
