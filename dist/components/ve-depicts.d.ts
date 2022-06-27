import type { Components, JSX } from "../types/components";

interface VeDepicts extends Components.VeDepicts, HTMLElement {}
export const VeDepicts: {
  prototype: VeDepicts;
  new (): VeDepicts;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
