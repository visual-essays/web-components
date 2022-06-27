import type { Components, JSX } from "../types/components";

interface VeCard extends Components.VeCard, HTMLElement {}
export const VeCard: {
  prototype: VeCard;
  new (): VeCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
