import type { Components, JSX } from "../types/components";

interface VeMeta extends Components.VeMeta, HTMLElement {}
export const VeMeta: {
  prototype: VeMeta;
  new (): VeMeta;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
