import { EventEmitter } from '../../stencil-public-runtime';
export declare class WikidataSearch {
  language: string;
  el: HTMLElement;
  wdResults: any[];
  autocompleteResults: HTMLInputElement;
  autocompleteDropdownArrow: HTMLElement;
  autocompleteContainer: HTMLElement;
  autocompleteInput: HTMLInputElement;
  connectedCallback(): void;
  entitySelected: EventEmitter<any>;
  componentDidLoad(): void;
  isSearching: boolean;
  searchContinue: number;
  searchFor: string;
  searchForChanged(): void;
  doSearch(): void;
  debounce: any;
  inputHandler(): void;
  dropdownIsOpen: boolean;
  dropdownIsOpenChanged(isOpen: boolean): void;
  toggleDropdown(): void;
  reset(): void;
  itemSelected(item: any): void;
  render(): any[];
}
