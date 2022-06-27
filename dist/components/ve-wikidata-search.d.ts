import type { Components, JSX } from "../types/components";

interface VeWikidataSearch extends Components.VeWikidataSearch, HTMLElement {}
export const VeWikidataSearch: {
  prototype: VeWikidataSearch;
  new (): VeWikidataSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
