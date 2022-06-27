import type { Components, JSX } from "../types/components";

interface VeStyle extends Components.VeStyle, HTMLElement {}
export const VeStyle: {
  prototype: VeStyle;
  new (): VeStyle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
