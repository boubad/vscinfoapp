//intervalview.ts
//
import {UserInfo} from '../userinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {IIntervalItem} from 'infodata';
import {InfoRoot} from '../../common/inforoot';
//
export class IntervalViewModel<T extends IIntervalItem>
extends DepSigleNameViewModel<T> {
    //
    constructor(userinfo: UserInfo) {
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
