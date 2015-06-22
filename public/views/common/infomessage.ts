//infomessage.ts
//
import {InfoElement} from '../infoelement';
import {IInfoMessage} from 'infodata';
//
export class InfoMessage extends InfoElement implements IInfoMessage {
  //
  public type:string = null;
  public categ:string = null;
  public value:any = null;
  public info:string = null;
  public source:any = null;
  public error:string = null;
  //
  constructor(xtype?:string,xcateg?:string,xval?:any){
    super();
    if (xtype !== undefined){
      this.type = xtype;
    }
    if (xcateg !== undefined){
      this.categ = xcateg;
    }
    if (xval !== undefined){
      this.value = xval;
    }
  }// constructor
}// class InfoMessage
