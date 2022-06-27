import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
export declare class Card {
  entities: string;
  manifest: string;
  label: string;
  el: HTMLElement;
  _manifest: any;
  description: string;
  connectedCallback(): Promise<void>;
  render(): any[];
}
