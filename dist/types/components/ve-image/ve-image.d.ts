import OpenSeadragon from 'openseadragon';
import './openseadragon-curtain-sync';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
export declare class ImageViewer {
  src: string;
  srcChanged(): void;
  seq: number;
  options: string;
  fit: string;
  alt: string;
  entities: string;
  user: string;
  path: string;
  compare: string;
  width: string;
  height: string;
  align: string;
  authToken: string;
  annoBase: string;
  shoelace: boolean;
  sticky: boolean;
  el: HTMLElement;
  _viewer: OpenSeadragon.Viewer;
  _viewportBounds: string;
  _entities: string[];
  _annotator: any;
  _showAnnotations: boolean;
  _showMenu: boolean;
  _annoTarget: string;
  _infoPanelIsOpen: boolean;
  _annotatorWindow: any;
  _zoomedIn: any;
  _tileSources: any[];
  compareModeChanged(): void;
  authTokenChanged(): void;
  annoBaseChanged(): void;
  _annoTargetChanged(): void;
  userChanged(): void;
  _images: any[];
  _imagesChanged(): Promise<void>;
  _selectedIdx: number;
  _selectedIdxChanged(idx: number): void;
  _current: any;
  _currentChanged(): void;
  _annotations: any[];
  _annotationsChanged(): void;
  serializedManifests(): string;
  annoTarget(manifest: any): string;
  setAnnoTarget(): void;
  zoomIn(): void;
  zoomOut(): void;
  showInfo(): void;
  toggleShowAnnotations(): void;
  setRegion(region: string, immediately?: boolean): void;
  parseImageStr(str: string): any;
  zoomto(arg: string): Promise<void>;
  buildImagesList(): void;
  listenForSlotChanges(): void;
  connectedCallback(): void;
  componentWillLoad(): Promise<void>;
  findVeImage(el: HTMLSpanElement): ChildNode;
  addMutationObserver(el: HTMLElement): void;
  componentDidLoad(): void;
  _setHostDimensions(imageData?: any): void;
  _tileSource(imgUrl: any, options: any): Promise<any>;
  _loadTileSources(): Promise<any[]>;
  _copyTextToClipboard(text: string): void;
  _getViewportBounds(): string;
  _value(langObj: any, language?: string): any;
  annotatorIsParent(): boolean;
  editorIsParent(): boolean;
  canAnnotate(): boolean;
  isTouchEnabled(): boolean;
  _showInfoPopup(): void;
  configureScrollBehavior(): void;
  _compareViewerInit(): Promise<void>;
  _osdInit(): Promise<void>;
  positionImage(immediately?: boolean): void;
  goHome(immediately?: boolean): void;
  showAnnotationsToolbar(show: boolean): void;
  showAnnotations(show: boolean): void;
  toggleMenu(): void;
  toggleAnnotations(): void;
  openAnnotator(): void;
  openWindow(url: any, options: any): void;
  render(): any[];
}
