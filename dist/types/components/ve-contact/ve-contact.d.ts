import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
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
