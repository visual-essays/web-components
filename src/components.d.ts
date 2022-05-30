/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface VeAnno {
    }
    interface VeDepicts {
        "depicted": any[];
        "edit": () => Promise<void>;
        "editable": boolean;
        "format": string;
        "manifest": string;
        "refresh": (depicted: any[]) => Promise<void>;
    }
    interface VeDepictsDialog {
        "depicted": any[];
        "imageHash": string;
        "label": string;
        "show": boolean;
        "source": string;
        "sourceId": string;
        "summary": string;
        "thumbnail": string;
    }
    interface VeEntities {
        "entities": string;
    }
    interface VeFooter {
        "sticky": boolean;
    }
    interface VeHeader {
        "background": string;
        "height": number;
        "label": string;
        "options": string;
        "position": string;
        "sticky": boolean;
        "subtitle": string;
    }
    interface VeImage {
        "align": string;
        "alt": string;
        "annoBase": string;
        "authToken": string;
        "compare": string;
        "entities": string;
        "fit": string;
        "height": string;
        "options": string;
        "path": string;
        "seq": number;
        "src": string;
        "user": string;
        "width": string;
    }
    interface VeImageGrid {
    }
    interface VeManifest {
        "condensed": boolean;
        "depicts": string[];
        "images": string;
        "src": string;
    }
    interface VeMeta {
        "description": string;
        "title": string;
    }
    interface VeStyle {
        "layout": string;
        "theme": string;
    }
    interface VeWikidataSearch {
        "language": string;
    }
}
declare global {
    interface HTMLVeAnnoElement extends Components.VeAnno, HTMLStencilElement {
    }
    var HTMLVeAnnoElement: {
        prototype: HTMLVeAnnoElement;
        new (): HTMLVeAnnoElement;
    };
    interface HTMLVeDepictsElement extends Components.VeDepicts, HTMLStencilElement {
    }
    var HTMLVeDepictsElement: {
        prototype: HTMLVeDepictsElement;
        new (): HTMLVeDepictsElement;
    };
    interface HTMLVeDepictsDialogElement extends Components.VeDepictsDialog, HTMLStencilElement {
    }
    var HTMLVeDepictsDialogElement: {
        prototype: HTMLVeDepictsDialogElement;
        new (): HTMLVeDepictsDialogElement;
    };
    interface HTMLVeEntitiesElement extends Components.VeEntities, HTMLStencilElement {
    }
    var HTMLVeEntitiesElement: {
        prototype: HTMLVeEntitiesElement;
        new (): HTMLVeEntitiesElement;
    };
    interface HTMLVeFooterElement extends Components.VeFooter, HTMLStencilElement {
    }
    var HTMLVeFooterElement: {
        prototype: HTMLVeFooterElement;
        new (): HTMLVeFooterElement;
    };
    interface HTMLVeHeaderElement extends Components.VeHeader, HTMLStencilElement {
    }
    var HTMLVeHeaderElement: {
        prototype: HTMLVeHeaderElement;
        new (): HTMLVeHeaderElement;
    };
    interface HTMLVeImageElement extends Components.VeImage, HTMLStencilElement {
    }
    var HTMLVeImageElement: {
        prototype: HTMLVeImageElement;
        new (): HTMLVeImageElement;
    };
    interface HTMLVeImageGridElement extends Components.VeImageGrid, HTMLStencilElement {
    }
    var HTMLVeImageGridElement: {
        prototype: HTMLVeImageGridElement;
        new (): HTMLVeImageGridElement;
    };
    interface HTMLVeManifestElement extends Components.VeManifest, HTMLStencilElement {
    }
    var HTMLVeManifestElement: {
        prototype: HTMLVeManifestElement;
        new (): HTMLVeManifestElement;
    };
    interface HTMLVeMetaElement extends Components.VeMeta, HTMLStencilElement {
    }
    var HTMLVeMetaElement: {
        prototype: HTMLVeMetaElement;
        new (): HTMLVeMetaElement;
    };
    interface HTMLVeStyleElement extends Components.VeStyle, HTMLStencilElement {
    }
    var HTMLVeStyleElement: {
        prototype: HTMLVeStyleElement;
        new (): HTMLVeStyleElement;
    };
    interface HTMLVeWikidataSearchElement extends Components.VeWikidataSearch, HTMLStencilElement {
    }
    var HTMLVeWikidataSearchElement: {
        prototype: HTMLVeWikidataSearchElement;
        new (): HTMLVeWikidataSearchElement;
    };
    interface HTMLElementTagNameMap {
        "ve-anno": HTMLVeAnnoElement;
        "ve-depicts": HTMLVeDepictsElement;
        "ve-depicts-dialog": HTMLVeDepictsDialogElement;
        "ve-entities": HTMLVeEntitiesElement;
        "ve-footer": HTMLVeFooterElement;
        "ve-header": HTMLVeHeaderElement;
        "ve-image": HTMLVeImageElement;
        "ve-image-grid": HTMLVeImageGridElement;
        "ve-manifest": HTMLVeManifestElement;
        "ve-meta": HTMLVeMetaElement;
        "ve-style": HTMLVeStyleElement;
        "ve-wikidata-search": HTMLVeWikidataSearchElement;
    }
}
declare namespace LocalJSX {
    interface VeAnno {
    }
    interface VeDepicts {
        "depicted"?: any[];
        "editable"?: boolean;
        "format"?: string;
        "manifest"?: string;
        "onDroToggled"?: (event: CustomEvent<any>) => void;
        "onEntityRemoved"?: (event: CustomEvent<any>) => void;
        "onProminentToggled"?: (event: CustomEvent<any>) => void;
    }
    interface VeDepictsDialog {
        "depicted"?: any[];
        "imageHash"?: string;
        "label"?: string;
        "onDepictedChanged"?: (event: CustomEvent<any>) => void;
        "show"?: boolean;
        "source"?: string;
        "sourceId"?: string;
        "summary"?: string;
        "thumbnail"?: string;
    }
    interface VeEntities {
        "entities"?: string;
    }
    interface VeFooter {
        "sticky"?: boolean;
    }
    interface VeHeader {
        "background"?: string;
        "height"?: number;
        "label"?: string;
        "options"?: string;
        "position"?: string;
        "sticky"?: boolean;
        "subtitle"?: string;
    }
    interface VeImage {
        "align"?: string;
        "alt"?: string;
        "annoBase"?: string;
        "authToken"?: string;
        "compare"?: string;
        "entities"?: string;
        "fit"?: string;
        "height"?: string;
        "options"?: string;
        "path"?: string;
        "seq"?: number;
        "src"?: string;
        "user"?: string;
        "width"?: string;
    }
    interface VeImageGrid {
    }
    interface VeManifest {
        "condensed"?: boolean;
        "depicts"?: string[];
        "images"?: string;
        "src"?: string;
    }
    interface VeMeta {
        "description"?: string;
        "title"?: string;
    }
    interface VeStyle {
        "layout"?: string;
        "theme"?: string;
    }
    interface VeWikidataSearch {
        "language"?: string;
        "onEntitySelected"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "ve-anno": VeAnno;
        "ve-depicts": VeDepicts;
        "ve-depicts-dialog": VeDepictsDialog;
        "ve-entities": VeEntities;
        "ve-footer": VeFooter;
        "ve-header": VeHeader;
        "ve-image": VeImage;
        "ve-image-grid": VeImageGrid;
        "ve-manifest": VeManifest;
        "ve-meta": VeMeta;
        "ve-style": VeStyle;
        "ve-wikidata-search": VeWikidataSearch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ve-anno": LocalJSX.VeAnno & JSXBase.HTMLAttributes<HTMLVeAnnoElement>;
            "ve-depicts": LocalJSX.VeDepicts & JSXBase.HTMLAttributes<HTMLVeDepictsElement>;
            "ve-depicts-dialog": LocalJSX.VeDepictsDialog & JSXBase.HTMLAttributes<HTMLVeDepictsDialogElement>;
            "ve-entities": LocalJSX.VeEntities & JSXBase.HTMLAttributes<HTMLVeEntitiesElement>;
            "ve-footer": LocalJSX.VeFooter & JSXBase.HTMLAttributes<HTMLVeFooterElement>;
            "ve-header": LocalJSX.VeHeader & JSXBase.HTMLAttributes<HTMLVeHeaderElement>;
            "ve-image": LocalJSX.VeImage & JSXBase.HTMLAttributes<HTMLVeImageElement>;
            "ve-image-grid": LocalJSX.VeImageGrid & JSXBase.HTMLAttributes<HTMLVeImageGridElement>;
            "ve-manifest": LocalJSX.VeManifest & JSXBase.HTMLAttributes<HTMLVeManifestElement>;
            "ve-meta": LocalJSX.VeMeta & JSXBase.HTMLAttributes<HTMLVeMetaElement>;
            "ve-style": LocalJSX.VeStyle & JSXBase.HTMLAttributes<HTMLVeStyleElement>;
            "ve-wikidata-search": LocalJSX.VeWikidataSearch & JSXBase.HTMLAttributes<HTMLVeWikidataSearchElement>;
        }
    }
}
