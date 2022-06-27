export declare class Header {
  el: HTMLElement;
  contact: string;
  show: boolean;
  showChanged(): void;
  contactDialog: any;
  from: HTMLInputElement;
  emailAlert: any;
  message: HTMLTextAreaElement;
  noMessageAlert: any;
  componentDidLoad(): void;
  hideContactForm(): void;
  showContactForm(): void;
  sendmail(): Promise<void>;
  render(): any[];
}
