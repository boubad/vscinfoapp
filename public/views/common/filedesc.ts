//filedesc.ts
//
import {InfoElement} from '../infoelement';
import {IFileDesc, IUIManager} from 'infodata';
import {InfoRoot} from './inforoot';
import {UIManager} from './uimanager';
//
interface MyEvent extends EventTarget {
  target: { files: any, result: any };
}
interface MyProgressEvent extends ProgressEvent {
  result: any;
}
//
//
export class FileDesc extends InfoElement implements IFileDesc {
  //
  private _filename: string = null;
  private _filetype: string = null;
  private _filedata: Blob = null;
  private _dataurl: string = null;
  private uimanager: IUIManager = null;
  //
  constructor() {
    super();
    this.uimanager = new UIManager();
  }// constructor
  public get name(): string {
    return this._filename;
  }
  public get type(): string {
    return this._filetype;
  }
  public get data(): Blob {
    return this._filedata;
  }
  public get url(): string {
    return this._dataurl;
  }
  public set url(s: string) {
    let x = (s !== undefined) ? s : null;
    if ((this._dataurl !== null) && (this._dataurl !== x)) {
      this.uimanager.revokeUrl(this._dataurl);
    }
    this._dataurl = x;
  }
  public remove_url(): string {
    let xRet = this._dataurl;
    this._dataurl = null;
    return xRet;
  }
  public get is_storeable(): boolean {
    return (this.name !== null) && (this.type !== null) && (this.data !== null);
  }
  public clear(): void {
    this._filename = null;
    this._filetype = null;
    this._filedata = null;
    this._dataurl = null;
  }
  public changed(event: MyEvent): any {
    let self = this;
    let files = event.target.files;
    if ((files !== undefined) && (files !== null) && (files.length > 0)) {
      let file = files[0];
      let fr = new FileReader();
      fr.onloadend = (e: any) => {
        let data = e.target.result;
        let dd = new Uint8Array(data);
        let blob = new Blob([dd]);
        self._filedata = blob;
        self._filename = file.name;
        self._filetype = file.type;
        if (self._filedata !== null) {
          if (self._dataurl !== null) {
            self.uimanager.revokeUrl(self._dataurl);
          }
          self._dataurl = self.uimanager.createUrl(self._filedata);
        }
      };
      fr.readAsArrayBuffer(file);
    }// files
  }// fileChanged
}// class FileDesc
