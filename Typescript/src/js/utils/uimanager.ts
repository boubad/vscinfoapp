//uimanager.ts
import {InfoElement} from './infoelement';
import {IUIManager} from 'infodata';
//
declare var window: any;
const ISWINDOW: boolean = (window !== undefined) && (window !== null) && (window.URL !== undefined) &&
  (window.URL !== null);
//
export class UIManager extends InfoElement implements IUIManager {
  constructor() {
    super();
  }
  public createUrl(blob: Blob): string {
    let sRet: string = null;
    if (ISWINDOW && (blob !== undefined) && (blob !== null)) {
      try {
        sRet = window.URL.createObjectURL(blob);
      } catch (e) { }
    }
    return sRet;
  }
  public revokeUrl(url: string): void {
    if (ISWINDOW && (url !== undefined) && (url !== null)) {
      try {
        window.URL.revokeObjectURL(url);
      } catch (e) { }
    }
  }// revokeUrl
  public confirm(s: string): boolean {
    if ((window !== undefined) && (window !== null)) {
      return window.confirm(s);
    } else {
      return true;
    }
  }// confirm
}// class UIManager
