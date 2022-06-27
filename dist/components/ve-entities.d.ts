import type { Components, JSX } from "../types/components";

interface VeEntities extends Components.VeEntities, HTMLElement {}
export const VeEntities: {
  prototype: VeEntities;
  new (): VeEntities;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
