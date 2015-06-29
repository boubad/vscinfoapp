//intervalview.ts
//
import * as userinf from './userinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {IIntervalItem} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
//
export class IntervalViewModel<T extends IIntervalItem>
extends DepSigleNameViewModel<T> {
    //
    public minDate:string = null;
    public maxDate:string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get startDate(): string {
      return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.startDate) : null;
    }
    public set startDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startDate=InfoRoot.string_to_date(s);
        }
    }
    public get endDate(): string {
      return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.endDate) : null;
    }
    public set endDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endDate=InfoRoot.string_to_date(s);
        }
    }
}// class IntervalViewModel
