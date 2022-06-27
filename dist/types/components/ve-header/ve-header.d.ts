export declare class Header {
  el: HTMLElement;
  label: string;
  background: string;
  subtitle: string;
  options: string;
  height: number;
  sticky: boolean;
  position: string;
  contact: string;
  imageOptions: any;
  navItems: any;
  _manifest: any;
  _manifestChanged(newValue: object, oldValue: object): void;
  _imageInfo: any;
  _imageInfoChanged(imageInfo: any, priorValue: any): Promise<void>;
  _imgUrl: any;
  _imgUrlChanged(imgUrl: any): Promise<void>;
  _iiifUrl(serviceUrl: string, options: any): string;
  connectedCallback(): void;
  componentDidLoad(): void;
  htmlToElem(html: string): Element;
  _showInfoPopup(): void;
  menuItemSelected(item: any): void;
  navIcon(item: any): string;
  render(): any[];
}
