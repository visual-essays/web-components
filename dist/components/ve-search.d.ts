import type { Components, JSX } from "../types/components";

interface VeSearch extends Components.VeSearch, HTMLElement {}
export const VeSearch: {
  prototype: VeSearch;
  new (): VeSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
