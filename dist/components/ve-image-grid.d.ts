import type { Components, JSX } from "../types/components";

interface VeImageGrid extends Components.VeImageGrid, HTMLElement {}
export const VeImageGrid: {
  prototype: VeImageGrid;
  new (): VeImageGrid;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
