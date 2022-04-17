/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface VeEntities {
        "entities": string;
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
        "alt": string;
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
}
declare global {
    interface HTMLVeEntitiesElement extends Components.VeEntities, HTMLStencilElement {
    }
    var HTMLVeEntitiesElement: {
        prototype: HTMLVeEntitiesElement;
        new (): HTMLVeEntitiesElement;
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
    interface HTMLElementTagNameMap {
        "ve-entities": HTMLVeEntitiesElement;
        "ve-header": HTMLVeHeaderElement;
        "ve-image": HTMLVeImageElement;
        "ve-image-grid": HTMLVeImageGridElement;
        "ve-manifest": HTMLVeManifestElement;
    }
}
declare namespace LocalJSX {
    interface VeEntities {
        "entities"?: string;
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
        "alt"?: string;
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
    interface IntrinsicElements {
        "ve-entities": VeEntities;
        "ve-header": VeHeader;
        "ve-image": VeImage;
        "ve-image-grid": VeImageGrid;
        "ve-manifest": VeManifest;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ve-entities": LocalJSX.VeEntities & JSXBase.HTMLAttributes<HTMLVeEntitiesElement>;
            "ve-header": LocalJSX.VeHeader & JSXBase.HTMLAttributes<HTMLVeHeaderElement>;
            "ve-image": LocalJSX.VeImage & JSXBase.HTMLAttributes<HTMLVeImageElement>;
            "ve-image-grid": LocalJSX.VeImageGrid & JSXBase.HTMLAttributes<HTMLVeImageGridElement>;
            "ve-manifest": LocalJSX.VeManifest & JSXBase.HTMLAttributes<HTMLVeManifestElement>;
        }
    }
}
