/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface VeContact {
        "contact": string;
        "show": boolean;
    }
    interface VeContentViewer {
        "format": string;
        "path": string;
        "show": boolean;
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
        "language": string;
        "sticky": boolean;
    }
    interface VeFooter {
        "sticky": boolean;
    }
    interface VeHeader {
        "background": string;
        "contact": string;
        "height": number;
        "label": string;
        "logo": string;
        "options": string;
        "position": string;
        "searchDomain": string;
        "sticky": boolean;
        "subtitle": string;
    }
    interface VeHero {
        "background": string;
        "height": number;
        "options": string;
        "position": string;
        "sticky": boolean;
        "top": number;
    }
    interface VeImage {
        "align": string;
        "alt": string;
        "annoBase": string;
        "authToken": string;
        "compare": boolean;
        "entities": string;
        "fit": string;
        "height": string;
        "mode": string;
        "noScroll": boolean;
        "options": string;
        "path": string;
        "seq": number;
        "shoelace": boolean;
        "src": string;
        "sticky": boolean;
        "user": string;
        "width": string;
    }
    interface VeImageCard {
        "manifest": string;
    }
    interface VeImageGrid {
        "asCards": boolean;
    }
    interface VeManifest {
        "condensed": boolean;
        "depicts": string[];
        "images": string;
        "src": string;
    }
    interface VeMap {
        "cards": string;
        "center": string;
        "entities": string;
        "marker": string;
        "overlay": string;
        "sticky": boolean;
        "zoom": number;
    }
    interface VeMenu {
        "background": string;
        "contact": string;
        "position": string;
    }
    interface VeMeta {
        "description": string;
        "title": string;
    }
    interface VeNavbar {
        "alpha": number;
        "background": string;
        "contact": string;
        "height": number;
        "label": string;
        "logo": string;
        "offset": number;
        "searchDomain": string;
        "sticky": boolean;
        "subtitle": string;
    }
    interface VeSiteSearch {
        "searchDomain": string;
    }
    interface VeStyle {
        "href": string;
    }
    interface VeVideo {
        "autoplay": boolean;
        "caption": string;
        "end": string;
        "loop": boolean;
        "muted": boolean;
        "poster": string;
        "src": string;
        "start": string;
        "sticky": boolean;
    }
    interface VeWikidataSearch {
        "language": string;
    }
}
export interface VeDepictsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVeDepictsElement;
}
export interface VeDepictsDialogCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVeDepictsDialogElement;
}
export interface VeImageCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVeImageCardElement;
}
export interface VeWikidataSearchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVeWikidataSearchElement;
}
declare global {
    interface HTMLVeContactElement extends Components.VeContact, HTMLStencilElement {
    }
    var HTMLVeContactElement: {
        prototype: HTMLVeContactElement;
        new (): HTMLVeContactElement;
    };
    interface HTMLVeContentViewerElement extends Components.VeContentViewer, HTMLStencilElement {
    }
    var HTMLVeContentViewerElement: {
        prototype: HTMLVeContentViewerElement;
        new (): HTMLVeContentViewerElement;
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
    interface HTMLVeHeroElement extends Components.VeHero, HTMLStencilElement {
    }
    var HTMLVeHeroElement: {
        prototype: HTMLVeHeroElement;
        new (): HTMLVeHeroElement;
    };
    interface HTMLVeImageElement extends Components.VeImage, HTMLStencilElement {
    }
    var HTMLVeImageElement: {
        prototype: HTMLVeImageElement;
        new (): HTMLVeImageElement;
    };
    interface HTMLVeImageCardElement extends Components.VeImageCard, HTMLStencilElement {
    }
    var HTMLVeImageCardElement: {
        prototype: HTMLVeImageCardElement;
        new (): HTMLVeImageCardElement;
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
    interface HTMLVeMapElement extends Components.VeMap, HTMLStencilElement {
    }
    var HTMLVeMapElement: {
        prototype: HTMLVeMapElement;
        new (): HTMLVeMapElement;
    };
    interface HTMLVeMenuElement extends Components.VeMenu, HTMLStencilElement {
    }
    var HTMLVeMenuElement: {
        prototype: HTMLVeMenuElement;
        new (): HTMLVeMenuElement;
    };
    interface HTMLVeMetaElement extends Components.VeMeta, HTMLStencilElement {
    }
    var HTMLVeMetaElement: {
        prototype: HTMLVeMetaElement;
        new (): HTMLVeMetaElement;
    };
    interface HTMLVeNavbarElement extends Components.VeNavbar, HTMLStencilElement {
    }
    var HTMLVeNavbarElement: {
        prototype: HTMLVeNavbarElement;
        new (): HTMLVeNavbarElement;
    };
    interface HTMLVeSiteSearchElement extends Components.VeSiteSearch, HTMLStencilElement {
    }
    var HTMLVeSiteSearchElement: {
        prototype: HTMLVeSiteSearchElement;
        new (): HTMLVeSiteSearchElement;
    };
    interface HTMLVeStyleElement extends Components.VeStyle, HTMLStencilElement {
    }
    var HTMLVeStyleElement: {
        prototype: HTMLVeStyleElement;
        new (): HTMLVeStyleElement;
    };
    interface HTMLVeVideoElement extends Components.VeVideo, HTMLStencilElement {
    }
    var HTMLVeVideoElement: {
        prototype: HTMLVeVideoElement;
        new (): HTMLVeVideoElement;
    };
    interface HTMLVeWikidataSearchElement extends Components.VeWikidataSearch, HTMLStencilElement {
    }
    var HTMLVeWikidataSearchElement: {
        prototype: HTMLVeWikidataSearchElement;
        new (): HTMLVeWikidataSearchElement;
    };
    interface HTMLElementTagNameMap {
        "ve-contact": HTMLVeContactElement;
        "ve-content-viewer": HTMLVeContentViewerElement;
        "ve-depicts": HTMLVeDepictsElement;
        "ve-depicts-dialog": HTMLVeDepictsDialogElement;
        "ve-entities": HTMLVeEntitiesElement;
        "ve-footer": HTMLVeFooterElement;
        "ve-header": HTMLVeHeaderElement;
        "ve-hero": HTMLVeHeroElement;
        "ve-image": HTMLVeImageElement;
        "ve-image-card": HTMLVeImageCardElement;
        "ve-image-grid": HTMLVeImageGridElement;
        "ve-manifest": HTMLVeManifestElement;
        "ve-map": HTMLVeMapElement;
        "ve-menu": HTMLVeMenuElement;
        "ve-meta": HTMLVeMetaElement;
        "ve-navbar": HTMLVeNavbarElement;
        "ve-site-search": HTMLVeSiteSearchElement;
        "ve-style": HTMLVeStyleElement;
        "ve-video": HTMLVeVideoElement;
        "ve-wikidata-search": HTMLVeWikidataSearchElement;
    }
}
declare namespace LocalJSX {
    interface VeContact {
        "contact"?: string;
        "show"?: boolean;
    }
    interface VeContentViewer {
        "format"?: string;
        "path"?: string;
        "show"?: boolean;
    }
    interface VeDepicts {
        "depicted"?: any[];
        "editable"?: boolean;
        "format"?: string;
        "manifest"?: string;
        "onDroToggled"?: (event: VeDepictsCustomEvent<any>) => void;
        "onEntityRemoved"?: (event: VeDepictsCustomEvent<any>) => void;
        "onProminentToggled"?: (event: VeDepictsCustomEvent<any>) => void;
    }
    interface VeDepictsDialog {
        "depicted"?: any[];
        "imageHash"?: string;
        "label"?: string;
        "onDepictedChanged"?: (event: VeDepictsDialogCustomEvent<any>) => void;
        "show"?: boolean;
        "source"?: string;
        "sourceId"?: string;
        "summary"?: string;
        "thumbnail"?: string;
    }
    interface VeEntities {
        "language"?: string;
        "sticky"?: boolean;
    }
    interface VeFooter {
        "sticky"?: boolean;
    }
    interface VeHeader {
        "background"?: string;
        "contact"?: string;
        "height"?: number;
        "label"?: string;
        "logo"?: string;
        "options"?: string;
        "position"?: string;
        "searchDomain"?: string;
        "sticky"?: boolean;
        "subtitle"?: string;
    }
    interface VeHero {
        "background"?: string;
        "height"?: number;
        "options"?: string;
        "position"?: string;
        "sticky"?: boolean;
        "top"?: number;
    }
    interface VeImage {
        "align"?: string;
        "alt"?: string;
        "annoBase"?: string;
        "authToken"?: string;
        "compare"?: boolean;
        "entities"?: string;
        "fit"?: string;
        "height"?: string;
        "mode"?: string;
        "noScroll"?: boolean;
        "options"?: string;
        "path"?: string;
        "seq"?: number;
        "shoelace"?: boolean;
        "src"?: string;
        "sticky"?: boolean;
        "user"?: string;
        "width"?: string;
    }
    interface VeImageCard {
        "manifest"?: string;
        "onImageSelectedEvent"?: (event: VeImageCardCustomEvent<any>) => void;
    }
    interface VeImageGrid {
        "asCards"?: boolean;
    }
    interface VeManifest {
        "condensed"?: boolean;
        "depicts"?: string[];
        "images"?: string;
        "src"?: string;
    }
    interface VeMap {
        "cards"?: string;
        "center"?: string;
        "entities"?: string;
        "marker"?: string;
        "overlay"?: string;
        "sticky"?: boolean;
        "zoom"?: number;
    }
    interface VeMenu {
        "background"?: string;
        "contact"?: string;
        "position"?: string;
    }
    interface VeMeta {
        "description"?: string;
        "title"?: string;
    }
    interface VeNavbar {
        "alpha"?: number;
        "background"?: string;
        "contact"?: string;
        "height"?: number;
        "label"?: string;
        "logo"?: string;
        "offset"?: number;
        "searchDomain"?: string;
        "sticky"?: boolean;
        "subtitle"?: string;
    }
    interface VeSiteSearch {
        "searchDomain"?: string;
    }
    interface VeStyle {
        "href"?: string;
    }
    interface VeVideo {
        "autoplay"?: boolean;
        "caption"?: string;
        "end"?: string;
        "loop"?: boolean;
        "muted"?: boolean;
        "poster"?: string;
        "src"?: string;
        "start"?: string;
        "sticky"?: boolean;
    }
    interface VeWikidataSearch {
        "language"?: string;
        "onEntity-selected"?: (event: VeWikidataSearchCustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "ve-contact": VeContact;
        "ve-content-viewer": VeContentViewer;
        "ve-depicts": VeDepicts;
        "ve-depicts-dialog": VeDepictsDialog;
        "ve-entities": VeEntities;
        "ve-footer": VeFooter;
        "ve-header": VeHeader;
        "ve-hero": VeHero;
        "ve-image": VeImage;
        "ve-image-card": VeImageCard;
        "ve-image-grid": VeImageGrid;
        "ve-manifest": VeManifest;
        "ve-map": VeMap;
        "ve-menu": VeMenu;
        "ve-meta": VeMeta;
        "ve-navbar": VeNavbar;
        "ve-site-search": VeSiteSearch;
        "ve-style": VeStyle;
        "ve-video": VeVideo;
        "ve-wikidata-search": VeWikidataSearch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ve-contact": LocalJSX.VeContact & JSXBase.HTMLAttributes<HTMLVeContactElement>;
            "ve-content-viewer": LocalJSX.VeContentViewer & JSXBase.HTMLAttributes<HTMLVeContentViewerElement>;
            "ve-depicts": LocalJSX.VeDepicts & JSXBase.HTMLAttributes<HTMLVeDepictsElement>;
            "ve-depicts-dialog": LocalJSX.VeDepictsDialog & JSXBase.HTMLAttributes<HTMLVeDepictsDialogElement>;
            "ve-entities": LocalJSX.VeEntities & JSXBase.HTMLAttributes<HTMLVeEntitiesElement>;
            "ve-footer": LocalJSX.VeFooter & JSXBase.HTMLAttributes<HTMLVeFooterElement>;
            "ve-header": LocalJSX.VeHeader & JSXBase.HTMLAttributes<HTMLVeHeaderElement>;
            "ve-hero": LocalJSX.VeHero & JSXBase.HTMLAttributes<HTMLVeHeroElement>;
            "ve-image": LocalJSX.VeImage & JSXBase.HTMLAttributes<HTMLVeImageElement>;
            "ve-image-card": LocalJSX.VeImageCard & JSXBase.HTMLAttributes<HTMLVeImageCardElement>;
            "ve-image-grid": LocalJSX.VeImageGrid & JSXBase.HTMLAttributes<HTMLVeImageGridElement>;
            "ve-manifest": LocalJSX.VeManifest & JSXBase.HTMLAttributes<HTMLVeManifestElement>;
            "ve-map": LocalJSX.VeMap & JSXBase.HTMLAttributes<HTMLVeMapElement>;
            "ve-menu": LocalJSX.VeMenu & JSXBase.HTMLAttributes<HTMLVeMenuElement>;
            "ve-meta": LocalJSX.VeMeta & JSXBase.HTMLAttributes<HTMLVeMetaElement>;
            "ve-navbar": LocalJSX.VeNavbar & JSXBase.HTMLAttributes<HTMLVeNavbarElement>;
            "ve-site-search": LocalJSX.VeSiteSearch & JSXBase.HTMLAttributes<HTMLVeSiteSearchElement>;
            "ve-style": LocalJSX.VeStyle & JSXBase.HTMLAttributes<HTMLVeStyleElement>;
            "ve-video": LocalJSX.VeVideo & JSXBase.HTMLAttributes<HTMLVeVideoElement>;
            "ve-wikidata-search": LocalJSX.VeWikidataSearch & JSXBase.HTMLAttributes<HTMLVeWikidataSearchElement>;
        }
    }
}
