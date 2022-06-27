import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { o as openseadragon } from './openseadragon.js';
import { o as openseadragonAnnotorious_min } from './openseadragon-annotorious.min.js';

const veAnnoCss = ":host{font-family:Roboto, sans-serif}.r6o-editor{top:0;left:0;margin-left:-19px}.a9s-annotationlayer{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.a9s-annotationlayer.no-cursor,.a9s-annotationlayer.no-cursor *{cursor:none!important}.a9s-crosshair line{stroke-width:1px;stroke:#00000080;pointer-events:none;vector-effect:non-scaling-stroke;shape-rendering:crispEdges}.a9s-selection-mask{stroke:none;fill:transparent;pointer-events:none}.a9s-annotation rect,.a9s-annotation circle,.a9s-annotation ellipse,.a9s-annotation path,.a9s-annotation polygon,.a9s-selection rect,.a9s-selection circle,.a9s-selection ellipse,.a9s-selection path,.a9s-selection polygon{fill:transparent;cursor:pointer;vector-effect:non-scaling-stroke}.a9s-annotation .a9s-inner,.a9s-selection .a9s-inner{stroke:#fff;stroke-width:1px;fill:transparent}.a9s-annotation .a9s-inner:hover,.a9s-selection .a9s-inner:hover{stroke:#fff000}.a9s-annotation .a9s-outer,.a9s-selection .a9s-outer{stroke:#000000b3;stroke-width:3px;fill:none}.a9s-annotation .a9s-formatter-el,.a9s-selection .a9s-formatter-el{overflow:visible}.a9s-annotation.a9s-point .a9s-inner{display:none}.a9s-annotation.a9s-point .a9s-outer{stroke:#5a5a5a;stroke-width:1.5px;fill:#ffffff80}.a9s-annotation.a9s-point .a9s-outer:hover{fill:#fff000}.a9s-annotation.selected .a9s-inner,.a9s-selection .a9s-inner{stroke:#fff000}.a9s-annotation.editable .a9s-inner{stroke:#fff000;cursor:move!important}.a9s-annotation.editable .a9s-inner:hover{fill:#fff0001a}.a9s-handle{cursor:move}.a9s-handle .a9s-handle-inner{stroke:#fff000;fill:#000}.a9s-handle .a9s-handle-outer{stroke:#000;fill:#fff}.a9s-handle:hover .a9s-handle-inner{fill:#fff000}.r6o-btn{background-color:#4483c4;border:1px solid #4483c4;box-sizing:border-box;color:#fff;cursor:pointer;display:inline-block;font-size:14px;margin:0;outline:none;text-decoration:none;white-space:nowrap;padding:6px 18px;min-width:70px;vertical-align:middle;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px}.r6o-btn *{vertical-align:middle;cursor:pointer}.r6o-btn .r6o-icon{margin-right:4px}.r6o-btn:disabled{border-color:#a3c2e2!important;background-color:#a3c2e2!important}.r6o-btn:hover{background-color:#4f92d7;border-color:#4f92d7}.r6o-btn.outline{border:1px solid #4483c4;color:#4483c4;background-color:transparent;text-shadow:none}.r6o-autocomplete{display:inline;position:relative}.r6o-autocomplete div[role=combobox]{display:inline}.r6o-autocomplete input{outline:none;border:none;width:80px;height:100%;line-height:14px;white-space:pre;box-sizing:border-box;background-color:transparent;font-size:14px;color:#3f3f3f}.r6o-autocomplete ul{position:absolute;margin:0;padding:0;list-style-type:none;background-color:#fff;border-radius:3px;border:1px solid #d6d7d9;box-sizing:border-box;box-shadow:0 0 20px #00000040}.r6o-autocomplete ul:empty{display:none}.r6o-autocomplete li{box-sizing:border-box;padding:2px 12px;width:100%;cursor:pointer}.r6o-editable-text{max-height:120px;overflow:auto;outline:none;min-height:2em;font-size:14px;font-family:Lato,sans-serif}.r6o-editable-text:empty:not(:focus):before{content:attr(data-placeholder);color:#c2c2c2}.r6o-widget.comment{font-size:14px;min-height:3em;background-color:#fff;position:relative}.r6o-widget.comment .r6o-editable-text,.r6o-widget.comment .r6o-readonly-comment{padding:10px;width:100%;box-sizing:border-box;outline:none;border:none;background-color:transparent;resize:none}.r6o-widget.comment .r6o-readonly-comment{white-space:pre-line}.r6o-widget.comment .r6o-editable-text::-webkit-input-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text::-moz-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text:-moz-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-editable-text:-ms-input-placeholder{color:#c2c2c2}.r6o-widget.comment .r6o-lastmodified{border:1px solid #e5e5e5;display:inline-block;border-radius:2px;margin:0 10px 8px;padding:4px 5px;line-height:100%;font-size:12px}.r6o-widget.comment .r6o-lastmodified .r6o-lastmodified-at{color:#757575;padding-left:3px}.r6o-widget.comment .r6o-arrow-down{position:absolute;height:20px;width:20px;top:9px;right:9px;line-height:22px;background-color:#fff;text-align:center;-webkit-font-smoothing:antialiased;border:1px solid #e5e5e5;cursor:pointer;-webkit-border-radius:1px;-khtml-border-radius:1px;-moz-border-radius:1px;border-radius:1px}.r6o-widget.comment .r6o-arrow-down.r6o-menu-open{border-color:#4483c4}.r6o-widget.comment .r6o-comment-dropdown-menu{position:absolute;top:32px;right:8px;background-color:#fff;border:1px solid #e5e5e5;list-style-type:none;margin:0;padding:5px 0;z-index:9999;-webkit-box-shadow:0 2px 4px rgba(0,0,0,.2);-moz-box-shadow:0 2px 4px rgba(0,0,0,.2);box-shadow:0 2px 4px #0003}.r6o-widget.comment .r6o-comment-dropdown-menu li{padding:0 15px;cursor:pointer}.r6o-widget.comment .r6o-comment-dropdown-menu li:hover{background-color:#ecf0f1}.r6o-widget.comment .r6o-purposedropdown{position:relative;z-index:2}.r6o-widget.comment.editable{background-color:#ecf0f1}.r6o-widget.r6o-tag:empty{display:none}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.r6o-widget.tag .r6o-taglist li{height:27px}.r6o-widget.tag .r6o-taglist li .r6o-delete-wrapper .r6o-delete{position:relative;top:-4px}}.r6o-widget.r6o-tag{background-color:#ecf0f1;border-bottom:1px solid #e5e5e5;padding:1px 3px;display:flex}.r6o-widget.r6o-tag ul{margin:0;padding:0;list-style-type:none;z-index:1}.r6o-widget.r6o-tag ul.r6o-taglist{flex:0;white-space:nowrap}.r6o-widget.r6o-tag ul.r6o-taglist li{display:inline-block;margin:1px 1px 1px 0;padding:0;vertical-align:middle;overflow:hidden;font-size:12px;background-color:#fff;border:1px solid #d6d7d9;cursor:pointer;position:relative;line-height:180%;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-webkit-box-shadow:0 0 4px rgba(0,0,0,.1);-moz-box-shadow:0 0 4px rgba(0,0,0,.1);box-shadow:0 0 4px #0000001a}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-label{padding:2px 8px;display:inline-block}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper{display:inline-block;padding:2px 0;color:#fff;width:0;height:100%;background-color:#4483c4;-webkit-border-top-right-radius:2px;-webkit-border-bottom-right-radius:2px;-khtml-border-radius-topright:2px;-khtml-border-radius-bottomright:2px;-moz-border-radius-topright:2px;-moz-border-radius-bottomright:2px;border-top-right-radius:2px;border-bottom-right-radius:2px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper .r6o-delete{padding:2px 6px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-wrapper svg{vertical-align:text-top}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-enter-active{width:24px;transition:width .2s}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-enter-done,.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-exit{width:24px}.r6o-widget.r6o-tag ul.r6o-taglist li .r6o-delete-exit-active{width:0;transition:width .2s}.r6o-widget.r6o-tag .r6o-autocomplete{flex:1;position:relative}.r6o-widget.r6o-tag .r6o-autocomplete li{font-size:14px}.r6o-widget.r6o-tag input{width:100%;padding:0 3px;min-width:80px;outline:none;border:none;line-height:170%;background-color:transparent;color:#3f3f3f}.r6o-widget.r6o-tag input::-webkit-input-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input::-moz-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input:-moz-placeholder{color:#c2c2c2}.r6o-widget.r6o-tag input:-ms-input-placeholder{color:#c2c2c2}.r6o-editor{position:absolute;z-index:99999;width:400px;color:#3f3f3f;opacity:0;font-family:Lato,sans-serif;font-size:17px;line-height:27px;-webkit-transition:opacity .2s ease-in;-moz-transition:opacity .2s ease-in;transition:opacity .2s ease-in}.r6o-editor .r6o-arrow{position:absolute;overflow:hidden;top:-12px;left:12px;width:28px;height:12px;display:none}.r6o-editor .r6o-arrow:after{content:\"\";position:absolute;top:5px;left:5px;width:18px;height:18px;background-color:#fff;-webkit-backface-visibility:hidden;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.r6o-editor .r6o-editor-inner{background-color:#fff;-webkit-border-radius:2px;-khtml-border-radius:2px;-moz-border-radius:2px;border-radius:2px;-webkit-box-shadow:2px 2px 42px rgba(0,0,0,.4);-moz-box-shadow:2px 2px 42px rgba(0,0,0,.4);box-shadow:2px 2px 42px #0006}.r6o-editor .r6o-editor-inner .r6o-widget:first-child{-webkit-border-top-left-radius:2px;-webkit-border-top-right-radius:2px;-khtml-border-radius-topleft:2px;-khtml-border-radius-topright:2px;-moz-border-radius-topleft:2px;-moz-border-radius-topright:2px;border-top-left-radius:2px;border-top-right-radius:2px}.r6o-editor .r6o-editor-inner .r6o-widget{border-bottom:1px solid #e5e5e5}.r6o-editor .r6o-footer{position:relative;text-align:right;padding:8px 0}.r6o-editor .r6o-footer .r6o-btn{margin-right:8px}.r6o-editor .r6o-footer .r6o-btn.delete-annotation{position:absolute;top:7px;left:7px;background-color:transparent;border:none;color:#4483c4;width:32px;height:32px;min-width:0;border-radius:100%;padding:0;display:flex;justify-content:center;align-items:center;-webkit-transition:all .1s ease-in;-moz-transition:all .1s ease-in;-o-transition:all .1s ease-in;transition:all .1s ease-in}.r6o-editor .r6o-footer .r6o-btn.delete-annotation:hover{color:#fff;background-color:#ef352c}@media (max-width: 640px){.r6o-editor{width:260px}}.r6o-editor.r6o-arrow-top .r6o-arrow{display:block}.r6o-editor.r6o-arrow-right{margin-left:8px}.r6o-editor.r6o-arrow-right .r6o-arrow{left:auto;right:12px}.r6o-editor.r6o-arrow-bottom .r6o-arrow{display:block;top:auto;bottom:-12px}.r6o-editor.r6o-arrow-bottom .r6o-arrow:after{top:-11px;box-shadow:none}.r6o-editor.pushed .r6o-arrow,.r6o-editor.dragged .r6o-arrow{display:none}.r6o-editor .r6o-draggable{cursor:move}.r6o-purposedropdown{width:150px;display:inline-block}.r6o-noselect{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.a9s-annotation.hover .a9s-inner{stroke:#fff000}.a9s-annotation:not(.hover):hover .a9s-inner{stroke:#fff}";

const Anno = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  connectedCallback() {
    console.log('ve-anno.connectedCallback');
  }
  componentDidLoad() {
    let viewer = openseadragon({
      element: this.el.shadowRoot.getElementById('osd'),
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
    });
    // let annotorious = Annotorious(viewer, {})
    let annotorious = openseadragonAnnotorious_min(viewer, { widgets: ['COMMENT'] });
    // Array.from(this.el.shadowRoot.querySelectorAll('.a9s-annotationlayer')).forEach((elem:HTMLElement) => elem.style.display = 'unset')
    console.log(annotorious);
    annotorious.on('selectAnnotation', async (anno) => {
      console.log('selectAnnotation', anno);
    });
    annotorious.on('createAnnotation', async (anno) => {
      console.log('createAnnotation', anno);
    });
    annotorious.on('updateAnnotation', async (anno) => {
      console.log('updateAnnotation', anno);
    });
    annotorious.on('deleteAnnotation', async (anno) => {
      console.log('deleteAnnotation', anno);
    });
    viewer.open({
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Georgia_Jvari_monastery_IMG_9345_2070.jpg',
      type: 'image',
      buildPyramid: true
    });
  }
  render() {
    return [
      h("div", { id: "toolbar" }),
      h("div", { id: "osd", style: { width: '800px', height: '600px' } })
    ];
  }
  get el() { return this; }
  static get style() { return veAnnoCss; }
}, [1, "ve-anno"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ve-anno"];
  components.forEach(tagName => { switch (tagName) {
    case "ve-anno":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Anno);
      }
      break;
  } });
}

const VeAnno = Anno;
const defineCustomElement = defineCustomElement$1;

export { VeAnno, defineCustomElement };
