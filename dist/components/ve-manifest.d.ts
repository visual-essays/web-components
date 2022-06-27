import type { Components, JSX } from "../types/components";

interface VeManifest extends Components.VeManifest, HTMLElement {}
export const VeManifest: {
  prototype: VeManifest;
  new (): VeManifest;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
