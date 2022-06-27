import type { Components, JSX } from "../types/components";

interface VeFooter extends Components.VeFooter, HTMLElement {}
export const VeFooter: {
  prototype: VeFooter;
  new (): VeFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
