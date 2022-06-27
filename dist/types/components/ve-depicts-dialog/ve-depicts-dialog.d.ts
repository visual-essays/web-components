import { EventEmitter } from '../../stencil-public-runtime';
export declare class DepictsDialog {
  show: boolean;
  depicted: any[];
  label: string;
  summary: string;
  thumbnail: string;
  imageHash: string;
  source: string;
  sourceId: string;
  el: HTMLElement;
  dialog: any;
  _depicted: any[];
  showChanged(show: boolean): void;
  depictedChanged: EventEmitter<any>;
  onDepictedChanged(depicted: any): Promise<void>;
  connectedCallback(): Promise<void>;
  componentDidLoad(): void;
  onEntitySelected(event: CustomEvent): Promise<void>;
  parseStatements(statements: any, type?: string): {
    [k: string]: any[];
  };
  toEntityJSON({ id, labels, descriptions, statements }: {
    id?: string;
    labels?: any;
    descriptions?: any;
    statements?: any;
  }): {
    id: string;
    labels: {
      [k: string]: {
        language: string;
        value: unknown;
      };
    };
    descriptions: {
      [k: string]: {
        language: string;
        value: unknown;
      };
    };
    statements: {
      [k: string]: any[];
    };
  };
  onProminentToggled(event: CustomEvent): Promise<void>;
  onDroToggled(event: CustomEvent): void;
  onEntityRemoved(event: CustomEvent): void;
  close(): void;
  apply(): Promise<void>;
  render(): any[];
}
