import type { Components, JSX } from "../types/components";

interface VeDepictsDialog extends Components.VeDepictsDialog, HTMLElement {}
export const VeDepictsDialog: {
  prototype: VeDepictsDialog;
  new (): VeDepictsDialog;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
