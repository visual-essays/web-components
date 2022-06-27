import { EventEmitter } from '../../stencil-public-runtime';
export declare class Depicts {
  manifest: string;
  depicted: any[];
  format: string;
  editable: boolean;
  el: HTMLElement;
  _manifest: any;
  entityData: any;
  entityDataInSync: boolean;
  imageHash: string;
  connectedCallback(): Promise<void>;
  depictedChanged(): Promise<void>;
  prominentToggled: EventEmitter<any>;
  droToggled: EventEmitter<any>;
  entityRemoved: EventEmitter<any>;
  getEntityData(): Promise<void>;
  refresh(depicted: any[]): Promise<void>;
  toggleDro(qid: string): void;
  toggleProminent(qid: string): void;
  removeEntity(qid: any): void;
  edit(): Promise<void>;
  label(qid: string): any;
  defaultFormat(): any;
  tableFormat(): any;
  cardsFormat(): any;
  render(): any;
}
