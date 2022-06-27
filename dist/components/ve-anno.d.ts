import type { Components, JSX } from "../types/components";

interface VeAnno extends Components.VeAnno, HTMLElement {}
export const VeAnno: {
  prototype: VeAnno;
  new (): VeAnno;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
