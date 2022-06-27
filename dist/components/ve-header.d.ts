import type { Components, JSX } from "../types/components";

interface VeHeader extends Components.VeHeader, HTMLElement {}
export const VeHeader: {
  prototype: VeHeader;
  new (): VeHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
