import type { Components, JSX } from "../types/components";

interface VeImage extends Components.VeImage, HTMLElement {}
export const VeImage: {
  prototype: VeImage;
  new (): VeImage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
