export declare class ManifestViewer {
  src: string;
  images: string;
  depicts: string[];
  condensed: boolean;
  el: HTMLElement;
  _images: any[];
  srcChanged(src: object): void;
  imagesChanged(): void;
  parseManifest(imageRec: any): any;
  componentWillLoad(): void;
  _value(langObj: any, language?: string): any;
  onManifestIconDrag(dragEvent: DragEvent): void;
  licenseBadge(parsedManifest: any): string;
  render_condensed(): any[];
  render_full(): any[];
  render(): any[];
}
