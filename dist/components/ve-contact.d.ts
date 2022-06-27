import type { Components, JSX } from "../types/components";

interface VeContact extends Components.VeContact, HTMLElement {}
export const VeContact: {
  prototype: VeContact;
  new (): VeContact;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
